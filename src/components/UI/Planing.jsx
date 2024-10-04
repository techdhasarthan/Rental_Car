import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { encrypt, decrypt } from "../utils/cryptoUtils";

const PricingPlan = ({ setStartDateProp, setEndDateProp }) => {
  // Retrieve encrypted dates from localStorage and decrypt them
  const fromdate = decrypt(localStorage.getItem("startdate"));
  const todate = decrypt(localStorage.getItem("enddate"));

  // Use the localStorage values as initial values for state
  const [startDate, setStartDate] = useState(fromdate);
  const [endDate, setEndDate] = useState(todate);
  setEndDateProp(endDate);
  setStartDateProp(startDate);
  const location = useLocation();
  const { startdate, enddate } = location.state || {}; // Retrieve date from state

  // Get the current date and time for setting `min` value
  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
  };

  // Load default values for start and end dates when the component mounts
  useEffect(() => {
    if (startdate && enddate) {
      // If dates are passed via location state, use them
      setStartDate(startdate);
      setEndDate(enddate);
    } else if (fromdate && todate) {
      // If localStorage has the dates, use those
      setStartDate(fromdate);
      setEndDate(todate);
    } else {
      // Default to a start time of 10 AM today and 10 AM next day for the end time
      const now = new Date();
      const start = new Date(now.setHours(10, 0, 0, 0)); // Today at 10 AM
      const end = new Date(start);
      end.setDate(end.getDate() + 1); // Next day
      end.setHours(10, 0, 0, 0); // Next day at 10 AM

      setStartDate(start.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
      setEndDate(end.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
    }
  }, [startdate, enddate, fromdate, todate]);

  // Update localStorage and state when startDate changes
  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
  };

  // Update localStorage and state when endDate changes
  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;

    setEndDate(selectedEndDate);

    // Save the new endDate to localStorage immediately
  };

  return (
    <div className="button-group ">
      <div className="input-form-feild">
        <div className="form-groups p-0">
          <label htmlFor="startDate">Start Date </label>
          <input
            type="datetime-local"
            id="startDate"
            className="form-control3"
            value={startDate}
            // Set min to current date/time
            onChange={handleStartDateChange} // Handle start date change
          />
        </div>

        <div className="form-groups p-0">
          <label htmlFor="endDate">End Date </label>
          <input
            type="datetime-local"
            id="endDate"
            className="form-control4"
            value={endDate}
            // Set min to startDate or current date/time
            onChange={handleEndDateChange} // Handle end date change
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
