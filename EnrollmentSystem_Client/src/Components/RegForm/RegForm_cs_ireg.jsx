import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

function RegForm_cs_ireg() {
  const location = useLocation();
  const { yearLevel, department } = location.state;
  const studentType = "Irreg"; // Since this is RegForm-cs-reg
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileSizeInKB = file.size / 1024;
      if (fileSizeInKB > 200) {
        setErrorMessage(
          "File size exceeds 200 KB. Please upload a smaller image."
        );
        e.target.value = "";
        return;
      }

      setErrorMessage("");

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviewClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = () => {
    let route = `/regformpt2-${department}-${studentType}`;
    navigate(route, { state: { yearLevel, department } });
  };

  return (
    <div className="containers" style={{ marginTop: "150px" }}>
      <div className="header">
        <Link to="/">
          <img
            src="./images/cvsu-logo.png"
            alt="University Logo"
            className="logo"
          />
        </Link>
        <p>
          CAVITE STATE UNIVERSITY <br /> BACOOR CAMPUS
        </p>
      </div>
      <div className="d-flex justify-content-center mt-4 pb-5">
        <div
          className="card shadow rounded position-relative overflow-hidden"
          style={{ maxWidth: "1200px", width: "100%" }}
        >
          {/* Blurred Background Image Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url(./images/cs.png)",
              backgroundSize: "50%", // Adjust the percentage as desired
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(5px)",
              zIndex: 2,
            }}
          ></div>

          {/* Optional semi-transparent overlay for better readability */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1,
            }}
          ></div>

          <div className="card-body position-relative " style={{ zIndex: 2 }}>
            {/* Title */}
            <div className="row mb-4">
              <div className="col-12 text-center">
                <h4 className="fw-bold">IRREGULAR FORM</h4>
              </div>
            </div>

            {/* First Row: Name Fields + Image Upload */}
            <div className="row mb-3 align-items-end">
              {/* Image upload on the left */}
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
                <small className="text-muted text-center mt-2">
                  Photo (200 KB max.)
                </small>
                {errorMessage && (
                  <div className="text-danger text-center mt-2">
                    {errorMessage}
                  </div>
                )}
              </div>

              {/* Name fields */}
              <div className="col-md-9">
                <div className="row g-2">
                  <div className="col-md-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Middle Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Suffix</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row: Date of Birth, Place of Birth, Age, Status */}
            <div className="row mb-3 g-2">
              <div className="col-md-3">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Place of Birth</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-2">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Status</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            {/* Third Row: Mobile, Email, Religion, Citizenship, Others */}
            <div className="row mb-3 g-2">
              <div className="col-md-2">
                <label className="form-label">Mobile</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-md-2">
                <label className="form-label">Religion</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-2">
                <label className="form-label">Citizenship</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Others (e.g., Nationality)</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            {/* Home Address Section */}
            <div className="row mb-3">
              <div className="col-12">
                <hr />
                <label className="form-label fw-bold">Home Address:</label>
              </div>
            </div>

            <div className="row mb-3 g-2">
              <div className="col-12">
                <label className="form-label">
                  House Number / Street / Barangay
                </label>
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="row mb-3 g-2">
              <div className="col-md-3">
                <label className="form-label">Region</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Province</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Municipality</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Zipcode</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            {/* Guardian Name */}
            <div className="row mb-3">
              <div className="col-12">
                <hr />
                <label className="form-label fw-bold">Guardian Name:</label>
              </div>
            </div>

            <div className="row mb-3 g-2">
              <div className="col-md-3">
                <label className="form-label">Family Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Middle Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Relation</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            {/* Next Page button */}
            <div className="row mb-5">
              <div className="col-12 d-flex justify-content-end">
                <button onClick={handleSubmit} className="btn btn-success">
                  Next Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegForm_cs_ireg;
