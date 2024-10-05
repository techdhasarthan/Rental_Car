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
import { message } from "antd";
import "./UploadConfirm.css"; // Ensure necessary styles are in place
import invaild from "../../src/assets/all-images/slider-img/invaild.jpg";
import validImage from "../../src/assets/all-images/slider-img/vaild.jpg"; // Path to the valid image
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { decrypt } from "../components/utils/cryptoUtils";

function UploadConfirm() {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [isOldFile, setIsOldFile] = useState(false);
  const [isFileValid, setIsFileValid] = useState(false); // To check if the file is valid
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [nameOnDocument, setNameOnDocument] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [errors, setErrors] = useState({}); // Validation errors

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const decryptedUserID = decrypt(localStorage.getItem("id"));
  const id = decryptedUserID;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const excelFile = files.some(
      (file) =>
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
    );

    if (excelFile) {
      message.error("Excel files are not allowed.");
      event.target.value = null;
      setSelectedFiles(null); // Clear the selected files
    } else {
      setSelectedFiles(event.target.files);
    }
  };

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
  };

  const validateForm = () => {
    const errors = {};
    if (!selectedDocumentType)
      errors.documentType = "Document type is required.";
    if (!documentNumber) errors.documentNumber = "Document number is required.";
    if (!nameOnDocument)
      errors.nameOnDocument = "Name on document is required.";
    if (selectedDocumentType === "Driving License" && !issueDate)
      errors.issueDate = "Issue date is required for Driving License.";
    if (selectedDocumentType === "Driving License" && !expiryDate)
      errors.expiryDate = "Expiry date is required for Driving License.";
    if (!selectedFiles || selectedFiles.length === 0)
      errors.files = "At least one file must be uploaded.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
          message.success("Form submitted successfully!");
          toggleNested(); // Close the modal after upload
          setModal(false);
        } else {
          message.error("Failed to upload document: " + result);
        }
      } catch (error) {
        message.error("Something went wrong during the upload!");
        console.error("Error uploading file:", error);
      }
    } else {
      setModal(false);
    }
  };

  const decryptedDocumentCheckStatus = decrypt(localStorage.getItem("status"));
  const documentStatus = decryptedDocumentCheckStatus;

  const handleOldFileClick = async () => {
    setIsOldFile(true);
    if (documentStatus === "true") {
      setIsFileValid(true);
    } else {
      setIsFileValid(false);
    }
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
                    style={{ maxWidth: "20%", height: "auto" }}
                  />
                  <h4>{isFileValid ? "Verified" : "File Not Found"}</h4>
                </div>
              ) : (
                <Container>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Document Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedDocumentType}
                      onChange={handleDocumentTypeChange}
                      style={{ color: "black" }}>
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
                      style={{ color: "black" }}
                    />
                    {errors.documentNumber && (
                      <p className="error">{errors.documentNumber}</p>
                    )}

                    <Form.Label>Name on Document</Form.Label>
                    <Form.Control
                      type="text"
                      value={nameOnDocument}
                      onChange={(e) => setNameOnDocument(e.target.value)}
                      style={{ color: "black" }} // Set the text color to black
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
                          style={{ color: "black" }}
                        />
                        {errors.issueDate && (
                          <p className="error">{errors.issueDate}</p>
                        )}

                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          style={{ color: "black" }}
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
                      style={{ color: "black" }}
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
