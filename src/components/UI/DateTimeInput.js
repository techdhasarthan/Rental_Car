import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DateTimeInput = () => {
  const navigate = useNavigate();

  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/cars", {
      state: { startdate, enddate },
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="button-group">
          <div className="input-form-feild">
            <div className="form-groups">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="datetime-local"
                id="startDate"
                className="form-control"
                value={startdate}
                onChange={handleStartDateChange}
                required
              />
            </div>

            <div className="form-groups">
              <label htmlFor="endDate">End Date</label>
              <input
                type="datetime-local"
                id="endDate"
                className="form-control2"
                value={enddate}
                onChange={handleEndDateChange}
                required
              />
            </div>
            <div className="form-groups">
              <label
                htmlFor="submitButton"
                className="hidelable"
                style={{ color: "white" }}>
                E{" "}
              </label>
              <input
                type="submit"
                id="submitButton"
                className="form-control-button"
                value="Submit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DateTimeInput;
