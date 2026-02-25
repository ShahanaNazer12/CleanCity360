import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { delelWorker, setWorkers } from "../redux/workerSlice";
import { toast } from "react-toastify";
import instance from "../../axios";
import { updateUserStatus } from "../redux/authSlice";


const ListWorker = ()=>{

    const {workers} = useSelector((state)=>state.workers);
    console.log(workers)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [show, setShow] = useState(false);
    const [deleteWorkerIndex, setDeleteWorkerIndex] = useState(null)
    const [workerId,setWorkerId] = useState(null)

     const [fetchWorker,setFetchWorker] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (workerIndex,id) => {
    setDeleteWorkerIndex(workerIndex)
    setWorkerId(id)

    setShow(true);
  }

  useEffect(()=>{
    const fetchWorker = async()=>{
      try{
        const {data} = await instance.get("/user/get-all-workers")
        setFetchWorker(data.workers)
        dispatch(setWorkers(data.workers))

      }catch(error){

      }

    }
    fetchWorker()

  },[])


async function handleChangeUserStatus(id) {
  try {
    const { data } = await instance.put(
      `/user/update-status/${id}`,
      {},
      { withCredentials: true }
    );

    dispatch(updateUserStatus({ id, status: data.status }));
    toast.success(data.message);

  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
  }
}



   async function handleDelete(){
      // dispatch(delelWorker(deleteWorkerIndex))
      // setShow(false);
      // toast.success("worker deleted successfully")
      try{
        const {data} = await instance.delete(`/user/delete-worker/${workerId}`,{withCredentials:true})
        dispatch(delelWorker(workerId))
        setShow(false);
        toast.success(data.message)


      }catch(error){
        toast.error(error?.response?.data?.message || error.message)

      }
      

    }
    return(
      <>
       <Container>
        <h1 className=" text-center">List workers</h1>
        <Row>
            <Col sm={4} md={6} lg={12}>
             <Table striped bordered hover>
      <thead>

        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Email</th>
          <th>Area</th>
          <th>Status</th>
          <th className=" text-center">Edit</th>
          <th className=" text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {workers.map((wrkr,i)=>(
             <tr key={i}>
          <td>{i+1}</td>
          <td>{wrkr.fullName}</td>
          <td>{wrkr.email}</td>
         <td>{wrkr.assignedArea?.areaName || "Not Assigned"}</td>
         <td>
        <Form>
      <Form.Check 
        type="switch"
        id={`custom-switch ${wrkr?._id}`}
        label={wrkr?.status ? "active " :"inactive"}
        checked={wrkr?.status}
        onClick={()=>{handleChangeUserStatus(wrkr?._id)}}
      />
     

     
    </Form>
       </td>
          
          <td className=" text-center" >
            <Link to={`/admin/edit-worker/${wrkr._id}`}>
            <CiEdit size={20} style={{cursor:"pointer"}}   />
            </Link>
            
            </td>
          <td className=" text-center"><MdDelete size={20} style={{cursor:"pointer"}} onClick={()=>handleShow(i,wrkr._id)} /></td>
        </tr>
       

        ))}
       
      </tbody>
    </Table>
            </Col>
        </Row>
       </Container>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this worker?!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
           delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>
      
    )
}

export default ListWorker

 