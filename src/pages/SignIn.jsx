import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios for API requests
import "./signin.css";
import signin from "../assets/all-images/cars-img/signin.jpg";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const SignIn = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOtpField, setShowOtpField] = useState(false); // State to toggle OTP field visibility
  const [user, setUser] = useState({
    phoneNumber: "",
    otp: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    }, // Store OTP digits separately
  });

  const navigate = useNavigate();

  // Define refs for each OTP input field
  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Differentiate phone number from OTP input
    if (name === "phoneNumber") {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else if (name.startsWith("otp")) {
      // Ensure only one digit can be entered in each OTP field
      if (value.length > 1) return;

      // Update the OTP fields separately
      setUser((prevUser) => ({
        ...prevUser,
        otp: {
          ...prevUser.otp,
          [name]: value,
        },
      }));

      // Automatically move to the next input
      switch (name) {
        case "otp1":
          if (value) otp2Ref.current.focus();
          break;
        case "otp2":
          if (value) otp3Ref.current.focus();
          else otp1Ref.current.focus();
          break;
        case "otp3":
          if (value) otp4Ref.current.focus();
          else otp2Ref.current.focus();
          break;
        case "otp4":
          if (!value) otp3Ref.current.focus();
          break;
        default:
          break;
      }
    }
  };

  const validatePhoneNumber = () => {
    const { phoneNumber } = user;
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits.", {
        autoClose: 3000,
        position: "top-right",
        className: "custom-toast-error",
      });
      return false;
    }
    return true;
  };

  const validateOtp = () => {
    const otp = `${user.otp.otp1}${user.otp.otp2}${user.otp.otp3}${user.otp.otp4}`;
    if (otp.length !== 4) {
      toast.error("Please enter all 4 digits of the OTP.", {
        autoClose: 3000,
        position: "top-right",
        className: "custom-toast-error",
      });
      return false;
    }
    return true;
  };

  const handlePhoneNumberSubmit = async (event) => {
    event.preventDefault();
    if (!validatePhoneNumber()) return;

    setLoading(true);
    try {
      // Send phone number to backend
      const response = await axios.post(`${BASE_URL}/customerSignIn`, {
        phoneNumber: user.phoneNumber,
      });
      setLoading(false);

      if (response.data.status === "true") {
        toast.success("OTP sent to your phone number.");
        setShowOtpField(true); // Show the OTP input field
      } else {
        if (response.data.hasOwnProperty("errorMessage")) {
          toast.error(response.data.errorMessage);
        } else {
          toast.error("Failed to send OTP. Try again.");
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    if (!validateOtp()) return;

    const otp = `${user.otp.otp1}${user.otp.otp2}${user.otp.otp3}${user.otp.otp4}`; // Combine OTP digits

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/customerSignInOtpVerification`,
        {
          phoneNumber: user.phoneNumber,
          otp, // Send the combined OTP string
        }
      );
      setLoading(false);

      if (response.data.status === "true") {
        toast.success("OTP verified successfully.");
        navigate("/home", { state: { user: response.data.id } });
        localStorage.setItem("id", response.data.id); // Store user data
      } else {
        toast.error("Invalid OTP. Please try again.");
        setShowOtpField(false); // Hide OTP field and reset state
        setUser({
          ...user,
          otp: { otp1: "", otp2: "", otp3: "", otp4: "" },
        }); // Reset OTP field
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  return (
    <main className="">
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form
              autoComplete="off"
              className="sign-in-form froms"
              onSubmit={
                showOtpField ? handleOtpSubmit : handlePhoneNumberSubmit
              }>
              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registered yet?</h6>
                &nbsp; <Link to="/sign-up">Sign up</Link>
              </div>
              <div className="actual-form">
                {/* Phone Number Input */}
                <div className="input-wrap">
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="input-field"
                    autoComplete="off"
                    required
                    placeholder=" "
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                    disabled={showOtpField} // Disable phone number input after submission
                  />
                  <label className="label" htmlFor="input">
                    Phone Number
                  </label>
                </div>

                {/* OTP Input - Shown only if the OTP field is enabled */}
                {showOtpField && (
                  <div className="otp-wrap pb-3">
                    <label className="label-otp pe-4 pb" htmlFor="otp">
                      Enter OTP
                    </label>
                    <div className="otp-fields">
                      <input
                        ref={otp1Ref} // Add ref to each input field
                        type="text"
                        name="otp1"
                        className="otp-field"
                        maxLength="1" // Limit to 1 digit per field
                        autoComplete="off"
                        required
                        value={user.otp.otp1 || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        ref={otp2Ref}
                        type="text"
                        name="otp2"
                        className="otp-field"
                        maxLength="1"
                        autoComplete="off"
                        required
                        value={user.otp.otp2 || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        ref={otp3Ref}
                        type="text"
                        name="otp3"
                        className="otp-field"
                        maxLength="1"
                        autoComplete="off"
                        required
                        value={user.otp.otp3 || ""}
                        onChange={handleInputChange}
                      />
                      <input
                        ref={otp4Ref}
                        type="text"
                        name="otp4"
                        className="otp-field"
                        maxLength="1"
                        autoComplete="off"
                        required
                        value={user.otp.otp4 || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                <input
                  type="submit"
                  value={showOtpField ? "Verify OTP" : "Send OTP"}
                  className="sign-btn"
                />
                {loading && (
                  <div className="loading">Processing, please wait...</div>
                )}
                {error && <div className="error">{error}</div>}

                <p className="text mt-3">
                  Forgotten your password or your login details?&nbsp;
                  <Link to="#">Get help</Link> &nbsp; signing in
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="car-rental-info ">
          <img
            className="w-100"
            src={signin}
            alt="signin logo"
            data-aos="fade-left"
          />
          <p className="mt-4 ps-5 ms-5">
            Check out our latest deals on car rentals!
          </p>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default SignIn;
