import { arrayLengthCompare } from "@blueprintjs/core/lib/esm/common/utils";
import axios from "axios";
import React, { useRef } from "react";
const Input = ({ type, name, disabled, placeholder, ref, value, className, className1, name1, colorValue, stylecolor, visible, maxLength, handleChange, setBarValues, title, tabIndex, onKeyDown, labelVisible }) => {
  handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    if (value.length > maxLength) return;
    setBarValues((pre) => ({
      ...pre,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : type === "date" ? value : value,
    }));
  };

  return (
    <>
      <label className={className1} style={{ color: "var(--bs-black)", fontFamily: `${"var(--bs-font-roboto)"}`, fontWeight: "bold", display: `${visible === false ? "none" : labelVisible}` }}>
        {" "}
        {name1}{" "}
      </label>
      <input
        className={className}
        type={type}
        name={name}
        title={title}
        tabIndex={tabIndex}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        style={{ fontFamily: `${"var(--bs-font-roboto)"}`, fontSize: `${"var(--bs-font-sm)"}`, display: `${visible === false ? "none" : "block"}`, color: `${"var(--bs-black)"}` }}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
        ref={ref}
        onChange={handleChange}
        disabled={disabled}
      />
    </>
  );
};
export default Input;
