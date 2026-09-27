import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    prescriptions: 0,
    reports: 0
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const patientRes = await fetch("https://smart-healthcare-system-tkm2.onrender.com/auth/users");
      const patientData = await patientRes.json();

      const appointmentRes = await fetch("https://smart-healthcare-system-tkm2.onrender.com/appointment/list");
      const appointmentData = await appointmentRes.json();

      let prescriptionData = [];
      let reportData = [];

      try {
        const prescriptionRes = await fetch("https://smart-healthcare-system-tkm2.onrender.com/prescription/list");
        prescriptionData = await prescriptionRes.json();
      } catch {}

      try {
        const reportRes = await fetch("https://smart-healthcare-system-tkm2.onrender.com/report/list");
        reportData = await reportRes.json();
      } catch {}

      setStats({
        patients: patientData.length || 0,
        appointments: appointmentData.length || 0,
        prescriptions: prescriptionData.length || 0,
        reports: reportData.length || 0
      });

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="dashboard">

      <h1 className="dashboard-title">
        👨‍💼 Admin Dashboard
      </h1>

      <div className="admin-grid">

        <div className="admin-card">
          <h2>{stats.patients}</h2>
          <p>👤 Patients</p>
        </div>

        <div className="admin-card">
          <h2>{stats.appointments}</h2>
          <p>📅 Appointments</p>
        </div>

        <div className="admin-card">
          <h2>{stats.prescriptions}</h2>
          <p>💊 Prescriptions</p>
        </div>

        <div className="admin-card">
          <h2>{stats.reports}</h2>
          <p>📋 Reports</p>
        </div>

      </div>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >

        <button
          onClick={() => navigate("/manage-doctors")}
          style={{
            padding: "20px",
            border: "none",
            borderRadius: "15px",
            background: "#0d6efd",
            color: "white",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          👨‍⚕️ Manage Doctors
        </button>

        <button
          onClick={() => navigate("/manage-patients")}
          style={{
            padding: "20px",
            border: "none",
            borderRadius: "15px",
            background: "#198754",
            color: "white",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          👤 Manage Patients
        </button>

        <button
          onClick={() => navigate("/manage-appointments")}
          style={{
            padding: "20px",
            border: "none",
            borderRadius: "15px",
            background: "#fd7e14",
            color: "white",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          📅 Manage Appointments
        </button>

      </div>

    </div>

  );

}

export default AdminDashboard;