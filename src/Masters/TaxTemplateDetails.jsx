import React, { useContext, useEffect, useMemo, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import { useRef } from "react";
import SocialMissing from "../Social/SocialMissing";
import { utilityState } from "../utilityState";

const TaxTemplateDetails = ({ title, subTitle }) => {
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
    taxTempDetails,
    setTaxTempDetails,
    addCompcodes,
    setAddCompcodes,
    details,
    setDetails,
  } = useContext(DataContext);

  const [checkall, setCheckAll] = useState(false);
  const [taxnameDescValue, setTaxNameDescValue] = useState([]);
  const [company_items, setCompanyItems] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [taxDetails_Search, setTaxDetails_Search] = useState([]);
  const [taxDetails_FilterSearch, setTaxDetails_FilterSearch] = useState([]);
  const [taxDetailsItems, setTaxDetailsItems] = useState([]);
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [city_active, setCityActive] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [taxAdName, setTaxAdName] = useState([]);
  const [checkchild, setCheckchild] = useState(false);
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  //const CompanyMasterGrid=`${API_URL}/CompanyMaster/CompanyMaster`;
  const CompanyMasterGrid = `${API_URL}/CompanyMaster/GridLoad`;
  const CountryParam = `${API_URL}/StateMaster/GridLoad`;
  const CityParam = `${API_URL}/  TaxTemplate/GridLoad`;
  const TaxTempMasters = `${API_URL}/TaxTempMasters`;
  const insert_update = `${API_URL}/TaxTemFullDto`;
  const getCompcode = `${API_URL}/TaxTemFullDto/compcode`;
  const getDetails = `${API_URL}/TaxTemFullDto/details`;
  // const deleteData = `${API_URL}/  TaxTemplate/DeleteCommond`;
  const heights = "380px";

  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");

  const HeadersColumn = [
    { headername: "", field: "visible" },
    { headername: "id", field: "asptbltaxtemdetmasid" },
    { headername: "TAXNAME", field: "taxName" },
    { headername: "ACTIVE", field: "active" },
  ];

  const refs = useRef([]);

  const handleChange = (e) => {
    utilityState(e, setTaxTempDetails);
  };

  let validcheck = true;
  const validate = (taxTempDetails) => {
    if (!taxTempDetails.taxName?.trim()) {
      toast.error("Invalid City Name");
      return false;
    }

    if (!/^[0-9\s]+$/.test(taxTempDetails.taxName)) {
      toast.error("Special Character not allowed");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const fetApi = async () => {
      try {
        const [menuRes, comRes, taxAdNameRes, taxItemsRes] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(CompanyMasterGrid),
          axios.get(TaxTempMasters),
          axios.get(insert_update),
        ]);

        setUserRights(menuRes.data);
        setCompanyItems(comRes.data);
        setTaxAdName(taxAdNameRes.data);
        setTaxDetailsItems(taxItemsRes.data);
      } catch (error) {
        setFetchError(error);
      } finally {
        setNewButton(1);
      }
    };

    fetApi();
  }, [defaultDetails?.Compcode, defaultDetails?.User, title]);

  useEffect(() => {
    if (!taxDetails_Search) {
      setTaxDetails_FilterSearch(taxDetailsItems);
      return;
    }

    const search = String(taxDetails_Search || "").toLowerCase();
    const filtered = taxDetailsItems.filter((item) => item.taxName?.toLowerCase().includes(search));

    setTaxDetails_FilterSearch(filtered);
  }, [taxDetailsItems, taxDetails_Search]);

  const handleCompChange = (index, e) => {
    const { value } = e.target;

    const values = [...addCompcodes];
    const selected = company_items.find((item) => item.gtcompmastid === Number(value));
    values[index] = {
      ...values[index],
      compcode: Number(value),
      compname: selected?.compname?.toUpperCase() || "",
    };
    setAddCompcodes(values);
  };

  const handleDetailChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const values = [...details];
    const finalValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value;

    values[index] = {
      ...values[index],
      [name]: finalValue,
    };

    // Special logic for dropdown
    if (name === "adName") {
      const selected = taxAdName.find((item) => item.asptblTaxTemMasid === Number(value));
      values[index].aliasname = selected?.taxName?.toUpperCase() || "";
    }

    setDetails(values);
  };

  // const [addCompcodes, setAddCompcodes] = useState([{ id: 1, compcode: 0, compname: "", notes: "" }]);
  // const [details, setDetails] = useState([{ sNo: 1, asptbltaxtemDetailsid: 0, adName: 0, adType: "", aliasname: "", idNo: "", formula: "", sugg: "", notes: "" }]);
  const addCompRow = () => {
    setAddCompcodes([...addCompcodes, { id: 1, compcode: "", compname: "", notes: "" }]);
  };
  const addDetailRow = () => {
    setDetails([...details, { sNo: 1, asptbltaxtemDetailsid: 0, adName: 0, adType: "", aliasname: "", idNo: "", formula: "", sugg: "", notes: "" }]);
  };

  const TaxTemplateCheck = async (id) => {
    try {
      const masterId = id.asptbltaxtemdetmasid;

      const [res, res1, res2] = await Promise.all([axios.get(`${insert_update}/${masterId}`), axios.get(`${getCompcode}/${masterId}`), axios.get(`${getDetails}/${masterId}`)]);

      const row = res?.data;
      if (!row) return;
      let updatedData = { ...row, active: row.active === "T" };
      setTaxTempDetails(updatedData);
      setAddCompcodes(res1?.data || []);
      setDetails(res2?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setNewButton(1);
    }
  };

  const TaxTemplate_Save = async () => {
    const data = {
      Master: taxTempDetails,
      Compcodes: addCompcodes,
      Details: details,
    };
    try {
      const response = await axios.post(insert_update, data);
      if (response?.data) {
        setNewButton(1);
        // Optional: refresh list
        const res = await axios.get(insert_update);
        setTaxDetailsItems(res.data);
        toast.success("Record Saved Successfully");

        // ✅ move inside success
        TaxTemplate_New();
      } else {
        toast.error("Failed to save data");
      }
    } catch (error) {
      console.error(error);

      // ✅ show proper error
      const message = error?.response?.data || error.message || "Something went wrong";

      toast.error(message);
    }
  };

  const TaxTemplate_Delete = async (index) => {
    try {
      const updated = [...details];
      updated.splice(index, 1);
      const reordered = updated.map((item, i) => ({
        ...item,
        sNo: i + 1,
      }));
      setDetails(reordered);
    } catch (error) {
      toast.error(error?.message || "Server error");
    }
  };

  const TaxTemplate_New = () => {
    setNewButton(1);
    setTaxTempDetails([]);
    setCityCountryData([]);
    setDetails([{ sNo: 1, asptbltaxtemDetailsid: "", adName: "", adType: "", aliasname: "", formula: "", sugg: "", notes: "" }]);
    setAddCompcodes([{ id: 1, compcode: "", compname: "", notes: "" }]);
  };

  const TaxTemplate_Search = () => {};

  const handleEnter = (e, index) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

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

  const deleteRow = (index) => {
    const updated = [...details];
    updated.splice(index, 1);
    if (updated.length === 0) {
      setDetails([{ sNo: 1, asptbltaxtemDetailsid: 0, adName: 0, adType: "", aliasname: "", idNo: "", formula: "", sugg: "", notes: "" }]);
    } else {
      const reordered = updated.map((item, i) => ({ ...item, sNo: i + 1 }));
      setDetails(reordered);
    }
  };

  const deleteRow1 = (index) => {
    const updated = addCompcodes.filter((_, i) => i !== index);
    setAddCompcodes(updated);
    if (addCompcodes.length === 1) {
      setAddCompcodes([{ id: 1, compcode: 0, compname: "", notes: "" }]);
    }
  };

  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };

  const commentsData = useMemo(() => {
    let search = String(taxDetails_Search || "").toLowerCase();
    let computedComments = taxDetailsItems;

    if (search) {
      computedComments = computedComments.filter((item) => {
        const country = String(item.taxName || "").toLowerCase();
        return country.includes(search);
      });
    }

    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [taxDetailsItems, currentPage, taxDetails_Search, sorting]);

  const menuButtons = [
    { key: "news", label: "News", action: TaxTemplate_New },
    { key: "saves", label: "Save", action: TaxTemplate_Save },
    { key: "deletes", label: "Delete", action: TaxTemplate_Delete },
    { key: "searches", label: "Search", action: TaxTemplate_Search },
    { key: "prints", label: "Prints", action: TaxTemplate_New },
    { key: "treebutton", label: "TreeButton", action: TaxTemplate_New },
    { key: "globalsearch", label: "Globalsearch", action: TaxTemplate_New },
    { key: "login", label: "Login", action: TaxTemplate_New },
    { key: "changepassword", label: "Changepassword", action: TaxTemplate_New },
    { key: "changeskin", label: "Changeskin", action: TaxTemplate_New },
    { key: "contact", label: "Contact", action: TaxTemplate_New },
    { key: "pdf", label: "Pdf", action: TaxTemplate_New },
    { key: "import", label: "Import", action: TaxTemplate_New },
    { key: "download", label: "Download", action: TaxTemplate_New },
  ];

  return (
    <>
      {userRights?.length > 0 && (
        <div className="container-fluid animate-zoom p-1">
          <div className="row" style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
            <ul className="boxShadow d-flex justify-content-end">
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
            <ul className="" style={{ backgroundColor: `${colorValue}` }}>
              <li className="ps-2">
                {" "}
                <button className={newButton === 1 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor: `${colorValue}`, padding: "1%", fontWeight: "bold", width: "100%" }}>
                  {title}{" "}
                </button>
              </li>
              <li className="ps-2">
                {" "}
                <button className={newButton === 2 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(2)} style={{ backgroundColor: `${colorValue}`, fontWeight: "bold", width: "100%" }}>
                  {" "}
                  {subTitle}{" "}
                </button>
              </li>
            </ul>
            <div className={newButton === 1 ? "content active-content" : "content"}>
              <div className="row p-2">
                <div className="col-md-3  float-start">
                  <div className="row">
                    <label className="col-md-4"> ID </label>
                    <input className="col-md-8" type="text" name="asptbltaxtemdetmasid" value={taxTempDetails.asptbltaxtemdetmasid || ""} readOnly />
                  </div>
                  <div className="row pt-1">
                    <label className="col-md-4"> TaxName </label>
                    <input type="text" className="col-sm-8" name="taxName" value={taxTempDetails.taxName || ""} onChange={handleChange} ref={(el) => (refs.current[1] = el)} onKeyDown={(e) => handleEnter(e, 1)} />
                  </div>

                  <div className="row pt-1">
                    <label className="col-md-4"> Active </label>
                    <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" name="active" checked={taxTempDetails.active || false} onChange={handleChange} />
                      <span></span>
                      <i className="indicator"></i>
                    </label>
                  </div>
                </div>{" "}
                <div className="col-md-1"></div>
                <div className="col-md-8">
                  <div style={{ height: "100px", overflow: "auto" }}>
                    <table className="table animate-zoom table-responsive">
                      <thead style={{ backgroundColor: colorValue, color: foreValue }}>
                        <tr style={{ backgroundColor: colorValue, color: foreValue }}>
                          <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>SNo</th>
                          <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>CompCode</th>
                          <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>CompName</th>
                          <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>Delete</th>
                        </tr>
                      </thead>
                      <tbody className="col-sm-12 col-md-12 col-lg-12">
                        {addCompcodes.map((row1, index) => (
                          <tr key={row1.id} className="col-sm-12 col-md-12 col-lg-12">
                            <td style={{ margin: "0px", paddingLeft: "20px", width: "10px" }}>{index + 1}</td>
                            <td className="col-sm-2 col-md-2 col-lg-2" style={{ margin: "0px", padding: "0px" }}>
                              <select className="col-sm-12 col-md-12 col-lg-12" name="compcode" value={row1.compcode || ""} onKeyDown={handleKeyDown} onChange={(e) => handleCompChange(index, e)}>
                                <option></option>
                                {company_items !== null &&
                                  company_items.map((result, index) => (
                                    <option key={index} value={result.gtcompmastid}>
                                      {result.compcode}
                                    </option>
                                  ))}
                              </select>
                            </td>
                            <td className="col-sm-12 col-md-12 col-lg-12" style={{ margin: "0px", padding: "0px" }}>
                              <input type="text" name="compname" value={row1.compname || ""} className="col-sm-12 col-md-12 col-lg-12" style={{ padding: "2px" }} onKeyDown={handleKeyDown} onChange={(e) => handleCompChange(index, e)} />
                            </td>

                            <td className="col-sm-12 col-md-12 col-lg-12" style={{ margin: "0px", padding: "0px" }}>
                              <button style={{ margin: "0px", padding: "0px", textAlign: "center", color: "red" }} className="btn btn-danger fa-trash  fa fa-lg" onClick={() => deleteRow1(index)} onKeyDown={handleKeyDown}></button>
                            </td>
                            <td style={{ margin: "0px", padding: "0px", width: "0px" }}>
                              {" "}
                              <input style={{ margin: "0px", padding: "0px", width: "0px", border: "none" }} onKeyDown={handleKeyDown} onFocus={() => addCompRow()} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div style={{ height: "340px", overflow: "auto" }}>
                <table className="table animate-zoom table-responsive">
                  <thead style={{ backgroundColor: colorValue, color: foreValue }}>
                    <tr style={{ backgroundColor: colorValue, color: foreValue }}>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>SNo</th>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>GridID</th>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>AdName</th>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>AddType</th>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>AliasName</th>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>ID</th>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>Formula</th>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>Sugg</th>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>Notes</th>
                      <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((row, index) => (
                      <tr key={row.index}>
                        <td style={{ margin: "0px", padding: "0px" }}>{index + 1}</td>
                        <td style={{ margin: "0px", padding: "0px", width: "100px" }}>
                          <input type="text" name="asptbltaxtemDetailsid" style={{ padding: "2px" }} className="col-sm-12 col-md-12 col-lg-12" value={row.asptbltaxtemDetailsid} />
                        </td>
                        <td style={{ margin: "0px", padding: "0px" }}>
                          <select className="col-md-12" name="adName" value={row.adName} onKeyDown={handleKeyDown} onChange={(e) => handleDetailChange(index, e)}>
                            <option value=""></option>
                            {taxAdName !== null &&
                              taxAdName.map((d, index) => (
                                <option key={index} value={d.asptblTaxTemMasid}>
                                  {d.taxName}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td style={{ margin: "0px", padding: "0px" }}>
                          <select className="col-sm-12 col-md-12 col-lg-12" name="adType" value={row.adType} onKeyDown={handleKeyDown} onChange={(e) => handleDetailChange(index, e)}>
                            <option value=""></option>
                            <option value="Plus">Plus</option>
                            <option value="Minus">Minus</option>
                            <option value="Both">Both</option>
                          </select>
                        </td>
                        <td style={{ margin: "0px", padding: "0px" }}>
                          <input type="text" style={{ padding: "2px" }} name="aliasname" className="col-sm-12 col-md-12 col-lg-12" readOnly={true} value={row.aliasname} onKeyDown={handleKeyDown} onChange={(e) => handleDetailChange(index, e)} />
                        </td>
                        <td style={{ margin: "0px", padding: "0px", width: "80px" }}>
                          <input type="text" style={{ padding: "2px" }} name="idNo" className="col-sm-12 col-md-12 col-lg-12" value={row.idNo} onKeyDown={handleKeyDown} onChange={(e) => handleDetailChange(index, e)} />
                        </td>
                        <td style={{ margin: "0px", padding: "0px", width: "25%" }}>
                          <input type="text" style={{ padding: "2px" }} name="formula" className="col-sm-12 col-md-12 col-lg-12" value={row.formula} onKeyDown={handleKeyDown} onChange={(e) => handleDetailChange(index, e)} />
                        </td>
                        <td style={{ margin: "0px", padding: "0px" }}>
                          <select className="col-sm-12 col-md-12 col-lg-12" value={row.sugg} onKeyDown={handleKeyDown} name="sugg" onChange={(e) => handleDetailChange(index, e)}>
                            <option value=""></option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td style={{ margin: "0px", padding: "0px" }}>
                          <input type="text" style={{ padding: "2px" }} name="notes" className="col-sm-12 col-md-12 col-lg-12" value={row.notes} onKeyDown={handleKeyDown} onChange={(e) => handleDetailChange(index, e)} />
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
              <div className="row">
                <div className="col-md-12">
                  <Search
                    colorValue={colorValue}
                    searchs={taxDetails_Search}
                    setsearchs={setTaxDetails_Search}
                    SearchLable1={searchLable1}
                    SearchLable2={searchLable2}
                    SearchLable3={searchLable3}
                    stylecolor={foreValue}
                    handleChange={handleChange}
                    ChangeValues={taxTempDetails}
                    searchCompCode={searchCompCode}
                    searchUserName={searchUserName}
                  />
                  <DataTable
                    heights={heights}
                    colorValue={colorValue}
                    headers={HeadersColumn}
                    comments={taxDetailsItems}
                    setComments={setTaxDetailsItems}
                    foreValue={foreValue}
                    searches={taxDetails_Search}
                    setSearches={setTaxDetails_Search}
                    totalItems={totalItems}
                    setTotalItems={setTotalItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    sorting={sorting}
                    setSorting={setSorting}
                    ITEM_PER_PAGE={ITEM_PER_PAGE}
                    EditData={TaxTemplateCheck}
                    commentsData={commentsData}
                    setCheckchild={setCheckchild}
                    checkall={checkall}
                    setCheckAll={setCheckAll}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {fetchError && <SocialMissing message={fetchError} />}
    </>
  );
};

export default TaxTemplateDetails;
