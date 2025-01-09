import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import './mediaqueries.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from './Components/Login';
import Register from './Components/Register';
import RegisterStudent from './Components/RegisterStudent';
import StudentPortal from './Components/StudentPortal';
import RegistrarDashboard from './Components/Registrar/RegistrarDashboard'; 
import RegistrarStudent from './Components/Registrar/RegistrarStudent'; 
import Dashboard from './Components/Dashboard';
import Admission from './Components/Admission';
import PreEnrollmentSubmit from './Components/PreEnrollmentSubmit';
import AdmissionSubmit from './Components/AdmissionSubmit';
import SOCDashboard from './Components/SOC Officer/SOCDashboard';
import SOCStudVerified from './Components/SOC Officer/SOCStudVerified';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminAplicants from './Components/Admin/AdminAplicants';
import AdminEnrollees from './Components/Admin/AdminEnrollees';
import AdminResponses from './Components/Admin/AdminResponses';
 {/* Reg/Ireg Forms */}
import RegFormCSReg from "./Components/RegForm/RegForm_cs_reg";
import RegFormCSIrreg from "./Components/RegForm/RegForm_cs_ireg";
import RegFormITReg from "./Components/RegForm/RegForm_it_reg";
import RegFormITIrreg from "./Components/RegForm/RegForm_it_ireg";
import RegFormPt2CSReg from "./Components/RegForm/RegFormPt2_cs_reg";
import RegFormPt2CSIrreg from "./Components/RegForm/RegFormPt2_cs_ireg";
import RegFormPt2ITReg from "./Components/RegForm/RegFormPt2_it_reg";
import RegFormPt2ITIrreg from "./Components/RegForm/RegFormPt2_it_ireg";
import RegForm_cs_Trans from './Components/RegForm/RegForm_cs_Trans';
import RegForm_it_Trans from './Components/RegForm/RegForm_it_Trans';
import RegFormPt2_cs_Trans from './Components/RegForm/RegFormPt2_cs_Trans';
import RegFormPt2_it_Trans from './Components/RegForm/RegFormPt2_it_Trans';
 {/* shs grad forms */}
import FormPage1 from './Components/AdmissionShsGrad/FormPage1'; 
import FormPage2 from './Components/AdmissionShsGrad/FormPage2'; 
import FormPage3 from './Components/AdmissionShsGrad/FormPage3'; 
import FormPage4 from './Components/AdmissionShsGrad/FormPage4'; 
import FormPage5 from './Components/AdmissionShsGrad/FormPage5'; 
 {/* current shs forms */}
 import FormCurrent1 from './Components/AdmissionCurrentShs/FormPage1'; 
 import FormCurrent2 from './Components/AdmissionCurrentShs/FormPage2'; 
 import FormCurrent3 from './Components/AdmissionCurrentShs/FormPage3'; 
 import FormCurrent4 from './Components/AdmissionCurrentShs/FormPage4'; 
 import FormCurrent5 from './Components/AdmissionCurrentShs/FormPage5'; 
{/* Als Forms */}
import FormPageAls1 from './Components/AdmissionAls/FormPage1'; 
import FormPageAls2 from './Components/AdmissionAls/FormPage2'; 
import FormPageAls3 from './Components/AdmissionAls/FormPage3'; 
import FormPageAls4 from './Components/AdmissionAls/FormPage4'; 
import FormPageAls5 from './Components/AdmissionAls/FormPage5'; 
{/* Transferee Forms */}
import TransFormPage1 from './Components/AdmissionTransferee/FormPage1'; 
import TransFormPage2 from './Components/AdmissionTransferee/FormPage2'; 
import TransFormPage4 from './Components/AdmissionTransferee/FormPage4'; 
import TransFormPage5 from './Components/AdmissionTransferee/FormPage5'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";






function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerstud" element={<RegisterStudent />} />
        <Route path="/portal" element={<StudentPortal/>} />
        <Route path="/dashboard" element={<RegistrarDashboard />} />
        <Route path="/dashboard/students" element={<RegistrarStudent />} /> 
        <Route path="/admission" element={<Admission />} />
        <Route path="/submitted" element={<PreEnrollmentSubmit />} />
        <Route path="/admisubmit" element={<AdmissionSubmit />} />
        <Route path="/SOC" element={<SOCDashboard />} />
        <Route path="/SOC/verstud" element={<SOCStudVerified/>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminAplicants />} />
        <Route path="/admin/enrollees" element={<AdminEnrollees />} />
        <Route path="/admin/responses" element={<AdminResponses />} />
        {/* Reg/Ireg Forms */}
        <Route path="/regform-comp_sci-regular" element={<RegFormCSReg />} />
        <Route path="/regform-comp_sci-irreg" element={<RegFormCSIrreg />} />
        <Route path="/regform-comp_sci-transferee" element={<RegForm_cs_Trans />} />
        <Route path="/regform-info_tech-regular" element={<RegFormITReg />} />
        <Route path="/regform-info_tech-irreg" element={<RegFormITIrreg />} />
        <Route path="/regform-info_tech-transferee" element={<RegForm_it_Trans />} />
        <Route path="/regformpt2-comp_sci-regular" element={<RegFormPt2CSReg />} />
        <Route path="/regformpt2-comp_sci-irreg" element={<RegFormPt2CSIrreg />} />
        <Route path="/regformpt2-comp_sci-transferee" element={<RegFormPt2_cs_Trans/>} />
        <Route path="/regformpt2-info_tech-regular" element={<RegFormPt2ITReg />} />
        <Route path="/regformpt2-info_tech-irreg" element={<RegFormPt2ITIrreg />} />
        <Route path="/regformpt2-info_tech-transferee" element={<RegFormPt2_it_Trans />} />
        
        {/* shs grad forms */}
        <Route path="/form1" element={<FormPage1 />} />
        <Route path="/form2" element={<FormPage2 />} />
        <Route path="/form3" element={<FormPage3 />} />
        <Route path="/form4" element={<FormPage4 />} />
        <Route path="/form5" element={<FormPage5 />} />
        {/* current shs forms */}
        <Route path="/formcurnt1" element={<FormCurrent1 />} />
        <Route path="/formcurnt2" element={<FormCurrent2 />} />
        <Route path="/formcurnt3" element={<FormCurrent3 />} />
        <Route path="/formcurnt4" element={<FormCurrent4 />} />
        <Route path="/formcurnt5" element={<FormCurrent5 />} />
        {/* Als Forms */}
        <Route path="/formAls1" element={<FormPageAls1 />} />
        <Route path="/formAls2" element={<FormPageAls2 />} />
        <Route path="/formAls3" element={<FormPageAls3 />} />
        <Route path="/formAls4" element={<FormPageAls4 />} />
        <Route path="/formAls5" element={<FormPageAls5 />} />
        {/* Transferee Forms */}
        <Route path="/transform1" element={<TransFormPage1 />} />
        <Route path="/transform2" element={<TransFormPage2 />} />
        <Route path="/transform4" element={<TransFormPage4 />} />
        <Route path="/transform5" element={<TransFormPage5 />} />
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
