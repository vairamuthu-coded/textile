import React from "react";
const Label = ({ labelName, className, stylecolor, visible, forecolor }) => {
  return (
    <label style={{ color: `${forecolor}`, fontFamily: `${"var(--bs-font-roboto)"}`, fontWeight: "bold", display: visible }} className={`fw-bold ${className}`}>
      {labelName}
    </label>
  );
};
export default Label;
