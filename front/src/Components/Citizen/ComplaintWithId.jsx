import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CitizenNavBar from './CitizenNavbar';

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
        const response = await axios.get(`http://localhost:9090/api/citizen/${uuid}/allComplaints`,{
          withCredentials: true 

        });
        setComplaints(response.data);
        console.log(response.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
         toast.error("Email or Password is invalid", {
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
    <CitizenNavBar/>
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>My Complaints</h2>
      {loading ? (
        <p>Loading...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              style={{
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 2px 8px #0001",
                padding: "1.5rem",
                minWidth: 260,
                flex: "1 1 260px",
                borderLeft: "5px solid #1976d2",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#1976d2" }}>
                {complaint.title || "Complaint"}
              </h3>
              <p><strong>ID:</strong> {complaint.id}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Date:</strong> {complaint.date}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
      <ToastContainer/>
    </>
  );
};

export default ComplaintWithId;