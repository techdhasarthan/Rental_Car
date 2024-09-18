import React, { useState } from "react";
import "./Document.css";
import { Container, Button } from "reactstrap";
import "remixicon/fonts/remixicon.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

const FileUpload = ({ id }) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [show, setShow] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [nameOnDocument, setNameOnDocument] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setSelectedFiles(null); // Reset file input
    setSelectedDocumentType("");
    setDocumentNumber("");
    setNameOnDocument("");
    setIssueDate("");
    setExpiryDate("");
    setShow(false);
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!selectedFiles || !id) {
      console.error("No files selected or customer ID is missing.");
      return;
    }

    const formData = new FormData();

    // Append selected files
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    // Append document-related data
    formData.append("documentType", selectedDocumentType);
    formData.append("documentNumber", documentNumber);
    formData.append("nameOnDocument", nameOnDocument);
    formData.append("customerId", id);
    formData.append("issueDate", issueDate);
    formData.append("expiryDate", expiryDate);

    try {
      const response = await fetch(`${BASE_URL}/uploadCustomerDocuments`, {
        method: "POST",
        body: formData, // Correct placement of formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        setUploadResponse(result);
        setShow(false);
      } else {
        console.error("Failed to submit form:", response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="  d-flex justify-content-end text-end ">
      <div className="header pb-3">
        <Button color="warning" className="btn-4 p-2" onClick={handleShow}>
          <i className="ri-file-upload-line"></i> Document Upload
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label className="my-2">Document Type</Form.Label>
            <br />
            <select
              className="select"
              value={selectedDocumentType}
              onChange={handleDocumentTypeChange}>
              <option value="">Select Document Type</option>
              <option value="Driving License">Driving License</option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Pan Card">Pan Card</option>
              <option value="Voter ID">Voter ID</option>
            </select>

            <Form.Label>Document Number</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
            />

            <Form.Label>Name On Document</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              value={nameOnDocument}
              onChange={(e) => setNameOnDocument(e.target.value)}
            />

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

            <Form.Label>File upload</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*" // Only allow image files
            />
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
  );
};

export default FileUpload;
