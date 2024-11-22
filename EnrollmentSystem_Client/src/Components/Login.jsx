import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
        role,
      });

      // Handle successful login
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token); // Save token
      
    } catch (err) {
      // Handle error
      console.error("Login failed:", err.response.data);
      setError(err.response.data.message || "Invalid credentials");
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
