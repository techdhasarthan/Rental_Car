import React, { useEffect } from "react";

import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import "../styles/car-item.css";
import ShowCarDetails from "./ShowCarDetails";

const CarDetails = () => {
  const startDate = "2024-08-09 16:00";
  const endDate = "2024-08-10 16:00";
  const tripHours = "24.0 Hrs";
  const pricingPlan = "1 Day";
  const totalFreeKms = 300;
  const extraKmCharges = "₹ 7.0 per km";
  const fuelNote = "Rental Charges Doesn't Include Fuel";

  const { slug } = useParams();

  const singleCarItem = carData.find((item) => item.carName === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  return (
    <Helmet title={singleCarItem.carName}>
      <section className=" ">
        <h2 className="section__title text-center my-3">ENQUIRY BREAKDOWN</h2>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleCarItem.imgUrl} alt="" className="w-100 mt-5" />
            </Col>

            <Col lg="6">
              <div className="car__info mt-5">
                <div className=" d-flex align-items-center gap-5  mt-1">
                  <h2 className="section__title">{singleCarItem.carName}</h2>
                  {/* <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({singleCarItem.rating} ratings)
                  </span> */}
                </div>
                <div className=" d-flex align-items-center gap-5 mb-2 mt-2">
                  <h6 className="rent__price fw-bold fs-4">
                    ₹{singleCarItem.price}.00 / Day
                  </h6>

                  <span className=" d-flex align-items-center gap-2 fst-italic bold fs-5 fw-bold ">
                    {/* ({singleCarItem.rating} ratings) */}
                    <i class="ri-caravan-fill"></i>
                    TN2024
                  </span>
                </div>

                {/* <p className="section__description">
                  {singleCarItem.description}
                </p> */}

                <div
                  className=" d-flex align-items-center "
                  style={{ columnGap: "4rem" }}>
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.category}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.transmission_type}
                  </span>

                  {/* <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleCarItem.speed}
                  </span> */}
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}></i>{" "}
                    {singleCarItem.no_seat} Seats
                  </span>
                </div>

                <div
                  className="d-flex align-items-center mt-2"
                  style={{ columnGap: "2.1rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>Trip Hours:</strong> {tripHours}
                    </p>
                  </span>

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
                {/* <div
                  className="d-flex align-items-center mt-1"
                  style={{ columnGap: "2.1rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>Start Date:</strong> {startDate}
                    </p>
                  </span>

                  <span className="d-flex align-items-center gap-1 section__description">
                    <p>
                      <strong>End Date:</strong> {endDate}
                    </p>
                  </span>
                </div> */}
              </div>
            </Col>
            <ShowCarDetails />
            {/* ------------------------------------------------------------------- */}

            {/* <Col lg="7" className="mt-4">
              <div className="booking-info mt-4">
                <h5 className="mb-4 fw-bold ">Fulfillment Details</h5> */}
            {/* <BookingForm /> */}
            {/* <Fulfillment />
              </div>
            </Col> */}

            {/* <Col lg="5" className="mt-4">
              <div className="payment__info mt-4">
                <h5 className="mb-4 fw-bold ">Price Details</h5> */}
            {/* <PaymentMethod /> */}
            {/* <PriceDetails />
                <div className="payment text-end mt-5">
                  <button>Reserve Now</button>
                </div>
              </div>
            </Col> */}
            {/* ------------------------------------------------------------------------ */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
