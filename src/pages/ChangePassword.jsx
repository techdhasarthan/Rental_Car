import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import axios from "axios";
import "./Document.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setId] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // State to handle visibility of password fields
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch user ID from localStorage when component mounts
  useEffect(() => {
    const userId = localStorage.getItem("id");
    setId(userId);
  }, []); // Empty array means this effect runs only once after the component mounts

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    try {
      console.log("id  current pas  new" + id, currentPassword, newPassword);
      var jsonObj = JSON.parse("{}");
      jsonObj["id"] = id;
      jsonObj["currentPassword"] = currentPassword;
      jsonObj["newPassword"] = newPassword;

      const response = await axios.post("/api/change-password", jsonObj);

      setMessage(response.data);
      setError("");
    } catch (err) {
      setError(
        "Failed to change password. Please check your current password and try again."
      );
      setMessage("");
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
      <div className="pb-3 d-flex  justify-content-end text-end align-content-end">
        <Button color="warning" type="submit" className="btn-with-icon">
          <i className="ri-send-plane-fill"></i>Submit
        </Button>
      </div>

      {message && (
        <Alert color="success" className="mt-3">
          {message}
        </Alert>
      )}
      {error && (
        <Alert color="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </Form>
  );
};

export default ChangePassword;
