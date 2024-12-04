import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WarningModal from "./WarningModal";

const FormPage1 = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const [isOpen, setIsOpen] = useState(false); // For mobile sidenav toggle

  // Handle image change for preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileSizeInKB = file.size / 1024; // Convert size to KB

      if (fileSizeInKB > 200) {
        setErrorMessage(
          "File size exceeds 200 KB. Please upload a smaller image."
        );
        e.target.value = ""; // Clear the file input to allow the user to select another file
        return;
      }

      setErrorMessage(""); // Reset error message if file size is valid

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handlePreviewClick = () => {
    document.getElementById("fileInput").click();
  };

  // Handle the sidenav toggle (for mobile view)
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="containers">
      <WarningModal />
      <div className="header">
        <img
          src="./images/cvsu-logo.png"
          alt="University Logo"
          className="logo"
        />
        <p>ADMISSION PORTAL</p>
      </div>
      {/* Sidenav Toggle Button (visible only on mobile) */}
      <button
        className="btn sidenav-toggle d-md-none mb-3"
        onClick={toggleSidenav}
      >
        <i className={`bi ${isOpen ? "bi-x" : "bi-list"}`}></i>{" "}
        {/* Icon changes based on open/close state */}
      </button>
      <div
        className="container my-5 form"
        style={{ backgroundColor: "transparent", background: "none" }}
      >
        {/* Desktop Progress Bar */}
        <div className="progress-bar-container d-none d-md-flex mb-4">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="badge bg-success text-white p-3">
              Personal Information
            </div>
            <div
              style={{
                flex: 1,
                height: "2px",
                backgroundColor: "#6c757d", // Grey line color
                margin: "0 10px", // Adds space between badges and line
              }}
            ></div>
            <div className="badge bg-secondary text-white p-3">
              Family Background
            </div>
            <div
              style={{
                flex: 1,
                height: "2px",
                backgroundColor: "#6c757d", // Grey line color
                margin: "0 10px", // Adds space between badges and line
              }}
            ></div>
            <div className="badge bg-secondary text-white p-3">
              Requirements
            </div>
            <div
              style={{
                flex: 1,
                height: "2px",
                backgroundColor: "#6c757d", // Grey line color
                margin: "0 10px", // Adds space between badges and line
              }}
            ></div>
            <div className="badge bg-secondary text-white p-3">
              Schedule Appointment
            </div>
          </div>
        </div>

        {/* Mobile Sidenav */}
        <div className={`sidenav ${isOpen ? "open" : ""}`}>
          <div className="d-flex flex-column align-items-start p-3">
            <div className="sidenav-item">
              <Link
                to="/transform1"
                className="badge bg-success text-white p-3 text-decoration-none"
              >
                Personal Information
              </Link>
            </div>
            <div className="progress-bar-line"></div>

            <div className="sidenav-item">
              <Link
                to="/transform2"
                className="badge bg-secondary text-white p-3 text-decoration-none"
              >
                Family Background
              </Link>
            </div>
            <div className="progress-bar-line"></div>

            <div className="sidenav-item">
              <Link
                to="/transform4"
                className="badge bg-secondary text-white p-3 text-decoration-none"
              >
                Requirements
              </Link>
            </div>
            <div className="progress-bar-line"></div>

            <div className="sidenav-item">
              <Link
                to="/transform5"
                className="badge bg-secondary text-white p-3 text-decoration-none"
              >
                Schedule Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="card shadow p-4"
          style={{
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form>
            <h1 className="mb-4">
              <i className="bi bi-person-fill"></i> Personal Information
            </h1>
            <div className="row mb-4">
              {/* Image Upload on the Left */}
              <div className="col-md-3 d-flex flex-column align-items-center">
                <div
                  className="border rounded mb-2"
                  onClick={handlePreviewClick}
                  style={{
                    width: "150px",
                    height: "150px",
                    cursor: "pointer",
                    backgroundColor: "#f8f9fa",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span className="text-muted text-center">
                      Click to upload
                      <br />
                      2x2
                    </span>
                  )}
                </div>
                <input
                  id="fileInput"
                  type="file"
                  className="form-control d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {/* Center the label */}
                <small className="text-muted text-center mt-2">
                  Photo (200 KB max.)
                </small>
                {/* Display error message if the file size is too large */}
                {errorMessage && (
                  <div className="text-danger text-center mt-2">
                    {errorMessage}
                  </div>
                )}
              </div>

              {/* Personal Information and Address on the Right */}
              <div className="col-md-9">
                {/* Personal Information */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Family Name:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">First Name:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Middle Name:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Suffix (Optional):</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth:</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact Number:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Religion:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Citizenship:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    {/* Gender */}
                    <label className="form-label">Gender at Birth:</label>
                    <select className="form-select" aria-label="Select gender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Age:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Civil Status:</label>
                    <select
                      className="form-select"
                      aria-label="Select civil status"
                    >
                      <option value="">Select Civil Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="widowed">Widowed</option>
                      <option value="divorced">Divorced</option>
                      <option value="separated">Separated</option>
                      <option value="annulled">Annulled</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>

                {/* Address Section */}
                <hr className="mt-4" />
                <h5>Permanent Address</h5>

                <div className="row g-3 mt-3">
                  <div className="col-md-4">
                    <label className="form-label">Unit Number:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Street Name:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Subdivision/Barangay:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">City:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Province:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Zip Code:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">District:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Municipality:</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Region:</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <hr className="mt-4" />
                <div className="row g-3 mt-3">
                  <h5>Other Information:</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input check"
                        type="checkbox"
                        defaultValue
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I have disability
                      </label>
                    </div>
                    <br/>
                    <div className="form-check">
                      <input
                        className="form-check-input check"
                        type="checkbox"
                        defaultValue
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I am part of an-indigneous group
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group d-flex justify-content-end">
              <Link to="/transform2">
                <button type="button" className="btn btn-success">
                  Next
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage1;
