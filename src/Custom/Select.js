import React, { useContext, useRef, useState } from "react";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "../Custom/select.css";
import styled from "styled-components";
import { mobile } from "../ShoppingCart/Responsive";
import DataContext from "../context/CreateUserContext";

const Select = ({ items, setUserRightsSearch, userrights_search, colorValue, handlepage, drop, setDrop, sidebar, setSidebar }) => {
  const { headerdrop, setHeaderDrop } = useContext(DataContext);

  const handleclick = (headerdrop) => {
    setDrop((e) => !e);
    setUserRightsSearch("");
  };

  return (
    <div className="container1">
      <div className="main1">
        <input type="text" className="title1" onClick={(e) => handleclick(e)} autoComplete="off" value={userrights_search} onChange={(e) => setUserRightsSearch(e.target.value.toLocaleLowerCase())}></input>

        <div className={`headermenu_data ${drop && "dropShow"}`}>
          <div className="search">
            <input type="text" value={userrights_search} onChange={(e) => setUserRightsSearch(e.target.value.toLocaleLowerCase())} placeholder="SEARCH ...."></input>
          </div>

          <div className="headermenu">
            {items.map((item, index) => (
              <span
                style={{ fontFamily: `${"var(--bs-Roboto)"}`, fontSize: "18px", padding: "5px 0 5px 0", textAlign: "left" }}
                key={index}
                onClick={(e) => handlepage(item.menuname)}
                className={`${item.menuname.toLocaleLowerCase().startsWith(userrights_search) ? "block" : "hidden"}`}
              >
                {" "}
                <a style={{ textDecoration: "none", color: `${colorValue}` }} key={index} onClick={(e) => handlepage(item.menuname)}>
                  {" "}
                </a>{" "}
                {item.menuname}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
