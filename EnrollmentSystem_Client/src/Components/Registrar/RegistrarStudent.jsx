import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

export default function RegistrarStudent() {
  const generatePDF = async (student) => {
    if (!student) {
      alert("No student data found for PDF generation.");
      return;
    }

    try {
      // Load the existing PDF template
      const url = "/RegistrationCertificate.pdf"; // The PDF in public folder
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the first page of the PDF
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // For a page 792 x 612, top area is around y=600 and we go downwards.

      // Embed a standard font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Draw the student's name near the "Name" field
      // Adjust these coordinates so the text aligns with the printed "Name" label on your template
      firstPage.drawText(`${student.first_name} ${student.last_name}`, {
        x: 75, // Move horizontally to right of the "Name" label
        y: 508, // Slightly below top area; adjust if needed
        size: 12,
        font,
        color: rgb(0.196, 0.804, 0.196),
      });

      // Draw the Student Number near the "Student Number" field
      firstPage.drawText(`${student.id}`, {
        x: 120,
        y: 490,
        size: 12,
        font,
        color: rgb(0.196, 0.804, 0.196),
      });

      // Address (Position it in the address field section)
      // Adjust as per your template's layout
      firstPage.drawText(`${student.address}`, {
        x: 80,
        y: 425,
        size: 10,
        font,
        color: rgb(0.196, 0.804, 0.196),
      });

      // Contact number near the contact field (on the right side table)
      // Assuming the contact field is farther to the right side
      firstPage.drawText(`${student.contact_number}`, {
        x: 700,
        y: 425,
        size: 12,
        font,
        color: rgb(0.196, 0.804, 0.196),
      });

      // After editing, save the PDF
      const pdfBytes = await pdfDoc.save();

      // Use FileSaver to trigger a download in the browser
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `COR_${student.first_name}_${student.last_name}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState(null);

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

  // Fetch students function
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.response?.data?.message || "Failed to fetch students");
    }
  };

  // Fetch a single student by ID
  const fetchStudentById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/students/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedStudent(response.data.data);
    } catch (err) {
      console.error("Error fetching student details:", err);
      setError(
        err.response?.data?.message || "Failed to fetch student details"
      );
    }
  };

  // Handle "View" button click
  const handleViewClick = (id) => {
    fetchStudentById(id);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle "Delete" button click
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted student from the state
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
      alert("Student deleted successfully!");
    } catch (err) {
      console.error("Error deleting student:", err);
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

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

      <main className="main-content">
        {/* Error Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Student List */}
        <section className="row mt-4">
          <div className="card mt-4">
            <div className="card-header text-black">
              <h5>STUDENTS</h5>
            </div>
            <div className="card-body">
              {students.length > 0 ? (
                <div className="table-responsive">
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
                            <button
                              className="btn btn-primary btn-sm me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#studentModal"
                              onClick={() => handleViewClick(student.id)}
                            >
                              View
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(student.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">No students available.</p>
              )}
            </div>
          </div>
        </section>

        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="studentModal"
          tabIndex="-1"
          aria-labelledby="studentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="studentModalLabel">
                  Student Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {selectedStudent ? (
                  <div>
                    <p>
                      <strong>ID:</strong> {selectedStudent.id}
                    </p>
                    <p>
                      <strong>Name:</strong> {selectedStudent.first_name}{" "}
                      {selectedStudent.last_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedStudent.email}
                    </p>
                    <p>
                      <strong>Contact:</strong> {selectedStudent.contact_number}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedStudent.address}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {selectedStudent.date_of_birth}
                    </p>
                    <p>
                      <strong>Student Type:</strong>{" "}
                      {selectedStudent.student_type}
                    </p>
                    <p>
                      <strong>Standing Year:</strong>{" "}
                      {selectedStudent.standing_year}
                    </p>
                    <p>
                      <strong>Semester:</strong> {selectedStudent.semester}
                    </p>
                    <p>
                      <strong>Course ID:</strong> {selectedStudent.program_id}
                    </p>
                  </div>
                ) : (
                  <p>Loading student details...</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => generatePDF(selectedStudent)}
                >
                  Download COR
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
