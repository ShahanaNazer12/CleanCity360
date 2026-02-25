import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import instance from "../../axios";
import { assignAreaToWorker, setWorkers } from "../redux/workerSlice";
import { setAreas } from "../redux/areaSlice";
import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from "react-toastify";

function AssignAreaToWorker(){

     const { Formik } = formik;

     const schema = yup.object().shape({
    areaId: yup.string().required("areaId is required"),
    workerId: yup.string().required("workerId is required"),
    
  });

   
    const {workers} = useSelector((state)=>state.workers);
    console.log("workers-------->",workers)
    const {area} = useSelector((state)=>state.area)
    const dispatch = useDispatch()

    

   useEffect(() => {
  const fetchData = async () => {
    try {
      const workerData = await instance.get("/user/get-all-workers");
      dispatch(setWorkers(workerData.data.workers));

      const areaData = await instance.get("/area/get-all-area");
      dispatch(setAreas(areaData.data.area));
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [dispatch]);


async function handleSubmit(values){
    try{
        const {data} = await instance.post("/user/assign-area", values, { withCredentials: true })
        dispatch(assignAreaToWorker(values))
        toast.success(data.message);

    }catch(error){
        toast.error(error?.response?.data?.message || error.message);

    }
}

    return(
          <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Assign Area to Worker</h2>

          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              workerId: "",
              areaId: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>

                
                <Form.Group className="mb-3" controlId="workerId">
                  <Form.Label>Select Worker</Form.Label>
                  <Form.Select
                    name="workerId"
                    value={values.workerId}
                    onChange={handleChange}
                    isInvalid={touched.workerId && !!errors.workerId}
                  >
                    <option value="">-- Select Worker --</option>
                    {workers.map((worker) => (
                      <option
                        key={worker._id}
                        value={worker._id}
                        disabled={worker.assignedArea}
                      >
                        {worker.fullName}
                        {worker.assignedArea && " (Assigned)"}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.workerId}
                  </Form.Control.Feedback>
                </Form.Group>

              
                <Form.Group className="mb-3" controlId="areaId">
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

                <div >
                  <Button variant="primary" type="submit">
                    Assign Area
                  </Button>
                </div>

              </Form>
            )}
          </Formik>

        </Col>
      </Row>
    </Container>
    )
}

export default AssignAreaToWorker