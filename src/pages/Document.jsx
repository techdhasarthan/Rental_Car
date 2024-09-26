import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import "remixicon/fonts/remixicon.css";
import "./Document.css"; // Import the CSS file for styles

const Document = () => {
  const userdata = localStorage.getItem("combinedRequestBody"); // Get the data from localStorage
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const parsedData = JSON.parse(userdata);

  // Access the "Customer Name" and "Mobile Number" properties
  const customerName = parsedData["Customer Name"];
  const mobileNumber = parsedData["Mobile Number"];

  const [uploadedFiles, setUploadedFiles] = useState([]); // State to store file names

  // Fetch the uploaded file data from the API
  const fetchUploadedFiles = async () => {
    if (!userdata) {
      console.log("No user data found in localStorage.");
      return;
    }

    const jsonObj = {
      "Customer Name": customerName,
      "Mobile Number": mobileNumber,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/getAllCustomerCarBookingDocumentsList`,
        jsonObj
      ); // Replace with your actual API endpoint

      if (response.data.status === "true") {
        const dataArray = response.data.data; // Assuming the data is an array
        setUploadedFiles(dataArray); // Store all file data in state
      } else {
        console.log("No files found or API returned false status.");
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  // Fetch the uploaded files on component mount
  useEffect(() => {
    fetchUploadedFiles();
  }, []); // Empty array to fetch data once on component mount

  return (
    <Container className="pt-4">
      {uploadedFiles.length > 0 ? (
        <div>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="file-container">
              {/* Display the image */}
              <img
                src={`${BASE_URL}/RetrieveFile/` + file["File Name"]}
                alt={`File ${file["File Name"]}`} // Corrected to match the key
                className="file-image"
              />
              <div className="pt-5">
                {/* Display file details */}
                <p>
                  <strong>Document Type:</strong> {file["Document Type"]}
                </p>
                <p>
                  <strong>Document Number:</strong> {file["Document Number"]}
                </p>
                <p>
                  <strong>Name On Document:</strong> {file["Name On Document"]}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="d-flex justify-content-center">No files uploaded yet.</p>
      )}
    </Container>
  );
};

export default Document;
