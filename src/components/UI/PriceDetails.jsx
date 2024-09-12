import React from "react";
import "../../styles/priceDetails.css"; // Import your CSS file

const PriceDetails = () => {
  return (
    <div className="price-details-container">
      <div className="price-item">
        <span className="price-label">Booking Charges:</span>
        <span className="price-value">₹ 3500.0</span>
      </div>
      <div className="price-item">
        <span className="price-label">Delivery Charges:</span>
        <span className="price-value">₹ 0.0</span>
      </div>
      <div className="price-item">
        <span className="price-label">Payable Amount:</span>
        <span className="price-value">₹ 9350.0</span>
      </div>
    </div>
  );
};

export default PriceDetails;
