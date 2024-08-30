import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests

const SignIn = () => {
  const backendUrl = process.env.Backend_URL;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loading message
    setError(""); // Reset error message

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        user
      );
      setLoading(false); // Hide loading message

      // If successful, redirect to the home page
      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data)); // Store user data in local storage
        navigate("/user-account", { state: { user: response.data } }); // Pass user data to the user profile page
        alert(localStorage.getItem("userData"));
      }
    } catch (error) {
      setLoading(false); // Hide loading message
      setError("Invalid phone number or password. Please try again.");
    }
  };

  useEffect(() => {
    // Get all input fields with labels
    const inputs = document.querySelectorAll(".input-field");

    // Iterate over each input field
    inputs.forEach((input) => {
      const label = input.nextElementSibling; // Get the associated label
      // Check if input already has a value
      if (input.value.trim() !== "") {
        label.classList.add("active"); // Add 'active' class to label
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
                  <div className="loading ">Signing in, please wait...</div>
                )}
                {error && <div className="error">{error}</div>}

                <p className="text  mt-3">
                  Forgotten your password or your login details?&nbsp;
                  <Link to="#">Get help</Link> &nbsp; signing in
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="car-rental-info ">
          <h3 className="mb-4">Car Rental Specials(Replace by Lionea) </h3>

          <p className="mt-4">Check out our latest deals on car rentals!</p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
