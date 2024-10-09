import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { message, Spin } from "antd";
import "./DateTime.css";
import { encrypt, decrypt } from "../utils/cryptoUtils";

const DateTimeInput = () => {
  const navigate = useNavigate();
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16);
    setStartDate(formattedNow);
    setMinDate(formattedNow);

    const later = new Date(now.getTime() + 60 * 60 * 1000);
    const formattedLater = later.toISOString().slice(0, 16);
    setEndDate(formattedLater);
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    try {
      const formattedStartdate = startdate;
      const formattedEnddate = enddate;

      const encryptedStartDate = encrypt(formattedStartdate);
      const encryptedEndDate = encrypt(formattedEnddate);

      console.log("Submitting startdate:", formattedStartdate);
      console.log("Submitting enddate:", formattedEnddate);

      localStorage.setItem("startdate", encryptedStartDate);
      localStorage.setItem("enddate", encryptedEndDate);

      navigate("/cars", {
        state: { startdate, enddate },
      });
    } catch (error) {
      console.error("Error during submission:", error);
      message.error("An error occurred while submitting. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container>
      <Row className="">
        <div className="form-container justify-content-center">
          <Spin spinning={loading}>
            {" "}
            {/* Wrap form with Spin for loading effect */}
            <form onSubmit={handleSubmit}>
              <div className="button-group pe-5">
                <div className="input-form-feild">
                  <div className="form-groups">
                    <label
                      htmlFor="startDate"
                      className="text-white text-center">
                      Pick Up
                    </label>
                    <input
                      type="datetime-local"
                      id="startDate"
                      className="form-control .shadow-white"
                      value={startdate}
                      min={minDate}
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
                      className="form-control2 .shadow-white"
                      value={enddate}
                      min={startdate}
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
          </Spin>
        </div>
      </Row>
    </Container>
  );
};

export default DateTimeInput;
