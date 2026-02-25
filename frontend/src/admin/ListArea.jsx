import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteArea, setAreas } from "../redux/areaSlice";
import instance from "../../axios";
import { useEffect, useState } from "react";



function ListArea(){


  const [fetchArea,setfetchArea] = useState([])
  const [show, setShow] = useState(false);
  const [deleteAreaIndex,setDeleteAreaInsex] = useState(null);
  const [areaId,setAreaId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (areaIndex,id) => {
    setDeleteAreaInsex(areaIndex)
    setAreaId(id)
    setShow(true);
  }

    const {area} = useSelector((state)=>state.area);
    console.log(area);

    const dispatch = useDispatch();

    useEffect(()=>{
      const fetchArea = async()=>{
        try{
          const {data} = await instance.get("/area/get-all-area")
          setfetchArea(data.area)
          dispatch(setAreas(data.area))

        }catch(error){

        }
      }
      fetchArea()
    },[])
    

    async function handleDelete(){
    //  dispatch(deleteArea(deleteAreaIndex))
    //  toast.success("area deleted successfully")
    //  setShow(false)
    try{
          const {data} = await instance.delete(`area/delete-area/${areaId}`,{withCredentials:true})
          dispatch(deleteArea(areaId))
          toast.success(data.message)
           setShow(false)


    }catch(error){
              toast.error(error?.response?.data?.message || error.message)


    }


    }

    return(
      <>
       <Container>
            <Row>
                <h1>List Area here</h1>
            </Row>
            {area.length > 0 ?(
                <Row>
                <Col>
                 <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Area Name</th>
          <th>Edit</th>
          <th>Delete</th>
         
        </tr>
      </thead>
      <tbody>
        {area.map((a,i)=>(
                    <tr key={i}>
          <td>{i+1}</td>
          <td>{a.areaName}</td>
          <td className=" text-center">
            <Link to={`/admin/edit-area/${a._id}`}>
            <CiEdit size={22} style={{cursor:"pointer"}} />
            </Link>
            </td>
            
          <td className=" text-center"><RiDeleteBin2Fill size={20} style={{cursor:"pointer"}} onClick={()=>handleShow(i,a._id)} /></td>
          
        </tr>

        ))}

        
      </tbody>
    </Table>
                </Col>

            </Row>
            ):(
                <Row>
                    <Col>
                    <h2>area not found!!!!</h2>
                    </Col>
                </Row>
            )}
            
        </Container>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you  want to delete this Area</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
           delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>
       
    )
}

export default ListArea