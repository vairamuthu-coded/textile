import React from "react";
const Label = ({ labelName, className, stylecolor, visible, forecolor }) => {
  return (
    <label style={{ color: `${forecolor}`, fontSize: `${"var(--bs-font-sm)"}`, fontWeight: "bold", display: visible }} className={`fw-bold ${className}`}>
      {labelName}
    </label>
  );
};
export default Label;
