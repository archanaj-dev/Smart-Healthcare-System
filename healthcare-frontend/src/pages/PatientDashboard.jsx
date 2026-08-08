import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";

function PatientDashboard() {

  const navigate = useNavigate();

  return (

    <div className="patient-dashboard">

      <div className="patient-header">

        <div>
          <h1>🏥 Patient Dashboard</h1>

          <p>
            Welcome to Smart Healthcare Management System
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={() => navigate("/")}
        >
          🚪 Logout
        </button>

      </div>


      <div className="patient-cards">

        <div
          className="patient-card"
          onClick={() => navigate("/appointment")}
        >

          <div className="card-icon">
            📅
          </div>

          <h2>Book Appointment</h2>

          <p>
            Schedule an appointment with a doctor.
          </p>

          <button>
            Book Now →
          </button>

        </div>


        <div
          className="patient-card"
          onClick={() => navigate("/prescription")}
        >

          <div className="card-icon">
            💊
          </div>

          <h2>Prescriptions</h2>

          <p>
            View and manage your medical prescriptions.
          </p>

          <button>
            View Prescriptions →
          </button>

        </div>


        <div
          className="patient-card"
          onClick={() => navigate("/prescriptions")}
        >

          <div className="card-icon">
            📋
          </div>

          <h2>Prescription History</h2>

          <p>
            View your previous prescription records.
          </p>

          <button>
            View History →
          </button>

        </div>


        <div
          className="patient-card"
          onClick={() => navigate("/reports")}
        >

          <div className="card-icon">
            📄
          </div>

          <h2>Medical Reports</h2>

          <p>
            View and manage your medical reports.
          </p>

          <button>
            View Reports →
          </button>

        </div>


        <div
          className="patient-card"
          onClick={() => navigate("/symptom")}
        >

          <div className="card-icon">
            🤖
          </div>

          <h2>AI Symptom Checker</h2>

          <p>
            Check your symptoms using our AI system.
          </p>

          <button>
            Check Symptoms →
          </button>

        </div>


        <div
          className="patient-card"
          onClick={() => navigate("/profile")}
        >

          <div className="card-icon">
            👤
          </div>

          <h2>My Profile</h2>

          <p>
            View and manage your personal information.
          </p>

          <button>
            View Profile →
          </button>

        </div>

      </div>


      <footer className="patient-footer">

        © 2026 Smart Healthcare Management System

      </footer>

    </div>

  );

}

export default PatientDashboard;