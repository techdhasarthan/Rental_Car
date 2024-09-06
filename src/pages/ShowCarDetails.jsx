import React, { useState } from "react";
import Fulfillment from "../components/UI/Fulfillment";
import PriceDetails from "../components/UI/PriceDetails";
import { Col } from "reactstrap";
import "./ShowCarDetails.css";

const ShowCarDetails = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="">
      <div className="text-end ps-5 me-3">
        <button
          onClick={toggleVisibility}
          className="custom-blue-btn rounded px-3 py-2">
          {isVisible ? "Not Now" : "Apply Now"}
        </button>
      </div>

      {/* Smooth Toggle Section */}
      <div className={`smooth-toggle ${isVisible ? "show" : ""}`}>
        <div className="row">
          {/* Fulfillment Details Section */}
          <Col lg="7" className="mt-4">
            <div className="booking-info mt-4">
              <h5 className="mb-4 fw-bold">Fulfillment Details</h5>
              <Fulfillment />
            </div>
          </Col>

          {/* Price Details Section */}
          <Col lg="5" className="mt-4">
            <div className="payment__info mt-4">
              <h5 className="mb-4 fw-bold">Price Details</h5>
              <PriceDetails />
              <div className="payment text-end mt-5">
                <button className="custom-blue-btn rounded px-3 py-2">
                  Reserve Now
                </button>
              </div>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default ShowCarDetails;
