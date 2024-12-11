import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

function StudentPortal() {
  const [studentData, setStudentData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve token and user data from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !token) {
      // If no user or token, redirect to login (optional)
      window.location.href = "/login";
      return;
    }

    // Fetch student data by ID
    fetchStudentData(user.id);
  }, [user, token]);

  const fetchStudentData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentData(response.data.data); // Assuming response data format as {status: 200, data: { ...studentInfo }}
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 200 * 1024) {
        // Check for file size (200KB max)
        setErrorMessage("File size exceeds 200 KB.");
        setImagePreview(null);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
          setErrorMessage("");
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handlePreviewClick = () => {
    document.getElementById("fileInput").click();
  };

  if (!studentData) {
    return <div>Loading student information...</div>;
  }

  // Extract student fields from studentData
  const {
    first_name,
    middle_name,
    last_name,
    student_type,
    date_of_birth,
    contact_number,
    program_id,
    standing_year,
    semester,
  } = studentData;

  // Map program_id to a program name
  const programName =
    program_id === 1
      ? "Computer Science"
      : program_id === 2
      ? "Information Technology"
      : "N/A";

  return (
    <div className="text-light" style={{ backgroundColor: "#E7E7E7" }}>
      {/* Fixed Header */}
      <div className="header d-flex justify-content-between align-items-center">
        {/* Logo and Title */}
        <div className="d-flex align-items-center">
          <img
            src="./images/cvsu-logo.png"
            alt="University Logo"
            className="logo"
          />
          <p>
            CAVITE STATE UNIVERSITY <br /> BACOOR CAMPUS
          </p>
        </div>

        {/* Buttons (Visible on larger screens only) */}
        <div className="header-buttons d-none d-lg-flex">
          <Button variant="light" className="me-2">
            Change Password
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // Clear token and user, redirect to login
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content Section */}
      <div style={{ paddingTop: "var(--header-height)" }}>
        <Container className="py-4" style={{ backgroundColor: "#E7E7E7" }}>
          {/* Student Info Section */}
          <Card className="mb-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <Row className="mb-2">
                    <Col xs={4} className="fw-bold d-flex align-items-center">
                      STUDENT NAME : {`${first_name} ${middle_name} ${last_name}`}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4} className="fw-bold d-flex align-items-center">
                      STUDENT TYPE : {student_type}
                    </Col>
                  </Row>
                </Col>

                <Col
                  md={4}
                  className="text-center d-flex flex-column align-items-center justify-content-center"
                >
                  <div
                    className="border rounded mb-2"
                    onClick={handlePreviewClick}
                    style={{
                      width: "150px",
                      height: "150px",
                      cursor: "pointer",
                      backgroundColor: "#f8f9fa",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span className="text-muted text-center">
                        Click to upload
                        <br />
                        2x2
                      </span>
                    )}
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    className="form-control d-none"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <small className="text-muted text-center mt-2">
                    Photo (200 KB max.)
                  </small>
                  {errorMessage && (
                    <div className="text-danger text-center mt-2">
                      {errorMessage}
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Personal Data & Access Application Status */}
          <Card className="mb-4">
            <Card.Body>
              <Row>
                {/* Personal Data */}
                <Col md={6} className="border-end">
                  <h5 className="fw-bold mb-3">PERSONAL DATA</h5>
                  <div className="mb-2">
                    <span className="fw-bold">Name : </span>
                    {`${first_name} ${middle_name} ${last_name}`}
                  </div>
                  <div className="mb-2">
                    <span className="fw-bold">Date of Birth : </span>
                    {date_of_birth}
                  </div>
                  <div className="mb-2">
                    <span className="fw-bold">Contact No. : </span>
                    {contact_number}
                  </div>
                  <div className="mb-2">
                    <span className="fw-bold">Course : </span>
                    {programName}
                  </div>
                  <div className="mb-2">
                    <span className="fw-bold">Year & Semester : </span>
                    {`${standing_year} - ${semester}`}
                  </div>
                </Col>

                {/* Access Application Status */}
                <Col md={6}>
                  <h5 className="fw-bold mb-3">ACCESS APPLICATION STATUS</h5>
                  <Row className="g-3">
                    <Col xs={4} className="text-center">
                      <div className="p-3 border bg-light text-dark">COG</div>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="p-3 border bg-light text-dark">
                        SCHEDULE
                      </div>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="p-3 border bg-light text-dark">
                        BILLING
                      </div>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="p-3 border bg-light text-dark">
                        CHECKLIST
                      </div>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="p-3 border bg-light text-dark">
                        ADMISSION
                      </div>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="p-3 border bg-light text-dark">
                        PRE-ENROLLMENT
                      </div>
                    </Col>
                    <Col xs={4} className="text-center">
                      <div className="p-3 border bg-light text-dark">
                        PRE-REGISTRATION
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Buttons for Mobile (Below Content) */}
          <div className="mobile-buttons d-block d-lg-none text-center">
            <Button variant="light" className="me-2 mb-2">
              Change Password
            </Button>
            <Button
              variant="danger"
              className="mb-2"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default StudentPortal;
