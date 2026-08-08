import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  return (

    <div className="admin-dashboard">

      <div className="admin-header">

        <div>

          <h1>🛡️ Admin Dashboard</h1>

          <p>
            Smart Healthcare Management System
          </p>

        </div>

        <button
          className="logout-btn"
          onClick={() => navigate("/")}
        >
          🚪 Logout
        </button>

      </div>


      <div className="admin-cards">

        <div
          className="admin-card"
          onClick={() => navigate("/manage-doctors")}
        >

          <div className="card-icon">
            👨‍⚕️
          </div>

          <h2>Manage Doctors</h2>

          <p>
            Add, view and delete doctors.
          </p>

          <button>
            Manage Doctors →
          </button>

        </div>


        <div
          className="admin-card"
          onClick={() => navigate("/manage-patients")}
        >

          <div className="card-icon">
            👥
          </div>

          <h2>Manage Patients</h2>

          <p>
            View and manage registered patients.
          </p>

          <button>
            Manage Patients →
          </button>

        </div>


        <div
          className="admin-card"
          onClick={() => navigate("/manage-appointments")}
        >

          <div className="card-icon">
            📅
          </div>

          <h2>Manage Appointments</h2>

          <p>
            View and manage all appointments.
          </p>

          <button>
            Manage Appointments →
          </button>

        </div>


        <div
          className="admin-card"
          onClick={() => navigate("/prescription")}
        >

          <div className="card-icon">
            💊
          </div>

          <h2>Prescriptions</h2>

          <p>
            Manage patient prescriptions.
          </p>

          <button>
            Manage Prescriptions →
          </button>

        </div>


        <div
          className="admin-card"
          onClick={() => navigate("/reports")}
        >

          <div className="card-icon">
            📄
          </div>

          <h2>Medical Reports</h2>

          <p>
            View and manage medical reports.
          </p>

          <button>
            Manage Reports →
          </button>

        </div>


        <div
          className="admin-card"
          onClick={() => navigate("/profile")}
        >

          <div className="card-icon">
            👤
          </div>

          <h2>Admin Profile</h2>

          <p>
            View and manage administrator profile.
          </p>

          <button>
            View Profile →
          </button>

        </div>

      </div>


      <footer className="admin-footer">

        © 2026 Smart Healthcare Management System

      </footer>

    </div>

  );

}

export default AdminDashboard;