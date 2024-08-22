import React, { useState } from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";

// import BlogList from "../components/UI/BlogList";
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
    answer:
      "Security deposit will be refunded within 10 Bank working days.",
  },
  {
    question: "Can I book an inter-state drop off??",
    answer:
      "No, we do not provide inter-state drop off",
  },
  {
    question: "Can I arrange for the car to be delivered to my home??",
    answer:
      "Yes, the vehicle will be dropped at your doorstep.",
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
    answer:
      "We work 24/7",
  },
  {
    question: "How will I be charged, if I return the car late??",
    answer:
      "Charges will be based on the extra hours and extra kilometers.",
  },
  {
    question: "Who will pay traffic violations? How will it be charged??",
    answer:
      "For such breaches, consumers have to compensate. This depends.",
  },
  {
    question: "Who will pay for parking and tolls??",
    answer:
      "Parking and Tolls charges you are required to pay. No refund will be done for the same.",
  },
  {
    question: "Where can I find the Car documents??",
    answer:
      "You can find the car documents in the dashboard.",
  },
];
const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
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
                  <h2>Explore the  Cars</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">How We Works</h2>
            </Col>
            <div class="steps-container">
              <div class="step-card">
                <div class="step-icon ri-book-2-line  pt-3"></div>
                <div class="step-title">Book</div>
                <p>Search and book a car on our site.</p>
              </div>
              <div class="step-card">
                <div class="step-icon ri-file-upload-line pt-3"></div>
                <div class="step-title">Upload Documents</div>
                <p>Upload your documents and pay a small security deposit.</p>
              </div>
              <div class="step-card">
                <div class="step-icon ri-roadster-fill  pt-3"></div>
                <i class=""></i>
                <div class="step-title">Get Vehicle</div>
                <p>
                  Take our vehicle from our hub or get it delivered to your
                  doorstep.
                </p>
              </div>
              <div class="step-card">
                <div class="step-icon ri-map-2-line pt-3"></div>

                <div class="step-title">Enjoy Trips</div>
                <p>Enjoy your ride with Lionea Cars.</p>
              </div>
              <div class="step-card">
                <div class="step-icon ri-text-wrap  pt-3"></div>
                <div class="step-title">Return</div>
                <p>
                  Return the car to the same location and fill out the end
                  checklist to end your trip.
                </p>
              </div>
            </div>
          </Row>
        </Container>
      </section>

      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
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

      {/* =========== become a driver section ============ */}
      <BecomeDriverSection />

      {/* =========== car offer section ============= */}
      <section className="mb-4">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

            {carData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
          <Row>
            <Col lg="12" className="text-center mt-5">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

      <section className="mb-4">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-2">
              <h6 className="section__subtitle">See  Our</h6>
              <h2 className="section__title">Frequently Asked Questions</h2>
            </Col>

         
            <div className="faq-container">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div
            className="faq-header"
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-question">{faq.question}</div>
            <div className="faq-toggle-icon">
              <i
                className={`ri-arrow-${activeIndex === index ? 'up' : 'down'}-s-line`}
              ></i>
            </div>
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
         
          </Row>
        </Container>
      </section>
      {/* =========== testimonial section =========== */}
      {/* <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section> */}

      {/* =============== blog section =========== */}
      {/* <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
};

export default Home;
