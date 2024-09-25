import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./UploadConfirm.css"; // Ensure necessary styles are in place
import invaild from "../../src/assets/all-images/slider-img/invaild.jpg";
import validImage from "../../src/assets/all-images/slider-img/vaild.jpg"; // Path to the valid image
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { message } from "antd";

function UploadConfirm() {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [isOldFile, setIsOldFile] = useState(false);
  const [isFileValid, setIsFileValid] = useState(false); // To check if the file is valid
  const [hasUploadedFile, setHasUploadedFile] = useState(false); // To track if a file has been uploaded
  const [fileCheckMessage, setFileCheckMessage] = useState(""); // To store the backend check message
  const [errors, setErrors] = useState({}); // Validation errors

  const id = localStorage.getItem("id");

  // File upload related states
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [nameOnDocument, setNameOnDocument] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  // Handle file change
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  // Handle document type change
  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
  };

  // Validation function
  const validateForm = () => {
    const errors = {};

    if (!selectedDocumentType) {
      errors.documentType = "Document type is required.";
    }
    if (!documentNumber) {
      errors.documentNumber = "Document number is required.";
    }
    if (!nameOnDocument) {
      errors.nameOnDocument = "Name on document is required.";
    }
    if (selectedDocumentType === "Driving License" && !issueDate) {
      errors.issueDate = "Issue date is required for Driving License.";
    }
    if (selectedDocumentType === "Driving License" && !expiryDate) {
      errors.expiryDate = "Expiry date is required for Driving License.";
    }
    if (!selectedFiles || selectedFiles.length === 0) {
      errors.files = "At least one file must be uploaded.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // File upload function
  const handleFileUpload = async () => {
    if (validateForm()) {
      const formData = new FormData();

      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });

      formData.append("documentType", selectedDocumentType);
      formData.append("documentNumber", documentNumber);
      formData.append("nameOnDocument", nameOnDocument);
      formData.append("customerId", id);
      formData.append("issueDate", issueDate);
      formData.append("expiryDate", expiryDate);

      try {
        const response = await fetch(`${BASE_URL}/uploadCustomerDocuments`, {
          method: "POST",
          body: formData,
        });

        const result = await response.text();

        if (response.ok) {
          message.success("Form submitted successfully:");
          setModal(!true);
        }

        setHasUploadedFile(result); // Mark that a file has been uploaded
        toggleNested(); // Close the modal after upload
      } catch (error) {
        message.error("Something went wrong!");
        console.error("Error uploading file:", error);
      }
    } else {
      message.error("Please fill in all required fields.");
    }
  };

  const documentStatus = localStorage.getItem("status");

  // Show message for old file or display a local image
  const handleOldFileClick = async () => {
    try {
      console.log(documentStatus, "document status");

      if (documentStatus === "true") {
        setIsFileValid(true); // Set valid image
      } else {
        setIsFileValid(false); // Set invalid image
      }
    } catch (error) {
      console.error("Error checking file:", error);
      setIsFileValid(false); // If error, assume file is not found
    }

    setIsOldFile(true);
    toggleNested(); // Open the modal
  };

  return (
    <div className="ps-5 upload_button" data-aos="fade-up">
      <div className="Documentupload">
        <Button color="warning" onClick={toggle}>
          Document Upload
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Document Upload Options</ModalHeader>
        <ModalBody>
          <Button
            color="success"
            className="file-option"
            onClick={() => {
              setIsOldFile(false);
              toggleNested();
            }}>
            New File
          </Button>
          <Button
            color="success"
            className="file-option"
            onClick={handleOldFileClick}>
            Old File
          </Button>

          {/* Nested Modal for file upload or old file message */}
          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>
              {isOldFile ? "Old File" : "Upload Document"}
            </ModalHeader>
            <ModalBody>
              {isOldFile ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={isFileValid ? validImage : invaild}
                    alt={isFileValid ? "Valid Document" : "Invalid Document"}
                    style={{ maxWidth: "20%", height: "auto" }} // Adjust size as needed
                  />
                  <h4>{isFileValid ? "Verified" : "File Not Found"}</h4>
                </div>
              ) : (
                <Container>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Document Type</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={handleDocumentTypeChange}>
                      <option value="">Select Document Type</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="Pan Card">Pan Card</option>
                      <option value="Voter ID">Voter ID</option>
                    </Form.Control>
                    {errors.documentType && (
                      <p className="error">{errors.documentType}</p>
                    )}

                    <Form.Label>Document Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                    />
                    {errors.documentNumber && (
                      <p className="error">{errors.documentNumber}</p>
                    )}

                    <Form.Label>Name on Document</Form.Label>
                    <Form.Control
                      type="text"
                      value={nameOnDocument}
                      onChange={(e) => setNameOnDocument(e.target.value)}
                    />
                    {errors.nameOnDocument && (
                      <p className="error">{errors.nameOnDocument}</p>
                    )}

                    {selectedDocumentType === "Driving License" && (
                      <>
                        <Form.Label>Issue Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={issueDate}
                          onChange={(e) => setIssueDate(e.target.value)}
                        />
                        {errors.issueDate && (
                          <p className="error">{errors.issueDate}</p>
                        )}

                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                        {errors.expiryDate && (
                          <p className="error">{errors.expiryDate}</p>
                        )}
                      </>
                    )}

                    <Form.Label>Upload File</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                    {errors.files && <p className="error">{errors.files}</p>}
                  </Form.Group>
                </Container>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleFileUpload}>
                Done
              </Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UploadConfirm;
