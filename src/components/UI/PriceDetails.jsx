import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../../styles/priceDetails.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message, Spin } from "antd";
import { encrypt, decrypt } from "../utils/cryptoUtils";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import encBase64 from "crypto-js/enc-base64";

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
  const navigate = useNavigate();

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
  const [isReserving, setIsReserving] = useState(false); // State for reservation loading
  const [reservationLoading, setReservationLoading] = useState(false);

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it is on top of other content
  };

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
        navigate("/sign-in"); // navigate to the Signin page

        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  // Handle Reservation Click

  useEffect(() => {
    // Fetch price details with a delay
    const fetchPriceDetails = async () => {
      setLoading(true); // Start loading

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
      } finally {
        setLoading(false); // End loading after data is received
      }
    };

    fetchPriceDetails();
  }, [deliverstate]);

  useEffect(() => {
    // Function to calculate the total payable amount
    const calculateTotalPayable = () => {
      const planBasedCharges = price["Plan Based Payable Charges"] || 0.0;
      const deliveryCharges = deliverstate
        ? 0
        : price["Delivery Charges"] || 0.0;
      const securityDepositeCharges = price["Secuirty Deposite Charges"] || 0.0;
      const leaveDayCharges = price["No Of Leave Day Charges"] || 0.0;
      const chargeTypeAmount = price["Charge Type Based Amount"] || 0.0;

      // Determine whether to add or subtract chargeTypeAmount
      const total =
        planBasedCharges +
        deliveryCharges +
        securityDepositeCharges +
        leaveDayCharges +
        (price["Charges Type"] === "Additional charges"
          ? chargeTypeAmount
          : -chargeTypeAmount);

      // Update the state with the calculated total
      setTotalPayable(total);
    };

    calculateTotalPayable();
  }, [price]); // Recalculate whenever price changes

  if (error) return <div>Error: {error}</div>;
  const handleReserveClick = async () => {
    const options = {
      key: "rzp_test_RcJak5fcO3zfR9", // Replace with your Razorpay Key ID
      amount: TotalPayable * 100, // Amount in smallest currency unit
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      handler: async function (response) {
        const razorpayPaymentId = response.razorpay_payment_id;

        if (razorpayPaymentId) {
          // Make an authenticated API call to Razorpay to verify the payment
          try {
            const verifyResponse = await fetch(`${BASE_URL}/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ razorPay: razorpayPaymentId }),
            });

            if (!verifyResponse.ok) {
              alert("Error verifying payment");
              throw new Error(`Error: ${verifyResponse.status}`);
            }

            const verifyData = await verifyResponse.json();

            if (verifyData.status === "true") {
              setReservationLoading(true); // Start the reservation loading overlay
              const documentCheckStatus = decrypt(
                localStorage.getItem("status")
              );

              if (documentCheckStatus === "true") {
                const now = new Date();
                const formattedDate = now
                  .toISOString()
                  .slice(0, 16)
                  .replace("T", " ");

                const combinedRequestBody = {
                  ID: "",
                  "Ticket ID": "",
                  "Created Date": formattedDate,
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
                  "Plan Based Payable Charges":
                    price["Plan Based Payable Charges"],
                  "Base Fare": price["Base Fare"],
                  "Delivery / pickup Charges": price["Delivery Charges"],
                  "Secuirty Deposite Charges":
                    price["Secuirty Deposite Charges"],
                  "No of Leave Day Charges": price["No Of Leave Day Charges"],
                  "Charges Type": price["Additional Charges"],
                  "Charges Type Based Amount":
                    price["Charge Type Based Amount"],
                  "Total Payable": TotalPayable,
                };

                try {
                  const reservationResponse = await fetch(
                    `${BASE_URL}/updateAdminViewCustomerCarRentBookingDetails`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(combinedRequestBody),
                    }
                  );

                  const reservationData = await reservationResponse.json();

                  if (reservationData.status === "true") {
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
                } finally {
                  setIsReserving(false);
                  setReservationLoading(false);
                }
              } else {
                message.error("Please upload Document file!");
                setReservationLoading(false);
              }
            } else {
              alert("Payment verification failed.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Error verifying payment.");
          }
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: phoneNo,
      },
      notes: {
        address: fulfillmentType,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="price-details-container">
      {reservationLoading && (
        <div style={overlayStyle}>
          <HashLoader
            color="#f9a826"
            loading={reservationLoading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginRight: "30px",
          }}>
          <Spin size="large" />
          <h5>Please wait ....</h5>
        </div>
      ) : (
        <>
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
            <span className="price-label">Secuirty Deposite :</span>
            <span className="price-value">
              ₹ {price["Secuirty Deposite Charges"] || 0.0}
            </span>
          </div>
          <div className="price-item">
            <span className="price-label">Leave Day Charges:</span>
            <span className="price-value">
              ₹ {price["No Of Leave Day Charges"] || 0.0}
            </span>
          </div>
          <div className="price-item">
            <span className="price-label">{price["Charges Type"]} :</span>
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
            onClick={handleReserveClick}
            disabled={isReserving} // Disable button while reserving
          >
            {isReserving ? <Spin size="small" /> : "Reserve Now"}
          </button>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default PriceDetails;
