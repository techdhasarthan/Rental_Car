import React from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { Form,} from "reactstrap";
const FindCarForm = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cars");
  };
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <label htmlFor="journeyDateTime" className="form__label">
            Journey Start
          </label>
          <input
            type="datetime-local"
            id="journeyDateTime"
            placeholder="Journey date and time"
            required
          />
        </FormGroup>

        <FormGroup className="form__group">
          <label htmlFor="journeyDate" className="form__label">
            Journey End
          </label>
          <input
            type="datetime-local"
            id="journeyDate"
            placeholder="Journey date"
            required
          />
        </FormGroup>

        <FormGroup className="form__group ">
          <label htmlFor="journeyDate" className="form__label text-white">
            J{" "}
          </label>
          <button className="btn find__car-btn" onClick={handleClick}>
            Find Now
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
