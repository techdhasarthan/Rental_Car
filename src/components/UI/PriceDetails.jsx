import React from "react";
import "../../styles/priceDetails.css";

const PriceDetails = ({ priceData }) => {
  return (
    <div className="price-details-container">
      <div className="price-item">
        <span className="price-label">Booking Charges:</span>
        <span className="price-value">₹ {priceData.bookingCharges}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Delivery Charges:</span>
        <span className="price-value">₹ {priceData.deliveryCharges}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Payable Amount:</span>
        <span className="price-value">₹ {priceData.payableAmount}</span>
      </div>
    </div>
  );
};

export default PriceDetails;
