import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-circle-fill",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-box-fill",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  return (
    <Helmet title="Contact">
    <CommonSection title="Contact" />
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <h4 className="fw-bold mb-4">Get In Touch</h4>
  
            <Form>
              <FormGroup className="contact__form">
                <Input placeholder="Your Name" type="text"  className="input"  />
              </FormGroup>
              <FormGroup className="contact__form">
                <Input placeholder="Email" type="email" className="input" />
              </FormGroup>
              <FormGroup className="contact__form">
                <textarea rows="5" placeholder="Message" className="textarea"></textarea>
              </FormGroup>
  
            <div  className="text-left">
            <button className="contact__btn " type="submit"  >
                Send Message
              </button> 
            </div>
            </Form>
          </Col>
  
          <Col lg="1" md="1">
          {/* Optionally add additional content here */}
        </Col>
  
          <Col lg="5" md="5">
            <div className="contact__info">
              <h4 className="fw-bold">Contact Information</h4>
             
              <div>
               
              <p className="section__description mb-0">
              GA-2413 Genesis Creations Apartments Natham Link Road Egattur, Navalur, Chennai, Tamil Nadu
              </p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <h6 className="fs-6 mb-0  " style={{fontWeight:"600"}}>Phone:</h6>
                <p className="section__description mb-0">+91  9962227523</p>
              </div>
  
              <div className="d-flex align-items-center gap-2">
                <h6 className="mb-0 fs-6" style={{fontWeight:"600"}}>Email:</h6>
                <p className="section__description mb-0">Lioneacars@gmail.com</p>
              </div>
  
              <h4 className="fw-bold mt-4">Follow Us</h4>
  
              <div className="d-flex align-items-center gap-4 mt-3">
                {socialLinks.map((item, index) => (
                  <Link to={item.url} key={index} className="social__link-icon">
                    <i class={item.icon}></i>
                  </Link>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
  
  );
};

export default Contact;
