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
        (err) => {
          // Don't alert, just keep fields empty for a cleaner UX
        }
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
      let payload = {
        ...data,
        witnessId: data.witnessId ? Number(data.witnessId) : undefined,
        assignedToId: data.assignedToId ? Number(data.assignedToId) : undefined,
        incidentLocationLat: Number(data.incidentLocationLat),
        incidentLocationLong: Number(data.incidentLocationLong)
      };

      // If file is selected, use FormData for file upload
      if (file) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append('file', file);
        await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
      } else {
        await axios.post(url, payload, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
      }

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3e9f7 0%, #f4f6f8 100%)",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <header
        style={{
          width: "100%",
          background: "#1976d2",
          color: "#fff",
          padding: "28px 0 18px 0",
          textAlign: "center",
          fontWeight: 700,
          fontSize: "2.3rem",
          letterSpacing: "1.5px",
          boxShadow: "0 2px 8px #1976d233",
          borderBottom: "4px solid #125ea2"
        }}
      >
        Citizen Complaint Registration Portal
      </header>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 900,
          margin: "48px auto 0 auto",
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 6px 32px #0002",
          padding: "56px 48px 120px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px 56px",
          position: "relative",
          minHeight: "65vh"
        }}
        encType={file ? "multipart/form-data" : undefined}
      >
        <div style={{ gridColumn: "1 / span 2", marginBottom: 8 }}>
          <h2
            style={{
              color: "#1976d2",
              fontWeight: 700,
              fontSize: "2rem",
              letterSpacing: "1px",
              borderBottom: "2px solid #1976d2",
              paddingBottom: "10px",
              margin: 0
            }}
          >
            Register a New Complaint
          </h2>
        </div>
        <label style={{ fontWeight: 600, color: "#333", display: "flex", flexDirection: "column", gap: 8 }}>
          Title
          <input
            required
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            style={{
              padding: "14px",
              borderRadius: "7px",
              border: "1px solid #bdbdbd",
              fontSize: "1.05rem",
              background: "#fafbfc"
            }}
          />
        </label>
        <label style={{ fontWeight: 600, color: "#333", display: "flex", flexDirection: "column", gap: 8 }}>
          Supporting Document (upload)
          <input
            type="file"
            name="supportingDocument"
            onChange={handleFileChange}
            style={{
              padding: "10px 0",
              fontSize: "1.05rem",
              background: "#fafbfc"
            }}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          {file && (
            <span style={{ fontSize: "0.97rem", color: "#1976d2", marginTop: 4 }}>
              Selected: {file.name}
            </span>
          )}
        </label>
        <label style={{ fontWeight: 600, color: "#333", display: "flex", flexDirection: "column", gap: 8 }}>
          Witness ID
          <input
            type="text"
            name="witnessId"
            value={data.witnessId}
            readOnly
            style={{
              padding: "14px",
              borderRadius: "7px",
              border: "1px solid #bdbdbd",
              background: "#f0f0f0",
              fontSize: "1.05rem"
            }}
          />
        </label>
        <label style={{ fontWeight: 600, color: "#333", display: "flex", flexDirection: "column", gap: 8 }}>
          Assigned To ID
          <input
            type="number"
            name="assignedToId"
            value={data.assignedToId}
            onChange={handleChange}
            style={{
              padding: "14px",
              borderRadius: "7px",
              border: "1px solid #bdbdbd",
              fontSize: "1.05rem",
              background: "#fafbfc"
            }}
          />
        </label>
        <label style={{ fontWeight: 600, color: "#333", display: "flex", flexDirection: "column", gap: 8, gridColumn: "1 / span 2" }}>
          Description
          <textarea
            required
            name="description"
            value={data.description}
            onChange={handleChange}
            style={{
              padding: "14px",
              borderRadius: "7px",
              border: "1px solid #bdbdbd",
              minHeight: 110,
              fontSize: "1.05rem",
              background: "#fafbfc",
              resize: "vertical"
            }}
          />
        </label>
        <label style={{ fontWeight: 600, color: "#333", display: "flex", flexDirection: "column", gap: 8 }}>
          Latitude
          <input
            type="number"
            name="incidentLocationLat"
            value={data.incidentLocationLat}
            readOnly
            style={{
              padding: "14px",
              borderRadius: "7px",
              border: "1px solid #bdbdbd",
              background: "#f0f0f0",
              fontSize: "1.05rem"
            }}
          />
        </label>
        <label style={{ fontWeight: 600, color: "#333", display: "flex", flexDirection: "column", gap: 8 }}>
          Longitude
          <input
            type="number"
            name="incidentLocationLong"
            value={data.incidentLocationLong}
            readOnly
            style={{
              padding: "14px",
              borderRadius: "7px",
              border: "1px solid #bdbdbd",
              background: "#f0f0f0",
              fontSize: "1.05rem"
            }}
          />
        </label>
        <label style={{ fontWeight: 600, color: "#333", display: "flex", flexDirection: "column", gap: 8 }}>
          Status
          <input
            type="text"
            name="status"
            value={data.status}
            readOnly
            style={{
              padding: "14px",
              borderRadius: "7px",
              border: "1px solid #bdbdbd",
              background: "#f0f0f0",
              fontSize: "1.05rem",
              color: "#888"
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "7px",
            padding: "18px 54px",
            fontWeight: 700,
            fontSize: "1.15rem",
            cursor: "pointer",
            position: "absolute",
            right: "48px",
            bottom: "40px",
            boxShadow: "0 2px 8px #1976d233"
          }}
        >
          Register Complaint
        </button>
      </form>
      <footer
        style={{
          width: "100%",
          background: "#1976d2",
          color: "#fff",
          textAlign: "center",
          padding: "20px 0 14px 0",
          fontSize: "1.08rem",
          letterSpacing: "1px",
          marginTop: "auto"
        }}
      >
        © {new Date().getFullYear()} Citizen Complaint Portal | Powered by Your Organization
      </footer>
    </div>
  );
};

export default RegisterComplaint;
