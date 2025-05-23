import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GetAllComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [addresses, setAddresses] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("law_token");
    window.location.reload();
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    // Fetch addresses for all complaints
    async function fetchAddresses() {
      const newAddresses = {};
      for (const c of complaints) {
        if (c.incidentLocationLat && c.incidentLocationLong) {
          newAddresses[c.complaintId] = await getAddressFromLatLng(
            c.incidentLocationLat,
            c.incidentLocationLong
          );
        }
      }
      setAddresses(newAddresses);
    }
    if (complaints.length > 0) fetchAddresses();
  }, [complaints]);

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

  // Update complaint status
  async function handleStatusChange(complaintId, newStatus) {
    try {
      await axios.put(
        `http://localhost:9090/api/complaints/${complaintId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchComplaints();
    } catch (error) {
      alert("Failed to update status");
    }
  }

  async function getAddressFromLatLng(lat, lng) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon: lng,
            format: "json"
          }
        }
      );
      return response.data.display_name;
    } catch (error) {
      return `${lat}, ${lng}`;
    }
  }

  // --- Styling with animation ---
  const mainBg = {
    minHeight: "100vh",
    background: "linear-gradient(120deg, #f8fafc 0%, #e3f0ff 100%)",
    padding: "0",
    margin: "0",
    fontFamily: "Segoe UI, Arial, sans-serif"
  };

  const header = {
    width: "100%",
    background: "linear-gradient(90deg, #1976d2 60%, #21cbf3 100%)",
    color: "#fff",
    padding: "32px 0 22px 0",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "2.2rem",
    letterSpacing: "1.5px",
    boxShadow: "0 4px 24px 0 rgba(31,38,135,0.09)",
    marginBottom: "10px",
    borderBottomLeftRadius: "24px",
    borderBottomRightRadius: "24px"
  };

  const container = {
    maxWidth: 1300,
    margin: "36px auto",
    padding: "0 1.5rem"
  };

  const cardGrid = {
    display: "flex",
    flexWrap: "wrap",
    gap: "2.5rem",
    justifyContent: "flex-start"
  };

  const card = {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "18px",
    boxShadow: "0 8px 32px #1976d233",
    padding: "2.2rem 2rem 1.7rem 2rem",
    minWidth: 340,
    maxWidth: 420,
    flex: "1 1 360px",
    borderTop: "5px solid #1976d2",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    marginBottom: "1.5rem",
    position: "relative",
    overflow: "hidden",
    animation: "fadeInUp 0.7s cubic-bezier(.39,.575,.56,1.000) both",
    transition: "box-shadow 0.3s, transform 0.3s, border-color 0.3s"
  };

  const label = {
    color: "#1976d2",
    fontWeight: 700,
    fontSize: "1.07rem",
    minWidth: 120,
    display: "inline-block",
    letterSpacing: "0.2px"
  };

  const value = {
    color: "#222",
    fontWeight: 400,
    marginLeft: 6,
    wordBreak: "break-word",
    fontSize: "1.07rem"
  };

  const badge = (status) => ({
    display: "inline-block",
    padding: "4px 16px",
    borderRadius: "12px",
    background: status === "Pending"
      ? "linear-gradient(90deg, #ffb3b3 0%, #ff5252 100%)"
      : status === "Resolved"
      ? "linear-gradient(90deg, #b2f7cc 0%, #388e3c 100%)"
      : "linear-gradient(90deg, #ffe082 0%, #ff9800 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.98rem",
    marginLeft: 8,
    boxShadow: "0 1px 6px #0001"
  });

  const downloadBtn = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "linear-gradient(90deg, #21cbf3 0%, #1976d2 100%)",
    color: "#fff",
    fontWeight: 700,
    border: "none",
    borderRadius: "24px",
    padding: "10px 32px",
    marginLeft: 12,
    marginTop: 4,
    fontSize: "1rem",
    boxShadow: "0 2px 8px #1976d233",
    textDecoration: "none",
    letterSpacing: "0.5px",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.2s, box-shadow 0.2s"
  };

  const ribbon = {
    position: "absolute",
    top: "-14px",
    right: "-48px",
    background: "linear-gradient(90deg, #21cbf3 0%, #1976d2 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.95rem",
    padding: "6px 48px",
    transform: "rotate(18deg)",
    boxShadow: "0 2px 8px #1976d233"
  };

  const dotsBg = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0,
    pointerEvents: "none",
    background: "radial-gradient(circle at 20% 30%, #1976d211 2%, transparent 60%), radial-gradient(circle at 80% 70%, #21cbf311 2%, transparent 60%)"
  };

  return (
    <div style={mainBg}>
      <div style={dotsBg}></div>
      <div style={header}>
        <span style={{ letterSpacing: "2px" }}>All Complaints (Law Enforcement)</span>
        <span style={{
          float: "right",
          fontSize: "1.1rem",
          fontWeight: 400,
          marginRight: "2.5rem",
          color: "#e3f0ff"
        }}>
          {new Date().toLocaleDateString()}
        </span>
      </div>
      <div style={container}>
        <button onClick={handleLogout} style={{
          background: "linear-gradient(90deg, #d32f2f 60%, #ff6f00 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "12px 34px",
          fontWeight: 700,
          fontSize: "1.08rem",
          cursor: "pointer",
          margin: "18px 0 36px 0",
          boxShadow: "0 2px 8px #d32f2f22",
          transition: "background 0.2s, transform 0.2s",
          outline: "none"
        }}>Log Out</button>
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "18px",
          gap: 18
        }}>
          <input
            type="text"
            placeholder="🔍 Search by title or status..."
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid #1976d2",
              fontSize: "1.08rem",
              outline: "none",
              width: 320,
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
          <span style={{ color: "#1976d2", fontWeight: 600, fontSize: "1.08rem" }}>
            Total: {complaints.length}
          </span>
        </div>
        {complaints.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center", fontSize: "1.15rem" }}>No complaints found.</p>
        ) : (
          <div style={cardGrid}>
            {complaints.map((complaint, idx) => (
              <div
                key={complaint.complaintId || idx}
                style={card}
                onMouseEnter={e => Object.assign(e.currentTarget.style, {
                  boxShadow: "0 16px 48px #1976d244, 0 2px 8px #1976d211",
                  transform: "translateY(-8px) scale(1.035)",
                  borderTop: "5px solid #21cbf3"
                })}
                onMouseLeave={e => Object.assign(e.currentTarget.style, card)}
              >
                {complaint.status === "Pending" && (
                  <div style={ribbon}>NEW</div>
                )}
                <h3 style={{
                  margin: "0 0 1.2rem 0",
                  color: "#1976d2",
                  fontWeight: 800,
                  fontSize: "1.35rem",
                  letterSpacing: "0.7px",
                  borderBottom: "1px solid #e3e8ee",
                  paddingBottom: "0.5rem"
                }}>
                  {complaint.title || "Complaint"}
                </h3>
                <div>
                  <span style={label}>Description:</span>
                  <span style={value}>{complaint.description}</span>
                </div>
                <div>
                  <span style={label}>Status:</span>
                  <select
                    value={complaint.status || "Pending"}
                    style={{
                      ...badge(complaint.status),
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      fontWeight: 700,
                      fontSize: "0.98rem",
                      background: "none",
                      cursor: "pointer"
                    }}
                    onChange={e => handleStatusChange(complaint.complaintId, e.target.value)}
                  >
                    <option value="Pending" style={{ color: "#ff5252" }}>Pending</option>
                    <option value="Resolved" style={{ color: "#388e3c" }}>Resolved</option>
                    <option value="Rejected" style={{ color: "#ff9800" }}>Rejected</option>
                  </select>
                </div>
                <div>
                  <span style={label}>Supporting Document:</span>
                  {complaint.supportingDocument ? (
                    <a
                      href={`http://localhost:9090/api/complaints/${complaint.uuid}/download`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={downloadBtn}
                      onMouseEnter={e => {
                        e.target.style.background = "linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)";
                        e.target.style.transform = "scale(1.09)";
                        e.target.style.boxShadow = "0 8px 32px #1976d244";
                      }}
                      onMouseLeave={e => {
                        e.target.style.background = "linear-gradient(90deg, #21cbf3 0%, #1976d2 100%)";
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 2px 8px #1976d233";
                      }}
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <path fill="#fff" d="M10 2a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 1 1 5.707 9.293L8 11.586V3a1 1 0 0 1 1-1Z"/>
                        <rect x="3" y="16" width="14" height="2" rx="1" fill="#fff" opacity="0.6"/>
                      </svg>
                      Download
                    </a>
                  ) : (
                    <span style={value}>No file uploaded</span>
                  )}
                </div>
                <div>
                  <span style={label}>Incident Location:</span>
                  <span style={value}>
                    {addresses[complaint.complaintId] || `${complaint.incidentLocationLat}, ${complaint.incidentLocationLong}`}
                  </span>
                </div>
                <div>
                  <span style={label}>Created At:</span>
                  <span style={value}>{complaint.createdAt ? new Date(complaint.createdAt).toLocaleString() : ""}</span>
                </div>
                <div>
                  <span style={label}>Witness ID:</span>
                  <span style={value}>{complaint.witnessId}</span>
                </div>
                <div>
                  <span style={label}>Assigned To ID:</span>
                  <span style={value}>{complaint.assignedToId}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer
        style={{
          width: "100%",
          background: "#fff",
          color: "#888",
          textAlign: "center",
          padding: "12px 0 8px 0",
          fontSize: "0.97rem",
          letterSpacing: "0.5px",
          borderTop: "1px solid #e0e0e0",
          marginTop: "auto"
        }}
      >
        © {new Date().getFullYear()} Citizen Complaint Portal
      </footer>
    </div>
  );
}