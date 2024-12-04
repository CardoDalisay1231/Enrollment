import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function FormPage3() {
  const [isOpen, setIsOpen] = useState(false); // For mobile sidenav toggle
  // Handle the sidenav toggle (for mobile view)
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  
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
            <div className="badge bg-success text-white p-3">
              Educational Attainment
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
              <Link to="/formcurnt1" className="badge bg-success text-white p-3 text-decoration-none">

                Personal Information
              </Link>
            </div>
            <div className="progress-bar-line"></div>

            <div className="sidenav-item">
              <Link to="/formcurnt2" className="badge bg-success text-white p-3 text-decoration-none">
                Family Background
              </Link>
            </div>
            <div className="progress-bar-line"></div>

            <div className="sidenav-item">
              <Link to="/formcurnt3" className="badge bg-success text-white p-3 text-decoration-none">
                Educational Attainment
              </Link>
            </div>
            <div className="progress-bar-line"></div>

            <div className="sidenav-item">
              <Link to="/formcurnt4" className="badge bg-secondary text-white p-3 text-decoration-none">
                Requirements
              </Link>
            </div>
            <div className="progress-bar-line"></div>

            <div className="sidenav-item">
              <Link to="/formcurnt5" className="badge bg-secondary text-white p-3 text-decoration-none">
                Schedule Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Card Container */}
        <div
          className="card shadow p-4"
          style={{
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 className="mb-4">
            <i className="bi bi-mortarboard-fill  "></i> Educational Attainment
          </h1>
          <hr className="divider" /> 
          {/* Elementary Section */}
          <section className="mb-4">
            <h5 className="text-uppercase">Elementary</h5>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">School Last Attended:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">School Address:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Type of School:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Year Graduated:</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </section>
          <hr className="divider" /> 

          {/* Junior High School Section */}
          <section className="mb-4">
            <h5 className="text-uppercase">Junior High School</h5>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">School Last Attended:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">School Address:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Type of School:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Track:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Year Graduated:</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </section>
          <hr className="divider" /> 

          {/* Senior High School Section */}
          <section className="mb-4">
            <h5 className="text-uppercase">Senior High School</h5>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">School Last Attended:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">School Address:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Type of School:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Course/Program:</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </section>

          {/* Nav Button */}
          <div className="d-flex justify-content-between mt-4">
            <Link to="/formcurnt2">
              <button type="submit" className="btn btn-success mt-4">
                Back Page
              </button>
            </Link>
            <Link to="/formcurnt4">
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
