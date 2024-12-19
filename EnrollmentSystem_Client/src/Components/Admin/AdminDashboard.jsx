import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
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
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
        });
  
        setStudents(response.data.data); // Update the state with fetched students
        setError(null);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError(err.response?.data?.message || "Failed to fetch students");
      }
    };
  
    // Use effect to fetch data on component mount
    useEffect(() => {
      fetchStudents();
    }, []);
  
    // Calculate the number of enrolled students dynamically
    const totalStudents = students.length;
    const enrolledStudents = students.length; // Assuming all students are enrolled; adjust logic as needed
    const courses = 2; // Static count for courses
  
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
      
        {/* Main Content */}
        <main className="main-content">
          {/* Error Message */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
      
          {/* Counters Section */}
          <section className="row g-4">
            <div className="col-md-4">
              <div className="card text-white bg-primary text-center">
                <div className="card-body">
                  <h1>{enrolledStudents}</h1>
                  <p>ENROLLED</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-info text-center">
                <div className="card-body">
                  <h1>{courses}</h1>
                  <p>COURSES</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-warning text-center">
                <div className="card-body">
                  <h1>{totalStudents}</h1>
                  <p>TOTAL STUDENTS</p>
                </div>
              </div>
            </div>
          </section>
      
          {/* Table Section */}
          <section className="row mt-4">
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
                      {students.length > 0 ? (
                        students.map((student) => (
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
                            No students available.
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