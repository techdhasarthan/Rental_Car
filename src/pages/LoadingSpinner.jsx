import React from "react";
import { Spinner } from "react-bootstrap"; // Import the Spinner component from React Bootstrap

const LoadingSpinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status" className="me-2">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span>Signing up, please wait...</span>
    </div>
  );
};

export default LoadingSpinner;
