import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegistrarMasterlist() {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      student_type: "Undergraduate",
      program_id: "BSCS",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      student_type: "Graduate",
      program_id: "MBA",
    },
    {
      id: 3,
      first_name: "Alice",
      last_name: "Johnson",
      student_type: "Undergraduate",
      program_id: "BSEE",
    },
  ]);
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
          <h1 className="mb-4">Student Masterlist</h1>

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
            <button className="btn btn-success me-2">Add+</button>
            <button className="btn btn-secondary">New</button>
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
                      <th>Actions</th> {/* Added column for actions */}
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
                          {/* Edit Icon */}
                          <button
                            className="btn btn-sm btn-primary me-2"
                            title="Edit"
                            onClick={() => handleEdit(student.id)}
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </button>

                          {/* Delete Icon */}
                          <button
                            className="btn btn-sm btn-danger"
                            title="Delete"
                            onClick={() => handleDelete(student.id)}
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
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
