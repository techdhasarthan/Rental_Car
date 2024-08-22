import React, { useState } from 'react';
import '../../styles/fulfillment.css'; // Import your CSS file for styling

const Fulfillment = () => {
  const [selectedOption, setSelectedOption] = useState('selfPickup');
  const [deliveryInfo, setDeliveryInfo] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setSelectedOption(prevOption => prevOption === name ? '' : name);
  };

  const handleDeliveryInfoChange = (event) => {
    setDeliveryInfo(event.target.value);
  };

  const handleExtraInfoChange = (event) => {
    setExtraInfo(event.target.value);
  };

  return (
    <div className="fulfillment-container">
  
      <div className="radio-buttons">
        <label>
          <input
            type="checkbox"
            name="selfPickup"
            checked={selectedOption === 'selfPickup'}
            
            onChange={handleCheckboxChange}
          />
          Self-Pickup
        </label>
        <label>
          <input
            type="checkbox"
            name="delivery"
            checked={selectedOption === 'delivery'}
            onChange={handleCheckboxChange}
          />
          Delivery
        </label>
      </div>

      {selectedOption === 'selfPickup' && (
        <div className="select-input-container">
          <select className="select-input">
            <option value="">Select an option</option>
            <option value="option1">Kilampakkam</option>
            <option value="option2">Koyambedu</option>
            <option value="option3">Tambaram</option>
          </select>
        </div>
      )}

      {selectedOption === 'delivery' && (
        <div className="delivery-info-container">
          <input
            type="text"
            className="input-fieldss"
            placeholder="Enter delivery address"
            value={deliveryInfo}
            onChange={handleDeliveryInfoChange}
          />
          <textarea
            className="text-areas"
            placeholder="Enter delivery instructions or additional details"
            value={extraInfo}
            onChange={handleExtraInfoChange}
          />
        </div>
      )}

      <p className="disclaimer">
        <strong>Disclaimer  :</strong> Delivery Charges may vary for outside city limits locations including Airport pickup / drop. The same will be confirmed upon KYC verification.
      </p>
    </div>
  );
};

export default Fulfillment;
