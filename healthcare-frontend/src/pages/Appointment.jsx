import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointment.css";

function Appointment() {

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patient_name: "",
    email: "",
    phone: "",
    doctor: "",
    appointment_date: "",
    appointment_time: "",
    problem: ""
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {

    try {

      const response = await fetch(
        "https://smart-healthcare-system-tkm2.onrender.com/doctor/list"
      );

      const data = await response.json();

      setDoctors(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const bookAppointment = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://smart-healthcare-system-tkm2.onrender.com/appointment/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage("✅ Appointment Booked Successfully!");

        setForm({
          patient_name: "",
          email: "",
          phone: "",
          doctor: "",
          appointment_date: "",
          appointment_time: "",
          problem: ""
        });

        setTimeout(() => {
          navigate("/patient");
        }, 2000);

      } else {

        setMessage("❌ " + data.detail);

      }

    } catch (error) {

      console.log(error);

      setMessage("❌ Backend Server Error");

    }

  };

  return (

    <div className="appointment-page">

      <div className="appointment-card">

        <h1>📅 Book Appointment</h1>

        <p>
          Fill in the details below to schedule your appointment.
        </p>

        <form onSubmit={bookAppointment}>

          <input
            type="text"
            name="patient_name"
            placeholder="Patient Name"
            value={form.patient_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <select
            name="doctor"
            value={form.doctor}
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
            type="date"
            name="appointment_date"
            value={form.appointment_date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="appointment_time"
            value={form.appointment_time}
            onChange={handleChange}
            required
          />

          <textarea
            name="problem"
            rows="4"
            placeholder="Describe your health problem..."
            value={form.problem}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Book Appointment
          </button>

        </form>

        {message && (

          <div className="message">

            {message}

          </div>

        )}

      </div>

    </div>

  );

}

export default Appointment;