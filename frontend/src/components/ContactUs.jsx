import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const ContactUs = () => {
  return (
    <section style={{ padding: "80px 0", backgroundColor: "#f8f9fa" }}>
      <Container>
        
       
        <div className="text-center mb-5">
          <h6 className="text-success fw-semibold">Contact Us</h6>
          <h2 className="fw-bold">Get in Touch with Clean City 360</h2>
          <p className="text-muted mt-2">
            Have questions or need support? We’re here to help.
          </p>
        </div>

        <Row className="g-4">
          
         
          <Col md={7}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4">
                <h5 className="fw-semibold mb-3">Send Us a Message</h5>

                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Your Name"
                        required
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Your Email"
                        required
                      />
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Your Message"
                      required
                    />
                  </Form.Group>

                  <Button variant="success" className="rounded-pill px-4">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

         
          <Col md={5}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <h5 className="fw-semibold mb-3">Contact Information</h5>

                <p className="text-muted mb-3">
                  📍 <strong>Address:</strong> Clean City 360, Kerala, India
                </p>

                <p className="text-muted mb-3">
                  📞 <strong>Phone:</strong> +91 98765 43210
                </p>

                <p className="text-muted mb-3">
                  ✉️ <strong>Email:</strong> support@cleancity360.com
                </p>

                <p className="text-muted">
                  🕒 <strong>Working Hours:</strong> Mon – Sat (9 AM – 6 PM)
                </p>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;
