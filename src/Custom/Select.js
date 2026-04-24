import React, { useContext, useRef, useState } from "react";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "../Custom/select.css";
import styled from "styled-components";
import { mobile } from "../ShoppingCart/Responsive";
import DataContext from "../context/CreateUserContext";

// const Container=styled.div`
//    ${mobile({backgroundColor:"white"})}

// `
// const Wrapper=styled.div`
// flex:1
//  align-items:center;
//  justify-content:space-between;
//  ${mobile({padding:"10px 0px"})}
// `;

// const Left=styled.div`
// flex:1;
// display:flex;
// align-items:center;
// `;

// const Center=styled.div`
// flex:1;
// `;

// const Right=styled.div`
// flex:1;
// display:flex;
// align-items:center;
// justify-content:flex-end;
// ${mobile({flex:2,justifyContent:"center"})}
// `;

// const Language=styled.span`
// cursor:pointer;
// font-size:15px;
//  ${mobile({display:"none"})}
// `;

// const Input=styled.input`
// border:none;

//  ${mobile({width:"100%"})}
// `;

// const Logo=styled.h5`
// font-weight:bold;
//  ${mobile({fontSize:"20px"})}
// `;

// const SearchContainer=styled.div`
// border:0.5px solid lightgrey;
// display:flex;
// align-items:center;
// margin-left:25px;
// `;

// const MenuItem=styled.h1`
// font-size:14px;
// cursor:pointer;
// margin-left:25px;
// ${mobile({fontSize:"12px",marginLeft:"10px"})}
// `;

const Select = ({ items, setUserRightsSearch, userrights_search, colorValue, handlepage, drop, setDrop, sidebar, setSidebar }) => {
  //  const {headerdrop,setHeaderDrop,} = useContext(DataContext)

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
            <input type="text" value={userrights_search} onChange={(e) => setUserRightsSearch(e.target.value.toLocaleLowerCase())} placeholder="search country"></input>
          </div>

          <div className="headermenu">
            {items.map((item, index) => (
              <span style={{ fontSize: `${"var(--bs-bigfont)"}`, padding: "5px 0 5px 0" }} key={index} onClick={(e) => handlepage(item.menuname)} className={`${item.menuname.toLocaleLowerCase().startsWith(userrights_search) ? "block" : "hidden"}`}>
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
