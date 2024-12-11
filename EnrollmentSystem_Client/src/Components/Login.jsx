import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
        role,
      });

      // Save token and user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setSuccess(true);
      setError(null);

      // Redirect to Student Portal (assuming student's role and route is /studentportal)
      if (role === "student") {
        navigate("/portal");
      } else {
        // If other roles have different dashboards:
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data.message || "Invalid credentials");
      setSuccess(false);
    }
  };

  return (
    <div className="containers">
      <div className="header">
        <img src="./images/cvsu-logo.png" alt="University Logo" className="logo" />
        <p>CAVITE STATE UNIVERSITY <br /> BACOOR CAMPUS</p>
      </div>
      <section id="login">
        <div className="login-signup-form">
          <div className="form">
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="student">Student</option>
                <option value="department_head">Department Head</option>
                <option value="registrar">Registrar</option>
              </select>
              <button className="btn btn-block">Login</button>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">Login successful!</p>}
              <p className="message">
                Not Registered? <Link to="/register">Create a new account</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
