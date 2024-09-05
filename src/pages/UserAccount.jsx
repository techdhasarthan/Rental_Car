// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Button,
//   Input,
//   FormGroup,
//   Label,
// } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
// import CommonSection from "../components/UI/CommonSection";
// import "remixicon/fonts/remixicon.css"; // Import Remix Icons stylesheet
// import "./UserProfile.css"; // Import your CSS file
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Document from "./Document";
// import ProfileOption from "./ProfileOption";

// const UserProfile = () => {
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [userInfo, setUserInfo] = useState({
//     Name: "",
//     PhoneNumber: "",
//     age: "",
//     alt_phone: "",
//     email: "",
//   });
//   const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);

//   const [localstore, setLocalstore] = useState([]);

//   const [isDocument, setIsDocument] = useState(false);

//   useEffect(() => {
//     // Fetch user data from localStorage and set state

//     const fetchData = async () => {
//       const responseData = JSON.parse(localStorage.getItem("userData") || "{}");
//       setLocalstore(responseData);
//       setUserInfo({
//         Name: responseData.name || "",
//         PhoneNumber: responseData.phoneNumber || "",
//         age: responseData.age || "",
//         alt_phone: responseData.alt_phone || "",
//         email: responseData.email || "",
//       });
//       setOriginalUserInfo({
//         Name: responseData.name || "",
//         PhoneNumber: responseData.phoneNumber || "",
//         age: responseData.age || "",
//         alt_phone: responseData.alt_phone || "",
//         email: responseData.email || "",
//       });
//     };
//     fetchData();
//   }, []);

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//     if (!isEditing) {
//       setOriginalUserInfo(userInfo); // Save original info when entering edit mode
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo({ ...userInfo, [name]: value });
//   };

//   console.log(localstore);
//   const handleSave = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:8080/api/auth/update/${userInfo.PhoneNumber}`,
//         userInfo,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         setIsEditing(false);
//         toast.success("Profile updated successfully!", {
//           autoClose: 2000,
//           className: "custom-toast",
//         });
//         localStorage.setItem("userData", JSON.stringify(userInfo));
//       } else {
//         throw new Error("Failed to update profile");
//       }
//     } catch (error) {
//       toast.error("Failed to update profile. Please try again.", {
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleCancel = () => {
//     setUserInfo(originalUserInfo); // Revert to the original user info
//     setIsEditing(false);
//   };

//   const handleSignOut = () => {
//     // Logic for sign out
//     toast.error("Signed out successfully!", {
//       autoClose: 1000,
//     });
//     setTimeout(() => {
//       navigate("/sign-in");
//     }, 2000);
//   };

//   const handleClickBooking = () => {
//     setIsDocument(!isDocument);
//   };
//   return (
//     <Helmet title="Profile">
//       <CommonSection title="Profile" />
//       <section className="profile-section py-5">
//         <Container>
//           <div className="profile-header">
//             <Button color="warning" onClick={handleSignOut}>
//               <i className="ri-logout-box-line"></i> Sign Out
//             </Button>
//           </div>
//           <Row>
//             <Col lg="12" md="6">
//               <Card>
//                 <CardBody>
//                   <h4 className="fw-bold mb-4">
//                     Your Profile Information
//                     {isEditing ? (
//                       <Button
//                         color="link"
//                         onClick={handleCancel}
//                         className="float-end button">
//                         <i
//                           className="ri-close-fill icon-edit-save"
//                           aria-label="Cancel profile"></i>{" "}
//                       </Button>
//                     ) : (
//                       <Button
//                         color="link"
//                         onClick={handleEditClick}
//                         className="float-end button">
//                         <i
//                           className="ri-edit-2-fill icon-edit-save"
//                           aria-label="Edit profile"></i>{" "}
//                       </Button>
//                     )}
//                   </h4>
//                   {isEditing ? (
//                     <div className="large-text px-4">
//                       <FormGroup className="mb-2">
//                         <Label for="name">
//                           <strong>Name:</strong>{" "}
//                         </Label>
//                         <Input
//                           type="text"
//                           id="name"
//                           name="Name"
//                           // value={localstore.Name}
//                           value={userInfo.Name}
//                           onChange={handleInputChange}
//                           placeholder="Enter your name"
//                         />
//                       </FormGroup>
//                       <FormGroup className="mb-2">
//                         <Label for="age">
//                           <strong>Age:</strong>{" "}
//                         </Label>
//                         <Input
//                           type="text"
//                           id="age"
//                           name="age"
//                           value={userInfo.age}
//                           onChange={handleInputChange}
//                           placeholder="Enter your age"
//                         />
//                       </FormGroup>
//                       <FormGroup className="mb-2">
//                         <Label for="phone">
//                           <strong>Phone:</strong>{" "}
//                         </Label>
//                         <Input
//                           type="text"
//                           id="phone"
//                           name="PhoneNumber"
//                           //  value={localstore.PhoneNumber}
//                           value={userInfo.PhoneNumber}
//                           onChange={handleInputChange}
//                           placeholder="Enter your phone number"
//                         />
//                       </FormGroup>
//                       <FormGroup className="mb-2">
//                         <Label for="alt_phone">
//                           <strong>Alternate Phone:</strong>{" "}
//                         </Label>
//                         <Input
//                           type="text"
//                           id="alt_phone"
//                           name="alt_phone"
//                           value={userInfo.alt_phone}
//                           onChange={handleInputChange}
//                           placeholder="Enter your alternate phone number"
//                         />
//                       </FormGroup>
//                       <FormGroup className="mb-2">
//                         <Label for="email">
//                           <strong>Email:</strong>{" "}
//                         </Label>
//                         <Input
//                           type="email"
//                           id="email"
//                           name="email"
//                           value={userInfo.email}
//                           onChange={handleInputChange}
//                           placeholder="Enter your email"
//                         />
//                       </FormGroup>
//                       <div className="d-flex justify-content-end">
//                         <button
//                           className="contact__btn me-2"
//                           onClick={handleSave}>
//                           Update Changes
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="large-text px-4">
//                       <p>
//                         <strong>Name:</strong> {userInfo.Name}
//                         {/*<strong>Name:</strong> {localstore.Name}  */}
//                       </p>
//                       <p>
//                         <strong>Age:</strong> {userInfo.age}
//                       </p>
//                       <p>
//                         {/*    <strong>Phone:</strong> {localstore.PhoneNumber} */}
//                         <strong>Phone:</strong> {userInfo.PhoneNumber}
//                       </p>
//                       <p>
//                         <strong>Alternate Phone:</strong> {userInfo.alt_phone}
//                       </p>
//                       <p>
//                         <strong>Email:</strong> {userInfo.email}
//                       </p>
//                     </div>
//                   )}
//                 </CardBody>
//               </Card>
//             </Col>

//             {/* <Col lg="6" md="6">
//               <Card>
//                 <CardBody>
//                   <h4 className="fw-bold">Enquiry Information</h4>
//                   <p className="section__description mb-0">
//                     If you have any questions or need further assistance, please
//                     contact us.
//                   </p>
//                 </CardBody>
//               </Card>
//             </Col> */}
//           </Row>
//         </Container>
//         <ProfileOption />
//       </section>
//       <ToastContainer />
//     </Helmet>
//   );
// };

// export default UserProfile;

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
import Document from "./Document";
import ProfileOption from "./ProfileOption";

const UserProfile = () => {
  const customerId = localStorage.getItem("id") || "{}";
  console.log(customerId);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    password: "",
    emailID: "",
    alternativeMobileNO: "",
    signStatus: "active",
    age: "",
  });
  const [originalUserInfo, setOriginalUserInfo] = useState(userInfo);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const jsonObj = { id: customerId };
        //toast.info("Fetching profile data...");
        const response = await fetch(
          "http://localhost:2024/RentARide/getCustomerProfileDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonObj),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const profileData = {
            id: data.data.id || "",
            name: data.data.name || "",
            phoneNumber: data.data.phoneNumber || "",
            password: data.data.password || "",
            emailID: data.data.emailID || "",
            alternativeMobileNO: data.data.alternativeMobileNO || "",
            age: data.data.age || "",
            signStatus: "active",
          };

          setUserInfo(profileData);
          setOriginalUserInfo(profileData);
          //toast.success("Profile data loaded successfully!");
        } else {
          //toast.error(`Failed to fetch profile data. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        //toast.error(`An error occurred: ${error.message}`);
      }
    };

    if (customerId) {
      fetchProfileData();
    }
  }, [customerId]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setOriginalUserInfo(userInfo);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:2024/RentARide/updateCustomerRegistrationDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        autoClose: 2000,
        className: "custom-toast",
      });
      console.log("Profile update successful:", await response.json());
    } catch (error) {
      toast.error("Failed to update profile. Please try again.", {
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
    const jsonObj = { id: customerId };
    const response = await axios.post(
      "http://localhost:2024/RentARide/getCustomerRegistrationDetailsSignOut",
      jsonObj
    );

    if (response.data.status == "false") {
      toast.error("Failed sign out", {
        autoClose: 2000,
        className: "custom-toast",
      });
    } else if (response.data.status == "true") {
      toast.success("Sign out successfully", {
        autoClose: 2000,
        className: "custom-toast",
      });
      setTimeout(() => {
        navigate("/sign-in");
      }, 1000);
    }
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
            <Col lg="12" md="12">
              <Card className="shadow">
                <CardBody>
                  <h4 className="fw-bold mb-4 ">
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
                          name="phoneNumber"
                          value={userInfo.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2">
                        <Label for="alt_phone">
                          <strong> Alternate Phone:</strong>{" "}
                        </Label>
                        <Input
                          type="text"
                          id="alt_phone"
                          name="alternativeMobileNO"
                          value={userInfo.alternativeMobileNO}
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
                          name="emailID"
                          value={userInfo.emailID}
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
                    <div className="large-text px-4 ">
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
                        {userInfo.alternativeMobileNO}
                      </p>
                      <p>
                        <strong>Email:</strong> {userInfo.emailID}
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
