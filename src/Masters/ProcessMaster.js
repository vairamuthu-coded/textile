import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import ActionButtton from "../ActionButtton";
import TabNav from "../component/TabNav";
import Popup from "../Popup";
import { toast } from "react-toastify";
import CustomSelect from "../Custom/CustomSelect";
const ProcessMaster = ({ title, subTitle, colorValue }) => {
  const { handleSubmit, API_URL, newButton, defaultDetails, processValues, setProcessValues, currentPage, setCurrentPage, foreValue, sorting, setSorting, setNewButton } = useContext(DataContext);
  const refs = useRef([]);
  const handleEnter = (e, index) => {
    const { name } = e.target;

    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (e) => {
    e.target.style.backgroundColor = `${colorValue}`;
    e.target.style.color = `${"var(--bs-light)"}`;
    e.target.style.fontWeight = "bolder";
  };

  const handleBlur = (e) => {
    e.target.style.backgroundColor = "";
    e.target.style.color = `${"var(--bs-dark)"}`;
  };
  let ITEM_PER_PAGE = 50;
  const GetProcess = `${API_URL}/ProcessMaster/GetProcess`;
  const insert_update = `${API_URL}/ProcessMaster`;
  const GetHsn = `${API_URL}/HsnMasters`;
  const GetRights = `${API_URL}/UserRights/userrightsMenuCheck`;
  let validcheck = true;
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState([]);
  const [items, setItems] = useState([]);
  const [hsnValues, setHsnValues] = useState([]);
  const [userRights1, setUserRights1] = useState([]);
  const [country_FilterSearch, setCountry_FilterSearch] = useState([]);
  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };
  const tabs = [
    { id: 1, label: title },

    { id: 2, label: subTitle },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [processResponse, rightsResponse, hsnRes] = await Promise.all([axios.get(GetProcess), axios.get(`${GetRights}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(GetHsn)]);
        setItems([...processResponse.data].reverse());
        setUserRights1(rightsResponse.data);
        setHsnValues(hsnRes.data);
        setNewButton(1);
      } catch (error) {
        console.error("API Error:", error);
        toast.error("Service is not running. Please check ProcessMaster API in Country Controller.");
      }
    };

    loadData();
  }, [defaultDetails?.Compcode, defaultDetails?.User, title]);

  useEffect(() => {
    const filterResult = items.filter((post) => post.processname.includes(search));
    setCountry_FilterSearch(filterResult.reverse());
  }, [items, search]);

  const HeadersColumn = [
    { headername: "SNo", field: "SNo", visible: "true" },
    { headername: "", field: "none", visible: "true" },
    { headername: "id", field: "asptblpromasid", visible: "false" },
    { headername: "ProcessName", field: "processname", visible: "true" },
    { headername: "Active", field: "active", visible: "true" },
  ];

  const heights = "420px";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setProcessValues((previousValue) => {
      return {
        ...previousValue,
        [name]: newValue,
      };
    });
  };

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setprocessValues(values => ({ ...values, [name]: value }))

  // }
  const validate = (processValues) => {
    if (!processValues.processname.trim()) {
      alert("Invalid ProcessName");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(processValues.processname)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  };

  const ProcessMaster_Check = (id) => {
    try {
      const myitem = items.find((item) => item.asptblpromasid === id.asptblpromasid);

      if (!myitem) {
        setFetchError("Process not found.");
        return;
      }

      const updatepost = {
        asptblpromasid: myitem.asptblpromasid,
        processname: myitem.processname,
        ProcessType: myitem.processType,
        ShortCode: myitem.shortCode,
        HsnCode: myitem.hsnCode,
        active: myitem.active === "T",
      };

      setProcessValues(updatepost);
    } catch (err) {
      console.error("ProcessMaster_Check Error:", err);

      if (err.response) {
        setFetchError(err.response);
      } else {
        setFetchError(err.message);
      }
    } finally {
      setNewButton(1);
    }
  };

  const ProcessMaster_Save = async () => {
    try {
      const CountryData = {
        asptblpromasid: Number(processValues.asptblpromasid) > 0 ? Number(processValues.asptblpromasid) : 0,
        processname: processValues.processname,
        active: processValues.active === true ? "T" : "F",
        ProcessType: processValues.ProcessType,
        ShortCode: processValues.ShortCode,
        HsnCode: processValues.HsnCode,
      };

      const response = await axios.post(insert_update, CountryData);
      if (response.data === true) {
        // Refresh Process Master list
        const processResponse = await axios.get(GetProcess);

        setItems([...processResponse.data].reverse());
        setNewButton(2);

        // Message
        if (CountryData.asptblpromasid !== 0) {
          alert("Updated Successfully");
        } else {
          alert("Record Saved Successfully");
        }
      } else {
        alert("Error " + response.data);
      }
    } catch (error) {
      console.error("ProcessMaster_Insert Error:", error);

      if (error.response) {
        alert(error.response.data?.message || error.response.data || "Server error");
      } else if (error.request) {
        alert("Service is not running. Please check ProcessMaster API.");
      } else {
        alert(error.message);
      }
    }
  };

  const ProcessMaster_Delete = async (id) => {
    try {
      if (!processValues.processname?.trim()) {
        alert("Empty Not Allowed");
        return;
      }

      const processId = Number(processValues.asptblpromasid || id?.asptblpromasid);

      if (processId < 1) {
        alert("Please select a record to delete.");
        return;
      }

      const response = await axios.delete(`${insert_update}/${processId}`);

      if (response.data === true) {
        const processResponse = await axios.get(GetProcess);

        setItems([...processResponse.data].reverse());

        alert("Record Deleted Successfully");
        setNewButton(2);
      } else {
        alert("Error " + response.data);
      }
    } catch (error) {
      console.error("ProcessMaster_Delete Error:", error);
      setFetchError(error.response?.data || error.message);
    }
  };

  const inputref = useRef();

  const ProcessMaster_New = () => {
    setProcessValues({});
  };

  const commentsData = useMemo(() => {
    let computedComments = items;
    if (search) {
      computedComments = computedComments.filter((item) => item.processname.includes(search));
    }
    setTotalItems(computedComments.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }

    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [items, currentPage, search, sorting]);

  var Options = [
    { label: "OTHER PROCESS", value: "OTHER PROCESS" },
    { label: "CMT PROCESS", value: "CMT PROCESS" },
  ];

  return (
    <>
      {userRights1?.length > 0 && (
        <div className="container-fluid animate-zoom" style={{ backgroundColor: "whitesmoke" }}>
          <div className="row" style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>
            <div className="container-fluid">
              <div className="row" style={{ backgroundColor: "white" }}>
                {!fetchError && items !== null ? (
                  <>
                    <div className="col-md-12" style={{ textAlign: "right" }}>
                      <div style={{ backgroundColor: `${colorValue}` }}>
                        <ActionButtton
                          news={ProcessMaster_New}
                          saves={ProcessMaster_Save}
                          deletes={ProcessMaster_Delete}
                          searches={ProcessMaster_New}
                          prints={ProcessMaster_New}
                          treebutton={ProcessMaster_New}
                          globalsearch={ProcessMaster_New}
                          login={ProcessMaster_New}
                          changepassword={ProcessMaster_New}
                          changeskin={ProcessMaster_New}
                          contact={ProcessMaster_New}
                          pdf={ProcessMaster_New}
                          imports={ProcessMaster_New}
                          download={ProcessMaster_New}
                          userRights={userRights1}
                          colorValue={colorValue}
                          newButton={newButton}
                          foreValue={foreValue}
                          screenHeader="PROCESS MASTER"
                        />
                      </div>
                    </div>
                    <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />
                    <div className="content-tabs">
                      <div className={newButton === 1 ? "content active-content" : "content"}>
                        <div className="row py-1">
                          <label className="col-md-1">ID</label>

                          <input className="col-md-1" type="text" name="asptblpromasid" value={processValues.asptblpromasid || ""} readOnly />
                        </div>

                        <div className="row">
                          <label className="col-md-1">ProcessName</label>

                          <input className="col-md-2 p-2" type="text" name="processname" ref={inputref} value={processValues.processname || ""} onChange={handleChange} required />
                        </div>
                        <div className="row p-1">
                          <label className="col-md-1">ProcessType</label>

                          <CustomSelect
                            visible="block"
                            className="col-2 form-select"
                            name="ProcessType"
                            value={processValues.ProcessType || ""}
                            onChange={handleChange}
                            colorValue={colorValue}
                            tabIndex={10}
                            ref={(el) => (refs.current[10] = el)}
                            onKeyDown={(e) => handleEnter(e, 10)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                          >
                            {Options.map((buyer) => (
                              <option key={buyer.label} value={buyer.value}>
                                {buyer.label}
                              </option>
                            ))}
                          </CustomSelect>
                        </div>
                        <div className="row p-1">
                          <label className="col-md-1">ShortCode</label>
                          <input className="col-md-1 p-2" type="text" name="ShortCode" ref={inputref} value={processValues.ShortCode || ""} onChange={handleChange} required />
                        </div>

                        <div className="row">
                          <label className="col-md-1">HsnCode</label>

                          <CustomSelect
                            visible="block"
                            className="col-2 form-select"
                            name="HsnCode"
                            value={processValues.HsnCode || ""}
                            onChange={handleChange}
                            colorValue={colorValue}
                            tabIndex={10}
                            ref={(el) => (refs.current[10] = el)}
                            onKeyDown={(e) => handleEnter(e, 10)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                          >
                            {hsnValues.map((buyer) => (
                              <option key={buyer.asptblhsnmasid} value={buyer.asptblhsnmasid}>
                                {buyer.hsncode}
                              </option>
                            ))}
                          </CustomSelect>
                        </div>

                        <div className="row py-1">
                          <label className="col-md-2">Active</label>

                          <label className="col-md-1 checkbox">
                            <input type="checkbox" name="active" checked={processValues.active || false} onChange={handleChange} />

                            <span></span>
                            <i className="indicator"></i>
                          </label>
                        </div>
                      </div>
                      <div className={newButton === 2 ? "content active-content" : "content"}>
                        {!fetchError && newButton === 2 ? (
                          <DataTable
                            heights={heights}
                            colorValue={colorValue}
                            foreValue={foreValue}
                            headers={HeadersColumn}
                            comments={items}
                            setComments={setItems}
                            searches={search}
                            setSearches={setSearch}
                            totalItems={totalItems}
                            setTotalItems={setTotalItems}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            sorting={sorting}
                            setSorting={setSorting}
                            ITEM_PER_PAGE={ITEM_PER_PAGE}
                            EditData={ProcessMaster_Check}
                            commentsData={commentsData}
                          />
                        ) : (
                          <p style={{ marginTop: "2rem", color: "var(--bs-danger)" }}></p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessMaster;
