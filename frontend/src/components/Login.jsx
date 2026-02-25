import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom"
import * as formik from 'formik';
import * as yup from 'yup';
import { userLogin } from "../redux/authSlice";
import { toast } from "react-toastify";
import instance from "../../axios";

function Login(){
  const { Formik } = formik;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
    console.log("isauthenticated-------->",isAuthenticated)

    const schema = yup.object().shape({
   
    email: yup.string().required("pls enter your email").email("Invalid email format"),
    password: yup.string().required("pls enter your password here"),
    
  });

  const handleLogin = async(values)=>{
    // dispatch(userLogin(values))
    // navigate('/')
    // toast.success("user logged in successfully")
    try{
      const {data} = await instance.post("auth/login",values,{withCredentials:true})
      dispatch(userLogin(data.user))
      toast.success(data.message)
      // navigate('/')
      if (data.user.role === "admin") {
      navigate("/admin/admin-dashboard");
    } else if (data.user.role === "worker") {
      navigate("/worker/worker-dashboard");
    } else {
      navigate("/user/user-dashboard");
    }

     

    }catch(error){
      toast.error(error?.response?.data?.message || error.message)

    }
  }

    return(
        <>
       
          <Container>
          <h1 className=" text-center mb-3 mt-3">Login Page</h1>
        
            <Row className=" justify-content-center">
                <Col md={6}>

                <Formik
                validationSchema={schema}
      onSubmit={handleLogin}
      initialValues={{
       
        email: '',
        password: '',
        
      }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors })=>(
                        <Form noValidate onSubmit={handleSubmit}>
                


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
            <p className=" text-center mt-3">if you dont have an accound,
             <Link to={'/register'}>Register here</Link>
             </p>

        </Container>
        
       
        
        
      
    </>
    )
}

export default Login