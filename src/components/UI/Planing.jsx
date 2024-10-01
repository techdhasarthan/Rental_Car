import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PricingPlan = ({ setStartDateProp, setEndDateProp }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const location = useLocation();
  const { startdate, enddate } = location.state || {}; // Retrieve date from state

  // Get the current date and time for setting `min` value
  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
  };

  useEffect(() => {
    if (startdate && enddate) {
      // Use dates passed via location state if available
      setStartDate(startdate);
      setEndDate(enddate);
    } else {
      // Default start and end date logic
      const now = new Date();
      const start = new Date(now.setHours(10, 0, 0, 0)); // Today at 10 AM
      const end = new Date(start);
      end.setDate(end.getDate() + 1); // Next day
      end.setHours(10, 0, 0, 0); // Next day at 10 AM

      setStartDate(start.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
      setEndDate(end.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
    }
  }, [startdate, enddate]);

  // Handle startDate change
  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

    // Automatically adjust endDate if it's before startDate
    if (new Date(selectedStartDate) >= new Date(endDate)) {
      const newEndDate = new Date(selectedStartDate);
      newEndDate.setDate(newEndDate.getDate() + 1); // Next day
      setEndDate(newEndDate.toISOString().slice(0, 16));
    }

    // Update parent component with new start date
    setStartDateProp(selectedStartDate);
  };

  // Handle endDate change
  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    if (new Date(selectedEndDate) >= new Date(startDate)) {
      setEndDate(selectedEndDate);
      setEndDateProp(selectedEndDate); // Update parent component with new end date
    }
  };

  return (
    <div className="button-group ">
      <div className="input-form-feild">
        <div className="form-groups ">
          <label htmlFor="startDate" className="text-white">
            Start Date{" "}
          </label>
          <input
            type="datetime-local"
            id="startDate"
            className="form-control3"
            value={startDate}
            min={getMinDateTime()} // Set min to current date/time
            onChange={handleStartDateChange} // Handle start date change
          />
        </div>

        <div className="form-groups">
          <label htmlFor="endDate" className="text-white">
            End Date{" "}
          </label>
          <input
            type="datetime-local"
            id="endDate"
            className="form-control4"
            value={endDate}
            min={startDate || getMinDateTime()} // Set min to startDate or current date/time
            onChange={handleEndDateChange} // Handle end date change
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
