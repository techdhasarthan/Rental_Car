import React from "react";
import "./card.css";

const HorizontalCard = ({ userdata }) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Destructure the userdata to get the details you want to display
  const {
    "Car Image Name": carImage,
    "Car Name": carName,
    "To Date": toDate,
    "Total Payable": totalAmount,
    "Car Number": carNumber,
  } = userdata;

  const fromDate = userdata["From Date"];

  return (
    <div className="card mb-3 custom-card w-100 shadow-lg">
      <div className="row g-0">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <img
            src={`${BASE_URL}/RetrieveFile/${carImage}`}
            alt={carName}
            className="img-fluid rounded-start custom-image"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="card-body">
            <h5 className="card-title fw-bolder">{carName}</h5>
            <div className="card-text-group">
              <p className="card-text">
                <strong>From</strong>
                <br />
                {fromDate}
              </p>
              <p className="card-text">
                <strong>To</strong>
                <br />
                {toDate}
              </p>
              <p className="card-text">
                <strong>Total Amount</strong>
                <br />${totalAmount}
              </p>
              <p className="card-text">
                <strong>Car Number</strong>
                <br /> {carNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
