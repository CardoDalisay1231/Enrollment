import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import './mediaqueries.css'
import 'bootstrap/dist/css/bootstrap.min.css';
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
import Dashboard from './Components/Dashboard';





function App() {
  return (
    <Router basename="/Enrollment-System/">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/regform-comp_sci-regular" element={<RegFormCSReg />} />
        <Route path="/regform-comp_sci-irreg" element={<RegFormCSIrreg />} />
        <Route path="/regform-info_tech-regular" element={<RegFormITReg />} />
        <Route path="/regform-info_tech-irreg" element={<RegFormITIrreg />} />
        <Route path="/regformpt2-comp_sci-regular" element={<RegFormPt2CSReg />} />
        <Route path="/regformpt2-comp_sci-irreg" element={<RegFormPt2CSIrreg />} />
        <Route path="/regformpt2-info_tech-regular" element={<RegFormPt2ITReg />} />
        <Route path="/regformpt2-info_tech-irreg" element={<RegFormPt2ITIrreg />} />
      </Routes>
    </Router>
  );
}

export default App;
