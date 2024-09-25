import React from "react";
import "./card.css";

const HorizontalCard = ({ userdata }) => {
  // Destructure the userdata to get the details you want to display
  const { carName, bookingDate, location, status, lastUpdated } = userdata;

  return (
    <div className="card mb-3 custom-card w-100">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp" // Replace with a dynamic image from userdata if available
            alt={carName}
            className="img-fluid rounded-start custom-image"
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title fw-bolder">{carName}</h5>
            <p className="card-text">
              <strong>Booking Date:</strong>{" "}
              {new Date(bookingDate).toLocaleDateString()}
            </p>
            <p className="card-text">
              <strong>Location:</strong> {location}
            </p>
            <p className="card-text">
              <strong>Status:</strong> {status}
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated {lastUpdated}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
