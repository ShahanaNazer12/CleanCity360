// import { Button, Col, Container, Form, Row } from "react-bootstrap"
// import * as formik from 'formik';
// import * as yup from 'yup';
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addWorker } from "../redux/workerSlice";
// import { toast } from "react-toastify";
// import instance from "../../axios";

// function AddWorker(){
//     const { Formik } = formik;
//     const schema = yup.object().shape({
//     fullName: yup.string().required("enter fullname"),
//    email: yup.string().required("enter email").email("already exist"),
//    password: yup.string().required("enter password")
   
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   async function handleSubmit(values,{ resetForm }){
//     // dispatch(addWorker(values))
//     // toast.success("worker added successfully")

//     try{
//         const {data} = await instance.post("user/add-worker",values,
//             { withCredentials: true }
//         );
//         dispatch(addWorker(data.worker))
//         toast.success(data.message)
//         resetForm()

//     }catch(error){
//         toast.error(error?.response?.data?.message || error?.message)

//     }

//   }

//     return(
//         <Container>
//             <h1 className=" text-center mt-3 mb-3">Add Worker</h1>
//             <Row className=" justify-content-center">
//                 <Col md={6}>
                
//              <Formik
//              validationSchema={schema}
//       onSubmit={handleSubmit}
//       initialValues={{
//         fullName: '',
//         email: '',
//         password: '',
       
//       }}
//              >
//                 {({ handleSubmit, handleChange, values, touched, errors })=>(
//                     <Form noValidate onSubmit={handleSubmit}>

//           <Row className="mb-3">
//         <Form.Group as={Col} controlId="formGridFullName">
//           <Form.Label>fullName</Form.Label>
//           <Form.Control type="text" placeholder="Enter  full name" 
//           name="fullName"
//                 value={values.fullName}
//                 onChange={handleChange}
//                 isValid={touched.fullName && !errors.fullName}
//           />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//            <Form.Control.Feedback type="invalid">
//                   {errors.fullName}
//                 </Form.Control.Feedback>
//         </Form.Group>
//         </Row>  

//       <Row className="mb-3">
//         <Form.Group as={Col} controlId="formGridEmail">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" placeholder="Enter email"
//           name="email"
//                 value={values.email}
//                 onChange={handleChange}
//                 isValid={touched.email && !errors.email}
//           />
//            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//            <Form.Control.Feedback type="invalid">
//                   {errors.email}
//                 </Form.Control.Feedback>
//         </Form.Group>
//         </Row>
//         <Row>

//         <Form.Group as={Col} controlId="formGridPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" placeholder="Password"
//           name="password"
//                 value={values.password}
//                 onChange={handleChange}
//                 isValid={touched.password && !errors.password}
//           />
//           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//            <Form.Control.Feedback type="invalid">
//                   {errors.password}
//                 </Form.Control.Feedback>
//         </Form.Group>
//       </Row>

     

     

     

//       <Button variant="primary" type="submit" className=" mt-3">
//         Submit
//       </Button>
//     </Form>

//                 )}
                 
//                 </Formik>   
                
//     </Col>
//             </Row>
//         </Container>
//     )
// }
// export default AddWorker



import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import instance from "../../axios";

import { addWorker } from "../redux/workerSlice";
import { setAreas } from "../redux/areaSlice";
import { useNavigate } from "react-router-dom";

function AddWorker() {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { area } = useSelector((state) => state.area);

 
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areaData = await instance.get("/area/get-all-area");
        dispatch(setAreas(areaData.data.area));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAreas();
  }, [dispatch]);


  const schema = yup.object().shape({
    fullName: yup.string().required("Enter full name"),
    email: yup.string().email("Invalid email").required("Enter email"),
    password: yup.string().required("Enter password"),
    areaId: yup.string().required("Select area"),
  });


  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await instance.post(
        "/user/add-worker",
        values,
        { withCredentials: true }
      );

      dispatch(addWorker(data.worker));
      toast.success(data.message);
      resetForm();
      navigate("/admin/list-worker")

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-3 mb-4">Add Worker</h1>

      <Row className="justify-content-center">
        <Col md={6}>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              areaId: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>

               
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    isInvalid={touched.fullName && !!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

               
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

               
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                
                <Form.Group className="mb-4">
                  <Form.Label>Select Area</Form.Label>
                  <Form.Select
                    name="areaId"
                    value={values.areaId}
                    onChange={handleChange}
                    isInvalid={touched.areaId && !!errors.areaId}
                  >
                    <option value="">-- Select Area --</option>
                    {area.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.areaName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.areaId}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Add Worker
                </Button>

              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default AddWorker;