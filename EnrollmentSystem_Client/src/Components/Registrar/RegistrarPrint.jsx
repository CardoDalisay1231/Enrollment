import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // Make sure pdf-lib is installed
import { saveAs } from "file-saver"; // For file saving

export default function RegistrarPrint() {
  const generatePDF = async (student) => {
    if (!student) {
      alert("No student data found for PDF generation.");
      return;
    }

    try {
      // Load the existing PDF template
      const url = "/RegistrationCertificate.pdf"; // The PDF in the public folder
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the first page of the PDF
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Embed a standard font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Draw the student's name near the "Name" field
      firstPage.drawText(`${student.first_name} ${student.last_name}`, {
        x: 75,
        y: 508,
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
      firstPage.drawText(`${student.address}`, {
        x: 80,
        y: 425,
        size: 10,
        font,
        color: rgb(0.196, 0.804, 0.196),
      });

      // Contact number near the contact field (on the right side table)
      firstPage.drawText(`${student.contact_number}`, {
        x: 700,
        y: 425,
        size: 12,
        font,
        color: rgb(0.196, 0.804, 0.196),
      });

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the modified PDF
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      return pdfUrl; // Return the URL to display in an iframe
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(""); // For the first input (Name)
  const [searchResults, setSearchResults] = useState([]); // To store search results
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(""); // To store the URL of the generated PDF

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to fetch all students
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data; // Return student data
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students");
      return [];
    }
  };

  // Function to handle search by first name
  const handleSearch = async () => {
    try {
      const students = await fetchStudents();

      // Filter students based on first name
      const filteredStudents = students.filter((student) =>
        student.first_name.toLowerCase().includes(name.toLowerCase())
      );

      setSearchResults(filteredStudents); // Update search results

      // If there's a matching student, generate the PDF
      if (filteredStudents.length > 0) {
        const student = filteredStudents[0]; // Assuming the first match
        const pdfUrl = await generatePDF(student); // Generate PDF and get the URL
        setPdfUrl(pdfUrl); // Set the PDF URL to display
      }
    } catch (err) {
      console.error("Error during search:", err);
      setError("An error occurred while searching for students.");
    }
  };

  const [studentNo, setStudentNo] = useState("");
  const [course, setCourse] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudentType, setSelectedStudentType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
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
          <h1 className="mb-4">
            Certificate of Registration & Certificate of Grades
          </h1>

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
            <button className="btn btn-success me-2" onClick={handleSearch}>
              Search
            </button>
          </div>
        </section>
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
        {/* Display Search Results */}
        <section>
          {error && <p className="text-danger">{error}</p>}
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((student) => (
                <li key={student.id}>
                  {student.first_name} {student.last_name} - ID: {student.id} -{" "}
                  Course: {student.program_id}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </section>

        {/* Display the PDF */}
        {pdfUrl && (
          <section>
            <h3>Generated Certificate</h3>
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              title="Student Certificate"
            ></iframe>
          </section>
        )}
      </main>
    </div>
  );
}
