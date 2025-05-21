import React from 'react';
import '../App.css';

export default function ErrorPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #f7fafd 0%, #e3e9f7 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.13)",
          padding: "48px 36px 40px 36px",
          maxWidth: 600,
          width: "90vw",
          textAlign: "center",
        }}
      >
          
        <div
          style={{
            backgroundImage:
              "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
            height: 220,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "12px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
            
        
        </div>
        
        <h2 style={{ fontSize: "2rem", color: "#1976d2", marginBottom: 12, fontWeight: 700 }}>
          Page Not Found
        </h2>
        <h3 style={{ fontSize: "1.15rem", color: "#222", marginBottom: 10, fontWeight: 500 }}>
          Looks like you're lost
        </h3>
        <p style={{ color: "#888", marginBottom: 28, fontSize: "1.05rem" }}>
          The page you are looking for is not available or has been moved.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 36px",
            background: "linear-gradient(90deg, #1976d2 0%, #125ea2 100%)",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "1.08rem",
            boxShadow: "0 2px 8px #1976d233",
            transition: "background 0.2s"
          }}
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
