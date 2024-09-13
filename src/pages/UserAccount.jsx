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
import { useUser } from "./UserContext";

const UserProfile = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const customerId = localStorage.getItem("userid") || "{}";
  console.log(customerId);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: customerId,
    Name: userdata.Name,
    Email_ID: userdata["Email ID"],
    Age: userdata.Age,
    Phone_Number: userdata["Phone Number"],
    Alternative_Mobile_No: userdata["Alternative Mobile.NO"],
  });
  const [userdata, setUserdata] = useState();
  const [isEditing, setIsEditing] = useState(false);
  // const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);
  const [count, setCount] = useState();
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
          setUserdata(data);
          console.log(data); // Check the structure of the response
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
            "Sign Status": vResponseObj["Sign Status"] || "", // Ensure this field is correctly named
          };
          // setUserInfo(profileData);
          //  setOriginalUserInfo(profileData);
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
  }, [customerId, backendUrl, count]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // setOriginalUserInfo(userInfo);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update profile. Status: ${response.status}`);
      }

      //   const updatedUserInfo = await response.json();
      //  7 setUserInfo(updatedUserInfo);
      //   setOriginalUserInfo(updatedUserInfo);
      setIsEditing(false);
      setCount(count + 1);
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
    // setUserInfo(originalUserInfo);
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

  // localStorage.setItem("user", JSON.stringify(userInfo.Name));

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
                          value={formData.Name}
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
                          value={formData.Age}
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
                          name="Phone_Number"
                          value={formData.Phone_Number}
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
                          name="Alternative_Mobile_No"
                          value={formData.Alternative_Mobile_No}
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
                          name="Email_ID"
                          value={formData.Email_ID}
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
                        <strong>Name:</strong> {userdata.Name}
                      </p>
                      <p>
                        <strong>Age:</strong> {userdata.Age}
                      </p>
                      <p>
                        <strong>Phone:</strong> {userdata["Phone Number"]}
                      </p>
                      <p>
                        <strong>Alternate Phone:</strong>{" "}
                        {userdata["Alternative Mobile.NO"]}
                      </p>
                      <p>
                        <strong>Email:</strong> {userdata["Email ID"]}
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
