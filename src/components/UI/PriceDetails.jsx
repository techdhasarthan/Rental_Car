import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/priceDetails.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message } from "antd";

const PriceDetails = ({
  response,
  startDate,
  endDate,
  imgurl,
  fulfillmentType,
  deliveryInfo,
  extraInfo,
}) => {
  const { slug } = useParams();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [profileData, setProfileData] = useState(null);
  const [carData, setCarData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resData, setResData] = useState(null);
  const [statues, setStatues] = useState();
  const customerId = localStorage.getItem("id");

  const pickup = fulfillmentType === "" ? "Delivery" : "Self Pickup";
  const address = pickup === "Delivery" ? deliveryInfo : fulfillmentType;

  // Fetch Profile Data
  const fetchProfileData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getCustomerProfileDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: customerId }),
      });

      if (res.ok) {
        const data = await res.json();
        setProfileData({
          id: data.data.ID || "",
          name: data.data.Name || "",
          phoneNumber: data.data["Phone Number"] || "",
          password: data.data.Password || "",
          emailId: data.data["Email ID"] || "",
          alternativeMobileNo: data.data["Alternative Mobile.NO"] || "",
          age: data.data.Age || "",
          signStatus: data.data["Sign Status"] || "active",
        });
      } else {
        throw new Error(`Failed to fetch profile data. Status: ${res.status}`);
      }
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

      if (!res.ok) {
        throw new Error("Failed to fetch car details");
      }

      const data = await res.json();
      const carData = {
        id: data.data?.ID || "",
        imgUrl: data.data?.["Image URL"] || "",
        carName: data.data?.["Car Name"] || "",
        transmission_type: data.data?.["Transmission Type"] || "",
        fuelType: data.data?.["Fuel Type"] || "",
        no_seat: data.data?.["No.Of.Seats"] || "",
        car_no: data.data?.["Car Number"] || "",
        category: data.data?.["Category"] || "",
        limitkm: data.data?.["Limit Km"] || "",
        approveStatus: "New Booking",
        // carImageName: data.data?.["Car Image Name"] || "",
      };

      setCarData(carData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Reservation Click
  const handleReserveClick = async () => {
    if (!profileData || !carData) {
      console.error("Profile or car data is missing");
      return;
    }

    // Define the variable imageName
    let imageName = "";

    // Ensure imgurl is defined and is a valid URL
    if (imgurl) {
      try {
        const url = new URL(imgurl); // Create a URL object
        const pathSegments = url.pathname.split("/"); // Split the path into segments
        imageName = pathSegments[pathSegments.length - 1]; // Get the last segment
      } catch (error) {
        console.error("Invalid URL:", error);
      }
    }
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // Get the date part (YYYY-MM-DD)
    const time = now.toTimeString().split(" ")[0].slice(0, 5); // Get time without seconds (HH:MM)
    const currentDateTime = `${date}T${time}`;

    // Output: YYYY-MM-DD HH:MM

    const combinedRequestBody = {
      ID: "",
      "Created Date": currentDateTime,
      "Customer Name": profileData.name,
      "Mobile Number": profileData.phoneNumber,
      "Email ID": profileData.emailId,
      "Car Number": carData.car_no,
      "Car Name": carData.carName,
      "From Date": startDate,
      "To Date": endDate,
      "Pickup Type": pickup,
      "Delivery / pickup Charges": response.deliveryCharges,
      "Car Rent Charges": response.carRentCharges,
      "Total Payable": response.totalPayable,
      "Approve Status": carData.approveStatus,
      "Car Image Name": imageName,
      Address: address,

      "Extra Info": extraInfo,
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
      console.log("mmmmmmm::" + JSON.stringify(responseData["status"]));
      setStatues(responseData["status"]);

      if (responseData["status"] == "true") {
        // Corrected from 'statues' to 'status'
        console.log(
          "The response data received: " + JSON.stringify(responseData.status)
        );
        setResData(responseData.data);

        console.log(
          "Reservation successful! " + JSON.stringify(combinedRequestBody)
        );

        message.success({
          content: "Car reservation successful!",
          duration: 3, // Auto-close after 3 seconds
          style: {
            fontSize: "16px", // Larger font size
            padding: "20px", // Increase padding for larger look
            width: "300px",
            marginLeft: "75vw",
          },
        });
      } else if (responseData["status"] == "false") {
        message.error({
          content:
            "Car is not available, please schedule for another time period.",
          duration: 3, // Auto-close after 3 seconds
          style: {
            fontSize: "16px", // Larger font size
            padding: "20px", // Increase padding for larger look

            marginLeft: "60vw",
          },
        });
        throw new Error(`Failed to reserve. Status: ${statues}`);
      }
    } catch (error) {
      console.error("Error occurred during reservation:", error);
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchProfileData();
    }
    if (slug) {
      fetchCarDetails();
    }
  }, [customerId, slug]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="price-details-container">
      <div className="price-item">
        <span className="price-label">Booking Charges:</span>
        <span className="price-value">₹ {response.carRentCharges || 0.0} </span>
      </div>
      <div className="price-item">
        <span className="price-label">Delivery Charges:</span>
        <span className="price-value">₹ {response.deliveryCharges || 0.0}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Payable Amount:</span>
        <span className="price-value">₹ {response.totalPayable || 0.0}</span>
      </div>
      <div className="payment text-end mt-3">
        <button
          className="warning-btn rounded p-2 me-2"
          onClick={handleReserveClick}>
          Reserve Now
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PriceDetails;
