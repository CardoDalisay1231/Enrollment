import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RegFormPt2_cs_reg() {
  const location = useLocation();
  const navigate = useNavigate();
  const { yearLevel, department } = location.state;
  const [imagePreviews, setImagePreviews] = useState({});
  const [suffix, setSuffix] = useState("");
  const [disableSuffix, setDisableSuffix] = useState(false);

  const handleSuffixToggle = () => {
    setDisableSuffix(!disableSuffix);
    if (!disableSuffix) {
      // If we are disabling the suffix field, clear it
      setSuffix("");
    }
  };
  // Handle file change and preview
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [key]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle deleting an uploaded file
  const handleDeleteFile = (key) => {
    setImagePreviews((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  // Reusable upload box component
  const renderUploadBox = (key, label) => (
    <label
      className="upload-box border position-relative"
      style={{
        width: "150px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
        cursor: "pointer",
        border: "2px dashed #6c757d",
      }}
    >
      {imagePreviews[key] ? (
        <>
          <img
            src={imagePreviews[key]}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm position-absolute"
            style={{ top: "5px", right: "5px" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from triggering file input
              handleDeleteFile(key);
            }}
          >
            X
          </button>
        </>
      ) : (
        <span className="text-muted text-center">{label}</span>
      )}
      <input
        type="file"
        className="form-control d-none"
        accept="image/*"
        onChange={(e) => handleFileChange(e, key)}
      />
    </label>
  );

  const getCourse = () => {
    switch (department) {
      case "comp_sci":
        return "Bachelor of Science in Computer Science";
      case "info_tech":
        return "Bachelor of Science in Information Technology";
      default:
        return "";
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to PreEnrollmentSubmitted page
    navigate("/submitted");
  };

  return (
    <div className="containers" style={{ marginTop: "150px" }}>
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

      <div className="d-flex justify-content-center mt-4 pb-5">
        <div
          className="card shadow rounded position-relative overflow-hidden"
          style={{ maxWidth: "1200px", width: "100%" }}
        >
          {/* Blurred Background Image Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url(./images/cs.png)",
              backgroundSize: "50%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(8px)",
              zIndex: 0,
            }}
          ></div>

          {/* Semi-transparent Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1,
            }}
          ></div>

          <div
            className="card-body position-relative pb-5"
            style={{ zIndex: 2 }}
          >
            <div className="row mb-4">
              <div className="col-12 text-center">
                <h4 className="fw-bold">REGULAR FORM</h4>
              </div>
            </div>

            {/* Student Info Section */}

            <div className="row mb-3 g-3">
              <div className="row g-2">
                <div className="col-md-3">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Middle Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Suffix</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      disabled={disableSuffix}
                    />
                    <span
                      className="input-group-text"
                      onClick={handleSuffixToggle}
                      style={{ cursor: "pointer" }}
                    >
                      {disableSuffix ? (
                        <i className="fa fa-lock"></i>
                      ) : (
                        <i className="fa fa-unlock"></i>
                      )}
                    </span>
                  </div>
                </div>      
              </div>
              <div className="col-md-4">
                <label className="form-label">Student No.:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Student No."
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Course:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course"
                  value={getCourse()}
                  readOnly
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Academic Year:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Academic Year"
                />
              </div>
            </div>

            {/* Grades Section */}
            <div className="table-responsive mb-4">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
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
                          className="form-control"
                          placeholder="Grade"
                          min="0"
                          step="any"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Faculty"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Upload Section */}
            <div className="row mb-4">
              <div className="col-12">
                <h5>Upload Documents</h5>
                <div className="d-flex flex-wrap gap-3">
                  {/* COG Upload */}
                  <div>{renderUploadBox("cog", "Upload COG")}</div>

                  {/* E-Signature Upload */}
                  <div>
                    {renderUploadBox("esignature", "Upload E-Signature")}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
