import React, { useState } from "react";
import axios from "axios";

function SoftwareChecker() {
  const [softwareList, setSoftwareList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fetchSoftwareList = () => {
    setLoading(true);
    setError(null);
    setShowResults(false);

    axios
      .get("http://127.0.0.1:5000/software-checker")
      .then((response) => {
        if (response.data && Array.isArray(response.data.software)) {
          setSoftwareList(response.data.software);
          setShowResults(true);
        } else {
          setError("Invalid data format received from server");
        }
      })
      .catch((error) => {
        console.error("Error fetching software list:", error);
        setError("Failed to fetch software list. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Software Checker</h1>

      <button className="btn btn-primary mt-3" onClick={fetchSoftwareList}>
        Check Installed Software
      </button>

      {loading && <p className="mt-3">Loading software list...</p>}

      {error && <p className="mt-3 text-danger">{error}</p>}

      {showResults && (
        <div className="mt-4">
          {softwareList.length > 0 ? (
            softwareList.map((software, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "12px 16px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <strong style={{ fontSize: "16px" }}>{software.name}</strong>
                <div style={{ color: "#555" }}>Version: {software.version}</div>
              </div>
            ))
          ) : (
            <p>No software found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SoftwareChecker;
