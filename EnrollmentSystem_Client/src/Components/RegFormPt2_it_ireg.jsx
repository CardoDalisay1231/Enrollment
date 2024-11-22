import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RegFormPt2_it_ireg() {
  // State for uploaded files (COG and E-signature)
  const location = useLocation();
  const { department } = location.state;

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
      <div className="form-container it-form">
        <h2 className="form-title">IRREGULAR FORM</h2>

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
            <input type="text" placeholder="Academic Year" />
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
              {[...Array(8)].map((_, i) => (
                <tr key={i}>
                  <td>
                    <input type="text" placeholder="Code" id="code"/>
                  </td>
                  <td>
                    <input type="number" placeholder="Unit" id="unit"/>
                  </td>
                  <td>
                    <input type="text" placeholder="Title" id="tittle"/>
                  </td>
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
