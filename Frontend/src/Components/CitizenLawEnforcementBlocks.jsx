// CitizenLawEnforcementBlocks.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const blockBase = {
    minWidth: 320,
    maxWidth: 400,
    margin: "32px auto",
    padding: "2.2rem 2rem 1.7rem 2rem",
    borderRadius: "1.7rem",
    boxShadow: "0 8px 32px #1976d211, 0 2px 8px #1976d211",
    background: "linear-gradient(120deg, #f8fafc 60%, #e0eafc 100%)",
    position: "relative",
    transition: "transform 0.5s cubic-bezier(.39,.575,.56,1.000), box-shadow 0.5s cubic-bezier(.39,.575,.56,1.000), border 0.3s"
};

const citizenBorder = {
    border: "2.5px solid #1976d2",
    boxShadow: "0 8px 32px #1976d244, 0 2px 8px #1976d211"
};

const lawBorder = {
    border: "2.5px dashed #36d1c4",
    boxShadow: "0 8px 32px #36d1c444, 0 2px 8px #36d1c422"
};

const titleStyle = color => ({
    fontWeight: 800,
    fontSize: "1.7rem",
    letterSpacing: "1.2px",
    color,
    marginBottom: 10,
    textShadow: `0 2px 8px ${color}22`
});

const descStyle = {
    color: "#444",
    fontSize: "1.08rem",
    marginBottom: 18
};

const ulStyle = {
    color: "#1976d2",
    fontWeight: 600,
    margin: "0 0 18px 0",
    paddingLeft: 18,
    fontSize: "1.08rem"
};

const buttonBase = {
    padding: "12px 32px",
    border: "none",
    borderRadius: "1.2rem",
    fontWeight: 700,
    fontSize: "1.08rem",
    letterSpacing: "0.7px",
    cursor: "pointer",
    boxShadow: "0 2px 12px #1976d222",
    transition: "background 0.2s, transform 0.2s, box-shadow 0.2s"
};

const citizenBtn = {
    ...buttonBase,
    background: "linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)",
    color: "#fff"
};

const lawBtn = {
    ...buttonBase,
    background: "linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)",
    color: "#fff"
};

export function CitizenBlock() {
    const navigate = useNavigate();

    // Animation on hover
    function handleHover(e) {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.04)";
        e.currentTarget.style.boxShadow = "0 16px 48px #1976d244, 0 2px 8px #1976d211";
        e.currentTarget.style.borderColor = "#21cbf3";
    }
    function handleLeave(e) {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = citizenBorder.boxShadow;
        e.currentTarget.style.borderColor = "#1976d2";
    }
    function btnHover(e) {
        e.currentTarget.style.transform = "scale(1.07)";
        e.currentTarget.style.background = "linear-gradient(90deg, #21cbf3 0%, #1976d2 100%)";
        e.currentTarget.style.boxShadow = "0 4px 24px #1976d244";
    }
    function btnLeave(e) {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = citizenBtn.background;
        e.currentTarget.style.boxShadow = citizenBtn.boxShadow;
    }

    return (
        <div
            style={{ ...blockBase, ...citizenBorder }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <h2 style={titleStyle("#1976d2")}>Citizen</h2>
            <p style={descStyle}>Access citizen services, file complaints, and view your dashboard.</p>
            <button
                style={citizenBtn}
                onClick={() => navigate("/citizenLogin")}
                onMouseEnter={btnHover}
                onMouseLeave={btnLeave}
            >
                Go to Citizen Dashboard
            </button>
        </div>
    );
}

export function LawEnforcementBlock() {
    const navigate = useNavigate();

    function handleHover(e) {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.04)";
        e.currentTarget.style.boxShadow = "0 16px 48px #36d1c444, 0 2px 8px #36d1c422";
        e.currentTarget.style.borderColor = "#5b86e5";
    }
    function handleLeave(e) {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = lawBorder.boxShadow;
        e.currentTarget.style.borderColor = "#36d1c4";
    }
    function btnHover(e) {
        e.currentTarget.style.transform = "scale(1.07)";
        e.currentTarget.style.background = "linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)";
        e.currentTarget.style.boxShadow = "0 4px 24px #36d1c444";
    }
    function btnLeave(e) {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = lawBtn.background;
        e.currentTarget.style.boxShadow = lawBtn.boxShadow;
    }

    return (
        <div
            style={{ ...blockBase, ...lawBorder }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <h2 style={titleStyle("#36d1c4")}>Law Enforcement</h2>
            <ul style={ulStyle}>
                <li>Manage complaints</li>
                <li>Assign cases</li>
                <li>View reports</li>
            </ul>
            <button
                style={lawBtn}
                onClick={() => navigate("/lawEnforcementLogin")}
                onMouseEnter={btnHover}
                onMouseLeave={btnLeave}
            >
                Go to Law Enforcement Dashboard
            </button>
        </div>
    );
}