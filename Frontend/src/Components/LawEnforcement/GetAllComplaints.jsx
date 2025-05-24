import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GetAllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("law_token");
    window.location.reload();
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    try {
      const api = "http://localhost:9090/api/complaints/all";
      const response = await axios.get(api, {
        withCredentials: true
      });
      setComplaints(response.data);
      setAllComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  }

  // --- Styling ---
  const mainBg = {
    minHeight: "100vh",
    background: "#f6f8fa",
    padding: 0,
    margin: 0,
    fontFamily: "Segoe UI, Arial, sans-serif"
  };

  const navbar = {
    width: "100%",
    background: "#1976d2",
    color: "#fff",
    padding: "0",
    margin: 0,
    boxShadow: "0 2px 8px #1976d233",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 200
  };

  const navLeft = {
    display: "flex",
    alignItems: "center",
    padding: "0 2.5rem",
    height: "70px"
  };

  const navTitle = {
    fontWeight: 700,
    fontSize: "1.45rem",
    letterSpacing: "1px",
    color: "#fff",
    marginRight: 24
  };

  const navDate = {
    fontSize: "1rem",
    fontWeight: 400,
    color: "#e3f0ff"
  };

  const navRight = {
    display: "flex",
    alignItems: "center",
    padding: "0 2.5rem"
  };

  const logoutBtn = {
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "9px 24px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    marginLeft: 18,
    boxShadow: "0 1px 4px #d32f2f11",
    transition: "background 0.2s"
  };

  const container = {
    maxWidth: 1100,
    margin: "36px auto 0 auto",
    padding: "0 1rem"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 12px #00000010",
    overflow: "hidden"
  };

  const thStyle = {
    background: "#f4f6fb",
    color: "#1976d2",
    fontWeight: 700,
    fontSize: "1rem",
    padding: "14px 10px",
    borderBottom: "2px solid #e0e0e0",
    textAlign: "center",
    letterSpacing: "0.5px"
  };

  const tdStyle = {
    padding: "12px 10px",
    borderBottom: "1px solid #e0e0e0",
    fontSize: "1rem",
    textAlign: "center",
    color: "#222",
    verticalAlign: "top",
    cursor: "pointer",
    background: "#fff"
  };

  const idStyle = {
    ...tdStyle,
    color: "#1976d2",
    fontWeight: 700,
    fontFamily: "monospace"
  };

  return (
    <div style={mainBg}>
      <nav style={navbar}>
        <div style={navLeft}>
          <span style={navTitle}>All Complaints (Law Enforcement)</span>
          <span style={navDate}>{new Date().toLocaleDateString()}</span>
        </div>
        <div style={navRight}>
          <button onClick={handleLogout} style={logoutBtn}>
            Log Out
          </button>
        </div>
      </nav>
      <div style={container}>
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "18px",
          gap: 14
        }}>
          <input
            type="text"
            placeholder="Search by title or status..."
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #1976d2",
              fontSize: "1rem",
              outline: "none",
              width: 260,
              marginRight: 8
            }}
            onChange={e => {
              const val = e.target.value.toLowerCase();
              setComplaints(
                allComplaints.filter(
                  c =>
                    c.title?.toLowerCase().includes(val) ||
                    c.status?.toLowerCase().includes(val)
                )
              );
            }}
          />
          <span style={{ color: "#1976d2", fontWeight: 500, fontSize: "1rem" }}>
            Total: {complaints.length}
          </span>
        </div>
        {complaints.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center", fontSize: "1.08rem" }}>No complaints found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Complaint ID</th>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Created</th>
                  <th style={thStyle}>Assigned To</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint, idx) => (
                  <tr
                    key={complaint.complaintId || idx}
                    style={{
                      transition: "background 0.15s",
                      cursor: "pointer",
                      background: idx % 2 === 0 ? "#f9fbfd" : "#fff"
                    }}
                    onClick={() => navigate(`/getDetailedComplaint/${complaint.uuid}`)}
                  >
                    <td style={idStyle}>{complaint.uuid}</td>
                    <td style={tdStyle}>{complaint.title || "Complaint"}</td>
                    <td style={{
                      ...tdStyle,
                      color:
                        complaint.status === "Rejected"
                          ? "#d32f2f"
                          : complaint.status === "Solved"
                          ? "#388e3c"
                          : "#1976d2",
                      fontWeight: 600
                    }}>
                      {complaint.status}
                    </td>
                    <td style={tdStyle}>
                      {complaint.createdAt
                        ? new Date(complaint.createdAt).toLocaleString()
                        : ""}
                    </td>
                    <td style={tdStyle}>{complaint.assignedToId || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <footer
        style={{
          width: "100%",
          background: "#fff",
          color: "#888",
          textAlign: "center",
          padding: "10px 0 6px 0",
          fontSize: "0.97rem",
          letterSpacing: "0.5px",
          borderTop: "1px solid #e0e0e0",
          position: "fixed",
          left: 0,
          bottom: 0,
          zIndex: 100
        }}
      >
        © {new Date().getFullYear()} Citizen Complaint Portal
      </footer>
    </div>
  );
}















