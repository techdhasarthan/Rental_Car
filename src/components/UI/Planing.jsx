import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PricingPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("140 KM");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const location = useLocation();
  const { startdate, enddate } = location.state || {}; // Retrieve date from state

  useEffect(() => {
    if (startdate && enddate) {
      // Set startDate and endDate based on the selected date
      setStartDate(startdate);
      setEndDate(enddate);
    } else {
      // Set default startDate to today at 10 AM and endDate to the next day at 10 AM
      const now = new Date();
      const start = new Date(now.setHours(10, 0, 0, 0)); // Today at 10 AM
      const end = new Date(start);
      end.setDate(end.getDate() + 1); // Next day
      end.setHours(10, 0, 0, 0); // Next day at 10 AM

      setStartDate(start.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
      setEndDate(end.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
    }
  }, [startdate, enddate]);

  const handleSearch = () => {
    // Logic to handle search or form submission
    console.log(`Selected Plan: ${selectedPlan}`);
    console.log(`Start Date: ${startDate}`);
    console.log(`End Date: ${endDate}`);
  };

  return (
    <>
      <div className="button-group mb-5">
        <div className="input-form-feild">
          <div className="form-groups">
            <label htmlFor="startDate">Start Date </label>
            <input
              type="datetime-local"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="form-groups">
            <label htmlFor="endDate">End Date </label>
            <input
              type="datetime-local"
              id="endDate"
              className="form-control2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="form-groups">
            <label
              htmlFor="modifyButton"
              className="hidelable"
              style={{ color: "white" }}>
              E{" "}
            </label>
            <input
              type="button"
              id="modifyButton"
              className="form-control-button"
              value="Modify Search"
              onClick={handleSearch} // Handles search logic
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPlan;
