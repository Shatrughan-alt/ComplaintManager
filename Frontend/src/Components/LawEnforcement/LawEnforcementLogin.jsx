import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LawEnforcementLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const cardRef = useRef(null);

  // Animate card on mount
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = "scale(1) rotateY(0deg)";
      cardRef.current.style.opacity = "1";
    }
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = "http://localhost:9090/api/lawEnforcement/login";
      const response = await axios.post(api, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem("law_token", response.data.token);
      window.location = "/allComplaints";
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  // --- Styling (matches register page) ---
  const bgStyle = {
    minHeight: "100vh",
    background: "linear-gradient(120deg, #0f2027 0%, #2c5364 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat, Segoe UI, Arial, sans-serif",
    overflow: "hidden",
    position: "relative"
  };

  const floatingShapes = {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    zIndex: 0,
    pointerEvents: "none",
    overflow: "hidden"
  };

  const cardStyle = {
    background: "linear-gradient(120deg, #f8fafc 60%, #e0eafc 100%)",
    borderRadius: "2.5rem",
    boxShadow: "0 12px 48px #0f202755, 0 2px 12px #2c536422",
    padding: "2.7rem 2.5rem 2.2rem 2.5rem",
    minWidth: 400,
    maxWidth: 440,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5 rem",
    position: "relative",
    zIndex: 2,
    transform: "scale(0.9) rotateY(20deg)",
    opacity: 0,
    transition: "transform 1s cubic-bezier(.39,.575,.56,1.000), opacity 1s cubic-bezier(.39,.575,.56,1.000)"
  };

  const titleStyle = {
    fontWeight: 900,
    fontSize: "2.1rem",
    textAlign: "center",
    color: "#0f2027",
    marginBottom: "0.7rem",
    textShadow: "0 2px 12px #e0eafc88",
    // letterSpacing: "2px"
  };

  const subtitleStyle = {
    fontWeight: 500,
    fontSize: "1.08rem",
    color: "#2c5364",
    marginBottom: "1.2rem",
    letterSpacing: "0.5px",
    textAlign: "center"
  };

  const labelStyle = {
    color: "#2c5364",
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: "0.2rem",
    alignSelf: "flex-start"
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 20px",
    borderRadius: "1.3rem",
    border: "1.5px solid #b2bec3",
    fontSize: "1.09rem",
    marginBottom: "0.7rem",
    outline: "none",
    background: "#f7faff",
    transition: "border 0.2s, box-shadow 0.2s, background 0.3s"
  };

  const inputFocusStyle = {
    border: "1.5px solid #36d1c4",
    background: "#e0f7fa",
    boxShadow: "0 2px 12px #36d1c422"
  };

  const buttonStyle = {
    width: "100%",
    padding: "13px 0",
    borderRadius: "1.3rem",
    border: "none",
    background: "linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)",
    color: "#fff",
    fontWeight: 800,
    fontSize: "1.15rem",
    letterSpacing: "1.2px",
    marginTop: "0.5rem",
    marginBottom: "0.2rem",
    cursor: "pointer",
    boxShadow: "0 2px 16px #36d1c433",
    transition: "background 0.2s, transform 0.2s, box-shadow 0.2s"
  };

  const buttonAltStyle = {
    ...buttonStyle,
    background: "linear-gradient(90deg, #0f2027 0%, #2c5364 100%)",
    color: "#fff",
    marginTop: "0.2rem"
  };

  const errorStyle = {
    color: "#e94e77",
    fontWeight: 700,
    fontSize: "1.05rem",
    marginBottom: "0.5rem"
  };

  // For input focus effect
  const [focus, setFocus] = useState({ email: false, password: false });

  // Button hover effect
  function handleBtnHover(e) {
    e.currentTarget.style.transform = "scale(1.04)";
    e.currentTarget.style.boxShadow = "0 4px 24px #36d1c455";
    e.currentTarget.style.background = "linear-gradient(90deg, #5b86e5 0%, #36d1c4 100%)";
  }
  function handleBtnLeave(e) {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
    e.currentTarget.style.background = buttonStyle.background;
  }
  function handleAltBtnHover(e) {
    e.currentTarget.style.transform = "scale(1.04)";
    e.currentTarget.style.boxShadow = "0 4px 24px #0f202755";
    e.currentTarget.style.background = "linear-gradient(90deg, #2c5364 0%, #0f2027 100%)";
  }
  function handleAltBtnLeave(e) {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = buttonAltStyle.boxShadow;
    e.currentTarget.style.background = buttonAltStyle.background;
  }

  return (
    <div style={bgStyle}>
      <div style={floatingShapes}>
        <svg width="100vw" height="100vh">
          <circle cx="120" cy="140" r="70" fill="#36d1c422">
            <animate attributeName="cy" values="140;200;140" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="90%" cy="100" r="50" fill="#5b86e522">
            <animate attributeName="cy" values="100;160;100" dur="7s" repeatCount="indefinite" />
          </circle>
          <rect x="80%" y="80%" width="90" height="90" rx="45" fill="#0f202711">
            <animate attributeName="x" values="80%;85%;80%" dur="8s" repeatCount="indefinite" />
          </rect>
          <ellipse cx="50%" cy="90%" rx="70" ry="30" fill="#e94e7711">
            <animate attributeName="rx" values="70;90;70" dur="9s" repeatCount="indefinite" />
          </ellipse>
        </svg>
      </div>
      <form
        ref={cardRef}
        style={cardStyle}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div style={titleStyle}>Law Enforcement Portal</div>
        <div style={subtitleStyle}>
          Secure access for authorized law enforcement personnel only.
        </div>
        {error && <div style={errorStyle}>{error}</div>}
        <div style={labelStyle}>Email</div>
        <input
          type="email"
          name="email"
          style={focus.email ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
          onFocus={() => setFocus(f => ({ ...f, email: true }))}
          onBlur={() => setFocus(f => ({ ...f, email: false }))}
          onChange={handleChange}
          value={data.email}
          autoComplete="username"
          required
        />
        <div style={labelStyle}>Password</div>
        <input
          type="password"
          name="password"
          style={focus.password ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
          onFocus={() => setFocus(f => ({ ...f, password: true }))}
          onBlur={() => setFocus(f => ({ ...f, password: false }))}
          onChange={handleChange}
          value={data.password}
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={handleBtnHover}
          onMouseLeave={handleBtnLeave}
        >
          Login
        </button>
        <button
          type="button"
          style={buttonAltStyle}
          onClick={() => navigate("/lawEnforcementRegister")}
          onMouseEnter={handleAltBtnHover}
          onMouseLeave={handleAltBtnLeave}
        >
          Register
        </button>
      </form>
    </div>
  );
}
