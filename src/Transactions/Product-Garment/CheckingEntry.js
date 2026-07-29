import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Label from "../../Custom/Label";
import DataContext from "../../context/CreateUserContext";
import axios from "axios";
import DataTable from "../../Custom/DataTable";
import Input from "../../component/elements/Input";
import SocialMissing from "../../Social/SocialMissing";
import dateFormat from "dateformat";
import styled from "styled-components";
import { toast } from "react-toastify";
import SortableTable from "../../component/Table/SortableTable";
import TabNav from "../../component/TabNav";
import ActionButtton from "../../ActionButtton";
import CustomSelect from "../../Custom/CustomSelect";
const Button = styled.button`
  width: 100%;
  padding-left: 10px;
  margin: 2px;
  color: white;
`;
const CheckingEntry = ({ title, subTitle }) => {
  const {
    API_URL,
    newButton,
    inputref,
    handleSubmit,
    tabindex,
    currentPage,
    setCurrentPage,
    CountryParam,
    searchLable1,
    searchLable2,
    searchLable3,
    bgValue,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    defaultDetails,
    sequenceTable,
    colorValue,
    loginCompCode,
    loginUser,
    foreValue,
    checkValues,
    setCheckValues,
    addRows3,
    setAddRows3,
    sorting,
    setSorting,
    setNewButton,
    color1,
    addColumns3,
    setAddColumns3,
    HeadersColumn3,
    chkpo,
    setChkPo,
  } = useContext(DataContext);
  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };
  const refs = useRef([]);
  // sequenceTable, subTitle, colorValue,loginCompCode,loginUser,
  //  foreValue ,checkValues, setCheckValues,addRows3, setAddRows3

  let TableName = "asptblchk";
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  let ITEM_PER_PAGE = 20;
  const [totalcounts, setTotalcounts] = useState(0);
  const compcodeparam = API_URL + "/CompanyMaster/GridLoad";
  const GridLoadDetails = API_URL + "/CheckingEntry/GridLoad";
  const PonoDetails = API_URL + "/CheckingEntry/PonoDetails";
  const BarcodeChange = API_URL + "/CheckingEntry/BarcodeChange";
  const GridLoadColor = API_URL + "/CheckingEntry/GridLoadColor";
  const ponochange = API_URL + "/CheckingEntry/ponochange";
  const autos = API_URL + "/CheckingEntry/autos";
  const GetProcesss = API_URL + "/ProcessMaster/GetProcesss";

  const Remarks = API_URL + "/CheckingEntry/Remarks";
  const insert_update = API_URL + "/CheckingEntry/CheckingEntry";

  const [userRights1, setUserRights1] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [visible, setvisible] = useState(true);
  const heights = "430px";
  let validorder = "";
  const [fetchError, setFetchError] = useState(null);
  const [remarks, setRemarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [barItem, setBarItem] = useState([]);
  const [colorItem, setColorItem] = useState([]);
  const [compcodeData, setCompCodeData] = useState([]);

  const [sizeGrpItems, setSizeGrpItems] = useState([]);
  const [processItems, setProcessItems] = useState([]);
  const [ProcessType, setProcessType] = useState([]);
  const [styleItem, setStyleItem] = useState([]);
  const [sizeItems, setSizeItems] = useState([]);
  const [active, setActive] = useState(false);
  const [poActive, setPoActive] = useState(false);
  const [sizeGroup_FilterSearch, setSizeGroup_FilterSearch] = useState([]);
  const [sizeGroupGrid, setSizeGroupGrid] = useState([]);
  const [newButton1, setNewButton1] = useState(3);
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [checkSize, setCheckSize] = useState(false);
  const [checkColor, setCheckColor] = useState(false);
  const [grid, setGrid] = useState([]);
  var data = [];
  let rows, cols;
  var ColumnsData = [];
  var RowsData = [];
  var DArray = [[], []];
  let RowIndex = 0;
  const [qtycheck, setQtyCheck] = useState();
  let qtychecks = 0;

  const tables = document.getElementById("maintable1");
  // var chksiz = document.getElementsByName("chksizename");
  // var chkcol = document.getElementsByName("chkcolorename");
  // var chkallsize = document.getElementsByName("chkallsizename");
  // var chkallTable = document.getElementById("chkallTable");
  // var chkallTable1 = document.getElementById("allcolorname");
  var allchkcolorname = document.getElementsByName("allchkcolorname");
  const [gridColor, setGridColor] = useState([]);
  const [dynamicCols, setDynamicCols] = useState([]);
  const [dynamicRows, setDynamicRows] = useState([]);
  const [pos, setPos] = useState([]);
  const minDate = new Date().toISOString().slice(0, 10);
  var imagesrc = "",
    imageFile = "";
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  var data1 = [],
    data2 = [];
  var datas = [];
  var datasize1 = [];
  var dataIndex = [];
  const [images, setImage] = useState(imagesrc);

  const HeadersColumnGrid = [
    { headername: "", field: "visible" },
    { headername: "Asptblchkid", field: "asptblchkid" },
    { headername: "Asptblchk1id", field: "asptblchk1id" },
    { headername: "CheckNo", field: "checkno" },
    { headername: "Compcode", field: "compcode" },
    { headername: "Buyer", field: "buyer" },
    { headername: "Pono", field: "pono" },
    { headername: "Styleref", field: "styleref" },
    { headername: "OrderNo", field: "orderno" },
    { headername: "Orderqty", field: "orderqty" },
    { headername: "IssueType", field: "issuetype" },
    { headername: "Stylename", field: "stylename" },
  ];

  useEffect(() => {
    async function GetApi() {
      const res_rihgts = axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).catch((error) => {
        throw { Source: setFetchError(error) };
      });
      const res_com = axios.get(`${compcodeparam}`).catch((error) => {
        throw { Source: setFetchError(error) };
      });
      const res_grid = axios.get(`${GridLoadDetails}`).catch((error) => {
        throw { Source: setFetchError(error) };
      });
      const res_rem = axios.get(`${Remarks}`).catch((error) => {
        throw { Source: setFetchError(error) };
      });
      const res_pro = await axios.get(`${GetProcesss}`);
      const [res, res1, res2, res3, res4] = await Promise.all([res_rihgts, res_com, res_grid, res_rem, res_pro]);

      setUserRights1(res.data);
      setCompCodeData(res1.data);
      setGrid(res2.data);
      setRemarks(res3.data);
      setProcessType(res4.data);
    }
    GetApi();
  }, []);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value;

    // Update basic field instantly
    setCheckValues((prev) => ({ ...prev, [name]: fieldValue }));

    const today = new Date().toISOString().slice(0, 10);

    // ==============================
    //  Compcode Change
    // ==============================
    if (name === "Compcode") {
      try {
        const res = await axios.get(`${autos}/${value}/${title}/${TableName}`);
        const response = res.data?.[0];
        if (response) {
          setCheckValues((prev) => ({
            ...prev,
            Asptblchk1id: response.id,
            Compcode1: response.gtcompmastid,
            Compcode: response.gtcompmastid,
            Shortcode: response.shortcode,
            Checkno: `${year}-${response.shortcode}-${response.id}`,
            Wdate: today,
          }));
        }
      } catch (err) {
        console.error(err);
      }
    }

    // ==============================
    // IssueType Change
    // ==============================
    if (name === "IssueType") {
      try {
        const res = await axios.get(`${PonoDetails}/${checkValues.Compcode}/${value}`);
        var ress = ProcessType.filter((pre) => pre.processname === value);
        setChkPo(res.data);
        setProcessItems([]);
        setProcessItems(ress);
        setCheckValues((prev) => ({
          ...prev,
          Processname: ress[0].asptblpromasid,
        }));
      } catch (err) {
        console.error(err);
      }
    }

    // ==============================
    // Pono Change
    // ==============================
    if (name === "Pono") {
      const res = await axios.get(`${ponochange}/${checkValues.Compcode}/${value}`);
      const response = res.data?.[0];

      if (response) {
        setCheckValues((prev) => ({
          ...prev,
          Barcode: `${response.minid}-${response.maxid}`,
          Pono: value,
          Asptblpurid: response.asptblpurid,
          Stylename: response.stylename,
          Orderno: response.orderno,
          Styleref: response.styleref,
        }));
      }
    }
  };

  const BarcodeChanges = async (comcode, type, pono, bar) => {
    try {
      if (bar.length >= 9) {
        data = [];
        let ss = "";
        if (bar.length === 9) {
          ss = addRows3.filter((item) => item[8].value === bar);
        } else {
          ss = addRows3.filter((item) => item.forEach((element) => element[8].value === bar));
        }
        if (ss.length >= 1) {
          toast.error("Child Record Found   : " + bar);
          bar = "";
          ss = "";
        }
        if (ss.length < 1 && ss !== "") {
          const resss = await axios.get(`${BarcodeChange}/${comcode}/${type}/${pono}/${bar}`);
          if (resss.data[0].barcode.length > 10) {
            setAddColumns3(HeadersColumn3);
            toast.error(resss.data[0].barcode);
          } else {
            let data1 = [];
            resss.data.forEach((datas, index) => {
              const row = [
                { field: "SNo", value: index + 1 },
                { field: "Asptblchkdetid", value: datas.asptblchkdetid ?? 0 },
                { field: "Asptblchkid", value: datas.asptblchkid ?? 0 },
                { field: "Asptblchk1id", value: checkValues.Asptblchk1id ?? 0 },
                { field: "Asptblpurdetid", value: datas.asptblpurdetid ?? 0 },
                { field: "Asptblpurid", value: datas.asptblpurid ?? 0 },
                { field: "Compcode", value: datas.compcode ?? 0 },
                { field: "Pono", value: datas.pono ?? 0 },
                { field: "QrCode", value: datas.barcode ?? 0 },
                { field: "Colorname", value: datas.colorname ?? 0 },
                { field: "Sizename", value: datas.sizename ?? 0 },
                { field: "Pcs", value: 1 },
              ];
              data1.push(row);
            });
            if (data1.length > 0) {
              setAddRows3((prev) => [...prev, ...data1]);
            }
          }
        }
      }
    } catch (ex) {
      alert("Invalid Barcode");
    }
  };

  const commentsDataGrid = useMemo(() => {
    let computedComments = grid;
    if (search) {
      computedComments = computedComments.filter((item) => item.Pono.includes(search));
    }
    setTotalItems(computedComments.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [grid, currentPage, search, sorting]);

  const GridLoad_Check = async (id) => {
    setAddRows3([]);
    setAddColumns3([]);
    var colorlength = 0;
    setCheckValues([]);

    var res = await axios.get(`${GridLoadDetails}/${id.asptblchkid}/${id.compcode}`);
    if (res.data.length === 0) {
      toast.error("Invalid Data");
      return;
    } else {
      const header = res.data[0];
      setCheckValues((pre) => ({
        ...pre,
        Asptblchkid: header.asptblchkid,
        Asptblchk1id: header.asptblchk1id,
        Docid: header.docid,
        Asptblpurid: header.asptblpurid,
        Asptblpur1id: header.asptblpurid,
        Checkno: header.checkno,
        Pono: header.pono,
        Shortcode: header.shortcode,
        Wdate: header.wdate?.toString().substring(0, 10),
        Compcode: header.compcode,
        Orderno: header.orderno,
        Styleref: header.styleref,
        IssueType: header.issuetype,
        Processtype: header.issuetype,
        Notes: header.notes,
        Barcode: header.barcode,
      }));
      var ress = ProcessType.filter((pre) => pre.processname === header.issuetype);
      setProcessItems([{ asptblpromasid: ress[0].asptblpromasid, processname: ress[0].processname }]);

      if (header.issuetype === "ORDER") {
        setvisible(true);
      } else {
        setvisible(false);
      }

      await axios
        .get(`${PonoDetails}/${header.compcode}/${header.issuetype}`)
        .then((res1) => {
          setChkPo(res1.data);
        })
        .catch((error) => {
          setFetchError(error);
        });

      data1 = [];

      data = [];
      HeadersColumn3.forEach((col) => {
        data.push({ field: col.field, value: "", placeholder: col.field, HeaderVisible: col.HeaderVisible, widths: col.widths, disabled: "true" });
      });
      if (data.length > 1) {
        var j = 0;
        await axios.get(`${GridLoadColor}/${header.asptblchkid}/${header.compcode}`).then(async (res1) => {
          setAddColumns3(data);
          res1.data.map(async (row, index1) => {
            var i = 0;
            var str = "";
            data1 = [];
            j++;
            data.map((ss, ind) => {
              str = "";
              if (ss.field === "SNo") {
                str = { field: ss.field, value: j, placeholder: ss.field, HeaderVisible: "visible" };
              }

              if (ss.field === "Asptblchkdetid") {
                str = { field: ss.field, value: row.asptblchkdetid, placeholder: ss.field, HeaderVisible: "visible" };
              }
              if (ss.field === "Asptblchkid") {
                str = { field: ss.field, value: row.asptblchkid, placeholder: ss.field, HeaderVisible: "visible" };
              }
              if (ss.field === "Asptblchk1id") {
                str = { field: ss.field, value: row.asptblchk1id, placeholder: ss.field, HeaderVisible: "visible" };
              }
              if (ss.field === "Asptblpurdetid") {
                str = { field: ss.field, value: row.asptblpurdetid, placeholder: ss.field, HeaderVisible: "visible" };
              }
              if (ss.field === "Asptblpurid") {
                str = { field: ss.field, value: row.asptblpurid, placeholder: ss.field, HeaderVisible: "visible" };
              }
              if (ss.field === "Compcode") {
                str = { field: ss.field, value: row.compcode, placeholder: ss.field, HeaderVisible: "visible" };
              }

              if (ss.field === "Pono") {
                str = { field: ss.field, value: row.pono, placeholder: ss.field, HeaderVisible: "visible" };
              }

              if (ss.field === "QrCode") {
                str = { field: ss.field, value: row.barcode, placeholder: ss.field, HeaderVisible: "visible" };
              }
              if (ss.field === "Colorname") {
                str = { field: ss.field, value: row.colorname };
              }
              if (ss.field === "Sizename") {
                str = { field: ss.field, value: row.sizename };
              }

              if (ss.field === "Pcs") {
                str = { field: ss.field, value: row.pcs, placeholder: ss.field, HeaderVisible: "visible" };
              }
              // if (ss.field === "IssueType") {
              //   str = { field: ss.field, value: row.issuetype, placeholder: ss.field, HeaderVisible: "visible" };
              // }
              // if (ss.field === "Remarks") {
              //   str = { field: ss.field, value: row.remarks };
              // }
              i++;
              data1.push(str);
            });

            data2.push(data1);
          });
        });
        if (data2.length > 0) {
          data2.forEach(async (row1) => {
            setAddRows3((pre) => [...pre, row1]);
          });
        }
      }
    }

    setNewButton(1);
  };

  const CheckingEntry_News = async () => {
    setNewButton(1);
    data = [];
    setCheckValues([]);
    setActive(false);
    setQrbarValues([]);
    setProcessItems([]);
    const ponoPromise = await axios.get(`${GridLoadDetails}`);
    setGrid(ponoPromise.data);
    setAddRows3([]);
    setAddColumns3(HeadersColumn3);
    RowsData = [];
  };

  const FieldValidate = async (checkValues) => {
    // Required fields list
    const requiredFields = [
      { field: "Compcode", message: "CompCode is Empty" },
      { field: "IssueType", message: "ProcessType is Empty" },
      { field: "Pono", message: "PoNo is Empty" },
      { field: "Orderno", message: "OrderNo is Empty" },
      { field: "Styleref", message: "StyleRef is Empty" },
      { field: "Wdate", message: "Wdate is Empty" },
      { field: "Notes", message: "Notes is Empty" },
    ];

    for (const item of requiredFields) {
      if (!checkValues[item.field]) {
        toast.error(item.message);
        return false;
      }
    }

    if (!addRows3 || addRows3.length < 1) {
      toast.error("Invalid Grid Rows");
      return false;
    }

    return true; // Validation passed
  };

  const TableRowValidate = async (addRows3) => {
    if (!addRows3 || addRows3.length < 1) {
      return "Please Add Rows to Grid";
    }

    for (let rowIndex = 0; rowIndex < addRows3.length; rowIndex++) {
      const row = addRows3[rowIndex];

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

  const BarCodeData = [
    {
      Asptblchkid: checkValues.Asptblchkid ?? 0,
      Asptblchk1id: checkValues.Asptblchk1id ?? 0,
      Asptblpurid: checkValues.Asptblpurid ?? 0,
      Asptblpur1id: checkValues.Asptblpur1id ?? 0,
      Docid: checkValues.Docid ?? 0,
      Shortcode: checkValues.Shortcode ?? 0,
      Finyear: year ?? 0,
      Wdate: checkValues.Wdate ?? null,
      Checkno: checkValues.Checkno ?? 0,
      Compcode: checkValues.Compcode ?? 0,
      Orderqty: checkValues.Orderqty ?? 0,
      Stylename: checkValues.Stylename ?? "",
      Pono: checkValues.Pono ?? "",
      Buyer: checkValues.Buyer ?? "",
      Active: active ? "T" : "F",
      Lotno: checkValues.Lotno ?? "",
      Bundle: checkValues.Bundle ?? "",
      Gridrowcount: addRows3?.length ?? 0,
      Processname: checkValues.Processname ?? "",
      Processtype: checkValues.IssueType ?? "",
      Issuetype: checkValues.IssueType ?? "",
      // ✅ Corrected logic
      Restitching: checkValues.Restitching ? "T" : "F",
      Rechecking: checkValues.Rechecking ? "T" : "F",
      Inward: checkValues.Inward ? "T" : "F",
      Delivery: checkValues.Delivery ? "T" : "F",
      Styleref: checkValues.Styleref ?? "",
      DefectType: checkValues.DefectType ?? "",
      Orderno: checkValues.Orderno ?? "",
      Notes: checkValues.Notes ?? "",
      UserName: defaultDetails?.User ?? "",
    },
  ];

  function ListData() {
    return addRows3.map((row) => {
      const keys = [];
      const values = [];

      addColumns3.forEach((cols, index) => {
        const cell = row[index];
        if (!cell?.field) return;

        keys.push(cell.field.trim());
        values.push(cell.value ?? 0);
      });

      return func(keys, values);
    });
  }

  // async function ListData() {

  //   addRows3.forEach((rows, i) => {
  //     data1 = []; data2 = [];
  //     addColumns3.forEach((cols, j) => {
  //       data1.push(rows[j].field.trim(),);
  //       data2.push(rows[j].value !== undefined ? rows[j].value : 0);
  //     })
  //     const obj = func(data1, data2);
  //     datas.push(obj);

  //   })
  //   return  datas;
  // }

  function func(arr1, arr2) {
    const obj = {};
    arr1.forEach((Curr_element, index) => {
      obj[Curr_element.trim()] = arr2[index];
    });
    return obj;
  }
  //p.Pono + "," + p.Asptblchkid + "," + p.Compcode + "," + p.Finyear + "," + p.Asptblchk1id
  async function ParamsListData(res) {
    const [Pono, Asptblchkid, Compcode, Finyear, Asptblchk1id] = res?.split(",") ?? [];
    return [
      {
        Pono: Pono,
        Asptblchkid: Asptblchkid,
        Compcode: Compcode,
        Finyear: Finyear,
        Asptblchk1id: Asptblchk1id,
      },
    ];
  }

  const CheckingEntry_Save = async (e) => {
    try {
      const errorMessage = await FieldValidate(checkValues);

      if (!errorMessage) {
        toast.error("Please fill required fields.");
        setIsLoading(false);
        return;
      }

      // -------------------------
      // Step 2 : Row validation
      // -------------------------
      let rowError = await TableRowValidate(addRows3);

      if (!rowError) {
        toast.error("Please fill row data correctly.");
        setIsLoading(false);
        return;
      }

      // -------------------------
      // Step 3 : Primary submit
      // -------------------------

      const OBJ1 = BarCodeData;
      const res = await axios.post(`${insert_update}/${JSON.stringify(OBJ1)}`);

      const response = res.data;
      const users = await ListData();
      const param = await ParamsListData(response);
      if (!users || !param) {
        toast.error("Parameter generation failed");
        setIsLoading(false);
        return;
      }
      const userss = chunkArray(users, 25);
      var response1;
      let j = 0;
      for (let i = 0; i < userss.length; i++) {
        response1 = "";
        j += userss[i].length;
        response1 = await axios.post(`${insert_update}/${JSON.stringify(userss[i])}/${JSON.stringify(param)}`);
        setTotalcounts(`Rows  : ${response1.data + "  :  " + j}/${users.length}`);
      }
      if (response1?.data) {
        toast.success(response1.data);
        CheckingEntry_News();
      } else {
        toast.error("Final save failed.");
      }
      datas = [];
      users = "";
    } catch (ex) {
      setFetchError(ex);
    }
  };

  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  const CheckingEntry_Delete = async (e) => {};

  const DefectEntry_Search = async (e) => {};
  const [Qrbarvalues, setQrbarValues] = useState([]);
  const handleChange1 = async (e) => {
    const { value } = e.target;
    setQrbarValues(value);
  };

  const tabs = [
    { id: 1, label: title },
    { id: 2, label: subTitle },
  ];

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

  return (
    <div onSubmit={handleSubmit}>
      {userRights1.length >= 1 && (
        <div className="container-fluid animate-zoom p-1">
          <div className="row " style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>
            <ActionButtton
              news={CheckingEntry_News}
              isLoading={isLoading}
              saves={CheckingEntry_Save}
              deletes={CheckingEntry_Delete}
              searches={CheckingEntry_News}
              prints={CheckingEntry_News}
              treebutton={CheckingEntry_News}
              globalsearch={CheckingEntry_News}
              login={CheckingEntry_News}
              changepassword={CheckingEntry_News}
              changeskin={CheckingEntry_News}
              contact={CheckingEntry_News}
              pdf={CheckingEntry_News}
              imports={CheckingEntry_News}
              download={CheckingEntry_News}
              userRights={userRights1}
              colorValue={colorValue}
              newButton={newButton}
              foreValue={foreValue}
              screenHeader="CHECKING ENTRY"
            />

            <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />
            <div className="content-tabs">
              <div className={newButton === 1 ? "content active-content" : "content"}>
                <div
                  className="row pt-1"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.28)",
                    border: `1px solid rgba(255,255,255,0.55)`,
                    borderRadius: "16px",
                    padding: "7px 9px",
                    marginBottom: "16px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    background: `linear-gradient(90deg, ${colorValue} 0%, rgba(255,255,255,0.3) 100%)`,
                  }}
                >
                  <Label className={`col-md-1`} labelName={"CompCode"}></Label>
                  <CustomSelect
                    visible="block"
                    className="col-md-1 form-select"
                    name="Compcode"
                    value={checkValues.Compcode || ""}
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

                  <Label className={`col-md-1`} name="Type" forecolor={`${foreValue}`} labelName={"Type "}></Label>
                  <CustomSelect
                    visible="block"
                    className="col-md-3 form-select"
                    name="IssueType"
                    value={checkValues.IssueType || ""}
                    onChange={handleChange}
                    colorValue={colorValue}
                    tabIndex={3}
                    ref={(el) => (refs.current[3] = el)}
                    onKeyDown={(e) => handleEnter(e, 3)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    {ProcessType.map((result, index) => (
                      <option key={index} value={result.processname}>
                        {result.processname}
                      </option>
                    ))}
                  </CustomSelect>

                  <Label className={`col-md-1`} name="Pono" forecolor={`${foreValue}`} labelName={"Pono "} visible={true}></Label>
                  <CustomSelect
                    visible="block"
                    className="col-md-3 form-select"
                    name="Pono"
                    value={checkValues.Pono || ""}
                    onChange={handleChange}
                    colorValue={colorValue}
                    tabIndex={4}
                    ref={(el) => (refs.current[4] = el)}
                    onKeyDown={(e) => handleEnter(e, 4)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    {chkpo.map((result, index) => (
                      <option key={index} value={result.pono}>
                        {result.pono}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "4px",
                    margin: "14px 0 18px",
                    borderRadius: "12px",
                    background: `linear-gradient(90deg, ${colorValue} 0%, rgba(255,255,255,0.3) 100%)`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <div className="row pt-1">
                  <Input
                    type={"text"}
                    className1="col-md-1"
                    className="col-md-1"
                    id="Asptblchkid"
                    name="Asptblchkid"
                    placeholder=""
                    value={checkValues.Asptblchkid || ""}
                    onChange={handleChange}
                    barValues={checkValues}
                    setBarValues={setCheckValues}
                    name1={"DefectID"}
                    stylecolor={`${colorValue}`}
                    visible={true}
                    tabIndex={3}
                    disabled="true"
                  />
                  <Input
                    type={"text"}
                    className1="col-md-1"
                    className="col-md-1"
                    id="Asptblchk1id"
                    name="Asptblchk1id"
                    placeholder=""
                    value={checkValues.Asptblchk1id || ""}
                    onChange={handleChange}
                    barValues={checkValues}
                    setBarValues={setCheckValues}
                    name1={"Defect1ID"}
                    stylecolor={colorValue}
                    visible={true}
                    tabIndex={4}
                    disabled="true"
                  />
                  <Input
                    type={"text"}
                    className1="col-md-1"
                    className="col-md-1"
                    id="Shortcode"
                    name="Shortcode"
                    placeholder=""
                    value={checkValues.Shortcode || ""}
                    onChange={handleChange}
                    barValues={checkValues}
                    setBarValues={setCheckValues}
                    name1={"ShortCode"}
                    stylecolor={colorValue}
                    visible={true}
                    tabIndex={5}
                    disabled="true"
                  />
                  <Input
                    type="date"
                    className1="col-md-1"
                    className="col-md-2"
                    id="Wdate"
                    name="Wdate"
                    placeholder=""
                    value={checkValues.Wdate}
                    onChange={handleChange}
                    barValues={checkValues}
                    setBarValues={setCheckValues}
                    name1={"Date"}
                    stylecolor={`${colorValue}`}
                    visible={true}
                    tabIndex={6}
                  />

                  <Input
                    type={"text"}
                    className1="col-md-1"
                    className="col-md-2"
                    id="Checkno"
                    name="Checkno"
                    placeholder=""
                    value={checkValues.Checkno || ""}
                    onChange={handleChange}
                    axioss1={ponochange}
                    barValues={checkValues}
                    setBarValues={setCheckValues}
                    name1={"CutPanelno"}
                    stylecolor={colorValue}
                    visible={true}
                    tabIndex={11}
                  />
                </div>
                <div className="row pt-1">
                  <Label className={`col-md-1`} labelName={"Processname"} forecolor={`${colorValue}`} visible={true}></Label>
                  <CustomSelect
                    visible="block"
                    className="col-md-2 form-select"
                    name="Processname"
                    value={checkValues.Processname || ""}
                    onChange={handleChange}
                    colorValue={colorValue}
                    tabIndex={4}
                    ref={(el) => (refs.current[4] = el)}
                    onKeyDown={(e) => handleEnter(e, 4)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    {processItems.map((result, index) => (
                      <option key={index} value={result.asptblpromasid}>
                        {result.processname}
                      </option>
                    ))}
                  </CustomSelect>

                  <Label className={`col-md-1`} name="Remarks" forecolor={`${colorValue}`} labelName={"Remarks"} visible={true}></Label>
                  <CustomSelect
                    visible="block"
                    className="col-md-2 form-select"
                    name="IssueType"
                    value={checkValues.IssueType || ""}
                    onChange={handleChange}
                    colorValue={colorValue}
                    tabIndex={7}
                    ref={(el) => (refs.current[7] = el)}
                    onKeyDown={(e) => handleEnter(e, 7)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    {processItems.map((result, index) => (
                      <option key={index} value={result.asptblpromasid}>
                        {result.processname}
                      </option>
                    ))}
                  </CustomSelect>

                  <Input
                    type={"text"}
                    className1="col-md-1"
                    className="col-md-2"
                    id="OrderNo"
                    name="OrderNo"
                    placeholder=""
                    value={checkValues.Orderno || ""}
                    onChange={handleChange}
                    barValues={checkValues}
                    setBarValues={setCheckValues}
                    name1={"Erp-OrderNo"}
                    stylecolor={`${colorValue}`}
                    visible={true}
                    tabIndex={8}
                    disabled="true"
                  />
                  <Input
                    type={"text"}
                    className1="col-md-1"
                    className="col-md-2"
                    id="Styleref"
                    name="Styleref"
                    placeholder=""
                    value={checkValues.Styleref || ""}
                    onChange={handleChange}
                    barValues={checkValues}
                    setBarValues={setCheckValues}
                    name1={"Styleref"}
                    stylecolor={colorValue}
                    visible={true}
                    tabIndex={9}
                    disabled="true"
                  />
                </div>
                <div className="row pt-1">
                  <Label className={`col-md-1`} name="Notes" forecolor={`${colorValue}`} visible={true}></Label>

                  <CustomSelect
                    visible="block"
                    className="col-md-2 form-select"
                    name="Notes"
                    value={checkValues.Notes || ""}
                    onChange={handleChange}
                    colorValue={colorValue}
                    tabIndex={11}
                    ref={(el) => (refs.current[11] = el)}
                    onKeyDown={(e) => handleEnter(e, 11)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value={"PCS RATE"}>PCS RATE</option>
                    <option value={" MONTHLY"}> MONTHLY</option>
                  </CustomSelect>
                  {/* <select className="col-md-2" name="Notes" tabIndex="11" ref={inputref} value={checkValues.Notes || ""} onChange={handleChange}>
                      <option></option>
                      <option value={"PCS RATE"}>PCS RATE</option>
                      <option value={" MONTHLY"}> MONTHLY</option>
                    </select> */}
                  <Input
                    type={"text"}
                    className1="col-md-1"
                    className="col-md-5"
                    id="Barcode"
                    name="Barcode"
                    placeholder=""
                    value={checkValues.Barcode || ""}
                    onChange={handleChange}
                    axioss1={ponochange}
                    barValues={checkValues}
                    setBarValues={setCheckValues}
                    name1={"BarCode"}
                    stylecolor={colorValue}
                    visible={true}
                    tabIndex={11}
                  />
                </div>

                <div className="row pt-1">
                  <label className="col-md-2" color={`${colorValue}`} style={{ fontSize: "20px", fontWeight: "bold", ali: "center" }}>
                    BarCode SCan
                  </label>
                  <input className="col-md-4" type="text" value={Qrbarvalues || ""} onChange={handleChange1} name="Qrbarvalues" ref={inputref} style={{ fontSize: "20px", fontWeight: "bold" }} />
                  <button
                    type="submit"
                    className="col-md-1"
                    onClick={() => BarcodeChanges(checkValues.Compcode, checkValues.IssueType, checkValues.Pono, Qrbarvalues)}
                    style={{ display: userRights1[0].news === "T" ? "block" : "none", backgroundColor: `${colorValue}`, color: `${foreValue}` }}
                  >
                    ADD
                  </button>
                  <Label className={`col-md-1`} name="Result" forecolor={`${colorValue}`} labelName={"Result "} visible={true}></Label>
                </div>
                <SortableTable
                  columns={addColumns3}
                  rows={addRows3}
                  colorValue={colorValue}
                  foreValue={foreValue}
                  bgValue={bgValue}
                  maxHeight="450px"
                  id="CheckingTableEntry"
                  id1="CheckingTableEntryRows"
                  reverseRows={true}
                  noDataComponent={<SocialMissing colorValue={colorValue} fetchError={fetchError} />}
                />
                <strong className="col-12 p-2" style={{ backgroundColor: colorValue, color: foreValue }}>
                  {totalcounts}
                </strong>

                {/* <div style={{ overflow: "auto", height: "300px",padding:"5px", backgroundColor: `${bgValue}` }} className='col-md-12'>
                  <div style={{ overflow: "auto", height: "100%", width: "auto", border: `1px solid ${foreValue}`, borderRadius: "0.1em", margin: "0", padding: "0.5%" }}  >

                    <table className='table table-responsive table-striped' id='maintable' >
                      <thead style={{ backgroundColor: `${colorValue}`, position: "sticky" }}  >
                        <tr >
                          {

                            addColumns3.map((h, index) => (
                              `${h.HeaderVisible}` === 'visible' ?
                                <th key={index} width={h.widths} style={{ backgroundColor: `${colorValue}`,color:`${foreValue}`, margin: "0", padding: "3px", borderLeft: "1px solid white", textAlign: "left" }}
                                  name={h.field}>{h.field.toUpperCase()} </th>
                                : ""
                            ))
                          }
                        </tr>
                      </thead>
                      <tbody id='maintable1'>
                        {
                          addRows3.length < 0 ?
                            <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing> :
                            addRows3.slice().reverse().map((rows, index) => (
                              <tr key={index} style={{ margin: "0", padding: "0" }} id="maintableRows"  >
                                {
                                  addColumns3.map((cols, indx, width) => {
                                    return `${cols.HeaderVisible}` === 'visible' ?
                                      <td key={indx} width={cols.widths} id={cols.field} name={[`${cols.field}`]}
                                        value={[`${rows[indx].value}`]}  >   {[`${rows[indx].value}`]}        </td> : ""

                                  })

                                }
                              </tr>
                            ))
                        }
                      </tbody>

                    </table>

                  </div>

                </div>
                 <strong className='col-md-12 p-0 m-0' style={{backgroundColor:{colorValue}}}>{totalcounts}</strong>  */}
              </div>
              <div className={newButton === 2 ? "content active-content" : "content"}>
                <div className="row animate-zoom">
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

export default CheckingEntry;
