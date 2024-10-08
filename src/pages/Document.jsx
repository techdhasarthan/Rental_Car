import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row } from "reactstrap";
import {
  FaFilePdf,
  FaFileExcel,
  FaFileWord,
  FaFileImage,
  FaFileDownload,
} from "react-icons/fa";
import "remixicon/fonts/remixicon.css";
import "./Document.css"; // Import the CSS file for styles
import documentType from "../assets/all-images/document-img/document.png";
import documentNo from "../assets/all-images/document-img/documentNo.png";
import { decrypt } from "../components/utils/cryptoUtils";

const Document = () => {
  const decryptedUserName = decrypt(localStorage.getItem("name"));
  const username = decryptedUserName;
  const decryptedUserPhoneNumber = decrypt(
    localStorage.getItem("phone number")
  );
  const userPhoneNumber = decryptedUserPhoneNumber;

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
        return (
          <FaFilePdf size={100} color="red" style={{ paddingTop: "20px" }} />
        );
      case "xlsx":
      case "xls":
        return (
          <FaFileExcel
            size={100}
            color="green"
            style={{ paddingTop: "20px" }}
          />
        );
      case "doc":
      case "docx":
        return (
          <FaFileWord size={100} color="blue" style={{ paddingTop: "20px" }} />
        );
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return (
          <FaFileImage
            size={100}
            color="orange"
            style={{ paddingTop: "20px" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container className="pt-4">
      {uploadedFiles.length > 0 ? (
        <Row>
          {uploadedFiles.map((file, index) => {
            return (
              <Col lg={6} md={6} sm={12} key={index} className="mb-4">
                <div className="file-container d-flex align-items-start justify-content-between">
                  {/* Display file icon based on file type */}
                  <div className="file-icon">
                    {getFileIcon(file["File Name"])}
                  </div>

                  {/* Display file details */}
                  <div className="file-details pt-4">
                    <div className="info-item d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="info-icon">
                        <path d="M1 5C1 4.44772 1.44772 4 2 4H22C22.5523 4 23 4.44772 23 5V19C23 19.5523 22.5523 20 22 20H2C1.44772 20 1 19.5523 1 19V5ZM13 8V10H19V8H13ZM18 12H13V14H18V12ZM10.5 10C10.5 8.61929 9.38071 7.5 8 7.5C6.61929 7.5 5.5 8.61929 5.5 10C5.5 11.3807 6.61929 12.5 8 12.5C9.38071 12.5 10.5 11.3807 10.5 10ZM8 13.5C6.067 13.5 4.5 15.067 4.5 17H11.5C11.5 15.067 9.933 13.5 8 13.5Z"></path>
                      </svg>
                      <span className="ms-2">{file["Document Type"]}</span>
                    </div>

                    <div className="info-item d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="info-icon">
                        <path d="M9 18H4V10H9V18ZM15 18H10V6H15V18ZM21 18H16V2H21V18ZM22 22H3V20H22V22Z"></path>
                      </svg>
                      <span className="ms-2">{file["Document Number"]}</span>
                    </div>

                    <div className="info-item d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="info-icon">
                        <path d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"></path>
                      </svg>
                      <span className="ms-2">{file["Name On Document"]}</span>
                    </div>
                  </div>

                  {/* Download icon */}
                  <FaFileDownload
                    size={20}
                    className="download-icon"
                    onClick={() => handleDownload(file)}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p className="d-flex justify-content-center">No files uploaded yet.</p>
      )}
    </Container>
  );
};

export default Document;
