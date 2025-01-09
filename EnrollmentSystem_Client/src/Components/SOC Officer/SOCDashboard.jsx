import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SOCDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;

      // Toggle the no-scroll class on the body
      if (newIsOpen) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }

      return newIsOpen;
    });
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
          <i className="fas fa-user-shield"></i> SOC OFFICER
        </div>
        <nav className="nav flex-column">
          <Link to="/SOC" className="nav-link">
            <i className="fas fa-user"></i> Students
          </Link>
          <Link to="/SOC/verstud" className="nav-link">
            <i className="fas fa-user-check"></i> Verified Student
          </Link>
        </nav>
      </aside>

      {/* Sidebar Toggler */}
      <button className="sidebar-toggler" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Main Content */}
      <main className="main-content">
        {/* Table Section */}
        <section className="students-list">
          <div className="container">
            <h2 className="text-center my-3">Students List</h2>
            {/* Aligning Student Type Label and Dropdown */}
            <div className="d-flex align-items-center mb-3 gap-2">
              <label htmlFor="student-type" className="form-label mb-0">
                Student Type:
              </label>
              <select id="student-type" className="form-select w-auto">
                <option value="old">Old Student</option>
                <option value="new">New Student</option>
              </select>
            </div>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Student Type</th>
                  <th>View</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Static data for demonstration */}
                <tr>
                  <td>1</td>
                  <td>James Allen</td>
                  <td>Datuin</td>
                  <td>Freshmen-Regular</td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <input
                        type="checkbox"
                        className="form-check-input mx-2"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Christian</td>
                  <td>Rodriguez</td>
                  <td>Freshmen-Irregular</td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <input
                        type="checkbox"
                        className="form-check-input mx-2"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Marie</td>
                  <td>Bothaw</td>
                  <td>Freshmen-Regular</td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <input
                        type="checkbox"
                        className="form-check-input mx-2"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-success">Verify</button>
              <button className="btn btn-danger">Reject</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
