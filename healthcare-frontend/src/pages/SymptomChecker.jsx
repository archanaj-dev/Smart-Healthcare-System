import { useState } from "react";
import "./SymptomChecker.css";

function SymptomChecker() {

  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState("");

  const checkSymptoms = () => {

    const text = symptom.toLowerCase();

    if (text.includes("fever")) {
      setResult("🤒 Possible Viral Fever. Drink plenty of water and consult a doctor if fever continues.");
    }

    else if (text.includes("headache")) {
      setResult("🤕 Possible Migraine or Stress. Take adequate rest and stay hydrated.");
    }

    else if (text.includes("cold")) {
      setResult("🤧 Common Cold detected. Take warm fluids and rest.");
    }

    else if (text.includes("cough")) {
      setResult("😷 Possible Throat Infection. Consult a physician if it persists.");
    }

    else if (text.includes("stomach")) {
      setResult("🤢 Possible Gastric Problem. Avoid spicy food and drink more water.");
    }

    else {
      setResult("⚠ Please consult a doctor for proper diagnosis.");
    }

  };

  return (

    <div className="symptom-page">

      <div className="symptom-card">

        <h1>🤖 AI Symptom Checker</h1>

        <p>
          Enter your symptoms below to get a basic health suggestion.
        </p>

        <textarea
          rows="6"
          placeholder="Example: Fever, headache and cough..."
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
        />

        <button onClick={checkSymptoms}>
          Check Symptoms
        </button>

        {result && (

          <div className="result-box">

            <h3>Result</h3>

            <p>{result}</p>

          </div>

        )}

      </div>

    </div>

  );

}

export default SymptomChecker;