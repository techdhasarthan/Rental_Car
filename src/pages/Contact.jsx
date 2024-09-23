import React, { useState } from "react";
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
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const id = localStorage.getItem("id");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send
    const formData = {
      id,
      name,
      email,
      message,
    };

    // Send data to the backend
    try {
      alert(formData.message);
      const response = await fetch(`${BASE_URL}/contact `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        // Optionally, clear the form fields after successful submission
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error sending the message:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <h4 className="fw-bold mb-4">Get In Touch</h4>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Your Name"
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}></textarea>
                </FormGroup>

                <div className="text-left">
                  <button className="contact__btn " type="submit">
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
                    GA-2413 Genesis Creations Apartments Natham Link Road
                    Egattur, Navalur, Chennai, Tamil Nadu
                  </p>
                </div>
                <div className="d-flex  gap-2">
                  <h6 className="fs-6 mb-0" style={{ fontWeight: "600" }}>
                    Phone:
                  </h6>
                  <p className="section__description mb-0">+91 9962227523</p>
                </div>

                <div className="d-flex  gap-2">
                  <h6 className="mb-0 fs-6" style={{ fontWeight: "600" }}>
                    Email:
                  </h6>
                  <p className="section__description mb-0">
                    Lioneacars@gmail.com
                  </p>
                </div>

                <h4 className="fw-bold mt-4">Follow Us</h4>

                <div className="gap-4">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon pe-2">
                      <i className={item.icon}></i>
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
