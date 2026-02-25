import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import instance from "../../axios";
import { updateUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    fullName: yup.string().min(2, "At least 2 characters"),
    email: yup.string().email("Invalid email"),
    
  });

  async function handleSubmit(values) {
    try {
      const { data } = await instance.put(
        "/auth/profile-update",
        values,
        { withCredentials: true }
      );

      if (data.status) {
        dispatch(updateUser(data.user));
        toast.success(data.message);
        navigate("/user/user-dashboard")
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  return (
    <Container>
      <h2 className="text-center mt-4 mb-3">Update Profile</h2>

      <Row className="justify-content-center">
        <Col md={6}>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              fullName: user?.fullName || "",
              email: user?.email || "",
            
            }}
            enableReinitialize
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

                

           

              

                <Button type="submit" className="mt-3">
                  Update Profile
                </Button>

              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfile;
