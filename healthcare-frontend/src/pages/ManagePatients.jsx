import { useEffect, useState } from "react";
import "./ManagePatients.css";

function ManagePatients() {

  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8001/manage-patient/list"
      );

      const data = await response.json();

      setPatients(data);

    } catch (error) {

      console.log(error);

      setMessage("❌ Unable to load patients");

    }

  };

  const deletePatient = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `http://127.0.0.1:8001/manage-patient/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage("✅ Patient Deleted Successfully");

        loadPatients();

      } else {

        setMessage(
          "❌ " + (data.detail || "Unable to delete patient")
        );

      }

    } catch (error) {

      console.log(error);

      setMessage("❌ Backend Server Error");

    }

  };

  return (

    <div className="manage-patients-page">

      <div className="patients-header">

        <div>

          <h1>👥 Manage Patients</h1>

          <p>
            View and manage registered patients
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={loadPatients}
        >
          🔄 Refresh
        </button>

      </div>


      {message && (

        <div className="patient-message">
          {message}
        </div>

      )}


      <div className="patients-card">

        <h2>📋 Patient List</h2>

        <div className="patient-count">

          Total Patients: <strong>{patients.length}</strong>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {patients.length > 0 ? (

                patients.map((patient) => (

                  <tr key={patient.id}>

                    <td>
                      {patient.id}
                    </td>

                    <td>
                      {patient.name || patient.username || "-"}
                    </td>

                    <td>
                      {patient.email || "-"}
                    </td>

                    <td>
                      {patient.phone || "-"}
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deletePatient(patient.id)
                        }
                      >
                        🗑️ Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="no-patients"
                  >
                    No Patients Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      <footer className="patients-footer">

        © 2026 Smart Healthcare Management System

      </footer>

    </div>

  );

}

export default ManagePatients;