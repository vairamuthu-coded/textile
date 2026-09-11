import React from "react";
import { Link } from "react-router-dom";

const SocialMissing = ({ colorValue = "var(--bs-danger)", fetchError = "No records found", title = "No Data Available", linkText = "Return to Dashboard" }) => {
  return (
    <div style={{ color: colorValue, border: "none", textAlign: "center", padding: "16px" }}>
      <h2 style={{ margin: "0 0 8px" }}>{title}</h2>
      {fetchError ? <p style={{ margin: "0 0 12px", color: colorValue }}>{fetchError}</p> : null}
      <Link to="/Dashboard" style={{ color: colorValue, textDecoration: "underline" }}>
        {linkText}
      </Link>
    </div>
  );
};

export default SocialMissing;
