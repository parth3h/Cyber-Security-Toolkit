import React, { useState } from "react";
import axios from "axios";

const PasswordChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(null);

  const checkPassword = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/password-checker", { password });
      setStrength(response.data);
    } catch (error) {
      console.error("Error checking password:", error);
    }
  };

  const getColor = (level) => {
    if (level === "Strong") return "green";
    if (level === "Medium") return "orange";
    return "red";
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ marginBottom: "10px" }}>🔐 Password Strength Checker</h2>
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "250px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      <button
        onClick={checkPassword}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "lime",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Check
      </button>

      {strength && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          🔍 Password Strength:{" "}
          <strong style={{ color: getColor(strength.password_strength) }}>
            {strength.password_strength}
          </strong>
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;
