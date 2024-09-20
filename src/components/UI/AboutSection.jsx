import { React, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const AboutSection = ({ aboutClass }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage" ? { marginTop: "0px" } : { marginTop: "0px" }
      }>
      <Container>
        <Row>
          <Col lg="6" md="6" data-aos="fade-right">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to car rent service</h2>
              <p className="section__description">
                Looking for hassle-free self-drive car rental services in
                Chennai? Look no further than Lionea Cars! As a leading car
                rental company, we offer a wide range of well-maintained
                vehicles for self-drive purposes. Whether you're a local
                resident or a visitor exploring the city, our affordable rates
                and top-notch customer service make us the go-to choice for your
                transportation needs. Enjoy the freedom and convenience of
                exploring Chennai at your own pace with our reliable self-drive
                car rental solutions. Book your vehicle today and embark on an
                unforgettable journey with Lionea Cars!
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Wide range of
                  well-maintained vehicles
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Affordable rates for
                  all budgets
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i>Flexible rental options
                  to your needs
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i>Convenient booking and
                  pick-up locations
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6" data-aos="fade-left">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
