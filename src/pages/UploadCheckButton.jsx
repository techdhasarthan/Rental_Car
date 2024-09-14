import React, { useState, useEffect } from "react";
import UploadConfirm from "./UploadConfirm"; // Adjust the import path as necessary
import FileUpload from "./FileUpload"; // Adjust the import path as necessary

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

        // Assuming the response JSON structure is { hasUploadedData: boolean }
        setHasUploadedData(data.status);
        alert(data.status);
      } catch (error) {
        console.error("Error checking upload status:", error);
      }
    };

    checkUploadStatus();
  }, [BASE_URL, customerId]); // Add customerId as a dependency

  const handleUploadComplete = (success) => {
    // Handle upload completion (e.g., refresh the status or show a notification)
    if (success) {
      // Optionally, you might want to re-check upload status after a successful upload
      setHasUploadedData(true);
    }
  };

  return (
    <div>
      {hasUploadedData ? (
        <UploadConfirm />
      ) : (
        <FileUpload onUploadComplete={handleUploadComplete} />
      )}
    </div>
  );
};

export default UploadCheckButton;
