import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "remixicon/fonts/remixicon.css"; // Import Remix Icons stylesheet
import "./UserProfile.css"; // Import your CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const responseData = JSON.parse(localStorage.getItem("userData") || "{}");

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    Name: responseData.name || "",
    PhoneNumber: responseData.phoneNumber || "",
  });

  console.log(responseData);
  const [originalUserInfo, setOriginalUserInfo] = useState(userInfo); // Store original user info for cancel

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setOriginalUserInfo(userInfo); // Save original info when entering edit mode
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/update", {
        method: "PUT", // or 'POST' depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        autoClose: 2000, // Show toast for 2 seconds
        className: "custom-toast", // Apply custom class for styling
      });
    } catch (error) {
      toast.error("Failed to update profile. Please try again.", {
        autoClose: 3000, // Show toast for 3 seconds
      });
    } finally {
      localStorage.clear();
    }
  };

  const handleCancel = () => {
    setUserInfo(originalUserInfo); // Revert to the original user info
    setIsEditing(false);
  };

  const handleSignOut = () => {
    // Logic for sign out
    toast.error("Signed out successfully!", {
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate("/sign-in");
    }, 2000);
  };

  return (
    <Helmet title="Profile">
      <CommonSection title="Profile" />
      <section className="profile-section py-5">
        <Container>
          <div className="profile-header">
            <Button color="warning" onClick={handleSignOut}>
              <i className="ri-logout-box-line"></i> Sign Out
            </Button>
          </div>
          <Row>
            <Col lg="6" md="6">
              <Card>
                <CardBody>
                  <h4 className="fw-bold mb-4">
                    Your Profile Information
                    {isEditing ? (
                      <Button
                        color="link"
                        onClick={handleCancel}
                        className="float-end button">
                        <i
                          className="ri-close-fill icon-edit-save"
                          aria-label="Cancel profile"></i>{" "}
                      </Button>
                    ) : (
                      <Button
                        color="link"
                        onClick={handleEditClick}
                        className="float-end button">
                        <i
                          className="ri-edit-2-fill icon-edit-save"
                          aria-label="Edit profile"></i>{" "}
                      </Button>
                    )}
                  </h4>
                  {isEditing ? (
                    <div className="large-text px-4">
                      <FormGroup className="mb-2">
                        <Label for="name">
                          <strong>Name:</strong>{" "}
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={userInfo.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="age">
                          <strong>Age:</strong>{" "}
                        </Label>
                        <Input
                          type="text"
                          id="age"
                          name="age"
                          value={userInfo.age}
                          onChange={handleInputChange}
                          placeholder="Enter your age"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="phone">
                          <strong> Phone:</strong>{" "}
                        </Label>
                        <Input
                          type="text"
                          id="phone"
                          name="phone"
                          value={userInfo.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="Alt phone">
                          <strong> Alternate Phone:</strong>{" "}
                        </Label>
                        <Input
                          type="text"
                          id="alt_phone"
                          name="alt_phone"
                          value={userInfo.alt_phone}
                          onChange={handleInputChange}
                          placeholder="Enter your alternate phone number"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="email">
                          <strong>Email:</strong>{" "}
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={userInfo.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                        />
                      </FormGroup>
                      <div className="d-flex justify-content-end">
                        <button
                          className="contact__btn me-2"
                          onClick={handleSave}>
                          Update Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="large-text px-4">
                      <p>
                        <strong>Name:</strong> {userInfo.Name}
                      </p>
                      <p>
                        <strong>Age:</strong> {userInfo.age}
                      </p>
                      <p>
                        <strong>Phone:</strong> {userInfo.PhoneNumber}
                      </p>
                      <p>
                        <strong>Alternate Phone:</strong> {userInfo.alt_phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {userInfo.email}
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>

            <Col lg="6" md="6">
              <Card>
                <CardBody>
                  <h4 className="fw-bold">Enquiry Information</h4>
                  <p className="section__description mb-0">
                    If you have any questions or need further assistance, please
                    contact us.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer />
    </Helmet>
  );
};

export default UserProfile;
