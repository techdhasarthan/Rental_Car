import React, { useState } from "react";
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

function UploadConfirm() {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [isOldFile, setIsOldFile] = useState(false);
  const [isFileValid, setIsFileValid] = useState(false); // To check if the file is valid
  const [hasUploadedFile, setHasUploadedFile] = useState(false); // To track if a file has been uploaded
  const [fileCheckMessage, setFileCheckMessage] = useState(""); // To store the backend check message

  // File upload related states
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [nameOnDocument, setNameOnDocument] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

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

  // File upload function
  const handleFileUpload = async () => {
    if (selectedFiles) {
      const formData = new FormData();

      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });

      formData.append("documentType", selectedDocumentType);
      formData.append("documentNumber", documentNumber);
      formData.append("nameOnDocument", nameOnDocument);

      if (selectedDocumentType === "Driving License") {
        formData.append("issueDate", issueDate);
        formData.append("expiryDate", expiryDate);
      }

      try {
        const response = await axios.post(`${BASE_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Upload successful:", response.data);
        setHasUploadedFile(true); // Mark that a file has been uploaded
        toggleNested(); // Close the modal after upload
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Show message for old file or display a local image
  const handleOldFileClick = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/check-file`, {
        params: {
          documentNumber, // Send necessary details to check the file
        },
      });

      // Assuming the response contains a flag 'fileExists' to indicate file presence
      if (response.data.fileExists) {
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
    <div className="ps-5 upload_button">
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
                    src={isFileValid ? validImage : invaild} // Use the appropriate image based on file existence
                    alt={isFileValid ? "Valid Document" : "Invalid Document"}
                    style={{
                      maxWidth: "20%",
                      height: "auto",
                      // Space between image and text
                    }} // Adjust size as needed
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

                    <Form.Label>Document Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                    />

                    <Form.Label>Name on Document</Form.Label>
                    <Form.Control
                      type="text"
                      value={nameOnDocument}
                      onChange={(e) => setNameOnDocument(e.target.value)}
                    />

                    {selectedDocumentType === "Driving License" && (
                      <>
                        <Form.Label>Issue Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={issueDate}
                          onChange={(e) => setIssueDate(e.target.value)}
                        />

                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </>
                    )}

                    <Form.Label>Upload File</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handleFileChange}
                    />
                  </Form.Group>

                  <Button color="primary" onClick={handleFileUpload}>
                    Upload
                  </Button>
                </Container>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleNested}>
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
