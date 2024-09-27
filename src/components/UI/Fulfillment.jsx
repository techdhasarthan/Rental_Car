import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/fulfillment.css"; // Import your CSS file for styling
import "../../pages/ShowCarDetails.css";
import PriceDetails from "../UI/PriceDetails";
import UploadCheckButton from "../../pages/UploadCheckButton";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { message } from "antd";
import Spinner from "react-bootstrap/Spinner";

import { Container, Row, Col } from "reactstrap";

const Fulfillment = ({ imgurl }) => {
  const image = imgurl;
  const [carDetails, setCarDetails] = useState({
    carName: "",
    car_no: "",
    category: "",
  });

  const userid = localStorage.getItem("id");
  const [isPriceDetailsVisible, setIsPriceDetailsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [isButtonVisible, setIsButtonVisible] = useState(true); // State for button visibility
  const [option, setOption] = useState("");
  const [resData, setResData] = useState("");
  const location = useLocation();
  const { slug } = useParams(); // Extract car name (slug) from the URL
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true); // Start loading when fetching car details
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

        setCarDetails(carData);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false); // Stop loading after fetching car details
      }
    };

    fetchCarDetails();
  }, [slug, BASE_URL]);

  const handleFulfillmentRequest = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when the request is initiated
    setIsButtonVisible(false); // Hide the button when loading starts

    const documentStatus = localStorage.getItem("status");

    if (documentStatus !== "true") {
      message.error("Please upload the required documents before applying.");
      setLoading(false); // Stop loading if document is not uploaded
      setIsButtonVisible(true); // Show the button again
      return;
    }

    if (startDate && endDate && selectedOption && carDetails.carName) {
      const requestData = {
        id: userid || "",
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
        const response = await fetch(
          `${BASE_URL}/getCustomerRentalCarsPriceDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit fulfillment details");
        }

        const data = await response.json();
        console.log("Success:", data);
        setIsPriceDetailsVisible(true); // Show PriceDetails after data is fetched
        setResData(data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Stop loading in both success and error cases
        setIsButtonVisible(false); // Show the button again after loading completes
      }
    } else {
      setLoading(false); // Stop loading if conditions are not met
      setIsButtonVisible(true); // Show the button again
    }
  };

  const handleSelectChange = (event) => {
    setOption(event.target.value);
    setDeliveryInfo("");
    setExtraInfo("");
  };

  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
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
    const currentDateTime = new Date();

    if (new Date(selectedStartDate) < currentDateTime) {
      setStartDate("");
      return;
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;

    if (new Date(selectedEndDate) < new Date(startDate)) {
      setEndDate("");
      return;
    }
    const currentDateTime = new Date();

    if (new Date(selectedEndDate) < currentDateTime) {
      setEndDate("");
      return;
    }

    setEndDate(selectedEndDate);
  };

  return (
    <>
      <Container>
        <Col>
          <form onSubmit={handleFulfillmentRequest}>
            <div className="pb-2">
              <div className="d-flex date_container flex-row me-3 ps-2">
                <div className="form-groups me-3">
                  <label htmlFor="startDate">Start Date & Time</label>
                  <input
                    required
                    type="datetime-local"
                    id="startDate"
                    className="form-control"
                    value={startDate}
                    min={today}
                    onChange={handleStartDateChange}
                  />
                </div>

                <div className="form-groups">
                  <label htmlFor="endDate">End Date & Time</label>
                  <input
                    required
                    type="datetime-local"
                    id="endDate"
                    className="form-control"
                    value={endDate}
                    min={startDate}
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
              <div className="fulfillment-container">
                <div className="radio-buttons">
                  <label>
                    <input
                      required
                      type="radio"
                      name="fulfillmentOption"
                      value="selfPickup"
                      checked={selectedOption === "selfPickup"}
                      onChange={handleCheckboxChange}
                    />
                    Self-Pickup
                  </label>
                  <label>
                    <input
                      required
                      type="radio"
                      name="fulfillmentOption"
                      value="delivery"
                      checked={selectedOption === "delivery"}
                      onChange={handleCheckboxChange}
                    />
                    Delivery
                  </label>
                </div>

                <UploadCheckButton />

                {selectedOption === "selfPickup" && (
                  <div className="select-input-container">
                    <select
                      required
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
                      required
                      type="text"
                      className="input-fieldss"
                      placeholder="Enter delivery address"
                      value={deliveryInfo}
                      onChange={handleDeliveryInfoChange}
                    />
                    <textarea
                      required
                      className="text-areas"
                      placeholder="Enter delivery instructions or additional details"
                      value={extraInfo}
                      onChange={handleExtraInfoChange}
                    />
                  </div>
                )}

                <p className="disclaimer">
                  <strong>Disclaimer:</strong> Delivery Charges may vary for
                  outside city limits locations including Airport pickup. You
                  can add specific instructions related to delivery.
                </p>
              </div>
            </div>
            <div
              className="d-flex justify-content-end text-end me-3 flex-column flex-md-row"
              data-aos="fade-up">
              <div className="w-100">
                <div className="row">
                  <div className="pt-3">
                    <div className="applybutton text-end d-flex justify-content-end">
                      {isButtonVisible && ( // Only show button if visible
                        <button
                          type="submit"
                          className="custom-blue-btn rounded px-2 py-2 w-md-auto"
                          disabled={loading} // Disable button while loading
                        >
                          Apply Now
                        </button>
                      )}
                      {loading && (
                        <Spinner
                          animation="border"
                          role="status"
                          className="ms-2">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      )}
                    </div>
                    {isPriceDetailsVisible && (
                      <div className="smooth-toggle show w-100">
                        <div className="row">
                          <div className="col-lg-12 mt-4">
                            <div className="payment__info mt-4">
                              <PriceDetails
                                response={resData}
                                startDate={startDate}
                                endDate={endDate}
                                imgurl={image}
                                fulfillmentType={option}
                                deliveryInfo={deliveryInfo}
                                extraInfo={extraInfo}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Col>
      </Container>
    </>
  );
};

export default Fulfillment;
