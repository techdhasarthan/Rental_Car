import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import axios from "axios";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/api/change-password", {
        currentPassword,
        newPassword,
      });

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
        <Input
          type="password"
          name="currentPassword"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="newPassword">New Password</Label>
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword">Confirm New Password</Label>
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </FormGroup>
      <div className="pb-3">
        <Button color="warning" type="submit">
          Change Password
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
