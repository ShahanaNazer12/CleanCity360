import { Container, Row, Col, Button } from "react-bootstrap";

const AboutUs = () => {
  return (
    <section style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}>
      <Container className=" mt-4">
        <Row className="align-items-center">
          
        
          <Col md={6}>
            <h6 className="text-success fw-semibold mb-2">
              About CleanCity360
            </h6>

            <h2 className="fw-bold mb-4">
              Making Cities Cleaner, Smarter & Sustainable
            </h2>

            <p className="text-muted mb-3">
              Clean City 360 is a smart waste management platform designed to
              simplify garbage collection and recycling through technology.
              We connect citizens, verified pickup teams, and authorities on
              one transparent digital platform.
            </p>

            <p className="text-muted mb-4">
              Our mission is to promote eco-friendly waste disposal, ensure
              transparency through digital tracking, and help cities move
              towards a cleaner and greener future.
            </p>

            <Button variant="success" className="rounded-pill px-4">
              Learn More
            </Button>
          </Col>

         
          <Col md={6} className="text-center mt-4 mt-md-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              alt="Waste Management"
              className="img-fluid"
              style={{ maxHeight: "360px" }}
            />
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
