import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import "../styles/car-item.css";
import ShowCarDetails from "./ShowCarDetails";

const CarDetails = () => {
  const [carDetails, setCarDetails] = useState(null); // State for car details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for error handling
  const { slug } = useParams(); // Extract car name (slug) from the URL

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

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
          limitkm: data.data?.["Limit Km"] || "",
        };

        setCarDetails(carData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [slug, BASE_URL]);

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

  // If the data was successfully fetched
  return (
    <Helmet title={carDetails?.carName}>
      <section className=" ">
        <h2 className="section__title text-center my-3">ENQUIRY BREAKDOWN</h2>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={carDetails?.imgUrl}
                alt={carDetails?.carName}
                className="w-100 mt-5"
              />
            </Col>

            <Col lg="6">
              <div className="car__info mt-5">
                <div className="d-flex align-items-center gap-5 mt-1">
                  <h2 className="section__title">{carDetails?.carName}</h2>
                </div>
                <div className="d-flex align-items-center gap-5 mb-2 mt-2">
                  {/* <h6 className="rent__price fw-bold fs-4">
                    ₹{carDetails?.price}.00 / Day
                  </h6> */}

                  <span className="d-flex align-items-center gap-2 fst-italic bold fs-5 fw-bold ">
                    <i className="ri-caravan-fill"></i> {carDetails?.car_no}
                  </span>
                </div>

                <div
                  className="d-flex align-items-center"
                  style={{ columnGap: "4rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}></i>
                    {carDetails?.category}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: "#f9a826" }}></i>
                    {carDetails?.transmission_type}
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}></i>
                    {carDetails?.no_seat} Seats
                  </span>
                </div>

                <div
                  className="d-flex align-items-center mt-2"
                  style={{ columnGap: "2.1rem" }}>
                  {/* <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>Pricing Plan:</strong>{" "}
                      {carDetails?.pricingPlan || "N/A"}
                    </p>
                  </span> */}
                </div>

                <div
                  className="d-flex align-items-center mt-1"
                  style={{ columnGap: "2.1rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>Total Free Kms:</strong>{" "}
                      {carDetails?.limitkm || "N/A"} km
                    </p>
                  </span>

                  {/* <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>Extra Km Charges:</strong>{" "}
                      {carDetails?.extraKmCharges || "N/A"}
                    </p>
                  </span> */}
                </div>
              </div>
            </Col>
            <ShowCarDetails />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
