import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminEnrollees() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;

      if (newIsOpen) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }

      return newIsOpen;
    });
  };

  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    applicantType: "",
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/students", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStudents(response.data.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = () => {
    console.log("Add button clicked");
  };

  const handleNew = () => {
    console.log("New button clicked");
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <img
          src="./images/cvsu-logo.png"
          alt="University Logo"
          className="logo"
        />
        <p>
          CAVITE STATE UNIVERSITY <br /> BACOOR CAMPUS
        </p>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "show" : ""}`}>
        <div className="sidebar-header">
          <i className="fas fa-user-shield"></i> ADMIN
        </div>
        <nav className="nav flex-column">
          <Link to="/admin" className="nav-link">
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/admin/students" className="nav-link">
            <i className="fas fa-user-graduate"></i> Applicants
          </Link>
          <Link to="/admin/enrollees" className="nav-link">
            <i className="fas fa-list-alt"></i> Enrollees
          </Link>
          <Link to="/admin/responses" className="nav-link">
            <i className="fas fa-inbox"></i> Responses
          </Link>
        </nav>
      </aside>

      {/* Sidebar Toggler */}
      <button className="sidebar-toggler" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      <main className="main-content">
        <section className="container my-4">
          <h2 className="mb-4">Applicants Registration Form</h2>
          <div className="form-layout">
            {/* First Row: First Name and Last Name */}
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  value={filters.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  value={filters.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Second Row: Middle Name and Applicant Type */}
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Middle Name"
                  name="middleName"
                  value={filters.middleName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Applicant Type"
                  name="applicantType"
                  value={filters.applicantType}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="d-flex gap-2 mb-4">
              <button className="btn btn-success" onClick={handleAdd}>
                Add
              </button>
              <button className="btn btn-secondary" onClick={handleNew}>
                New
              </button>
            </div>

            {/* New Card Section */}
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="fullName"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email To"
                      name="emailTo"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Registration Form Link"
                      name="registrationFormLink"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Please Note!
Make sure all fields are filled out completely before submitting the form. 
Ensure the email address is accurate to receive confirmation. 
Attach the correct information you applied for registration form link.  
After submission, you will receive a confirmation email with further instructions."
                    rows="5"
                    name="additionalInfo"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-end">
                <button className="btn btn-success">Send</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
