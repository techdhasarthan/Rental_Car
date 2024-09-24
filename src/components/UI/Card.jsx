import React from "react";
import "./card.css"; // External CSS file for styling

function Card() {
  return (
    <div className="card">
      <div className="card-image">
        <img
          src="https://via.placeholder.com/150" // Sample image
          alt="Sample"
        />
      </div>
      <div className="card-content">
        <h3>Card Title</h3>
        <p>
          This is a brief description of the card content. You can provide any
          relevant information here.
        </p>
        <button className="btn">Learn More</button>
      </div>
    </div>
  );
}

export default Card;
