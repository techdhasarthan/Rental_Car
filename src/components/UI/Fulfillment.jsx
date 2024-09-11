import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/fulfillment.css"; // Import your CSS file for styling

const Fulfillment = () => {
  const [selectedOption, setSelectedOption] = useState("selfPickup");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const location = useLocation();
  const { startdate, enddate } = location.state || {}; // Retrieve date from state

  useEffect(() => {
    if (startdate && enddate) {
      setStartDate(startdate);
      setEndDate(enddate);
    } else {
      // Set default startDate to today at 10 AM and endDate to the next day at 10 AM
      const now = new Date();
      const start = new Date(now.setHours(10, 0, 0, 0)); // Today at 10 AM
      const end = new Date(start);
      end.setDate(end.getDate()); // Next day at 10 AM

      setStartDate(start.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
      setEndDate(end.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
    }
  }, [startdate, enddate]);

  // API call whenever dates or options are selected
  useEffect(() => {
    if (startDate && endDate && selectedOption) {
      const requestData = {
        fulfillmentType: selectedOption, // selfPickup or delivery
        deliveryInfo: deliveryInfo || "", // Delivery info (if applicable)
        extraInfo: extraInfo || "", // Extra info (if applicable)
        startDate: startDate,
        endDate: endDate,
      };

      console.log("Sending data:", requestData);

      // Make the API call using fetch
      fetch("https://api.example.com/submit-fulfillment-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedOption, startDate, endDate, deliveryInfo, extraInfo]);

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setSelectedOption(name);
  };

  const handleDeliveryInfoChange = (event) => {
    setDeliveryInfo(event.target.value);
  };

  const handleExtraInfoChange = (event) => {
    setExtraInfo(event.target.value);
  };

  const today = new Date().toISOString().slice(0, 16);

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    const currentDateTime = new Date(); // Current date and time
    const selectedStartDateTime = new Date(selectedStartDate);

    if (selectedStartDateTime < currentDateTime) {
      alert("You cannot select a past time.");
      return;
    }

    setStartDate(selectedStartDate);
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;

    if (new Date(selectedEndDate) < new Date(startDate)) {
      alert("End date cannot be earlier than the start date.");
      return;
    }

    setEndDate(selectedEndDate);
  };

  return (
    <>
      <div className="pb-5 pt-5">
        <div className="d-flex date_container flex-row">
          <div className="form-groups me-3">
            <label htmlFor="startDate">Start Date & Time</label>
            <input
              type="datetime-local"
              id="startDate"
              className="form-control"
              value={startDate}
              min={today} // Prevent past dates
              onChange={handleStartDateChange}
            />
          </div>

          <div className="form-groups">
            <label htmlFor="endDate">End Date & Time</label>
            <input
              type="datetime-local"
              id="endDate"
              className="form-control"
              value={endDate}
              min={startDate} // Prevent reverse dates
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <div className="fulfillment-container">
          <div className="radio-buttons">
            <label>
              <input
                type="checkbox"
                name="selfPickup"
                checked={selectedOption === "selfPickup"}
                onChange={handleCheckboxChange}
              />
              Self-Pickup
            </label>
            <label>
              <input
                type="checkbox"
                name="delivery"
                checked={selectedOption === "delivery"}
                onChange={handleCheckboxChange}
              />
              Delivery
            </label>
          </div>

          {selectedOption === "selfPickup" && (
            <div className="select-input-container">
              <select className="select-input">
                <option value="">Select an option</option>
                <option value="option1">Kilampakkam</option>
                <option value="option2">Koyambedu</option>
                <option value="option3">Tambaram</option>
              </select>
            </div>
          )}

          {selectedOption === "delivery" && (
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
            <strong>Disclaimer :</strong> Delivery Charges may vary for outside
            city limits locations including Airport pickup/drop. The same will
            be confirmed upon KYC verification.
          </p>
        </div>
      </div>
    </>
  );
};

export default Fulfillment;
