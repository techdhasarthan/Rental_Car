import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import {
  FaFilePdf,
  FaFileExcel,
  FaFileWord,
  FaFileImage,
  FaFileDownload,
} from "react-icons/fa";
import "remixicon/fonts/remixicon.css";
import "./Document.css"; // Import the CSS file for styles

const Document = () => {
  const username = localStorage.getItem("name");
  const userPhoneNumber = localStorage.getItem("phone number");

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [uploadedFiles, setUploadedFiles] = useState([]); // State to store file data

  // Fetch the uploaded file data from the API
  const fetchUploadedFiles = async () => {
    const jsonObj = {
      "Customer Name": username,
      "Mobile Number": userPhoneNumber,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/getAllCustomerCarBookingDocumentsList`,
        jsonObj
      );

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

  // Function to handle file download
  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = `${BASE_URL}/RetrieveFile/` + file["File Name"];
    link.download = file["File Name"];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to return the correct icon based on file type
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <FaFilePdf size={50} color="red" />;
      case "xlsx":
      case "xls":
        return <FaFileExcel size={50} color="green" />;
      case "doc":
      case "docx":
        return <FaFileWord size={50} color="blue" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage size={50} color="orange" />;
      default:
        return null;
    }
  };

  return (
    <Container className="pt-4">
      {uploadedFiles.length > 0 ? (
        <div>
          {uploadedFiles.map((file, index) => {
            const extension = file["File Name"].split(".").pop().toLowerCase();
            const isImage = ["jpg", "jpeg", "png", "gif"].includes(extension);

            return (
              <div key={index} className="file-container">
                {/* Display file preview or icon */}
                {isImage ? (
                  <img
                    src={`${BASE_URL}/RetrieveFile/` + file["File Name"]}
                    alt={`File ${file["File Name"]}`}
                    className="file-image"
                  />
                ) : (
                  <div className="file-icon">
                    {getFileIcon(file["File Name"])}
                  </div>
                )}

                {/* Display file details */}
                <div className="pt-5">
                  <p>
                    <strong>Document Type:</strong> {file["Document Type"]}
                  </p>
                  <p>
                    <strong>Document Number:</strong> {file["Document Number"]}
                  </p>
                  <p>
                    <strong>Name On Document:</strong>{" "}
                    {file["Name On Document"]}
                  </p>
                </div>

                {/* Download icon */}
                <FaFileDownload
                  size={20}
                  className="download-icon"
                  onClick={() => handleDownload(file)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="d-flex justify-content-center">No files uploaded yet.</p>
      )}
    </Container>
  );
};

export default Document;
