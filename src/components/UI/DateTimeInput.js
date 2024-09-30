import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import "./DateTime.css";

const DateTimeInput = () => {
  const navigate = useNavigate();

  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");

  useEffect(() => {
    // Set the current date and time for start date
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16); // Format to "YYYY-MM-DDTHH:mm"

    setStartDate(formattedNow);
    // Set end date to one hour later (you can adjust this logic as needed)
    const later = new Date(now.getTime() + 60 * 60 * 1000); // Add one hour
    const formattedLater = later.toISOString().slice(0, 16); // Format to "YYYY-MM-DDTHH:mm"

    setEndDate(formattedLater);
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("startdate", startdate);
    localStorage.setItem("enddate", enddate);

    navigate("/cars", {
      state: { startdate, enddate },
    });
  };

  return (
    <Container>
      <Row className="pt-5">
        <div className="form-container justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="button-group pe-5">
              <div className="input-form-feild">
                <div className="form-groups">
                  <label htmlFor="startDate" className="text-white text-center">
                    Pick Up
                  </label>
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
                  <label htmlFor="endDate" className="text-white text-center">
                    Drop
                  </label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    className="form-control2"
                    value={enddate}
                    onChange={handleEndDateChange}
                    required
                  />
                </div>
                <div className="form-groups mt-4">
                  <label
                    htmlFor="submitButton"
                    className="hidelable"
                    style={{ color: "white" }}>
                    {" "}
                  </label>
                  <button
                    type="submit"
                    id="submitButton"
                    className="form-control-button">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Row>
    </Container>
  );
};

export default DateTimeInput;
