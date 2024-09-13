import React, { useState, useEffect } from "react";
import axios from "axios";
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
import "remixicon/fonts/remixicon.css";
import "./UserProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProfileOption from "./ProfileOption";

const UserProfile = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const customerId = localStorage.getItem("id") || "{}";
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    ID: "",
    Name: "",
    "Phone Number": "",
    Password: "",
    "Email ID": "",
    "Alternative Mobile.NO": "",
    Age: "",
    "Sign Status": "active",
  });
  const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/getCustomerProfileDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: customerId }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const vResponseObj = data.data;
          const profileData = {
            ID: vResponseObj.ID || "",
            Name: vResponseObj.Name || "",
            "Phone Number": vResponseObj["Phone Number"] || "",
            Password: vResponseObj.Password || "",
            "Email ID": vResponseObj["Email ID"] || "",
            "Alternative Mobile.NO":
              vResponseObj["Alternative Mobile.NO"] || "",
            Age: vResponseObj.Age || "",
            "Sign Status": "",
          };

          setUserInfo(profileData);
          setOriginalUserInfo(profileData);
        } else {
          toast.error(
            `Failed to fetch profile data. Status: ${response.status}`
          );
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
        console.error("Error fetching profile data:", error);
      }
    };

    if (customerId) {
      fetchProfileData();
    }
  }, [customerId, backendUrl]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setOriginalUserInfo(userInfo);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/updateCustomerRegistrationDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update profile. Status: ${response.status}`);
      }

      const updatedUserInfo = await response.json();
      setUserInfo(updatedUserInfo);
      setOriginalUserInfo(updatedUserInfo);
      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        autoClose: 2000,
        className: "custom-toast",
      });
    } catch (error) {
      toast.error(`Failed to update profile: ${error.message}`, {
        autoClose: 3000,
      });
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setUserInfo(originalUserInfo);
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/getCustomerRegistrationDetailsSignOut`,
        { id: customerId }
      );

      if (response.data.status === "false") {
        toast.error("Failed sign out", {
          autoClose: 2000,
          className: "custom-toast",
        });
      } else if (response.data.status === "true") {
        toast.success("Sign out successfully", {
          autoClose: 2000,
          className: "custom-toast",
        });
        setTimeout(() => {
          navigate("/sign-in");
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed sign out. Please try again.", {
        autoClose: 3000,
      });
      console.error("Error signing out:", error);
    }
  };

  localStorage.setItem("user", JSON.stringify(userInfo.Name));

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
            <Col lg="12" md="12">
              <Card className="shadow">
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
                          name="Name"
                          value={userInfo.Name}
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
                          name="Age"
                          value={userInfo.Age}
                          onChange={handleInputChange}
                          placeholder="Enter your age"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="phone">
                          <strong>Phone:</strong>{" "}
                        </Label>
                        <Input
                          type="text"
                          id="phone"
                          name="Phone Number"
                          value={userInfo["Phone Number"]}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="alt_phone">
                          <strong>Alternate Phone:</strong>{" "}
                        </Label>
                        <Input
                          type="text"
                          id="alt_phone"
                          name="Alternative Mobile.NO"
                          value={userInfo["Alternative Mobile.NO"]}
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
                          name="Email ID"
                          value={userInfo["Email ID"]}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                        />
                      </FormGroup>
                      <div className="d-flex justify-content-end">
                        <Button color="primary" onClick={handleSave}>
                          Update Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="large-text px-4">
                      <p>
                        <strong>Name:</strong> {userInfo.Name}
                      </p>
                      <p>
                        <strong>Age:</strong> {userInfo.Age}
                      </p>
                      <p>
                        <strong>Phone:</strong> {userInfo["Phone Number"]}
                      </p>
                      <p>
                        <strong>Alternate Phone:</strong>{" "}
                        {userInfo["Alternative Mobile.NO"]}
                      </p>
                      <p>
                        <strong>Email:</strong> {userInfo["Email ID"]}
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ProfileOption />
      </section>
      <ToastContainer />
    </Helmet>
  );
};

export default UserProfile;
