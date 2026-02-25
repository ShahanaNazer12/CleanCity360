import { Container, Row, Col, Card } from "react-bootstrap";

const features = [
  {
    icon: "💰",
    title: "Best Rates",
    desc: "Wastix gives you the best prices for your scrap from our trusted network of recyclers.",
  },
  {
    icon: "🚚",
    title: "Verified Pickup Team",
    desc: "Our trained and verified team comes to your doorstep for hassle-free scrap pickup.",
  },
  {
    icon: "⚖️",
    title: "Digital Weighing Scale",
    desc: "We use ISO-certified digital weighing scales to ensure accuracy and transparency.",
  },
  {
    icon: "🏠",
    title: "Hassle-Free Pickup",
    desc: "Wastix offers convenient doorstep pickup according to your preferred date and time.",
  },
  {
    icon: "🛡️",
    title: "Trust",
    desc: "Our trained staff uses smart weighing scale for reliable and verified transactions.",
  },
  {
    icon: "📅",
    title: "Convenience",
    desc: "We provide doorstep pickup at a time that suits your schedule.",
  },
  {
    icon: "♻️",
    title: "Eco-Friendly",
    desc: "Wastix ensures responsible recycling of your scrap to protect the environment.",
  },
];

const WhyChoose = () => {
  return (
    <section style={{ backgroundColor: "#90dbc0", padding: "70px 0" }}>
      <Container>
        <h2 className="text-center text-white fw-bold mb-5">
          Why Choose CleanCity360
        </h2>

        <Row className="g-4">
          {features.map((item, index) => (
            <Col key={index} lg={3} md={4} sm={6}>
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="text-center p-4">
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      backgroundColor: "#f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      margin: "0 auto 15px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <Card.Title className="fw-semibold mb-2">
                    {item.title}
                  </Card.Title>

                  <Card.Text className="text-muted small">
                    {item.desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChoose;
