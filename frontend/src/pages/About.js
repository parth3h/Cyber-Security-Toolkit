import React from "react";

const About = () => (
  <div className="container mt-4" style={{ padding: "20px" }}>
    <h2>About Us</h2>
    <p>
      The <strong>CyberSecurity ToolKit</strong> was built to empower users with accessible,
      effective, and easy-to-use tools for everyday cyber defense. Whether you're a
      developer, IT professional, student, or just someone who wants to stay secure
      online — this suite of tools was made for you.
    </p>

    <h3 style={{ marginTop: "30px" }}>Our Tools</h3>

    <ul style={{ listStyleType: "square", paddingLeft: "20px" }}>
      <li style={{ marginBottom: "10px" }}>
        <strong>🔍 Port Scanner:</strong> Scan any IP address to detect open ports and
        potential entry points — useful for network diagnostics and threat analysis.
      </li>
      <li style={{ marginBottom: "10px" }}>
        <strong>🛡️ Firewall Checker:</strong> Check if your firewall is functioning and
        blocking suspicious traffic. This ensures unauthorized access is kept at bay.
      </li>
      <li style={{ marginBottom: "10px" }}>
        <strong>🌐 IP Checker:</strong> Quickly verify your public IP and get
        geolocation data — helpful for privacy checks and online identity tracking.
      </li>
      <li style={{ marginBottom: "10px" }}>
        <strong>💻 Software Checker:</strong> Detect outdated or vulnerable software
        installed on your system to avoid known exploits and ensure security patches are applied.
      </li>
      <li style={{ marginBottom: "10px" }}>
        <strong>🦠 Malware Scanner:</strong> Scan files and directories for signs of
        malicious code or behaviors. Essential for preventing infections and data theft.
      </li>
      <li style={{ marginBottom: "10px" }}>
        <strong>🔐 Password Strength Checker:</strong> Test the strength of your
        passwords using modern entropy models to avoid weak or easily guessable credentials.
      </li>
    </ul>

    <p style={{ marginTop: "20px" }}>
      This toolkit combines simplicity with power — giving you hands-on cybersecurity
      features without the complexity of enterprise systems.
    </p>
  </div>
);

export default About;
