import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams, useLocation } from "react-router-dom";
import "../styles/car-item.css";
import Fulfillment from "../components/UI/Fulfillment";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import PriceDetails from "../components/UI/PriceDetails";
import { encrypt, decrypt } from "../components/utils/cryptoUtils";

const CarDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const price = searchParams.get("price");
  const freeKm = searchParams.get("freeKm");
  const extraKm = searchParams.get("extraKm");

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
    window.scrollTo(0, 0);
  }, []);

  const [options, setOption] = useState("");
  const [carDetails, setCarDetails] = useState(null); // State for car details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for error handling
  const [responseData, setResponseData] = useState(null); // State for price details
  const [differenceInHours, setDifferenceInHours] = useState(0); // State for difference in hours
  const { slug } = useParams(); // Extract car name (slug) from the URL
  const [deliverstate, setDeliveryState] = useState();
  const [address, setAddress] = useState();
  const [extrainfo, setExtraInfo] = useState();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch start and end dates from local storage

  const decryptedStartDate = decrypt(localStorage.getItem("startdate"));
  const startdate = decryptedStartDate;

  const decryptedEnddate = decrypt(localStorage.getItem("enddate"));
  const enddate = decryptedEnddate;

  // Calculate difference in hours
  useEffect(() => {
    if (startdate && enddate) {
      const startDateObj = new Date(startdate);
      const endDateObj = new Date(enddate);

      // Calculate the difference in milliseconds
      const diffInMilliseconds = endDateObj - startDateObj;

      // Convert milliseconds to hours
      const hours = diffInMilliseconds / (1000 * 60 * 60);
      setDifferenceInHours(hours);
    }
  }, [startdate, enddate]);

  // Fetch car details from the API
  useEffect(() => {
    const fetchCarDetails = async () => {
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
          id: data.data?.ID || "",
          imgUrl: data.data?.["Image URL"] || "",
          carName: data.data?.["Car Name"] || "",
          transmission_type: data.data?.["Transmission Type"] || "",
          fuelType: data.data?.["Fuel Type"] || "",
          no_seat: data.data?.["No.Of.Seats"] || "",
          car_no: data.data?.["Car Number"] || "",
          category: data.data?.["Category"] || "",
        };

        setCarDetails(carData); // Update state with car details

        const encryptedCarName = encrypt(carData.carName);
        const encryptedCarNo = encrypt(carData.car_no);

        localStorage.setItem("carname", encryptedCarName);
        localStorage.setItem("carno", encryptedCarNo);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [slug, BASE_URL, deliverstate]);

  // If the data is still loading
  if (loading) {
    return <p>Loading car details...</p>;
  }

  // If there was an error fetching data
  if (error) {
    return <p>Error: {error}</p>;
  }

  // If no car details were fetched
  if (!carDetails) {
    return <p>No car details available</p>;
  }

  console.log("zero ", deliverstate);
  // If the data was successfully fetched
  const handlezero = (data) => {
    setDeliveryState(data);
  };

  const handleAddress = (datas) => {
    setAddress(datas);
  };

  const handleExtraInfo = (data) => {
    setExtraInfo(data);
  };

  return (
    <Helmet title={carDetails?.carName}>
      <section>
        <h2 className="section__title text-center my-3">ENQUIRY BREAKDOWN</h2>
        <Container>
          <Row className="justify-content-between">
            {/* Car Details Section */}
            <Col lg="8" md="12" className="mb-4">
              {/* Main Wrapper */}
              <div className="car-details-container">
                {/* Car Image and Details Side by Side */}
                <div
                  className="d-flex flex-wrap"
                  style={{
                    border: "0.5px solid #B8B8B8",
                    borderRadius: "8px",
                  }}>
                  {/* Car Image */}
                  <Col
                    lg="5"
                    md="6"
                    className="mb-4 ps-5 pt-4"
                    data-aos="fade-right">
                    <img
                      src={`${BASE_URL}/RetrieveFile/${carDetails?.imgUrl}`}
                      alt={carDetails?.carName}
                      className="w-75"
                    />
                  </Col>

                  <Col
                    lg="7"
                    md="6"
                    className="car_details"
                    data-aos="fade-left">
                    <div className="car_name mt-1">
                      <h2 className="section__title">{carDetails?.carName}</h2>
                    </div>

                    {/* Car Number */}
                    <div className="d-flex align-items-center gap-5 mb-2 mt-2">
                      <span className="d-flex align-items-center gap-2 fst-italic bold fs-5 fw-bold">
                        Car Number : {carDetails?.car_no}
                      </span>
                    </div>

                    {/* Car Details */}
                    <div className="row">
                      <div className="col-12 col-md-4 mb-2 d-flex align-items-center gap-1">
                        <i
                          className="ri-roadster-line"
                          style={{ color: "#f9a826" }}></i>
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {carDetails?.category}
                        </span>
                      </div>
                      <div className="col-12 col-md-4 mb-2 d-flex align-items-center gap-1">
                        <i
                          className="ri-settings-2-line"
                          style={{ color: "#f9a826" }}></i>
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {carDetails?.transmission_type}
                        </span>
                      </div>
                      <div className="col-12 col-md-4 mb-2 d-flex align-items-center gap-1">
                        <i
                          className="ri-wheelchair-line"
                          style={{ color: "#f9a826" }}></i>
                        <span style={{ fontWeight: "bold", color: "black" }}>
                          {carDetails?.no_seat} Seats
                        </span>
                      </div>
                    </div>

                    {/* Extra Kms and Pricing Plan */}
                    <div className="row mt-2">
                      <div className="col-12 col-md-6 mb-2">
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          <strong>Extra Kms : $ </strong> {extraKm || "N/A"} Per
                          Km
                        </p>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          <strong>Pricing Plan :</strong> {price || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Pickup and Drop Date */}
                    <div className="row">
                      <div className="col-12 col-md-6 mb-2">
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          <strong>Pickup Date :</strong>{" "}
                          {startdate ? startdate.replace("T", " ") : "N/A"}
                        </p>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          <strong>Drop Date :</strong>{" "}
                          {enddate ? enddate.replace("T", " ") : "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Duration and Free Km */}
                    <div className="row">
                      <div className="col-12 col-md-6 mb-2">
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          <strong>Duration :</strong>{" "}
                          {differenceInHours ? differenceInHours : "N/A"} Hrs
                        </p>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <p style={{ fontWeight: "bold", color: "black" }}>
                          <strong>Free Km :</strong> {freeKm} Km
                        </p>
                      </div>
                    </div>
                  </Col>
                </div>

                {/* Fulfillment Section Below */}
                <div className="fulfillment-section mt-4">
                  <h5 className="mb-4 fw-bold">Fulfillment Details</h5>
                  <Fulfillment
                    setDeliveryState={handlezero}
                    handleAddress={handleAddress}
                    handleExtraInfo={handleExtraInfo}
                  />
                </div>
              </div>
            </Col>

            {/* Pricing Details Section */}
            <Col lg="4" md="12">
              <PriceDetails
                startdate={startdate}
                enddate={enddate}
                totalPayable={price}
                deliverstate={deliverstate}
                carDetails={carDetails}
                differenceInHours={differenceInHours + "Hrs"}
                address={address}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
