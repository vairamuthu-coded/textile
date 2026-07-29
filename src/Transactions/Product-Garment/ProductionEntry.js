import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../../context/CreateUserContext";
import axios from "axios";
import Label from "../../Custom/Label";
import SocialMissing from "../../Social/SocialMissing";
import DataTable from "../../Custom/DataTable";
import moment from "moment";
import SortingDetails from "../../component/data/SortingDetails";
import dateFormat from "dateformat";
import styled from "styled-components";
import { toast } from "react-toastify";
import Search from "../../Custom/Search";
import CustomSelect from "../../Custom/CustomSelect";
import Input from "../../component/elements/Input";
import TabNav from "../../component/TabNav";
import SortableTable from "../../component/Table/SortableTable";
import ActionButtton from "../../ActionButtton";
// const Button = styled.button`
//   width: 100%;
//   padding-left: 10px;
//   margin: 2px;
//   color: white;
// `;
const ProductionEntry = ({ title, subTitle }) => {
  const {
    API_URL,
    newButton,
    handleSubmit,
    inputref,
    tabindex,
    currentPage,
    setCurrentPage,
    CountryParam,
    searchLable1,
    searchLable2,
    searchLable3,
    foreValue,
    defaultDetails,
    sequenceTable,
    colorValue,
    bgValue,
    menuheader,
    header_items,
    loginCompCode,
    loginUser,
    prodValues,
    setprodValues,
    addRows1,
    setAddRows1,
    setSearchLable1,
    isLoading,
    setIsLoading,
    setSearchLable2,
    setSearchLable3,
    sorting,
    setSorting,
    setNewButton,
    sizeGroup,
    setSizeGroup,
    color1,
    addColumns1,
    setAddColumns1,
    HeadersColumn1,
    propo,
    setProPo,
  } = useContext(DataContext);
  let ITEM_PER_PAGE = 20;
  let TableName = "asptblprolot";
  let response = null;
  const [totalcounts, setTotalcounts] = useState(0);
  const [totalItems, setTotalItems] = useState([]);
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const compcodeparam = API_URL + "/CompanyMaster/GridLoad";
  const BuyerMasterParam = API_URL + "/BuyerMasters";
  const insert_update = API_URL + "/ProductionEntrys";
  const sizeparam = API_URL + "/SizeGroupMasters/GetSizeMaster";
  const sizeGroupParam = API_URL + "/SizeGroupMasters/GetSizeGroupMaster";
  const deleteData = API_URL + "/SizeGroupMasters/DeleteSizeGroupMaster";
  // const sizeGroupMaxID = API_URL + "/SizeGroupMasters/GetMaxSizeGroupID";
  // const colorparam = API_URL + "/ColorMaster/GetActiveColor";
  const GetProcess = API_URL + "/ProcessMaster/GetProcesss";
  // const GetStyleItem = API_URL + "/StyleItemMasters/GetStyleItemMaster";
  // const GetJsonValue = API_URL + "/ProductionEntrys/GetJsonValue";
  const ordertype_auto = API_URL + "/ProductionEntrys/autos";
  const PonoDetails = API_URL + "/ProductionEntrys/PonoDetails";
  const ponochange = API_URL + "/ProductionEntrys/ponochange";
  const BarcodeChange = API_URL + "/ProductionEntrys/BarcodeChange";
  const GridLoadDetails = API_URL + "/ProductionEntrys/GridLoad";
  const GridLoadColor = API_URL + "/ProductionEntrys/GridLoadColor";
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  // const GridLoadSize = API_URL + "/ProductionEntrys/GridLoadSize";
  const getBetween = API_URL + "/ProductionEntrys/getBetween";
  const [fetchError, setFetchError] = useState(null);
  const [buyerItem, setBuyerItem] = useState([]);

  const [search, setSearch] = useState("");
  const [barItem, setBarItem] = useState([]);
  const [colorItem, setColorItem] = useState([]);
  const [compcodeData, setCompCodeData] = useState([]);
  const [sizeGrpItems, setSizeGrpItems] = useState([]);
  const [Processname, setProcessname] = useState([]);
  const [ord, setOrd] = useState([]);
  const [active, setActive] = useState(true);
  const [poActive, setPoActive] = useState(false);
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  const [grid, setGrid] = useState([]);
  const tables = document.getElementById("maintable1");
  var chkallsize = document.getElementsByName("chkallsizename");
  var chkallTable = document.getElementById("chkallTable");
  const [datevalue, setDateValue] = useState(moment(today + month + year).format("DD-MM-YYYY"));
  const commentsDataGrid1 = null;
  const [userRights1, setUserRights1] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const usersRightsPromise = axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).catch((err) => {
          throw { source: "UserRights", error: err };
        });
        const compCodePromise = axios.get(`${compcodeparam}`).catch((err) => {
          throw { source: "CompCodeParam", error: err };
        });
        const buyerPromise = axios.get(`${BuyerMasterParam}`).catch((err) => {
          throw { source: "BuyerMaster", error: err };
        });
        const getpro = axios.get(`${GetProcess}`).catch((err) => {
          throw { source: "GridLoad", error: err };
        });
        const gridPromise = axios.get(`${GridLoadDetails}`).catch((err) => {
          throw { source: "GridLoad", error: err };
        });

        const [res, res1, res2, res3, res4] = await Promise.all([usersRightsPromise, compCodePromise, buyerPromise, gridPromise, getpro]);

        setUserRights1(res.data);
        setCompCodeData(res1.data);
        setProPo(res2.data);
        setGrid(res3.data);
        setProcessname(res4.data);
        // grid returned here
      } catch (ex) {
        toast(`Error in: ${ex.source}. ${ex.error}`);
        setFetchError(`Error in ${ex.source} API`);
      } finally {
        setNewButton(1);
      }
    }

    fetchMyAPI();
  }, []);

  const [visible, setvisible] = useState(false);
  var Ponos = "";
  const com1 = "";

  const refs = useRef([]);

  const handleEnter = (e, index) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : type === "number" ? value.replace(/[^0-9]/g, "") : value;
    setprodValues((prev) => ({ ...prev, [name]: fieldValue }));
    const today = new Date().toISOString().slice(0, 10);
    if (name === "Compcode") {
      var res = await axios.get(`${ordertype_auto}/${value}/${title}/${TableName}`);
      if (res?.data) {
        prodValues.Asptblprolot1id = res.data[0].id || 0;
        prodValues.Compcode1 = res.data[0].gtcompmastid;
        prodValues.Compcode = res.data[0].gtcompmastid;
        prodValues.Compname = res.data[0].compname;
        prodValues.Shortcode = res.data[0].shortcode;
        prodValues.Prodno = year + "-" + res.data[0].shortcode + "-" + res.data[0].id;
        prodValues.Proddate = today;
        prodValues.garmentimage = res.data[0].garmentimage;
        setprodValues(prodValues);
      }
    }

    if ((name === "Processtype" && value === "INWARD") || (name === "Processtype" && value === "DELIVERY") || (name === "Processtype" && value === "REWORK")) {
      var res1 = await axios.get(`${PonoDetails}/${prodValues.Compcode}/${value}`);

      setProPo(res1.data);
    }

    if (name === "Pono") {
      setAddRows1([]);
      setAddColumns1(HeadersColumn1);
      var res2 = await axios.get(`${ponochange}/${prodValues.Compcode}/${value}`);
      if (res2?.data) {
        prodValues.Pono = value;
        prodValues.Asptblpurid = res2.data[0].asptblpurid;
        prodValues.Asptblpur1id = res2.data[0].asptblpur1id;
        prodValues.Orderno = res2.data[0].orderno;
        prodValues.Styleref = res2.data[0].styleref;
        prodValues.Stylename = res2.data[0].asptblstymasid;
        prodValues.barcodevalues1 = res2.data[0].minid + "-" + res2.data[0].maxid;
        prodValues.total = res2.data[0].cnt;
        setprodValues(prodValues);
      }
    }
  };

  var data1 = [],
    data2 = [];
  var datas = [];
  var datasize1 = [];
  var dataIndex = [];
  function ListData() {
    return addRows1.map((row) => {
      const keys = [];
      const values = [];

      addColumns1.forEach((cols, index) => {
        const cell = row[index];
        if (!cell?.field) return;

        keys.push(cell.field.trim());
        values.push(cell.value ?? 0);
      });

      return func(keys, values);
    });
  }

  function func(arr1, arr2) {
    const obj = {};
    arr1.forEach((Curr_element, index) => {
      obj[Curr_element.trim()] = arr2[index];
    });
    return obj;
  }

  const BarCodeData = {
    Asptblprolotid: Number(prodValues?.Asptblprolotid) || 0,
    Asptblprolot1id: Number(prodValues?.Asptblprolot1id) || 0,
    Asptblpurid: prodValues.Asptblpurid ?? 0,
    Asptblpur1id: prodValues.Asptblpur1id ?? 0,
    Docid: prodValues.Docid ?? 0,
    Shortcode: prodValues.Shortcode ?? 0,
    Finyear: prodValues?.Finyear ?? year,
    Proddate: prodValues.Proddate ?? 0,
    Prodno: prodValues.Prodno ?? 0,
    Compcode: prodValues.Compcode ?? 0,
    Orderqty: prodValues.Orderqty ?? 0,
    Pono: prodValues.Pono ?? 0,
    Buyer: prodValues.Buyer ?? 0,
    Stylename: prodValues.Stylename ?? 0,
    Active: active ? "T" : "F",
    Productioncancel: poActive ? "T" : "F",
    Lotno: prodValues.Lotno ?? 0,
    Bundle: prodValues.Bundle ?? 0,
    Gridrowcount: addRows1?.length ?? 0,
    processname: prodValues.Processname ?? 0,
    Processtype: prodValues.Processtype ?? 0,
    Issuetype: prodValues.Issuetype ?? 0,
    Restitching: prodValues.Restitching ?? 0,
    Rechecking: prodValues.Rechecking ?? 0,
    Inward: prodValues.Inward ?? 0,
    Delivery: prodValues.Delivery ?? 0,
    Styleref: prodValues.Styleref ?? 0,
    Orderno: prodValues.Orderno ?? 0,
    Notes: prodValues.Notes ?? 0,
  };

  var errorMessage = "";
  const FieldValidate = (prodValues) => {
    // Required fields list
    const requiredFields = [
      { field: "Compcode", message: "CompCode is Empty" },
      { field: "Processtype", message: "ProcessType is Empty" },
      { field: "Pono", message: "PoNo is Empty" },
      { field: "Orderno", message: "OrderNo is Empty" },
      { field: "Styleref", message: "StyleRef is Empty" },
      { field: "Proddate", message: "Proddate is Empty" },
      { field: "Notes", message: "Notes is Empty" },
    ];

    for (const item of requiredFields) {
      if (!prodValues[item.field]) {
        toast.error(item.message);
        return false;
      }
    }

    if (!addRows1 || addRows1.length < 1) {
      toast.error("Invalid Grid Rows");
      return false;
    }

    return true; // Validation passed
  };

  const TableRowValidate = (addRows1) => {
    if (!addRows1 || addRows1.length <= 0) {
      return "Please Add Rows to Grid";
    }

    for (let rowIndex = 0; rowIndex < addRows1.length; rowIndex++) {
      const row = addRows1[rowIndex];

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const field = row[colIndex];

        if (field.field !== "Colorname") {
          if (!field.value || field.value < 1) {
            return `Please enter value for : ${field.field} at column index ${colIndex}`;
          }
        }
      }
    }

    return true; // Validation success
  };

  const ParamsListData = (res) => {
    const [Pono, Asptblprolotid, Compcode, Finyear, Asptblprolot1id, Processtype] = res.data?.split(",") ?? [];
    return [{ Asptblprolotid: Number(Asptblprolotid) || 0, Asptblprolot1id: Number(Asptblprolot1id) || 0, Finyear: Finyear, Compcode: Compcode, Pono: Pono, Processtype: Processtype, Total: addRows1.length }];
  };

  const ProductionEntry_Search = async () => {
    setNewButton(2);
  };

  const ProductionEntry_Save = async () => {
    try {
      setIsLoading(true);
      const fieldError = FieldValidate(prodValues);
      if (fieldError !== true) {
        toast.error(fieldError || "Validation failed");
        return;
      }

      // const rowError = TableRowValidate(addRows1);
      // if (rowError !== true) {
      //   toast.error(rowError || "Validation failed");
      //   return;
      // }

      const OBJ1 = BarCodeData;
      const res = await axios.post(`${insert_update}`, OBJ1);
      const users = ListData();
      const param = ParamsListData(res);

      const bulkPayload = {
        ProdMas: OBJ1,
        ProdTrans: users,
        // Prodparams: param,
      };

      response = await axios.post(insert_update, bulkPayload);
      setTotalcounts(`Rows : ${users.length}`);

      if (response?.data) {
        setIsLoading(false);
        toast.success(response.data);
        ProductionEntry_New();
      }
    } catch (ex) {
      setFetchError(ex);
      toast.error(`Error: ${ex}`);
    } finally {
      setIsLoading(false);
    }
  };

  const ProductionEntry_Delete = async () => {
    try {
      setNewButton(10);

      if (!sizeGroup.sizegroup) {
        toast.error("Empty Not Allowed");
        return;
      }

      if (sizeGroup.asptblsizgrpid >= 1) {
        const asptblsizgrpid = sizeGroup.asptblsizgrpid;
        response = "";
        response = await axios.delete(`${deleteData}/${asptblsizgrpid}`);

        if (response.data) {
          try {
            const res = await axios.get(`${sizeGroupParam}`);
            setBarItem(res.data);
          } catch (error) {
            setFetchError(error);
            toast.error(error);
          }

          toast.success("Record Deleted Successfully");
          ProductionEntry_New();
        } else {
          toast.error("Error: No data returned from server");
        }
      }
    } catch (err) {
      setFetchError(err);
      console.error("Delete Error:", err.message);
      alert("Error occurred while deleting data");
    }
  };

  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };

  const ProductionEntry_New = async () => {
    setNewButton(1);
    setprodValues([]);
    setbarValues([]);
    setActive(false);
    setTotalcounts("");
    const ponoPromise = await axios.get(`${GridLoadDetails}`);
    setGrid(ponoPromise.data);
    setAddRows1([]);
    setAddColumns1(HeadersColumn1);
  };

  var imagesrc = "",
    imageFile = "";
  const [images, setImage] = useState(imagesrc);

  var alldata1,
    r = 0,
    tds = "",
    str = "";
  const fieldValueChange = (e, colindex, rowindex, id) => {
    const { name, value } = e.target;
    // Convert to number safely
    const finalValue = parseInt(value);
    if (isNaN(finalValue) || finalValue <= 0) return;

    setAddRows1((prev) => {
      const updated = [...prev]; // clone
      const cell = updated[rowindex][colindex];

      if (cell.field !== name) return prev; // no change needed

      if (name === "Portion" && finalValue <= 5) {
        cell.value = finalValue;
      } else if (name !== "Portion" && name !== "Colorname") {
        if (value.length <= 6) {
          cell.value = finalValue;
        }
      }

      return updated; // return new state
    });
  };

  const HeadersColumnGrid = [
    { headername: "", field: "visible" },
    { headername: "Asptblprolotid", field: "asptblprolotid" },
    { headername: "Proddate", field: "proddate" },
    { headername: "Compcode", field: "compcode" },
    { headername: "Prodno", field: "prodno" },
    { headername: "Buyer", field: "buyer" },
    { headername: "Pono", field: "pono" },
    { headername: "Styleref", field: "styleref" },
    { headername: "OrderNo", field: "orderno" },
    { headername: "Orderqty", field: "orderqty" },
    { headername: "Processtype", field: "processtype" },
    { headername: "Stylename", field: "stylename" },
    { headername: "Active", field: "active" },
  ];
  const heights = "400px";

  const [barvalues, setbarValues] = useState([]);
  const handleChange1 = async (e) => {
    const { name, value } = e.target;
    setbarValues(value);
  };

  const BarcodeChanges = async (comcode, type, pono, bar) => {
    try {
      if (bar.length < 9) return;
      setIsLoading(true);
      setAddRows1([]);
      setTotalcounts(0);
      // ✅ Fast duplicate check
      const exists = addRows1.some((row) => row[8]?.value === bar);
      if (exists) {
        toast.error("Child Record Found : " + bar);
        bar = "";
        return;
      }

      response = null;
      response = await axios.get(`${BarcodeChange}/${comcode}/${type}/${pono}/${bar}`);

      if (response.data[0]?.barcode?.length > 10) {
        setAddColumns1(HeadersColumn1);
        toast.error(response.data[0].barcode);
        return;
      }

      // ✅ Create new rows
      const data1 = response.data.map((datas, inx) => [
        { field: "SNo", value: addRows1.length + inx + 1, HeaderVisible: "visible" },
        { field: "Asptblprolotdetid", value: datas.asptblprolotdetid || 0 },
        { field: "Asptblprolotid", value: datas.asptblprolotid || 0 },
        { field: "Asptblprolot1id", value: datas.asptblprolot1id || 0 },
        { field: "Asptblpurdetid", value: datas.asptblpurdetid || 0 },
        { field: "Asptblpurid", value: datas.asptblpurid || 0 },
        { field: "Compcode", value: datas.compcode || 0 },
        { field: "Pono", value: datas.pono || 0 },
        { field: "QrCode", value: datas.barcode || 0 },
        { field: "Colorname", value: datas.colorname },
        { field: "Sizename", value: datas.sizename },
        { field: "Pcs", value: 1 },
      ]);

      if (data1.length > 0) {
        setAddRows1((prev) => {
          const updated = [...prev, ...data1];
          setTotalcounts(`Rows : ${updated.length}`);
          return updated;
        });
      }
    } catch (ex) {
      toast.error("Invalid Barcode");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const GridLoad_Check = async (id) => {
    setAddRows1([]);
    setAddColumns1([]);
    setprodValues([]);

    const res = await axios.get(`${GridLoadDetails}/${id.asptblprolotid}/${id.compcode}`);

    if (res.data.length === 0) {
      toast.error("Invalid Data");
      return;
    }

    // Set Product Values
    setprodValues((prev) => ({
      ...prev,
      Asptblprolotid: res.data[0].asptblprolotid || 0,
      Asptblprolot1id: res.data[0].asptblprolot1id,
      Prodno: res.data[0].prodno,
      Shortcode: res.data[0].shortcode,
      Finyear: res.data[0].finyear,
      Proddate: res.data[0].proddate,
      Buyer: res.data[0].buyer,
      Bundle: res.data[0].bundle || 0,
      LotNo: res.data[0].lotno || 0,
      Compcode: res.data[0].compcode,
      Compcode1: res.data[0].compcode,
      Compname: res.data[0].compname,
      Pono: res.data[0].pono,
      Stylename: res.data[0].stylename,
      Orderqty: res.data[0].orderqty,
      Processtype: res.data[0].processtype,
      Orderno: res.data[0].orderno,
      Styleref: res.data[0].styleref,
      Notes: res.data[0].notes,
    }));

    setvisible(res.data[0].processtype === "ORDER");
    // Load PONO Dropdown
    try {
      const res1 = await axios.get(`${PonoDetails}/${res.data[0].compcode}/${res.data[0].processtype}`);
      setProPo(res1.data);
    } catch (error) {
      toast.error(error);
      setFetchError(error);
    }

    // Build header row
    let headerRow = HeadersColumn1.map((col) => ({
      field: col.field,
      value: "",
      placeholder: col.field,
      HeaderVisible: col.HeaderVisible,
      widths: col.widths,
      disabled: "true",
    }));

    setAddColumns1(headerRow);

    // Load table rows
    const resColor = await axios.get(`${GridLoadColor}/${id.asptblprolotid}/${id.compcode}`);

    let rowData = resColor.data.map((row, index) => {
      return HeadersColumn1.map((col) => {
        switch (col.field) {
          case "SNo":
            return { field: col.field, value: index + 1, HeaderVisible: "visible" };
          case "Asptblprolotdetid":
          case "Asptblprolot1id":
          case "Asptblprolotid":
          case "Asptblpurdetid":
          case "Asptblpurid":
            return { field: col.field, value: row[col.field.toLowerCase()], HeaderVisible: "visible" };
          case "Compcode":
            return { field: col.field, value: row.compcode };
          case "Pono":
            return { field: col.field, value: row.pono };
          case "QrCode":
            return { field: col.field, value: row.barcode };
          case "Colorname":
            return { field: col.field, value: row.colorname };
          case "Sizename":
            return { field: col.field, value: row.sizename };
          case "Pcs":
            return { field: col.field, value: row.orderqty };
          default:
            return col;
        }
      });
    });

    // Add rows in one render
    setAddRows1(rowData);
    setNewButton(1);
  };

  const commentsDataGrid = useMemo(() => {
    let searches = String(search || "").toLowerCase();
    let computedComments = grid;

    if (searches) {
      computedComments = computedComments.filter((item) => {
        const pono = String(item.pono || "").toLowerCase();
        const buyer = String(item.buyer || "").toLowerCase();
        const stylename = String(item.stylename || "").toLowerCase();
        const prodno = String(item.prodno || "").toLowerCase();
        const asptblprolotid = String(item.asptblprolotid || "").toLowerCase();
        return pono.includes(searches) || buyer.includes(searches) || stylename.includes(searches) || prodno.includes(searches) || asptblprolotid.includes(searches);
      });
    }

    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [grid, currentPage, search, sorting]);

  // const buttonConfig = [
  //   { label: "New", value: 1, right: "news", onClick: ProductionEntry_New },
  //   { label: "Save", value: 10, right: "saves", onClick: ProductionEntry_Save },
  //   { label: "Delete", value: 11, right: "delete", onClick: () => ProductionEntry_Delete(prodValues.asptblprolotid) },
  //   { label: "Search", value: 1, right: "search", onClick: ProductionEntry_Search },
  //   { label: "Prints", value: 1, right: "prints", onClick: ProductionEntry_New },
  //   { label: "TreeButton", value: 1, right: "treebutton", onClick: ProductionEntry_New },
  //   { label: "Globalsearch", value: 1, right: "globalsearch", onClick: ProductionEntry_New },
  //   { label: "Login", value: 1, right: "login", onClick: ProductionEntry_New },
  //   { label: "Changepassword", value: 1, right: "changepassword", onClick: ProductionEntry_New },
  //   { label: "Changeskin", value: 1, right: "changeskin", onClick: ProductionEntry_New },
  //   { label: "Contact", value: 1, right: "contact", onClick: ProductionEntry_New },
  //   { label: "Pdf", value: 1, right: "pdf", onClick: ProductionEntry_New },
  //   { label: "Import", value: 1, right: "imports", onClick: ProductionEntry_New },
  //   { label: "Download", value: 1, right: "download", onClick: ProductionEntry_New },
  // ];

  const tabs = [
    { id: 1, label: title },
    { id: 2, label: subTitle },
    // { id: 3, label: "Reports", param: barValues.Asptblpurid },
    // { id: 4, label: "Reports Status", param: barValues.Asptblpurid },
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

  const handleFocus = (e) => {
    e.target.style.backgroundColor = `${colorValue}`;
    e.target.style.color = `${"var(--bs-light)"}`;
    e.target.style.fontWeight = "bolder";
  };

  const handleBlur = (e) => {
    e.target.style.backgroundColor = "";
    e.target.style.color = `${"var(--bs-dark)"}`;
  };

  return (
    <div onSubmit={handleSubmit} style={{ cursor: isLoading ? "wait" : "default" }}>
      {userRights1.length >= 1 && (
        <div className="container-fluid animate-zoom p-1">
          <div className="row" style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>
            <ActionButtton
              news={ProductionEntry_New}
              isLoading={isLoading}
              saves={ProductionEntry_Save}
              deletes={ProductionEntry_Delete}
              searches={ProductionEntry_New}
              prints={ProductionEntry_New}
              treebutton={ProductionEntry_New}
              globalsearch={ProductionEntry_New}
              login={ProductionEntry_New}
              changepassword={ProductionEntry_New}
              changeskin={ProductionEntry_New}
              contact={ProductionEntry_New}
              pdf={ProductionEntry_New}
              imports={ProductionEntry_New}
              download={ProductionEntry_New}
              userRights={userRights1}
              colorValue={colorValue}
              newButton={newButton}
              foreValue={foreValue}
              screenHeader="PRODUCTION ENTRY "
            />

            <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 10)} />

            <div className="content-tabs">
              <div className={newButton === 1 ? "content active-content" : "content"}>
                <div className="row animate-zoom">
                  <div className="col-md-10">
                    <div className="row">
                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"DocID"}></Label>
                      <input className="col-md-1" type="text" disabled={true} style={{ color: `${colorValue}` }} name="Asptblprolotid" value={prodValues.Asptblprolotid || ""} />
                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"ID"}></Label>
                      <input className="col-md-1" type="text" disabled={true} style={{ color: `${colorValue}` }} name="Asptblprolot1id" value={prodValues.Asptblprolot1id || ""} />
                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"ProdNo"}></Label>
                      <input className="col-md-2" type="text" disabled={true} style={{ color: `${colorValue}` }} name="Prodno" value={prodValues.Prodno || ""} />
                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"Date"}></Label>
                      <input className="col-md-2" type="date" name="Proddate" style={{ color: `${colorValue}` }} value={prodValues.Proddate} onChange={handleChange} />
                    </div>
                    <div className="row py-1">
                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"CompCode"}></Label>
                      <CustomSelect
                        visible="block"
                        className="col-md-1 form-select"
                        name="Compcode"
                        value={prodValues.Compcode || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={2}
                        ref={(el) => (refs.current[2] = el)}
                        onKeyDown={(e) => handleEnter(e, 2)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {compcodeData.map((result) => (
                          <option key={result.gtcompmastid} value={result.gtcompmastid}>
                            {result.compcode}
                          </option>
                        ))}
                      </CustomSelect>

                      <Input
                        type={"text"}
                        className1="col-md-1"
                        labelVisible="none"
                        className="form-control col-md-4"
                        id="Compname"
                        name="Compname"
                        placeholder=""
                        tabIndex={2}
                        value={prodValues.Compname || ""}
                        onChange={handleChange}
                        barValues={prodValues}
                        setBarValues={setprodValues}
                        name1={"CompName"}
                        stylecolor={colorValue}
                        visible={true}
                        disabled={true}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        ref={(el) => (refs.current[2] = el)}
                        onKeyDown={(e) => handleEnter(e, 2)}
                      />

                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"Type"}></Label>
                      <CustomSelect
                        visible="block"
                        className="col-md-1 form-select"
                        name="Processtype"
                        value={prodValues.Processtype || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={3}
                        ref={(el) => (refs.current[3] = el)}
                        onKeyDown={(e) => handleEnter(e, 3)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        <option value={"INWARD"}>INWARD</option>
                        <option value={"DELIVERY"}>DELIVERY</option>
                        <option value={"REWORK"}>REWORK</option>
                      </CustomSelect>

                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"Pono"}></Label>
                      <CustomSelect
                        className="col-md-2 form-select"
                        name="Pono"
                        visible="block"
                        value={prodValues.Pono || ""}
                        onChange={handleChange}
                        tabIndex={4}
                        ref={(el) => (refs.current[4] = el)}
                        onKeyDown={(e) => handleEnter(e, 4)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {propo.map((result, index) => (
                          <option key={index} value={result.pono}>
                            {result.pono}
                          </option>
                        ))}
                      </CustomSelect>
                    </div>
                    <div className="row">
                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"E-OrdNo"}></Label>
                      <input className="col-md-2" type="text" name="Orderno" value={prodValues.Orderno || ""} onChange={handleChange} style={{ color: `${colorValue}` }} ref={(el) => (refs.current[5] = el)} onKeyDown={(e) => handleEnter(e, 5)} />

                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"Styleref"}></Label>
                      <input className="col-md-2" type="text" name="Styleref" style={{ color: `${colorValue}` }} value={prodValues.Styleref || ""} onChange={handleChange} ref={(el) => (refs.current[6] = el)} onKeyDown={(e) => handleEnter(e, 6)} />

                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"Notes"}></Label>

                      <CustomSelect
                        className="col-md-2 form-select"
                        name="Notes"
                        visible="block"
                        value={prodValues.Notes || ""}
                        onChange={handleChange}
                        tabIndex={7}
                        ref={(el) => (refs.current[7] = el)}
                        onKeyDown={(e) => handleEnter(e, 7)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        <option value={"PCS RATE"}>PCS RATE</option>
                        <option value={"MONTHLY"}>MONTHLY</option>
                      </CustomSelect>

                      <input
                        className="col-md-3"
                        type="text"
                        name="barcodevalues1"
                        value={prodValues.barcodevalues1 || ""}
                        onChange={handleChange}
                        style={{ color: `${colorValue}` }}
                        ref={(el) => (refs.current[8] = el)}
                        onKeyDown={(e) => handleEnter(e, 8)}
                      />
                    </div>
                    <div className="row py-1">
                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"Active"}></Label>
                      <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                        <input type="checkbox" className="col-md-1" name="Active" style={{ color: `${colorValue}` }} checked={active} onChange={(e) => setActive(e.target.checked)} />
                        <span></span>
                        <i className="indicator"></i>
                      </label>
                      <Label className={`col-md-1`} forecolor={`${colorValue}`} labelName={"PoCancel"}></Label>
                      <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                        <input type="checkbox" className="col-md-1" name="Productioncancel" checked={poActive} onChange={(e) => setPoActive(e.target.checked)} />
                        <span></span>
                        <i className="indicator"></i>
                      </label>
                      <label className="col-md-2 hdr" style={{ color: `${colorValue}` }}>
                        {prodValues.total === undefined ? "Total  :  0" : "Total  : " + prodValues.total}
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-2">
                    <img src={prodValues.garmentimage} className="img-fluid" alt="garment" />
                  </div>
                  <div className="row">
                    <div className="bloc-tabs">
                      <div className="tabs active-tabs" style={{ backgroundColor: `${colorValue}`, color: `${foreValue}` }} onClick={() => ProductionEntry_New()}>
                        <b>Details </b>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="d-flex flex-wrap align-items-center" style={{ gap: "8px", marginBottom: 8 }}>
                        <label style={{ fontSize: "16px", color: `${colorValue}`, fontWeight: "700", margin: 0, minWidth: 110 }}>BarCode Scan</label>
                        <input
                          className="form-control col-4"
                          type="text"
                          value={barvalues || ""}
                          onChange={handleChange1}
                          name="barcodevalues"
                          ref={(el) => (refs.current[8] = el)}
                          onKeyDown={(e) => handleEnter(e, 8)}
                          style={{ color: `${colorValue}`, padding: "6px", fontSize: "18px", fontWeight: "700" }}
                        />
                        <button
                          className="btn btn-sm btn-primary"
                          style={{ backgroundColor: `${colorValue}`, borderColor: `${colorValue}`, color: "#fff" }}
                          type="button"
                          onClick={() => BarcodeChanges(prodValues.Compcode, prodValues.Processtype, prodValues.Pono, barvalues)}
                          ref={(el) => (refs.current[9] = el)}
                          onKeyDown={(e) => handleEnter(e, 9)}
                        >
                          Submit
                        </button>
                        <div className="ms-auto" style={{ color: `${colorValue}`, fontWeight: 700 }}>
                          {totalcounts}
                        </div>
                      </div>

                      <SortableTable
                        columns={addColumns1}
                        rows={addRows1}
                        colorValue={colorValue}
                        foreValue={foreValue}
                        bgValue={bgValue}
                        maxHeight="350px"
                        id="ProductionEntry"
                        id1="ProductionEntryRows"
                        reverseRows={true}
                        noDataComponent={<SocialMissing colorValue={colorValue} fetchError={fetchError} />}
                      />
                      <strong className="row p-2" style={{ backgroundColor: colorValue, color: foreValue }}>
                        {totalcounts}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className={newButton === 2 ? "content active-content" : "content"}>
                <div className="animate-zoom">
                  <Search
                    colorValue={colorValue}
                    searchs={search}
                    setsearchs={setSearch}
                    SearchLable1={searchLable1}
                    SearchLable2={searchLable2}
                    SearchLable3={searchLable3}
                    stylecolor={foreValue}
                    handleChange={handleChange}
                    ChangeValues={grid}
                    searchCompCode={searchCompCode}
                    searchUserName={searchUserName}
                  />
                  <DataTable
                    heights={heights}
                    colorValue={colorValue}
                    headers={HeadersColumnGrid}
                    comments={grid}
                    setComments={setGrid}
                    foreValue={foreValue}
                    searches={search}
                    setSearches={setSearch}
                    totalItems={totalItems}
                    setTotalItems={setTotalItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    sorting={sorting}
                    setSorting={setSorting}
                    ITEM_PER_PAGE={ITEM_PER_PAGE}
                    EditData={GridLoad_Check}
                    commentsData={commentsDataGrid}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionEntry;
