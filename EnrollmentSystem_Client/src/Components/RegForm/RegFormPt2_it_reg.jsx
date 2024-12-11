import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RegFormPt2_it_reg() {
  const location = useLocation();
  const { yearLevel, department } = location.state;
  const [imagePreviews, setImagePreviews] = useState({});
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
      {code: "GNED 11",unit: 3,title: "Kontekstwalisadong Komunikasyon sa Filipino",},
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
      {code: "GNED 04",unit: 3,title: "Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas ",},
      { code: "GNED 07", unit: 3, title: "The Contemporary World" },
      { code: "GNED 10", unit: 3, title: "Gender And Society" },
      { code: "GNED 14", unit: 2, title: "Panitikang Panlipunan" },
      { code: "DCIT 50", unit: 2, title: "Object Oriented Programming" },
      { code: "DCIT 24", unit: 2, title: "Information Management" },
      {code: "INSY 55",unit: 2,title: "Platform Technologies",},
      {code: "FITT 03",unit: 2,title: "Physical Activities towards Health and Fitness 1",},
    ],
    "two-2": [
      { code: "GNED 06", unit: 3, title: "Understanding the Self" },
      { code: "ITEC 60", unit: 2, title: "Integrated Programming and Technologies" },
      { code: "ITEC 65", unit: 2, title: "Open Source Technology" },
      { code: "ITEC 70", unit: 2, title: "Multimedia System" },
      { code: "DCIT 25", unit: 2, title: "Data Structures and Algorithms" },
      {code: "DCIT 55",unit: 2, title: "Advanced Database Management System",},
      {code: "FITT 04",unit: 2,title: "Physical Activities towards Health and Fitness 2",},
    ],
    "three-1": [
      { code: "ITEC 80", unit: 3, title: "Introduction to Human Computer Interaction" },
      { code: "ITEC 85", unit: 2, title: "Information Assurance and Security 1" },
      { code: "ITEC 90", unit: 2, title: "Network Fundamentals" },
      { code: "INSY 55", unit: 2, title: "System Analysis and Design" },
      {code: "DCIT 26",unit: 2,title: "Application Dev't And Emerging Techonologies"},
      {code: "DCIT 60",unit: 3,title: "Methon Of Research"},
    ],
    "three-2": [
      { code: "GNED 09", unit: 3, title: "Rizal Life, Works, and Writing" },
      { code: "ITEC 95", unit: 3, title: "Quantitative Methods(Modeling & Simulation)1" },
      { code: "ITEC 106", unit: 2, title: "IT Elective 2 (Web Systems and Techonologies 2)" },
      { code: "ITEC 100", unit: 2, title: "Information Assurance and Security" },
      { code: "ITEC 105",unit: 2,title: "Network Management"},
      { code: "ITEC 200A", unit: 3, title: "Capstone Project and Research 1" },
    ],
    "four-1": [
      { code: "DCIT 65", unit: 3, title: "Social And Proffesional Issues" },
      { code: "ITEC 111",unit: 2,title: "IT Elective 3 (Integrated Programming and Technologies 2)",},
      { code: "ITEC 116", unit: 2, title: "IT Elective 4 ( Systems Integration and Architecture 2" },
      { code: "ITEC 110", unit: 2, title: "System Administration and Maintenance" },
      { code: "ITEC 200B", unit: 3, title: "Capstone Project and Research 2" },
    ],
    "four-2": [
      { code: "ITEC 199", unit: 6, title: "PRACTICUM(MINUMUM 466 Hours)" },
    ],
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

          <div className="card-body position-relative pb-5" style={{ zIndex: 2 }}>
            <div className="row mb-4">
              <div className="col-12 text-center">
                <h4 className="fw-bold">REGULAR FORM</h4>
              </div>
            </div>

            {/* Student Info Section */}
            <div className="row mb-3 g-3">
              <div className="col-md-4">
                <label className="form-label">Student No.:</label>
                <input type="text" className="form-control" placeholder="Student No." />
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
                <input type="text" className="form-control" placeholder="Academic Year" />
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
                  <div>{renderUploadBox("esignature", "Upload E-Signature")}</div>
                  
                </div>
              </div>
            </div>

          </div>  
        </div>
      </div>
    </div>
  );
}
