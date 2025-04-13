import React, { useState } from "react";
import axios from "axios";
import "./PortScanner.css";

function PortScanner() {
  const [target, setTarget] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const scanPorts = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/port-scanner", { target });
      setResult(response.data);
    } catch (error) {
      console.error("Error scanning ports:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (state) => {
    switch (state.toLowerCase()) {
      case "open":
        return "🟢";
      case "filtered":
        return "🟡";
      default:
        return "🔴";
    }
  };

  return (
    <div className="port-scanner-container">
      <h1>Port Scanner</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter target IP"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button onClick={scanPorts} disabled={loading}>
          {loading ? "Scanning..." : "Scan"}
        </button>
      </div>

      {loading && <p className="loading-text">Scanning ports, please wait...</p>}

      {result && result.open_ports && (
        <div className="results">
          <h2>Scan Results</h2>
          <table>
            <thead>
              <tr>
                <th>Port</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {result.open_ports.map((item, index) => (
                <tr key={index}>
                  <td>{item.port}</td>
                  <td>{item.service}</td>
                  <td>{getStatusIcon(item.state)} {item.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PortScanner;
