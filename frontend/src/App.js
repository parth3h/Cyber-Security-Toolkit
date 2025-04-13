import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import PortScanner from "./pages/PortScanner";
import Firewall from "./pages/Firewall";
import IPChecker from "./pages/IPChecker";
import SoftwareChecker from "./pages/SoftwareChecker";
import MalwareScanner from "./pages/MalwareScanner";
import PasswordChecker from "./pages/PasswordChecker";
import About from "./pages/About"; // ✅ Added
import Contact from "./pages/Contact"; // ✅ Added
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className="app-layout" style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header toggleDarkMode={toggleDarkMode} isDark={darkMode} />
          <main style={{ padding: "20px", flex: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/port-scanner" element={<PortScanner />} />
              <Route path="/firewall" element={<Firewall />} />
              <Route path="/ip-checker" element={<IPChecker />} />
              <Route path="/software-checker" element={<SoftwareChecker />} />
              <Route path="/malware-scanner" element={<MalwareScanner />} />
              <Route path="/password-checker" element={<PasswordChecker />} />
              <Route path="/about" element={<About />} /> {/* ✅ Added */}
              <Route path="/contact" element={<Contact />} /> {/* ✅ Added */}
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
