import { Col } from "reactstrap";
import { Link } from "react-router-dom";

const CarItem = (props) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const {
    "Image URL": imgUrl,
    "Car Name": carName,
    "Transmission Type": transmissionType,
    "Fuel Type": oil,

    "No.Of.Seats": noSeat,
    "Car Number": car_no,
    ID: id,
  } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={`${BASE_URL}/` + imgUrl} alt="" className="w-100" style={{height:"180px"}} />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center">
            <i className="ri-caravan-fill"></i> {car_no}
          </h6>

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
  );
};

export default CarItem;
