import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"; // Import useParams
import "../../styles/fulfillment.css"; // Import your CSS file for styling
import ShowCarDetails from "../../pages/ShowCarDetails";
import Document from "../../pages/Document";

const Fulfillment = () => {
  const [carDetails, setCarDetails] = useState({
    carName: "",
    car_no: "",
    category: "",
  });

  const [selectedOption, setSelectedOption] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [option, setOption] = useState("");

  const location = useLocation();
  const { startdate, enddate } = location.state || {}; // Retrieve date from state
  const { slug } = useParams(); // Extract car name (slug) from the URL
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Fetch car details from the API
    const fetchCarDetails = async () => {
      console.log("hellow");
      try {
        const requestBody = { ID: slug };
        const response = await fetch(
          `${BASE_URL}/getCustomerRentalCarsInfoBookingView`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
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
  }, [slug, BASE_URL]); // Added slug and BASE_URL as dependencies to avoid warnings

  // Trigger fulfillment request on button click
  const handleFulfillmentRequest = async () => {
    if (startDate && endDate && selectedOption && carDetails.carName) {
      if (selectedOption === "delivery") {
        setOption();
      } else if (selectedOption === "selfPickup") {
        setExtraInfo("");
        setDeliveryInfo("");
      }
      const requestData = {
        fulfillmentType: option || "",
        deliveryInfo: deliveryInfo || "",
        extraInfo: extraInfo || "",
        startDate: startDate,
        endDate: endDate,
        carName: carDetails.carName,
        car_no: carDetails.car_no,
        category: carDetails.category,
      };

      if (selectedOption === "delivery") {
        requestData.deliveryInfo = deliveryInfo || "";
        requestData.extraInfo = extraInfo || "";
      }

      console.log("Sending data:", requestData);

      try {
        const response = await fetch(`${BASE_URL}/fulfillment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          setIsVisible(false);
          throw new Error("Failed to submit fulfillment details");
        }

        const data = await response.json();
        alert(JSON.stringify(data));
        console.log("Success:", data);
      } catch (error) {
        setIsVisible(false);
        console.error("Error:", error);
      }
    }
  };

  // Toggle visibility and trigger the fulfillment request when button is clicked

  // Other handlers...

  const handleSelectChange = (event) => {
    setOption(event.target.value);
    setDeliveryInfo("");
    setExtraInfo("");
  };

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setSelectedOption(name);
  };

  const handleDeliveryInfoChange = (event) => {
    setDeliveryInfo(event.target.value);
    setOption("");
  };

  const handleExtraInfoChange = (event) => {
    setExtraInfo(event.target.value);
    setOption("");
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
      <div className="d-flex date_container flex-row me-3">
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
            <select
              className="select-input"
              value={option}
              onChange={handleSelectChange}>
              <option value="">Select an option</option>
              <option value="Kilampakkam">Kilampakkam</option>
              <option value="Koyambedu">Koyambedu</option>
              <option value="Tambaram">Tambaram</option>
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
      <div className="text-end ps-5 me-3 pt-2">
        <button onClick={handleFulfillmentRequest}>
          {/* {isVisible ? "Not Now" : "Apply Now"} */}
        </button>
        {isVisible ? <ShowCarDetails /> : "not found"}
      </div>
    </>
  );
};

export default Fulfillment;

// className="custom-blue-btn rounded px-3 py-2"
