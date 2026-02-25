import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRecycle, FaTruck, FaClipboardCheck } from "react-icons/fa";

function UserDashboard() {
  const navigate = useNavigate();
  const hasRequests = false;

  return (
    <div style={{ background: "#f4fdf8", minHeight: "80vh" }}>
      <Container className="py-5">

       
        <div className="text-center mb-5">
          <h2 className="fw-bold">Welcome to CleanCity360 </h2>
          <p className="text-muted mt-2">
            Keep your city clean by scheduling waste pickup easily
          </p>

          <Button
            variant="success"
            size="lg"
            className="mt-3 px-4"
            onClick={() => navigate("/user/create-request")}
          >
            Request Pickup
          </Button>
        </div>

        
        {!hasRequests && (
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <FaTruck size={40} className="text-success mb-3" />
                  <h5>Schedule Pickup</h5>
                  <p className="text-muted">
                    Request waste pickup at your convenience in just a few clicks.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <FaClipboardCheck size={40} className="text-success mb-3" />
                  <h5>Track Status</h5>
                  <p className="text-muted">
                    Track your request and get real-time status updates.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0 text-center">
                <Card.Body>
                  <FaRecycle size={40} className="text-success mb-3" />
                  <h5>Clean Environment</h5>
                  <p className="text-muted">
                    Help maintain a cleaner, greener city together.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default UserDashboard;
