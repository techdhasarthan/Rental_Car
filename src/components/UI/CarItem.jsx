import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { useEffect } from "react";
import "./CarItem.css";

const CarItem = (props) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const {
    "Image URL": imgUrl,
    "Car Name": carName,
    "Transmission Type": transmissionType,
    "Fuel Type": oil,
    "Price Per Day": priceperday,
    "No.Of.Seats": noSeat,
    "Car Number": car_no,
    "No Of Free Km Per Given Date": freeKm,
    "Price Based On Date": price,
    "Extra Travel Km Per Price": extraKm,
    ID: id,
  } = props.item;

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <Link
      to={`/cars/${id}?freeKm=${freeKm}&price=${price}&extraKm=${extraKm}`}
      className="text-decoration-none text-reset">
      <Col lg="12" md="12" sm="6" className="mb-5" data-aos="flip-left">
        <div className="car__item">
          <div className="car__img">
            <img
              src={`${BASE_URL}/RetrieveFile/` + imgUrl}
              alt=""
              className="w-100 text-decoration-none text-reset"
              style={{ height: "120px", border: "none", objectFit: "cover" }}
            />
          </div>

          <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{carName}</h4>
            <h6 className="section__title text-center">Price : {price}</h6>
            <h6 className="section__title text-center">Free Km : {freeKm}</h6>
            <h6 className="section__title text-center">Extra Km : {extraKm}</h6>
            <h className="rent__price text-center">
              <i className="ri-caravan-fill"></i> {car_no}
            </h>

            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
              <span className=" d-flex align-items-center gap-1">
                <i className="ri-wheelchair-line"></i> {noSeat} Seats
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i className="ri-settings-2-line"></i> {transmissionType}
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i className="ri-drop-line"></i> {oil}
              </span>
            </div>

            <Link to={`/cars/${id}`}>
              <button className=" w-100 car__item-btn car__btn-details  text-white">
                BOOK NOW
              </button>
            </Link>
          </div>
        </div>
      </Col>
    </Link>
  );
};

export default CarItem;
