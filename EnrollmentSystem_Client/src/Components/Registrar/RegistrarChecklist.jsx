import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegistrarChecklist() {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [course, setCourse] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudentType, setSelectedStudentType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
          <i className="fas fa-user-shield"></i> REGISTRAR
        </div>
        <nav className="nav flex-column">
          <Link to="/dashboard" className="nav-link">
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/dashboard/students" className="nav-link">
            <i className="fas fa-user-graduate"></i> Student
          </Link>
          <Link to="/dashboard/masterlist" className="nav-link">
            <i className="fas fa-list-alt"></i> Masterlist
          </Link>
          <Link to="/dashboard/checklist" className="nav-link">
            <i className="fas fa-tasks"></i> Checklist
          </Link>
          <Link to="/dashboard/print" className="nav-link">
            <i className="fas fa-print"></i> Printing
          </Link>
        </nav>
      </aside>

      {/* Sidebar Toggler */}
      <button className="sidebar-toggler" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Main Content */}
      <main className="main-content">
        <section className="mb-4">
          <h1 className="mb-4">Checklist of the Students</h1>

          {/* Input Fields and Buttons */}
          <div className="d-flex mb-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control me-2"
              placeholder="Student No."
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
            />
            <input
              type="text"
              className="form-control me-2"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
            <button className="btn btn-success me-2">Search</button>
          </div>
        </section>

        <section className="mb-4">
          {/* Dropdowns */}
          <div className="d-flex gap-3">
            <select
              className="form-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Year
              </option>
              <option value="">1st-Year</option>
              <option value="">2nd-Year</option>
              <option value="">3rd-Year</option>
              <option value="">4th-Year</option>
            </select>

            <select
              className="form-select"
              value={selectedStudentType}
              onChange={(e) => setSelectedStudentType(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Section
              </option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
              <option value="">6</option>
              <option value="">7</option>
              <option value="">8</option>
              {/* Add more options as necessary */}
            </select>

            <select
              className="form-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Semester
              </option>
              <option value="">1st-Semester</option>
              <option value="">2nd-Semester</option>
              {/* Add more options as necessary */}
            </select>
          </div>
        </section>
      </main>
    </div>
  );
}
