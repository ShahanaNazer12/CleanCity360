
import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../redux/requestSlice";
import instance from "../../axios";
import { setWorkers } from "../redux/workerSlice";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const dispatch = useDispatch();

  const requests = useSelector((state) => state.requests.requests || []);
  const workers = useSelector((state) => state.workers.workers || []);

  console.log(workers)

  useEffect(() => {
  const fetchData = async () => {
    try {
      
      const reqRes = await instance.get( "garbage/view-requests", { withCredentials: true } );
      dispatch(setRequests(reqRes.data.requests));

     
      const workerRes = await instance.get( "user/get-all-workers",{ withCredentials: true });
      dispatch(setWorkers(workerRes.data.workers));

    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, [dispatch]);

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(
    (r) => r.status === "pending"
  ).length;
  const completedRequests = requests.filter(
    (r) => r.status === "completed"
  ).length;

  const workerCount = workers.length;


  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">WELCOME BACK ADMIN</h2>
          <p className="text-muted">
            Garbage Management System Overview
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="text-muted">Total Requests</h6>
              <h3 className="fw-bold">{totalRequests}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="text-muted">Pending Requests</h6>
              <h3 className="fw-bold text-warning">
                {pendingRequests}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="text-muted">Completed</h6>
              <h3 className="fw-bold text-success">
                {completedRequests}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
        <Link to='/admin/list-worker' style={{ textDecoration: "none", color: "inherit" }}>
         <Card className="shadow-sm">
            <Card.Body>
              <h6 className="text-muted">Workers</h6>
              <h3 className="fw-bold">{workerCount}</h3>
            </Card.Body>
          </Card>
        </Link>
         
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
