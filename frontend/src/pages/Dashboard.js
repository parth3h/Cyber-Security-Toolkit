import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const tools = [
  { name: "Port Scanner", path: "/port-scanner", emoji: "🛠️" },
  { name: "Firewall Monitor", path: "/firewall", emoji: "🔥" },
  { name: "IP Checker", path: "/ip-checker", emoji: "🌐" },
  { name: "Software Checker", path: "/software-checker", emoji: "📦" },
  { name: "Malware Scanner", path: "/malware-scanner", emoji: "🧪" },
  { name: "Password Checker", path: "/password-checker", emoji: "🔒" },
];

const Dashboard = () => (
  <div className="dashboard-container">
    <div className="tools-grid">
      {tools.map((tool) => (
        <Link key={tool.name} to={tool.path} className="tool-card">
          <div className="tool-emoji">{tool.emoji}</div>
          <div className="tool-name">{tool.name}</div>
        </Link>
      ))}
    </div>
  </div>
);

export default Dashboard;
