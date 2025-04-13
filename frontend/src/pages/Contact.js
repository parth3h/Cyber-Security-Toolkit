import React from "react";

const Contact = () => (
  <div className="container mt-4" style={{ padding: "20px" }}>
    <h2>Contact Us</h2>
    <p>
      Got questions or feedback? Reach out to us anytime using the details below.
    </p>

    <div style={{ marginTop: "25px" }}>
      <h4>📍 Address</h4>
      <p>CyberSecurity ToolKit HQ<br />Parul University, Waghodia Road, Vadodara, Gujarat, India - 391760</p>

      <h4>☎️ Phone</h4>
      <p>+91 98765 43210</p>

      <h4>📧 Email</h4>
      <p>
        <a href="mailto:support@cybertoolkit.com">support@cybertoolkit.com</a>
      </p>

      <h4>🗺️ Our Location</h4>
      <div style={{ marginTop: "10px", borderRadius: "8px", overflow: "hidden", maxWidth: "100%" }}>
        <iframe
          title="Parul University Exact Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1523963042627!2d73.2238972!3d22.299419599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8df9f49c2ef%3A0x6e8cc79dfd9e609f!2sParul%20University!5e0!3m2!1sen!2sin!4v1712739369243!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
);

export default Contact;
