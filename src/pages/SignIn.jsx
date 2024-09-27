import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios for API requests

const SignIn = () => {
  // Access the backend URL from the environment variable
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  console.log(BASE_URL);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    id: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { phoneNumber, password } = user;

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

    // Password validation (must be exactly 4 digits)
    const passwordRegex = /^[0-9]{4}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be exactly 4 digits.", {
        autoClose: 3000,
        position: "top-right",
        className: "custom-toast-error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loading message
    setError(""); // Reset error message

    // Validate the form before making the API call
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/customerSignIn`, user);
      setLoading(false); // Hide loading message
      if (response.data.status === "false") {
        toast.error("Invalid Argument.");
        navigate("/sign-in"); // Redirect back to sign-in page on error
      } else {
        setTimeout(() => {
          toast.success("Phone Number & Password Correct.");
          navigate("/home", { state: { user: response.data.id } });
          localStorage.setItem("id", response.data.id); // Store user data
        }, 1000);
      }
    } catch (error) {
      setLoading(false); // Hide loading message
      setError("Invalid phone number or password. Please try again.");
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
                <h2>Welcome Back</h2>
                <h6>Not registered yet?</h6>
                &nbsp; <Link to="/sign-up">Sign up</Link>
              </div>
              <div className="actual-form">
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
                  />
                  <label className="label" htmlFor="input">
                    Phone Number
                  </label>
                </div>
                <div className="input-wrap">
                  <input
                    type="password"
                    name="password"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    required
                    placeholder=" "
                    value={user.password}
                    onChange={handleInputChange}
                  />
                  <label className="label" htmlFor="input">
                    Password
                  </label>
                </div>

                <input type="submit" value="Sign In" className="sign-btn" />
                {loading && (
                  <div className="loading">Signing in, please wait...</div>
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
        <div className="car-rental-info">
          <h3 className="mb-4">Car Rental Specials(Replace by Lionea) </h3>

          <p className="mt-4">Check out our latest deals on car rentals!</p>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default SignIn;
