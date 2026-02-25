import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editWorker } from "../redux/workerSlice";
import { toast } from "react-toastify";
import instance from "../../axios";
import { setAreas } from "../redux/areaSlice";
import { useEffect } from "react";

function EditWorker() {
  const { Formik } = formik;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { workers } = useSelector((state) => state.workers);
  const { area } = useSelector((state) => state.area);
  console.log("areas---->",area)

  const worker = workers.find((w) => w._id === id);
  console.log("workers----->",workers);


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
    areaId: yup.string().required("Select area"),
  });

  if (!worker) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  const handleSubmit = async (values) => {
    try {
      const { data } = await instance.put(`/user/update-worker/${id}`,values,
        { withCredentials: true }
      );

      

      dispatch(editWorker(data.updatedWorker));
      toast.success(data.message);
      navigate("/admin/list-worker");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <Container>
      <h1 className="text-center">Edit Worker</h1>

      <Row className="justify-content-center">
        <Col md={6}>
          <Formik
            enableReinitialize
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              fullName: worker.fullName,
              email: worker.email,
              areaId: worker.assignedArea?._id ,
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

                
                <Form.Group className="mb-4">
                  <Form.Label>Assigned Area</Form.Label>
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

                <Button type="submit" className="w-100">
                  Update Worker
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default EditWorker;