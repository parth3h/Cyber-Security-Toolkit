import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src="/assets/logo.png" alt="Logo" className="logo" />

      <nav className="nav-links">
        <Link to="/"><p className="dashboard">Dashboard</p></Link>
        <Link to="/port-scanner"><p>Port Scanner</p></Link>
        <Link to="/firewall"><p>Firewall</p></Link>
        <Link to="/ip-checker"><p>IP Checker</p></Link>
        <Link to="/software-checker"><p>Software Checker</p></Link>
        <Link to="/malware-scanner"><p>Malware Scanner</p></Link>
        <Link to="/password-checker"><p>Password Checker</p></Link>
      </nav>
    </div>
  );
};

export default Sidebar;
