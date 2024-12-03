import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegistrarStudent() {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
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
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Make the request with the token in the Authorization header
      const response = await axios.get("http://localhost:3000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(response.data.data); // Update the state with fetched students
      setError(null);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.response?.data?.message || "Failed to fetch students");
    }
  };

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="header">
        <img
          src="/images/cvsu-logo.png"
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
        <nav className="nav flex-column active">
          <Link to="/dashboard" className="nav-link">
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/dashboard/students" className="nav-link">
            <i className="fas fa-user-graduate"></i> Student
          </Link>
          <Link to="/dashboard/masterlist" className="nav-link">
            <i className="fas fa-list-alt"></i> Masterlist
          </Link>
        </nav>
      </aside>

      {/* Sidebar Toggler */}
      <button className="sidebar-toggler" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <main className="main-content">
        {/* Error Message */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {/* Student List */}
        <section className="row mt-4">
          <div className="card mt-4">
            <div className="card-header text-black">
              <h5>STUDENTS</h5>
            </div>
            <div className="card-body">
              {students.length > 0 ? (
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Student Type</th>
                      <th>Course</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.first_name}</td>
                        <td>{student.last_name}</td>
                        <td>{student.student_type}</td>
                        <td>{student.program_id}</td>
                        <td>
                          <button className="btn btn-primary btn-sm me-2">
                            View
                          </button>
                          <button className="btn btn-danger btn-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">No students available.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
