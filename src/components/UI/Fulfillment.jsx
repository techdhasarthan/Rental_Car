import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/fulfillment.css"; // Import your CSS file for styling

const Fulfillment = () => {
  const [carDetails, setCarDetails] = useState({
    carName: "",
    car_no: "",
    category: "",
  });

  const [selectedOption, setSelectedOption] = useState("selfPickup");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { startdate, enddate } = location.state || {}; // Retrieve date from state
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    // Fetch car details from the API
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/getCustomerRentalCarsInfoBookingView`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              /* your requestBody */
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }

        const data = await response.json();
        const carData = {
          carName: data.data?.["Car Name"] || "",
          car_no: data.data?.["Car Number"] || "",
          category: data.data?.["Category"] || "",
        };

        setCarDetails(carData); // Store car details in state
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, []); // Empty dependency array ensures this runs once

  useEffect(() => {
    // Make the fulfillment request
    if (startDate && endDate && selectedOption && carDetails.carName) {
      const requestData = {
        fulfillmentType: selectedOption,
        deliveryInfo: deliveryInfo || "",
        extraInfo: extraInfo || "",
        startDate: startDate,
        endDate: endDate,
        carName: carDetails.carName,
        car_no: carDetails.car_no,
        category: carDetails.category,
      };
      
      console.log("Sending data:", requestData);

      fetch(`${BASE_URL}/submit-fulfillment-details`, {
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
  }, [selectedOption, startDate, endDate, deliveryInfo, extraInfo, carDetails]); // Dependencies ensure this triggers correctly

  // Other handlers...
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
      <div className="d-flex date_container flex-row me-1">
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
          city limits locations including Airport pickup/drop. The same will be
          confirmed upon KYC verification.
        </p>
      </div>
    </>
  );
};

export default Fulfillment;
