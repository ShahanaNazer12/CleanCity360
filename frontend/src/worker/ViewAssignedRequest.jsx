import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setRequests } from "../redux/requestSlice";
import { useEffect } from "react";
import instance from "../../axios";
import { TiTickOutline } from "react-icons/ti";
import { toast } from "react-toastify";
function ViewAssignedRequest() {

  const{requests} = useSelector((state)=>state.requests);
  

  console.log(requests);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await instance.get(
          "/user/view-request-worker",
          { withCredentials: true }
        );
        dispatch(setRequests(data.requests));
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, [dispatch]);

  
  const handleCompleted  = async(id)=>{
    try{
      const {data} = await instance.patch(`/user/update-completed-request/${id}`,{} ,{ withCredentials: true })
   

      toast.success(data.message)
      dispatch(setRequests(requests.filter((r) => r._id !== id)));
      

    }catch(error){
       toast.error(error.response?.data?.message || error.message);

    }
  }
  
  return (
    <Container>
        <Row className=" justify-content-center">
          <h1 className=" text-center mt-3 mb-3" >View Requests</h1>
          {requests.length === 0 ?(
            <Col>
            <h1 className=" text-center text-info">No pending Requests</h1>
            </Col>
          ):(
            <Col >
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Area</th>
          <th>Description</th>
          <th className=" text-center">Status</th>
          <th className=" text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((rqsts,i)=>(
          <tr key={i} >
          <td>{i+1}</td>
          
          <td>{rqsts.user?.fullName}</td>

         
          <td>{rqsts.area?.areaName}</td>

          <td>{rqsts.description}</td>
          <td className=" text-center">pending</td>
          <td className=" text-center text-success "><TiTickOutline size={25} onClick={()=>handleCompleted(rqsts._id)} /></td>
        </tr>

        ))}
        
       
      </tbody>
    </Table>

            </Col>
          )}
            
        </Row>
    </Container>
  )
}

export default ViewAssignedRequest