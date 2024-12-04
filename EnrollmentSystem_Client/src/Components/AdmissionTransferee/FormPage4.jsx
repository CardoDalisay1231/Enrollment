import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FormPage4() {
  const [isOpen, setIsOpen] = useState(false); // For mobile sidenav toggle
  // Handle the sidenav toggle (for mobile view)
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  const [imagePreviews, setImagePreviews] = useState({});

  // Handle image change for preview
  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [key]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle deleting an image
  const handleDeleteImage = (key) => {
    setImagePreviews((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  // Render Upload Box
  const renderUploadBox = (key, label) => (
    <label
      className="upload-box border position-relative"
      style={{
        width: "150px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
        cursor: "pointer",
        border: "2px dashed #6c757d",
      }}
    >
      {imagePreviews[key] ? (
        <>
          <img
            src={imagePreviews[key]}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm position-absolute"
            style={{ top: "5px", right: "5px" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from triggering file input
              handleDeleteImage(key);
            }}
          >
            X
          </button>
        </>
      ) : (
        <span className="text-muted text-center">{label}</span>
      )}
      <input
        type="file"
        className="form-control d-none"
        accept="image/*"
        onChange={(e) => handleImageChange(e, key)}
      />
    </label>
  );

  return (
    <div className="containers">
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
      <div className="container my-5 form">
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
                backgroundColor: "#198754", // Grey line color
                margin: "0 10px", // Adds space between badges and line
              }}
            ></div>
            <div className="badge bg-success text-white p-3">
              Family Background
            </div>
            <div
              style={{
                flex: 1,
                height: "2px",
                backgroundColor: "#198754", // Grey line color
                margin: "0 10px", // Adds space between badges and line
              }}
            ></div>
            <div className="badge bg-success text-white p-3">Requirements</div>
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
                className="badge bg-success text-white p-3 text-decoration-none"
              >
                Family Background
              </Link>
            </div>
            <div className="progress-bar-line"></div>

            <div className="sidenav-item">
              <Link
                to="/transform4"
                className="badge bg-success text-white p-3 text-decoration-none"
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

        {/* Main Form */}
        <div
          className="card shadow p-4"
          style={{
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 className="mb-4">
            <i className="bi bi-paperclip"></i> Requirements
          </h1>
          <hr />

          {/* Grade 11 Report Card */}
          <section className="mb-4">
            <h5>CERTIFICATE OF RATING WITH COLLEGE ELGIBILITY REMARK</h5>
            <div className="row g-3">
              <div className="col-md-6 text-center">
                {renderUploadBox("Eligibility_remark", "Attach File/Image Here")}
              </div>
            </div>
          </section>
          <hr />

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <Link to="/transform2">
              <button type="submit" className="btn btn-success mt-4">
                Back Page
              </button>
            </Link>
            <Link to="/transform5">
              <button type="submit" className="btn btn-success mt-4">
                Next Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
