// CitizenLawEnforcementBlocks.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export function CitizenBlock() {
    const navigate = useNavigate();
    return (
        <div style={{ border: "2px solid #1976d2", padding: 24, borderRadius: 8, marginBottom: 16 }}>
            <h2>Citizen</h2>
            <p>Access citizen services, file complaints, and view your dashboard.</p>
            <button
                style={{ background: "#1976d2", color: "#fff", padding: "8px 16px", border: "none", borderRadius: 4 }}
                onClick={() => navigate("/citizenLogin")}
            >
                Go to Citizen Dashboard
            </button>
        </div>
    );
}

export function LawEnforcementBlock() {
    const navigate = useNavigate();
    return (
        <div style={{ border: "2px dashed #388e3c", padding: 24, borderRadius: 8 }}>
            <h2>Law Enforcement</h2>
            <ul>
                <li>Manage complaints</li>
                <li>Assign cases</li>
                <li>View reports</li>
            </ul>
            <button
                style={{ background: "#388e3c", color: "#fff", padding: "8px 16px", border: "none", borderRadius: 4 }}
                onClick={() => navigate("/lawEnforcementLogin")}
            >
                Go to Law Enforcement Dashboard
            </button>
        </div>
    );
}