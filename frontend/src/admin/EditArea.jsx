import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import {  editArea } from "../redux/areaSlice";
import { toast } from "react-toastify";
import instance from "../../axios";
import { useNavigate, useParams } from "react-router-dom";


function EditArea() {
     const { Formik } = formik;
     const schema = yup.object().shape({
    areaName: yup.string().required(),
    
  });
  const dispatch = useDispatch()
  const {id} = useParams();
  console.log(id)
  const {area} = useSelector((state)=>state.area)
  console.log(area);
  const navigate = useNavigate()

const areaa = area?.find((ar) => ar._id === id);
//   console.log(areaa)
  

 
  

 async function handleSubmit(values){
    try{
        const {data} = await instance.put(`/area/edit-area/${id}`,values,{withCredentials:true})
        dispatch(editArea(data.updatedArea))
              toast.success(data.message)
              navigate("/admin/list-area")
               

    }catch(error){
        toast.error(error?.response?.data?.message || error.message)

    }
   
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Edit Area</h2>
<Formik
validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        areaName: areaa?.areaName,
       
      }}
>
    {({ handleSubmit, handleChange, values, touched, errors })=>(
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="areaName">
              <Form.Label>Area Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter area name"
                name="areaName"
                value={values.areaName}
                onChange={handleChange}
                isValid={touched.areaName && !errors.areaName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>

    )}
    

</Formik>
          

        </Col>
      </Row>
    </Container>
  );
}

export default EditArea;
