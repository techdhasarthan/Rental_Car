import React, { useState } from "react";
import "./Document.css";

import { Container, Button } from "reactstrap";
import "remixicon/fonts/remixicon.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios"; // Import axios for making HTTP requests

const Document = () => {
  const [show, setShow] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null); // To store the backend response
  const [selectedDocumentType, setSelectedDocumentType] = useState(""); // To track the selected document type

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
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file); // Append each file to the FormData object
      });

      // Append additional form data if needed
      formData.append("documentType", selectedDocumentType);

      try {
        const response = await axios.post(
          "http://localhost:5000/upload",
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
    // <div className="container-md">
    <Container className="  my-2 ">
      <div className="header">
        <div className="profile-header ">
          <h4 className="profile-section fw-bold  ">Document</h4>
        </div>
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

            {/* Document Number and Name Fields */}
            <br />
            <Form.Label>Document Number</Form.Label>
            <Form.Control size="lg" type="text" />
            <br />
            <Form.Label>Name On Document</Form.Label>
            <Form.Control size="lg" type="text" />
            <br />

            {/* Conditionally Render Date Fields for Driving License */}
            {selectedDocumentType === "Driving License" && (
              <div className="row">
                <div className="col-md-6">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control size="lg" type="date" />
                </div>
                <div className="col-md-6">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control size="lg" type="date" />
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
            <Button color="warning" onClick={handleFileUpload}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="content">
        <div className="icon">📄🔍</div>
        <p>No Record Found</p>
        {uploadResponse && (
          <div>Upload Successful: {uploadResponse.message}</div>
        )}
      </div>
    </Container>
    // </div>
  );
};

export default Document;
