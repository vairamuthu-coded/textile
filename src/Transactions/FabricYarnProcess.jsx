import { useContext, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import DataContext from "../context/CreateUserContext.js";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import "../ContextMenu.css";
import ActionButtton from "../ActionButtton";
import PopupCombo_Populate from "../Popup.jsx";
import PopupCombo from "../Popup.jsx";
import PopupGram from "../Popup.jsx";
import PopupGram_Populate from "../Popup.jsx";
import PopupYarn from "../Popup.jsx";
import PopupYarnDyeing from "../Popup.jsx";
import PopupYarnDyeingColor from "../Popup.jsx";
import PopupProcess from "../Popup.jsx";
import imagebutton from "../Images/win.png";
import defaultimage from "../Images/win.png";
import ImageUploader from "../Custom/ImageUploader.jsx";
import Search from "../Custom/Search.js";
import DataTable from "../Custom/DataTable.js";
import TabNav from "../component/TabNav.js";
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
    fabyarn_yarn_dyeingValues,
    setFabyarn_yarn_dyeingValues,
    fabyarn_yarn_dyeingColorValues,
    setFabyarn_yarn_dyeingColorValues,
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
  const sizeGroupParam = `${API_URL}/SizeGroupMasters/1`;
  const SizeParam = `${API_URL}/SizeMasters`;
  const FinYearParam = `${API_URL}/FinYearMasters`;
  const StyleGroupParam = `${API_URL}/StyleGroupMasters`;
  const ColorParam = `${API_URL}/ColorMaster/GetColor`;
  const ComboParam = `${API_URL}/ColorMaster/GetCombo`;
  const GetActiveColorParam = `${API_URL}/ColorMaster`;
  const BuyerParam = `${API_URL}/BuyerMasters`;
  const AgentMastersParam = `${API_URL}/AgentMasters`;
  const BuyerUAgentParam = `${API_URL}/BuyerAgentMasters`;
  const UomMastersParam = `${API_URL}/UomMasters`;
  const YarnBlendMastersParam = `${API_URL}/YarnBlendMasters`;
  const OrderPackTypeMastersParam = `${API_URL}/OrderPackTypeMasters`;
  const PayTermsParam = `${API_URL}/PayTermMasters`;
  const CurrencyMastersParam = `${API_URL}/CurrencyMasters`;
  const StyleCategoryParams = `${API_URL}/StyleCategoryMasters`;
  const StyleItemMastersParams = `${API_URL}/StyleItemMasters`;
  const GetYarnMasterParam = `${API_URL}/YarnMasters`;
  const GetYarnDyeingProcess = `${API_URL}/ProcessGroupSequenceMasters/GetProcess`;

  const compcodeparam = `${API_URL}${ENDPOINTS.COMPANY}`;
  const [popupType, setPopupType] = useState("");
  const [comboShowPopup, setComboShowPopup] = useState(false);
  const [comboShow_SubGrid, setComboShow_SubGrid] = useState(false);
  const [gramShow_SubGrid, setGramShow_SubGrid] = useState(false);
  const [gramShowPopup, setGramShowPopup] = useState(false);
  const [yarnShowPopup, setYarnShowPopup] = useState(false);
  const [yarnDyeingShowPopup, setYarnDyeingShowPopup] = useState(false);
  const [yarnDyeingColShowPopup, setYarnDyeingColShowPopup] = useState(false);
  const [processShowPopup, setProcessShowPopup] = useState(false);
  const [userRights1, setUserRights1] = useState([]);
  const [sizeGroupItems, setSizeGroupItems] = useState([]);
  const [finYearItems, setFinYearItems] = useState([]);
  const [sizeItems, setSizeItems] = useState([]);
  const [colorItems, setColorItems] = useState([]);
  const [comboItems, setComboItems] = useState([]);
  const [styleGroupItems, setStyleGroupItems] = useState([]);
  const [buyerItems, setBuyerItems] = useState([]);
  const [buyerAgent, setBuyerAgent] = useState([]);
  const [UomItems, setUomItems] = useState([]);
  const [yarnBlendItems, setYarnBlendItems] = useState([]);
  const [yarnItems, setYarnItems] = useState([]);
  const [colors, setcolors] = useState([]);
  const [processValues, setProcessValues] = useState([]);
  const [orderPackTypeItems, setOrderPackTypeItems] = useState([]);
  const [payTermItems, setPayTermItems] = useState([]);
  const [currencyItems, setCurrencyItems] = useState([]);
  const [styleCategoryItems, setStyleCategoryItems] = useState([]);
  const [styleGroupitem, setStyleGrioupItems] = useState([]);
  const [styleItems, setStyleItems] = useState([]);
  const [resizingColumn, setResizingColumn] = useState(null);
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
  //Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU" -Name * -ErrorAction SilentlyContinue

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          userRes,
          sizeGroupRes,
          sizeRes,
          styleGroupRes,
          colorRes,
          comboRes,
          buyerRes,
          agentRes,
          uomRes,
          yarBleRes,
          colres,
          orderPackTypeRes,
          payTermRes,
          currencyRes,
          styleCategoryRes,
          styleitemRes,
          finYearRes,
          fabYarn_Res,
          fabyarn_Com_Res,
          yarRes,
          processRes,
        ] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(sizeGroupParam),
          axios.get(SizeParam),
          axios.get(StyleGroupParam),
          axios.get(ColorParam),
          axios.get(ComboParam),
          axios.get(BuyerParam),
          axios.get(AgentMastersParam),
          axios.get(UomMastersParam),
          axios.get(YarnBlendMastersParam),
          axios.get(GetActiveColorParam),
          axios.get(OrderPackTypeMastersParam),
          axios.get(PayTermsParam),
          axios.get(CurrencyMastersParam),
          axios.get(StyleCategoryParams),
          axios.get(StyleItemMastersParams),
          axios.get(FinYearParam),
          axios.get(insert_update),
          axios.get(`${compcodeparam}`),
          axios.get(GetYarnMasterParam),
          axios.get(GetYarnDyeingProcess),
        ]);

        setUserRights1(userRes.data);
        setSizeGroupItems(sizeGroupRes.data || []);
        setSizeItems(sizeRes.data || []);
        setStyleGroupItems(styleGroupRes.data || []);
        setColorItems(colorRes.data || []);
        setComboItems(comboRes.data || []);
        setBuyerItems(buyerRes.data || []);
        setBuyerAgent(agentRes.data || []);
        setUomItems(uomRes.data || []);
        setYarnBlendItems(yarBleRes.data || []);
        setcolors(colres.data || []);
        setOrderPackTypeItems(orderPackTypeRes.data || []);
        setPayTermItems(payTermRes.data || []);
        setCurrencyItems(currencyRes.data || []);
        setStyleCategoryItems(styleCategoryRes.data || []);
        setStyleGrioupItems(styleitemRes.data);
        setStyleItems(styleitemRes.data);
        setFinYearItems(finYearRes.data || []);
        setfabYarnItem(fabYarn_Res.data || []);
        setCompCodeData(fabyarn_Com_Res.data || []);
        setYarnItems(yarRes.data || []);
        setProcessValues(processRes.data || []);
      } catch (error) {
        setFetchError(error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [defaultDetails?.Compcode, defaultDetails?.User, title]);

  const today = new Date().toISOString().slice(0, 10);

  const [ordimages, setordImage] = useState({
    imageFile: null,
    imagesrc: defaultimage,
    filetype: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const finalValue = type === "checkbox" ? (checked === true ? "T" : "F") : type === "number" ? Number(value) : value;

    if (name === "OrderType") {
      setFabYarn_Values((prev) => ({
        ...prev,
        PlanDate: today,
      }));
    }

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
        //FabYarPro: ListData4(fabyarn_pro_Values),
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
  // setNewButton(1);
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
    updated[index]["RowIndex"] = index;
    updated[index][field] = value;
    setFabYarn_DetValues(updated);
  };

  const initialFabYarnDetailsHeaders = [
    { field: "SNo", label: "S.No", visible: true, type: "text", widths: "30px", disabled: true, pattern: "" },
    { field: "RowIndex", label: "RowIndex", visible: true, type: "text", widths: "30px", disabled: true, pattern: "" },
    { field: "AsptblFabYarDetId", label: "ID", visible: false, type: "text", widths: "50px", disabled: false, pattern: "" },
    { field: "AsptblFabYarId", label: "asptblFabYarId", visible: false, type: "text", widths: "50px", disabled: true, pattern: "" },

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
    { field: "Notes", label: "notes", visible: true, type: "text", widths: "150px", disabled: false, pattern: "" },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const [fabyarn_Details_Headers, setFabYarn_Details_Headers] = useState(initialFabYarnDetailsHeaders);

  const createFabyarnComboHeaders = (showAllCheckbox) => [
    { field: "All", label: "All", visible: showAllCheckbox, type: "checkbox", widths: "20px", pattern: "", disabled: true },
    { field: "SNo", label: "SNo", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "RowIndex", label: "rowIndex", type: "text", visible: true, widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarComId", label: "ID", type: "text", visible: false, widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarDetId", label: "FabYarDetId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarId", label: "FabYarId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "Combo", label: "Combo Color", visible: true, type: "select", widths: "250px", pattern: "", disabled: showAllCheckbox },
    { field: "Notes", label: "notes", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const fabyarn_Combo_Populate_Headers = createFabyarnComboHeaders(true);
  const fabyarn_Combo_Headers = createFabyarnComboHeaders(false);
  const visibleComboHeaders = fabyarn_Combo_Populate_Headers.filter((col) => col.visible);

  const createFabyarnGramHeaders = (v1 = false, v2 = true) => [
    { field: "All", label: "All", visible: v1, type: "checkbox", widths: "20px", pattern: "", disabled: true },
    { field: "SNo", label: "SNo", visible: true, type: "text", widths: "20px", disabled: v2 },
    { field: "RowIndex", label: "RowIndex", visible: true, type: "text", widths: "10px", disabled: v2 },
    { field: "AsptblFabYarGraId", label: "GraId", visible: false, type: "text", widths: "50px", disabled: v2 },
    { field: "AsptblFabYarDetId", label: "DetId", visible: false, type: "text", widths: "50px", pattern: "", disabled: v2 },
    { field: "AsptblFabYarId", label: "Id", visible: false, type: "text", widths: "50px", pattern: "", disabled: v2 },
    { field: "Combo", label: "Combo Color", visible: true, type: "select", widths: "250px", disabled: v2 },
    { field: "GarColor", label: "Gar Color", visible: true, type: "select", widths: "250px", disabled: v1 },
    { field: "BaseColor", label: "Base Color", visible: true, type: "select", widths: "250px", disabled: v1 },
    { field: "PorColor", label: "Portion Color", visible: true, type: "select", widths: "250px", disabled: v1 },
    { field: "SizeName", label: "Size", visible: true, type: "select", widths: "80px", disabled: v2 },
    { field: "ShipQty", label: "ShipQty", visible: true, type: "text", widths: "50px", disabled: v2 },
    { field: "ProdQty", label: "ProdQty", visible: true, type: "text", widths: "50px", disabled: v2 },
    { field: "SizeQty", label: "SizeQty", visible: true, type: "text", widths: "50px", disabled: v1 },
    { field: "CadWt", label: "CadWeight", visible: true, type: "text", widths: "80px", disabled: v1 },
    { field: "KDia", label: "KDia", visible: true, type: "select", widths: "80px", disabled: v1 },
    { field: "FDia", label: "FDia", visible: true, type: "select", widths: "80px", disabled: v1 },
    { field: "TotFabQty", label: "TotFabQty", visible: true, type: "text", widths: "100px", disabled: v2 },
    { field: "Notes", label: "Notes", visible: true, type: "text", widths: "30px", disabled: v1 },
  ];

  const fabyarn_Gram_Populate_Headers = createFabyarnGramHeaders(true, true);

  const fabyarn_Gram_Headers = createFabyarnGramHeaders(false, true);

  const visibleGramHeaders = fabyarn_Gram_Populate_Headers.filter((col) => col.visible);

  const createFabyarnYarnHeaders = (showAllCheckbox = false) => [
    { field: "All", label: "All", visible: showAllCheckbox, type: "checkbox", widths: "50px", pattern: "", disabled: false },
    { field: "SNo", label: "SNo", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "RowIndex", label: "Index", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarYarId", label: "AsptblFabYarYarId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarDetId", label: "AsptblFabYarDetId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarId", label: "AsptblFabYarId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "Yarn", label: "Yarn Name", visible: true, type: "select", widths: "450px", pattern: "", disabled: false },
    { field: "ColorName", label: "Yarn Color", visible: true, type: "select", widths: "150px", pattern: "", disabled: false },
    { field: "Uom", label: "Uom", visible: true, type: "select", widths: "80px", pattern: "", disabled: false },
    { field: "Per", label: "Per", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "YarnQty", label: "YarnQty", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "ProYesNo", label: "YarnPro", visible: true, type: "select", widths: "70px", pattern: "", disabled: false },
    { field: "YarnProDet", label: "Det", visible: true, type: "img", widths: "20px", heights: "20px", pattern: "", disabled: false },
    { field: "Notes", label: "Notes", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const create_Yarn_Dyeing_Headers = (shows = false) => [
    { field: "SNo", label: "SNo", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "RowIndex", label: "rowIndex", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarYarDyeId", label: "DyeId", visible: shows, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarYarId", label: "AsptblFabYarYarId", visible: shows, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarDetId", label: "asptblFabYarDetId", visible: shows, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarId", label: "asptblFabYarId", visible: shows, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "ProcessName", label: "Process Name", visible: true, type: "select", widths: "150px", pattern: "", disabled: false },
    { field: "YarDyeYesNo", label: "YarDyeYesNo", visible: true, type: "select", widths: "70px", pattern: "", disabled: false },
    { field: "YarDyeDet", label: "YarDyeDet", visible: true, type: "img", widths: "20px", heights: "20px", pattern: "", disabled: false },
    { field: "Loss", label: "Loss %", visible: true, type: "text", widths: "70px", pattern: "", disabled: false },
    { field: "Notes", label: "Notes", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const create_Yarn_Dyeing_ColorHeaders = (shows = false) => [
    { field: "SNo", label: "SNo", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "RowIndex", label: "rowIndex", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarYarDyeColId", label: "DyeId", visible: shows, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarYarDyeId", label: "DyeId", visible: shows, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarYarId", label: "AsptblFabYarYarId", visible: shows, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarDetId", label: "asptblFabYarDetId", visible: shows, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "AsptblFabYarId", label: "asptblFabYarId", visible: shows, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "PortionColor", label: "Protion Color", visible: true, type: "select", widths: "150px", pattern: "", disabled: false },
    { field: "YarnProColor", label: "Yar Pro Color", visible: true, type: "select", widths: "150px", pattern: "", disabled: false },
    { field: "YarPer", label: "YarPer", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "Notes", label: "Notes", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const fabyarn_Yarn_Dyeing_Headers = create_Yarn_Dyeing_Headers(false);
  const fabyarn_Yarn_Populate_Headers = createFabyarnYarnHeaders(true);
  const fabyarn_Yarn_Headers = createFabyarnYarnHeaders(false);
  const fabyarn_Yarn_DyingColorHeaders = create_Yarn_Dyeing_ColorHeaders(false);
  const visibleYarnHeaders = fabyarn_Yarn_Populate_Headers.filter((col) => col.visible);

  const fabyarn_Process_Headers = [
    { field: "All", label: "All", visible: true, type: "checkbox", widths: "50px", pattern: "", disabled: true },
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

  const handle_Process_Change = (e, RowIndex, field) => {
    const value = e.target.value;
    const updated = [...fabyarn_pro_Values];
    updated[RowIndex][field] = value;
    setFabYarn_Pro_Values(updated);
  };

  const [showModal, setShowModal] = useState(false);

  const Details_NewRow = {
    SNo: 0,
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

  const handleAddRow = (rowIndex, currentIndex, data, newRowTemplate, setGrid) => {
    const updated = [...data];
    const groupRows = updated.filter((row) => Number(row.RowIndex) === Number(rowIndex));
    const lastSNo = Math.max(...groupRows.map((row) => Number(row.SNo) || 0), 0);
    const currentRow = updated[currentIndex];
    const isLastRowOfGroup = currentRow && Number(currentRow.RowIndex) === Number(rowIndex) && Number(currentRow.SNo) === lastSNo;
    if (!isLastRowOfGroup) {
      return;
    }
    const newRow = {
      ...newRowTemplate,
      SNo: lastSNo + 1,
      RowIndex: Number(rowIndex),
    };
    updated.splice(currentIndex + 1, 0, newRow);
    setGrid(updated);
  };

  const PopUpDy_Details_NewRow = {
    SNo: 0,
    RowIndex: 0,
    AsptblFabYarYarDyeId: "",
    AsptblFabYarYarId: "",
    AsptblFabYarDetId: "",
    AsptblFabYarId: "",
    ProcessName: "",
    YarDyeYesNo: "",
    YarDyeDet: "",
    Loss: "",
    Notes: "",
    Action: "",
  };

  const PopUpDy_Co_Details_NewRow = {
    SNo: 0,
    RowIndex: 0,
    AsptblFabYarYarDyeColId: "",
    AsptblFabYarYarDyeId: "",
    AsptblFabYarYarId: "",
    AsptblFabYarDetId: "",
    AsptblFabYarId: "",
    PortionColor: "",
    YarnProColor: "",
    Notes: "",
    Action: "",
  };

  const handle_Pro_AddRow = (index) => {
    const newRow = {
      SNo: 1,
      RowIndex: index,
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
  const [sequence, setSquence] = useState(0);
  const [popup_Details_DataCopy, setPopup_Details_DataCopy] = useState([""]);
  const [popup_Combo_DataCopy, setPopup_Combo_DataCopy] = useState([]);
  const [allPopup_Combo_DataCopy, setAllPopup_Combo_DataCopy] = useState([]);
  const [allPopup_Gram_DataCopy, setAllPopup_Gram_DataCopy] = useState([]);
  const [popup_Gram_DataCopy, setPopup_Gram_DataCopy] = useState([]);

  const [popup_Yarn_DataCopy, setPopup_Yarn_DataCopy] = useState([]);
  const [popup_Process_DataCopy, setPopup_Process_DataCopy] = useState([]);

  // const handle_Combo_Change = (e, RowIndex, SNos, field) => {
  //   const value = e.target.value;
  //   setFabYarn_Combo_Values((prev) =>
  //     prev.map((item, index) =>
  //       index === Number(RowIndex) || Number(item.SNo) === Number(SNos) || Number(item.Combo) === Number(value)
  //         ? {
  //             ...item,
  //             [field]: value,
  //           }
  //         : "",
  //     ),
  //   );
  // };

  const handle_Combo_Change = (e, RowIndex, SNos, field) => {
    const value = e.target.value;

    // Check duplicate Combo value
    const isDuplicate = fabyarn_combo_Values.some((item) => Number(item.RowIndex) !== Number(RowIndex) && Number(item.SNo) !== Number(SNos) && Number(item.Combo) === Number(value));

    if (isDuplicate) {
      toast.error("Combo already exists");
      return;
    }

    // Update selected row only
    setFabYarn_Combo_Values((prev) =>
      prev.map((item, index) =>
        index === Number(RowIndex) || Number(item.SNo) === Number(SNos)
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const Combo_newRow = {
    SNo: 0,
    RowIndex: 0,
    AsptblFabYarComId: 0,
    AsptblFabYarDetId: 0,
    AsptblFabYarId: 0,
    Combo: 0,
    Notes: "",
    All: false,
  };

  const handle_Combo_Details = (row, RowIndex) => {
    setComboShowPopup(true);
    const finid = Number(RowIndex);
    setSquence(finid);
    if (allPopup_Combo_DataCopy.length > 1) {
      const rowData = allPopup_Combo_DataCopy.filter((item) => Number(item.RowIndex) === finid && Number(item.Combo) > 0);
      if (rowData.length === 0) {
        setFabYarn_Combo_Values([]);
        setFabYarn_Combo_Values([Combo_newRow]);
      } else {
        setFabYarn_Combo_Values(rowData);
      }
    } else {
      const filteredData = allPopup_Combo_DataCopy.filter((item) => Number(item.RowIndex) === finid);
      if (filteredData.length === 0) {
        setFabYarn_Combo_Values([]);
        // const newRow = {
        //   SNo: 1,
        //   RowIndex: 0,
        //   AsptblFabYarComId: 0,
        //   AsptblFabYarDetId: 0,
        //   AsptblFabYarId: 0,
        //   Combo: 0,
        //   Notes: "",
        //   All: false,
        // };

        setFabYarn_Combo_Values([Combo_newRow]);
      } else {
        setFabYarn_Combo_Values(filteredData);
      }
    }
  };

  const handle_PopupCombo_Save = () => {
    const finid = Number(sequence);
    setAllPopup_Combo_DataCopy((prev) => {
      const otherRows = prev.filter((item) => Number(item.RowIndex) !== finid);
      const newRows = fabyarn_combo_Values.map((item, index) => ({
        SNo: index + 1,
        RowIndex: finid,
        AsptblFabYarComId: Number(item.AsptblFabYarComId) || 0,
        AsptblFabYarDetId: Number(item.AsptblFabYarDetId) || 0,
        AsptblFabYarId: Number(item.AsptblFabYarId) || 0,
        Combo: Number(item.Combo) || 0,
        Notes: item.Notes,
        All: false,
      }));
      return [...otherRows, ...newRows];
    });
    setComboShowPopup(false);
  };

  const handle_PopupCombo_Clear = () => {
    setComboShowPopup(false);
  };

  const handle_PopupCombo_SubGrid_Save = () => {
    const filteredData = allPopup_Combo_DataCopy.filter((item) => item.RowIndex === sequence);
    if (filteredData.length >= 1) {
      setFabYarn_Combo_Values(filteredData);
    }
    setComboShow_SubGrid(false);
  };

  const handleAll_Combo_Checkbox = (e, rowIndex, colIndex) => {
    const checked = e.target.checked;

    const currentRows = popup_Combo_DataCopy.filter((row) => Number(row.RowIndex) === Number(rowIndex));

    if (checked) {
      // Select all combo items for this RowIndex
      setAllPopup_Combo_DataCopy((prev) => {
        const newRows = currentRows.filter((currentRow) => !prev.some((selected) => Number(selected.RowIndex) === Number(currentRow.RowIndex)));
        //&& Number(selected.SNo) === Number(currentRow.SNo)
        return [...prev, ...newRows];
      });
    } else {
      // Remove only this RowIndex's combo items
      setAllPopup_Combo_DataCopy((prev) => prev.filter((selected) => Number(selected.RowIndex) !== Number(rowIndex)));
    }

    // Update All checkbox state only for this RowIndex
    setPopup_Combo_DataCopy((prev) => prev.map((row) => (Number(row.RowIndex) === Number(rowIndex) ? { ...row, All: checked } : row)));
  };

  const handleChild_Combo_Checkbox = (e, rowIndex, sno) => {
    const checked = e.target.checked;

    const selectedItem = popup_Combo_DataCopy.find((item) => Number(item.RowIndex) === Number(rowIndex) && Number(item.SNo) === Number(sno));

    if (!selectedItem) return;

    if (checked) {
      setAllPopup_Combo_DataCopy((prev) => {
        const exists = prev.some((item) => Number(item.RowIndex) === Number(rowIndex) && Number(item.SNo) === Number(sno));

        if (exists) return prev;

        return [...prev, selectedItem];
      });
    } else {
      setAllPopup_Combo_DataCopy((prev) => prev.filter((item) => !(Number(item.RowIndex) === Number(rowIndex) && Number(item.SNo) === Number(sno))));
    }
  };

  const handle_PopupCombo_SubGrid_Populate = () => {};

  const handle_PopupCombo = () => {
    const currentRowIndex = Number(sequence);
    const existingRows = allPopup_Combo_DataCopy.filter((item) => Number(item.RowIndex) === currentRowIndex);

    if (existingRows.length === 0) {
      const newRows = comboItems.map((com, comboIndex) => ({
        SNo: comboIndex + 1,
        RowIndex: currentRowIndex,
        AsptblFabYarComId: 0,
        AsptblFabYarDetId: 0,
        AsptblFabYarId: 0,
        Combo: Number(com.asptblcolmasid),
        Notes: "",
        All: false,
      }));

      setPopup_Combo_DataCopy(newRows);
    } else {
    }
    setComboShow_SubGrid(true);
  };

  const handle_PopupCombo_SubGrid_Clear = () => {
    setComboShow_SubGrid(false);
  };

  const handleAll_Gram_Checkbox = (e, rowIndex, colIndex) => {
    const checked = e.target.checked;

    const currentRows = popup_Gram_DataCopy.filter((row) => Number(row.RowIndex) === Number(rowIndex));

    if (checked) {
      // Select all combo items for this RowIndex
      setAllPopup_Gram_DataCopy((prev) => {
        const newRows = currentRows.filter((currentRow) => !prev.some((selected) => Number(selected.RowIndex) === Number(currentRow.RowIndex)));
        //&& Number(selected.SNo) === Number(currentRow.SNo)
        return [...prev, ...newRows];
      });
    } else {
      // Remove only this RowIndex's combo items
      setAllPopup_Gram_DataCopy((prev) => prev.filter((selected) => Number(selected.RowIndex) !== Number(rowIndex)));
    }

    // Update All checkbox state only for this RowIndex
    setAllPopup_Gram_DataCopy((prev) => prev.map((row) => (Number(row.RowIndex) === Number(rowIndex) ? { ...row, All: checked } : row)));
  };

  const handleChild_Gram_Checkbox = (e, rowIndex, sno) => {
    const checked = e.target.checked;

    const selectedItem = popup_Gram_DataCopy.find((item) => Number(item.RowIndex) === Number(rowIndex) && Number(item.SNo) === Number(sno));

    if (!selectedItem) return;

    if (checked) {
      setAllPopup_Gram_DataCopy((prev) => {
        const exists = prev.some((item) => Number(item.RowIndex) === Number(rowIndex) && Number(item.SNo) === Number(sno));

        if (exists) return prev;

        return [...prev, selectedItem];
      });
    } else {
      setAllPopup_Gram_DataCopy((prev) => prev.filter((item) => !(Number(item.RowIndex) === Number(rowIndex) && Number(item.SNo) === Number(sno))));
    }
  };

  const handle_Gram_Details = (row, RowIndex) => {
    setGramShowPopup(true);
    const finid = Number(RowIndex);
    setSquence(finid);
    if (allPopup_Gram_DataCopy.length > 1) {
      const rowData = allPopup_Gram_DataCopy.filter((item) => Number(item.RowIndex) === finid);
      if (rowData.length === 0) {
        setFabYarn_Gram_Values([]);
        const newrow = createFabyarnGramRows(allPopup_Combo_DataCopy, finid, sizeGroupItems);
        setFabYarn_Gram_Values(newrow);
      } else {
        setFabYarn_Gram_Values(rowData);
      }
    } else {
      setFabYarn_Gram_Values([]);
      const newrow = createFabyarnGramRows(allPopup_Combo_DataCopy, finid, sizeGroupItems);
      setFabYarn_Gram_Values(newrow);
    }
  };

  const handle_PopupGram_Save = () => {
    const finid = Number(sequence);
    setAllPopup_Gram_DataCopy((prev) => {
      const otherRows = prev.filter((item) => Number(item.RowIndex) !== finid);
      const newRows = fabyarn_gram_Values.map((item, index) => ({
        SNo: item.SNo,
        RowIndex: item.RowIndex,
        AsptblFabYarGraId: Number(item.AsptblFabYarGraId) || 0,
        AsptblFabYarDetId: Number(item.AsptblFabYarDetId) || 0,
        AsptblFabYarId: Number(item.AsptblFabYarId) || 0,
        Combo: Number(item.Combo) || 0,
        GarColor: Number(item.GarColor) || 0,
        BaseColor: Number(item.BaseColor) || 0,
        PorColor: Number(item.PorColor) || 0,
        SizeName: Number(item.SizeName) || 0,
        ShipQty: Number(item.ShipQty) || 0,
        ProdQty: Number(item.ProdQty) || 0,
        SizeQty: Number(item.SizeQty) || 0,
        CadWt: Number(item.CadWt) || 0,
        KDia: item.KDia,
        FDia: item.FDia,
        TotFabQty: item.TotFabQty,
        Notes: item.Notes,
      }));
      return [...otherRows, ...newRows];
    });

    setGramShowPopup(false);
  };

  const handle_PopupGram_SubGrid_Populate = () => {};

  const handle_PopupGram_SubGrid_Save = () => {
    const filteredData = allPopup_Gram_DataCopy.filter((item) => item.RowIndex === sequence);
    if (filteredData.length >= 1) {
      setFabYarn_Gram_Values(filteredData);
    }
    setGramShow_SubGrid(false);
  };

  const createFabyarnGramRows = (comboData, currentRowIndex, sizeGroupItems) => {
    const newrow = comboData
      .filter((item) => Number(item.RowIndex) === Number(currentRowIndex))
      .flatMap((com, comboIndex) =>
        sizeGroupItems.map((siz, sizeIndex) => ({
          SNo: comboIndex * sizeGroupItems.length + sizeIndex + 1,
          RowIndex: Number(currentRowIndex),
          AsptblFabYarGraId: 0,
          AsptblFabYarDetId: 0,
          AsptblFabYarId: 0,
          Combo: Number(com.Combo),
          GarColor: com.Combo,
          BaseColor: 33,
          PorColor: 0,
          SizeName: siz.asptblsizmasid,
          ShipQty: 0,
          ProdQty: 0,
          SizeQty: 0,
          CadWt: 0,
          KDia: "",
          FDia: "",
          TotFabQty: "",
          Notes: "",
        })),
      );

    return newrow;
  };

  const handle_PopupGram = () => {
    const currentRowIndex = Number(sequence);
    const existingRows = allPopup_Gram_DataCopy.filter((item) => Number(item.RowIndex) === currentRowIndex);

    if (existingRows.length === 0) {
      const newrow = createFabyarnGramRows(allPopup_Combo_DataCopy, currentRowIndex, sizeGroupItems);
      setPopup_Gram_DataCopy(newrow);
    } else {
      setPopup_Gram_DataCopy(existingRows);
    }
    setGramShow_SubGrid(true);
  };
  const handle_PopupGram_Clear = () => {
    setFabYarn_Gram_Values([]);
  };
  const handle_PopupGram_SubGrid_Clear = () => {
    const currentRowIndex = Number(sequence);
    setPopup_Gram_DataCopy([]);
    const newrow = createFabyarnGramRows(allPopup_Combo_DataCopy, currentRowIndex, sizeGroupItems);
    setPopup_Gram_DataCopy(newrow);
  };

  const handle_PopupYarn_Details = (row, RowIndex) => {
    setSquence(RowIndex);
    if (row.ProYesNo === "YES") {
      setYarnDyeingShowPopup(true);
    }
  };

  const handle_PopupYarnDyeing_Details = (row, RowIndex) => {
    setSquence(RowIndex);
    setYarnDyeingColShowPopup(true);
  };

  const handle_Process_Details = (row, RowIndex) => {
    setProcessShowPopup(true);
  };

  //--------------- START YARN PROCESSING-----------------------------------------------------------------------------------

  const handle_Yarn_Change = (e, RowIndex, SNos, field) => {
    const { name, value, checked, type } = e.target;
    const isDuplicate = fabyarn_yarn_Values.some((item) => Number(item.RowIndex) !== Number(RowIndex) && Number(item.SNo) !== Number(SNos) && Number(item.Yarn) === Number(value));
    if (isDuplicate) {
      toast.error(field + " already exists");
      return;
    } else {
      const updated = [...fabyarn_yarn_Values];
      updated[RowIndex][field] = value;
      setFabYarn_Yarn_Values(updated);
    }
  };

  const handle_Yarn_Details = (row, RowIndex) => {
    setSquence(RowIndex);
    const finid = Number(RowIndex);
    setSquence(finid);
    if (popup_Yarn_DataCopy.length > 1) {
      setFabYarn_Yarn_Values([]);
      const rowData = popup_Yarn_DataCopy.filter((item, index) => Number(item.RowIndex) === finid);
      if (rowData.length === 0) {
        setFabYarn_Yarn_Values([Yarn_NewRow]);
      } else {
        setFabYarn_Yarn_Values(rowData);
      }
    } else {
      setFabYarn_Yarn_Values([Yarn_NewRow]);
    }
    setYarnShowPopup(true);
  };

  const Yarn_NewRow = {
    SNo: 0,
    RowIndex: sequence,
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
    Action: "",
    All: false,
  };

  const handle_Yarn_PopupPopulate = () => {
    setYarnShowPopup(true);
    setFabYarn_Yarn_Values([]);
    const finid = Number(sequence);
    if (fabyarn_yarn_Values.length >= 1) {
      const filteredData = popup_Yarn_DataCopy.filter((item) => item.RowIndex === finid);
      if (filteredData.length >= 1) {
        setFabYarn_Yarn_Values(filteredData);
      }
    } else {
      toast.error("Invalid Row");
    }
  };

  const handle_Yarn_PopupSave = () => {
    const finid = Number(sequence);
    setPopup_Yarn_DataCopy((prev) => {
      const otherRows = prev.filter((item) => Number(item.RowIndex) !== finid);
      const newRows = fabyarn_yarn_Values.map((item1, index) => ({
        SNo: index + 1,
        RowIndex: finid,
        AsptblFabYarYarId: Number(item1.AsptblFabYarYarId) || 0,
        AsptblFabYarDetId: Number(item1.AsptblFabYarDetId) || 0,
        AsptblFabYarId: Number(item1.AsptblFabYarId) || 0,
        Yarn: Number(item1.Yarn) || 0,
        ColorName: Number(item1.ColorName) || 0,
        Uom: Number(item1.Uom) || 0,
        Per: Number(item1.Per) || 0,
        YarnQty: Number(item1.YarnQty) || 0,
        ProYesNo: item1.ProYesNo || "",
        YarnProDet: item1.YarnProDet || "",
        Notes: item1.Notes || "",
        Action: "",
        All: false,
      }));
      return [...otherRows, ...newRows];
    });

    setYarnShowPopup(false);
  };

  const handle_Yarn_PopupClear = () => {
    setYarnShowPopup(false);
  };

  //--------------- END YARN PROCESSING-----------------------------------------------------------------------------------

  const handle_Yarn_Dyeing_Change = (e, RowIndex, SNos, field) => {
    const { name, value } = e.target;
    const isDuplicate = fabyarn_yarn_dyeingValues.some((item) => Number(item.RowIndex) !== Number(RowIndex) && Number(item.SNo) !== Number(SNos) && Number(item.ProcessName) === Number(value));

    if (isDuplicate) {
      toast.error("Combo already exists");
      return;
    } else {
      setFabyarn_yarn_dyeingValues((prev) =>
        prev.map((item, index) =>
          index === Number(RowIndex)
            ? {
                ...item,
                [field]: value,
              }
            : item,
        ),
      );
    }
  };

  const handle_Yarn_PopupYarnDyeing = () => {
    const finid = Number(sequence);
    setYarnDyeingColShowPopup(true);
  };
  const handle_Yarn_PopupYarnDyeing_Save = () => {
    const finid = Number(sequence);
  };
  const handle_Yarn_PopupYarnDyeing_Clear = () => {
    setYarnDyeingShowPopup(false);
  };

  const handle_Yarn_PopupYarnDyeingColor = () => {};

  const handle_Yarn_PopupYarnDyeingColor_Save = () => {};
  const handle_Yarn_PopupYarnDyeingColor_Clear = () => {
    setYarnDyeingColShowPopup(false);
  };

  const handle_Yarn_Dyeing_Color_Change = (e, RowIndex, field) => {
    const { name, value } = e.target;
    setFabyarn_yarn_dyeingColorValues((prev) =>
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

  // const handle_Process_PopupPopulate = () => {
  //   setGramShowPopup(true);
  // };

  // const handle_Process_PopupSave = () => {};

  // const handle_Process_PopupClear = () => {
  //   setProcessShowPopup(false);
  //   setPopup_Process_DataCopy([]);
  // };

  const tabs = [
    { id: 1, label: title },
    { id: 2, label: subTitle },
    { id: 3, label: "test1" },
    { id: 4, label: "test2" },
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

  const handleAll_Yarn_Checkbox = (e) => {};
  const handleChild_Yarn_Checkbox = (e, RowIndex) => {};
  const handleAll_Process_Checkbox = (e) => {};
  const handleChild_Process_Checkbox = (e, RowIndex) => {};

  const handleResizeStart = (e, field, state1, state2) => {
    e.preventDefault();

    const column = state1.find((col) => col.field === field);

    if (!column) return;

    const startX = e.clientX;
    const startWidth = parseInt(column.widths, 10) || 50;

    const handleMouseMove = (moveEvent) => {
      const difference = moveEvent.clientX - startX;

      const newWidth = Math.max(30, startWidth + difference);

      state2((prev) =>
        prev.map((col) =>
          col.field === field
            ? {
                ...col,
                widths: `${newWidth}px`,
              }
            : col,
        ),
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);

      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);

    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="container-fluid">
      {userRights1.length >= 1 && (
        <div className="row" style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>
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
            <div className="content-tabs">
              <div className={newButton === 1 ? "content active-content" : "content"}>
                <div className="row">{newButton}</div>
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
                          <input type="date" className=" col-8 form-control" name="PlanDate" value={fabyarn_Values.PlanDate} onChange={handleChange} ref={(el) => (inputRefs.current[3] = el)} onKeyDown={(e) => handleKeyDown(e, 3)} />
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
                            <option value={"ORDER"}>ORDER</option>
                            <option value={"PRE PLAN"}>PRE PLAN</option>
                            <option value={"FABRIC ORDER"}>FABRIC ORDER</option>
                            <option value={"SAMPLE"}>SAMPLE</option>
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
                            <option value={"SHORTAGE"}>SHORTAGE</option>
                            <option value={"ADDTIONAL"}>ADDTIONAL</option>
                            <option value={"PLANNING"}>PLANNING</option>
                          </CustomSelect>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-3">
                        <div className="row align-items-center">
                          <label className="col-4 col-form-label">OrderNo</label>
                          <CustomSelect
                            visible="block"
                            className="col-8 form-select"
                            name="OrderNo"
                            value={fabyarn_Values.OrderNo || ""}
                            onChange={handleChange}
                            colorValue={colorValue}
                            tabIndex={6}
                            ref={(el) => (refs.current[6] = el)}
                            onKeyDown={(e) => handleEnter(e, 6)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                          >
                            <option value={"AGF/26-27/ORD1"}>AGF/26-27/ORD1</option>
                            <option value={"AGF/26-27/ORD2"}>AGF/26-27/ORD2</option>
                          </CustomSelect>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-xl-3" style={{ display: fabyarn_Values.TransType === "PLANNING" ? "none" : "block" }}>
                        <div className="row align-items-center">
                          <label className="col-4 col-form-label">RequestNo</label>

                          <CustomSelect
                            visible={"block"}
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
                            <div className="table-responsive" style={{ overflowX: "auto", width: "100%", height: "330px" }}>
                              <table
                                className="table table-bordered table-sm align-middle mb-0"
                                id="fabDetTab"
                                style={{
                                  tableLayout: "fixed",
                                  width: "max-content",
                                }}
                              >
                                <colgroup>
                                  {fabyarn_Details_Headers
                                    .filter((col) => col.visible)
                                    .map((col) => (
                                      <col
                                        key={col.field}
                                        style={{
                                          width: col.widths,
                                        }}
                                      />
                                    ))}
                                </colgroup>

                                <thead
                                  style={{
                                    backgroundColor: colorValue,
                                    color: foreValue,
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 10,
                                  }}
                                >
                                  <tr>
                                    {fabyarn_Details_Headers
                                      .filter((col) => col.visible)
                                      .map((col) => (
                                        <th
                                          key={col.field}
                                          style={{
                                            position: "relative",
                                            fontFamily: "Roboto",
                                            fontSize: "var(--bs-font-sm)",
                                            backgroundColor: colorValue,
                                            color: foreValue,
                                            padding: "0",
                                            whiteSpace: "nowrap",
                                          }}
                                          className="p-2"
                                        >
                                          {col.label}

                                          <span
                                            onMouseDown={(e) => handleResizeStart(e, col.field, fabyarn_Details_Headers, setFabYarn_Details_Headers)}
                                            style={{
                                              position: "absolute",
                                              right: "-3px",
                                              top: 0,
                                              width: "7px",
                                              height: "100%",
                                              cursor: "col-resize",
                                              userSelect: "none",
                                              zIndex: 100,
                                            }}
                                          />
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

                                          const commonStyle = {
                                            height: col.heights,
                                            padding: "0",
                                            margin: "0",
                                            verticalAlign: "middle",
                                          };

                                          // S.No
                                          if (col.field === "SNo") {
                                            return (
                                              <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                                <input type="text" className="w-100 form-control" value={RowIndex + 1} disabled={col.disabled} onChange={(e) => handle_Details_Change(RowIndex, col.field, e.target.value)} />
                                              </td>
                                            );
                                          }
                                          if (col.field === "RowIndex") {
                                            return (
                                              <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                                <input type="text" className="w-100 form-control" value={RowIndex} disabled={col.disabled} onChange={(e) => handle_Details_Change(RowIndex, col.field, e.target.value)} />
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

                                            if (col.field === "StyleItem") {
                                              options = styleItems;
                                            } else if (col.field === "PortionId") {
                                              options = [{ PortionId: "Portion 1" }, { PortionId: "Portion 2" }, { PortionId: "Portion 3" }];
                                            } else if (col.field === "Portion") {
                                              options = [{ Portion: "ALL PARTS" }, { Portion: "SLEEVE" }, { Portion: "COLLAR" }];
                                            } else if (col.field === "Design") {
                                              options = [{ Design: "SOLID" }, { Design: "AOP" }, { Design: "STRIPES" }];
                                            } else if (col.field === "Fabric") {
                                              options = [{ Fabric: "100 % COTTON SINGLE JERSERY" }, { Fabric: "LYCRA JERSEY" }, { Fabric: "RIB" }];
                                            } else if (col.field === "Gsm") {
                                              options = [{ Gsm: "120" }, { Gsm: "200" }, { Gsm: "240" }];
                                            } else if (col.field === "Gauge") {
                                              options = [{ Gauge: "18" }, { Gauge: "24" }, { Gauge: "28" }];
                                            } else if (col.field === "LL") {
                                              options = [{ LL: "27CM" }, { LL: "30CM" }, { LL: "28.5CM" }];
                                            }

                                            return (
                                              <td key={colIndex} style={commonStyle}>
                                                <select
                                                  className="w-100 form-select"
                                                  value={value}
                                                  name={col.field}
                                                  onChange={(e) => handle_Details_Change(RowIndex, col.field, e.target.value)}
                                                  onKeyDown={(e) => {
                                                    handleEnterFocus(e, "#fabDetTab");
                                                  }}
                                                >
                                                  {options.map((item, i) => {
                                                    const optionValue = item.styleitem ?? item.PortionId ?? item.Portion ?? item.Design ?? item.Fabric ?? item.Gsm ?? item.Gauge ?? item.LL;

                                                    return (
                                                      <option key={i} value={optionValue}>
                                                        {optionValue}
                                                      </option>
                                                    );
                                                  })}
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
                                                  onClick={() => handle_Gram_Details(row, RowIndex)}
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
                                                  onClick={() => handle_Yarn_Details(row, RowIndex)}
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
                                                  onFocus={() => handleAddRow(row.RowIndex, Number(RowIndex), fabyarn_DetValues, Details_NewRow, setFabYarn_DetValues)}
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
                    title={`${sequence} Combo Details`}
                    foreValue={foreValue}
                    colorValue={colorValue}
                    handlePopupPopulate={handle_PopupCombo}
                    handlePopupSave={handle_PopupCombo_Save}
                    handlePopupClear={handle_PopupCombo_Clear}
                    button1={"POPULATE"}
                    button2={"SAVE"}
                    button3={"CLEAR"}
                  >
                    <div className="row animate-zoom" style={{ height: "200px", overflow: "auto", width: "100%" }}>
                      <div className="table-responsive">
                        <div className="table-responsive" style={{ maxHeight: "200px", overflow: "auto", width: "100%" }}>
                          <table className="table table-bordered table-sm align-middle mb-0 " id="ComboTable">
                            <thead style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, position: "sticky" }}>
                              <tr>
                                {fabyarn_Combo_Headers
                                  .filter((col) => col.visible)
                                  .map((col) => {
                                    if (col.type === "checkbox") {
                                    }
                                    return (
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
                                    );
                                  })}
                              </tr>
                            </thead>

                            <tbody>
                              {fabyarn_combo_Values.map((row, RowIndex) => (
                                <tr key={RowIndex}>
                                  {fabyarn_Combo_Headers
                                    .filter((col) => col.visible)
                                    .map((col, colIndex) => {
                                      const value = row[col.field] || "";
                                      const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights, alignItems: col.alignItems };
                                      if (col.type === "checkbox") {
                                      }
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
                                              onChange={(e) => handle_Combo_Change(e, RowIndex, RowIndex + 1, col.field)}
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
                                              onChange={(e) => handle_Combo_Change(e, RowIndex, RowIndex + 1, col.field)}
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
                                          options = comboItems;
                                        }

                                        return (
                                          <td key={colIndex} className="p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                            <select
                                              className="w-100 p-1"
                                              disabled={col.disabled}
                                              value={value}
                                              name={col.field}
                                              onChange={(e) => handle_Combo_Change(e, RowIndex, RowIndex + 1, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#ComboTable");
                                              }}
                                            >
                                              <option value={""}></option>
                                              {options.map((item, i) => (
                                                <option key={i} value={item.asptblcolmasid}>
                                                  {item.colorname}
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
                                              onFocus={() => handleAddRow(row.RowIndex, RowIndex, fabyarn_combo_Values, Combo_newRow, setFabYarn_Combo_Values)}
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
                  <PopupCombo_Populate
                    show={comboShow_SubGrid}
                    onClose={() => setComboShow_SubGrid(false)}
                    title={`${fabRowindex} Combo Populate Details`}
                    foreValue={foreValue}
                    colorValue={colorValue}
                    handlePopupPopulate={handle_PopupCombo_SubGrid_Populate}
                    handlePopupSave={handle_PopupCombo_SubGrid_Save}
                    handlePopupClear={handle_PopupCombo_SubGrid_Clear}
                    button1={"UnChecked"}
                    button2={"SAVE"}
                    button3={"CLEAR"}
                  >
                    <div className="row animate-zoom" style={{ height: "50%", overflow: "auto", width: "100%" }}>
                      <div className="table-responsive">
                        <div className="table-responsive" style={{ maxHeight: "200px", overflow: "auto", width: "100%" }}>
                          <table
                            className="table table-bordered table-sm align-middle mb-0 "
                            id="ComboTable_Populate"
                            style={{
                              tableLayout: "fixed",
                              width: "max-content",
                            }}
                          >
                            <thead style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, position: "sticky" }}>
                              <tr>
                                {visibleComboHeaders
                                  .filter((col) => col.visible)
                                  .map((col) => {
                                    if (col.type === "checkbox") {
                                      const currentRowIndex = Number(sequence);
                                      const currentRowItems = popup_Combo_DataCopy.filter((row) => Number(row.RowIndex) === currentRowIndex);

                                      const allChecked =
                                        currentRowItems.length > 0 && currentRowItems.every((row) => allPopup_Combo_DataCopy.some((selected) => Number(selected.RowIndex) === Number(row.RowIndex) && Number(selected.SNo) === Number(row.SNo)));

                                      return (
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
                                          <input type="checkbox" checked={allChecked} onChange={(e) => handleAll_Combo_Checkbox(e, currentRowIndex, col.colIndex + 1)} />
                                        </th>
                                      );
                                    }
                                    return (
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
                                    );
                                  })}
                              </tr>
                            </thead>

                            <tbody>
                              {popup_Combo_DataCopy.map((row, RowIndex) => (
                                <tr key={RowIndex}>
                                  {visibleComboHeaders
                                    .filter((col) => col.visible)
                                    .map((col, colIndex) => {
                                      const value = row[col.field] || "";
                                      const scols = visibleComboHeaders.filter((c) => c.visible).length;
                                      const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights, alignItems: col.alignItems };
                                      if (col.type === "checkbox") {
                                        const isChecked = allPopup_Combo_DataCopy.some((item) => Number(item.RowIndex) === Number(row.RowIndex) && Number(item.SNo) === Number(row.SNo));
                                        return (
                                          <td key={col.field} className="text-center p-0 m-0">
                                            <input type="checkbox" checked={isChecked} onChange={(e) => handleChild_Combo_Checkbox(e, row.RowIndex, row.SNo)} />
                                          </td>
                                        );
                                      }
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
                                              onChange={""}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#ComboTable_Populate");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.field === "RowIndex") {
                                        return (
                                          <td key={colIndex} className="text-center p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                            <input
                                              type="text"
                                              className="w-100"
                                              style={{ padding: "4px" }}
                                              value={value}
                                              name={col.field}
                                              disabled={col.disabled}
                                              onChange={""}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#ComboTable_Populate");
                                              }}
                                            />
                                          </td>
                                        );
                                      }

                                      if (col.type === "select") {
                                        let options = [];

                                        if (col.field === "Combo") {
                                          options = comboItems;
                                        }

                                        return (
                                          <td key={colIndex} className="p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                            <select
                                              className="w-100 p-1"
                                              disabled={col.disabled}
                                              value={value}
                                              name={col.field}
                                              onChange={""}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#ComboTable_Populate");
                                              }}
                                            >
                                              {options.map((item, i) => (
                                                <option key={i} value={item.asptblcolmasid}>
                                                  {item.colorname}
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
                                              onFocus={() => ""}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#ComboTable_Populate");
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
                  </PopupCombo_Populate>
                  <PopupGram
                    show={gramShowPopup}
                    onClose={() => setGramShowPopup(false)}
                    title={`${Number(sequence)} Fabric Grammage Details`}
                    foreValue={foreValue}
                    colorValue={colorValue}
                    handlePopupPopulate={handle_PopupGram}
                    handlePopupSave={handle_PopupGram_Save}
                    handlePopupClear={handle_PopupGram_Clear}
                    button1={"POPULATE"}
                    button2={"SAVE"}
                    button3={"CLEAR"}
                  >
                    <div className="row animate-zoom" style={{ height: "100%", overflow: "auto", width: "100%" }}>
                      <div className="table-responsive">
                        <div className="table-responsive" style={{ maxHeight: "100%", overflow: "auto", width: "100%" }}>
                          <table className="table table-bordered table-sm align-middle mb-0 " id="GramTable">
                            <thead style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, position: "sticky" }}>
                              <tr>
                                {fabyarn_Gram_Headers
                                  .filter((col) => col.visible)
                                  .map((col) => {
                                    if (col.type === "checkbox") {
                                    }
                                    return (
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
                                    );
                                  })}
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
                                      const tabIndexValue = RowIndex + 1;
                                      const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights, alignItems: col.alignItems };
                                      if (col.type === "checkbox") {
                                      }
                                      if (col.field === "SNo") {
                                        return (
                                          <td key={colIndex} className="" style={commonStyle}>
                                            {tabIndexValue}
                                          </td>
                                        );
                                      }
                                      if (col.field === "RowIndex") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={sequence}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Gram_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#GramTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
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

                                        if (col.field === "Combo") {
                                          options = comboItems;
                                        }
                                        if (col.field === "GarColor" || col.field === "BaseColor" || col.field === "PorColor") {
                                          options = colorItems;
                                        } else if (col.field === "SizeName") {
                                          options = sizeGroupItems;
                                        } else if (col.field === "KDia") {
                                          options = [{ KDia: 22 }, { KDia: 23 }, { KDia: 24 }];
                                        } else if (col.field === "FDia") {
                                          options = [{ FDia: "100cm" }, { FDia: "185cm" }, { FDia: "195cm" }];
                                        }

                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <select
                                              className="w-100 form-select"
                                              disabled={col.disabled}
                                              value={value}
                                              onChange={(e) => handle_Gram_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#GramTable");
                                              }}
                                            >
                                              <option></option>
                                              {options.map((item, i) => (
                                                <div
                                                  style={{
                                                    width: "100%",
                                                    background: "red",
                                                    border: "1px solid #2b282a",
                                                    maxHeight: "220px",
                                                    overflowY: "auto",
                                                  }}
                                                >
                                                  <option key={i} value={item.asptblcolmasid || item.asptblsizmasid || item.KDia || item.FDia}>
                                                    {item.colorname || item.sizename || item.KDia || item.FDia}
                                                  </option>
                                                </div>
                                              ))}
                                            </select>
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
                  <PopupGram_Populate
                    show={gramShow_SubGrid}
                    onClose={() => setGramShow_SubGrid(false)}
                    title={`${yarnRowindex} Fabric SubGrid Details`}
                    foreValue={foreValue}
                    colorValue={colorValue}
                    handlePopupPopulate={handle_PopupGram_SubGrid_Populate}
                    handlePopupSave={handle_PopupGram_SubGrid_Save}
                    handlePopupClear={handle_PopupGram_SubGrid_Clear}
                    button1={"UnChecked"}
                    button2={"SAVE"}
                    button3={"CLEAR"}
                  >
                    <div className="row animate-zoom" style={{ height: "100%", overflow: "auto", width: "100%" }}>
                      <div className="table-responsive">
                        <div className="table-responsive" style={{ maxHeight: "100%", overflow: "auto", width: "100%" }}>
                          <table className="table table-bordered table-sm align-middle mb-0 " id="PopupGram_Populate">
                            <thead style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, position: "sticky" }}>
                              <tr>
                                {visibleGramHeaders
                                  .filter((col) => col.visible)
                                  .map((col) => {
                                    if (col.type === "checkbox") {
                                      const currentRowIndex = Number(sequence);
                                      const currentRowItems = popup_Gram_DataCopy.filter((row) => Number(row.RowIndex) === currentRowIndex);
                                      const allChecked =
                                        currentRowItems.length > 0 && currentRowItems.every((row) => allPopup_Gram_DataCopy.some((selected) => Number(selected.RowIndex) === Number(row.RowIndex) && Number(selected.SNo) === Number(row.SNo)));

                                      return (
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
                                          <input type="checkbox" checked={allChecked} onChange={(e) => handleAll_Gram_Checkbox(e, currentRowIndex, col.colIndex + 1)} />
                                        </th>
                                      );
                                    }
                                    return (
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
                                    );
                                  })}
                              </tr>
                            </thead>

                            <tbody>
                              {popup_Gram_DataCopy.map((row, RowIndex) => (
                                <tr key={RowIndex}>
                                  {fabyarn_Gram_Populate_Headers
                                    .filter((col) => col.visible)
                                    .map((col, colIndex) => {
                                      const value = row[col.field] || "";
                                      const tabIndexValue = RowIndex + 1;
                                      const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights, alignItems: col.alignItems };
                                      if (col.type === "checkbox") {
                                        const isChecked = allPopup_Gram_DataCopy.some((item) => Number(item.RowIndex) === Number(row.RowIndex) && Number(item.SNo) === Number(row.SNo));
                                        return (
                                          <td key={col.field} className="text-center p-0 m-0">
                                            <input type="checkbox" checked={isChecked} onChange={(e) => handleChild_Gram_Checkbox(e, row.RowIndex, row.SNo)} />
                                          </td>
                                        );
                                      }
                                      if (col.field === "SNo") {
                                        return (
                                          <td key={colIndex} className="" style={commonStyle}>
                                            {tabIndexValue}
                                          </td>
                                        );
                                      }
                                      if (col.field === "RowIndex") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={sequence}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Gram_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#PopupGram_Populate");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
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
                                                handleEnterFocus(e, "#PopupGram_Populate");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      // SELECT
                                      if (col.type === "select") {
                                        let options = [];

                                        if (col.field === "Combo") {
                                          options = comboItems;
                                        }
                                        if (col.field === "GarColor" || col.field === "BaseColor" || col.field === "PorColor") {
                                          options = colorItems;
                                        } else if (col.field === "SizeName") {
                                          options = sizeGroupItems;
                                        } else if (col.field === "KDia") {
                                          options = [{ KDia: 22 }, { KDia: 23 }, { KDia: 24 }];
                                        } else if (col.field === "FDia") {
                                          options = [{ FDia: "100cm" }, { FDia: "185cm" }, { FDia: "195cm" }];
                                        }

                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <select
                                              className="w-100 form-select"
                                              disabled={col.disabled}
                                              value={value}
                                              onChange={(e) => handle_Gram_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#PopupGram_Populate");
                                              }}
                                            >
                                              <option></option>
                                              {options.map((item, i) => (
                                                <div
                                                  style={{
                                                    width: "100%",
                                                    background: "red",
                                                    border: "1px solid #2b282a",
                                                    maxHeight: "220px",
                                                    overflowY: "auto",
                                                  }}
                                                >
                                                  <option key={i} value={item.asptblcolmasid || item.asptblsizmasid || item.KDia || item.FDia}>
                                                    {item.colorname || item.sizename || item.KDia || item.FDia}
                                                  </option>
                                                </div>
                                              ))}
                                            </select>
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
                  </PopupGram_Populate>

                  <PopupYarn
                    show={yarnShowPopup}
                    onClose={() => setYarnShowPopup(false)}
                    title={`${sequence} Yarn Consumption Details`}
                    foreValue={foreValue}
                    colorValue={colorValue}
                    handlePopupPopulate={handle_Yarn_PopupPopulate}
                    handlePopupSave={handle_Yarn_PopupSave}
                    handlePopupClear={handle_Yarn_PopupClear}
                    button1={"POPULATE"}
                    button2={"SAVE"}
                    button3={"CLEAR"}
                  >
                    <div className="row animate-zoom" style={{ height: "300px", width: "auto" }}>
                      <div className="table-responsive">
                        <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}>
                          <table className="table table-bordered table-sm align-middle mb-0 " id="YarnTable">
                            <thead
                              style={{
                                backgroundColor: `${colorValue}`,
                                color: `${foreValue}`,
                                position: "sticky",
                                top: 0,
                                zIndex: 10,
                              }}
                            >
                              <tr>
                                {fabyarn_Yarn_Headers
                                  .filter((col) => col.visible)
                                  .map((col) => {
                                    if (col.type === "checkbox") {
                                    }

                                    return (
                                      <th
                                        key={col.field}
                                        style={{
                                          width: col.widths,
                                          fontFamily: "Roboto",
                                          fontSize: "var(--bs-font-sm)",
                                          backgroundColor: `${colorValue}`,
                                          color: `${foreValue}`,
                                          padding: "0",
                                          margin: "0",
                                        }}
                                        className="p-2"
                                      >
                                        {col.label}
                                      </th>
                                    );
                                  })}
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
                                      const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights ?? 0, alignItems: col.alignItems };
                                      if (col.type === "checkbox") {
                                      }
                                      if (col.field === "SNo") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={Number(RowIndex + 1)}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Yarn_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#YarnTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.field === "RowIndex") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={sequence}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Yarn_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#YarnTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
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
                                      if (col.type === "select") {
                                        let options = [];

                                        if (col.field === "Yarn") {
                                          options = yarnItems;
                                        } else if (col.field === "ColorName") {
                                          options = colors;
                                        } else if (col.field === "Uom") {
                                          options = UomItems;
                                        } else if (col.field === "ProYesNo") {
                                          options = [
                                            { value: "NO", label: "NO" },
                                            { value: "YES", label: "YES" },
                                          ];
                                        }

                                        return (
                                          <td key={colIndex} className="p-0" style={commonStyle}>
                                            <select
                                              className="w-100 form-select"
                                              disabled={col.disabled}
                                              value={value}
                                              onChange={(e) => handle_Yarn_Change(e, RowIndex, RowIndex + 1, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#YarnTable");
                                              }}
                                            >
                                              <option></option>
                                              {options.map((item, i) => (
                                                <option key={i} value={item.value ?? item.asptblyarmasid ?? item.asptblcolmasid ?? item.asptbluommasid}>
                                                  {item.label ?? item.yarn ?? item.colorname ?? item.uom}
                                                </option>
                                              ))}
                                            </select>
                                          </td>
                                        );
                                      }
                                      if (col.type === "img") {
                                        return (
                                          <td key={colIndex} style={commonStyle} className="p-0 m-0">
                                            <img
                                              src={imagebutton}
                                              alt="edit"
                                              tabIndex={0}
                                              className="p-0 m-0"
                                              style={commonStyle}
                                              onClick={() => handle_PopupYarn_Details(row, RowIndex)}
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
                                              onFocus={() => handleAddRow(row.RowIndex, Number(RowIndex), fabyarn_yarn_Values, Yarn_NewRow, setFabYarn_Yarn_Values)}
                                              // onClick={() => handle_PopupYarn_AddRow(RowIndex)}
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
                  <PopupYarnDyeing
                    show={yarnDyeingShowPopup}
                    onClose={() => setYarnDyeingShowPopup(false)}
                    title={`${sequence} Yarn Dyeing Details`}
                    foreValue={foreValue}
                    colorValue={colorValue}
                    handlePopupPopulate={handle_Yarn_PopupYarnDyeing}
                    handlePopupSave={handle_Yarn_PopupYarnDyeing_Save}
                    handlePopupClear={handle_Yarn_PopupYarnDyeing_Clear}
                    button1={"POPULATE"}
                    button2={"SAVE"}
                    button3={"CLEAR"}
                  >
                    <div className="row animate-zoom" style={{ height: "300px", width: "auto" }}>
                      <div className="table-responsive">
                        <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}>
                          <table className="table table-bordered table-sm align-middle mb-0 " id="YarnDyeingTable">
                            <thead
                              style={{
                                backgroundColor: `${colorValue}`,
                                color: `${foreValue}`,
                                position: "sticky",
                                top: 0,
                                zIndex: 10,
                              }}
                            >
                              <tr>
                                {fabyarn_Yarn_Dyeing_Headers
                                  .filter((col) => col.visible)
                                  .map((col) => {
                                    return (
                                      <th
                                        key={col.field}
                                        style={{
                                          width: col.widths,
                                          fontFamily: "Roboto",
                                          fontSize: "var(--bs-font-sm)",
                                          backgroundColor: `${colorValue}`,
                                          color: `${foreValue}`,
                                          padding: "0",
                                          margin: "0",
                                        }}
                                        className="p-2"
                                      >
                                        {col.label}
                                      </th>
                                    );
                                  })}
                              </tr>
                            </thead>

                            <tbody>
                              {fabyarn_yarn_dyeingValues.map((row, RowIndex) => (
                                <tr key={RowIndex}>
                                  {fabyarn_Yarn_Dyeing_Headers
                                    .filter((col) => col.visible)
                                    .map((col, colIndex) => {
                                      const value = row[col.field] || "";
                                      const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights ?? 0, alignItems: col.alignItems };
                                      if (col.field === "SNo") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={Number(RowIndex + 1)}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Yarn_Dyeing_Change(e, RowIndex, RowIndex + 1, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#YarnDyeingTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.field === "RowIndex") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={sequence}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Yarn_Dyeing_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#YarnDyeingTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.type === "text") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={value}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Yarn_Dyeing_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#YarnDyeingTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.type === "select") {
                                        let options = [];

                                        if (col.field === "ProcessName") {
                                          options = processValues;
                                        } else if (col.field === "YarDyeYesNo") {
                                          options = [
                                            { value: "NO", label: "NO" },
                                            { value: "YES", label: "YES" },
                                          ];
                                        }

                                        return (
                                          <td key={colIndex} className="p-0" style={commonStyle}>
                                            <select
                                              className="w-100 form-select"
                                              disabled={col.disabled}
                                              value={value}
                                              onChange={(e) => handle_Yarn_Dyeing_Change(e, RowIndex, RowIndex + 1, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#YarnDyeingTable");
                                              }}
                                            >
                                              <option value={""}></option>
                                              {options.map((item, i) => (
                                                <option key={i} value={item.value ?? item.asptblprogroseqmasid}>
                                                  {item.label ?? item.processgroup}
                                                </option>
                                              ))}
                                            </select>
                                          </td>
                                        );
                                      }
                                      if (col.type === "img") {
                                        return (
                                          <td key={colIndex} style={commonStyle} className="p-0 m-0">
                                            <img
                                              src={imagebutton}
                                              alt="edit"
                                              tabIndex={0}
                                              className="p-0 m-0"
                                              style={commonStyle}
                                              onClick={() => handle_PopupYarnDyeing_Details(row, RowIndex)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#YarnDyeingTable");
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
                                              onFocus={() => handleAddRow(row.RowIndex, Number(RowIndex), fabyarn_yarn_dyeingValues, PopUpDy_Details_NewRow, setFabyarn_yarn_dyeingValues)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#YarnDyeingTable");
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
                  </PopupYarnDyeing>
                  <PopupYarnDyeingColor
                    show={yarnDyeingColShowPopup}
                    onClose={() => setYarnDyeingColShowPopup(false)}
                    title={`${sequence} Yarn Dyed Color Details`}
                    foreValue={foreValue}
                    colorValue={colorValue}
                    handlePopupPopulate={handle_Yarn_PopupYarnDyeingColor}
                    handlePopupSave={handle_Yarn_PopupYarnDyeingColor_Save}
                    handlePopupClear={handle_Yarn_PopupYarnDyeingColor_Clear}
                    button1={"POPULATE"}
                    button2={"SAVE"}
                    button3={"CLEAR"}
                  >
                    <div className="row animate-zoom" style={{ height: "300px", width: "auto" }}>
                      <div className="table-responsive">
                        <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}>
                          <table className="table table-bordered table-sm align-middle mb-0 " id="PopupYarnDyeingColor">
                            <thead
                              style={{
                                backgroundColor: `${colorValue}`,
                                color: `${foreValue}`,
                                position: "sticky",
                                top: 0,
                                zIndex: 10,
                              }}
                            >
                              <tr>
                                {fabyarn_Yarn_DyingColorHeaders
                                  .filter((col) => col.visible)
                                  .map((col) => {
                                    return (
                                      <th
                                        key={col.field}
                                        style={{
                                          width: col.widths,
                                          fontFamily: "Roboto",
                                          fontSize: "var(--bs-font-sm)",
                                          backgroundColor: `${colorValue}`,
                                          color: `${foreValue}`,
                                          padding: "0",
                                          margin: "0",
                                        }}
                                        className="p-2"
                                      >
                                        {col.label}
                                      </th>
                                    );
                                  })}
                              </tr>
                            </thead>

                            <tbody>
                              {fabyarn_yarn_dyeingColorValues.map((row, RowIndex) => (
                                <tr key={RowIndex}>
                                  {fabyarn_Yarn_DyingColorHeaders
                                    .filter((col) => col.visible)
                                    .map((col, colIndex) => {
                                      const value = row[col.field] || "";
                                      const commonStyle = { width: col.widths, padding: "0", margin: "0", height: col.heights ?? 0, alignItems: col.alignItems };
                                      if (col.field === "SNo") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              width={col.widths}
                                              className="w-100 form-control"
                                              value={Number(RowIndex + 1)}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Yarn_Dyeing_Color_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#PopupYarnDyeingColor");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.field === "RowIndex") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle} width={col.widths}>
                                            <input
                                              type="text"
                                              width={col.widths}
                                              className="w-100 form-control"
                                              value={sequence}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Yarn_Dyeing_Color_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#PopupYarnDyeingColor");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.type === "text") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              width={col.widths}
                                              className="w-100 form-control"
                                              value={value}
                                              disabled={col.disabled}
                                              onChange={(e) => handle_Yarn_Dyeing_Color_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#PopupYarnDyeingColor");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.type === "select") {
                                        let options = [];

                                        if (col.field === "PortionColor") {
                                          options = colors;
                                        }
                                        if (col.field === "YarnProColor") {
                                          options = colors;
                                        }

                                        return (
                                          <td key={colIndex} className="p-0" style={commonStyle}>
                                            <select
                                              className="w-100 form-select"
                                              width={col.widths}
                                              disabled={col.disabled}
                                              value={value}
                                              onChange={(e) => handle_Yarn_Dyeing_Color_Change(e, RowIndex, col.field)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#PopupYarnDyeingColor");
                                              }}
                                            >
                                              {options.map((item, i) => (
                                                <option key={i} value={item.asptblcolmasid ?? item.asptblcolmasid}>
                                                  {item.colorname ?? item.colorname}
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
                                              style={{ margin: "0", padding: "0" }}
                                              disabled={col.disabled}
                                              width={col.widths}
                                              onFocus={() => handleAddRow(row.RowIndex, Number(RowIndex), fabyarn_yarn_dyeingColorValues, PopUpDy_Co_Details_NewRow, setFabyarn_yarn_dyeingColorValues)}
                                              // onFocus={() => handle_YarDyeing_Color_AddRow(RowIndex)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#PopupYarnDyeingColor");
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
                  </PopupYarnDyeingColor>
                  {/* <PopupProcess
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
                                  .map((col) => {
                                    if (col.type === "checkbox") {
                                      const allChecked = fabyarn_pro_Values.length > 0 && fabyarn_pro_Values.every((row) => row.All === true);
                                      return (
                                        <th
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
                                          <input type="checkbox" checked={allChecked} onChange={handleAll_Process_Checkbox} />
                                        </th>
                                      );
                                    }
                                    return (
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
                                    );
                                  })}
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
                                      if (col.type === "checkbox") {
                                        return (
                                          <td key={col.field} className="text-center p-0 m-0">
                                            <input type="checkbox" checked={row.All === true} onChange={(e) => handleChild_Process_Checkbox(e, RowIndex)} />
                                          </td>
                                        );
                                      }
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
                  </PopupProcess> */}
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
              <div className={newButton === 3 ? "content active-content" : "content"}>
                <div className="row animate-zoom" style={{ height: "300px" }}>
                  <div className="table-responsive">
                    <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}></div>
                  </div>
                </div>
              </div>
              <div className={newButton === 4 ? "content active-content" : "content"}>
                <div className="row animate-zoom">ddd</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FabricYarnProcess;
