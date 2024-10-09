import React, { useState, useEffect } from "react";
import "./Document.css";
import { Button } from "reactstrap";
import "remixicon/fonts/remixicon.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "aos/dist/aos.css";
import AOS from "aos";
import { message } from "antd";

const FileUpload = ({ id, onUploadSuccess }) => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [show, setShow] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
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
    const files = event.target.files;
    const rejectedFiles = Array.from(files).filter(
      (file) =>
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
    );

    if (rejectedFiles.length > 0) {
      message.error("Excel files are not allowed.");
      event.target.value = "";
      setSelectedFiles(null);
      return;
    }

    setSelectedFiles(files);
  };

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
  };

  const validateForm = () => {
    if (!selectedDocumentType) {
      message.error("Please select a document type.");
      return false;
    }

    // Validation based on document type
    if (
      selectedDocumentType === "Driving License" &&
      documentNumber.length !== 16
    ) {
      message.error("Driving License number must be 16 digits.");
      return false;
    }
    if (
      selectedDocumentType === "Aadhar Card" &&
      documentNumber.length !== 12
    ) {
      message.error("Aadhar Card number must be 12 digits.");
      return false;
    }
    if (selectedDocumentType === "Pan Card") {
      const panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format validation
      if (!panCardPattern.test(documentNumber)) {
        message.error(
          "PAN Card number must be 10 characters long and alphanumeric."
        );
        return false;
      }
    }

    if (!documentNumber) {
      message.error("Please enter a document number.");
      return false;
    }

    if (!nameOnDocument) {
      message.error("Please enter the name on the document.");
      return false;
    }

    if (
      selectedDocumentType === "Driving License" &&
      (!issueDate || !expiryDate)
    ) {
      message.error("Please enter both issue and expiry dates.");
      return false;
    }

    if (!selectedFiles) {
      message.error("Please upload a file.");
      return false;
    }

    return true;
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("documentType", selectedDocumentType || "");
    formData.append("documentNumber", documentNumber || "");
    formData.append("nameOnDocument", nameOnDocument || "");
    formData.append("customerId", id);
    formData.append("issueDate", issueDate || "");
    formData.append("expiryDate", expiryDate || "");

    try {
      const response = await fetch(`${BASE_URL}/uploadCustomerDocuments`, {
        method: "POST",
        body: formData,
      });

      const result = await response.text();

      if (response.ok) {
        message.success("Form submitted successfully.");
        handleClose();
        onUploadSuccess();
      } else {
        message.error("Failed to submit form.");
      }
    } catch (error) {
      message.error("Error uploading file.");
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
              className="custom-placeholder"
              type="text"
              placeholder="Enter Document Number"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              style={{ color: "black" }}
            />
            <br />

            <Form.Label>Name On Document</Form.Label>
            <Form.Control
              className="custom-placeholder"
              type="text"
              placeholder="Enter Name On Document"
              value={nameOnDocument}
              onChange={(e) => setNameOnDocument(e.target.value)}
              style={{ color: "black" }}
            />

            {selectedDocumentType === "Driving License" && (
              <div className="row">
                <div className="col-md-6">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    style={{ color: "black" }}
                  />
                </div>
                <div className="col-md-6">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    style={{ color: "black" }}
                  />
                </div>
              </div>
            )}

            <br />

            <Form.Label>File Upload</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ color: "black" }}
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
