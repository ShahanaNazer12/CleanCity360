import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axios";
import { toast } from "react-toastify";

function WorkerDashboard() {
  const navigate = useNavigate();

  const [assignedCount, setAssignedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const totalCount = assignedCount + completedCount;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        
        const assignedRes = await instance.get(
          "/user/view-request-worker",
          { withCredentials: true }
        );

       
        const completedRes = await instance.get(
          "/user/view-request-worker?status=completed",
          { withCredentials: true }
        );

        setAssignedCount(assignedRes.data.requests.length);
        setCompletedCount(completedRes.data.requests.length);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      }
    };

    fetchCounts();
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-1 fw-bold">WELCOME WORKER</h3>
      <p className="text-muted mb-4">Work overview</p>

      <Row className="g-3">
        
        <Col md={4}>
          <Card
            className="shadow-sm cursor-pointer"
           
          >
            <Card.Body>
              <p className="mb-1 text-muted">Total Requests</p>
              <h4>{totalCount}</h4>
            </Card.Body>
          </Card>
        </Col>

        
        <Col md={4}>
          <Card
            className="shadow-sm cursor-pointer"
            onClick={() => navigate("/worker/view-requests")}
          >
            <Card.Body>
              <p className="mb-1 text-muted">Assigned Requests</p>
              <h4 className="text-primary">{assignedCount}</h4>
            </Card.Body>
          </Card>
        </Col>

       
        <Col md={4}>
          <Card
            className="shadow-sm cursor-pointer"
            onClick={() => navigate("/worker/view-completed-requests")}
          >
            <Card.Body>
              <p className="mb-1 text-muted">Completed Requests</p>
              <h4 className="text-success">{completedCount}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default WorkerDashboard;
