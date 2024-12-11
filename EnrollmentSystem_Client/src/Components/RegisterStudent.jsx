import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterStudent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="containers">
      {/* Header */}
      <div className="header">
        <Link to="/">
          <img
            src="./images/cvsu-logo.png"
            alt="University Logo"
            className="logo"
          />
        </Link>
        <p>
          CAVITE STATE UNIVERSITY <br />
          BACOOR CAMPUS
        </p>
      </div>

      {/* Registration Form */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", marginTop: "126px" }}
      >
        <div
          className="card shadow rounded"
          style={{
            padding: "30px",
            backgroundColor: "#fff",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <form>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input type="text" className="form-control" />
            </div>

            {/* Username/Email */}
            <div className="mb-3">
              <label className="form-label">Username or Email:</label>
              <input type="text" className="form-control" />
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label className="form-label">Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-3 position-relative">
              <label className="form-label">Confirm Password:</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i
                    className={`bi ${
                      showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {passwordError && (
                <small className="text-danger">{passwordError}</small>
              )}
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <select className="form-select">
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Course */}
            <div className="mb-3">
              <label className="form-label">Course:</label>
              <select className="form-select">
                <option value="" disabled selected>
                  Select a Course
                </option>
                <option value="comp_sci">
                  Bachelor of Science in Computer Science
                </option>
                <option value="info_tech">
                  Bachelor of Science in Information Technology
                </option>
              </select>
            </div>

            {/* Student No */}
            <div className="mb-3">
              <label className="form-label">Student No:</label>
              <input type="text" className="form-control" />
            </div>

            {/* Student Type */}
            <div className="mb-3">
              <label className="form-label">Student Type:</label>
              <select className="form-select">
                <option value="" disabled selected>
                  Select Student Type
                </option>
                <option value="regular">Regular</option>
                <option value="irregular">Irregular</option>
                <option value="transferee">Transferee</option>
              </select>
            </div>

            {/* Agree to Terms */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="agreeTerms"
              />
              <label className="form-check check" htmlFor="agreeTerms">
                I Agree to Terms and Conditions
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="btn btn-success btn-block w-100 mb-2"
              disabled={passwordError}
            >
              Register Here
            </button>

            {/* Success Message */}
            <div className="text-center">
              <small className="text-muted">
                Account Registration Successfully!{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
