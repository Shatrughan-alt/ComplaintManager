/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CitizenNavBar from './CitizenNavbar';

const cardStyle = {
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 4px 24px #0002",
  padding: "2rem 2rem 1.5rem 2rem",
  minWidth: 300,
  maxWidth: 370,
  flex: "1 1 340px",
  borderTop: "4px solid #1976d2",
  display: "flex",
  flexDirection: "column",
  gap: "0.7rem",
  transition: "box-shadow 0.2s, border-color 0.2s",
  marginBottom: "1rem",
};

const labelStyle = {
  color: "#555",
  fontWeight: 600,
  fontSize: "0.98rem",
  minWidth: 120,
  display: "inline-block",
};

const valueStyle = {
  color: "#222",
  fontWeight: 400,
  marginLeft: 6,
  wordBreak: "break-word",
  fontSize: "0.98rem",
};

const statusStyle = (status) => ({
  color: status === "Pending" ? "#ff9800" : "#388e3c",
  fontWeight: 700,
  letterSpacing: "1px",
  fontSize: "1rem",
});

const ComplaintWithId = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const uuid = localStorage.getItem('UUID');
        if (!uuid) {
          setLoading(false);
          return;
        }
        const response = await axios.get(`http://localhost:9090/api/citizen/${uuid}/allComplaints`, {
          withCredentials: true
        });
        setComplaints(response.data);
      } catch (error) {
        toast.error("Could not fetch complaints", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <>
      <CitizenNavBar />
      <div style={{
        maxWidth: 1200,
        margin: "2.5rem auto",
        padding: "0 1rem",
      }}>
        <h2 style={{
          color: "#1976d2",
          fontWeight: 700,
          marginBottom: "2.2rem",
          borderBottom: "2px solid #1976d2",
          paddingBottom: "0.5rem",
          letterSpacing: "1px",
          fontSize: "2rem",
          textAlign: "left"
        }}>
          My Complaints
        </h2>
        {loading ? (
          <p style={{ color: "#888", textAlign: "center" }}>Loading...</p>
        ) : complaints.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>No complaints found.</p>
        ) : (
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.2rem",
            justifyContent: "flex-start"
          }}>
            {complaints.map((complaint) => (
              <div
                key={complaint.uuid}
                style={cardStyle}
              >
                <h3 style={{
                  margin: "0 0 1.2rem 0",
                  color: "#1976d2",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  letterSpacing: "0.5px",
                  borderBottom: "1px solid #e3e8ee",
                  paddingBottom: "0.5rem"
                }}>
                  {complaint.title || "Complaint"}
                </h3>
                <div>
                  <span style={labelStyle}>Complaint UUID:</span>
                  <span style={valueStyle}>{complaint.uuid}</span>
                </div>
                <div>
                  <span style={labelStyle}>Status:</span>
                  <span style={statusStyle(complaint.status)}>{complaint.status}</span>
                </div>
                <div>
                  <span style={labelStyle}>Description:</span>
                  <span style={valueStyle}>{complaint.description}</span>
                </div>
                <div>
                  <span style={labelStyle}>Supporting Document:</span>
                  <span style={valueStyle}>{complaint.supportingDocument}</span>
                </div>
                <div>
                  <span style={labelStyle}>Latitude:</span>
                  <span style={valueStyle}>{complaint.incidentLocationLat}</span>
                </div>
                <div>
                  <span style={labelStyle}>Longitude:</span>
                  <span style={valueStyle}>{complaint.incidentLocationLong}</span>
                </div>
                <div>
                  <span style={labelStyle}>Created At:</span>
                  <span style={valueStyle}>
                    {complaint.createdAt ? new Date(complaint.createdAt).toLocaleString() : ""}
                  </span>
                </div>
                <div>
                  <span style={labelStyle}>Witness ID:</span>
                  <span style={valueStyle}>{complaint.witnessId}</span>
                </div>
                <div>
                  <span style={labelStyle}>Assigned To ID:</span>
                  <span style={valueStyle}>{complaint.assignedToId}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default ComplaintWithId;