
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