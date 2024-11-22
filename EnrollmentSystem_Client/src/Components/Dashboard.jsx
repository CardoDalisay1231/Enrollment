import '../index.css'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { Link } from "react-router-dom";
import WarningModal from './WarningModal';
export default function Dashboard() {
  return (
    <div className="containers">
      <WarningModal/>
      <Navbar collapseOnSelect expand="lg" className="desktop-nav">
        <Container>
          <Navbar className="nav-name"  >
            Enrollment System
          </Navbar>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="hamburger">
            <Nav className="me-auto"></Nav>
            <Nav className="navigation">
            <Nav.Link className="navigation" href="#features">
                Home
              </Nav.Link>
              <Nav.Link className="navigation" href="#features">
                About
              </Nav.Link>
              <Nav.Link className="navigation" href="#pricing">
                Courses
              </Nav.Link>
              <Nav.Link className="navigation" href="#deets">
                Admission
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section id="profile">
        <div class="section__text">
          <p class="section__text__p1">Hello Welcome,</p>
          <h1 class="title">
            {" "}
            CAVITE STATE
            <br /> UNIVERSITY -<br />
            BACOOR CAMPUS
          </h1>

          <div class="btn-container">
          <Link to="/login"><button className="apply-now">APPLY NOW</button></Link>
          </div>
        </div>
        <div class="section__pic-container">
          <img src="./images/cvsu-logo.png" alt="John Doe profile picture" />
        </div>
      </section>

      <section id="about">
        <h1 class="tittle-about">ABOUT</h1>
        <div class="section-container">
          <div class="about-details-container">
            <div class="about-containers">
              <div class="details-container">
                <h3>MANDATE</h3>
                <p>
                  Section 2 of Republic Act No. 8468 “An Act Converting the Don
                  Severino Agricultural College in the Municipality of Indang,
                  Province of Cavite into a State University, to be Known as the
                  Cavite State University” states that, “The University shall
                  primarily provide advance instruction and professional
                  training in agriculture, science and technology, education and
                  other related fields, undertake research and extension
                  services, and provide progressive leadership in these areass.”
                </p>
              </div>
              <div class="details-container">
                <h3>VISION</h3>
                <p>
                  The premier university in historic Cavite globally recognized
                  for excellence in character development, academics, research,
                  innovation and sustainable community engagement.
                </p>
              </div>
              <div class="details-container">
                <h3>MISSION</h3>
                <p>
                  Cavite State University shall provide excellent, equitable and
                  relevant educational opportunities in the arts, sciences and
                  technology through quality instruction and responsive research
                  and development activities.
                </p>
              </div>
              <div class="details-container">
                <h3>HISTORY</h3>
                <p>
                  Cavite State University (CvSU) began as a small school in 1906
                  and went through many name changes as it grew. It finally
                  became a university in 1998 and now has 11 campuses across
                  Cavite province. CvSU offers around 100 academic programs to
                  over 25,000 students and is recognized for its focus on
                  agriculture, technology, and producing well-rounded graduates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Course" className="course-content">
      <h1 className="tittle-about">COURSE</h1>
      <div className="section-container">
        <div className="about-details-container">
          <div className="about-containers course">
            <div className="details-container course">
              <h3>
                <img
                  className="logos"
                  src="./images/cs.png"
                  alt="Cavite State University Logo"
                />
              </h3>
              <br />
              <p>CvSU Bacoor - Alliance of Computer Scientist</p>
            </div>
            <div className="details-container course">
              <h3><img
                  className="logos"
                  src="./images/it.png"
                  alt="Cavite State University Logo"
                /></h3>
              <br />
              <p>
              CvSU-Bacoor: Information Technology Society 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    </div>
  );
}
