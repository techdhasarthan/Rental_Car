import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import "../styles/car-item.css";
import ShowCarDetails from "./ShowCarDetails";

const CarDetails = () => {
  const [carDetails, setCarDetails] = useState(""); // State for car details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for error handling
  const { slug } = useParams(); // Extract car name (slug) from the URL

  const pricingPlan = "1 Day";
  const totalFreeKms = 300;
  const extraKmCharges = "₹ 7.0 per km";
  const fuelNote = "Rental Charges Doesn't Include Fuel";

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch car details from the API
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        var jsonObj = JSON.parse("{}");
        jsonObj["ID"] = slug;
        const response = await fetch(`${BASE_URL}/getCustomerRentalCarsInfoBookingView`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonObj),
        });

        setLoading(true);

        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        const data = await response.json();
        alert(JSON.stringify(data));
        
        setCarDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [slug]);

  // If the data is still loading
  if (loading) {
    return <p>Loading car details...</p>;
  }

  // If there was an error fetching data
  if (error) {
    return <p>Error: {error}</p>;
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
                  <h6 className="rent__price fw-bold fs-4">
                    ₹{carDetails?.price}.00 / Day
                  </h6>

                  <span className="d-flex align-items-center gap-2 fst-italic bold fs-5 fw-bold ">
                    <i className="ri-caravan-fill"></i> TN2024
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center "
                  style={{ columnGap: "4rem" }}>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {carDetails?.category}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {carDetails?.transmission_type}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {carDetails?.no_seat} Seats
                  </span>
                </div>

                <div
                  className="d-flex align-items-center mt-2"
                  style={{ columnGap: "2.1rem" }}>
                  {/* <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>Trip Hours:</strong> {tripHours}
                    </p>
                  </span> */}

                  <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>Pricing Plan:</strong> {pricingPlan}
                    </p>
                  </span>
                </div>

                <div
                  className="d-flex align-items-center mt-1"
                  style={{ columnGap: "2.1rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>Total Free Kms:</strong> {totalFreeKms} km
                    </p>
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>Extra Km Charges:</strong> {extraKmCharges}
                    </p>
                  </span>
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
