import React from 'react';
import '../../styles/priceDetails.css'; // Import your CSS file

const PriceDetails = () => {
  return (
    <div className="price-details-container">
     
      <div className="price-item">
        <span className="price-label">Weekday Charges:</span>
        <span className="price-value">₹ 3500.0</span>
      </div>
      <div className="price-item">
        <span className="price-label">Weekend Charges:</span>
        <span className="price-value">₹ 0.0</span>
      </div>
      <div className="price-item">
        <span className="price-label">Base Fare:</span>
        <span className="price-value">₹ 3500.0</span>
      </div>
      <div className="price-item">
        <span className="price-label">Delivery Charge:</span>
        <span className="price-value">₹ 500.0</span>
      </div>
      <div className="price-item">
        <span className="price-label">Security Deposit:</span>
        <span className="price-value">₹ 5000.0</span>
      </div>
      <div className="price-item">
        <span className="price-label">Payable Amount:</span>
        <span className="price-value">₹ 9350.0</span>
      </div>
      <p className="price-disclaimer">*incl. of taxes</p>
      
    </div>
  );
};

export default PriceDetails;
