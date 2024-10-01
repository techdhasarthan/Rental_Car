import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/signup.css";
import LoadingSpinner from "./LoadingSpinner";
import signupLogo from "../assets/all-images/cars-img/signup.jpg";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const SignUp = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in milliseconds)
      once: false, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
    window.scrollTo(0, 0);
  }, []);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    password: "",
    emailId: "",
    alternativeMobileNo: "",
    signStatus: "active",
    age: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    const { phoneNumber, emailId, age, password, alternativeMobileNo } = user;

    // Phone number validation (must be exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits.", {
        autoClose: 3000,
        position: "top-right",
        className: "custom-toast-error",
      });
      return false;
    }

    // Alternative phone number validation (must be exactly 10 digits)
    if (!phoneRegex.test(alternativeMobileNo)) {
      toast.error("Alternative mobile number must be exactly 10 digits.", {
        autoClose: 3000,
        position: "top-right",
        className: "custom-toast-error",
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      toast.error("Invalid email address.", {
        autoClose: 3000,
        position: "top-right",
        className: "custom-toast-error",
      });
      return false;
    }

    // Age validation (must be between 15 and 80)
    if (age < 15 || age > 80) {
      toast.error("Age must be between 15 and 80.", {
        autoClose: 3000,
        position: "top-right",
        className: "custom-toast-error",
      });
      return false;
    }

    // Password validation (must be exactly 4 digits)
    // const passwordRegex = /^[0-9]{4}$/;
    // if (!passwordRegex.test(password)) {
    //   toast.error("Password must be exactly 4 digits.", {
    //     autoClose: 3000,
    //     position: "top-right",
    //     className: "custom-toast-error",
    //   });
    //   return false;
    // }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/updateCustomerRegistrationDetails`,
        user
      );

      if (response.data.status === "true") {
        localStorage.setItem("userid", response.data.data.ID);
        toast.success("Registered Successfully.", {
          autoClose: 3000,
          position: "top-right",
          className: "custom-toast-success",
        });
        setLoading(false);
        navigate("/sign-in");
      } else if (response.data.status === "false") {
        toast.error("Already Existed.", {
          autoClose: 3000,
          position: "top-right",
          className: "custom-toast-error",
        });
      }
    } catch (error) {
      console.error("Sign-up failed:", error.response || error.message);
      setError("Sign-up failed. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".input-field");
    inputs.forEach((input) => {
      const label = input.nextElementSibling;
      if (input.value.trim() !== "") {
        label.classList.add("active");
      }
    });
  }, []);

  return (
    <main className="">
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form
              autoComplete="off"
              className="sign-in-form froms"
              onSubmit={handleSubmit}>
              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <Link to="/sign-in">Sign in</Link>
              </div>
              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    className="input-field"
                    id="Name"
                    name="name"
                    required
                    placeholder=" "
                    value={user.name}
                    onChange={handleInputChange}
                  />
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                </div>
                <div className="input-wrap">
                  <input
                    type="tel"
                    className="input-field"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    placeholder=" "
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <label className="label" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                </div>
                <div className="input-wrap">
                  <input
                    type="email"
                    className="input-field"
                    id="emailId"
                    name="emailId"
                    required
                    placeholder=" "
                    value={user.emailId}
                    onChange={handleInputChange}
                  />
                  <label className="label" htmlFor="emailId">
                    Email ID
                  </label>
                </div>
                <div className="input-wrap">
                  <input
                    type="tel"
                    className="input-field"
                    id="alternativeMobileNo"
                    name="alternativeMobileNo"
                    required
                    placeholder=" "
                    value={user.alternativeMobileNo}
                    onChange={handleInputChange}
                  />
                  <label className="label" htmlFor="alternativeMobileNo">
                    Alternative Mobile No
                  </label>
                </div>
                <div className="input-wrap">
                  <input
                    type="number"
                    className="input-field"
                    id="age"
                    name="age"
                    required
                    placeholder=" "
                    value={user.age}
                    onChange={handleInputChange}
                  />
                  <label className="label" htmlFor="age">
                    Age
                  </label>
                </div>
                {/* <div className="input-wrap">
                  <input
                    type="password"
                    minLength="4"
                    className="input-field"
                    id="Password"
                    name="password"
                    required
                    placeholder=" "
                    value={user.password}
                    onChange={handleInputChange}
                  />
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                </div> */}
                <input type="submit" value="Sign Up" className="sign-btn" />
                {loading && <LoadingSpinner />}
                {error && <div className="error">{error}</div>}
                <p className="text">
                  By signing up, I agree to the{" "}
                  <Link to="#">Terms of Services</Link> and{" "}
                  <Link to="#">Privacy Policy</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="car-rental-info">
          <img
            className="w-100"
            src={signupLogo}
            alt="car logo"
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

export default SignUp;
