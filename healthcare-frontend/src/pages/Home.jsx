import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div>

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo-section">

          <img
            src="/logo.png"
            alt="Smart Healthcare Logo"
            className="logo"
          />

          <h2>Smart Healthcare</h2>

        </div>

        <ul>

          <li onClick={() => navigate("/")}>
            Home
          </li>

          <li>
            Services
          </li>

          <li>
            Doctors
          </li>

          <li>
            Contact
          </li>

          <li onClick={() => navigate("/login")}>
            Login
          </li>

          <li onClick={() => navigate("/register")}>
            Register
          </li>

        </ul>

      </nav>


      {/* ================= HERO SECTION ================= */}

      <section className="hero">

        <div className="hero-center">

          <div className="hero-icon">
            🏥
          </div>

          <h1>
            Smart Healthcare
            <br />
            Management System
          </h1>

          <p>
            AI Powered Healthcare Platform for Better Patient Care
          </p>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section className="services">

        <h2>Our Services</h2>

        <div className="service-container">


          {/* Appointment */}

          <div
            className="card"
            onClick={() => navigate("/appointment")}
            style={{ cursor: "pointer" }}
          >

            <h3>📅 Easy Appointment</h3>

            <p>
              Book appointments with doctors
              quickly and easily.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/appointment");
              }}
            >
              Book Appointment →
            </button>

          </div>


          {/* Health Monitoring */}

          <div
            className="card"
            onClick={() => navigate("/patient")}
            style={{ cursor: "pointer" }}
          >

            <h3>❤️ Health Monitoring</h3>

            <p>
              Track patient health records
              digitally.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/patient");
              }}
            >
              Patient Dashboard →
            </button>

          </div>


          {/* Security */}

          <div className="card">

            <h3>🔒 Secure & Reliable</h3>

            <p>
              Complete privacy and secure
              medical data.
            </p>

          </div>


          {/* ================= DOCTOR DASHBOARD ================= */}

          <div
            className="card"
            onClick={() => navigate("/doctor")}
            style={{ cursor: "pointer" }}
          >

            <h3>👨‍⚕️ Doctor Dashboard</h3>

            <p>
              Manage appointments, prescriptions
              and patient medical reports.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/doctor");
              }}
            >
              Open Doctor Dashboard →
            </button>

          </div>


          {/* ================= PRESCRIPTION ================= */}

          <div
            className="card"
            onClick={() => navigate("/prescription")}
            style={{ cursor: "pointer" }}
          >

            <h3>💊 Prescriptions</h3>

            <p>
              Create and manage patient
              prescriptions.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/prescription");
              }}
            >
              View Prescriptions →
            </button>

          </div>


          {/* ================= MEDICAL REPORTS ================= */}

          <div
            className="card"
            onClick={() => navigate("/report")}
            style={{ cursor: "pointer" }}
          >

            <h3>📄 Medical Reports</h3>

            <p>
              Create and manage patient
              medical reports.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/report");
              }}
            >
              View Reports →
            </button>

          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}

      <section className="why-us">

        <h2>Why Choose Us</h2>

        <div className="why-container">


          <div className="why-card">

            <h3>👨‍⚕️ Expert Doctors</h3>

            <p>
              Experienced doctors available
              anytime.
            </p>

          </div>


          <div className="why-card">

            <h3>🕒 24/7 Support</h3>

            <p>
              Healthcare assistance whenever
              you need.
            </p>

          </div>


          <div className="why-card">

            <h3>🛡 Data Security</h3>

            <p>
              Your medical records are
              securely protected.
            </p>

          </div>


          <div className="why-card">

            <h3>💙 Patient First</h3>

            <p>
              Better healthcare with modern
              technology.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        © 2026 Smart Healthcare Management System.
        All Rights Reserved.

      </footer>

    </div>
  );
}

export default Home;