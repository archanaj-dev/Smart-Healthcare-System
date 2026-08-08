import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "patient",
    dob: "",
    gender: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8001/auth/register",
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

        setMessage(
          "✅ Registration Successful! Redirecting to Login..."
        );

        setForm({
          name: "",
          email: "",
          phone: "",
          password: "",
          role: "patient",
          dob: "",
          gender: ""
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } else {

        setMessage(
          "❌ " + (data.detail || "Registration failed")
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "❌ Backend Server Error. Please make sure FastAPI is running."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="register-page">

      <div className="register-card">

        <div className="register-icon">
          🏥
        </div>

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Register for Smart Healthcare
        </p>

        <form onSubmit={handleRegister}>

          {/* Name */}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Phone */}

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          {/* Password */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            minLength="6"
          />

          {/* Role */}

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >

            <option value="patient">
              Patient
            </option>

            <option value="doctor">
              Doctor
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          {/* Date of Birth */}

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />

          {/* Gender */}

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"
            }

          </button>

        </form>

        {message && (

          <div className="register-message">
            {message}
          </div>

        )}

        <div className="login-link">

          Already have an account?

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </div>

    </div>

  );

}

export default Register;