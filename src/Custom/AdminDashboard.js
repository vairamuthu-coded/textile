import React, { useContext } from "react";

import Header from "../Header.js";
import SideBar from "../component/Sidebar.js";
import Tabpage from "../Tabpage.jsx";
import DataContext from "../context/CreateUserContext.js";

const AdminDashboard = ({}) => {
  const {
    newButton,
    setNewButton,
    handleSubmit,
    userRights,
    setUserRights,
    currentPage,
    setCurrentPage,
    API_URL,
    colorValue,
    defaultDetails,
    countryValues,
    setCountryValues,
    handlepage,
    sorting,
    setSorting,
    tabindex,
    state_CountryData,
    CityParam,
    searchLable1,
    searchLable2,
    searchLable3,
    isloading,
    setIsLoading,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    color1,
  } = useContext(DataContext);
  return (
    <div className="container-fluid">
      <h1 className="text-center">Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
