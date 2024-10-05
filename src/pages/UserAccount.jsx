import React, { useState, useEffect, useRef } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProfileOption from "./ProfileOption";
import user from "../assets/all-images/slider-img/profile.jpg"; // default profile image
import { encrypt, decrypt } from "../components/utils/cryptoUtils";
import { message } from "antd";

const UserProfile = () => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const decryptedUserID = decrypt(localStorage.getItem("id"));
  const customerId = decryptedUserID;

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
    profileImage: null, // Profile image initially null
  });
  const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);
  const [profileImagePreview, setProfileImagePreview] = useState(user); // default profile image

  const fileInputRef = useRef(null); // Ref for hidden file input

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/getCustomerProfileDetails`,
          { id: customerId }
        );

        if (response.data) {
          const data = response.data.data;
          const imageDataObj = response.data.hasOwnProperty("imageData")
            ? response.data.imageData
            : null;

          const profileData = {
            id: data.ID || "",
            name: data.Name || "",
            phoneNumber: data["Phone Number"] || "",
            password: data.Password || "",
            emailId: data["Email ID"] || "",
            alternativeMobileNo: data["Alternative Mobile.NO"] || "",
            age: data.Age || "",
            signStatus: data["Sign Status"] || "active",
            profileImage: imageDataObj
              ? `${backendUrl}/RetrieveFile/${imageDataObj["File Name"]}`
              : user, // Default or fetched image
          };

          const encryptedUserName = encrypt(profileData.name);

          localStorage.setItem("name", encryptedUserName);

          const encryptedPhoneNumber = encrypt(profileData.phoneNumber);

          localStorage.setItem("phone number", encryptedPhoneNumber);

          const email = encrypt(
            localStorage.setItem("email", profileData.emailId)
          );

          // ---------------------------------------------------------------------------------------------------------

          setUserInfo(profileData);
          setOriginalUserInfo(profileData);
          setProfileImagePreview(profileData.profileImage); // Set preview to fetched image
        } else {
          message.error(
            `Failed to fetch profile data. Status: ${response.status}`
          );
        }
      } catch (error) {
        message.error(`An error occurred: ${error.message}`);
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
      setUserInfo((prevInfo) => ({ ...prevInfo, profileImage: file })); // Set the file object
      setProfileImagePreview(URL.createObjectURL(file)); // Show preview of the selected image
    }
  };

  // Trigger the hidden file input when the button is clicked
  const handleProfileImageClick = () => {
    fileInputRef.current.click(); // This triggers the hidden file input
  };

  // Image upload function (triggered by a separate upload button)
  const handleProfileImageUpload = async () => {
    const formData = new FormData();
    formData.append("customerId", customerId); // Attach user ID
    formData.append("file", userInfo.profileImage); // Attach the profile image (file)

    try {
      const response = await axios.post(
        `${backendUrl}/uploadCustomerProfileImageFile`, // Separate API for image upload
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      if (response.data.status === "true") {
        const imageUrl = `${backendUrl}/RetrieveFile/${response.data.fileName}`;
        const encryptedImageUrl = encrypt(imageUrl);
        localStorage.setItem("UserImage", encryptedImageUrl);

        setUserInfo((prevInfo) => ({
          ...prevInfo,
          profileImage: imageUrl, // Update profile image with the URL from the backend
        }));

        setProfileImagePreview(imageUrl); // Set the preview to the uploaded image

        message.success("Profile image uploaded successfully!");
      } else {
        message.error("Failed to upload profile image.");
      }
    } catch (error) {
      message.error(`Error uploading profile image: ${error.message}`);
    }
  };

  // Handle save profile changes
  const handleSave = async () => {
    const updateUserData = {
      id: userInfo.id,
      name: userInfo.name,
      phoneNumber: userInfo.phoneNumber,
      emailId: userInfo.emailId,
      alternativeMobileNo: userInfo.alternativeMobileNo,
      age: userInfo.age,

      signStatus: userInfo.signStatus,
      profileImage: userInfo.profileImage, // Ensure profileImage includes the uploaded one
    };

    try {
      const response = await axios.post(
        `${backendUrl}/updateCustomerRegistrationDetails`,
        updateUserData
      );

      if (response.status === 200) {
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2000 milliseconds = 2 seconds
        message.success("Profile updated successfully!");
        setOriginalUserInfo(userInfo); // Update original info with new profile image
        setIsEditing(false); // Exit editing mode
      } else {
        message.error("Failed to update profile.");
      }
    } catch (error) {
      message.error(`Error updating profile: ${error.message}`);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUserInfo(originalUserInfo); // Reset to original data
    setProfileImagePreview(userInfo.profileImage); // Reset image
    setIsEditing(false);
  };

  const handleSignOut = () => {
    // Sign out logic here
    navigate("/sign-in");
  };

  return (
    <Helmet title="Profile">
      <CommonSection title="Profile" />
      <section className="profile-section py-5">
        <Container>
          <Row>
            <Col lg="4" md="12" className="text-center mt-4 mb-5">
              {/* Profile Image */}
              <div className="profile-image-wrapper">
                <img
                  src={profileImagePreview || user} // Use preview or default
                  alt="Profile"
                  className="profile-image img-fluid rounded-circle shadow-lg"
                />
                {isEditing && (
                  <>
                    {/* Hidden File Input */}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      innerRef={fileInputRef}
                      style={{ display: "none" }} // Hide file input
                    />
                    {/* Button to trigger file input */}
                    <Button
                      className="profile-image-btn"
                      onClick={handleProfileImageClick}>
                      <i className="ri-image-add-line profile-image-icon"></i>
                    </Button>
                    {/* Button to upload the image */}
                    <Button
                      color="primary"
                      className="mt-4"
                      onClick={handleProfileImageUpload}>
                      <i className="ri-upload-line"></i> Upload Image
                    </Button>
                  </>
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
                          style={{ color: "black" }}
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
                          style={{ color: "black" }}
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
                          style={{ color: "black" }}
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
                          style={{ color: "black" }}
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
                          style={{ color: "black" }}
                        />
                      </FormGroup>
                      <Button color="primary" onClick={handleSave}>
                        Update Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="user-info px-4">
                      <div className="info-item d-flex">
                        <strong>Name</strong>
                        <span className="ml-3">
                          <span className="fw-bolder">:</span> {userInfo.name}
                        </span>
                      </div>
                      <div className="info-item d-flex">
                        <strong>Age</strong>
                        <span className="ml-3">
                          <span className="fw-bolder">:</span> {userInfo.age}
                        </span>
                      </div>
                      <div className="info-item d-flex">
                        <strong>Phone</strong>
                        <span className="ml-3">
                          <span className="fw-bolder">:</span>{" "}
                          {userInfo.phoneNumber}
                        </span>
                      </div>
                      <div className="info-item d-flex">
                        <strong>Alternate Phone</strong>
                        <span className="ml-3">
                          <span className="fw-bolder">:</span>{" "}
                          {userInfo.alternativeMobileNo}
                        </span>
                      </div>
                      <div className="info-item d-flex">
                        <strong>Email</strong>
                        <span className="ml-3">
                          <span className="fw-bolder">:</span>{" "}
                          {userInfo.emailId}
                        </span>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ProfileOption />
      </section>
    </Helmet>
  );
};

export default UserProfile;
