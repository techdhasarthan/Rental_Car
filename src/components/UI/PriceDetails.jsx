import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/priceDetails.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message, Spin } from "antd";

const PriceDetails = () => {
  const { slug } = useParams();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const startdate =
    localStorage.getItem("fromdate") || localStorage.getItem("startdate");
  const enddate =
    localStorage.getItem("todate") || localStorage.getItem("enddate");
  const carno = localStorage.getItem("carno");
  const customerId = localStorage.getItem("id");
  const fulfillmentType = localStorage.getItem("fulfillment");
  const deliveryInfo = localStorage.getItem("deliveryInfo");
  const extraInfo = localStorage.getItem("extraInfo");

  const [price, setPrice] = useState({});
  const [profileData, setProfileData] = useState(null);
  const [carData, setCarData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resData, setResData] = useState(null);
  const [showContent, setShowContent] = useState(false); // State to control content display

  // Determine pickup method

  // Fetch Profile Data
  const fetchProfileData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getCustomerProfileDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: customerId }),
      });

      if (!res.ok)
        throw new Error(`Failed to fetch profile data. Status: ${res.status}`);
      const data = await res.json();
      setProfileData(data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch Car Data
  const fetchCarDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const requestBody = { ID: slug };
      const res = await fetch(
        `${BASE_URL}/getCustomerRentalCarsInfoBookingView`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch car details");

      const data = await res.json();
      setCarData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Reservation Click
  const handleReserveClick = async () => {
    const documentCheckStatus = localStorage.getItem("status");

    if (!profileData || !carData) {
      console.error("Profile or car data is missing");
      return;
    }
    if (documentCheckStatus == "true") {
      const now = new Date();
      const currentDateTime = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM

      const combinedRequestBody = {
        ID: "",
        "Created Date": currentDateTime,
        "Customer Name": profileData.Name,
        "Mobile Number": profileData["Phone Number"],
        "Email ID": profileData["Email ID"],
        "Car Number": carData["Car Number"],
        "Car Name": carData["Car Name"],

        "Pickup Type": fulfillmentType || "",
        "Delivery / pickup Charges": price.carRentCharges,
        "Car Rent Charges": price.deliveryCharges,
        "Total Payable": price.totalPayable,
        "Approve Status": "New Booking",
        "Car Image Name": "", // Populate if needed
        Address: deliveryInfo || "",
        "Extra Info": extraInfo || "",
        "Pickup Date": startdate,
        "Return Date": enddate,
      };

      localStorage.setItem(
        "combinedRequestBody",
        JSON.stringify(combinedRequestBody)
      );

      try {
        const apiResponse = await fetch(
          `${BASE_URL}/updateAdminViewCustomerCarRentBookingDetails`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(combinedRequestBody),
          }
        );

        const responseData = await apiResponse.json();
        setResData(responseData.data);

        if (responseData.status === "true") {
          message.success("Car reservation successful!");
          console.log("Reservation successful!", combinedRequestBody);
          localStorage.removeItem("fulfillment");
          localStorage.removeItem("deliveryInfo");
          localStorage.removeItem("extraInfo");
        } else {
          message.error(
            "Car is not available, please schedule for another time period."
          );
          throw new Error("Failed to reserve. Status: false");
        }
      } catch (error) {
        console.error("Error occurred during reservation:", error);
      }
    } else {
      message.error("please upload Document file!");
    }
  };

  useEffect(() => {
    if (customerId) fetchProfileData();
    if (slug) fetchCarDetails();
  }, [customerId, slug]);

  useEffect(() => {
    // Fetch price details with a delay
    const fetchPriceDetails = async () => {
      try {
        const priceRequestBody = {
          id: customerId,
          carNumber: carno,
          fromDate: startdate || "",
          toDate: enddate || "",
        };

        console.log(priceRequestBody);
        const priceResponse = await fetch(
          `${BASE_URL}/getCustomerRentalCarsPriceDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(priceRequestBody),
          }
        );

        if (!priceResponse.ok) {
          throw new Error("Failed to fetch price details");
        }

        const priceData = await priceResponse.json();
        setPrice(priceData.data);

        // Set a timeout to show the content after the delay (e.g., 2 seconds)
        setTimeout(() => setShowContent(true), 2000);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPriceDetails();
  }, []);

  if (loading || !showContent) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="price-details-container">
      <div className="price-item">
        <span className="price-label">Weekend Charges:</span>
        <span className="price-value">₹ {price.totalPayable || 0.0}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Base Fare:</span>
        <span className="price-value">₹ {price.totalPayable || 0.0}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Security Deposit:</span>
        <span className="price-value">₹ {price.totalPayable || 0.0}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Booking Charges:</span>
        <span className="price-value">₹ {price.carRentCharges || 0.0}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Delivery Charges:</span>
        <span className="price-value">₹ {price.deliveryCharges || 0.0}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Payable Amount:</span>
        <span className="price-value">₹ {price.totalPayable || 0.0}</span>
      </div>
      <div className="payment  mt-3">
        <button
          className="warning-btn rounded p-2 me-2 w-100 text-black fw-bolder"
          onClick={handleReserveClick}>
          Reserve Now
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PriceDetails;
