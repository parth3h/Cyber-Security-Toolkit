import React, { useState } from "react";
import axios from "axios";

function IPChecker() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState(null);

  const lookupIP = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/ip-checker", { ip });
      setResult(response.data);
    } catch (error) {
      console.error("Error checking IP:", error);
    }
  };

  return (
    <div>
      <h1>IP Checker</h1>
      <input
        type="text"
        placeholder="Enter IP address"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <button onClick={lookupIP}>Check</button>

      {result && (
        <div style={{ marginTop: "20px", background: "#f4f4f4", padding: "15px", borderRadius: "8px" }}>
          <p><strong>IP:</strong> {result.ip}</p>
          <p><strong>Country:</strong> {result.country}</p>
          <p><strong>Region:</strong> {result.region}</p>
          <p><strong>City:</strong> {result.city}</p>
          <p><strong>ISP:</strong> {result.isp}</p>
          <p><strong>Organization:</strong> {result.org}</p>
          <p><strong>AS:</strong> {result.as}</p>
          <p><strong>Total Reports:</strong> {result.total_reports}</p>
          <p><strong>Abuse Score:</strong> {result.abuse_score}</p>
          <p><strong>Last Reported:</strong> {result.last_reported || "N/A"}</p>
        </div>
      )}
    </div>
  );
}

export default IPChecker;
