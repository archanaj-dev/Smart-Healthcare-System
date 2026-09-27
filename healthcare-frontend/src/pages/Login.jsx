import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await fetch(
        "https://smart-healthcare-system-tkm2.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      console.log("Status:", response.status);

      const data = await response.json();

      console.log("Response:", data);


      if (response.ok) {

        localStorage.setItem(
          "userEmail",
          email
        );

        setMessage("✅ Login Successful");

        setTimeout(() => {
          navigate("/patient");
        }, 1000);


      } else {

        setMessage(
          "❌ Invalid Email or Password"
        );

      }


    } catch (error) {

      console.error(error);

      setMessage(
        "❌ Backend Server Error"
      );

    }

  };


  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>


        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        <button onClick={handleLogin}>
          Login
        </button>


        {message && (
          <p className="login-message">
            {message}
          </p>
        )}


        <p>
          Don't have an account?{" "}

          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Register
          </span>

        </p>


      </div>

    </div>

  );

}


export default Login;