import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/signup.css";

const SignUp = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    name: "",
    phoneNumber: "",
    password: "",
    emailID: "",
    alternativeMobileNO: "",
    signStatus: "active",
    age: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/updateCustomerRegistrationDetails`, // Ensure the correct URL
        user
      );
      console.log("Sign-up successful:", typeof response.data.status);

      if (response.data.status === "true") {
        toast.success("Registered Successfully.", {
          autoClose: 3000, // The toast will automatically close after 3 seconds
          position: "top-right", // The position of the toast
          className: "custom-toast-error", // Optional: You can add custom styling with this class
        });
        setLoading(false);
        navigate("/sign-in"); // Redirect to /home on successful sign-up
      } else if (response.data.status === "false") {
        console.log("Already Existed.");
        toast.error("Already Existed.", {
          autoClose: 3000, // The toast will automatically close after 3 seconds
          position: "top-right", // The position of the toast
          className: "custom-toast-error", // Optional: You can add custom styling with this class
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
                    id="name"
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
                    type="password"
                    minLength="4"
                    className="input-field"
                    id="password"
                    name="password"
                    required
                    placeholder=" "
                    value={user.password}
                    onChange={handleInputChange}
                  />
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                </div>
                <input type="submit" value="Sign Up" className="sign-btn" />
                {loading && (
                  <div className="loading">Signing up, please wait...</div>
                )}
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
        <div className="car-rental-info ">
          <h3 className="mb-4">Car Rental Specials</h3>
          <p className="mt-4">Check out our latest deals on car rentals!</p>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default SignUp;
