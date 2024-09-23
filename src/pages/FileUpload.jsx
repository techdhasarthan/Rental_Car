import React, { useState, useEffect } from "react";
import "./Document.css";
import { Button } from "reactstrap";
import "remixicon/fonts/remixicon.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";

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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    resetForm();
    setShow(false);
  };

  const resetForm = () => {
    setSelectedFiles(null);
    setSelectedDocumentType("");
    setDocumentNumber("");
    setNameOnDocument("");
    setIssueDate("");
    setExpiryDate("");
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFiles || !id) {
      console.error("No files selected or customer ID is missing.");
      return;
    }

    const formData = new FormData();

    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    // Append document-related data
    formData.append("documentType", selectedDocumentType);
    formData.append("documentNumber", documentNumber);
    formData.append("nameOnDocument", nameOnDocument);
    formData.append("customerId", id);
    formData.append("issueDate", issueDate);
    formData.append("expiryDate", expiryDate);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      console.log(formData.getAll);
      const response = await fetch(`${BASE_URL}/uploadCustomerDocuments`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        setUploadResponse(result);
        handleClose(); // Close modal after successful upload
      } else {
        console.error("Failed to submit form:", response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      handleClose();
      alert("failed");
    }
  };

  return (
    <div className="d-flex justify-content-end text-end" data-aos="fade-down">
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
            <Form.Select
              aria-label="Document Type Select"
              value={selectedDocumentType}
              onChange={handleDocumentTypeChange}>
              <option value="">Select Document Type</option>
              <option value="Driving License">Driving License</option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Pan Card">Pan Card</option>
            </Form.Select>
            <br />

            <Form.Label>Document Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Document Number"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
            />
            <br />

            <Form.Label>Name On Document</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name On Document"
              value={nameOnDocument}
              onChange={(e) => setNameOnDocument(e.target.value)}
            />

            {selectedDocumentType === "Driving License" && (
              <div className="row">
                <div className="col-md-6">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            <br />

            <Form.Label>File Upload</Form.Label>
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
  );
};

export default FileUpload;
