import React from "react";

const ProgressPopup = ({ show, progress = 0, title = "Saving...", message = "Please wait while your data is being saved.", colorValue = "#0d6efd", foreValue = "#ffffff" }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          width: "320px",
          padding: "1.25rem",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
        role="alert"
        aria-live="assertive"
      >
        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: colorValue }}>{title}</div>
          <div style={{ marginTop: "0.35rem", color: "#535353", fontSize: "0.95rem" }}>{message}</div>
        </div>
        <progress value={progress} max="100" style={{ width: "100%", height: "18px", marginBottom: "0.5rem" }} />
        <div style={{ fontSize: "0.9rem", fontWeight: 600, color: colorValue }}>{progress}%</div>
      </div>
    </div>
  );
};

export default ProgressPopup;
