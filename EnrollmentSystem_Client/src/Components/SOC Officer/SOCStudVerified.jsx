import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SOCStudVerified() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [students, setStudents] = useState([
    // Static data for demonstration
    { id: 1, name: "Joshua M. Vergara", studentId: "201211867", courseYear: "BS Computer Science 1st year" },
    { id: 2, name: "Kurt Macaranas", studentId: "202211867", courseYear: "BS Computer Science 1st year" },
    { id: 3, name: "Lester James Ciano", studentId: "202211567", courseYear: "BS Computer Science 1st year" },
    { id: 4, name: "Jm Bagares", studentId: "202214867", courseYear: "BS Computer Science 1st year" },
    { id: 5, name: "Kenneth Moreno", studentId: "202218867", courseYear: "BS Computer Science 1st year" },
  ]);
  const [filteredStudents, setFilteredStudents] = useState(students);

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

  // Filter students based on search query
  useEffect(() => {
    setFilteredStudents(
      students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, students]);

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
        <section className="verified-students-list">
          <div className="container">
            <h2 className="text-center my-3">List of Verified Student</h2>

            {/* Search Bar */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <input
                type="text"
                className="form-control w-50"
                placeholder="Search by Student Name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Course and Year</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.studentId}</td>
                      <td>{student.courseYear}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
