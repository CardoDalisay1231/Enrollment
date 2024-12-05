    import React, { useState, useEffect } from "react";
    import { Link } from "react-router-dom";
    import axios from "axios";
    import jsPDF from "jspdf";
    import "jspdf-autotable"; 

    export default function RegistrarStudent() {
      
        const generatePDF = (student) => {
          if (!student) {
            alert("No student data found for PDF generation.");
            return;
          }
        
          const doc = new jsPDF();
        
          // Page dimensions
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          
            // Set line color to #177054
           doc.setTextColor(23, 112, 84);
          
          // Draw top border
          const topBorder = "=".repeat(57); // Adjust length to fit page width
          doc.setFont("Courier", "normal");
          doc.text(topBorder, 10, 10);
        
          // Draw bottom border
          doc.text(topBorder, 10, pageHeight - 10);
        
          // Draw side borders
          const lineHeight = 5; // Spacing between side border lines
          const sideBorderCount = Math.floor((pageHeight - 20) / lineHeight); // Number of side lines
          for (let i = 0; i < sideBorderCount; i++) {
            const y = 15 + i * lineHeight;
            doc.text("|", 10, y); // Left border
            doc.text("|", pageWidth - 10, y); // Right border
          }
        
          // Header
    doc.setFont("Courier", "bold");
    doc.setFontSize(14); // Increase font size for header
    doc.text("CAVITE STATE UNIVERSITY", pageWidth / 2, 20, { align: "center" });
    doc.text("Bacoor Campus", pageWidth / 2, 27, { align: "center" });
    doc.text("REGISTRATION FORM", pageWidth / 2, 34, { align: "center" });
          
    // Student Information Section
    const contentStartX = 20; // Content starts after the left border
    const contentStartY = 50; // Content starts after the header
    doc.setFontSize(10); // Increased font size for student details
    doc.setFont("Courier", "normal");
    doc.text(`Student Number: ${student.id}`, contentStartX, contentStartY);
    doc.text(`Student Name: ${student.last_name}, ${student.first_name}`, contentStartX, contentStartY + 8);
    doc.text(`Birthday: ${student.birthday}`, contentStartX, contentStartY + 16);
    doc.text(`Guardian: ${student.guardian || "N/A"}`, contentStartX, contentStartY + 24);
    doc.text(`Course: ${student.program_id}`, contentStartX, contentStartY + 32);
    doc.text(`Section: ${student.section}`, contentStartX, contentStartY + 40);
    doc.text(`Year: ${student.standing_year}`, contentStartX, contentStartY + 48);

    const secondColumnX = 115;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, secondColumnX, contentStartY);
    doc.text(`Gender: ${student.gender}`, secondColumnX, contentStartY + 8);
    doc.text(`E-mail: ${student.email || "N/A"}`, secondColumnX, contentStartY + 16);
    doc.text(`Contact: ${student.contact || "N/A"}`, secondColumnX, contentStartY + 24);
    doc.text(`School Year: ${student.school_year}`, secondColumnX, contentStartY + 32);

    // Table Header
    const tableStartY = contentStartY + 60;
    
    doc.setFont("Courier", "bold");
    doc.setFontSize(12); // Increase font size for the table
    doc.text("| Code       | Description                    | Units | Time     | Day|", contentStartX, tableStartY);
    doc.text("-".repeat(70), contentStartX, tableStartY + 6);

    // Table Content
    const courses = student.courses || [
      { code: "IT003", description: "Web Development", units: "3", time: "4PM-5PM", day: "M" },
      { code: "IT004", description: "Integrated Programming", units: "3", time: "1PM-2PM", day: "F" },
      { code: "GNED03", description: "Ethics", units: "3", time: "12PM-1PM", day: "T" },
      { code: "GNED04", description: "Araling Panlipunan", units: "3", time: "1PM-3PM", day: "W" },
    ];

    let rowY = tableStartY + 12;
    doc.setFont("Courier", "normal");
    courses.forEach((course) => {
      doc.text(
        `| ${course.code.padEnd(10)} | ${course.description.padEnd(30)} | ${course.units.padEnd(5)} | ${course.time.padEnd(8)} | ${course.day} |`,
        contentStartX,
        rowY
      );
      rowY += 8; // Increased row height for readability
    });

    // Table Footer
    rowY += 6;
    doc.text("-".repeat(70), contentStartX, rowY);

    // Fee Section
    rowY += 12;
    doc.setFontSize(10); // Larger font size for the fees
    doc.text("Laboratory Fees: PHP 3,200.00", contentStartX, rowY);
    doc.text("Other Fees: PHP 185.00", contentStartX, rowY + 8);
    doc.text("Tuition: PHP 1,485.00", contentStartX, rowY + 16);
    doc.text("Total Units: 12", secondColumnX, rowY);
    doc.text("Total Hours: 12", secondColumnX, rowY + 8);

    // Footer
doc.setFontSize(10);

// Student Section (Left)
doc.text("------------------------------", contentStartX, pageHeight - 40);
doc.text("Signed by", contentStartX, pageHeight - 30);
doc.text(`${student.last_name}, ${student.first_name}`, contentStartX, pageHeight - 25); // Student Name
doc.text("Student's Signature", contentStartX, pageHeight - 20);

// Registrar Section (Right)
const registrarX = pageWidth - 80; // Adjust X coordinate for the right-side text
doc.text("------------------------------", registrarX, pageHeight - 40);
doc.text("Signed by", registrarX, pageHeight - 30);
doc.text("Registrar R. Registrar", registrarX, pageHeight - 25); // Registrar Name
doc.text("Registrar's Signature", registrarX, pageHeight - 20);

    

    // Save file
    doc.save(`COR_${student.first_name}_${student.last_name}.pdf`);
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
            {error && <div className="alert alert-danger text-center">{error}</div>}

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
                              <button
                                className="btn btn-primary btn-sm me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#studentModal"
                                onClick={() => handleViewClick(student.id)}
                              >
                                View
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
