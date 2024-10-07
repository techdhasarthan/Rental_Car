import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { message } from "antd";
const FromToDate = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const location = useLocation();
  const { startdate, enddate } = location.state || {}; // Retrieve date from state

  // This useEffect sets default dates
  useEffect(() => {
    if (startdate && enddate) {
      setStartDate(startdate);
      setEndDate(enddate);
    } else {
      // Set default startDate to today at 10 AM and endDate to the next day at 10 AM
      const now = new Date();
      const start = new Date(now.setHours(10, 0, 0, 0)); // Today at 10 AM
      const end = new Date(start);
      end.setDate(end.getDate() + 1); // Next day at 10 AM

      setStartDate(start.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
      setEndDate(end.toISOString().slice(0, 16)); // Format to YYYY-MM-DDTHH:MM
    }
  }, [startdate, enddate]);

  useEffect(() => {
    if (startDate && endDate) {
      const requestData = {
        startDate: startDate,
        endDate: endDate,
      };

      console.log("Sending data:", requestData);

      // Make the API call using fetch
      fetch("https://api.example.com/submit-dates", {
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
  }, [startDate, endDate]);

  // Helper to check if two dates are on the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    const currentDateTime = new Date(); // Current date and time
    const selectedStartDateTime = new Date(selectedStartDate);

    // Prevent selecting past times if today is the selected start date
    if (isSameDay(selectedStartDateTime, currentDateTime)) {
      if (selectedStartDateTime < currentDateTime) {
        message.error("You cannot select a past time.");
        return;
      }
    }

    setStartDate(selectedStartDate);

    // Clear endDate if it's earlier than the new startDate
    if (new Date(endDate) < new Date(selectedStartDate)) {
      setEndDate(""); // Clear invalid endDate
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    const selectedStartDateTime = new Date(startDate);
    const selectedEndDateTime = new Date(selectedEndDate);
    const currentDateTime = new Date(); // Current date and time

    // Ensure endDate is valid and not in the past if it's on the same day as startDate
    if (isSameDay(selectedStartDateTime, selectedEndDateTime)) {
      if (selectedEndDateTime < selectedStartDateTime) {
        message.error(
          "End date and time must be after the start date and time."
        );
        return;
      }
    }

    // Ensure future times for the current day
    if (isSameDay(selectedEndDateTime, currentDateTime)) {
      if (selectedEndDateTime < currentDateTime) {
        message.error("You cannot select a past time for today.");
        return;
      }
    }

    setEndDate(selectedEndDate);
  };

  const today = new Date().toISOString().slice(0, 16);

  return (
    <div className="d-flex justify-content-end me-2">
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
  );
};

export default FromToDate;
