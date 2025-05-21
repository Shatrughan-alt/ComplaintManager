import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GetAllComplaints() {
  const [complaints, setComplaints] = useState([]);

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
        withCredentials: true // <-- Important for cookies
      });
      console.log(response); // See what you get
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  }

  return (
    <div>
      <h1>Fetch all Complaints</h1>
      <button onClick={handleLogout}>Log Out</button>
      <div>
        {complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          complaints.map((complaint, idx) => (
            <div key={complaint.uuid || idx} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
              <strong>Title:</strong> {complaint.title} <br />
              <strong>Description:</strong> {complaint.description} <br />
              <strong>Supporting Document:</strong> {complaint.supportingDocument} <br />
              <strong>Incident Location (Lat, Long):</strong> {complaint.incidentLocationLat}, {complaint.incidentLocationLong} <br />
              <strong>Status:</strong> {complaint.status} <br />
              <strong>Created At:</strong> {complaint.createdAt} <br />
              <strong>Witness ID:</strong> {complaint.witnessId} <br />
              <strong>Assigned To ID:</strong> {complaint.assignedToId} <br />
            </div>
          ))
        )}
      </div>
    </div>
  );
}