import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const RegisterComplaint = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    supportingDocument: "",
    incidentLocationLat: "",
    incidentLocationLong: "",
    status: "Pending",
    witnessId: "",
    assignedToId: ""
  });

  const [file, setFile] = useState(null);

  // Set witnessId from localStorage and get location from browser
  useEffect(() => {
    const uuid = localStorage.getItem('UUID');
    setData(prev => ({
      ...prev,
      witnessId: uuid || ""
    }));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setData(prev => ({
            ...prev,
            incidentLocationLat: position.coords.latitude,
            incidentLocationLong: position.coords.longitude
          }));
        },
        () => {}
      );
    }
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setData({
      ...data,
      supportingDocument: e.target.files[0] ? e.target.files[0].name : ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9090/api/complaints";
      const complaintPayload = {
        ...data,
        witnessId: data.witnessId ? Number(data.witnessId) : undefined,
        assignedToId: data.assignedToId ? Number(data.assignedToId) : undefined,
        incidentLocationLat: Number(data.incidentLocationLat),
        incidentLocationLong: Number(data.incidentLocationLong)
      };

      const formData = new FormData();
      formData.append(
        "complaint",
        new Blob([JSON.stringify(complaintPayload)], { type: "application/json" })
      );
      if (file) {
        formData.append("supportingDocument", file);
      }

      await axios.post(url, formData, {
        withCredentials: true
        // Do NOT set Content-Type, let browser set it
      });

      alert("Complaint registered successfully!");
      setData({
        title: "",
        description: "",
        supportingDocument: "",
        incidentLocationLat: "",
        incidentLocationLong: "",
        status: "Pending",
        witnessId: localStorage.getItem('UUID') || "",
        assignedToId: ""
      });
      setFile(null);
    } catch (error) {
      alert("Error registering complaint: " + (error.response?.data || error.message));
    }
  };

  // --- Minimalist Styling ---
  const mainBg = {
    minHeight: "100vh",
    background: "#f7fafd",
    width: "100vw",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column"
  };

  const card = {
    maxWidth: 420,
    width: "100%",
    margin: "48px auto 0 auto",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 12px 0 rgba(31,38,135,0.07)",
    padding: "32px 28px 72px 28px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    position: "relative",
    minHeight: "60vh"
  };

  const label = {
    fontWeight: 500,
    color: "#222",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: "1rem",
    marginBottom: 2
  };

  const input = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #e0e0e0",
    fontSize: "1rem",
    background: "#fafbfc",
    marginTop: 2
  };

  const inputReadOnly = {
    ...input,
    background: "#f5f5f5",
    color: "#888"
  };

  const textarea = {
    ...input,
    minHeight: 70,
    resize: "vertical"
  };

  const sectionTitle = {
    color: "#1976d2",
    fontWeight: 600,
    fontSize: "1.3rem",
    letterSpacing: "0.5px",
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: "8px",
    margin: "0 0 12px 0"
  };

  const submitBtn = {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "12px 32px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    position: "absolute",
    right: "28px",
    bottom: "24px",
    boxShadow: "0 1px 4px #1976d211",
    letterSpacing: "0.5px",
    transition: "background 0.2s"
  };

  const fileInfo = {
    fontSize: "0.95rem",
    color: "#1976d2",
    marginTop: 2
  };

  return (
    <div style={mainBg}>
      <header
        style={{
          width: "100%",
          background: "#fff",
          color: "#1976d2",
          padding: "22px 0 10px 0",
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.5rem",
          letterSpacing: "1px",
          borderBottom: "1px solid #e0e0e0"
        }}
      >
        Citizen Complaint Registration
      </header>
      <form onSubmit={handleSubmit} style={card} encType={file ? "multipart/form-data" : undefined}>
        <h2 style={sectionTitle}>New Complaint</h2>
        <label style={label}>
          Title
          <input
            required
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            style={input}
            placeholder="Complaint title"
          />
        </label>
        <label style={label}>
          Description
          <textarea
            required
            name="description"
            value={data.description}
            onChange={handleChange}
            style={textarea}
            placeholder="Describe your complaint"
          />
        </label>
        <label style={label}>
          Supporting Document
          <input
            type="file"
            name="supportingDocument"
            onChange={handleFileChange}
            style={input}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          {file && (
            <span style={fileInfo}>
              {file.name}
            </span>
          )}
        </label>
        <label style={label}>
          Witness ID
          <input
            type="text"
            name="witnessId"
            value={data.witnessId}
            readOnly
            style={inputReadOnly}
          />
        </label>
        <label style={label}>
          Assigned To ID
          <input
            type="number"
            name="assignedToId"
            value={data.assignedToId}
            onChange={handleChange}
            style={input}
            placeholder="(Optional)"
          />
        </label>
        <label style={label}>
          Latitude
          <input
            type="number"
            name="incidentLocationLat"
            value={data.incidentLocationLat}
            readOnly
            style={inputReadOnly}
          />
        </label>
        <label style={label}>
          Longitude
          <input
            type="number"
            name="incidentLocationLong"
            value={data.incidentLocationLong}
            readOnly
            style={inputReadOnly}
          />
        </label>
        <label style={label}>
          Status
          <input
            type="text"
            name="status"
            value={data.status}
            readOnly
            style={inputReadOnly}
          />
        </label>
        <button type="submit" style={submitBtn}>
          Submit
        </button>
      </form>
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
};

export default RegisterComplaint;
