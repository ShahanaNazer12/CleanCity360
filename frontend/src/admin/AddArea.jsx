import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { addArea } from "../redux/areaSlice";
import { toast } from "react-toastify";
import instance from "../../axios";
import { useNavigate } from "react-router-dom";


function AddArea() {
  const { Formik } = formik;
  const schema = yup.object().shape({
    areaName: yup.string().required(),

  });
  const dispatch = useDispatch();


  async function handleSubmit(values, { resetForm }) {
    try {
      const { data } = await instance.post("area/add-area", values, { withCredentials: true })
      dispatch(addArea(data.area))

      toast.success(data.message)
      resetForm();

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }

  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Add Area</h2>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              areaName: '',

            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
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

export default AddArea;
