import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";

export default function FormPage5() {
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
              Requirements
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
                className="badge bg-success text-white p-3 text-decoration-none"
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
            <i className="bi bi-calendar2-week"></i> Schedule Appointment
          </h1>
          <hr />

          {/* Preferred Date */}
          <div className="mb-4">
            <label htmlFor="preferredDate" className="form-label">
              Preferred Date:
            </label>
            <input
              type="date"
              id="preferredDate"
              className="form-control"
              style={{
                width: "300px",
              }}
            />
          </div>

          {/* Preferred Time */}
          <div className="mb-4">
            <label htmlFor="preferredTime" className="form-label">
              Preferred Time:
            </label>
            <input
              type="time"
              id="preferredTime"
              className="form-control"
              style={{
                width: "300px",
              }}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <Link to="/transform4">
              <button className="btn btn-success">Back Page</button>
            </Link>
            <button type="submit" className="btn btn-success">Submit Application</button>
          </div>
        </div>
      </div>
    </div>
  );
}
