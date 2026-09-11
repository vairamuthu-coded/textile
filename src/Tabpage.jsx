import React, { useContext, useRef } from "react";
import DataContext from "./context/CreateUserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { RiHome4Line } from "react-icons/ri";

const Tabpage = ({ title, colorValue }) => {
  let ref = useRef();
  const { handleClose, tabpageClick, handlepage, lastindex, lastindex1, sidebar, handleLoginSubmit, selectedValue, handleSubmit, setSelectedTitle, selectedTitle, foreValue } = useContext(DataContext);
  if (selectedTitle != "") {
    setSelectedTitle([]);
  }

  return (
    <>
      <ul className="d-flex flex-nowrap flex-md-wrap" onClick={handleSubmit}>
        <li className="row m-1">
          <Link className="tab-link" to="/AdminDashboard">
            Admin
          </Link>
        </li>
        <li className="row m-1">
          <Link className="tab-link" to="/Dashboard">
            Dashboard
          </Link>
        </li>
        {selectedValue.length >= 1 &&
          selectedValue.map((name, index) => (
            <li key={index} className="row m-1" onClick={() => tabpageClick(name, index)}>
              <button className="d-flex align-items-center  justify-content-between" style={{ backgroundColor: `${colorValue}` }}>
                <strong>{name}</strong>
                <strong className="text-white " onClick={(e) => handleClose(index, name)}>
                  x
                </strong>
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Tabpage;
