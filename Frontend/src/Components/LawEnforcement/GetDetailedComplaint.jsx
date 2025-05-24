import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- Layout Styles ---
const pageBg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #e3f0ff 0%, #f6f8fa 100%)",
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
const headerBar = {
  width: "100%",
  background: "#1976d2",
  color: "#fff",
  padding: "28px 0 18px 0",
  textAlign: "center",
  fontWeight: 700,
  fontSize: "2.2rem",
  letterSpacing: "1px",
  borderBottom: "1px solid #e0e0e0",
  boxShadow: "0 2px 12px #1976d233",
  marginBottom: 0
};
const containerStyle = {
  maxWidth: 820,
  margin: "48px auto 32px auto",
  background: "linear-gradient(120deg, #f8fbff 60%, #e3f0ff 100%)",
  borderRadius: 22,
  boxShadow: "0 8px 32px #1976d220, 0 1.5px 8px #1976d233",
  padding: "2.8rem 3.2rem 2.5rem 3.2rem",
  border: "1px solid #e0e0e0",
  transition: "box-shadow 0.2s",
  position: "relative"
};
const dividerStyle = {
  border: "none",
  borderTop: "1px solid #e0e0e0",
  margin: "28px 0"
};
const backBtnStyle = {
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "10px 32px",
  fontWeight: 600,
  fontSize: "1.08rem",
  cursor: "pointer",
  marginBottom: 30,
  marginRight: 14,
  boxShadow: "0 1px 4px #1976d211",
  transition: "background 0.2s"
};
const labelStyle = {
  fontWeight: 600,
  color: "#1976d2",
  minWidth: 180,
  display: "inline-block",
  marginBottom: 10,
  fontSize: "1.12rem",
  verticalAlign: "top"
};
const valueStyle = {
  color: "#222",
  fontWeight: 400,
  fontSize: "1.12rem",
  wordBreak: "break-word"
};
const selectStyle = {
  ...valueStyle,
  padding: "8px 18px",
  borderRadius: "6px",
  border: "1.5px solid #1976d2",
  fontWeight: 600,
  fontSize: "1.08rem",
  background: "#f4f6fb",
  color: "#1976d2",
  outline: "none",
  marginLeft: 12,
  marginBottom: 0,
  cursor: "pointer",
  width: "auto",
  minWidth: 140
};
const saveBtnStyle = {
  background: "#388e3c",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 24px",
  fontWeight: 600,
  fontSize: "1.08rem",
  cursor: "pointer",
  marginLeft: 16,
  marginBottom: 0,
  boxShadow: "0 1px 4px #388e3c22",
  transition: "background 0.2s"
};
const badge = (status) => ({
  display: "inline-block",
  padding: "4px 18px",
  borderRadius: "12px",
  background: status === "Pending"
    ? "#fff3cd"
    : status === "Accepted"
    ? "#d4edda"
    : status === "Solved"
    ? "#e3f2fd"
    : status === "Rejected"
    ? "#f8d7da"
    : "#e2e3e5",
  color:
    status === "Rejected"
      ? "#d32f2f"
      : status === "Solved"
      ? "#388e3c"
      : status === "Accepted"
      ? "#388e3c"
      : status === "In-Progress"
      ? "#1976d2"
      : "#b8860b",
  fontWeight: 700,
  fontSize: "1.08rem",
  marginLeft: 12,
  border: "none",
  verticalAlign: "middle",
  boxShadow: "0 1px 4px #1976d211"
});
const rowStyle = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: 22
};
const docLinkStyle = {
  color: "#1976d2",
  textDecoration: "underline",
  fontWeight: 600,
  fontSize: "1.08rem"
};
const footerStyle = {
  width: "100%",
  background: "#fff",
  color: "#888",
  textAlign: "center",
  padding: "16px 0 10px 0",
  fontSize: "1.05rem",
  letterSpacing: "0.5px",
  borderTop: "1px solid #e0e0e0",
  marginTop: 40
};
const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  marginTop: 10,
  marginBottom: 10,
  background: "rgba(255,255,255,0.95)",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 2px 12px #1976d211"
};
const thStyle = {
  textAlign: "left",
  background: "#eaf3fb",
  color: "#1976d2",
  fontWeight: 700,
  fontSize: "1.09rem",
  padding: "15px 14px",
  borderBottom: "1.5px solid #e0e0e0",
  minWidth: 160,
  letterSpacing: "0.5px"
};
const tdStyle = {
  padding: "15px 14px",
  borderBottom: "1px solid #e0e0e0",
  fontSize: "1.09rem",
  color: "#222",
  verticalAlign: "top",
  background: "rgba(255,255,255,0.97)"
};

