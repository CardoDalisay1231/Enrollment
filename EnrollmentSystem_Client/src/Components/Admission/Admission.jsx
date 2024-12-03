import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";


export default function Admission() {
  const [registrationData, setRegistrationData] = useState({
    fullname: "",
    email: "",
    applicantType: "",
    campus: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registrationData.fullname && registrationData.email && registrationData.applicantType && registrationData.campus) {
      if (registrationData.applicantType === "shs_graduate") {
        navigate("/form1");
      } else {
        // Handle other navigation or alerts for different applicant types if needed
      }
    } else {
      alert("Please fill out all fields!");
    }
  };


  return (
    <div className="containers">
      <div className="header">
        <img src="./images/cvsu-logo.png" alt="University Logo" className="logo" />
        <p>ADMISSION PORTAL</p>
      </div>
      <section id="register">
        <div className="login-signup-form">
          <div className="form">
          <form onSubmit={handleRegister}>
          <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={registrationData.fullname}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registrationData.email}
              onChange={handleChange}
              required
            />
            <select
              name="applicantType"
              value={registrationData.applicantType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Applicant Type
              </option>
              <option value="shs_graduate">SHS Graduate</option>
              <option value="current_shs">Current SHS Student</option>
              <option value="transferee">Transferee</option>
            </select>
            <select
              name="campus"
              value={registrationData.campus}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Campus
              </option>
              <option value="cvsu_bacoor">CvSU - Bacoor</option>
            </select>
            <button type="submit" className="btn btn-block">
              REGISTER
            </button>
          </form>
          </div>
        </div>
      </section>
    </div>
  );
}

