import React, { useContext, useRef } from "react";
import DataContext from "./context/CreateUserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Marquee from "react-fast-marquee";

const Tabpage = ({ title, colorValue }) => {
  let ref = useRef();
  const { handleClose, tabpageClick, handlepage, lastindex, lastindex1, sidebar, handleLoginSubmit, selectedValue, handleSubmit, setSelectedTitle, selectedTitle, foreValue } = useContext(DataContext);
  if (selectedTitle != "") {
    setSelectedTitle([]);
  }

  return (
    <>
      <div className="container-fluid pb-1">
        <ul className="bloc-tabs d-flex flex-nowrap flex-md-wrap" style={{ margin: 0, padding: 0, listStyle: "none", overflowX: "auto" }} onClick={handleSubmit}>
          <li className={`tabs ${title === null ? "active-tabs" : ""}`}>
            <Link className="tab-link" to="/AdminDashboard">
              Admin
              <i className="fa fa-times-circle ms-2"></i>
            </Link>
          </li>

          <li className={`tabs ${title === null ? "active-tabs" : ""}`}>
            <Link className="tab-link" to="/Dashboard">
              Dashboard
              <i className="fa fa-times-circle ms-2"></i>
            </Link>
          </li>

          {selectedValue.length >= 1 &&
            selectedValue.map((name, index) => (
              <li key={index} className="d-flex align-items-center" onClick={() => tabpageClick(name, index)}>
                <button className="d-flex align-items-center  justify-content-between" style={{ backgroundColor: `${colorValue}` }}>
                  <strong className="text-truncate">{name}</strong>
                  <i className="fa fa-times-circle" onClick={(e) => handleClose(index, name)}></i>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Tabpage;
