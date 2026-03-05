import { Button, Col, Container, Form, Row } from "react-bootstrap"
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import instance from "../../axios";


const Register = ()=>{
    const { Formik } = formik;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const schema = yup.object().shape({
    fullName: yup.string().required("pls enter your fullname").min(2,"atleast 2 character required"),
    email: yup.string().required("pls enter your email").email("Invalid email format"),
    password: yup.string().required("pls enter your password here"),
    
  });
  async function handleSubmit(values){
    
    try{
      const {data} = await instance.post("auth/register",values)
      if(data.status){
        dispatch(userRegister(data.user))
        navigate("/login")
        toast.success(data.message)
      }else{
         toast.success(data.message)``
      }

    }catch(error){
       toast.error(error?.response?.data?.message || error?.message)

    }

  }
  

    return(

       <Container>
        <h1 className=" text-center mt-4 mb-3">Register Here</h1>
            <Row className=" justify-content-center">
                <Col md={6}>

                <Formik
                validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        fullName: '',
        email: '',
        password: '',
        
      }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors })=>(
                        <Form noValidate onSubmit={handleSubmit}>
           <Row className="mb-3">
        <Form.Group as={Col } controlId="formGridfullname">
          <Form.Label>FullName</Form.Label>
          <Form.Control  type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                isValid={touched.fullName && !errors.fullName} 
                isInvalid={touched.fullName && !!errors.fullName}
                />
                

                <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
         </Row>         


      <Row className="mb-3">
        <Form.Group as={Col } controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"
           placeholder="Enter email"
           name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && !!errors.email}
           />
           <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
         </Row>

        <Row>
             <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
           name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && !!errors.password}
          
          />
          <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        </Row>
       
      
  
        <Button className=" mt-4" variant="primary" type="submit">
        Submit
      </Button>

     
      
    </Form>

                    )}

 

                </Formik>
                 
                </Col>
            </Row>
        </Container>
    )
}

export default Register