import React, { useEffect } from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";
import moto from "../assets/all-images/blog-img/blog-1.jpg";
import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <Helmet title="About">
      <CommonSection title="About Us" data-aos="flip-left" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" data-aos="fade-up-right">
              <div className="about__page-img my-2">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12" data-aos="fade-up-left">
              <div className="about__page-content">
                <h2 className="section__title">
                  We Are Committed To Provide Lionea Ride Solutions
                </h2>

                <p className="section__description">
                  Once upon a time in 2013, a young and adventurous couple named
                  Arun and Janani embarked on a remarkable journey. Fueled by
                  their passion for travel and a deep desire to offer more
                  friendly travel options to fellow enthusiasts, they laid the
                  foundation of LIONEA CARS. Their vision was simple yet
                  profound – to provide individuals with the freedom to drive
                  and explore new places, creating unforgettable memories along
                  the way.{" "}
                </p>

                <p className="section__description">
                  From the very beginning, Arun and Janani understood the unique
                  needs of their customers, especially corporate employees who
                  sought reliable and comfortable transportation options. With
                  unwavering dedication, LIONEA CARS quickly became synonymous
                  with smooth and dependable car rental services in Chennai,
                  satisfying customers for over three decades. With a treasure
                  trove of knowledge and a fleet of meticulously maintained
                  vehicles, LIONEA CARS now offers a wide range of self-driven
                  cars for individuals to embark on their own adventures.
                </p>

                {/* <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+00123456789</h4>
                  </div>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" data-aos="fade-up-right">
              <div className="about__page-content">
                <h2 className="section__title">
                  Passionate About Providing Top-Tier Ride Solutions
                </h2>

                <p className="section__description">
                  Lionea Cars: Delivering Top-Quality Customer Support in
                  Chennai. Our primary objective is to provide exceptional car
                  rental services at key locations - CHENNAI-OMR, CHENNAI ECR,
                  CHENNAI SOUTH. We believe dedication and commitment are the
                  keys to success and the collective growth of our company.{" "}
                </p>

                <p className="section__description">
                  At LIONEA CARS, we believe in empowering you with the freedom
                  to create your own travel stories. With our easy-to-use
                  booking system and competitive rates, renting a self-driven
                  car has never been easier. Experience the joy of driving on
                  open roads, discovering hidden treasures, and creating
                  memories that will last a lifetime. Every car in our fleet is
                  handpicked and undergoes regular maintenance to ensure a safe
                  and comfortable drive. We understand that cleanliness and
                  hygiene are paramount, especially in today's world. That's why
                  each car's interior is thoroughly sanitized, providing you
                  with a hygienic and pleasant environment throughout your
                  journey.{" "}
                </p>

                {/* <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+00123456789</h4>
                  </div>
                </div> */}
              </div>
            </Col>
            <Col lg="6" md="6" sm="12" data-aos="fade-up-left">
              <div className="about__page-img">
                <img src={moto} alt="" className="w-100 rounded-3" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <BecomeDriverSection />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center" data-aos="flip-right">
              <h6 className="section__subtitle">Experts</h6>
              <h2 className="section__title">Our Members</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>

      <section>
        <Container className="mb-5">
          <Row>
            <Col lg="12" className="mb-4 text-center" data-aos="flip-left">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
