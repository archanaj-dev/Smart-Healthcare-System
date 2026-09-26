import { useEffect, useState } from "react";
import "./ManageDoctors.css";

function ManageDoctors() {

  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: ""
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/manage-doctor/list"
    );

    const data = await response.json();

    setDoctors(data);
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const addDoctor = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/manage-doctor/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    if (response.ok) {

      alert("Doctor Added Successfully");

      setForm({
        name: "",
        specialization: "",
        experience: "",
        phone: ""
      });

      loadDoctors();
    }

  };

  const deleteDoctor = async (id) => {

    await fetch(
      `http://127.0.0.1:8000/manage-doctor/delete/${id}`,
      {
        method: "DELETE"
      }
    );

    loadDoctors();
  };

  return (

    <div className="doctor-container">

      <h1>Manage Doctors</h1>

      <form onSubmit={addDoctor}>

        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Doctor
        </button>

      </form>

      <table>

        <thead>

          <tr>

            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Phone</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {doctors.map((doctor) => (

            <tr key={doctor.id}>

              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.experience}</td>
              <td>{doctor.phone}</td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() => deleteDoctor(doctor.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ManageDoctors;