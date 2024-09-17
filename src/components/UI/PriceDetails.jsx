import React from "react";
import "../../styles/priceDetails.css"; // Import your CSS file

const PriceDetails = ({response}) => {

  return (
    <div className="price-details-container">
      <div className="price-item">
        <span className="price-label">Booking Charges:</span>
        <span className="price-value">₹ {response.carRentCharges}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Delivery Charges:</span>
        <span className="price-value">₹ {response.deliveryCharges }</span>
      </div>
      <div className="price-item">
        <span className="price-label">Payable Amount:</span>
        <span className="price-value">₹ {response.totalPayable}</span>
      </div>
    </div>
  );
};

export default PriceDetails;
