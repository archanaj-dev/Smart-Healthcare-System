import { useEffect, useState } from "react";
import "./ManageAppointments.css";

function ManageAppointments() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {

      const response = await fetch(
        "https://smart-healthcare-system-tkm2.onrender.com/manage-appointment/list"
      );

      const data = await response.json();

      setAppointments(data);

    } catch (error) {

      console.log(error);

    }

  };

  const approveAppointment = async (id) => {

    try {

      await fetch(
        `https://smart-healthcare-system-tkm2.onrender.com/manage-appointment/approve/${id}`,
        {
          method: "PUT"
        }
      );

      fetchAppointments();

    } catch (error) {

      console.log(error);

    }

  };

  const rejectAppointment = async (id) => {

    try {

      await fetch(
        `https://smart-healthcare-system-tkm2.onrender.com/manage-appointment/reject/${id}`,
        {
          method: "PUT"
        }
      );

      fetchAppointments();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteAppointment = async (id) => {

    if (!window.confirm("Delete this appointment?")) return;

    try {

      await fetch(
        `https://smart-healthcare-system-tkm2.onrender.com/manage-appointment/delete/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchAppointments();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="appointment-container">

      <h1>📅 Manage Appointments</h1>

      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Problem</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {appointments.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.patient_name}</td>

              <td>{item.doctor}</td>

              <td>{item.appointment_date}</td>

              <td>{item.appointment_time}</td>

              <td>{item.problem}</td>

              <td>

                <span
                  className={
                    item.status === "Approved"
                      ? "approved"
                      : item.status === "Rejected"
                      ? "rejected"
                      : "pending"
                  }
                >
                  {item.status}
                </span>

              </td>

              <td>

                <button
                  className="approve-btn"
                  onClick={() => approveAppointment(item.id)}
                >
                  ✅ Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => rejectAppointment(item.id)}
                >
                  ❌ Reject
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteAppointment(item.id)}
                >
                  🗑 Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ManageAppointments;