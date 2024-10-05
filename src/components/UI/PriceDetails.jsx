import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../../styles/priceDetails.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message, Spin } from "antd";
import { encrypt, decrypt } from "../utils/cryptoUtils";
import axios from "axios";

const PriceDetails = ({
  totalPayable,
  deliverstate,
  carDetails,
  differenceInHours,
  address,
}) => {
  const { slug } = useParams();
  const { id } = useParams();
  const location = useLocation();

  const {
    carName,
    car_no: carNo,
    fuelType,
    no_seat: noSeat,
    transmission_type: transmissionType,
    category,
    imgUrl: imgUrl,
  } = carDetails;

  const searchParams = new URLSearchParams(location.search);
  const Price = searchParams.get("price");
  const freeKm = searchParams.get("freeKm");
  const extraKm = searchParams.get("extraKm");
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [TotalPayable, setTotalPayable] = useState(0);
  const [BaseFare, setBaseFare] = useState();

  // const name = decrypt(localStorage.getItem("name"));
  // const phoneNo = decrypt(localStorage.getItem("phone number"));
  // const email = decrypt(localStorage.getItem("email"));

  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const startDate = localStorage.getItem("startdate");
  const decryptedStartdate = decrypt(startDate);
  const startdate = decryptedStartdate;

  const endDate = localStorage.getItem("enddate");
  const decryptedEnddate = decrypt(endDate);
  const enddate = decryptedEnddate;

  const decryptedCarNo = decrypt(localStorage.getItem("carno"));
  const carno = decryptedCarNo;
  const decryptedUserID = decrypt(localStorage.getItem("id"));
  const customerId = decryptedUserID;

  const decryptedFulfillmentType = decrypt(localStorage.getItem("fulfillment"));
  const fulfillmentType = decryptedFulfillmentType;
  const decryptedDeliveryInfo = decrypt(localStorage.getItem("deliveryInfo"));
  const deliveryInfo = decryptedDeliveryInfo;

  const decryptedExtraInfo = decrypt(localStorage.getItem("extraInfo"));
  const extraInfo = decryptedExtraInfo;

  const [price, setPrice] = useState({});
  const [profileData, setProfileData] = useState("");
  const [carData, setCarData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resData, setResData] = useState(null);
  const [showContent, setShowContent] = useState(false); // State to control content display

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/getCustomerProfileDetails`,
          { id: customerId }
        );

        if (response) {
          const responseDataObj = response.data.data;

          setEmail(responseDataObj["Email ID"]);
          setname(responseDataObj["Name"]);
          setPhoneNo(responseDataObj["Phone Number"]);
        } else {
          message.error(
            `Failed to fetch profile data. Status: ${response.status}`
          );
        }
      } catch (error) {
        message.error(`An error occurred: ${error.message}`);
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  // Handle Reservation Click

  useEffect(() => {
    // Fetch price details with a delay
    const fetchPriceDetails = async () => {
      try {
        const priceRequestBody = {
          id: customerId,
          carNumber: carNo,
          fromDate: startdate || "",
          toDate: enddate || "",
          amountPayable: totalPayable || "",
        };

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
        setTimeout(() => setShowContent(true), 1000);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPriceDetails();
  }, [deliverstate]);

  useEffect(() => {
    // Function to calculate the total payable amount
    const calculateTotalPayable = () => {
      const baseFare = price["Base Fare"] || 0.0;

      const planBasedCharges = price["Plan Based Payable Charges"] || 0.0;
      const deliveryCharges = deliverstate
        ? 0
        : price["Delivery Charges"] || 0.0;
      const securityDepositeCharges = price["Secuirty Deposite Charges"] || 0.0;
      const leaveDayCharges = price["No Of Leave Day Charges"] || 0.0;
      const chargeTypeAmount = price["Charge Type Based Amount"] || 0.0;

      // Calculate the total sum of all the charges
      const total =
        baseFare +
        planBasedCharges +
        deliveryCharges +
        securityDepositeCharges +
        leaveDayCharges +
        chargeTypeAmount;

      setTotalPayable(total);
    };

    calculateTotalPayable();
  }, [price]); // Recalculate whenever price changes

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "50vh",
  //       }}>
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  if (error) return <div>Error: {error}</div>;

  const handleReserveClick = async () => {
    const decryptedDocumentCheckStatus = decrypt(
      localStorage.getItem("status")
    );
    const documentCheckStatus = decryptedDocumentCheckStatus;

    if ("true" === documentCheckStatus) {
      const now = new Date();
      const currentDateTime = now.toISOString().slice(0, 16).replace("T", " ");

      const combinedRequestBody = {
        ID: "",
        "Created Date": currentDateTime,
        "Customer Name": name,
        "Mobile Number": phoneNo,
        "Email ID": email,
        "Car Number": carNo,
        "Car Name": carName,
        "Pickup Date": startdate,
        "Return Date": enddate,
        "Pickup Type": fulfillmentType,
        "Approve Status": "New Booking",
        "Car Image Name": imgUrl,
        Address: address,
        "Extra Info": extraInfo,
        Duration: differenceInHours,
        "Free Km": freeKm,
        "Plan Based Payable Charges": price["Plan Based Payable Charges"],
        "Base Fare": price["Base Fare"],
        "Delivery / pickup Charges": price["Delivery Charges"],
        "Secuirty Deposite Charges": price["Secuirty Deposite Charges"],
        "No of Leave Day Charges": price["No Of Leave Day Charges"],
        "Charges Type": price["Additional Charges"],
        "Charges Type Based Amount": price["Charge Type Based Amount"],
        "Total Payable": TotalPayable,
      };

      alert(JSON.stringify(combinedRequestBody));
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
          localStorage.removeItem("fulfillment");
          localStorage.removeItem("deliveryInfo");
          localStorage.removeItem("extraInfo");
        } else {
          message.error(
            "Car is not available, please schedule for another time period."
          );
        }
      } catch (error) {
        console.error("Error occurred during reservation:", error);
      }
    } else {
      message.error("Please upload Document file!");
    }
  };

  return (
    <div className="price-details-container">
      <div className="price-item">
        <span className="price-label">Base Fare :</span>
        <span className="price-value">₹ {price["Base Fare"] || 0.0}</span>
      </div>
      <div className="price-item">
        <span className="price-label">Booking Charges:</span>
        <span className="price-value">
          ₹ {price["Plan Based Payable Charges"] || 0.0}
        </span>
      </div>

      <div className="price-item">
        <span className="price-label">Delivery Charges:</span>
        <span className="price-value">
          ₹ {deliverstate ? 0 : price["Delivery Charges"] || 0.0}
        </span>
      </div>
      <div className="price-item">
        <span className="price-label">Secuirty Deposite Charges:</span>
        <span className="price-value">
          ₹ {price["Secuirty Deposite Charges"] || 0.0}
        </span>
      </div>

      <div className="price-item">
        <span className="price-label">No Of Leave Day Charges:</span>
        <span className="price-value">
          ₹ {price["No Of Leave Day Charges"] || 0.0}
        </span>
      </div>

      <div className="price-item">
        <span className="price-label">{price["Additional Charges"]}</span>
        <span className="price-value">
          ₹ {price["Charge Type Based Amount"] || 0.0}
        </span>
      </div>

      <div className="price-item total-payable">
        <span className="price-label">Total Payable:</span>
        <span className="price-value">₹ {TotalPayable}</span>
      </div>

      <button
        className="warning-btn rounded p-2 me-2 w-100 text-black fw-bolder"
        onClick={handleReserveClick}>
        Reserve Now
      </button>
      <ToastContainer />
    </div>
  );
};

export default PriceDetails;
