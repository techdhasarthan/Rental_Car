import React, { useState, useEffect } from "react";
import "../styles/home-car-details.css";
import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import carData from "../assets/data/carData"; // Ensure carData is correctly imported
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";

const faqs = [
  // ... your FAQ data
];

const locations = [
  { value: "Chennai", label: "Chennai" },
  { value: "Trichy", label: "Trichy" },
  { value: "Ramanathapuram", label: "Ramanathapuram" },
  { value: "Chicago", label: "Chicago" },
];

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredCars, setFilteredCars] = useState(carData); // State to store filtered cars
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (selectedLocation) {
      // Filter the carData based on selected location
      const filtered = carData.filter(
        (car) => car.location === selectedLocation
      );
      setFilteredCars(filtered);
    } else {
      // If no location is selected, show all cars
      setFilteredCars(carData);
    }
  }, [selectedLocation]);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
  };

  return (
    <Helmet title="Home mt-5">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Explore the Cars</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Steps Section */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">How We Works</h2>
            </Col>
            <div className="steps-container">
              {/* Your steps content here */}
            </div>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>
            <ServicesList />
          </Row>
        </Container>
      </section>

      {/* Become a Driver Section */}
      <BecomeDriverSection />

      {/* Car Offer Section */}
      <section className="mb-4">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
              {/*---------------------------------------------Filter Options ----------------------------------------*/}
              <div className="location-selector-item">
                <i className="ri-map-pin-line"></i>
                <select
                  value={selectedLocation}
                  onChange={handleLocationChange}>
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.value} value={location.value}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>

              {/*----------------------------------------------Filter Ends-------------------------------------------*/}
            </Col>

            {filteredCars.length > 0 ? (
              filteredCars.map((item) => <CarItem item={item} key={item.id} />)
            ) : (
              <Col lg="12" className="text-center">
                <p>No cars available for the selected location.</p>
              </Col>
            )}
          </Row>
          <Row>
            <Col lg="12" className="text-center mt-5">
              <h6 className="section__subtitle">Our clients say</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>
            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="mb-4">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-2">
              <h6 className="section__subtitle">See Our</h6>
              <h2 className="section__title">Frequently Asked Questions</h2>
            </Col>

            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div
                    className="faq-header"
                    onClick={() => toggleAccordion(index)}>
                    <div className="faq-question">{faq.question}</div>
                    <div className="faq-toggle-icon">
                      <i
                        className={`ri-arrow-${
                          activeIndex === index ? "up" : "down"
                        }-s-line`}></i>
                    </div>
                  </div>
                  <div
                    className={`faq-answer ${
                      activeIndex === index ? "open" : ""
                    }`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
