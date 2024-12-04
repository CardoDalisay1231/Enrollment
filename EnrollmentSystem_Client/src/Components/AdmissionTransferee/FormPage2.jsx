import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function FormPage2() {
  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);
  const [siblings, setSiblings] = useState([{ fullName: "", age: "" }]);
  const [isOpen, setIsOpen] = useState(false); // For mobile sidenav toggle

  const handleAddSibling = () => {
    setSiblings([...siblings, { fullName: "", age: "" }]);
  };

  const handleRemoveSibling = (index) => {
    const updatedSiblings = siblings.filter((_, i) => i !== index);
    setSiblings(updatedSiblings);
  };

  const handleSiblingChange = (index, field, value) => {
    const updatedSiblings = [...siblings];
    updatedSiblings[index][field] = value;
    setSiblings(updatedSiblings);
  };

  // Handle the sidenav toggle (for mobile view)
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

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
                className="badge bg-success text-white p-3 text-decoration-none"
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
            <i className="bi bi-people-fill"></i> Family Background
          </h1>
          <hr className="divider" />
          {/* Line below progress bar */}
          {/* Parents Section */}
          <div className="row">
            <div className="col-md-6">
              <h5>Parent 1</h5>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Relationship:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Highest Education:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Occupation:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Employer:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Monthly Income:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number:</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            <div className="col-md-6">
              <h5>Parent 2</h5>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Relationship:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Highest Education:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Occupation:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Employer:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Monthly Income:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number:</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <hr className="divider" /> {/* Line below progress bar */}
          {/* Guardian and Siblings Section */}
          <div className="row">
            {/* Guardian Section */}
            <div className="col-md-6">
              <h4 className="mb-3">Guardian</h4>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Relationship:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Highest Education:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Occupation:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Employer:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Monthly Income:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number:</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            {/* Siblings Section */}
            <div className="col-md-6">
              <h4 className="mb-3">Siblings</h4>
              {siblings.map((sibling, index) => (
                <div className="d-flex align-items-center mb-3" key={index}>
                  <span className="me-2">{index + 1}</span>
                  <div className="me-2" style={{ flex: 1 }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={sibling.fullName}
                      onChange={(e) =>
                        handleSiblingChange(index, "fullName", e.target.value)
                      }
                    />
                  </div>
                  <div className="me-2" style={{ width: "100px" }}>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Age"
                      value={sibling.age}
                      onChange={(e) =>
                        handleSiblingChange(index, "age", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={handleAddSibling}
                  >
                    +
                  </button>
                  {siblings.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveSibling(index)}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Nav Button */}
          <div className="d-flex justify-content-between mt-4">
            <Link to="/transform1">
              <button className="btn btn-success mt-4">Back Page</button>
            </Link>
            <Link to="/transform4">
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
