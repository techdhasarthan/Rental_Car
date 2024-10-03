import React, { useState, useEffect } from "react";
import UploadConfirm from "./UploadConfirm"; // Adjust the import path as necessary
import FileUpload from "./FileUpload"; // Adjust the import path as necessary
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure you import Bootstrap CSS
import { decrypt, encrypt } from "../components/utils/cryptoUtils";

const UploadCheckButton = () => {
  const [hasUploadedData, setHasUploadedData] = useState(null); // State to determine if data is uploaded
  const [loading, setLoading] = useState(true); // Loading state
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const decryptedUserID = decrypt(localStorage.getItem("id"));
  const customerId = decryptedUserID;

  const checkUploadStatus = async () => {
    try {
      const jsonObj = { id: customerId };
      const response = await fetch(
        `${BASE_URL}/getCustomerRentCarBookedDocumentVerificationCheckStatus`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonObj),
        }
      );

      // Convert response to JSON
      const Resdata = await response.json();

      const encryptedStatus = encrypt(Resdata["status"]);

      localStorage.setItem("status", encryptedStatus);

      // Assuming the response JSON structure is { status: boolean }
      setHasUploadedData(Resdata["status"]); // Ensure data.status is a boolean
    } catch (error) {
      console.error("Error checking upload status:", error);
    } finally {
      setLoading(false); // Set loading to false once the API call is done
    }
  };

  useEffect(() => {
    if (customerId) {
      checkUploadStatus(); // Call the checkUploadStatus function
    }
  }, [customerId]); // Only need to run on customerId changes

  // If loading, display a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render components based on the upload status
  let content;
  if (hasUploadedData === "true") {
    content = <UploadConfirm />;
  } else if (hasUploadedData === "false") {
    content = (
      <FileUpload id={customerId} onUploadSuccess={checkUploadStatus} />
    );
  } else {
    content = <div>Error loading upload status.</div>; // Handle unexpected status
  }

  return <>{content}</>; // Return the determined content based on state
};

export default UploadCheckButton;
