import React, { useState } from "react";
import "./Document.css";

import { Container, Button } from "reactstrap";
import "remixicon/fonts/remixicon.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios"; // Import axios for making HTTP requests

const FileUpload = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [show, setShow] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null); // To store the backend response
  const [selectedDocumentType, setSelectedDocumentType] = useState(""); // To track the selected document type
  const [documentNumber, setDocumentNumber] = useState(""); // State for document number
  const [nameOnDocument, setNameOnDocument] = useState(""); // State for name on document
  const [issueDate, setIssueDate] = useState(""); // State for issue date (for Driving License)
  const [expiryDate, setExpiryDate] = useState(""); // State for expiry date (for Driving License)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
  };

  const handleFileUpload = async () => {
    if (selectedFiles) {
      const formData = new FormData();

      // Append each file to the FormData object
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });

      // Append additional form data
      formData.append("documentType", selectedDocumentType);
      formData.append("documentNumber", documentNumber); // Document number
      formData.append("nameOnDocument", nameOnDocument); // Name on document

      // Append issue/expiry dates if document type is Driving License
      if (selectedDocumentType === "Driving License") {
        formData.append("issueDate", issueDate);
        formData.append("expiryDate", expiryDate);
      }

      try {
        const response = await axios.post(
          `${BASE_URL}/upload`, // Your API endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle the response from the server
        setUploadResponse(response.data);
        console.log(response.data); // Example response handling
        setShow(false); // Close the modal after successful upload
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <Container className="my-2 ms-5 pt-4">
      <div className="header">
        <Button color="warning" className="btn-4" onClick={handleShow}>
          <i className="ri-file-upload-line"></i> Upload
        </Button>

        {/* Modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Dropdown for Document Type */}
            <Form.Label className="my-2">Document Type</Form.Label>
            <br />
            <select className="select" onChange={handleDocumentTypeChange}>
              <option value="">Select Document Type</option>
              <option value="Driving License">Driving License</option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Pan Card">Pan Card</option>
              <option value="Voter ID">Voter ID</option>
            </select>

            {/* Document Number */}

            <Form.Label>Document Number</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
            />

            {/* Name On Document */}
            <Form.Label>Name On Document</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              value={nameOnDocument}
              onChange={(e) => setNameOnDocument(e.target.value)}
            />

            {/* Conditionally Render Issue/Expiry Date Fields for Driving License */}
            {selectedDocumentType === "Driving License" && (
              <div className="row">
                <div className="col-md-6">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    size="lg"
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    size="lg"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* File Upload Section */}
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>File upload</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="warning"
              className="btn-save"
              onClick={handleFileUpload}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default FileUpload;
