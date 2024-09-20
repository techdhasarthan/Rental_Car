import React, { useState } from "react";

const DemoFileUpload = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to send file to the backend
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send file to the backend (replace with your API endpoint)
      const response = await fetch(`${BASE_URL}/uploadCustomerDocuments`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("File uploaded successfully!");
        console.log("successkdsjfkjskfjk");
      } else {
        setMessage("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div>
      <h3>Upload File</h3>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DemoFileUpload;
