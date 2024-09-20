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
  const customerId = localStorage.getItem("id");
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [fetchData, setFetchData] = useState(null); // Initialize as null
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    password: "",
    emailId: "",
    alternativeMobileNo: "",
    age: "",
    signStatus: "active",
  });
  const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/getCustomerProfileDetails`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: customerId }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFetchData(data.data); // Save the fetched data to state

          const profileData = {
            id: data.data.ID || "",
            name: data.data.Name || "",
            phoneNumber: data.data["Phone Number"] || "",
            password: data.data.Password || "",
            emailId: data.data["Email ID"] || "",
            alternativeMobileNo: data.data["Alternative Mobile.NO"] || "",
            age: data.data.Age || "",
            signStatus: data.data["Sign Status"] || "active",
          };

          setUserInfo(profileData); // Update the userInfo with fetched profile data
          setOriginalUserInfo(profileData); // Save original user info for reset if needed
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

  // Handle input changes when editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Handle saving the profile and displaying backend response
  const handleSave = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/updateCustomerRegistrationDetails`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo), // Send the current user info
        }
      );

      console.log(response);

      if (response.ok) {
        const updatedData = await response.json();
        console.log(JSON.stringify(updatedData));
        // Update userInfo with the response from the backend
        const updatedUserInfo = {
          id: updatedData.ID || userInfo.id,
          name: updatedData.Name || userInfo.name,
          phoneNumber: updatedData["Phone Number"] || userInfo.phoneNumber,
          password: updatedData.Password || userInfo.password,
          emailId: updatedData["Email ID"] || userInfo.emailId,
          alternativeMobileNo:
            updatedData["Alternative Mobile.NO"] ||
            userInfo.alternativeMobileNo,
          age: updatedData.Age || userInfo.age,
          signStatus: updatedData["Sign Status"] || userInfo.signStatus,
        };

        setUserInfo(updatedUserInfo); // Set the updated info in state
        setOriginalUserInfo(updatedUserInfo); // Update original user info
        setIsEditing(false); // Exit editing mode

        // Display success notification
        toast.success("Profile updated successfully!", {
          autoClose: 2000,
          className: "custom-toast",
        });
      } else {
        throw new Error(`Failed to update profile. Status: ${response.status}`);
      }
    } catch (error) {
      // Display error notification
      toast.error(`Failed to update profile: ${error.message}`, {
        autoClose: 3000,
      });
      console.error("Error updating profile:", error);
    }
  };

  // Handle editing toggles
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setOriginalUserInfo(userInfo); // Save original state before editing
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setUserInfo(originalUserInfo); // Revert to original data if canceled
    setIsEditing(false); // Exit editing mode
  };

  // Handle user sign out
  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/getCustomerRegistrationDetailsSignOut`,
        { id: customerId }
      );

      if (response.data.status === "true") {
        toast.success("Signed out successfully", {
          autoClose: 2000,
          className: "custom-toast",
        });
        setTimeout(() => {
          navigate("/sign-in");
        }, 1000);
      } else {
        toast.error("Failed to sign out", {
          autoClose: 2000,
          className: "custom-toast",
        });
      }
    } catch (error) {
      toast.error("Failed to sign out. Please try again.", {
        autoClose: 3000,
      });
      console.error("Error signing out:", error);
    }
  };

  localStorage.setItem("user", JSON.stringify(userInfo.name)); // Store user name in localStorage

  return (
    <Helmet title="Profile">
      <CommonSection title="Profile" />
      <section className="profile-section py-5">
        <Container>
          {/* <div className="profile-header">
            <Button color="warning" onClick={handleSignOut}>
              <i className="ri-logout-box-line"></i> Sign Out
            </Button>
          </div> */}
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
                        <Label for="phoneNumber">
                          <strong>Phone:</strong>{" "}
                        </Label>
                        <Input
                          disabled={true}
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={userInfo.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="alternativeMobileNo">
                          <strong>Alternate Phone:</strong>{" "}
                        </Label>
                        <Input
                          type="text"
                          id="alternativeMobileNo"
                          name="alternativeMobileNo"
                          value={userInfo.alternativeMobileNo}
                          onChange={handleInputChange}
                          placeholder="Enter your alternate phone number"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="emailId">
                          <strong>Email:</strong>{" "}
                        </Label>
                        <Input
                          type="email"
                          id="emailId"
                          name="emailId"
                          value={userInfo.emailId}
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
                        <strong>Name:</strong> {userInfo.name}
                      </p>
                      <p>
                        <strong>Age:</strong> {userInfo.age}
                      </p>
                      <p>
                        <strong>Phone:</strong> {userInfo.phoneNumber}
                      </p>
                      <p>
                        <strong>Alternate Phone:</strong>{" "}
                        {userInfo.alternativeMobileNo}
                      </p>
                      <p>
                        <strong>Email:</strong> {userInfo.emailId}
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
