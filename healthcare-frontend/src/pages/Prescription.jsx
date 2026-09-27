import { useEffect, useState } from "react";
import "./Prescription.css";

function Prescription() {

  const [form, setForm] = useState({
    patient_name: "",
    doctor_name: "",
    medicine: "",
    dosage: "",
    duration: "",
    notes: "",
  });

  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPrescriptions();
    loadDoctors();
  }, []);

  const loadDoctors = async () => {

    try {

      const response = await fetch(
        "https://smart-healthcare-system-tkm2.onrender.com/manage-doctor/list"
      );

      const data = await response.json();

      setDoctors(data);

    } catch (error) {

      console.log(error);

    }

  };

  const loadPrescriptions = async () => {

    try {

      const response = await fetch(
        "https://smart-healthcare-system-tkm2.onrender.com/prescription/list"
      );

      const data = await response.json();

      setPrescriptions(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const savePrescription = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://smart-healthcare-system-tkm2.onrender.com/prescription/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage("✅ Prescription Saved Successfully");

        setForm({
          patient_name: "",
          doctor_name: "",
          medicine: "",
          dosage: "",
          duration: "",
          notes: "",
        });

        loadPrescriptions();

      } else {

        setMessage("❌ " + data.detail);

      }

    } catch (error) {

      console.log(error);

      setMessage("❌ Backend Server Error");

    }

  };

  const deletePrescription = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescription?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `https://smart-healthcare-system-tkm2.onrender.com/prescription/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {

        setMessage("✅ Prescription Deleted Successfully");

        loadPrescriptions();

      } else {

        setMessage("❌ Failed to delete prescription");

      }

    } catch (error) {

      console.log(error);

      setMessage("❌ Backend Server Error");

    }

  };

  const filteredPrescriptions = prescriptions.filter((item) => {

    const patient =
      item.patient_name?.toLowerCase() || "";

    const doctor =
      item.doctor_name?.toLowerCase() || "";

    const medicine =
      item.medicine?.toLowerCase() || "";

    const searchText =
      search.toLowerCase();

    return (
      patient.includes(searchText) ||
      doctor.includes(searchText) ||
      medicine.includes(searchText)
    );

  });

  return (

    <div className="prescription-page">

      <div className="prescription-card">

        <h1>💊 Prescription Management</h1>

        <p>
          Create and Manage Patient Prescriptions
        </p>

        <form onSubmit={savePrescription}>

          <input
            type="text"
            name="patient_name"
            placeholder="Patient Name"
            value={form.patient_name}
            onChange={handleChange}
            required
          />

          <select
            name="doctor_name"
            value={form.doctor_name}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Doctor
            </option>

            {doctors.map((doctor) => (

              <option
                key={doctor.id}
                value={doctor.name}
              >
                {doctor.name} - {doctor.specialization}
              </option>

            ))}

          </select>

          <input
            type="text"
            name="medicine"
            placeholder="Medicine Name"
            value={form.medicine}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="dosage"
            placeholder="Dosage (Example: 1 Tablet Twice Daily)"
            value={form.dosage}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (Example: 5 Days)"
            value={form.duration}
            onChange={handleChange}
            required
          />

          <textarea
            name="notes"
            rows="4"
            placeholder="Doctor Notes"
            value={form.notes}
            onChange={handleChange}
          />

          <button type="submit">
            💾 Save Prescription
          </button>

        </form>

        {message && (

          <div className="message">
            {message}
          </div>

        )}

      </div>

      <div className="history-card">

        <h2>📋 Prescription History</h2>

        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search Patient / Doctor / Medicine"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>

          <thead>

            <tr>

              <th>Patient</th>
              <th>Doctor</th>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Duration</th>
              <th>Notes</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredPrescriptions.length > 0 ? (

              filteredPrescriptions.map((item) => (

                <tr key={item.id}>

                  <td>
                    {item.patient_name}
                  </td>

                  <td>
                    {item.doctor_name}
                  </td>

                  <td>
                    {item.medicine}
                  </td>

                  <td>
                    {item.dosage}
                  </td>

                  <td>
                    {item.duration}
                  </td>

                  <td>
                    {item.notes}
                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deletePrescription(item.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Prescriptions Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Prescription;