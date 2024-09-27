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
import user from "../assets/all-images/slider-img/profile.jpg";

const UserProfile = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const customerId = localStorage.getItem("id");
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    password: "",
    emailId: "",
    alternativeMobileNo: "",
    age: "",
    signStatus: "active",
    profileImage: null, // New: profile image
  });
  const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);
  const [profileImagePreview, setProfileImagePreview] = useState();

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/getCustomerProfileDetails`,
          {
            id: customerId,
          }
        );

        if (response.data) {
          const data = response.data.data;
          const profileData = {
            id: data.ID || "",
            name: data.Name || "",
            phoneNumber: data["Phone Number"] || "",
            password: data.Password || "",
            emailId: data["Email ID"] || "",
            alternativeMobileNo: data["Alternative Mobile.NO"] || "",
            age: data.Age || "",
            signStatus: data["Sign Status"] || "active",
            profileImage: data.profileImage || user,
          };
          localStorage.setItem("name", profileData.name);
          localStorage.setItem("phone number", profileData.phoneNumber);
          setUserInfo(profileData);
          setOriginalUserInfo(profileData);
          setProfileImagePreview(profileData.profileImage);
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

  // Handle profile image upload preview
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfo((prevInfo) => ({ ...prevInfo, profileImage: file }));
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle save profile changes (including image upload)
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("id", userInfo.id);
    formData.append("name", userInfo.name);
    formData.append("phoneNumber", userInfo.phoneNumber);
    formData.append("emailId", userInfo.emailId);
    formData.append("alternativeMobileNo", userInfo.alternativeMobileNo);
    formData.append("age", userInfo.age);
    formData.append("profileImage", userInfo.profileImage); // Profile image

    try {
      const response = await axios.post(
        `${backendUrl}/updateCustomerProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setOriginalUserInfo(userInfo); // Update original info
        setIsEditing(false); // Exit editing mode

        localStorage.setItem(
          "profileImage",
          URL.createObjectURL(userInfo.profileImage)
        );
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      toast.error(`Error updating profile: ${error.message}`);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUserInfo(originalUserInfo); // Reset to original data
    setProfileImagePreview(originalUserInfo.profileImage);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    // Sign out logic here
    navigate("/sign-in");
  };

  return (
    <Helmet title="Profile">
      <CommonSection title="Profile" />
      <section className="profile-section py-5 ">
        <Container>
          <Row>
            <Col lg="4" md="12" className="text-center mt-4 mb-5 ">
              {/* Profile Image */}
              <div className="profile-image-wrapper ">
                <img
                  src={profileImagePreview || "/default-profile.png"}
                  alt="Profile"
                  className="profile-image img-fluid rounded-circle shadow-lg"
                />
                {isEditing && (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                )}
              </div>
            </Col>
            <Col lg="8" md="12">
              <Card className="shadow">
                <CardBody>
                  <h4 className="fw-bold mb-4">
                    Your Profile Information
                    {isEditing ? (
                      <Button
                        color="warning"
                        onClick={handleCancel}
                        className="float-end">
                        <i
                          className="ri-close-fill"
                          aria-label="Cancel profile"></i>
                      </Button>
                    ) : (
                      <Button
                        color="warning"
                        onClick={handleEditClick}
                        className="float-end">
                        <i
                          className="ri-edit-2-fill"
                          aria-label="Edit profile"></i>
                      </Button>
                    )}
                  </h4>

                  {isEditing ? (
                    <div className="px-4">
                      <FormGroup className="mb-2">
                        <Label for="name">
                          <strong>Name:</strong>
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={userInfo.name}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="age">
                          <strong>Age:</strong>
                        </Label>
                        <Input
                          type="text"
                          id="age"
                          name="age"
                          value={userInfo.age}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="phoneNumber">
                          <strong>Phone:</strong>
                        </Label>
                        <Input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={userInfo.phoneNumber}
                          disabled
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="alternativeMobileNo">
                          <strong>Alternate Phone:</strong>
                        </Label>
                        <Input
                          type="text"
                          id="alternativeMobileNo"
                          name="alternativeMobileNo"
                          value={userInfo.alternativeMobileNo}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="emailId">
                          <strong>Email:</strong>
                        </Label>
                        <Input
                          type="email"
                          id="emailId"
                          name="emailId"
                          value={userInfo.emailId}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                      <Button color="primary" onClick={handleSave}>
                        Update Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="px-4">
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
