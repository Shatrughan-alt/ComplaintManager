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

  // Set witnessId from localStorage and get location from browser
  useEffect(() => {
    // Set witnessId from localStorage
    const uuid = localStorage.getItem('UUID');
    setData(prev => ({
      ...prev,
      witnessId: uuid || ""
    }));

    // Get geolocation
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
          alert("Could not get location: " + err.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9090/api/complaints";
      const payload = {
        ...data,
        witnessId: data.witnessId ? Number(data.witnessId) : undefined,
        assignedToId: data.assignedToId ? Number(data.assignedToId) : undefined,
        incidentLocationLat: Number(data.incidentLocationLat),
        incidentLocationLong: Number(data.incidentLocationLong)
      };
      await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
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
    } catch (error) {
      alert("Error registering complaint: " + (error.response?.data || error.message));
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6f8"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "32px 24px",
          borderRadius: "10px",
          boxShadow: "0 2px 16px #0001",
          minWidth: 320,
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <h2 style={{ color: "#1976d2", textAlign: "center", marginBottom: 8 }}>Register Complaint</h2>
        <label>
          Title
          <input
            required
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bdbdbd", marginTop: 4 }}
          />
        </label>
        <label>
          Description
          <textarea
            required
            name="description"
            value={data.description}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bdbdbd", minHeight: 60, marginTop: 4 }}
          />
        </label>
        <label>
          Supporting Document (filename)
          <input
            type="text"
            name="supportingDocument"
            value={data.supportingDocument}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bdbdbd", marginTop: 4 }}
          />
        </label>
        <label>
          Witness ID
          <input
            type="text"
            name="witnessId"
            value={data.witnessId}
            readOnly
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bdbdbd", background: "#f0f0f0", marginTop: 4 }}
          />
        </label>
        <label>
          Assigned To ID
          <input
            type="number"
            name="assignedToId"
            value={data.assignedToId}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bdbdbd", marginTop: 4 }}
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            name="incidentLocationLat"
            value={data.incidentLocationLat}
            readOnly
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bdbdbd", background: "#f0f0f0", marginTop: 4 }}
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            name="incidentLocationLong"
            value={data.incidentLocationLong}
            readOnly
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bdbdbd", background: "#f0f0f0", marginTop: 4 }}
          />
        </label>
        <button
          type="submit"
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "12px 0",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: 8
          }}
        >
          Register Complaint
        </button>
      </form>
    </div>
  );
};

export default RegisterComplaint;
