import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import CreateUserContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import { utilityState } from "../utilityState";

const AgentMaster = ({ title, subTitle }) => {
  const {
    newButton,
    setNewButton,
    tabindex,
    API_URL,
    handleSubmit,
    currentPage,
    setCurrentPage,
    sorting,
    setSorting,
    ITEM_PER_PAGE,
    stateItems,
    setStateItems,
    foreValue,
    countryItems,
    setCountryItems,
    searchLable1,
    searchLable2,
    searchLable3,
    userRights,
    setUserRights,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    color1,
    colorValue,
    defaultDetails,
  } = useContext(CreateUserContext);
  const insert_update = `${API_URL}/AgentMasters`;
  const getDetails = `${API_URL}/AgentMasters/details`;
  const buyerDetails = `${API_URL}/BuyerMaster/BuyerMaster`;
  const StateParam = `${API_URL}/CityMaster/GridLoad`;
  const CountryParam = `${API_URL}/StateMaster/GridLoad`;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const [fetchError, setFetchError] = useState(null);
  const [agentValue, setAgentValue] = useState([]);

  const [agentDetValue, setAgentDetValue] = useState([
    {
      Asptblagedetid: 0,
      BuyerCode: 0,
      BuyerName: 0,
      Notes: "",
    },
  ]);
  const [categoryItems, setCategoryItems] = useState([
    { gtcategorymastid: 1, categoryname: "ShippingAgent" },
    { gtcategorymastid: 2, categoryname: "BuyeingAgent" },
  ]);

  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  let defaultimage = "../Images/Anugraha_logo.jpg";
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [buyersItems, setBuyerItems] = useState([]);

  const [cityItems, setCityItems] = useState([]);
  const [agentsearch, setAgentSearch] = useState("");
  const [agentfilterSearch, setAgentFilterSearch] = useState([]);
  const [agentItems, setAgentItems] = useState([]);
  const [getBuyerName, setGetBuyerName] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setAgentValue((prev) => ({
      ...prev,
      [name]: newValue,
      ...(name === "city" && { state: "", country: "" }),
      ...(name === "state" && { country: "" }),
    }));
    // utilityState(e, setAgentValue);
    if (name === "city") {
      handleStateChange(value);
    }

    if (name === "state") {
      handleCountryChange(value);
    }
  };

  const handleStateChange = async (id) => {
    if (!id) return;

    try {
      const { data } = await axios.get(`${StateParam}/${id}`);
      setStateItems(data || []);
      const stateId = data?.[0]?.gtstatemastid;
      if (stateId) {
        handleCountryChange(stateId);
        setAgentValue((prev) => ({ ...prev, state: stateId }));
      }
    } catch (error) {
      const message = error?.response?.data || error?.message || "State API failed";

      toast.error(message);
      setFetchError(message);
    }
  };

  const handleCountryChange = async (id) => {
    if (!id) return;

    try {
      const { data } = await axios.get(`${CountryParam}/${id}`);
      setCountryItems(data || []);
      setAgentValue((prev) => ({ ...prev, country: data?.[0]?.gtcountrymastid || "" }));
    } catch (error) {
      const message = error?.response?.data || error?.message || "Country API failed";

      toast.error(message);
      setFetchError(message);
    }
  };

  const validate = (values) => {
    const regex = /^[a-zA-Z0-9\s]+$/;

    const fields = [
      { key: "agentCode", label: "AgentCode" },
      { key: "agentName", label: "Agent Name" },
      { key: "city", label: "City Name" },
      { key: "state", label: "State Name" },
      { key: "country", label: "Country Name" },
    ];

    for (const field of fields) {
      if (!regex.test(values[field.key] || "")) {
        toast.error(`Special characters not allowed in ${field.label}`);
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [userRightsRes, ageRes, stateRes, buyerRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(insert_update), axios.get(StateParam), axios.get(buyerDetails)]);

        if (isMounted) {
          setUserRights(userRightsRes?.data || []);

          setAgentItems(ageRes?.data || []);
          setCityItems(stateRes?.data || []);
          setBuyerItems(buyerRes?.data || []);
        }
      } catch (error) {
        const message = error?.response?.data || error?.message || "API Error";
        toast.error(message);
        setFetchError(message);
      } finally {
        setNewButton(1);

        // Any cleanup o
        // r final steps can be performed here if needed
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [defaultDetails.User, defaultDetails.Compcode, title]);

  const AgentMaster_Search = () => {};

  const inputref = useRef();

  useEffect(() => {
    const search = agentsearch?.toLowerCase() || "";

    const filtered = agentItems.filter((item) => item.agentCode?.toLowerCase().includes(search));

    setAgentFilterSearch(filtered);
  }, [agentItems, agentsearch]);

  const BuyerMaster_Exit = () => {};

  const heights = "380px";
  const AgentMasterColumn = [
    { headername: "", field: "none" },
    { headername: "id", field: "asptblagemasid" },
    { headername: "Category", field: "agentCategory" },
    { headername: "AgentCode", field: "agentCode" },
    { headername: "AgentName", field: "agentName" },
    { headername: "City", field: "cityname" },
    { headername: "Active", field: "active" },
  ];

  const handleKeyDown = (e) => {
    const td = e.target.closest("td");
    const tr = td.parentElement;
    const table = tr.closest("table");
    const rowIndex = tr.rowIndex - 1;
    const cellIndex = td.cellIndex;
    if (e.key === "ArrowRight") {
      table.rows[rowIndex + 1]?.cells[cellIndex + 1]?.querySelector("input,select")?.focus();
    }
    if (e.key === "ArrowLeft") {
      table.rows[rowIndex + 1]?.cells[cellIndex - 1]?.querySelector("input,select")?.focus();
    }
    if (e.key === "ArrowDown") {
      table.rows[rowIndex + 2]?.cells[cellIndex]?.querySelector("input,select")?.focus();
    }
    if (e.key === "ArrowUp") {
      table.rows[rowIndex]?.cells[cellIndex]?.querySelector("input,select")?.focus();
    }
    if (e.key === "Enter") {
      e.preventDefault();
      table.rows[rowIndex + 2]?.cells[cellIndex]?.querySelector("input,select")?.focus();
    }
  };

  const addDetailRow = () => {
    setAgentDetValue([...agentDetValue, { Asptblagedetid: 0, BuyerCode: 0, BuyerName: 0, Notes: "" }]);
  };

  // const handleDetailChange = (index, e) => {
  //   const { name, value, type, checked } = e.target;
  //   const values = [...agentDetValue];
  //   const finalValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value;

  //   values[index] = {
  //     ...values[index],
  //     [name]: finalValue,
  //   };

  //   // Special logic for dropdown
  //   if (name === "BuyerCode") {
  //     const selected = buyersItems.find((item) => item.asptblbuymasid === Number(value));
  //     setGetBuyerName[index] = selected || "";
  //   }
  //   alert(JSON.stringify(getBuyerName));
  //   setAgentDetValue(values);
  // };

  const handleDetailChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    const updated = [...agentDetValue];

    const finalValue = type === "checkbox" ? checked : name === "BuyerCode" ? Number(value) : value;

    updated[index][name] = finalValue;

    // ✅ Auto fill BuyerName
    if (name === "BuyerCode") {
      const selected = buyersItems.find((item) => item.asptblbuymasid === Number(value));
      updated[index].BuyerName = selected?.buyername || "";
    }

    setAgentDetValue(updated);
  };

  const AgentMaster_New = async () => {
    setStateItems([]);
    setCountryItems([]);
    setAgentValue({});
    setAgentDetValue([{ Asptblagedetid: 0, BuyerCode: 0, BuyerName: 0, Notes: "" }]);
  };

  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };

  const deleteRow = (index) => {
    const updated = [...agentDetValue];
    updated.splice(index, 1);
    if (updated.length === 0) {
      setAgentDetValue([{ id: 1, Asptblagedetid: 0, BuyerCode: 0, BuyerName: "", notes: "" }]);
    } else {
      const reordered = updated.map((item, i) => ({ ...item, id: i + 1 }));
      setAgentDetValue(reordered);
    }
  };

  const AgentMaster_Check = async (row) => {
    try {
      const [res, resDetails] = await Promise.all([axios.get(`${insert_update}/${row.asptblagemasid}`), axios.get(`${getDetails}/${row.asptblagemasid}`)]);

      const data = res?.data;
      const details = resDetails?.data || [];

      if (!data) return;

      setAgentValue({
        asptblagemasid: data.asptblagemasid,
        agentCategory: data.agentCategory,
        agentCode: data.agentCode,
        agentName: data.agentName,
        city: data.city,
        state: data.state,
        country: data.country,
        address: data.address,
        contactNo: data.contactNo,
        pinCode: data.pinCode,
        email: data.email,
        active: data.active === "T",
      });

      handleStateChange(data.state);
      handleCountryChange(data.country);

      const formattedDetails = details.map((d) => ({
        Asptblagedetid: d.asptblagedetid,
        BuyerCode: d.asptblbuymasid, // ✅ correct field
        BuyerName: d.buyername, // ✅ correct
        Notes: d.notes,
      }));
      setGetBuyerName(formattedDetails.map((d) => ({ asptblbuymasid: d.BuyerCode, buyername: d.BuyerName })));
      setAgentDetValue(formattedDetails);
    } catch (error) {
      toast.error(error?.message || "Failed to load Buyer");
    } finally {
      setNewButton(1);
    }
  };

  const AgentMaster_Save = async () => {
    try {
      const agentData = {
        Asptblagemasid: agentValue.asptblagemasid || 0,
        AgentCategory: agentValue.agentCategory,
        AgentCode: agentValue.agentCode,
        AgentName: agentValue.agentName,
        City: agentValue.city,
        State: agentValue.state,
        Country: agentValue.country,
        Address: agentValue.address,
        ContactNo: agentValue.contactNo,
        PinCode: agentValue.pinCode,
        Email: agentValue.email,
        Active: agentValue.active === true ? "T" : "F",
      };

      const payload = {
        Master: agentData,
        Details: agentDetValue,
      };

      const response = await axios.post(insert_update, payload);

      if (response?.data) {
        AgentMaster_New();
        toast.success(response.data);
      } else {
        toast.error("Error saving data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data || error.message || "Save failed");
    }
  };

  const AgentMaster_Delete = async (id) => {
    if (!id) {
      toast.error("Empty Not Allowed");
      return;
    }

    try {
      const response = await axios.delete(`${insert_update}/${id}`);
      if (response.data === "true") {
        AgentMaster_New();
        toast.success("Record Deleted Successfully");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error(error?.message || "Delete failed");
    }
  };

  const commentsData = useMemo(() => {
    let computedComments = agentItems;
    if (agentsearch) {
      computedComments = computedComments.filter((item) => item.agentCode?.toLowerCase().includes(agentsearch.toLowerCase()));
    }
    setTotalItems(computedComments.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [agentItems, currentPage, agentsearch, sorting]);

  const menuButtons = [
    { key: "news", label: "News", action: AgentMaster_New },
    { key: "saves", label: "Save", action: AgentMaster_Save },
    { key: "deletes", label: "Delete", action: AgentMaster_Delete },
    { key: "searches", label: "Search", action: AgentMaster_New },
    { key: "prints", label: "Prints", action: AgentMaster_New },
    { key: "treebutton", label: "TreeButton", action: AgentMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: AgentMaster_New },
    { key: "login", label: "Login", action: AgentMaster_New },
    { key: "changepassword", label: "Changepassword", action: AgentMaster_New },
    { key: "changeskin", label: "Changeskin", action: AgentMaster_New },
    { key: "contact", label: "Contact", action: AgentMaster_New },
    { key: "pdf", label: "Pdf", action: AgentMaster_New },
    { key: "import", label: "Import", action: AgentMaster_New },
    { key: "download", label: "Download", action: AgentMaster_New },
  ];

  return (
    <>
      {userRights?.length > 0 ? (
        <div className="container-fluid animate-zoom p-1">
          <div className="row" style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
            <ul className="d-flex justify-content-end">
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
            </ul>
            <div className="row pt-1">
              <ul className="col-md-12" style={{ backgroundColor: `${colorValue}` }}>
                <li className="col-md-1 ps-2">
                  {" "}
                  <button className={newButton === 1 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor: `${colorValue}`, padding: "1%", fontWeight: "bold" }}>
                    {title}{" "}
                  </button>
                </li>
                <li className="col-md-1 ps-2">
                  {" "}
                  <button className={newButton === 2 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(2)} style={{ backgroundColor: `${colorValue}`, fontWeight: "bold" }}>
                    {" "}
                    {subTitle}{" "}
                  </button>
                </li>
              </ul>
            </div>

            <div className="content-tabs pt-1">
              <div className={newButton === 1 ? "content active-content" : "content"}>
                <div className="col-6">
                  <div className="row">
                    <label className="col-md-2">ID</label>
                    <input className="col-md-2" type="text" name="asptblagemasid" value={agentValue.asptblagemasid || ""} onChange={handleChange} />
                  </div>
                  <div className="row pt-1">
                    <label className="col-md-2">Category</label>
                    <select className="col-md-10" type="text" name="agentCategory" value={agentValue.agentCategory || ""} onChange={handleChange} autoFocus>
                      <option></option>
                      {categoryItems !== null &&
                        categoryItems.map((result, index) => (
                          <option key={index} value={result.gtcategorymastid}>
                            {result.categoryname}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="row pt-1">
                    <label className="col-md-2">AgentCode</label>
                    <input className="col-md-2" type="text" name="agentCode" value={agentValue.agentCode || ""} onChange={handleChange} />
                    <label className="col-md-2">AgentName</label>
                    <input className="col-md-6 " type="text" name="agentName" value={agentValue.agentName || ""} onChange={handleChange} />
                  </div>

                  <div className="row py-1">
                    <label className="col-md-2">ShipingAgent</label>
                    <input className="col-md-5 " type="text" name="shipingAgent" value={agentValue.shipingAgent || ""} onChange={handleChange} />
                    <label className="col-md-2"> AgentCity </label>

                    <select className="col-sm-3" name="city" value={agentValue.city || ""} onChange={handleChange}>
                      <option></option>
                      {cityItems !== null &&
                        cityItems.map((result, index) => (
                          <option key={index} value={result.gtcitymastid}>
                            {result.cityname}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="row">
                    <label className="col-md-2"> AgentState </label>

                    <select className="col-md-5" name="state" value={agentValue.state} onChange={handleChange}>
                      {stateItems !== null &&
                        stateItems.map((result, index) => (
                          <option key={index} value={result.gtstatemastid}>
                            {result.statename}
                          </option>
                        ))}
                    </select>

                    <label className="col-md-2"> AgentCountry </label>
                    <select className="col-md-3" name="country" value={agentValue.country} onChange={handleChange}>
                      {countryItems !== null &&
                        countryItems.map((result, index) => (
                          <option key={index} value={result.gtcountrymastid}>
                            {result.countryname}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="row pt-1 ">
                    <label className="col-md-2"> Address </label>
                    <textarea className="col-md-10" rows="4" type="text" name="address" value={agentValue.address || ""} onChange={handleChange}>
                      {" "}
                    </textarea>
                  </div>

                  <div className="row pt-1">
                    <label className="col-md-2"> Email </label>
                    <input className="col-md-10" type="email" name="email" value={agentValue.email || ""} onChange={handleChange} />
                  </div>

                  <div className="row pt-1">
                    <label className="col-md-2"> Contact No </label>
                    <input className="col-md-5" type="text" name="contactNo" value={agentValue.contactNo || ""} onChange={handleChange} />
                    <label className="col-md-2"> PinCode</label>
                    <input className="col-md-3" type="text" name="pinCode" value={agentValue.pinCode || ""} onChange={handleChange} />
                  </div>
                  <div className="row pt-1">
                    <label className="col-md-2"> Active </label>
                    <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" name="active" checked={agentValue.active} onChange={handleChange} />
                      <span></span>
                      <i className="indicator"></i>
                    </label>
                  </div>
                </div>

                <div className="col-12 col-md-12" style={{ height: "180px", overflowY: "auto", marginTop: "10px" }}>
                  <table className="table animate-zoom table-responsive">
                    <thead style={{ backgroundColor: colorValue, color: foreValue }} className="position-sticky">
                      <tr style={{ backgroundColor: colorValue, color: foreValue }}>
                        <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>SNo</th>
                        <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>GridID</th>
                        <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>BuyerCode</th>
                        <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>BuyerName</th>
                        <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>Notes</th>
                        <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agentDetValue.map((row, index) => (
                        <tr key={row.index} className="col-md-12">
                          <td style={{ margin: "0px", padding: "0px" }}>{index + 1}</td>
                          <td style={{ margin: "0px", padding: "0px", width: "100px" }}>
                            <input type="text" name="Asptblagedetid" style={{ padding: "2px" }} className="col-sm-12 col-md-12 col-lg-12" value={row.Asptblagedetid} />
                          </td>
                          <td style={{ margin: "0px", padding: "0px" }}>
                            <select className="col-12 " name="BuyerCode" value={row.BuyerCode} onChange={(e) => handleDetailChange(index, e)}>
                              <option value=""></option>
                              {buyersItems?.map((d) => (
                                <option key={d.asptblbuymasid} value={d.asptblbuymasid}>
                                  {d.buyercode}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td style={{ margin: "0px", padding: "0px" }}>
                            <select className="col-sm-12 col-md-12 col-lg-12" name="BuyerName" value={row.BuyerName || ""} onChange={(e) => handleDetailChange(index, e)}>
                              {getBuyerName?.map((d) => (
                                <option key={d.asptblbuymasid} value={d.buyername}>
                                  {d.buyername}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td style={{ margin: "0px", padding: "0px" }}>
                            <input type="text" style={{ padding: "2px" }} name="notes" className="col-sm-12 col-md-12 col-lg-12" value={row.notes || ""} onKeyDown={handleKeyDown} onChange={(e) => handleDetailChange(index, e)} />
                          </td>
                          <td style={{ margin: "0px", padding: "0px" }}>
                            <button style={{ margin: "0px", padding: "0px", textAlign: "center", color: "red" }} className="btn btn-danger fa-trash  fa fa-lg" onClick={() => deleteRow(index)}></button>
                          </td>
                          <td style={{ margin: "0px", padding: "0px", width: "0px" }}>
                            {" "}
                            <input style={{ margin: "0px", padding: "0px", width: "0px", border: "none" }} onFocus={() => addDetailRow()} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={newButton === 2 ? "content active-content" : "content"}>
                <Search
                  colorValue={""}
                  searchs={agentsearch}
                  setsearchs={setAgentSearch}
                  SearchLable1={searchLable1}
                  SearchLable2={searchLable2}
                  SearchLable3={searchLable3}
                  stylecolor={foreValue}
                  handleChange={handleChange}
                  ChangeValues={agentValue}
                  searchCompCode={searchCompCode}
                  searchUserName={searchUserName}
                />

                <DataTable
                  heights={heights}
                  colorValue={foreValue}
                  headers={AgentMasterColumn}
                  comments={agentItems}
                  setComments={setAgentItems}
                  foreValue={foreValue}
                  searches={agentsearch}
                  setSearches={setAgentSearch}
                  totalItems={totalItems}
                  setTotalItems={setTotalItems}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  sorting={sorting}
                  setSorting={setSorting}
                  ITEM_PER_PAGE={ITEM_PER_PAGE}
                  EditData={AgentMaster_Check}
                  commentsData={commentsData}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>
      )}
    </>
  );
};

export default AgentMaster;
