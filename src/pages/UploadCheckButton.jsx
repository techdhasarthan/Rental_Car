import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadConfirm from "./UploadConfirm"; // Adjust the import path as necessary
import FileUpload from "./FileUpload"; // Adjust the import path as necessary

const UploadCheckButton = () => {
  const [hasUploadedData, setHasUploadedData] = useState(false); // State to determine if data is uploaded
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const id = localStorage.getItem("id");

  useEffect(() => {
    const checkUploadStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getCustomerRentCarBookedDocumentVerificationCheckStatus`, {
          params: { id }, // Sending userid as a query parameter
        });
        setHasUploadedData(response.data.hasUploadedData); // Adjust based on your API response
      } catch (error) {
        console.error("Error checking upload status:", error);
      }
    };

    checkUploadStatus();
  }, [BASE_URL, id]); // Add userid as a dependency

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
