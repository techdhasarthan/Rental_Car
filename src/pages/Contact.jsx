import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { message } from "antd";
import "../styles/contact.css";
import axios from "axios";

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
  const [Message, setMessage] = useState("");
  const id = "";

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send
    const jsonObj = JSON.parse("{}");
    jsonObj["ID"] = id;
    jsonObj["Name"] = name;
    jsonObj["Contact"] = email + "";
    jsonObj["Message"] = Message;

    // Send data to the backend

    try {
      const response = await fetch(
        `${BASE_URL}/updateCustomerFeedbackDetails`,
        {
          method: "POST", // Set method to POST
          headers: {
            "Content-Type": "application/json", // Specify that we're sending JSON
          },
          body: JSON.stringify(jsonObj), // Convert the JSON object to a string before sending
        }
      );

      const responseData = await response.json();

      if (responseData["status"] === "true") {
        message.success("Thank you for your feedback");
        // Optionally, clear the form fields after successful submission
        setName("");
        setEmail("");
        setMessage("");
      } else {
        message.error("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error sending the message:", error);

      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <h4 className="fw-bold mb-4">Feedback</h4>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input
                    placeholder="Your Name"
                    required
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input
                    required
                    placeholder="Email / Phone Number"
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    required
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                    value={Message}
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
