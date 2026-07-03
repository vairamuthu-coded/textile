import React, { useContext } from "react";
import DataContext from "./context/CreateUserContext";
import * as FaICons from "react-icons/fa";
import Select from "./Custom/Select";
import styled from "styled-components";
import { mobile } from ".././src/ShoppingCart/Responsive";
import Marquee from "react-fast-marquee";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
const Title = styled.div`
  width: 100%;
  font-size: 18px;
  color: ${(props) => props.color};
  ${mobile({ width: "100%", fontSize: "12px" })};
`;

const Header = ({ titlename, TitleCompCode, TitleUser, setColorValue, setMode }) => {
  const { width, header_items, headerdrop, setHeaderDrop, sidebar, setSelectedTitle, setHeaderItems, setHeaderFilterData, showSidebar, handlepage, header_search, setHeaderSearch, colorValue, foreValue, headerfilterdata, setSidebar, selectedTitle } =
    useContext(DataContext);
  const navigate = useNavigate();
  const modehandleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (checked === true) {
      setColorValue("var(--bs-primary-text-emphasis)");
      setMode("dark");
    } else {
      setColorValue("var(--bs-form-valid-color)");
      setMode("light");
    }
  };
  const logout = () => {
    localStorage.clear();
    navigate("/Dashboard");
  };
  const closeApp = () => {
    if (window.opener) {
      window.close();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container-fluid" style={{ background: colorValue }}>
      <div className="row align-items-center text-center text-md-start">
        {/* LEFT SIDE */}
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-between justify-content-md-start mb-2 mb-md-0">
          <h5
            style={{
              color: foreValue,
              cursor: "pointer",
              fontSize: "var(--bs-font-sm)",
            }}
            onClick={() => setHeaderDrop(false)}
            className="d-flex align-items-center m-0"
          >
            <FaIcons.FaBars className="me-2" onClick={showSidebar} />
            {titlename}
          </h5>
        </div>

        {/* CENTER MENU */}
        <div className="col-12 col-md-3 mb-2 mb-md-0">
          <Select sidebar={sidebar} setSidebar={setSidebar} items={header_items} userrights_search={header_search} setUserRightsSearch={setHeaderSearch} colorValue={colorValue} handlepage={handlepage} drop={headerdrop} setDrop={setHeaderDrop} />
        </div>

        {/* RIGHT SIDE */}
        <div className="col-12 col-md-5">
          <div className="d-flex flex-row flex-md-row justify-content-between align-items-center">
            {/* USER INFO */}
            <div className="mb-2 mb-md-0">
              <span style={{ color: foreValue }} className="me-2">
                {TitleCompCode}
              </span>
              <span style={{ color: foreValue }}>{TitleUser}</span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="d-flex align-items-center">
              {/* DARK MODE */}
              <label className="checkbox me-3">
                <input type="checkbox" name="active" onChange={modehandleChange} />
                <span></span>
                <i className="indicator"></i>
              </label>
              {/* LOGOUT */}
              <FaIcons.FaSignOutAlt style={{ cursor: "pointer", color: foreValue, fontSize: "20px" }} onClick={logout} />
              {/* CLOSE */}
              <FaIcons.FaTimes className="ms-3" style={{ cursor: "pointer", color: "red", fontSize: "20px" }} onClick={closeApp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
