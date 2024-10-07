import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import "./Document.css";
import { message } from "antd";
import { decrypt } from "../components/utils/cryptoUtils";

const ChangePassword = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");

  const [error, setError] = useState("");

  // State to handle visibility of password fields
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch user ID from localStorage when component mounts
  useEffect(() => {
    const userId = decrypt(localStorage.getItem("id"));
    setId(userId);
  }, []); // Empty array means this effect runs only once after the component mounts
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      message.error("New passwords do not match!");
      return;
    }

    try {
      // Prepare the data to be sent in the request
      const jsonObj = {
        id: id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      // Use fetch API instead of axios
      const response = await fetch(`${BASE_URL}/updateCustomerPassword`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Send as JSON
        },
        body: JSON.stringify(jsonObj), // Convert data to JSON string
      });

      // Parse the JSON response
      const data = await response.json();

      console.log(data["status"]);

      // Check if the request was successful
      if (data["status"] == "true") {
        message.success("Password changed successfully!");

        // Clear input fields after successful submission
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
      } else if (data["status"] == "false") {
        // If the response was not successful
        setError(data.message || "Failed to change password.");
        message.error(data.message || "Failed to change password.");
      }
    } catch (err) {
      // Handle any error during the fetch request
      console.error("Error changing password:", err);
      setError("Failed to change password. Please try again.");
      message.error("Failed to change password.");
    }
  };

  return (
    <Form onSubmit={handlePasswordChange} className="py-2">
      <FormGroup>
        <Label for="currentPassword">Current Password</Label>
        <div className="password-input-wrapper">
          <Input
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <i
            className={`ri-eye${
              showCurrentPassword ? "-off" : ""
            }-line eye-icon`}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          />
        </div>
      </FormGroup>
      <FormGroup>
        <Label for="newPassword">New Password</Label>
        <div className="password-input-wrapper">
          <Input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <i
            className={`ri-eye${showNewPassword ? "-off" : ""}-line eye-icon`}
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        </div>
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword">Confirm New Password</Label>
        <div className="password-input-wrapper">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <i
            className={`ri-eye${
              showConfirmPassword ? "-off" : ""
            }-line eye-icon`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
      </FormGroup>
      <div className="pb-3 d-flex justify-content-end text-end align-content-end">
        <Button color="warning" type="submit" className="btn-with-icon">
          <i className="ri-send-plane-fill"></i>Submit
        </Button>
      </div>
    </Form>
  );
};

export default ChangePassword;
