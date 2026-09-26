import './App.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import PatientDashboard from './pages/PatientDashboard'; 
import DoctorDashboard from './pages/DoctorDashboard'; 
import AdminDashboard from './pages/AdminDashboard'; 
import Appointment from './pages/Appointment'; 
import Profile from './pages/Profile'; 
import SymptomChecker from './pages/SymptomChecker'; 
import Prescription from './pages/Prescription'; 
import Report from './pages/Report'; 
import ManageDoctors from './pages/ManageDoctors'; 
import ManagePatients from './pages/ManagePatients'; 
import ManageAppointments from './pages/ManageAppointments'; 

function App() { 
  return ( 
    <BrowserRouter basename="/Smart-Healthcare-System"> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/patient" element={<PatientDashboard />} /> 
        <Route path="/doctor" element={<DoctorDashboard />} /> 
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/appointment" element={<Appointment />} /> 
        <Route path="/symptom" element={<SymptomChecker />} /> 
        <Route path="/prescription" element={<Prescription />} /> 
        <Route path="/report" element={<Report />} /> 
        <Route path="/reports" element={<Report />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/manage-doctors" element={<ManageDoctors />} /> 
        <Route path="/manage-patients" element={<ManagePatients />} /> 
        <Route path="/manage-appointments" element={<ManageAppointments />} /> 
      </Routes> 
    </BrowserRouter> 
  ); 
} 

export default App;
