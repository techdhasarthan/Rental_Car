import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const { "Image URL": imgUrl,
    "Car Name": carName,
    "Transmission Type": transmissionType,
    "Fuel Type": oil,
    "Price Per Day": price,
    "No.Of.Seats": noSeat } =
    props.item;
    console.log(props);
  return (
    <>
      <Col lg="4" md="4" sm="6" className="mb-5">
        <div className="car__item">
          <div className="car__img">
            <img src={`${BASE_URL}/`+imgUrl} alt="" className="w-100" />
          </div>

          <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{carName}</h4>
            <h6 className="rent__price text-center mt-">
              Rs. {price}.00 <span>/ Day</span>
            </h6>

            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
              <span className=" d-flex align-items-center gap-1">
                <i class="ri-wheelchair-line"></i> {noSeat} Seats
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i class="ri-settings-2-line"></i> {transmissionType}
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i class="ri-drop-line"></i> {oil}
              </span>
            </div>

            {/* <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${carName}`}>Rent</Link>
          </button> */}
            <Link to={`/cars/${carName}`}>
              <button className=" w-100 car__item-btn car__btn-details  text-white  ">
                BOOK NOW
              </button>
            </Link>
          </div>
        </div>
      </Col>
    </>
  );
};

export default CarItem;
