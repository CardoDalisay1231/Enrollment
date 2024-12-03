import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import './mediaqueries.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from './Components/Login';
import Register from './Components/Register';
import RegFormCSReg from "./Components/RegForm_cs_reg";
import RegFormCSIrreg from "./Components/RegForm_cs_ireg";
import RegFormITReg from "./Components/RegForm_it_reg";
import RegFormITIrreg from "./Components/RegForm_it_ireg";
import RegFormPt2CSReg from "./Components/RegFormPt2_cs_reg";
import RegFormPt2CSIrreg from "./Components/RegFormPt2_cs_ireg";
import RegFormPt2ITReg from "./Components/RegFormPt2_it_reg";
import RegFormPt2ITIrreg from "./Components/RegFormPt2_it_ireg";
import RegistrarDashboard from './Components/RegistrarDashboard'; 
import RegistrarStudent from './Components/RegistrarStudent'; // Import the component
import Dashboard from './Components/Dashboard';
import Admission from './Components/Admission/Admission';
import FormPage1 from './Components/Admission/FormPage1'; 
import FormPage2 from './Components/Admission/FormPage2'; 
import FormPage3 from './Components/Admission/FormPage3'; 
import FormPage4 from './Components/Admission/FormPage4'; 
import FormPage5 from './Components/Admission/FormPage5'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";






function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<RegistrarDashboard />} />
        <Route path="/dashboard/students" element={<RegistrarStudent />} /> {/* New route */}
        <Route path="/regform-comp_sci-regular" element={<RegFormCSReg />} />
        <Route path="/regform-comp_sci-irreg" element={<RegFormCSIrreg />} />
        <Route path="/regform-info_tech-regular" element={<RegFormITReg />} />
        <Route path="/regform-info_tech-irreg" element={<RegFormITIrreg />} />
        <Route path="/regformpt2-comp_sci-regular" element={<RegFormPt2CSReg />} />
        <Route path="/regformpt2-comp_sci-irreg" element={<RegFormPt2CSIrreg />} />
        <Route path="/regformpt2-info_tech-regular" element={<RegFormPt2ITReg />} />
        <Route path="/regformpt2-info_tech-irreg" element={<RegFormPt2ITIrreg />} />
        <Route path="/form1" element={<FormPage1 />} />
        <Route path="/form2" element={<FormPage2 />} />
        <Route path="/form3" element={<FormPage3 />} />
        <Route path="/form4" element={<FormPage4 />} />
        <Route path="/form5" element={<FormPage5 />} />
        <Route path="/admission" element={<Admission />} />
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
