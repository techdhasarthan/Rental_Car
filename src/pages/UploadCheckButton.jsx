import React, { useState, useEffect } from "react";
import UploadConfirm from "./UploadConfirm"; // Adjust the import path as necessary
import FileUpload from "./FileUpload"; // Adjust the import path as necessary
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure you import Bootstrap CSS

const UploadCheckButton = () => {
  const [hasUploadedData, setHasUploadedData] = useState(false); // State to determine if data is uploaded
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const customerId = localStorage.getItem("id");

  useEffect(() => {
    const checkUploadStatus = async () => {
      try {
        var jsonObj = JSON.parse("{}");
        jsonObj["id"] = customerId;
        const response = await fetch(
          `${BASE_URL}/getCustomerRentCarBookedDocumentVerificationCheckStatus`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonObj),
          }
        );

        // Convert response to JSON
        const data = await response.json();

        // Assuming the response JSON structure is { status: boolean }
        setHasUploadedData(data.status);
      } catch (error) {
        console.error("Error checking upload status:", error);
      }
    };

    checkUploadStatus();
  }, [BASE_URL, customerId]); // Add customerId as a dependency

  return (
    <>{hasUploadedData ? <FileUpload id={customerId} /> : <UploadConfirm />}</>
  );
};

export default UploadCheckButton;