const GetDetailedComplaint = () => {
  const { uuid } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [address, setAddress] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchComplaint() {
      try {
        const res = await axios.get(`http://localhost:9090/api/complaints/${uuid}`, {
          withCredentials: true
        });
        setComplaint(res.data);
        setEditStatus(res.data.status);

        // Fetch address if lat/lng present
        if (res.data.incidentLocationLat && res.data.incidentLocationLong) {
          const addrRes = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
              params: {
                lat: res.data.incidentLocationLat,
                lon: res.data.incidentLocationLong,
                format: "json"
              }
            }
          );
          setAddress(addrRes.data.display_name);
        }
      } catch (err) {
        setComplaint(null);
      }
    }
    fetchComplaint();
  }, [uuid]);

  const handleStatusChange = (e) => {
    setEditStatus(e.target.value);
    setStatusMsg("");
  };

  const handleStatusSave = async () => {
    setStatusLoading(true);
    setStatusMsg("");
    try {
      await axios.put(
        `http://localhost:9090/api/complaints/${uuid}/status`,
        { status: editStatus },
        { withCredentials: true }
      );
      setComplaint((prev) => ({ ...prev, status: editStatus }));
      setStatusMsg("Status updated successfully.");
    } catch (err) {
      setStatusMsg("Failed to update status.");
    }
    setStatusLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("law_token");
    window.location.reload();
  };

  if (complaint === null) {
    return (
      <div style={pageBg}>
        <nav style={navbar}>
          <div style={navLeft}>
            <span style={navTitle}>Complaint Details</span>
            <span style={navDate}>{new Date().toLocaleDateString()}</span>
          </div>
          <div style={navRight}>
            <button onClick={handleLogout} style={logoutBtn}>
              Log Out
            </button>
          </div>
        </nav>
        <div style={{ textAlign: "center", marginTop: 120, color: "#888", fontSize: "1.3rem" }}>
          Loading or complaint not found.
        </div>
      </div>
    );
  }

  return (
    <div style={pageBg}>
      <nav style={navbar}>
        <div style={navLeft}>
          <span style={navTitle}>Complaint Details</span>
          <span style={navDate}>{new Date().toLocaleDateString()}</span>
        </div>
        <div style={navRight}>
          <button onClick={handleLogout} style={logoutBtn}>
            Log Out
          </button>
        </div>
      </nav>
      <div style={containerStyle}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18
        }}>
          <button style={backBtnStyle} onClick={() => navigate(-1)}>
            &larr; Back
          </button>
          <span style={{
            fontWeight: 600,
            color: "#1976d2",
            fontSize: "1.15rem",
            letterSpacing: "0.5px"
          }}>
            {complaint.title || "Complaint Details"}
          </span>
        </div>
        <hr style={dividerStyle} />
        <table style={tableStyle}>
          <tbody>
            <tr>
              <th style={thStyle}>Complaint ID</th>
              <td style={tdStyle}>{complaint.uuid || complaint.complaintId || "N/A"}</td>
            </tr>
            <tr>
              <th style={thStyle}>Status</th>
              <td style={tdStyle}>
                <span style={badge(editStatus)}>{editStatus}</span>
                <select
                  value={editStatus}
                  onChange={handleStatusChange}
                  style={selectStyle}
                  disabled={statusLoading}
                >
                  <option value="Pending" style={{ color: "#b8860b" }}>Pending</option>
                  <option value="In-Progress" style={{ color: "#1976d2" }}>In-Progress</option>
                  <option value="Accepted" style={{ color: "#388e3c" }}>Accepted</option>
                  <option value="Solved" style={{ color: "#6a1b9a" }}>Solved</option>
                  <option value="Rejected" style={{ color: "#ff9800" }}>Rejected</option>
                </select>
                <button
                  style={saveBtnStyle}
                  onClick={handleStatusSave}
                  disabled={statusLoading || editStatus === complaint.status}
                >
                  {statusLoading ? "Saving..." : "Save"}
                </button>
                {statusMsg && (
                  <span style={{
                    marginLeft: 16,
                    color: statusMsg.includes("success") ? "#388e3c" : "#d32f2f",
                    fontWeight: 500,
                    fontSize: "1.08rem"
                  }}>
                    {statusMsg}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <th style={thStyle}>Description</th>
              <td style={tdStyle}>{complaint.description || "N/A"}</td>
            </tr>
            <tr>
              <th style={thStyle}>Location</th>
              <td style={tdStyle}>
                {address ||
                  `${complaint.incidentLocationLat}, ${complaint.incidentLocationLong}` ||
                  "N/A"}
              </td>
            </tr>
            <tr>
              <th style={thStyle}>Created</th>
              <td style={tdStyle}>
                {complaint.createdAt
                  ? new Date(complaint.createdAt).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th style={thStyle}>Assigned To</th>
              <td style={tdStyle}>{complaint.assignedToId || "N/A"}</td>
            </tr>
            <tr>
              <th style={thStyle}>Document</th>
              <td style={tdStyle}>
                {complaint.supportingDocument ? (
                  <a
                    href={`http://localhost:9090/api/complaints/${complaint.uuid}/download`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={docLinkStyle}
                    download
                  >
                    Download
                  </a>
                ) : (
                  <span style={{ ...valueStyle, color: "#d32f2f" }}>No file</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer style={footerStyle}>
        © {new Date().getFullYear()} Citizen Complaint Portal
      </footer>
    </div>
  );
};

export default GetDetailedComplaint;