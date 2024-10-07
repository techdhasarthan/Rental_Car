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
    "Car Available Status": carAvailability,
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
      <Col lg="12" md="6" className="mb-5" data-aos="flip-left">
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

            <h6 className="rent__price text-center">
              <i className="ri-caravan-fill"></i> {car_no}
            </h6>

            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-3">
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

            <div className="d-flex justify-content-between align-items-center pb-2">
              <div className="text-center fs-7">
                <div className="section__title text-center fs-6">Price</div>
                <div>{price}</div>
              </div>
              <div className="text-center fs-6">
                <div className="section__title text-center fs-6">Free Km</div>
                <div>{freeKm}</div>
              </div>
              <div className="text-center fs-7">
                <div className="section__title text-center fs-6">Extra Km</div>
                <div>{extraKm}</div>
              </div>
            </div>

            <button className=" w-100 car__item-btn car__btn-details  text-white">
              {carAvailability}
            </button>
          </div>
        </div>
      </Col>
    </Link>
  );
};

export default CarItem;
