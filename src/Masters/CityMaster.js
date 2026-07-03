import React, { useContext, useEffect, useMemo, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import Search from "../Custom/Search";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useRef } from "react";
import SocialMissing from "../Social/SocialMissing";
// const Button=styled.button`margin:0px;padding-left:5px; padding-right:5px;width:100%;font-weight: bold;backgroundColor:${props=>props.color}; color:white;`;
import { utilityState } from "./../utilityState";
import ActionButtton from "../ActionButtton";

const CityMaster = ({ title, subTitle }) => {
  const {
    newButton,
    setNewButton,
    inputref,
    foreValue,
    handleSubmit,
    colorValue,
    defaultDetails,
    cityValues,
    setCityValues,
    cityStateData,
    setCityStateData,
    cityCountryData,
    setCityCountryData,
    selectedTitle,
    userRights,
    setUserRights,
    API_URL,
    currentPage,
    setCurrentPage,
    sorting,
    setSorting,
    ITEM_PER_PAGE,
    searchLable1,
    searchLable2,
    searchLable3,
    color1,
    handlepage,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
  } = useContext(DataContext);

  const [totalItems, setTotalItems] = useState([]);
  const [city_Search, setCity_Search] = useState([]);
  const [city_FilterSearch, setCity_FilterSearch] = useState([]);
  const [cityItems, setCityItems] = useState([]);
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [city_active, setCityActive] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const CountryParam = `${API_URL}/StateMaster/GridLoad`;
  const CityParam = `${API_URL}/CityMaster/GridLoad`;
  const StateParam = `${API_URL}/StateMaster/SelectCommond`;
  const insert_update = `${API_URL}/CityMaster/Saves`;
  const deleteData = `${API_URL}/CityMaster/DeleteCommond`;
  const heights = "380px";

  let one = React.createRef();
  let two = React.createRef();
  let three = React.createRef();
  let four = React.createRef();
  //setSearchLable1("Search");  setSearchLable2("");  setSearchLable3("")

  const HeadersColumn = [
    { headername: "", field: "visible" },
    { headername: "id", field: "gtcitymastid" },
    { headername: "CityName", field: "cityname" },
    { headername: "StateName", field: "state" },
    { headername: "CountryName", field: "country" },
    { headername: "Active", field: "active" },
  ];

  const refs = useRef([]);

  const handleEnter = (e, index) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const finalValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value;

    setCityValues((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
    // utilityState(e, setCityValues);
    alert(name + "" + finalValue);
    if (name === "state") handleStateChange(value);
  };

  let validcheck = true;
  const validate = (cityValues) => {
    if (!cityValues.cityname?.trim()) {
      toast.error("Invalid City Name");
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(cityValues.cityname)) {
      toast.error("Special Character not allowed");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const fetApi = async () => {
      try {
        const [menuRes, cityRes, stateRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(CityParam), axios.get(StateParam)]);

        setUserRights(menuRes.data);
        setCityItems(cityRes.data);
        setCityStateData(stateRes.data);
      } catch (error) {
        setFetchError(error);
      }
    };

    fetApi();
  }, [defaultDetails, title]);

  useEffect(() => {
    if (!city_Search) {
      setCity_FilterSearch(cityItems);
      return;
    }

    const search = String(city_Search || "").toLowerCase();
    const filtered = cityItems.filter((item) => item.cityname?.toLowerCase().includes(search) || item.country?.toLowerCase().includes(search) || item.state?.toLowerCase().includes(search));

    setCity_FilterSearch(filtered);
  }, [cityItems, city_Search]);

  const CityMasterCheck = async (id) => {
    try {
      const res = await axios.get(`${CityParam}/${id.gtcitymastid}`);
      if (res?.data?.length > 0) {
        const row = res.data[0];
        setCityValues({
          gtcitymastid: row.gtcitymastid,
          cityname: row.cityname,
          state: row.gtstatemastid,
          country: row.gtcountrymastid,
          active: row.active === "T",
        });

        handleStateChange(row.gtstatemastid);
      }
    } catch (error) {
      setFetchError("Service isn't running. Please check City Master API in Country Controller.");
    } finally {
      setNewButton(1);
    }
  };

  const CityMaster_Save = async () => {
    // Step 1: Validate values
    validate(cityValues);
    if (validcheck !== true) return;

    try {
      // Step 2: Check country dropdown data
      if (!cityCountryData?.length) {
        toast.error("No country selected");
        return;
      }
      let countryExists = cityCountryData.filter((c) => c.gtstatemastid === cityValues.state);
      // Step 3: Build payload (clean and consistent)
      const payload = {
        gtcitymastid: Number(cityValues.gtcitymastid) || 0,
        cityname: cityValues.cityname?.trim(),
        state: cityValues.state,
        country: cityValues.country,
        active: cityValues.active ? "T" : "F",
      };

      // Step 4: API call (Insert/Update)
      const response = await axios.post(insert_update, payload);

      if (!response?.data) {
        toast.error("Insert/Update failed.");
        return;
      }

      // Step 5: Refresh Grid
      const list = await axios.get(CityParam);
      setCityItems(list.data);

      toast.success(response.data);
    } catch (error) {
      console.error(error);
      setFetchError(error);
      toast.error("Something went wrong. Check City Master API.");
    } finally {
      // Step 6: Always reset form after process
      CityMaster_New();
    }
  };

  const handleStateChange = async (id) => {
    if (!id) return;
    try {
      const res = await axios.get(`${CountryParam}/${id}`);
      setCityCountryData(res.data);
    } catch (error) {
      setFetchError("Service not running. Check API.");
    }
  };

  const CityMaster_Delete = async (id) => {
    try {
      if (id === undefined) {
        toast.error("Please select a record to delete");
        return;
      }
      const { data } = await axios.delete(`${deleteData}/${id}`);

      if (data === true || data === "true") {
        setCityItems((prev) => prev.filter((x) => x.gtcitymastid !== id));
        toast.success("Record Deleted Successfully");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error(error?.message || "Server error");
    }

    try {
      const res = await axios.get(`${CountryParam}/${id}`);

      setCityCountryData(res.data);
    } catch (error) {
      setFetchError("Service not running. Check API.");
    }
  };

  const CityMaster_New = () => {
    setNewButton(1);
    setCityValues([]);
    setCityActive(false);
    setCityCountryData([]);
  };

  const CityMaster_Search = () => {};

  const commentsData = useMemo(() => {
    let search = String(city_Search || "").toLowerCase();
    let computedComments = cityItems;

    if (search) {
      computedComments = computedComments.filter((item) => {
        const country = String(item.country || "").toLowerCase();
        const state = String(item.state || "").toLowerCase();
        const cityname = String(item.cityname || "").toLowerCase();
        return country.includes(search) || state.includes(search) || cityname.includes(search);
      });
    }

    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [cityItems, currentPage, city_Search, sorting]);

  const menuButtons = [
    { key: "news", label: "News", action: CityMaster_New },
    { key: "saves", label: "Save", action: CityMaster_Save },
    { key: "deletes", label: "Delete", action: CityMaster_Delete },
    { key: "searches", label: "Search", action: CityMaster_Search },
    { key: "prints", label: "Prints", action: CityMaster_New },
    { key: "treebutton", label: "TreeButton", action: CityMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: CityMaster_New },
    { key: "login", label: "Login", action: CityMaster_New },
    { key: "changepassword", label: "Changepassword", action: CityMaster_New },
    { key: "changeskin", label: "Changeskin", action: CityMaster_New },
    { key: "contact", label: "Contact", action: CityMaster_New },
    { key: "pdf", label: "Pdf", action: CityMaster_New },
    { key: "import", label: "Import", action: CityMaster_New },
    { key: "download", label: "Download", action: CityMaster_New },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {userRights.length > 0 && (
        <div className="container-fluid animate-zoom">
          {!fetchError ? (
            <>
              <div style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
                <ActionButtton
                  news={CityMaster_New}
                  saves={CityMaster_Save}
                  deletes={CityMaster_Delete}
                  searches={CityMaster_Search}
                  prints={CityMaster_New}
                  treebutton={CityMaster_New}
                  globalsearch={CityMaster_New}
                  login={CityMaster_New}
                  changepassword={CityMaster_New}
                  changeskin={CityMaster_New}
                  contact={CityMaster_New}
                  pdf={CityMaster_New}
                  imports={CityMaster_New}
                  download={CityMaster_New}
                  userRights={userRights}
                  colorValue={colorValue}
                  newButton={newButton}
                  foreValue={foreValue}
                  screenHeader="CITY MASTER"
                />
                {/* <ul className="boxShadow d-flex justify-content-end">
                  {menuButtons.map(
                    (btn, index) =>
                      userRights[0][btn.key] === "T" && (
                        <li key={index}>
                          <button className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{ backgroundColor: colorValue }} onClick={btn.action}>
                            {btn.label}
                          </button>
                        </li>
                      ),
                  )}
                </ul> */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="content active-content">
                      <div className="row py-1" style={{ display: "none" }}>
                        <label className="col-md-2"> ID </label>
                        <input className="col-md-4" type="text" name="gtcitymastid" value={cityValues.gtcitymastid || ""} readOnly />
                      </div>
                      <div className="row py-1">
                        <label className="col-md-2"> CityName </label>
                        <input className="col-md-4" type="text" name="cityname" value={cityValues.cityname || ""} onChange={handleChange} ref={(el) => (refs.current[0] = el)} onKeyDown={(e) => handleEnter(e, 0)} />
                      </div>
                      <div className="row ">
                        <label className="col-md-2"> StateName </label>
                        <select className="col-sm-4" name="state" value={cityValues.state || ""} onChange={handleChange} ref={(el) => (refs.current[1] = el)} onKeyDown={(e) => handleEnter(e, 1)}>
                          <option></option>
                          {cityStateData !== null &&
                            cityStateData.map((result, index) => (
                              <option key={index} value={result.gtstatemastid}>
                                {result.statename}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="row py-1">
                        <label className="col-md-2"> Country </label>

                        <select className="col-sm-4" name="country" value={cityValues.country || ""} onChange={handleChange} ref={(el) => (refs.current[2] = el)}>
                          <option></option>
                          {cityCountryData.map((result, index) => (
                            <option key={index} value={result.gtcountrymastid}>
                              {result.countryname}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="row">
                        <label className="col-md-2"> Active </label>
                        <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="active" checked={cityValues.active} onChange={handleChange} />
                          <span></span>
                          <i className="indicator"></i>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="content active-content">
                      <Search
                        colorValue={colorValue}
                        searchs={city_Search}
                        setsearchs={setCity_Search}
                        SearchLable1={searchLable1}
                        SearchLable2={searchLable2}
                        SearchLable3={searchLable3}
                        stylecolor={foreValue}
                        handleChange={handleChange}
                        ChangeValues={cityValues}
                        searchCompCode={searchCompCode}
                        searchUserName={searchUserName}
                      />

                      <DataTable
                        heights={heights}
                        colorValue={colorValue}
                        headers={HeadersColumn}
                        comments={cityItems}
                        setComments={setCityItems}
                        foreValue={foreValue}
                        searches={city_Search}
                        setSearches={setCity_Search}
                        totalItems={totalItems}
                        setTotalItems={setTotalItems}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sorting={sorting}
                        setSorting={setSorting}
                        ITEM_PER_PAGE={ITEM_PER_PAGE}
                        EditData={CityMasterCheck}
                        commentsData={commentsData}
                        setCheckchild={setCheckchild}
                        checkall={checkall}
                        setCheckAll={setCheckAll}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>
          )}
        </div>
      )}
    </form>
  );
};

export default CityMaster;
