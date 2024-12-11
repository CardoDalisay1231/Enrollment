import React from "react";
import { Link } from "react-router-dom";

export default function PreEnrollmentSubmitted() {
  return (
    <div className="containers" style={{ marginTop: "126px" }}>
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
          CAVITE STATE UNIVERSITY <br /> BACOOR CAMPUS
        </p>
      </div>

      {/* Main Content */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "calc(100vh - 150px)",
        }}
      >
        <div
          className="card shadow rounded text-center"
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            width: "400px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            {/* Success Icon */}
            <div className="mb-3">
              <i
                className="bi bi-check-circle"
                style={{ fontSize: "50px", color: "green" }}
              ></i>
            </div>
            {/* Main Text */}
            <h5>Pre-Enrollment form has been submitted!</h5>
            <p className="mt-2">
              Go To <Link to="/registerstud">Account registration</Link>.
            </p>
            <Link to="/register">
              <p style={{ color: "blue" }}>Go back</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
