import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RegFormPt2_cs_reg() {
  // State for uploaded files (COG and E-signature)
  const location = useLocation();
  const { yearLevel, department } = location.state;

  const getCourse = () => {
    switch (department) {
      case "comp_sci":
        return "Bachelor of Science in Computer Science"; // Or a more specific course name
      case "info_tech":
        return "Bachelor of Science in Information Technology";
      // Add cases for other departments
      default:
        return ""; // Or a default value
    }
  };
 

  const [cogFile, setCogFile] = useState(null);
  const [eSignature, setESignature] = useState(null);

  const courseData = {
    "one-1": [
      { code: "GNED 02", unit: 3, title: "Ethics" },
      { code: "GNED 05", unit: 3, title: "Purposive Communication" },
      {
        code: "GNED 11",
        unit: 3,
        title: "Kontekstwalisadong Komunikasyon sa Filipino",
      },
      { code: "COSC 50", unit: 3, title: "Discrete Structures 1" },
      { code: "DCIT 21", unit: 3, title: "Introduction to Computing" },
      { code: "DCIT 22", unit: 3, title: "Computer Programming 1" },
      { code: "FITT 1", unit: 2, title: "Movement Enhancement" },
      { code: "NSTP 1", unit: 3, title: "National Service Training Program 1" },
      { code: "CvSU 101", unit: 1, title: "Institutional Orientation" },
    ],
    "one-2": [
      { code: "GNED 01", unit: 3, title: "Art Apprectiation" },
      { code: "GNED 03", unit: 3, title: "Mathematics in the Modern World" },
      { code: "GNED 06", unit: 3, title: "Science, Technology and Society" },
      { code: "GNED 12", unit: 3, title: "Dalumat Ng/Sa Filipino" },
      { code: "DCIT 23", unit: 3, title: "Computer Programming 2" },
      { code: "ITEC 50", unit: 3, title: "Web Systems and Technologies" },
      { code: "FITT 2", unit: 2, title: "Fitness Exercises" },
      { code: "NSTP 2", unit: 3, title: "National Service Training Program 2" },
    ],
    "two-1": [
      {
        code: "GNED 04",
        unit: 3,
        title: "Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas ",
      },
      { code: "MATH 01", unit: 3, title: "Analytic Geometry" },
      { code: "COSC 55", unit: 3, title: "Discrete Structures II" },
      { code: "COSC 60", unit: 3, title: "Digital Logic Design" },
      { code: "DCIT 50", unit: 3, title: "Object Oriented Programming" },
      { code: "DCIT 24", unit: 3, title: "Information Management" },
      {
        code: "INSY 50",
        unit: 3,
        title: "Fundamentals of Information Systems",
      },
      {
        code: "FITT 03",
        unit: 2,
        title: "Physical Activities towards Health and Fitness 1",
      },
    ],
    "two-2": [
      { code: "GNED 08", unit: 3, title: "Understanding the Self" },
      { code: "GNED 14", unit: 3, title: "Panitikang Panlipunan" },
      { code: "MATH 02", unit: 3, title: "Calculus" },
      { code: "COSC 65", unit: 3, title: "Architecture and Organization" },
      { code: "COSC 70", unit: 3, title: "Software Engineering 1" },
      { code: "DCIT 25", unit: 3, title: "Data Structures and Algorithms" },
      {
        code: "DCIT 55",
        unit: 3,
        title: "Advanced Database Management System",
      },
      {
        code: "FITT 04",
        unit: 2,
        title: "Physical Activities towards Health and Fitness 2",
      },
    ],
    "three-1": [
      { code: "MATH 03", unit: 3, title: "Linear Algebra" },
      { code: "COSC 75", unit: 3, title: "Software Engineering" },
      { code: "COSC 55", unit: 3, title: "Operating Systems" },
      { code: "COSC 60", unit: 3, title: "Networks and Communication" },
      {
        code: "DCIT 50",
        unit: 3,
        title: "CS Elective 1 (Computer Graphics and VisuaL Computing)",
      },
      {
        code: "INSY 50",
        unit: 3,
        title: "Applications Devt and Emerging Technologies",
      },
      { code: "FITT 03", unit: 2, title: "Social and Professional issues" },
    ],
    "three-2": [
      { code: "GNED 09", unit: 3, title: "Life and Works of Rizal" },
      { code: "MATH 04", unit: 3, title: "Experimental Statistics" },
      { code: "COSC 90", unit: 3, title: "Design ad Analysis of Algorithm" },
      { code: "COSC 95", unit: 3, title: "Prograrnming Languages" },
      {
        code: "COSCS 106",
        unit: 3,
        title: "CS Elective 2 (Introduction to Game Development)",
      },
      { code: "DCIT 60", unit: 3, title: "Methods of Research" },
      { code: "ITEC 85", unit: 3, title: "Information Assurance and Security" },
    ],
    "four-1": [
      { code: "ITEC 80", unit: 3, title: "Human Computer Interaction" },
      {
        code: "COSC 100",
        unit: 3,
        title: "Automata theory and Formal Languages",
      },
      { code: "COSC 105", unit: 3, title: "Inteligent Systems" },
      { code: "COSC 111", unit: 3, title: "CS Elective 3 (Internet of Thins)" },
      { code: "COSC 200A", unit: 3, title: "Undergraduate Thesis 1" },
    ],
    "four-2": [
      { code: "GNED 07", unit: 3, title: "The Contemporary World" },
      { code: "GNED 10", unit: 3, title: "Gender and Society" },
      {
        code: "COSC 110",
        unit: 3,
        title: "Numerical and Symbolic Computation",
      },
      { code: "COSC 200B", unit: 3, title: "Undergraduate Thesis 2" },
    ],
  };

  // Handlers for file uploads
  const handleCogUpload = (event) => {
    setCogFile(event.target.files[0]);
  };

  const handleESignatureUpload = (event) => {
    setESignature(event.target.files[0]);
  };

  return (
    <div className="containers">
    <div className="header">
      <Link to="/">
        <img
          src="./images/cvsu-logo.png"
          alt="University Logo"
          className="logo"
        />
      </Link>
      <p>
        CAVITE STATE UNIVERSITY <br /> BACOOR CAMPUS
      </p>
    </div>
      <div className="form-container cs-form">
        <h2 className="form-title">REGULAR FORM</h2>

        <div className="form-section">
          <div className="form-group">
            <label>Fullname:</label>
            <div className="name-fields">
              <input type="text" placeholder="Family Name" />
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Middle Name" />
              <input type="text" placeholder="Suffix" />
            </div>
          </div>

          <div className="form-group">
            <label>Student No.:</label>
            <input type="text" placeholder="Student No." />

            <label>Course:</label>
            <input
              type="text"
              placeholder="Course"
              value={getCourse()}
              readOnly
            />

            <label>Academic Year:</label>
            <input
              type="text"
              placeholder="Academic Year"
            />
          </div>

          <div className="grades-section">
            <table>
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>UNIT</th>
                  <th>COURSE TITLE</th>
                  <th>GRADE</th>
                  <th>FACULTY</th>
                </tr>
              </thead>
              <tbody>
                {courseData[yearLevel]?.map((course, i) => (
                  <tr key={i}>
                    <td>{course.code}</td>
                    <td>{course.unit}</td>
                    <td>{course.title}</td>
                    <td>
                    <input
                      type="number"
                      id="grade"
                      placeholder="Grade"
                      min="0"
                      step="any"
                    />
                  </td>
                  <td>
                    <input type="text" placeholder="Faculty" id="faculty"/>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="upload-section">
            <div className="file-upload">
              <label>Upload your COG:</label>
              <input type="file" onChange={handleCogUpload} />
            </div>

            <div className="file-upload">
              <label>E-signature:</label>
              <input type="file" onChange={handleESignatureUpload} />
            </div>
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
}
