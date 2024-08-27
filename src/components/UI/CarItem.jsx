import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const { imgUrl, carName, transmission_type, oil, price, no_seat } =
    props.item;

  return (
    <>
      <Col lg="4" md="4" sm="6" className="mb-5">
        <div className="car__item">
          <div className="car__img">
            <img src={imgUrl} alt="" className="w-100" />
          </div>

          <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{carName}</h4>
            <h6 className="rent__price text-center mt-">
              Rs. {price}.00 <span>/ Day</span>
            </h6>

            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
              <span className=" d-flex align-items-center gap-1">
                <i class="ri-wheelchair-line"></i> {no_seat} Seats
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i class="ri-settings-2-line"></i> {transmission_type}
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
