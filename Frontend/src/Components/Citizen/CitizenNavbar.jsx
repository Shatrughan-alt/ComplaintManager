import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Complaint.css';

export default function CitizenNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('citizen_token');
    navigate('/citizenLogin');
  };

  return (
    <nav className="citizen-navbar">
      <div className="navbar-logo">CrimeAlerto</div>
      <ul className="navbar-links">
        <li><Link to="/citizen/complaints">My Complaints</Link></li>
        <li><Link to="/citizen/registerComplaint">Register Complaint</Link></li>
        <li><Link to="/citizen/nearest-police">Nearest Police Station</Link></li>
      </ul>
      <button className="navbar-logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
}