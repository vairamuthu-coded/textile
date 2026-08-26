import React, { useContext, useEffect, useMemo, useState } from "react";
import { utilityState } from "../utilityState";
import { useRef } from "react";
import DataContext from "../context/CreateUserContext.js";
import axios from "axios";
import { toast } from "react-toastify";
import "../ContextMenu.css";
import ActionButtton from "../ActionButtton";
import PopupCombo from "../Popup.jsx";
import PopupGram from "../Popup.jsx";
import PopupYarn from "../Popup.jsx";
import PopupProcess from "../Popup.jsx";
import imagebutton from "../Images/win.png";
import MultiSelect from "../Custom/MultiSelect.jsx";
import defaultimage from "../Images/win.png";
import ImageUploader from "../Custom/ImageUploader.jsx";
import { classNames } from "@react-pdf-viewer/core";
import Search from "../Custom/Search.js";
import DataTable from "../Custom/DataTable.js";
import TabNav from "../component/TabNav.jsx";
import CustomSelect from "../Custom/CustomSelect";
import Label from "../Custom/Label.js";

const FabricYarnProcess = ({ title, subTitle }) => {
  const {
    API_URL,
    newButton,
    handleSubmit,
    tabindex,
    currentPage,
    setCurrentPage,
    CountryParam,
    searchLable1,
    loading,
    setLoading,
    searchLable2,
    searchLable3,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    sequenceTable,
    colorValue,
    bgValue,
    foreValue,
    barValues,
    setBarValues,
    addRows,
    setAddRows,
    defaultDetails,
    sorting,
    setSorting,
    setNewButton,
    sizeGroup,
    setSizeGroup,
    color1,
    addColumns,
    setAddColumns,
    HeadersColumn,
    contextMenu,
    setContextMenu,
    setFetchError,
    fetchError,
    ITEM_PER_PAGE,
    garimages,
    setGarImage,
    fabyarn_Values,
    setFabYarn_Values,
    fabyarn_DetValues,
    setFabYarn_DetValues,
    fabyarn_combo_Values,
    setFabYarn_Combo_Values,
    fabyarn_gram_Values,
    setFabYarn_Gram_Values,
    fabyarn_yarn_Values,
    setFabYarn_Yarn_Values,
    fabyarn_pro_Values,
    setFabYarn_Pro_Values,
  } = useContext(DataContext);
  const ENDPOINTS = {
    COMPANY: "/CompanyMaster/GridLoad",
    BUYER: "/BuyerMasters",
    PURCHASES: "/PurchasesOrders",
    SIZE_GROUP: "/SizeGroupMasters",
    COLOR: "/ColorMaster/GetColor",
    PROCESS: "/ProcessMaster/GetProcess",
    STYLE_ITEM: "/StyleItemMasters",
    PONO_DETAILS: "/PurchasesOrders/ponoDetails",
    PONO_DETAILSS: "/PurchasesOrders/PonoDetailss",
    GRID_LOAD: "/PurchasesOrders/GridLoad",
    GRID_LOAD_COLOR: "/PurchasesOrders/GridLoadColor",
    GRID_LOAD_SIZE: "/PurchasesOrders/GridLoadSize",
    MENU_RIGHTS: "/UserRights/userrightsMenuCheck",
  };
  let fabRowindex = 0;
  let yarnRowindex = 0;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const insert_update = `${API_URL}/FabYarnProcess`;
  const sizeGroupParam = `${API_URL}/SizeGroupMasters`;

  const SizeParam = `${API_URL}/SizeMasters`;
  const FinYearParam = `${API_URL}/FinYearMasters`;
  const StyleGroupParam = `${API_URL}/StyleGroupMasters/SplCategory`;
  const ColorParam = `${API_URL}/ColorMaster/GetColor`;
  const ComboParam = `${API_URL}/ColorMaster/GetColor`;
  const BuyerParam = `${API_URL}/BuyerMasters`;
  const AgentMastersParam = `${API_URL}/AgentMasters`;
  const BuyerUAgentParam = `${API_URL}/BuyerAgentMasters`;
  const UomMastersParam = `${API_URL}/UomMasters`;
  const OrderPackTypeMastersParam = `${API_URL}/OrderPackTypeMasters`;
  const PayTermsParam = `${API_URL}/PayTermMasters`;
  const CurrencyMastersParam = `${API_URL}/CurrencyMasters`;
  const StyleCategoryParams = `${API_URL}/StyleCategoryMasters`;
  const StyleItemMastersParams = `${API_URL}/StyleItemMasters`;
  const compcodeparam = `${API_URL}${ENDPOINTS.COMPANY}`;
  const [popupType, setPopupType] = useState("");
  const [comboShowPopup, setComboShowPopup] = useState(false);
  const [gramShowPopup, setGramShowPopup] = useState(false);
  const [yarnShowPopup, setYarnShowPopup] = useState(false);
  const [processShowPopup, setProcessShowPopup] = useState(false);
  const [userRights1, setUserRights1] = useState([]);
  const [items, setItems] = useState([]);
  const [finYearItems, setFinYearItems] = useState([]);
  const [sizeItems, setSizeItems] = useState([]);
  const [colorItems, setColorItems] = useState([]);
  const [comboItems, setComboItems] = useState([]);
  const [styleGroupItems, setStyleGroupItems] = useState([]);
  const [buyerItems, setBuyerItems] = useState([]);
  const [buyerAgent, setBuyerAgent] = useState([]);
  const [UomItems, setUomItems] = useState([]);
  const [orderPackTypeItems, setOrderPackTypeItems] = useState([]);
  const [payTermItems, setPayTermItems] = useState([]);
  const [currencyItems, setCurrencyItems] = useState([]);
  const [styleCategoryItems, setStyleCategoryItems] = useState([]);
  const [styleGroupitem, setStyleGrioupItems] = useState([]);
  const [styleItems, setStyleItems] = useState([]);
  const [dis, setDis] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState([]);
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  const [fabyarnItem, setfabYarnItem] = useState([]);
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [fabyarn_Search, setfabyarnSearch] = useState([]);
  const [company_filterSearch, setCompanyFilterSearch] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [compcodeData, setCompCodeData] = useState([]);
  const heights = "380px";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, sizeGroupRes, sizeRes, styleGroupRes, colorRes, buyerRes, agentRes, uomRes, orderPackTypeRes, payTermRes, currencyRes, styleCategoryRes, styleitemRes, finYearRes, fabYarn_Res, fabyarn_Com_Res] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(sizeGroupParam),
          axios.get(SizeParam),
          axios.get(StyleGroupParam),
          axios.get(ColorParam),
          axios.get(BuyerParam),
          axios.get(AgentMastersParam),
          axios.get(UomMastersParam),
          axios.get(OrderPackTypeMastersParam),
          axios.get(PayTermsParam),
          axios.get(CurrencyMastersParam),
          axios.get(StyleCategoryParams),
          axios.get(StyleItemMastersParams),
          axios.get(FinYearParam),
          axios.get(insert_update),
          axios.get(`${compcodeparam}`),
        ]);

        setUserRights1(userRes.data);
        setItems(sizeGroupRes.data || []);
        setSizeItems(sizeRes.data || []);
        setStyleGroupItems(styleGroupRes.data || []);
        setColorItems(colorRes.data || []);

        setBuyerItems(buyerRes.data || []);
        setBuyerAgent(agentRes.data || []);
        setUomItems(uomRes.data || []);
        setOrderPackTypeItems(orderPackTypeRes.data || []);
        setPayTermItems(payTermRes.data || []);
        setCurrencyItems(currencyRes.data || []);
        setStyleCategoryItems(styleCategoryRes.data || []);
        setStyleGrioupItems(styleitemRes.data);
        setStyleItems(styleitemRes.data);
        setFinYearItems(finYearRes.data || []);
        setfabYarnItem(fabYarn_Res.data || []);
        setCompCodeData(fabyarn_Com_Res.data || []);
      } catch (error) {
        setFetchError(error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [defaultDetails?.Compcode, defaultDetails?.User, title]);

  // useEffect(() => {
  //   if (fabyarnItem.compcode != "") {
  //     const filterResult = fabyarnItem.filter((item) => item.compcode.includes(fabyarn_Search));
  //     setCompanyFilterSearch(filterResult.reverse());
  //   }
  // }, [fabyarnItem, fabyarn_Search]);

  const [ordimages, setordImage] = useState({
    imageFile: null,
    imagesrc: defaultimage,
    filetype: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const finalValue = type === "checkbox" ? (checked === true ? "T" : "F") : type === "number" ? Number(value) : value;

    setFabYarn_Values((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };
  const FabYarnProcessColumn = [
    { headername: "", field: "none" },
    { headername: "ID", field: "asptblFabYarId" },
    { headername: "COMPCODE", field: "compcode" },
    { headername: "ORDERNO", field: "orderNo" },
    { headername: "DATE", field: "orderDate" },
    { headername: "STYLEREFNO", field: "styleRefNo" },
    { headername: "ORDERQTY", field: "orderQty" },
    { headername: "ACTIVE", field: "active" },
  ];
  const commentsData = useMemo(() => {
    const keyword = String(fabyarn_Search || "").toLowerCase();

    // 1) FILTER
    let filtered = fabyarnItem;

    if (keyword) {
      filtered = fabyarnItem.filter((item) =>
        String(item.compcode || "")
          .toLowerCase()
          .includes(keyword),
      );
    }

    // Update total count
    setTotalItems(filtered.length);

    // 2) SORT
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      filtered = [...filtered].sort((a, b) => reversed * String(a[sorting.field] || "").localeCompare(String(b[sorting.field] || "")));
    }

    // 3) PAGINATION
    const start = (currentPage - 1) * ITEM_PER_PAGE;
    const end = start + ITEM_PER_PAGE;

    return filtered.slice(start, end);
  }, [fabyarnItem, currentPage, fabyarn_Search, sorting]);

  const FabYarnProcessCheck = async (row) => {
    try {
      const res = await axios.get(`${insert_update}/${row.asptblFabYarId}`);
      const data = res.data[0];
      if (data.asptblFabYarId === 0) {
        toast.error("Invalid Data");
        return;
      }

      const imageSrc = `${data.filetype},${data.ordLogo}`;
      setordImage({
        imagesrc: imageSrc,
        filetype: data.filetype,
      });

      setFabYarn_Values({
        AsptblFabYarId: Number(data.asptblFabYarId) || 0,
        Compcode: Number(data.compcode) || 0,
        FinYear: Number(data.finYear) || 0,
        OrderNo: data.orderNo || "",
        FabPlanNo: data.fabPlanNo || "",
        PlanDate: data.planDate || "",
        OrderType: data.orderType || "",
        TransType: data.transType || "",
        RequestNo: data.requestNo || "",
        BuyerCode: data.buyerCode || "",
        OrderQty: data.orderQty || "",
        ProdQty: data.prodQty || "",
        OrderPackType: data.orderPackType || "",
        CadEfficiency: data.cadEfficiency || "",
        Active: data.active === true ? "T" : "F",
      });
    } catch (error) {
      toast.error("-- " + error.message);
    } finally {
      setNewButton(1);
    }
  };

  const ListData0 = {
    AsptblFabYarId: Number(fabyarn_Values?.AsptblFabYarId) || 0,
    Compcode: Number(fabyarn_Values?.TransType) || 0,
    FinYear: Number(fabyarn_Values?.FinYear) || 0,

    OrderNo: fabyarn_Values?.OrderNo || "",
    FabPlanNo: fabyarn_Values?.FabPlanNo || "",
    PlanDate: fabyarn_Values?.PlanDate || "",
    OrderType: fabyarn_Values?.OrderType || "",
    TransType: fabyarn_Values?.TransType || "",
    RequestNo: fabyarn_Values?.RequestNo || "",
    BuyerCode: fabyarn_Values?.BuyerCode || "",

    OrderQty: Number(fabyarn_Values?.OrderQty) || 0,
    ProdQty: Number(fabyarn_Values?.ProdQty) || 0,
    CadEfficiency: Number(fabyarn_Values?.CadEfficiency) || 0,

    OrderPackType: fabyarn_Values?.OrderPackType || "",
    Active: fabyarn_Values?.Active === true ? "T" : "F",
  };

  const ListData1 = (items1 = []) => {
    return items1
      .filter((obj) => obj.StyleItem && obj.StyleItem !== "")
      .map((obj, i) => {
        var index = parseInt(i + 1);
        return {
          RowIndex: index,
          AsptblFabYarDetId: Number(obj.AsptblFabYarDetId) || 0,
          AsptblFabYarId: Number(obj.AsptblFabYarId) || 0,
          StyleItem: obj.StyleItem || 0,
          PortionId: obj.PortionId || 0,
          Portion: obj.Pportion || 0,
          Fabric: obj.Fabric || 0,
          Gsm: obj.Gsm || 0,
          Gauge: obj.Gauge || 0,
          LL: obj.LL || 0,
          Design: obj.Design || 0,
          Combo: obj.Combo || "",
          CadWt: obj.CadWt || 0,
          FabWt: obj.FabWt || 0,
          Grams: obj.Grams || 0,
          FabPlanQty: Number(obj.FabPlanQty) || 0,
          Yarn: obj.Yarn || "",
          FabPro: obj.FabPro || 0,
          Notes: obj.Notes || "",
        };
      });
  };

  const ListData2 = (items = []) => {
    return items
      .filter((obj) => obj.Combo && obj.Combo !== "")
      .map((obj, i) => ({
        RowIndex: Number(i) + 1,
        AsptblFabYarComId: Number(obj.AsptblFabYarComId) || 0,
        AsptblFabYarDetId: Number(obj.AsptblFabYarDetId) || 0,
        AsptblFabYarId: Number(obj.AsptblFabYarId) || 0,
        Combo: Number(obj.Combo) || 0,
        Notes: obj.Notes,
      }));
  };

  const ListData3 = (items = []) => {
    return items
      .filter((obj) => obj.styleitem && obj.styleitem !== "")
      .map((obj, i) => {
        var index = parseInt(i + 1);
        return {
          AsptblFabYarGraId: Number(obj.AsptblFabYarGraId) || 0,
          AsptblFabYarDetId: Number(obj.AsptblFabYarDetId) || 0,
          AsptblFabYarId: Number(obj.AsptblFabYarId) || 0,
          styleitem: Number(obj.styleitem) || 0,
          sizename: Number(obj.sizename) || 0,
          assortQty: Number(obj.assortQty) || 0,
          shipQty: Number(obj.shipQty) || 0,
          excessQty: Number(obj.excessQty) || 0,
          prodQty: Number(obj.prodQty) || 0,
          notes: obj.notes || "",
          rowIndex: index,
          compcode: Number(defaultDetails.HCompcode) || 0,
        };
      });
  };

  const ListData4 = (items = []) => {
    return items
      .filter((obj) => obj.assortNo && obj.assortNo !== "")
      .map((obj, i) => {
        var index = parseInt(i + 1);
        return {
          asptblOrdShiId: Number(obj.asptblOrdShiId) || 0,
          asptblFabYarId: Number(obj.asptblFabYarId) || 0,
          rowIndex: index,
          assortNo: obj.assortNo || "",
          delDate: obj.delDate || "",
          bPoNo: obj.bPoNo || "",
          portofLoading: Number(obj.portofLoading) || 0,
          destination: Number(obj.destination) || 0,
          destinationPort: Number(obj.destinationPort) || 0,
          combo: Number(obj.combo) || 0,
          color: Number(obj.color) || 0,
          shipQty: Number(obj.shipQty) || 0,
          notes: obj.notes || "",
          compcode: Number(defaultDetails.HCompcode) || 0,
        };
      });
  };

  const FabYarnProcess_New = async () => {
    setNewButton(1);

    setFabYarn_Values([]);
    setFabYarn_DetValues([]);
    setFabYarn_Combo_Values([]);
    setFabYarn_Gram_Values([]);
    setFabYarn_Pro_Values([]);
    setFabYarn_Yarn_Values([]);
  };

  const FabYarnProcess_Save = async () => {
    if (loading) return;
    if (!fabyarn_Values.SizeTemplate) {
      toast.error("Size Group is required");
      return;
    }
    if (!fabyarn_combo_Values.length) {
      toast.error("At least one detail row is required");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        FabYar: ListData0,
        FabYarDet: ListData1(fabyarn_DetValues),
        FabYarCom: ListData2(fabyarn_combo_Values),
        FabYarGra: ListData3(fabyarn_gram_Values),
        FabYarYar: ListData4(fabyarn_yarn_Values),
        // FabYarPro: ListData5(fabyarn_pro_Values),
      };
      const response = await axios.post(insert_update, payload);
      if (response.status === 200 || response.status === 201) {
        if (response.data?.error) {
          toast.error(response.data.error);
          return;
        }
        setNewButton(1);
        toast.success("Record Saved Successfully");
        FabYarnProcess_New();
      } else {
        toast.error("Failed to save data");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Error saving data");
    } finally {
      setLoading(false);
    }
  };
  const FabYarnProcess_Delete = () => {
    setNewButton(1);
  };
  const FabYarnProcess_Search = () => {
    setNewButton(3);
  };
  const FabYarnProcess_Prints = () => {
    setNewButton(1);
  };

  const cols = 4;
  const inputRefs = useRef([]);

  const focusField = (i) => {
    if (inputRefs.current[i]) {
      inputRefs.current[i].focus();
    }
  };

  const handleEnterFocus = (e, tableid) => {
    const td = e.target.closest("td");
    if (!td) return;

    const tr = td.parentElement;
    const table = tr.closest(tableid);

    if (!table) return;

    let nextRow = tr.RowIndex;
    let nextCell = td.cellIndex;

    switch (e.key) {
      case "Enter":
      case "ArrowRight":
        e.preventDefault();
        nextCell++;
        // Move next row first cell
        if (nextCell >= tr.cells.length) {
          nextCell = 0;
          nextRow++;
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        nextCell--;
        // Move previous row last cell
        if (nextCell < 0) {
          nextRow--;
          if (nextRow >= 0) {
            nextCell = table.rows[nextRow].cells.length - 1;
          }
        }
        break;
      default:
        return;
    }

    // Prevent invalid index
    if (nextRow < 0 || nextCell < 0) return;
    const nextElement = table.rows[nextRow]?.cells[nextCell]?.querySelector("input:not(:disabled), select:not(:disabled), button:not(:disabled), img");

    if (nextElement) {
      nextElement.focus();

      if (nextElement.tagName === "INPUT") {
        nextElement.select();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case "Enter":
      case "Tab":
        e.preventDefault(); // IMPORTANT for Tab
        focusField(index + 1);
        break;
      case "ArrowRight":
        e.preventDefault(); // IMPORTANT for Tab
        focusField(index + 1);
        break;

      case "ArrowLeft":
        e.preventDefault();
        focusField(index - 1);
        break;

      default:
        break;
    }
  };

  const TabIndexClick = async (inx) => {
    setNewButton(inx);
  };

  const closeMenu = () => {
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };
  const handleRightClick = (e, row, index) => {
    e.preventDefault();

    setContextMenu((prev) => ({ ...prev, visible: false }));

    setTimeout(() => {
      const menuWidth = 180;
      const menuHeight = 150;

      const x = Math.min(e.pageX, window.innerWidth - menuWidth);
      const y = Math.min(e.pageY, window.innerHeight - menuHeight);

      setContextMenu({
        visible: true,
        x,
        y,
        row,
        index,
      });
    }, 0);
  };

  const handleDelete = () => {
    if (contextMenu.index == null) return;

    let values = [...fabyarn_combo_Values];
    values.splice(contextMenu.index, 1);

    setFabYarn_Combo_Values(values);
    closeMenu();
  };

  const handleDeleteAll = () => {
    setFabYarn_Combo_Values([
      {
        asptblOrdSizId: "",
        asptblFabYarId: "",
        sizename: "",
        buyerPrice: "",
        notes: "",
      },
    ]);

    closeMenu();
  };

  const handle_Details_Change = async (index, field, value) => {
    const updated = [...fabyarn_DetValues];
    updated[index][field] = value;
    setFabYarn_DetValues(updated);
  };

  const fabyarn_Details_Headers = [
    { field: "SNo", label: "S.No", visible: true, type: "text", widths: "30px", disabled: true, pattern: "" },
    { field: "AsptblFabYarDetId", label: "ID", visible: false, type: "text", disabled: false, widths: "50px", pattern: "" },
    { field: "AsptblFabYarId", label: "asptblFabYarId", visible: false, type: "text", disabled: false, widths: "50px", disabled: true, pattern: "" },
    { field: "StyleItem", label: "Item", visible: true, type: "select", widths: "300px", disabled: false, pattern: "" },
    { field: "PortionId", label: "PortionID", visible: true, type: "select", widths: "100px", disabled: false, pattern: "" },
    { field: "Portion", label: "Portion", visible: true, type: "select", widths: "200px", disabled: false, pattern: "" },
    { field: "Fabric", label: "Fabric", visible: true, type: "select", widths: "300px", disabled: false, pattern: "" },
    { field: "Gsm", label: "Gsm", visible: true, type: "select", widths: "80px", disabled: false, pattern: "" },
    { field: "Gauge", label: "GG", visible: true, type: "select", widths: "80px", disabled: false, pattern: "" },
    { field: "LL", label: "LL", visible: true, type: "select", widths: "80px", disabled: false, pattern: "" },
    { field: "Design", label: "Design", visible: true, type: "select", widths: "150px", disabled: false, pattern: "" },
    { field: "Combo", label: "Combo", visible: true, type: "img", widths: "30px", heights: "20px", alignItems: "center", disabled: false, pattern: "" },
    { field: "CadWt", label: "CadWt", visible: true, type: "text", widths: "80px", disabled: false, pattern: "" },
    { field: "FabWt", label: "FabWt/Kgs", visible: true, type: "text", widths: "120px", disabled: false, pattern: "" },
    { field: "Grams", label: "Grams", visible: true, type: "img", widths: "30px", disabled: false, heights: "20px", alignItems: "center", pattern: "" },
    { field: "FabPlanQty", label: "FabPlanQty", visible: true, type: "text", widths: "40px", disabled: false, pattern: "" },
    { field: "Yarn", label: "Yarn", visible: true, type: "img", widths: "30px", heights: "20px", alignItems: "center", disabled: false, pattern: "" },
    { field: "FabPro", label: "FabPro", visible: true, type: "img", widths: "30px", heights: "20px", alignItems: "center", disabled: false, pattern: "" },
    { field: "Notes", label: "notes", visible: true, type: "text", widths: "20px", disabled: false, pattern: "" },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const fabyarn_Combo_Headers = [
    { field: "SNo", label: "SNo", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "RowIndex", label: "rowIndex", type: "text", visible: false, widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarComId", label: "ID", type: "text", visible: false, widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarDetId", label: "FabYarDetId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarId", label: "FabYarId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "Combo", label: "combo", visible: true, type: "select", widths: "250px", pattern: "", disabled: false },
    { field: "Notes", label: "notes", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const fabyarn_Gram_Headers = [
    { field: "SNo", label: "SNo", visible: true, type: "text", widths: "20px", disabled: true },
    { field: "RowIndex", label: "RowIndex", visible: false, type: "text", widths: "10px", disabled: true },
    { field: "AsptblFabYarGraId", label: "ID", visible: false, type: "text", widths: "50px", disabled: true },
    { field: "AsptblFabYarDetId", label: "DetId", visible: false, type: "text", disabled: false, widths: "50px", pattern: "" },
    { field: "AsptblFabYarId", label: "FabYarId", visible: false, type: "text", disabled: false, widths: "50px", disabled: true, pattern: "" },
    { field: "Combo", label: "Combo", visible: true, type: "select", widths: "250px", disabled: false },
    { field: "GarColor", label: "GarColor", visible: true, type: "select", widths: "250px", disabled: false },
    { field: "BaseColor", label: "BaseColor", visible: true, type: "select", widths: "250px", disabled: false },
    { field: "PorColor", label: "PortionColor", visible: true, type: "select", widths: "250px", disabled: false },
    { field: "SizeName", label: "SizeName", visible: true, type: "select", widths: "80px", disabled: false },
    { field: "ShipQty", label: "ShipQty", visible: true, type: "text", widths: "50px", disabled: false },
    { field: "ProdQty", label: "ProdQty", visible: true, type: "text", widths: "50px", disabled: false },
    { field: "SizeQty", label: "SizeQty", visible: true, type: "text", widths: "50px", disabled: false },
    { field: "CadWt", label: "CadWeight", visible: true, type: "text", widths: "80px", disabled: false },
    { field: "KDia", label: "Knit Dia", visible: true, type: "select", widths: "80px", disabled: false },
    { field: "FDia", label: "Fin Dia", visible: true, type: "select", widths: "80px", disabled: false },
    { field: "TotFabQty", label: "TotalFabQty", visible: true, type: "text", widths: "100px", disabled: false },
    { field: "Notes", label: "Notes", visible: true, type: "text", widths: "30px", disabled: false },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const fabyarn_Yarn_Headers = [
    { field: "SNo", label: "SNo", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "RowIndex", label: "rowIndex", type: "text", visible: false, widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarYarId", label: "asptblFabYarYarId", type: "text", visible: false, widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarDetId", label: "asptblFabYarDetId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarId", label: "asptblFabYarId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "Yarn", label: "yarn", visible: true, type: "select", widths: "250px", pattern: "", disabled: false },
    { field: "ColorName", label: "yarncolor", visible: true, type: "select", widths: "250px", pattern: "", disabled: true },
    { field: "Uom", label: "uom", visible: true, type: "select", widths: "250px", pattern: "", disabled: false },
    { field: "Per", label: "per", visible: true, type: "text", widths: "250px", pattern: "", disabled: false },
    { field: "YarnQty", label: "yarnqty", visible: true, type: "text", widths: "250px", pattern: "", disabled: false },
    { field: "ProYesNo", label: "Yarn Pro", visible: true, type: "select", widths: "100px", pattern: "", disabled: false },
    { field: "YarnProDet", label: "YarnProDet", visible: false, type: "img", widths: "20px", heights: "20px", alignItems: "center", pattern: "", disabled: false },
    { field: "Notes", label: "notes", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const fabyarn_Process_Headers = [
    { field: "SNo", label: "SNo", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "RowIndex", label: "rowIndex", type: "text", visible: false, widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarProId", label: "asptblFabYarProId", type: "text", visible: false, widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarDetId", label: "asptblFabYarDetId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarId", label: "asptblFabYarId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "ProcessName", label: "Process Name", visible: false, type: "select", widths: "250px", pattern: "", disabled: true },
    { field: "Loss", label: "loss", visible: true, type: "text", widths: "250px", pattern: "", disabled: false },
    { field: "Notes", label: "notes", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const [assort, setAssort] = useState([]);
  const [assort1, setAssort1] = useState([]);

  const handle_Gram_Change = (e, RowIndex, field) => {
    const value = e.target.value;
    const updated = [...fabyarn_gram_Values];
    updated[RowIndex][field] = value;
    setFabYarn_Gram_Values(updated);
  };

  const handle_Yarn_Change = (e, RowIndex, field) => {
    const value = e.target.value;
    const updated = [...fabyarn_yarn_Values];
    updated[RowIndex][field] = value;
    setFabYarn_Yarn_Values(updated);
  };
  const handle_Process_Change = (e, RowIndex, field) => {
    const value = e.target.value;
    const updated = [...fabyarn_pro_Values];
    updated[RowIndex][field] = value;
    setFabYarn_Pro_Values(updated);
  };

  const [showModal, setShowModal] = useState(false);

  const handleAddRow = (index) => {
    const newRow = {
      SNo: 1,
      RowIndex: 0,
      AsptblFabYarDetId: 0,
      AsptblFabYarId: 0,
      StyleItem: 0,
      PortionId: 0,
      Portion: "",
      Fabric: "",
      Gsm: "",
      Gauge: "",
      LL: "",
      Design: 0,
      Combo: "",
      CadWt: 0,
      FabWt: 0,
      Grams: "",
      FabPlanQty: 0,
      Yarn: "",
      FabPro: "",
      Notes: "",
    };
    const updated = [...fabyarn_DetValues];
    updated.splice(index + 1, 0, newRow);
    setFabYarn_DetValues(updated);
  };

  const handle_Com_AddRow = (index) => {
    const newRow = {
      SNo: index,
      RowIndex: 0,
      AsptblFabYarComId: 0,
      AsptblFabYarDetId: 0,
      AsptblFabYarId: 0,
      Combo: 0,
      Notes: "",
    };
    const updated = [...fabyarn_combo_Values];
    updated.splice(index + 1, 0, newRow);
    setFabYarn_Combo_Values(updated);
  };

  const handle_Gra_AddRow = (index) => {
    const newRow = {
      SNo: 1,
      RowIndex: 0,
      AsptblFabYarGraId: 0,
      AsptblFabYarDetId: 0,
      AsptblFabYarId: 0,
      Combo: 0,
      GarColor: 0,
      BaseColor: "",
      PorColor: "",
      SizeName: "",
      ShipQty: "",
      ProdQty: 0,
      SizeQty: 0,
      CadWt: 0,
      KDia: "",
      FDia: "",
      TotFabQty: "",
      Notes: "",
    };
    const updated = [...fabyarn_gram_Values];
    updated.splice(index + 1, 0, newRow);
    setFabYarn_Gram_Values(updated);
  };

  const handle_Yar_AddRow = (index) => {
    const newRow = {
      SNo: 1,
      RowIndex: 0,
      AsptblFabYarYarId: 0,
      AsptblFabYarDetId: 0,
      AsptblFabYarId: 0,
      Yarn: 0,
      ColorName: 0,
      Uom: "",
      Per: "",
      YarnQty: "",
      ProYesNo: "",
      YarnProDet: "",
      Notes: "",
    };
    const updated = [...fabyarn_yarn_Values];
    updated.splice(index + 1, 0, newRow);
    setFabYarn_Yarn_Values(updated);
  };

  const handle_Pro_AddRow = (index) => {
    const newRow = {
      SNo: 1,
      RowIndex: 0,
      AsptblFabYarProId: 0,
      AasptblFabYarDetId: 0,
      AsptblFabYarId: 0,
      ProcessName: 0,
      Loss: 0,
      Notes: "",
    };
    const updated = [...setFabYarn_Pro_Values];
    updated.splice(index + 1, 0, newRow);
    setFabYarn_Pro_Values(updated);
  };

  const handleDeleteRow = (index) => {
    const updated = fabyarn_DetValues.filter((_, i) => i !== index);
    setFabYarn_Values(updated);
  };

  const [sequence, setSquence] = useState();
  const [popup_Details_DataCopy, setPopup_Details_DataCopy] = useState([""]);
  const [popup_Combo_DataCopy, setPopup_Combo_DataCopy] = useState([]);
  const [popup_Gram_DataCopy, setPopup_Gram_DataCopy] = useState([]);
  const [popup_Yarn_DataCopy, setPopup_Yarn_DataCopy] = useState([]);
  const [popup_Process_DataCopy, setPopup_Process_DataCopy] = useState([]);

  const handle_Combo_Change = (e, RowIndex, field) => {
    const value = e.target.value;

    setFabYarn_Combo_Values((prev) =>
      prev.map((item, index) =>
        index === Number(RowIndex)
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };
  const handle_Combo_Details = (row, RowIndex) => {
    setComboShowPopup(true);
    const finid = Number(RowIndex);
    setSquence(finid);
    const filteredData = popup_Combo_DataCopy.filter((item) => Number(item.RowIndex) === finid);
    if (filteredData.length > 0) {
      setFabYarn_Combo_Values(filteredData);
    } else {
      const newrow = {
        SNo: 1,
        RowIndex: finid,
        AsptblFabYarComId: Number(row.AsptblFabYarComId) || 0,
        AsptblFabYarDetId: Number(row.AsptblFabYarDetId) || 0,
        AsptblFabYarId: Number(row.AsptblFabYarId) || 0,
        Combo: "",
        Notes: "",
      };

      setFabYarn_Combo_Values([newrow]);
    }
  };

  const handle_Combo_PopupSave = () => {
    const finid = Number(sequence);

    setPopup_Combo_DataCopy((prev) => {
      const otherRows = prev.filter((item) => Number(item.RowIndex) !== finid);
      const newRows = fabyarn_combo_Values.map((item, index) => ({
        SNo: index + 1,
        RowIndex: finid,
        AsptblFabYarComId: item.asptblFabYarComId,
        AsptblFabYarDetId: item.asptblFabYarDetId,
        AsptblFabYarId: item.asptblFabYarId,
        Combo: item.Combo,
        Notes: item.Notes || "",
      }));

      return [...otherRows, ...newRows];
    });

    setFabYarn_Combo_Values([]);
    setComboShowPopup(false);
  };

  const handle_Combo_PopupPopulate = () => {
    if (popup_Combo_DataCopy.length >= 1) {
      const finid = Number(sequence);
      const filteredData = popup_Combo_DataCopy.filter((item) => item.RowIndex === finid);
      if (filteredData.length >= 1) {
        setFabYarn_Combo_Values(filteredData);
      }
    } else {
      toast.error("Invalid Row");
    }
  };

  const handle_Gram_StyleDetails = (row, RowIndex) => {
    setGramShowPopup(true);
    const finid = Number(RowIndex);
    setSquence(finid);
    const filteredData = popup_Gram_DataCopy.filter((item) => Number(item.RowIndex) === finid);
    if (filteredData.length > 0) {
      setPopup_Gram_DataCopy(filteredData);
    } else {
      const newrow = sizeItems.map((item, i) => {
        return {
          SNo: Number(i) + 1,
          RowIndex: finid,
          AsptblFabYarGraId: row.AsptblFabYarGraId,
          AsptblFabYarDetId: row.AsptblFabYarDetId,
          AsptblFabYarId: row.AsptblFabYarId,
          Combo: "",
          GarColor: 0,
          BaseColor: "",
          PorColor: "",
          SizeName: item.sizename,
          ShipQty: "",
          ProdQty: 0,
          SizeQty: 0,
          CadWt: 0,
          KDia: "",
          FDia: "",
          TotFabQty: "",
          Notes: "",
        };
      });
      setFabYarn_Gram_Values((prev) => [...prev, ...newrow]);
    }
  };

  const handle_Gram_PopupSave = () => {
    const finid = Number(sequence);
    setPopup_Gram_DataCopy((prev) => {
      const otherRows = prev.filter((item) => Number(item.RowIndex) !== finid);
      const newRows = popup_Gram_DataCopy.map((item, index) => ({
        SNo: index + 1,
        RowIndex: finid,
        AsptblFabYarGraId: item.AsptblFabYarGraId,
        AsptblFabYarDetId: item.asptblFabYarDetId,
        AsptblFabYarId: item.asptblFabYarId,
        Combo: "",
        GarColor: 0,
        BaseColor: "",
        PorColor: "",
        SizeName: item.SizeName,
        ShipQty: "",
        ProdQty: 0,
        SizeQty: 0,
        CadWt: 0,
        KDia: "",
        FDia: "",
        TotFabQty: "",
        Notes: "",
      }));

      return [...otherRows, ...newRows];
    });
    setFabYarn_Gram_Values([]);
    setGramShowPopup(false);
  };

  const handle_Gram_PopupPopulate = () => {
    setFabYarn_Gram_Values([]);
    const finid = Number(sequence);
    if (fabyarn_gram_Values.length >= 1) {
      const finid = Number(sequence);
      const filteredData = popup_Gram_DataCopy.filter((item) => item.RowIndex === finid);
      if (filteredData.length >= 1) {
        setFabYarn_Gram_Values(filteredData);
      }
    } else {
      toast.error("Invalid Row");
    }
  };

  const handle_Yarn_StyleDetails = (row, RowIndex) => {
    setYarnShowPopup(true);
  };

  const handle_Process_Details = (row, RowIndex) => {
    setProcessShowPopup(true);
  };

  const handle_Yarn_PopupPopulate = () => {
    setYarnShowPopup(true);
    alert(JSON.stringify(yarnShowPopup));
    setFabYarn_Yarn_Values([]);
    const finid = Number(sequence);

    if (fabyarn_yarn_Values.length >= 1) {
      const finid = Number(sequence);
      const filteredData = popup_Yarn_DataCopy.filter((item) => item.RowIndex === finid);
      if (filteredData.length >= 1) {
        setFabYarn_Yarn_Values(filteredData);
      }
    } else {
      toast.error("Invalid Row");
    }
  };

  const handle_Process_PopupPopulate = () => {
    setGramShowPopup(true);
  };

  const handle_Yarn_PopupSave = () => {
    const finid = Number(sequence);
  };

  const handle_Process_PopupSave = () => {};

  const handle_Combo_PopupClear = () => {
    setComboShowPopup(false);
    setPopup_Combo_DataCopy([]);
  };

  const handle_Gram_PopupClear = () => {
    setGramShowPopup(false);
    setPopup_Gram_DataCopy([]);
  };

  const handle_Yarn_PopupClear = () => {
    setYarnShowPopup(false);
    setPopup_Yarn_DataCopy([]);
  };

  const handle_Process_PopupClear = () => {
    setProcessShowPopup(false);
    setPopup_Process_DataCopy([]);
  };

  const tabs = [
    { id: 1, label: title },
    { id: 2, label: subTitle },
  ];

  const tabs1 = [{ id: 1, label: "FabricPlanning Details", param: "FabricPlanning Details" }];
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

  return (
    <div className="container-fluid">
      {userRights1.length >= 1 && (
        <div
          className="row"
          style={{
            display: `${userRights1[0].readonlys === "T" ? "block" : "none"}`,
          }}
        >
          <ActionButtton
            news={FabYarnProcess_New}
            saves={FabYarnProcess_Save}
            deletes={FabYarnProcess_Delete}
            searches={FabYarnProcess_Search}
            prints={FabYarnProcess_Prints}
            treebutton={FabYarnProcess_New}
            globalsearch={FabYarnProcess_New}
            login={FabYarnProcess_New}
            changepassword={FabYarnProcess_New}
            changeskin={FabYarnProcess_New}
            contact={FabYarnProcess_New}
            pdf={FabYarnProcess_New}
            imports={FabYarnProcess_New}
            download={FabYarnProcess_New}
            userRights={userRights1}
            colorValue={colorValue}
            newButton={newButton}
            foreValue={foreValue}
            screenHeader="Fabric Yarn Process Planning"
          />

          <div className="container-fluid">
            <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />
            <div className={newButton === 1 || newButton === 4 || newButton === 5 ? "content active-content" : "content"}>
              <div className="row">
                <div className="col-12 col-xl-11">
                  <div className="row ">
                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">FabPlanNo</label>
                        <input type="text" className=" col-8 form-control" name="FabPlanNo" value={fabyarn_Values.FabPlanNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[1] = el)} onKeyDown={(e) => handleKeyDown(e, 1)} />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">PlanDate</label>
                        <input type="date" className=" col-8 form-control" name="PlanDate" value={fabyarn_Values.PlanDate || ""} onChange={handleChange} ref={(el) => (inputRefs.current[3] = el)} onKeyDown={(e) => handleKeyDown(e, 3)} />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <Label className="col-4" labelName="OrderType" />

                        <CustomSelect
                          visible="block"
                          className="col-8 form-select"
                          name="OrderType"
                          value={fabyarn_Values.OrderType || ""}
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
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">TransType</label>

                        <CustomSelect
                          visible="block"
                          className="col-8 form-select"
                          name="TransType"
                          value={fabyarn_Values.TransType || ""}
                          onChange={handleChange}
                          colorValue={colorValue}
                          tabIndex={4}
                          ref={(el) => (refs.current[4] = el)}
                          onKeyDown={(e) => handleEnter(e, 4)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value={1}>TransType-1</option>
                          <option value={2}>TransType-2</option>
                        </CustomSelect>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">OrderNo</label>

                        <input type="text" className="col-8 form-control" name="OrderNo" value={fabyarn_Values.OrderNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[5] = el)} onKeyDown={(e) => handleKeyDown(e, 5)} />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">RequestNo</label>

                        <CustomSelect
                          visible="block"
                          className="col-8 form-select"
                          name="RequestNo"
                          value={fabyarn_Values.RequestNo || ""}
                          onChange={handleChange}
                          colorValue={colorValue}
                          tabIndex={6}
                          ref={(el) => (refs.current[6] = el)}
                          onKeyDown={(e) => handleEnter(e, 6)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value={1}>FromEnq</option>
                          <option value={2}>Direct</option>
                        </CustomSelect>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">BuyerCode</label>

                        <CustomSelect
                          visible="block"
                          className=" col-8 form-select"
                          name="BuyerCode"
                          value={fabyarn_Values.BuyerCode || ""}
                          onChange={handleChange}
                          colorValue={colorValue}
                          tabIndex={7}
                          ref={(el) => (refs.current[7] = el)}
                          onKeyDown={(e) => handleEnter(e, 7)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          {buyerItems.map((year) => (
                            <option key={year.asptblbuymasid} value={year.asptblbuymasid}>
                              {year.buyercode}
                            </option>
                          ))}
                        </CustomSelect>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">OrderQty</label>

                        <input type="text" className="col-8 form-control" name="OrderQty" value={fabyarn_Values.OrderQty || ""} onChange={handleChange} ref={(el) => (inputRefs.current[8] = el)} onKeyDown={(e) => handleKeyDown(e, 8)} />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">ProdQty</label>

                        <input type="text" className="col-8 form-control" name="ProdQty" value={fabyarn_Values.ProdQty || ""} onChange={handleChange} ref={(el) => (inputRefs.current[9] = el)} onKeyDown={(e) => handleKeyDown(e, 9)} />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">OrderPackType</label>

                        <CustomSelect
                          visible="block"
                          className="col-8 form-select"
                          name="OrderPackType"
                          value={fabyarn_Values.OrderPackType || ""}
                          onChange={handleChange}
                          colorValue={colorValue}
                          tabIndex={10}
                          ref={(el) => (refs.current[10] = el)}
                          onKeyDown={(e) => handleEnter(e, 10)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          {buyerItems.map((buyer) => (
                            <option key={buyer.asptblbuymasid} value={buyer.asptblbuymasid}>
                              {buyer.buyercode}
                            </option>
                          ))}
                        </CustomSelect>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label nowrap">Cad Efficiency</label>

                        <input type="text" className="col-8 form-control" name="CadEfficiency" value={fabyarn_Values.CadEfficiency || ""} onChange={handleChange} ref={(el) => (inputRefs.current[11] = el)} onKeyDown={(e) => handleKeyDown(e, 11)} />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-3">
                      <div className="row align-items-center">
                        <label className="col-4 col-form-label">Active</label>

                        <div className="col-8">
                          <label
                            className="checkbox"
                            style={{
                              padding: "0px",
                              width: "60px",
                            }}
                          >
                            <input type="checkbox" name="Active" checked={fabyarn_Values.active} onChange={handleChange} />
                            <span></span>
                            <i className="indicator"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xl-1">
                  <div
                    className="d-flex justify-content-center align-items-center h-100"
                    style={{
                      minHeight: "100px",
                    }}
                  >
                    <ImageUploader images={garimages} setImage={setGarImage} name="OrdLogo" value={fabyarn_Values.OrdLogo} defaultimage={defaultimage} buttonVisible="none" />
                  </div>
                </div>

                <div className="row pt-1">
                  <TabNav tabs={tabs1} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || tab.id === 1} />

                  <div className="content-tabs">
                    <div className={newButton === 1 ? "content active-content" : "content"}>
                      <div className="row animate-zoom">
                        <div className="table-responsive">
                          <div className="table-responsive" style={{ overflowX: "auto", width: "100%", height: "350px" }}>
                            <table className="table table-bordered table-sm align-middle mb-0" id="fabDetTab">
                              <thead style={{ backgroundColor: colorValue, color: foreValue, position: "sticky" }}>
                                <tr>
                                  {fabyarn_Details_Headers
                                    .filter((col) => col.visible)
                                    .map((col) => (
                                      <th
                                        key={col.field}
                                        style={{
                                          width: col.widths,
                                          minWidth: col.widths,
                                          fontFamily: "Roboto",
                                          fontSize: "var(--bs-font-sm)",
                                          backgroundColor: colorValue,
                                          color: foreValue,
                                          padding: "0",
                                          margin: "0",
                                        }}
                                        className="p-2"
                                      >
                                        {col.label}
                                      </th>
                                    ))}
                                </tr>
                              </thead>

                              <tbody>
                                {fabyarn_DetValues.map((row, RowIndex) => (
                                  <tr key={RowIndex} style={{ margin: "0", padding: "0" }} onContextMenu={(e) => handleRightClick(e, row, RowIndex)}>
                                    {fabyarn_Details_Headers
                                      .filter((col) => col.visible)
                                      .map((col, colIndex) => {
                                        const value = row[col.field] || "";
                                        const tcols = fabyarn_Details_Headers.filter((c) => c.visible).length;
                                        const tabIndexValue = RowIndex * tcols + colIndex + 1;
                                        const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights, alignItems: col.alignItems };
                                        // S.No
                                        if (col.field === "SNo") {
                                          return (
                                            <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                              <input type="text" className="w-100 form-control" value={RowIndex + 1} disabled={col.disabled} onChange={(e) => handle_Details_Change(RowIndex, col.field, e.target.value)} />
                                            </td>
                                          );
                                        }

                                        // TEXT
                                        if (col.type === "text") {
                                          return (
                                            <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                              <input
                                                type="text"
                                                className="w-100 form-control"
                                                value={value}
                                                onChange={(e) => handle_Details_Change(RowIndex, col.field, e.target.value)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#fabDetTab");
                                                }}
                                              />
                                            </td>
                                          );
                                        }

                                        if (col.type === "select") {
                                          let options = [];

                                          if (col.field === "StyleItem" || col.field === "PortionId") {
                                            options = styleGroupitem;
                                          } else if (col.field === "Portion" || col.field === "Design") {
                                            options = colorItems;
                                          } else if (col.field === "Fabric" || col.field === "Gsm" || col.field === "Gauge" || col.field === "LL") {
                                            options = comboItems;
                                          }

                                          return (
                                            <td key={colIndex} style={commonStyle}>
                                              <select
                                                className="w-100  form-select"
                                                value={value}
                                                name={col.field}
                                                onChange={(e) => handle_Details_Change(RowIndex, col.field, e.target.value)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#fabDetTab");
                                                }}
                                              >
                                                {options.map((item, i) => (
                                                  <option key={i} value={item.asptblstyleitemmasid || item.asptblcolmasid || item.asptblcolmasid}>
                                                    {item.stylegroup || item.colorname || item.colorname}
                                                  </option>
                                                ))}
                                              </select>
                                            </td>
                                          );
                                        }

                                        if (col.type === "img" && col.field === "Combo") {
                                          return (
                                            <td key={colIndex} style={commonStyle} className="p-0 m-0">
                                              <img
                                                src={imagebutton}
                                                alt="edit"
                                                tabIndex={0}
                                                className="p-0 m-0"
                                                style={commonStyle}
                                                onClick={() => handle_Combo_Details(row, RowIndex)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#fabDetTab");
                                                }}
                                              ></img>
                                            </td>
                                          );
                                        }
                                        if (col.type === "img" && col.field === "Grams") {
                                          return (
                                            <td key={colIndex} style={commonStyle} className="p-0 m-0">
                                              <img
                                                src={imagebutton}
                                                alt="edit"
                                                tabIndex={0}
                                                className="p-0 m-0"
                                                style={commonStyle}
                                                onClick={() => handle_Gram_StyleDetails(row, RowIndex)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#fabDetTab");
                                                }}
                                              ></img>
                                            </td>
                                          );
                                        }
                                        if (col.type === "img" && col.field === "Yarn") {
                                          return (
                                            <td key={colIndex} style={commonStyle} className="p-0 m-0">
                                              <img
                                                src={imagebutton}
                                                alt="edit"
                                                tabIndex={0}
                                                className="p-0 m-0"
                                                style={commonStyle}
                                                onClick={() => handle_Yarn_StyleDetails(row, RowIndex)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#fabDetTab");
                                                }}
                                              ></img>
                                            </td>
                                          );
                                        }
                                        if (col.type === "img" && col.field === "FabPro") {
                                          return (
                                            <td key={colIndex} style={commonStyle} className="p-0 m-0">
                                              <img
                                                src={imagebutton}
                                                alt="edit"
                                                tabIndex={0}
                                                className="p-0 m-0"
                                                style={commonStyle}
                                                onClick={() => handle_Process_Details(row, RowIndex)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#fabDetTab");
                                                }}
                                              ></img>
                                            </td>
                                          );
                                        }
                                        if (col.type === "button") {
                                          return (
                                            <td key={colIndex} style={commonStyle}>
                                              <button
                                                style={{ width: 0, margin: "0", padding: "0" }}
                                                disabled={col.disabled}
                                                onFocus={() => handleAddRow(RowIndex)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#fabDetTab");
                                                }}
                                              ></button>
                                            </td>
                                          );
                                        }

                                        return null;
                                      })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <PopupCombo
                  show={comboShowPopup}
                  onClose={() => setComboShowPopup(false)}
                  title={`${fabRowindex} Combo Details`}
                  foreValue={foreValue}
                  colorValue={colorValue}
                  handlePopupPopulate={handle_Combo_PopupPopulate}
                  handlePopupSave={handle_Combo_PopupSave}
                  handlePopupClear={handle_Combo_PopupClear}
                >
                  <div className="row animate-zoom" style={{ height: "200px", overflow: "auto", width: "100%" }}>
                    <div className="table-responsive">
                      <div className="table-responsive" style={{ maxHeight: "200px", overflow: "auto", width: "100%" }}>
                        <table className="table table-bordered table-sm align-middle mb-0 " id="ComboTable">
                          <thead style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, position: "sticky" }}>
                            <tr>
                              {fabyarn_Combo_Headers
                                .filter((col) => col.visible)
                                .map((col) => (
                                  <th
                                    key={col.field}
                                    style={{
                                      width: col.widths,
                                      fontFamily: "Roboto",
                                      fontSize: "var(--bs-font-sm)",
                                      backgroundColor: `${colorValue}`,
                                      color: `${foreValue}`,
                                      disabled: true,
                                      padding: "0",
                                      margin: "0",
                                    }}
                                    className="p-2"
                                  >
                                    {col.label}
                                  </th>
                                ))}
                            </tr>
                          </thead>

                          <tbody>
                            {fabyarn_combo_Values.map((row, RowIndex) => (
                              <tr key={RowIndex}>
                                {fabyarn_Combo_Headers
                                  .filter((col) => col.visible)
                                  .map((col, colIndex) => {
                                    const value = row[col.field] || "";
                                    const scols = fabyarn_Combo_Headers.filter((c) => c.visible).length;

                                    const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights, alignItems: col.alignItems };
                                    if (col.field === "SNo") {
                                      return (
                                        <td key={colIndex} className="text-center p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                          <input
                                            type="text"
                                            className="w-100"
                                            style={{ padding: "4px" }}
                                            value={Number(RowIndex + 1)}
                                            name={col.field}
                                            disabled={col.disabled}
                                            onChange={(e) => handle_Combo_Change(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#ComboTable");
                                            }}
                                          />
                                        </td>
                                      );
                                    }
                                    if (col.type === "text") {
                                      return (
                                        <td key={colIndex} className="text-center p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                          <input
                                            type="text"
                                            className="w-100"
                                            style={{ padding: "4px" }}
                                            value={value}
                                            name={col.field}
                                            disabled={col.disabled}
                                            onChange={(e) => handle_Combo_Change(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#ComboTable");
                                            }}
                                          />
                                        </td>
                                      );
                                    }
                                    // SELECT
                                    if (col.type === "select") {
                                      let options = [];

                                      if (col.field === "Combo") {
                                        options = sizeItems;
                                      }

                                      return (
                                        <td key={colIndex} className="p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                          <select
                                            className="w-100 p-1"
                                            disabled={col.disabled}
                                            value={value}
                                            name={col.field}
                                            onChange={(e) => handle_Combo_Change(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#ComboTable");
                                            }}
                                          >
                                            {options.map((item, i) => (
                                              <option key={i} value={item.asptblsizmasid}>
                                                {item.sizename}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                      );
                                    }
                                    if (col.type === "button") {
                                      return (
                                        <td key={colIndex} style={commonStyle}>
                                          <button
                                            style={{ width: 0, margin: "0", padding: "0" }}
                                            disabled={col.disabled}
                                            onFocus={() => handle_Com_AddRow(RowIndex)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#ComboTable");
                                            }}
                                          ></button>
                                        </td>
                                      );
                                    }
                                    return null;
                                  })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </PopupCombo>
                <PopupGram
                  show={gramShowPopup}
                  onClose={() => setGramShowPopup(false)}
                  title={`${yarnRowindex} Fabric Grammage Details`}
                  foreValue={foreValue}
                  colorValue={colorValue}
                  handlePopupPopulate={handle_Gram_PopupPopulate}
                  handlePopupSave={handle_Gram_PopupSave}
                  handlePopupClear={handle_Gram_PopupClear}
                >
                  <div className="row animate-zoom" style={{ height: "400px" }}>
                    <div className="table-responsive">
                      <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}>
                        <table className="table table-bordered table-sm align-middle mb-0 " id="GramTable">
                          <thead style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, position: "sticky" }}>
                            <tr>
                              {fabyarn_Gram_Headers
                                .filter((col) => col.visible)
                                .map((col) => (
                                  <th
                                    key={col.field}
                                    style={{
                                      width: col.widths,
                                      fontFamily: "Roboto",
                                      fontSize: "var(--bs-font-sm)",
                                      backgroundColor: `${colorValue}`,
                                      color: `${foreValue}`,
                                      disabled: true,
                                      padding: "0",
                                      margin: "0",
                                    }}
                                    className="p-2"
                                  >
                                    {col.label}
                                  </th>
                                ))}
                            </tr>
                          </thead>

                          <tbody>
                            {fabyarn_gram_Values.map((row, RowIndex) => (
                              <tr key={RowIndex}>
                                {fabyarn_Gram_Headers
                                  .filter((col) => col.visible)
                                  .map((col, colIndex) => {
                                    const value = row[col.field] || "";
                                    const scols = fabyarn_Gram_Headers.filter((c) => c.visible).length;
                                    const tabIndexValue = RowIndex * scols + colIndex + 1;
                                    const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights, alignItems: col.alignItems };

                                    if (col.type === "text") {
                                      return (
                                        <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                          <input
                                            type="text"
                                            className="w-100 form-control"
                                            value={value}
                                            disabled={col.disabled}
                                            onChange={(e) => handle_Gram_Change(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#GramTable");
                                            }}
                                          />
                                        </td>
                                      );
                                    }
                                    // SELECT
                                    if (col.type === "select") {
                                      let options = [];

                                      if (col.field === "StyleItem") {
                                        options = colorItems;
                                      } else if (col.field === "SizeName") {
                                        options = sizeItems;
                                      }

                                      return (
                                        <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                          <select
                                            className="w-100 form-select"
                                            disabled={col.disabled}
                                            value={row.asptblsizmasid}
                                            onChange={(e) => handle_Gram_Change(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#GramTable");
                                            }}
                                          >
                                            {options.map((item, i) => (
                                              <option key={i} value={item.asptblcolmasid || item.asptblsizmasid}>
                                                {item.colorname || item.sizename}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                      );
                                    }
                                    if (col.type === "button") {
                                      return (
                                        <td key={colIndex} style={commonStyle}>
                                          <button
                                            style={{ width: 0, margin: "0", padding: "0" }}
                                            disabled={col.disabled}
                                            onFocus={() => handle_Gra_AddRow(RowIndex)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#ComboTable");
                                            }}
                                          ></button>
                                        </td>
                                      );
                                    }
                                    return null;
                                  })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </PopupGram>

                <PopupYarn
                  show={yarnShowPopup}
                  onClose={() => setYarnShowPopup(false)}
                  title={`${yarnRowindex} Yarn Grammage Details`}
                  foreValue={foreValue}
                  colorValue={colorValue}
                  handlePopupPopulate={handle_Yarn_PopupPopulate}
                  handlePopupSave={handle_Yarn_PopupSave}
                  handlePopupClear={handle_Yarn_PopupClear}
                >
                  <div className="row animate-zoom" style={{ height: "300px" }}>
                    <div className="table-responsive">
                      <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}>
                        <table className="table table-bordered table-sm align-middle mb-0 " id="YarnTable">
                          <thead style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, position: "sticky" }}>
                            <tr>
                              {fabyarn_Yarn_Headers
                                .filter((col) => col.visible)
                                .map((col) => (
                                  <th
                                    key={col.field}
                                    style={{
                                      width: col.widths,
                                      fontFamily: "Roboto",
                                      fontSize: "var(--bs-font-sm)",
                                      backgroundColor: `${colorValue}`,
                                      color: `${foreValue}`,
                                      disabled: true,
                                      padding: "0",
                                      margin: "0",
                                    }}
                                    className="p-2"
                                  >
                                    {col.label}
                                  </th>
                                ))}
                            </tr>
                          </thead>

                          <tbody>
                            {fabyarn_yarn_Values.map((row, RowIndex) => (
                              <tr key={RowIndex}>
                                {fabyarn_Yarn_Headers
                                  .filter((col) => col.visible)
                                  .map((col, colIndex) => {
                                    const value = row[col.field] || "";
                                    const scols = fabyarn_Yarn_Headers.filter((c) => c.visible).length;
                                    const tabIndexValue = RowIndex * scols + colIndex + 1;
                                    const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights ?? 0, alignItems: col.alignItems };

                                    if (col.type === "text") {
                                      return (
                                        <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                          <input
                                            type="text"
                                            className="w-100 form-control"
                                            value={value}
                                            disabled={col.disabled}
                                            onChange={(e) => handle_Yarn_Change(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#YarnTable");
                                            }}
                                          />
                                        </td>
                                      );
                                    }
                                    // SELECT
                                    if (col.type === "select") {
                                      let options = [];

                                      if (col.field === "StyleItem") {
                                        options = styleItems;
                                      } else if (col.field === "SizeName") {
                                        options = sizeItems;
                                      }

                                      return (
                                        <td key={colIndex} className="p-0" style={commonStyle}>
                                          <select
                                            className="w-100 form-select"
                                            disabled={col.disabled}
                                            value={row.asptblsizmasid}
                                            onChange={(e) => handle_Yarn_Change(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#YarnTable");
                                            }}
                                          >
                                            {options.map((item, i) => (
                                              <option key={i} value={item.asptblstyleitemmasid || item.asptblsizmasid}>
                                                {item.styleitem || item.sizename}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                      );
                                    }
                                    if (col.type === "img" && col.field === "yarnprodet") {
                                      return (
                                        <td key={colIndex} style={commonStyle} className="p-0 m-0">
                                          <img
                                            src={imagebutton}
                                            alt="edit"
                                            tabIndex={0}
                                            className="p-0 m-0"
                                            style={commonStyle}
                                            onClick={() => handle_Yarn_Change(row, RowIndex)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#YarnTable");
                                            }}
                                          ></img>
                                        </td>
                                      );
                                    }

                                    if (col.type === "button") {
                                      return (
                                        <td key={colIndex} style={commonStyle}>
                                          <button
                                            style={{ width: 0, margin: "0", padding: "0" }}
                                            disabled={col.disabled}
                                            onFocus={() => handle_Yar_AddRow(RowIndex)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#YarnTable");
                                            }}
                                          ></button>
                                        </td>
                                      );
                                    }
                                    return null;
                                  })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </PopupYarn>

                <PopupProcess
                  show={processShowPopup}
                  onClose={() => setProcessShowPopup(false)}
                  title={`${yarnRowindex} Process  Details`}
                  foreValue={foreValue}
                  colorValue={colorValue}
                  handlePopupPopulate={handle_Process_PopupPopulate}
                  handlePopupSave={handle_Process_PopupSave}
                  handlePopupClear={handle_Process_PopupClear}
                >
                  <div className="row animate-zoom" style={{ height: "300px" }}>
                    <div className="table-responsive">
                      <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}>
                        <table className="table table-bordered table-sm align-middle mb-0 " id="ProcessTable">
                          <thead style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, position: "sticky" }}>
                            <tr>
                              {fabyarn_Process_Headers
                                .filter((col) => col.visible)
                                .map((col) => (
                                  <th
                                    key={col.field}
                                    style={{
                                      width: col.widths,
                                      fontFamily: "Roboto",
                                      fontSize: "var(--bs-font-sm)",
                                      backgroundColor: `${colorValue}`,
                                      color: `${foreValue}`,
                                      disabled: true,
                                      padding: "0",
                                      margin: "0",
                                    }}
                                    className="p-2"
                                  >
                                    {col.label}
                                  </th>
                                ))}
                            </tr>
                          </thead>

                          <tbody>
                            {fabyarn_yarn_Values.map((row, RowIndex) => (
                              <tr key={RowIndex}>
                                {fabyarn_Process_Headers
                                  .filter((col) => col.visible)
                                  .map((col, colIndex) => {
                                    const value = row[col.field] || "";
                                    const scols = fabyarn_Process_Headers.filter((c) => c.visible).length;
                                    const tabIndexValue = RowIndex * scols + colIndex + 1;
                                    const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights, alignItems: col.alignItems };
                                    if (col.type === "text") {
                                      return (
                                        <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                          <input
                                            type="text"
                                            className="w-100 form-control"
                                            value={value}
                                            disabled={col.disabled}
                                            onChange={(e) => handle_Process_Change(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#ProcessTable");
                                            }}
                                          />
                                        </td>
                                      );
                                    }
                                    // SELECT
                                    if (col.type === "select") {
                                      let options = [];

                                      if (col.field === "StyleItem") {
                                        options = styleItems;
                                      } else if (col.field === "SizeName") {
                                        options = sizeItems;
                                      }

                                      return (
                                        <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                          <select
                                            className="w-100 form-select"
                                            disabled={col.disabled}
                                            value={row.asptblsizmasid}
                                            onChange={(e) => handle_Process_Change(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#ProcessTable");
                                            }}
                                          >
                                            {options.map((item, i) => (
                                              <option key={i} value={item.asptblstyleitemmasid || item.asptblsizmasid}>
                                                {item.styleitem || item.sizename}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                      );
                                    }

                                    if (col.type === "button") {
                                      return (
                                        <td key={colIndex} style={commonStyle}>
                                          <button
                                            style={{ width: 0, margin: "0", padding: "0" }}
                                            disabled={col.disabled}
                                            onFocus={() => handle_Pro_AddRow(RowIndex)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#ProcessTable");
                                            }}
                                          ></button>
                                        </td>
                                      );
                                    }
                                    return null;
                                  })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </PopupProcess>
              </div>
            </div>
            <div className={newButton === 2 ? "content active-content" : "content"}>
              <div className="row">
                <Search
                  colorValue={colorValue}
                  searchs={fabyarn_Search}
                  setsearchs={setfabyarnSearch}
                  SearchLable1={searchLable1}
                  SearchLable2={searchLable2}
                  SearchLable3={searchLable3}
                  stylecolor={foreValue}
                  handleChange={handleChange}
                  ChangeValues={fabyarn_Values}
                  searchCompCode={searchCompCode}
                  searchUserName={searchUserName}
                />
                {!fetchError && newButton === 2 ? (
                  <>
                    <DataTable
                      heights={heights}
                      colorValue={colorValue}
                      headers={FabYarnProcessColumn}
                      comments={fabyarnItem}
                      setComments={setfabYarnItem}
                      searches={fabyarn_Search}
                      setSearches={setfabyarnSearch}
                      foreValue={foreValue}
                      totalItems={totalItems}
                      setTotalItems={setTotalItems}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      sorting={sorting}
                      setSorting={setSorting}
                      ITEM_PER_PAGE={ITEM_PER_PAGE}
                      EditData={FabYarnProcessCheck}
                      commentsData={commentsData}
                    />
                  </>
                ) : (
                  <p style={{ marginTop: "1rem", color: "var(--bs-danger)" }}>{fetchError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FabricYarnProcess;
