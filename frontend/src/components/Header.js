import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ toggleDarkMode, isDark }) => (
  <header className="header">
    <div className="header-left">
      <h2 className="main-title">🔐 CyberSecurity ToolKit</h2>
      <p className="tagline">A Suite of Tools for Everyday Cyber Defense</p>
    </div>

    <div className="header-buttons">
      <Link to="/about" className="nav-link">About Us</Link>
      <Link to="/contact" className="nav-link">Contact Us</Link>
      <button className="toggle-button" onClick={toggleDarkMode}>
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  </header>
);

export default Header;
