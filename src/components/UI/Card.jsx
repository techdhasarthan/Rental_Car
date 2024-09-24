import React from "react";
import "./card.css";

const HorizontalCard = () => {
  return (
    <div className="card mb-3 custom-card w-100">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
            alt="Trendy Pants and Shoes"
            className="img-fluid rounded-start custom-image"
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
