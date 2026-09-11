import React, { useContext, useEffect, useMemo, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import Search from "../Custom/Search";
import styled from "styled-components";
import { mobile } from "../ShoppingCart/Responsive";
import { toast } from "react-toastify";

const AutoGenerateMaster = ({ title, subTitle }) => {
  const {
    newButton,
    setNewButton,
    inputref,
    handleSubmit,
    selectedTitle,
    colorValue,
    loginUser,
    loginCompCode,
    autoValues,
    setAutoValues,
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
    defaultDetails,
    foreValue,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
  } = useContext(DataContext);
  const [totalItems, setTotalItems] = useState([]);
  const [auto_Search, setAuto_Search] = useState([]);
  const [auto_FilterSearch, setAuto_FilterSearch] = useState([]);
  const [autoItems, setAutoItems] = useState([]);
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [auto_active, setAutoActive] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const ScreenParam = API_URL + "/AutoGenerateMasters/GridLoad";
  const FinYearParam = API_URL + "/FinYearMasters";
  const CompCodeParam = API_URL + "/CompanyMaster/GridLoad";
  const insert_update = API_URL + "/AutoGenerateMasters/Saves";
  const deleteData = API_URL + "/AutoGenerateMasters/DeleteCommond";
  const MenuNameParam = API_URL + "/UserRights/menuname";
  const BarCodeTypeParam = API_URL + "/AutoGenerateMasters/BarCodeTypeParam";
  const heights = "400px";
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  const HeadersColumn = [
    { headername: "", field: "visible", checkboxSelection: true, width: 50 },
    { headername: "S.No", field: "SNo", width: 80 },
    { headername: "ID", field: "asptblautogeneratemasid" },
    { headername: "Sequence ID", field: "sequenceid" },
    { headername: "Fin Year", field: "finyear" },
    { headername: "Screen", field: "screen" },
    { headername: "Short Code", field: "shortcode" },
    { headername: "Sequence No", field: "sequenceno" },
    { headername: "Barcode Type", field: "barcodetype" },
    { headername: "Active", field: "active", cellRenderer: (params) => (params.value ? "Yes" : "No") },
  ];

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    let updatedValue = type === "checkbox" ? checked : value;

    // if (["sequenceno", "barcode", "barcode1"].includes(name)) {
    //   updatedValue = value.replace(/[^0-9]/g, "");
    // }

    setAutoValues((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    // if (["barcode", "barcode1", "barcodetype"].includes(name)) {
    //   handlebarcodetypeChange(name, updatedValue);
    // }

    // if (name === "SearchFinyear") {
    //   try {
    //     const res = await axios.get(`${ScreenParam}/2024/${updatedValue}`);
    //     setAutoItems(res.data);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
  };

  const [userRights1, setUserRights1] = useState([]);
  const [finYearData, setFinyearData] = useState([]);
  const [searchfinYearData, setSearchFinyear] = useState(["2024", "2025", "2026"]);

  const [compCodeData, setCompCodeData] = useState([]);
  const [screenData, setScreenData] = useState([]);
  const [barCodeType, setBarcodeType] = useState([]);
  const [barCodeValue, setBarbarCodeValue] = useState([]);
  const [barCode1Value, setBarcode1Value] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res0, res1, res2, res3, res4, res5, res6] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(`${ScreenParam}`),
          axios.get(`${FinYearParam}`),
          axios.get(`${CompCodeParam}`),
          axios.get(`${MenuNameParam}`),
          axios.get(`${BarCodeTypeParam}`),
        ]);
        setUserRights1(res0.data);
        setAutoItems(res1.data);
        setFinyearData(res2.data);
        setCompCodeData(res3.data);
        setScreenData(res4.data);
        setBarcodeType(res5.data);
      } catch (error) {
        toast.error("Error Loading: " + error.message);
        setFetchError(error);
      }
    };

    fetchData();
  }, []);

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  useEffect(() => {
    if (!autoItems?.length) return;
    const search = auto_Search.toString().toLowerCase();
    const filterResult = autoItems.filter((item) => item.screen?.toString().toLowerCase().includes(search) || item.sequenceno?.toString().toLowerCase().includes(search)).slice();

    setAuto_FilterSearch(filterResult);
  }, [autoItems, auto_Search]);

  const GridLoad_Check = async (id) => {
    try {
      const res = await axios.get(`${ScreenParam}/${id.asptblautogeneratemasid}`);

      if (!res.data || res.data.length === 0) {
        toast.error("Invalid Data");
        return;
      }

      const row = res.data[0];

      setAutoValues({
        asptblautogeneratemasid: row.asptblautogeneratemasid || 0,
        sequenceid: row.sequenceid,
        shortcode: row.shortcode,
        FinYear: row.finYear,
        screen: row.screen,
        sequenceno: row.sequenceno,
        compcode: row.compcode,
        compcode1: row.compcode,
        barcodetype: row.barcodetype,
        barcode1: row.barcode1,
        barcode: row.barcode,
        barcodemonth: row.barcodemonth,
        active: row.active ? "T" : "F",
      });

      setBarbarCodeValue(row.barcode); // Only one meaningful update
      setAutoActive(row.active === "T" || row.active === true);
    } catch (error) {
      toast.error("GridLoad_Check: " + error.message);
      setFetchError("Service isn't running. Please check API City Master in Country Controller.");
    } finally {
      setNewButton(1);
    }
  };

  const AutoGenerateMaster_Save = async () => {
    try {
      const AutoData = {
        Asptblautogeneratemasid: autoValues.asptblautogeneratemasid > 0 ? autoValues.asptblautogeneratemasid : 0,
        Sequenceid: autoValues.asptblautogeneratemasid > 0 ? autoValues.sequenceid : autoValues.finYear + "-" + autoValues.shortcode + "-" + autoValues.sequenceno,
        Shortcode: autoValues.shortcode,
        FinYear: autoValues.FinYear,
        Screen: autoValues.screen,
        Sequenceno: autoValues.sequenceno,
        Compcode: autoValues.compcode,
        Compcode1: autoValues.compcode || "",
        Barcodetype: autoValues.barcodetype || "",
        Barcode1: autoValues.barcode || 0,
        Barcode: autoValues.barcode1 || 0,
        Barcodemonth: month,
        Active: autoValues === true ? "T" : "F",
      };

      // If API expects array payload
      const payload = [AutoData];

      const response = await axios.post(`${insert_update}/${JSON.stringify(payload)}`);
      if (response.data) {
        toast.success(response.data);

        // Refresh grid

        // Reset form
        // AutoGenerateMaster_New();
      }
    } catch (error) {
      toast.error(error.message || "Error occurred while saving");
      setFetchError(error.message);
    }
  };

  // const handlebarcodetypeChange = (name, value) => {
  //   switch (name) {
  //     case "barcode1":
  //       setBarcode1Value(value);
  //       break;

  //     case "barcodetype":
  //       if (value === "MONTHLY-WISE") {
  //         name.readOnly=true;
  //        // setBarbarCodeValue(`0${month}${year}`);
  //       } else if (value === "SEQUENCE-WISE") {
  //         name.readOnly=true;
  //        // setBarbarCodeValue(barCode1Value);
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const AutoGenerateMaster_Delete = async (id) => {
    if (!(id > 0)) {
      toast.error("Invalid");
      return;
    }

    try {
      const response = await axios.delete(`${deleteData}/${id}`);

      if (response.data === "delete") {
        const res = await axios.get(`${ScreenParam}`);
        setAutoItems(res.data.reverse());

        toast.success("Record Deleted Successfully");
        AutoGenerateMaster_New();
      } else {
        const errorMsg = response.error || "Delete failed";
        setFetchError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setFetchError(error);
      alert(error.message || "Unexpected error occurred");
    }
  };

  const AutoGenerateMaster_New = async () => {
    setNewButton(1);
    setAutoValues([]);
    // setBarbarCodeValue([]);
    // setBarcode1Value([]);
  };

  const AutoGenerateMaster_Search = () => {};

  const commentsData = useMemo(() => {
    let computedComments = [...autoItems]; // clone to avoid mutation

    // Search filter
    if (auto_Search) {
      const search = String(auto_Search || "").toLowerCase();
      computedComments = computedComments.filter((item) => item.screen?.toLowerCase().includes(search) || item.sequenceno?.toString().toLowerCase().includes(search) || item.shortcode?.toLowerCase().includes(search));
    }

    // Update total count outside useMemo
    setTotalItems(computedComments.length);

    // Sorting
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments.sort((a, b) => reversed * a[sorting.field]?.toString().localeCompare(b[sorting.field]?.toString()));
    }

    // Paging
    const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
    return computedComments.slice(startIndex, startIndex + ITEM_PER_PAGE);
  }, [autoItems, currentPage, auto_Search, sorting]);

  const buttonConfig = [
    { label: "News", key: "news", action: AutoGenerateMaster_New },
    { label: "Save", key: "saves", action: AutoGenerateMaster_Save },
    { label: "Delete", key: "deletes", action: () => AutoGenerateMaster_Delete(autoValues.asptblautogeneratemasid) },
    { label: "Search", key: "searches", action: AutoGenerateMaster_New },
    { label: "Prints", key: "prints", action: AutoGenerateMaster_New },
    { label: "TreeButton", key: "treebutton", action: AutoGenerateMaster_New },
    { label: "Globalsearch", key: "globalsearch", action: AutoGenerateMaster_New },
    { label: "Login", key: "login", action: AutoGenerateMaster_New },
    { label: "Changepassword", key: "changepassword", action: AutoGenerateMaster_New },
    { label: "Changeskin", key: "changeskin", action: AutoGenerateMaster_New },
    { label: "Contact", key: "contact", action: AutoGenerateMaster_New },
    { label: "Pdf", key: "pdf", action: AutoGenerateMaster_New },
    { label: "Import", key: "import", action: AutoGenerateMaster_New },
    { label: "Download", key: "download", action: AutoGenerateMaster_New },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {userRights1.length > 0 && (
        <div className="container-fluid animate-zoom">
          <div className="row pt-1" style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>
            <ul className="d-flex justify-content-end boxShadow">
              {buttonConfig.map((btn, index) => {
                const isVisible = userRights1[0]?.[btn.key] === "T";
                if (!isVisible) return null;
                return (
                  <li key={index}>
                    <button className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{ backgroundColor: colorValue }} onClick={btn.action}>
                      {btn.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="row pt-2" style={{ backgroundColor: `${foreValue}` }}>
              <div className="col-12 col-md-8 col-lg-4">
                <div className="bloc-tabs">
                  <div className="tabs active-tabs" style={{ backgroundColor: `${colorValue}`, color: `${foreValue}` }}>
                    {" "}
                    {title}{" "}
                  </div>
                </div>
                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> SequenceID </label>
                  <input className="col-md-7" type="text" name="asptblautogeneratemasid" value={autoValues.asptblautogeneratemasid || ""} readOnly />
                </div>
                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> Sequence </label>
                  <input className="col-md-7" type="text" name="sequenceid" autoFocus readOnly value={autoValues.sequenceid || ""} required />
                </div>
                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> FinYear </label>
                  <select className="col-md-7" name="FinYear" required value={autoValues.FinYear || ""} onChange={handleChange}>
                    <option></option>
                    {finYearData !== null &&
                      finYearData.map((result, index) => (
                        <option key={index} value={result.finYear}>
                          {result.finYear}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> CompCode </label>

                  <select className="col-md-7" name="compcode" value={autoValues.compcode || ""} onChange={handleChange}>
                    <option></option>
                    {compCodeData !== null &&
                      compCodeData.map((result, index) => (
                        <option key={index} value={result.gtcompmastid}>
                          {result.compcode}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> Screen </label>
                  <select className="col-md-7" name="screen" required value={autoValues.screen || ""} onChange={handleChange}>
                    <option></option>
                    {screenData !== null &&
                      screenData.map((result, index) => (
                        <option key={index} value={result.menuid}>
                          {result.menuname}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> ShortCode </label>
                  <input className="col-md-7" type="text" name="shortcode" autoFocus value={autoValues.shortcode || ""} onChange={handleChange} required />
                </div>
                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> SequeceNo </label>
                  <input className="col-md-7" type="text" name="sequenceno" autoFocus maxLength={3} value={autoValues.sequenceno || ""} onChange={handleChange} required />
                </div>
                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> BarCode </label>
                  <input className="col-md-7" type="text" name="barcode1" autoFocus maxLength={9} value={autoValues.barcode1 || ""} onChange={handleChange} required />
                </div>

                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> BarCodeType </label>
                  <select className="col-md-7" name="barcodetype" value={autoValues.barcodetype || ""} onChange={handleChange}>
                    <option></option>
                    {barCodeType !== null &&
                      barCodeType.map((result, index) => (
                        <option key={index} value={result.barcodetype}>
                          {result.barcodetype}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> Code </label>
                  <input className="col-md-7" type="text" name="Code" autoFocus maxLength={9} value={autoValues.barcodetype === "MONTHLY-WISE" ? autoValues.barcode : autoValues.barcode1 || ""} onChange={handleChange} required />
                </div>

                <div className="row align-items-center mb-1">
                  <label className="col-md-4"> Active </label>
                  <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                    <input type="checkbox" name="active" checked={autoValues.active} onChange={handleChange} />
                    <span></span>
                    <i className="indicator"></i>
                  </label>
                </div>
              </div>

              <div className="col-md-8 pt-1">
                <div className="row">
                  <Search
                    colorValue={colorValue}
                    searchs={auto_Search}
                    setsearchs={setAuto_Search}
                    SearchLable1={searchLable1}
                    SearchLable2={searchLable2}
                    SearchLable3={searchLable3}
                    stylecolor={foreValue}
                    handleChange={handleChange}
                    ChangeValues={autoValues}
                    searchCompCode={searchCompCode}
                    searchUserName={searchUserName}
                  />

                  {/* <label className="col-md-1 p-1" style={{ color: "white" }}>
                    {" "}
                    Search{" "}
                  </label>
                  <input className="col-md-3" type="text" name="SearchItem" placeholder="Search Items" aria-label="SearchItem" value={autoValues.Search} onChange={handleChange} />
                  <label className="col-md-1 p-1" style={{ color: "white" }}>
                    {" "}
                    FinYear{" "}
                  </label>

                  <select className="col-md-2" name="SearchFinyear" value={autoValues.SearchFinyear || ""} onChange={handleChange}>
                    <option></option>
                    {searchfinYearData !== null &&
                      searchfinYearData.map((result, index) => (
                        <option key={index} value={result}>
                          {result}
                        </option>
                      ))}
                  </select> */}

                  <DataTable
                    heights={heights}
                    colorValue={colorValue}
                    headers={HeadersColumn}
                    comments={autoItems}
                    setComments={setAutoItems}
                    foreValue={foreValue}
                    searches={auto_Search}
                    setSearches={setAuto_Search}
                    totalItems={totalItems}
                    setTotalItems={setTotalItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    sorting={sorting}
                    setSorting={setSorting}
                    ITEM_PER_PAGE={ITEM_PER_PAGE}
                    EditData={GridLoad_Check}
                    setCheckchild={setCheckchild}
                    checkall={checkall}
                    setCheckAll={setCheckAll}
                    commentsData={commentsData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default AutoGenerateMaster;
