import { Carousel, Button } from "react-bootstrap";
import "./Carousal.css";

function Carousal() {
  return (
    <Carousel fade controls indicators>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="/images/caro3.jpg"
          alt="First slide"
        />
        <div className="overlay"></div>

        <Carousel.Caption className="carousel-content">
          <h1>Empowering Homes with Eco-Friendly Waste Solutions</h1>
          <p>
            We free you from the time and effort of taking out the garbage, so
            you can enjoy your free time.
          </p>

          <div className="carousel-buttons">
           
            {/* <Button variant="success">Book Home Waste Collection</Button> */}
           
          </div>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="/images/caro4.jpg"
          alt="Second slide"
        />
        <div className="overlay"></div>

        <Carousel.Caption className="carousel-content">
          <h1>Smart Recycling & Sustainable Living</h1>
          <p>
            Door-to-door waste collection with responsible recycling practices.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="/images/caro2.jpg"
          alt="Third slide"
        />
        <div className="overlay"></div>

        <Carousel.Caption className="carousel-content">
          <h1>Clean City, Green Future</h1>
          <p>
            Join us in building a cleaner and healthier environment.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousal;
