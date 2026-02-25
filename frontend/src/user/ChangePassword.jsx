import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import instance from "../../axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { Formik } = formik;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    currentPassword: yup.string().required("Please enter current password"),
    newPassword: yup.string().required("Please enter new password").min(3, "Password must be at least 6 characters"),
    
  });

  async function handleSubmit(values, { resetForm }) {
    try {
      const { data } = await instance.patch(
        "/auth/password-update",
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        { withCredentials: true }
      );

      if (data.status) {
        toast.success(data.message);
       navigate("/user/view-profile")
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  return (
    <Container>
      <h2 className="text-center mt-4 mb-3">Change Password</h2>

      <Row className="justify-content-center">
        <Col md={5}>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              currentPassword: "",
              newPassword: "",
              
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form onSubmit={handleSubmit}>

                
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={values.currentPassword}
                    onChange={handleChange}
                    isInvalid={
                      touched.currentPassword && !!errors.currentPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.currentPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    isInvalid={touched.newPassword && !!errors.newPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                

                <Button type="submit" className="mt-2">
                  Update Password
                </Button>

              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
