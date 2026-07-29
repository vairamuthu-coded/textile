import React from "react";
const Label = ({ labelName, className, forecolor }) => {
  return <label className={`${className}`}>{labelName}</label>;
};
export default Label;
