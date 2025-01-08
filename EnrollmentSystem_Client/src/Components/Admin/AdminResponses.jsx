import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminResponses() {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

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

  // Fetch students function
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data.data);
      setFilteredStudents(response.data.data); // Initialize filtered list
      setError(null);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.response?.data?.message || "Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = students.filter((student) =>
      `${student.first_name} ${student.last_name}`.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <img src="./images/cvsu-logo.png" alt="University Logo" className="logo" />
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

      {/* Main Content */}
      <main className="main-content">
      <h2 className="mb-4">Responses of Applicants Registration Forms</h2>
        {/* Error Message */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Search students by name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Table Section */}
        <section className="row">
            
          <div className="col-12">
            <div className="card">
              <div className="card-body p-0">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Student Type</th>
                      <th>Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.id}</td>
                          <td>{student.first_name}</td>
                          <td>{student.last_name}</td>
                          <td>{student.student_type}</td>
                          <td>{student.program_id}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No students found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
