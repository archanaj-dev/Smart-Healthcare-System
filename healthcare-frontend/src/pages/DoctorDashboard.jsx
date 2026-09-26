import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";

function DoctorDashboard() {

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/doctor/appointments"
      );

      const data = await response.json();

      setAppointments(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadAppointments();

  }, []);

  const updateAppointment = async (id, action) => {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/doctor/${action}/${id}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert(data.message);

        loadAppointments();

      } else {

        alert(data.detail || "Something went wrong");

      }

    } catch (error) {

      console.log(error);

      alert("Backend Server Error");

    }

  };

  return (

    <div className="doctor-dashboard">

      <div className="doctor-header">

        <div>

          <h1>👨‍⚕️ Doctor Dashboard</h1>

          <p>
            Manage appointments and patient care
          </p>

        </div>

        <button
          className="logout-btn"
          onClick={() => navigate("/")}
        >
          🚪 Logout
        </button>

      </div>


      <div className="doctor-cards">

        <div
          className="doctor-card"
          onClick={() => navigate("/prescription")}
        >

          <div className="card-icon">
            💊
          </div>

          <h2>Prescriptions</h2>

          <p>
            Create and manage patient prescriptions.
          </p>

          <button>
            Manage →
          </button>

        </div>


        <div
          className="doctor-card"
          onClick={() => navigate("/reports")}
        >

          <div className="card-icon">
            📄
          </div>

          <h2>Medical Reports</h2>

          <p>
            View and manage patient medical reports.
          </p>

          <button>
            View Reports →
          </button>

        </div>


        <div
          className="doctor-card"
          onClick={() => navigate("/profile")}
        >

          <div className="card-icon">
            👤
          </div>

          <h2>My Profile</h2>

          <p>
            View and manage your doctor profile.
          </p>

          <button>
            View Profile →
          </button>

        </div>

      </div>


      <div className="appointments-section">

        <div className="section-header">

          <h2>📅 Patient Appointments</h2>

          <button onClick={loadAppointments}>
            🔄 Refresh
          </button>

        </div>


        {appointments.length === 0 ? (

          <div className="no-appointments">

            <h3>No Appointments Found</h3>

            <p>
              Patient appointments will appear here.
            </p>

          </div>

        ) : (

          <div className="appointment-table-container">

            <table className="appointment-table">

              <thead>

                <tr>

                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Problem</th>
                  <th>Status</th>
                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {appointments.map((appointment) => (

                  <tr key={appointment.id}>

                    <td>
                      {appointment.patient_name}
                    </td>

                    <td>
                      {appointment.doctor}
                    </td>

                    <td>
                      {appointment.appointment_date}
                    </td>

                    <td>
                      {appointment.appointment_time}
                    </td>

                    <td>
                      {appointment.problem}
                    </td>

                    <td>

                      <span
                        className={`status ${String(
                          appointment.status || "Pending"
                        ).toLowerCase()}`}
                      >
                        {appointment.status || "Pending"}
                      </span>

                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="approve-btn"
                          onClick={() =>
                            updateAppointment(
                              appointment.id,
                              "approve"
                            )
                          }
                        >
                          ✅ Approve
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() =>
                            updateAppointment(
                              appointment.id,
                              "reject"
                            )
                          }
                        >
                          ❌ Reject
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      <footer className="doctor-footer">

        © 2026 Smart Healthcare Management System

      </footer>

    </div>

  );

}

export default DoctorDashboard;