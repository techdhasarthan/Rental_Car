import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "reactstrap";
import "remixicon/fonts/remixicon.css";

const Document = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [uploadedFiles, setUploadedFiles] = useState([]); // State to store multiple uploaded files

  // Fetch the uploaded file data from the API
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/files`); // Replace with your actual API endpoint
      setUploadedFiles(response.data); // Store the fetched data in state
      console.log("Fetched uploaded files:", response.data);
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  // Fetch the uploaded files on component mount
  useEffect(() => {
    fetchUploadedFiles();
  }, []); // Empty array to fetch data once on component mount

  return (
    <Container>
      <h2 className="fs-5 pt-2"></h2>
      {/* <Button onClick={fetchUploadedFiles}>Refresh File List</Button>{" "} */}
      {/* Button to refresh the file list manually */}
      {/* Display uploaded files */}
      {uploadedFiles.length > 0 ? (
        <div>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
              }}>
              <p>
                <strong>File Name:</strong> {file.fileName}
              </p>
              <p>
                <strong>Document Type:</strong> {file.documentType}
              </p>
              <p>
                <strong>Upload Date:</strong> {file.uploadDate}
              </p>
              {/* Add more details if your API provides them */}
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
