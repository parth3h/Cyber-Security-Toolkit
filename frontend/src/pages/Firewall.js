import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Firewall() {
  const [logs, setLogs] = useState([]);
  const [direction, setDirection] = useState("incoming");
  const [blockedPorts, setBlockedPorts] = useState("");
  const [allowedPorts, setAllowedPorts] = useState("");
  const [specificPort, setSpecificPort] = useState("");
  const [error, setError] = useState(null);
  const [monitoring, setMonitoring] = useState(false);
  const logsEndRef = useRef(null);

  useEffect(() => {
    let interval;
    if (monitoring) {
      interval = setInterval(() => {
        axios.get("http://127.0.0.1:5000/firewall/logs")
          .then(response => setLogs(response.data.logs))
          .catch(error => console.error("Log fetch error:", error));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [monitoring]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const startMonitoring = () => {
    setError(null);
    setLogs([]);

    const requestData = {
      direction,
      blocked_ports: blockedPorts ? blockedPorts.split(",").map(Number) : [],
      allowed_ports: allowedPorts ? allowedPorts.split(",").map(Number) : null,
      specific_port: specificPort ? Number(specificPort) : null
    };

    axios.post("http://127.0.0.1:5000/firewall/monitor", requestData)
      .then(response => {
        setLogs(response.data.logs);
        setMonitoring(true);
      })
      .catch(error => {
        setError("Error starting firewall monitoring.");
        console.error("Monitoring error:", error);
      });
  };

  const stopMonitoring = () => {
    axios.post("http://127.0.0.1:5000/firewall/stop")
      .then(() => {
        setMonitoring(false);
        setError(null);
      })
      .catch(error => {
        setError("Error stopping firewall monitoring.");
        console.error("Stop error:", error);
      });
  };

  const handleDownloadLogs = () => {
    const content = logs.map(log =>
      `Src: ${log.src_ip} → Dst: ${log.dst_ip} | Port: ${log.port} | Status: ${log.status}${log.reason ? ` | Reason: ${log.reason}` : ""}`
    ).join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "firewall_logs.txt";
    link.click();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h1>🔥 Firewall Monitor</h1>

      <label>Direction: </label>
      <select value={direction} onChange={e => setDirection(e.target.value)}>
        <option value="incoming">Incoming</option>
        <option value="outgoing">Outgoing</option>
      </select>

      <br /><br />

      <label>Blocked Ports (comma-separated): </label>
      <input type="text" value={blockedPorts} onChange={e => setBlockedPorts(e.target.value)} />

      <br /><br />

      <label>Allowed Ports (comma-separated): </label>
      <input type="text" value={allowedPorts} onChange={e => setAllowedPorts(e.target.value)} />

      <br /><br />

      <label>Specific Port (optional): </label>
      <input type="text" value={specificPort} onChange={e => setSpecificPort(e.target.value)} />

      <br /><br />

      <button
        onClick={startMonitoring}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: monitoring ? "gray" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: monitoring ? "not-allowed" : "pointer",
          marginTop: "10px",
          marginRight: "10px"
        }}
        disabled={monitoring}
      >
        {monitoring ? "Monitoring Started ✅" : "Start Monitoring 🔍"}
      </button>

      {monitoring && (
        <button
          onClick={stopMonitoring}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Stop Monitoring 🛑
        </button>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {monitoring && (
        <p style={{ color: "green", fontWeight: "bold", marginTop: "10px" }}>
          <span style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            backgroundColor: "green",
            borderRadius: "50%",
            marginRight: "8px",
            animation: "pulse 1.5s infinite"
          }}></span>
          Monitoring is active. Watching traffic...
        </p>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>

      <h2 style={{ marginTop: "30px" }}>📜 Logs:</h2>

      <div style={{
        maxHeight: "400px",
        overflowY: "auto",
        margin: "0 auto",
        padding: "10px",
        width: "90%",
        maxWidth: "850px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fafafa"
      }}>
        <ul style={{ paddingLeft: "0", listStyleType: "none", margin: 0 }}>
          {logs.map((log, index) => (
            <li key={index} style={{
              marginBottom: "8px",
              padding: "10px",
              borderLeft: log.status === "blocked" ? "4px solid red" : "4px solid #4caf50",
              backgroundColor: "#fff",
              textAlign: "left",
              borderRadius: "4px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
            }}>
              <strong>Src:</strong> {log.src_ip} →
              <strong> Dst:</strong> {log.dst_ip} |
              <strong> Port:</strong> {log.port} |
              <strong> Status:</strong> {log.status}
              {log.reason && <> | <strong>Reason:</strong> {log.reason}</>}
            </li>
          ))}
          <div ref={logsEndRef} />
        </ul>
      </div>

      {logs.length > 0 && (
        <button
          onClick={handleDownloadLogs}
          style={{
            marginTop: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ⬇️ Download Logs
        </button>
      )}
    </div>
  );
}

export default Firewall;
