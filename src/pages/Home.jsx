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
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const faqs = [
  {
    question: "What do I need to rent a car?",
    answer:
      'To avail Lionea  car service you must be at least 21 years old, and your driving license for "Light Motor Vehicles" must be at least 1 year old (at the time of starting the trip). Driving license printed on A4 sheet of paper (original or otherwise), driving license on M-Parivaahan app and commercial driving licenses will not be accepted.',
  },
  {
    question: "Can I book for any period of time?",
    answer:
      "The Minimum booking hours for weekdays is 18 hours, and on weekends it is 18 hours.",
  },
  {
    question: "How much time will you take to refund the security deposit?",
    answer: "Security deposit will be refunded within 10 Bank working days.",
  },
  {
    question: "Can I book an inter-state drop off??",
    answer: "No, we do not provide inter-state drop off",
  },
  {
    question: "Can I arrange for the car to be delivered to my home??",
    answer: "Yes, the vehicle will be dropped at your doorstep.",
  },
  {
    question: "Can I make changes to my booking? ?",
    answer:
      "You can extend / modify the booking post confirmation from customer support.",
  },
  {
    question: "Can anyone besides the reservation applicant pick up the car??",
    answer:
      "No, only the applicant on whose name the booking has been confirmed and verified, will be allowed to pick up the car.",
  },
  {
    question: "Do I need to pay any amount to cross the border??",
    answer:
      "Yes. You have to pay the amount as per the applicable law of the state which you intend to cross/travel. Wowcarz will refund only if an annual permit is purchased. However, reimbursement will be done based on the usage.",
  },
  {
    question: "Where can I return the vehicle, if the location is closed??",
    answer: "We work 24/7",
  },
  {
    question: "How will I be charged, if I return the car late??",
    answer: "Charges will be based on the extra hours and extra kilometers.",
  },
  {
    question: "Who will pay traffic violations? How will it be charged??",
    answer: "For such breaches, consumers have to compensate. This depends.",
  },
  {
    question: "Who will pay for parking and tolls??",
    answer:
      "Parking and Tolls charges you are required to pay. No refund will be done for the same.",
  },
  {
    question: "Where can I find the Car documents??",
    answer: "You can find the car documents in the dashboard.",
  },
];

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredCars, setFilteredCars] = useState(carData); // State to store filtered cars
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

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
      {/* <section className="p-0 hero__slider-section"> */}
      <HeroSlider />

      {/* Steps Section */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle" data-aos="flip-left">
                See our
              </h6>
              <h2 className="section__title" data-aos="flip-left">
                How We Works
              </h2>
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
            <Col lg="12" className="mb-5 text-center" data-aos="flip-left">
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
            <Col lg="12" className="text-center mb-5" data-aos="flip-left">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
              {/*---------------------------------------------Filter Options ----------------------------------------*/}
            </Col>
            {/*----------------------------------------------Filter Ends-------------------------------------------*/}
            {filteredCars.length > 0 ? (
              filteredCars.map((item) => (
                <Col lg="4" md="4" sm="6" className="mb-5" data-aos="flip-left">
                  <Link to="/cars" className="text-decoration-none text-reset">
                    <div className="car__item">
                      <div className="car__img">
                        <img src={item.imgUrl} alt="" className="w-100" />
                      </div>

                      <div className="car__item-content mt-4">
                        <h4 className="section__title text-center">
                          {item.carName}
                        </h4>
                        {/* <h6 className="rent__price text-center mt-2">
                        Rs. {item.price}.00 <span>/ Day</span>
                      </h6> */}

                        <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                          <span className="d-flex align-items-center gap-1">
                            <i className="ri-wheelchair-line"></i>{" "}
                            {item.no_seat} Seats
                          </span>
                          <span className="d-flex align-items-center gap-1">
                            <i className="ri-settings-2-line"></i>{" "}
                            {item.transmission_type}
                          </span>
                          <span className="d-flex align-items-center gap-1">
                            <i className="ri-drop-line"></i> {item.oil}
                          </span>
                        </div>

                        {/* Button to navigate to car page */}
                        {/* <Link to="/cars">
                        <button className="w-100 car__item-btn car__btn-details text-white">
                          Enquiry Now
                        </button>
                      </Link> */}
                      </div>
                    </div>
                  </Link>
                </Col>
              ))
            ) : (
              <Col lg="12" className="text-center" data-aos="flip-left">
                <p>No cars available for the selected location.</p>
              </Col>
            )}
          </Row>
          <Row>
            <Col lg="12" className="text-center mt-5" data-aos="flip-left">
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
