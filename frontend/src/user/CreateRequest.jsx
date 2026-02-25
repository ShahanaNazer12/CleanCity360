import { Button, Col, Container, Form, Row } from "react-bootstrap"
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import instance from "../../axios";
import { setAreas } from "../redux/areaSlice";
import { addUserRequest } from "../redux/requestSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CreateRequest = () => {
  const { Formik } = formik;
  const schema = yup.object().shape({
    area: yup.string().required("choose your area"),
    description: yup.string().required("enter description"),

  });

  const { area } = useSelector((state) => state.area)
  console.log(area)

  const dispatch = useDispatch();
  const navigate = useNavigate();

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


  async function handleSubmit(values) {
    try {
      const { data } = await instance.post("/garbage/create-request", values, { withCredentials: true })
      dispatch(addUserRequest(data.requests))
      navigate("/user/track-requests")
      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);

    }
  }

  return (
    <Container>
      <h1 className=" text-center mt-3 mb-3">Request Form</h1>
      <Row className=" justify-content-center mt-2 mb-2">
        <Col md={6}>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              area: '',
              description: '',

            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group className="mb-3" controlId="areaId">
                    <Form.Label>Select Area</Form.Label>
                    <Form.Select
                      name="area"
                      value={values.area}
                      onChange={handleChange}
                      isInvalid={touched.area && !!errors.area}
                    >
                      <option value="">-- Select Area --</option>
                      {area.map((a) => (
                        <option key={a._id} value={a._id}>
                          {a.areaName}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.area}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label>description</Form.Label>
                    <Form.Control placeholder="description"
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isValid={touched.description && !errors.description}

                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
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

export default CreateRequest



