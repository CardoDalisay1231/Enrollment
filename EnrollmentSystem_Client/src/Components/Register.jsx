import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    address: "",
    date_of_birth: "",
    student_type: "",
    standing_year: "",
    semester: "",
    program_id: "",
    password: "", // Added password field
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/students", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        setSuccess("Student registered successfully!");
        setFormData({
          first_name: "",
          middle_name: "",
          last_name: "",
          email: "",
          contact_number: "",
          address: "",
          date_of_birth: "",
          student_type: "",
          standing_year: "",
          semester: "",
          program_id: "",
          password: "", // Reset password field
        });
        setError("");
        console.log("Student registered successfully", response.data);
      }
    } catch (error) {
      setError("Error registering student: " + (error.response?.data || error.message));
      setSuccess("");
      console.error("Error registering student:", error.response?.data || error.message);
    }
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
          CAVITE STATE UNIVERSITY <br />
          BACOOR CAMPUS
        </p>
      </div>
      <section id="register">
        <div className="login-signup-form animated fadeinDown">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="middle_name"
                placeholder="Middle Name"
                value={formData.middle_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
              <select
                name="student_type"
                value={formData.student_type}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Student Type
                </option>
                <option value="Regular">Regular Student</option>
                <option value="Irregular">Irregular Student</option>
                <option value="Transferee">Transferee Student</option>
              </select>
              <select
                name="standing_year"
                value={formData.standing_year}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Year Level
                </option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Semester
                </option>
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
              </select>
              <select
                name="program_id"
                value={formData.program_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Program
                </option>
                <option value="1">
                  Bachelor of Science in Computer Science
                </option>
                <option value="2">
                  Bachelor of Science in Information Technology
                </option>
              </select>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button className="btn btn-block" type="submit">
                Register
              </button>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <p className="message">
                Already Have An Account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
