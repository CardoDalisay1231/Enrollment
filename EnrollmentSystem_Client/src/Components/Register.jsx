import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [yearLevel, setYearLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [studentType, setStudentType] = useState(""); // Add state for student type
  const navigate = useNavigate();

  const handleYearLevelChange = (event) => {
    setYearLevel(event.target.value); // Just update the state here
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value); // Update state with selected department
  };
  const handleStudentTypeChange = (event) => {
    setStudentType(event.target.value); // Update state with selected student type
  };

  const handleSubmit = () => {
    // Construct the route based on department and studentType
    let route = `/regform-${department}-${studentType.toLowerCase()}`;
    navigate(route, { state: { yearLevel, department } });
  };

  return (
    
    <div className="containers">
      <div class="header">
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
          <form>
            <input type="name" placeholder="Full Name" />

            <select
              id="yr_lvl"
              value={yearLevel}
              onChange={handleYearLevelChange}
            >
              <option value="" disabled selected>
                Year Level
              </option>
              <option value="one-1">1rst Year - 1rst Semester</option>
              <option value="one-2">1rst Year - 2nd Semester</option>
              <option value="two-1">2nd Year - 1st Semester</option>
              <option value="two-2">2nd Year - 2nd Semester</option>
              <option value="three-1">3rd Year - 1st Semester</option>
              <option value="three-2">3rd Year - 2nd Semester</option>
              <option value="four-1">4th Year - 1st Semester</option>
              <option value="four-2">4th Year - 2nd Semester</option>
            </select>

            <select
              id="department"
              value={department}
              onChange={handleDepartmentChange}
            >
              <option value="" disabled selected>
                Select a Department
              </option>
              <option value="comp_sci">
                Bachelor of Science in Computer Science
              </option>
              <option value="info_tech">
                Bachelor of Science in Information Technology
              </option>
            </select>
            <select id="student-type" value={studentType} onChange={handleStudentTypeChange}>
              <option value="" disabled selected>
                Student Type
              </option>
              <option value="regular">Regular Student</option>
              <option value="Irreg">Irregular Student</option>
              <option value="transferee">Transferee Student</option>
            </select>

            
              {/* Pass both yearLevel and department to RegForm */}
              <button className="btn btn-block" onClick={handleSubmit}>Register</button>
            <p className="message">
              Already Have An Account?
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
      </section>
    </div>
   
  );
}
