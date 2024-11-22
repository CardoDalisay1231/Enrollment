import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

function RegForm_cs_ireg() {
  const location = useLocation();
  const { yearLevel, department } = location.state;
  const studentType = "Irreg"; // Since this is RegForm-cs-reg
  const navigate = useNavigate();

  const handleSubmit = () => {
    let route = `/regformpt2-${department}-${studentType}`;
    navigate(route, { state: { yearLevel, department } });
  };

  return (
    <div className="containers">
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
      <div className="regform cs-form">
        <h2>IRREGULAR FORM</h2>

        <section className="form-section">
          <div className="image-upload-container">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
            />
          </div>
        </section>
        <section className="form-section">
          <label>Name:</label>
          <div className="form-row">
            <input type="text" placeholder="Family Name" />
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Middle Name" />
            <input type="text" placeholder="Suffix" />
          </div>
        </section>

        <section className="form-section">
          <div className="form-row">
            <input type="date" placeholder="Date of Birth" />
            <input type="text" placeholder="Place of Birth" />
            <input type="number" placeholder="Age" />
            <input type="text" placeholder="Status" />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Mobile" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Religion" />
            <input type="text" placeholder="Citizenship" />
          </div>
        </section>

        <section className="form-section">
          <label>Home Address:</label>
          <input type="text" placeholder="House Number / Street / Barangay" />
          <div className="form-row">
            <input type="text" placeholder="Region" />
            <input type="text" placeholder="Province" />
            <input type="text" placeholder="Municipality" />
            <input type="text" placeholder="Zipcode" />
          </div>
        </section>

        <section className="form-section">
          <label>Guardian Name:</label>
          <div className="form-row">
            <input type="text" placeholder="Family Name" />
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Middle Name" />
            <input type="text" placeholder="Relation" />
          </div>
        </section>

        <div className="button-container">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegForm_cs_ireg;
