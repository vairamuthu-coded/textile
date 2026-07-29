import React, { useContext, useEffect, useMemo, useState } from "react";
import { utilityState } from "../utilityState";
import { useRef } from "react";
import DataContext from "../context/CreateUserContext";
import axios from "axios";
import { toast } from "react-toastify";
import "../ContextMenu.css";
import ContextMenu from "../ContextMenu";
import ActionButtton from "../ActionButtton";
import Popup from "../Popup.jsx";
import imagebutton from "../Images/win.png";
import MultiSelect from "../Custom/MultiSelect.jsx";
import defaultimage from "../Images/win.png";
import ImageUploader from "../Custom/ImageUploader.jsx";
import { classNames } from "@react-pdf-viewer/core";
import Search from "../Custom/Search.js";
import DataTable from "../Custom/DataTable.js";
import TabNav from "../component/TabNav.jsx";
const OrderEntry = ({ title, subTitle }) => {
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
    order,
    setOrder,
    ITEM_PER_PAGE,
    orderSizeValues,
    setOrderSizeValues,
    orderOrdValues,
    setOrderOrdValues,
    ordeShiValues,
    setOrdeShiValues,
    orderPopUpValues,
    setOrderPopUpValues,
    garimages,
    setGarImage,
  } = useContext(DataContext);
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const insert_update = `${API_URL}/OrderEntrys`;
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
  const [popupType, setPopupType] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [userRights1, setUserRights1] = useState([]);
  const [items, setItems] = useState([]);
  const [finYearItems, setFinYearItems] = useState([]);
  const [active, setActive] = useState(false);
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
  const [orderEntryItem, setOrderEntryItem] = useState([]);
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [orderEntry_Search, setOrderEntrySearch] = useState([]);
  const [company_filterSearch, setCompanyFilterSearch] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const heights = "380px";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, sizeGroupRes, sizeRes, styleGroupRes, colorRes, comboRes, buyerRes, agentRes, uomRes, orderPackTypeRes, payTermRes, currencyRes, styleCategoryRes, styleitemRes, finYearRes, ord_Entry_Res] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(sizeGroupParam),
          axios.get(SizeParam),
          axios.get(StyleGroupParam),
          axios.get(ColorParam),
          axios.get(ComboParam),
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
        ]);

        setUserRights1(userRes.data);
        setItems(sizeGroupRes.data || []);
        setSizeItems(sizeRes.data || []);
        setStyleGroupItems(styleGroupRes.data || []);
        setColorItems(colorRes.data || []);
        setComboItems(comboRes.data || []);
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
        setOrderEntryItem(ord_Entry_Res.data || []);
      } catch (error) {
        setFetchError(error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [defaultDetails?.Compcode, defaultDetails?.User, title]);

  useEffect(() => {
    const filterResult = orderEntryItem.filter((item) => item.compcode.includes(orderEntry_Search));
    setCompanyFilterSearch(filterResult.reverse());
  }, [orderEntryItem, orderEntry_Search]);

  const [ordimages, setordImage] = useState({
    imageFile: null,
    imagesrc: defaultimage,
    filetype: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const finalValue = type === "checkbox" ? (checked === true ? "T" : "F") : type === "number" ? Number(value) : value;
    if (name === "SizeTemplate") {
      SizeGropupMaster_Check(value);
    }
    if (name === "Active") {
      setActive(checked);
    }

    setOrder((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };
  const OrderEntryColumn = [
    { headername: "", field: "none" },
    { headername: "ID", field: "asptblOrdId" },
    { headername: "COMPCODE", field: "compcode" },
    { headername: "ORDERNO", field: "orderNo" },
    { headername: "DATE", field: "orderDate" },
    { headername: "STYLEREFNO", field: "styleRefNo" },
    { headername: "ORDERQTY", field: "orderQty" },
    { headername: "ACTIVE", field: "active" },
  ];
  const commentsData = useMemo(() => {
    const keyword = String(orderEntry_Search || "").toLowerCase();

    // 1) FILTER
    let filtered = orderEntryItem;

    if (keyword) {
      filtered = orderEntryItem.filter((item) =>
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
  }, [orderEntryItem, currentPage, orderEntry_Search, sorting]);

  const OrderEntryCheck = async (row) => {
    try {
      const res = await axios.get(`${insert_update}/${row.asptblOrdId}`);
      const data = res.data[0];
      if (data.asptblOrdId === 0) {
        toast.error("Invalid Data");
        return;
      }

      const imageSrc = `${data.filetype},${data.ordLogo}`;
      setordImage({
        imagesrc: imageSrc,
        filetype: data.filetype,
      });

      setOrder({
        AsptblOrdId: Number(data.asptblOrdId) || 0,
        Compcode: Number(defaultDetails.HCompcode) || 0,
        FinYear: Number(order.finYear) || 0,
        FabType: data.fabType || "",
        Type: data.type || "",
        OrderType: data.orderType || "",
        OrderNo: data.orderNo || "",
        OrderDate: data.orderDate || "",
        Buyer: data.buyer || "",
        BuyerAgent: data.buyerAgent || "",
        ShipingAgent: data.shipingAgent || "",
        StyleRefNo: data.styleRefNo || "",
        OrderQty: data.orderQty || "",
        Uom: data.uom || "",
        OrderPackType: data.orderPackType || "",
        NoofPcs: data.noofPcs || "",
        ShipingSystem: data.shipingSystem || "",
        ShipMode: data.shipMode || "",
        PayTerms: data.payTerms || "",
        DutyType: data.dutyType || "",
        LCExpDate: data.lCExpDate || "",
        ExShipAllowed: data.exShipAllowed || "",
        UnAssortAllowed: data.unAssortAllowed || "",
        Merchandiser: data.merchandiser || "",
        AsstMerch: data.asstMerch || "",
        Follower: data.follower || "",
        Currency: data.currency || "",
        CunCrrentValue: data.currencyValue || "",
        SizeTemplate: data.sizeTemplate || "",
        SampleNo: data.sampleNo || "",
        SplCategory: data.categorySelected.map((item) => item.stylegroup).join(","),
      });
    } catch (error) {
      toast.error("-- " + error.message);
    } finally {
      setNewButton(1);
    }
  };

  const OrderEntry_New = () => {
    setNewButton(1);
    // setOrderSizeValues([]);
    // setOrderOrdValues([]);
    // setOrdeShiValues([]);
    //setOrderPopUpValues([]);
  };

  const ListData0 = {
    AsptblOrdId: Number(order.AsptblOrdId) || 0,
    Compcode: Number(defaultDetails.HCompcode) || 0,
    FinYear: Number(order.FinYear) || 0,
    FabType: order.FabType,
    Type: order.Type,
    OrderType: order.OrderType,
    OrderNo: order.OrderNo,
    OrderDate: order.OrderDate,
    Buyer: order.Buyer,
    BuyerAgent: order.BuyerAgent,
    ShipingAgent: order.ShipingAgent,
    StyleRefNo: order.StyleRefNo,
    OrderQty: order.OrderQty,
    Uom: order.Uom,
    OrderPackType: order.OrderPackType,
    NoofPcs: order.NoofPcs,
    ShipingSystem: order.ShipingSystem,
    ShipMode: order.ShipMode,
    PayTerms: order.PayTerms,
    DutyType: order.DutyType,
    LCExpDate: order.LCExpDate,
    ExShipAllowed: order.ExShipAllowed,
    UnAssortAllowed: order.UnAssortAllowed,
    Merchandiser: order.Merchandiser,
    AsstMerch: order.AsstMerch,
    Follower: order.Follower,
    Currency: order.Currency,
    CunCrrentValue: order.CurrencyValue,
    SizeTemplate: order.SizeTemplate,
    SampleNo: order.SampleNo,
    SplCategory: order.CategorySelected.map((item) => item.stylegroup).join(","),
    Filetype: garimages.imagesrc,
  };

  const ListData1 = (items = []) => {
    return items
      .filter((obj) => obj.sizename && obj.sizename !== "")
      .map((obj, i) => {
        const price = parseFloat(obj.buyerPrice) || 0;
        var index = parseInt(i + 1);
        return {
          asptblOrdSizId: Number(obj.asptblOrdSizId) || 0,
          asptblOrdId: Number(obj.asptblOrdId) || 0,
          sizename: Number(obj.sizename) || 0,
          buyerPrice: price,
          compcode: Number(obj.compcode) || 0,
          notes: obj.notes?.trim() || "",
          compcode: Number(defaultDetails.HCompcode) || 0,
          rowIndex: index,
        };
      });
  };

  const ListData2 = (items = []) => {
    return items
      .filter((obj) => obj.styleGroup && obj.styleGroup !== "")
      .map((obj, i) => ({
        rowIndex: Number(i) + 1,
        asptblordColId: Number(obj.asptblordColId) || 0,
        asptblOrdId: Number(obj.asptblOrdId) || 0,
        styleGroup: Number(obj.styleGroup) || 0,
        bPono: obj.bPono,
        bPoDate: obj.bPoDate,
        combo: Number(obj.combo) || 0,
        color: Number(obj.color) || 0,
        ratioYN: obj.ratioYN,
        ratio: obj.ratio,
        colorQty: Number(obj.colorQty) || 0,
        totalQty: Number(obj.totalQty) || 0,
        notes: obj.notes,
        compcode: Number(defaultDetails.HCompcode) || 0,
      }));
  };

  const ListData3 = (items = []) => {
    return items
      .filter((obj) => obj.styleitem && obj.styleitem !== "")
      .map((obj, i) => {
        var index = parseInt(i + 1);
        return {
          asptblOrdPopId: Number(obj.asptblOrdPopId) || 0,
          asptblordColId: Number(obj.asptblordColId) || 0,
          asptblOrdId: Number(obj.asptblOrdId) || 0,
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
          asptblOrdId: Number(obj.asptblOrdId) || 0,
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

  const OrderEntry_Save = async () => {
    if (loading) return;

    if (!order.SizeTemplate) {
      toast.error("Size Group is required");
      return;
    }

    if (!orderSizeValues.length) {
      toast.error("At least one detail row is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        OrdMas: ListData0,
        OrdSiz: ListData1(orderSizeValues),
        OrdCol: ListData2(orderOrdValues),
        OrdPop: ListData3(popupDataCopy),
        OrdShi: ListData4(ordeShiValues),
      };
      const response = await axios.post(insert_update, payload);

      if (response.status === 200 || response.status === 201) {
        if (response.data?.error) {
          toast.error(response.data.error);
          return;
        }

        setNewButton(1);
        toast.success("Record Saved Successfully");
        OrderEntry_New();
      } else {
        toast.error("Failed to save data");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Error saving data");
    } finally {
      setLoading(false);
    }
  };
  const OrderEntry_Delete = () => {
    setNewButton(1);
  };
  const OrderEntry_Search = () => {
    setNewButton(3);
  };
  const OrderEntry_Prints = () => {
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

    // Close first to avoid flicker
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

  const handleInsertBefore = () => {
    if (contextMenu.index == null) return;
    let values = [...orderSizeValues];
    values.splice(contextMenu.index, 0, { asptblOrdSizId: "", asptblOrdId: "", sizename: "", buyerPrice: "", notes: "" });

    setOrderSizeValues(values);
    closeMenu();
  };

  const handleInsertAfter = () => {
    if (contextMenu.index == null) return;

    const values = [...orderSizeValues];
    values.splice(contextMenu.index + 1, 0, { asptblOrdSizId: "", asptblOrdId: "", sizename: "", buyerPrice: "", notes: "" });

    setOrderSizeValues(values);
    closeMenu();
  };

  const handleDelete = () => {
    if (contextMenu.index == null) return;

    let values = [...orderSizeValues];
    values.splice(contextMenu.index, 1);

    setOrderSizeValues(values);
    closeMenu();
  };

  const handleDeleteAll = () => {
    setOrderSizeValues([
      {
        asptblOrdSizId: "",
        asptblOrdId: "",
        sizename: "",
        buyerPrice: "",
        notes: "",
      },
    ]);

    closeMenu();
  };

  const handleSizeChange = (index, field, value) => {
    const updated = [...orderSizeValues];
    updated[index][field] = value;
    setOrderSizeValues(updated);
  };
  const handleComboChange = async (index, field, value) => {
    const updated = [...orderOrdValues];

    updated[index][field] = value;

    if (field === "RatioYN") {
      setDis(value);
      updated[index]["Ratio"] = "";
    }

    if (field === "Ratio") {
      setAssort([value]);
    }

    setOrderOrdValues(updated);
  };

  const SizeGropupMaster_Check = async (id) => {
    try {
      if (id !== "") {
        setOrderSizeValues([]);

        const res = await axios.get(`${sizeGroupParam}/${id}`);
        setPopupDataCopy([]);

        const formattedData = res?.data?.map((item) => ({
          asptblOrdSizId: item?.asptblOrdSizId || "",
          asptblOrdId: item?.asptblOrdId || "",
          asptblsizmasid: item?.asptblsizmasid || "",
          sizename: item?.sizename || "",
          buyerPrice: item?.buyerPrice || "",
          notes: item?.notes || "",
        }));

        setOrderSizeValues(formattedData);
      }
    } catch (err) {
      toast.error(err.response);
    } finally {
      setNewButton(1);
    }
  };
  const orderSizeHeaders = [
    { field: "sNo", label: "SNo", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "asptblOrdSizId", label: "AsptblordcolId", type: "text", visible: false, widths: "50px", pattern: "", disabled: true },
    { field: "asptblOrdId", label: "asptblOrdId", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "sizename", label: "Sizename", visible: true, type: "select", widths: "250px", pattern: "", disabled: true },
    { field: "buyerPrice", label: "buyerPrice", visible: true, type: "text", widths: "250px", pattern: "", disabled: false },
    { field: "notes", label: "notes", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
  ];

  const orderComboHeaders = [
    { field: "sNo", label: "S.No", visible: true, type: "text", widths: "50px", disabled: true, pattern: "" },
    { field: "asptblordColId", label: "ID", visible: false, type: "text", disabled: false, widths: "50px", pattern: "" },
    { field: "asptblOrdId", label: "OrderID", visible: false, type: "text", disabled: false, widths: "50px", disabled: true, pattern: "" },
    { field: "styleGroup", label: "StyleGroup", visible: true, type: "select", widths: "250px", disabled: false, pattern: "" },
    { field: "bPono", label: "BPono", visible: true, type: "select", widths: "250px", disabled: false, pattern: "" },
    { field: "bPoDate", label: "Date", visible: true, type: "date", widths: "150px", disabled: false, pattern: "" },
    { field: "combo", label: "Combo", visible: true, type: "select", widths: "350px", disabled: false, pattern: "" },
    { field: "color", label: "Color", visible: true, type: "select", widths: "350px", disabled: false, pattern: "" },
    { field: "ratioYN", label: "RatioY/N", visible: true, type: "selectYN", widths: "50px", disabled: false, pattern: "" },
    { field: "ratio", label: "Ratio", visible: true, type: "text", widths: "50px", disabled: false, pattern: "" },
    { field: "colorQty", label: "ColorQty", visible: true, type: "text", widths: "50px", disabled: false, pattern: "" },
    { field: "totalQty", label: "TotalQty", visible: true, type: "text", widths: "50px", disabled: false, pattern: "" },
    { field: "styleDetails", label: "Det", visible: true, type: "img", widths: "10px", disabled: false, pattern: "" },
    { field: "notes", label: "notes", visible: true, type: "text", widths: "20px", disabled: false, pattern: "" },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const orderPopUpHeaders = [
    { field: "sNo", label: "SNo", visible: true, type: "text", widths: "20px", disabled: true },
    { field: "rowIndex", label: "Row", visible: false, type: "text", widths: "10px", disabled: true },
    { field: "asptblOrdPopId", label: "asptblPopUpOrdid", visible: false, type: "text", widths: "50px", disabled: true },
    { field: "asptblordColId", label: "asptblordColId", visible: false, type: "text", widths: "50px", disabled: true },
    { field: "asptblOrdId", label: "asptblOrdId", visible: false, type: "text", widths: "50px", disabled: true },
    { field: "styleitem", label: "Styleitem", visible: true, type: "select", widths: "250px", disabled: true },
    { field: "sizename", label: "Sizename", visible: true, type: "select", widths: "80px", disabled: true },
    { field: "assortQty", label: "AssortQty", visible: true, type: "text", widths: "50px", disabled: false },
    { field: "shipQty", label: "ShipQty", visible: true, type: "text", widths: "50px", disabled: true },
    { field: "excessQty", label: "ExcessQty", visible: true, type: "text", widths: "50px", disabled: false },
    { field: "prodQty", label: "ProdQty", visible: true, type: "text", widths: "50px", disabled: true },
    { field: "notes", label: "notes", visible: true, type: "text", widths: "30px", disabled: false },
  ];

  const orderShipHeaders = [
    { field: "SNo", label: "S.No", visible: true, type: "text", widths: "50px", disabled: true },
    { field: "asptblOrdShiId", label: "ID", visible: false, type: "text", widths: "50px" },
    { field: "asptblOrdId", label: "OrderID", visible: false, type: "text", widths: "50px" },
    { field: "assortNo", label: "AssortNo", visible: true, type: "select", widths: "100px" },
    { field: "delDate", label: "Act Del Date", visible: true, type: "date", widths: "120px" },
    { field: "bPoNo", label: "BPoNo", visible: true, type: "select", widths: "150px" },
    { field: "portofLoading", label: "PortofLoading", visible: true, type: "select", widths: "250px" },
    { field: "destination", label: "Destination", visible: true, type: "select", widths: "250px" },
    { field: "destinationPort", label: "DestinationPort", visible: true, type: "select", widths: "250px" },
    { field: "combo", label: "Combo", visible: true, type: "select", widths: "220px" },
    { field: "color", label: "Color", visible: true, type: "select", widths: "220px" },
    { field: "shipQty", label: "ShipQty", visible: true, type: "text", widths: "100px" },
    { field: "notes", label: "notes", visible: true, type: "text", widths: "0px" },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px" },
  ];

  const handleShipChange = (RowIndex, field, value) => {
    const updated = [...ordeShiValues];
    updated[RowIndex][field] = value;
    setOrdeShiValues(updated);
  };

  const handleShipAddRow = () => {
    setOrdeShiValues([
      ...ordeShiValues,
      {
        sNo: ordeShiValues.length + 1,
        asptblOrdShiId: "",
        asptblOrdId: "",
        assortNo: "",
        delDate: "",
        bPoNo: "",
        portofLoading: "",
        destination: "",
        destinationPort: "",
        combo: "",
        color: "",
        shipQty: "",
        notes: "",
      },
    ]);
  };

  const [assort, setAssort] = useState([]);
  const [assort1, setAssort1] = useState([]);

  const handlePopupChange = (e, RowIndex, field) => {
    const value = e.target.value;
    const updated = [...orderPopUpValues];
    let totalAssort = 0;
    const currentOrder = orderOrdValues[sequence - 1];
    const Ratio_YN = currentOrder.ratioYN;
    const Total_Qty = Number(currentOrder.totalQty || 0);
    const Ratio_ = Ratio_YN === "Yes" ? Number(currentOrder.ratio || 0) : Total_Qty;
    updated[RowIndex][field] = value;
    // ASSORT QTY
    if (field === "assortQty") {
      let shipqty = Ratio_YN === "Yes" ? (Total_Qty * Number(value || 0)) / Ratio_ : Number(value || 0);
      shipqty = Math.round(shipqty);
      updated[RowIndex]["shipQty"] = shipqty;

      let totalShipQty = 0;
      for (let i = 0; i <= RowIndex; i++) {
        totalAssort += Number(updated[i].assortQty || 0);
        totalShipQty += Number(updated[i].shipQty || 0);
        if (totalAssort > Ratio_) {
          toast.info("Exces Ratio Qty Not Allowed");
          return;
        }
      }

      // Auto balance next row
      if (RowIndex < updated.length - 1) {
        if (totalAssort > Ratio_) {
          toast.info("Exces Ratio Qty Not Allowed");
          return;
        } else {
          updated[RowIndex + 1]["assortQty"] = Ratio_ - totalAssort;

          updated[RowIndex + 1]["shipQty"] = Ratio_YN === "Yes" ? Total_Qty - totalShipQty : Total_Qty - totalAssort;
        }
      }
      setAssort([totalAssort]);
      setAssort1([shipqty]);
    }
    // EXCESS QTY
    if (field === "excessQty") {
      const prodqty = (updated[RowIndex]["shipQty"] * Number(value || 0)) / 100;
      updated[RowIndex]["prodQty"] = Math.round(updated[RowIndex]["shipQty"] + prodqty);
      updated[RowIndex]["excessQty"] = value;
    }

    setOrderPopUpValues(updated);
  };

  const [showModal, setShowModal] = useState(false);

  const handleAddRow = (index) => {
    const newRow = {
      sNo: "",
      AsptblordColId: "",
      asptblOrdId: "",
      styleGroup: "",
      bPono: "",
      bPoDate: "",
      combo: "",
      color: "",
      ratioYN: "",
      ratio: "",
      colorQty: "",
      totalQty: "",
      styleDetails: "",
      notes: "",
    };

    const updated = [...orderOrdValues];
    updated.splice(index + 1, 0, newRow);
    setOrderOrdValues(updated);
  };

  const handleDeleteRow = (index) => {
    const updated = orderOrdValues.filter((_, i) => i !== index);
    setOrderOrdValues(updated);
  };
  const [sequence, setSquence] = useState();
  const [popupDataCopy, setPopupDataCopy] = useState("");

  const handleAssortQty = (item, row, i, seq) => {
    return {
      sNo: Number(i) + 1,
      rowIndex: seq,
      asptblOrdPopId: Number(row.asptblOrdPopId) || 0,
      asptblordColId: Number(row.asptblordColId) || 0,
      asptblOrdId: Number(row.asptblOrdId) || 0,
      styleitem: row.styleGroup,
      asptblsizmasid: item?.asptblsizmasid || 0,
      sizename: item.sizename,
      assortQty: "",
      shipQty: "",
      excessQty: "",
      prodQty: "",
      notes: "",
    };
  };

  const handleStyleDetails = (row, RowIndex) => {
    const finid = Number(RowIndex) + 1;

    if (popupDataCopy.length >= 1) {
      const filteredData = popupDataCopy.filter((item) => item.rowIndex === finid);

      if (filteredData.length >= 1) {
        setSquence(finid);
        setOrderPopUpValues(filteredData);
        setShowPopup(true);
      } else {
        const seq = finid;

        setSquence(seq);
        setOrderPopUpValues([]);

        const newrow = orderSizeValues.map((item, i) => {
          if (i === 0) {
            return {
              sNo: Number(i) + 1,
              rowIndex: seq,
              asptblOrdPopId: Number(row.asptblOrdPopId) || 0,
              asptblordColId: Number(row.asptblordColId) || 0,
              asptblOrdId: Number(row.asptblOrdId) || 0,
              styleitem: row.styleGroup,
              asptblsizmasid: item?.asptblsizmasid || 0,
              sizename: item.sizename,
              assortQty: row.ratioYN === "Yes" ? row.ratio : row.totalQty,
              shipQty: row.ratioYN === "Yes" ? row.totalQty : 0,
              excessQty: "",
              prodQty: "",
              notes: "",
            };
          }
          return handleAssortQty(item, row, i, seq);
        });

        setOrderPopUpValues((prev) => [...prev, ...newrow]);
        setShowPopup(true);
      }
    } else {
      const seq = finid;
      setSquence(seq);
      setOrderPopUpValues([]);
      const newrow = orderSizeValues.map((item, i) => {
        if (i === 0) {
          return {
            sNo: Number(i) + 1,
            rowIndex: seq,
            asptblOrdPopId: "0",
            asptblordColId: "0",
            asptblOrdId: "0",
            styleitem: row.styleGroup,
            asptblsizmasid: item?.asptblsizmasid || 0,
            sizename: item.sizename,
            assortQty: row.ratioYN === "Yes" ? row.ratio : row.totalQty,
            shipQty: row.ratioYN === "Yes" ? row.totalQty : 0,
            excessQty: "",
            prodQty: "",
            notes: "",
          };
        }

        return handleAssortQty(item, row, i, seq);
      });

      setOrderPopUpValues((prev) => [...prev, ...newrow]);

      setShowPopup(true);
    }
  };

  const handlePopupPopulate = () => {
    setShowPopup(true);
    setOrderPopUpValues([]);
    const finid = Number(sequence);

    if (orderSizeValues.length >= 1) {
      const finid = Number(sequence);
      const filteredData = popupDataCopy.filter((item) => item.RowIndex === finid);
      if (filteredData.length >= 1) {
        setOrderPopUpValues(filteredData);
      }
    } else {
      toast.error("Invalid Row");
    }
  };

  const handlePopupSave = () => {
    const finid = Number(sequence);
    // VALIDATION
    const hasEmpty = orderPopUpValues.some((item) => !item.assortQty || Number(item.assortQty) <= 0);

    const totalShipQty = orderPopUpValues.reduce((sum, item) => sum + Number(item.shipQty || 0), 0);

    const totalQty = Number(orderOrdValues[finid - 1]?.totalQty || 0);

    if (hasEmpty) {
      toast.info("Assort Qty Empty not allowed");
      return;
    }

    if (totalShipQty !== totalQty) {
      toast.info("Mismatch Ship Qty not allowed");
      return;
    }

    // CHECK EXISTING DATA
    const filteredData = popupDataCopy.filter((item) => item.rowIndex === finid);
    if (filteredData.length === 0) {
      // ADD NEW
      setPopupDataCopy((prev) => [...prev, ...orderPopUpValues]);
    } else {
      // UPDATE EXISTING
      const updated = popupDataCopy.map((item) => {
        if (item.rowIndex === finid) {
          return orderPopUpValues.find((p) => p.asptblOrdPopId === item.asptblOrdPopId) || item;
        }

        return item;
      });

      setPopupDataCopy(updated);
    }

    setShowPopup(false);
    setOrderPopUpValues([]);
  };

  const handlePopupClear = () => {
    setShowPopup(false);
    setPopupDataCopy([]);
  };

  const tabs = [
    { id: 1, label: title },
    { id: 2, label: subTitle },
  ];

  const tabs1 = [
    { id: 1, label: "SizeDetails", param: "SizeDetails" },
    { id: 4, label: "Combo/Color Details", param: "Combo/Color Details" },
    { id: 5, label: "Shipment Details", param: "Shipment Details" },
  ];

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
            news={OrderEntry_New}
            saves={OrderEntry_Save}
            deletes={OrderEntry_Delete}
            searches={OrderEntry_Search}
            prints={OrderEntry_Prints}
            treebutton={OrderEntry_New}
            globalsearch={OrderEntry_New}
            login={OrderEntry_New}
            changepassword={OrderEntry_New}
            changeskin={OrderEntry_New}
            contact={OrderEntry_New}
            pdf={OrderEntry_New}
            imports={OrderEntry_New}
            download={OrderEntry_New}
            userRights={userRights1}
            colorValue={colorValue}
            newButton={newButton}
            foreValue={foreValue}
            screenHeader="ORDER ENTRY"
          />

          <div className="container-fluid">
            <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />
            {/* <ul>
              {tabs.map((tab) => (
                <li key={tab.id} className="me-2">
                  <button
                    type="button"
                    className={newButton === tab.id ? "tabs active-tabs" : "tabs"}
                    onClick={() => TabIndexClick(tab.id, tab.param)}
                    style={{
                      backgroundColor: colorValue,
                      width: "100%",
                      padding: "1%",
                      fontWeight: "bold",
                    }}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul> */}
            <div className={newButton === 1 || newButton === 4 || newButton === 5 ? "content active-content" : "content"}>
              <div className="row">
                <div className="col-md-2">
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> FabType </label>
                    <select className="col-7 form-select" name="FabType" value={order.FabType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[1] = el)} onKeyDown={(e) => handleKeyDown(e, 1)}>
                      <option></option>
                      <option value={1}>Hoisery-1</option>
                      <option value={2}>Woven-2</option>
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> OrderDate </label>
                    <input type="date" className="col-7 form-control" name="OrderDate" value={order.OrderDate || ""} onChange={handleChange} ref={(el) => (inputRefs.current[5] = el)} onKeyDown={(e) => handleKeyDown(e, 5)} />
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> StyleRefNo </label>
                    <input type="text" className="col-7 form-control" name="StyleRefNo" value={order.StyleRefNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[9] = el)} onKeyDown={(e) => handleKeyDown(e, 9)} />
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> NoOfPcs </label>
                    <input type="text" className="col-7 form-control" name="NoOfPcs" value={order.NoOfPcs || ""} onChange={handleChange} ref={(el) => (inputRefs.current[13] = el)} onKeyDown={(e) => handleKeyDown(e, 13)} />
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> DutyType </label>
                    <select className="col-7 form-select" name="DutyType" value={order.DutyType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[17] = el)} onKeyDown={(e) => handleKeyDown(e, 17)}>
                      <option></option>
                      <option value={1}>DutyType-1</option>
                      <option value={2}>DutyType-2</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> Type </label>
                    <select className="col-5 form-select" name="Type" value={order.Type || ""} onChange={handleChange} ref={(el) => (inputRefs.current[2] = el)} onKeyDown={(e) => handleKeyDown(e, 2)}>
                      <option></option>
                      <option value={1}>FromEnq</option>
                      <option value={2}>Direct</option>
                    </select>
                    <select className="col-2 form-select" name="FinYear" value={order.FinYear} onChange={handleChange} ref={(el) => (inputRefs.current[2] = el)} onKeyDown={(e) => handleKeyDown(e, 2)}>
                      {finYearItems.map((year) => (
                        <option key={year.gtFinancialYearID} value={year.gtFinancialYearID}>
                          {" "}
                          {year.finYear}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> Buyer </label>
                    <select className="col-7 form-select" name="Buyer" value={order.Buyer || ""} onChange={handleChange} ref={(el) => (inputRefs.current[6] = el)} onKeyDown={(e) => handleKeyDown(e, 6)}>
                      <option></option>
                      {buyerItems.map((buyer) => (
                        <option key={buyer.id} value={buyer.asptblbuymasid}>
                          {buyer.buyercode}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> OrderQty </label>
                    <input type="text" className="col-7" name="OrderQty" value={5000 || ""} onChange={handleChange} ref={(el) => (inputRefs.current[10] = el)} onKeyDown={(e) => handleKeyDown(e, 10)} />
                  </div>

                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> ShipSystem </label>
                    <select className="col-7 form-select" name="ShipingSystem" value={order.ShipingSystem || ""} onChange={handleChange} ref={(el) => (inputRefs.current[14] = el)} onKeyDown={(e) => handleKeyDown(e, 14)}>
                      <option></option>
                      <option value={"C&F"}>C&F</option>
                      <option value={"FCA"}>FCA</option>
                      <option value={"FOB"}>FOB</option>
                      <option value={"LC"}>LC</option>
                    </select>
                  </div>

                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> LcExpDate </label>
                    <input type="date" className="col-7 form-control" name="LCExpDate" value={order.LCExpDate || ""} onChange={handleChange} ref={(el) => (inputRefs.current[18] = el)} onKeyDown={(e) => handleKeyDown(e, 18)} />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> OrderType </label>
                    <select className="col-7 form-select" name="OrderType" value={order.OrderType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[3] = el)} onKeyDown={(e) => handleKeyDown(e, 3)}>
                      <option></option>
                      <option value={"Order - 1"}>Order-1</option>
                      <option value={"Sample - 2"}>Sample-2</option>
                      <option value={"FabricOrder - 3"}>FabricOrder-3</option>
                      <option value={"PrePlan - 3"}>PrePlan-3</option>
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> BuyerAgent </label>
                    <select className="col-7 form-select" name="BuyerAgent" value={order.BuyerAgent || ""} onChange={handleChange} ref={(el) => (inputRefs.current[7] = el)} onKeyDown={(e) => handleKeyDown(e, 7)}>
                      <option></option>
                      {buyerAgent.map((agent) => (
                        <option key={agent.id} value={agent.asptblagemasid}>
                          {agent.agentName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> Uom </label>
                    <select className="col-7 form-select" name="Uom" value={order.Uom || ""} onChange={handleChange} ref={(el) => (inputRefs.current[11] = el)} onKeyDown={(e) => handleKeyDown(e, 11)}>
                      <option></option>
                      {UomItems.map((agent) => (
                        <option key={agent.asptbluommasid} value={agent.asptbluommasid}>
                          {agent.uom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> ShipMode </label>
                    <select className="col-7 form-select" name="ShipMode" value={order.ShipMode || ""} onChange={handleChange} ref={(el) => (inputRefs.current[15] = el)} onKeyDown={(e) => handleKeyDown(e, 15)}>
                      <option></option>
                      <option value={"AIR"}>AIR</option>
                      <option value={"SEA"}>SEA</option>
                      <option value={"SEA / AIR"}>SEA/AIR</option>
                      <option value={"ROAD"}>ROAD</option>
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> ExShipAllowed </label>
                    <select className="col-7 form-select" name="ExShipAllowed" value={order.ExShipAllowed || ""} onChange={handleChange} ref={(el) => (inputRefs.current[19] = el)} onKeyDown={(e) => handleKeyDown(e, 19)}>
                      <option></option>
                      <option value={"Yes"}>Yes</option>
                      <option value={"No"}>No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="row">
                    <label className="col-5 col-form-label"> OrderNo </label>
                    <input type="text" className="col-7 form-control" name="OrderNo" value={order.OrderNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[4] = el)} onKeyDown={(e) => handleKeyDown(e, 4)} />
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> ShipAgent </label>
                    <select className="col-7 form-select" name="ShipingAgent" value={order.ShipingAgent || ""} onChange={handleChange} ref={(el) => (inputRefs.current[8] = el)} onKeyDown={(e) => handleKeyDown(e, 8)}>
                      <option></option>
                      {buyerItems.map((buyer) => (
                        <option key={buyer.asptblbuymasid} value={buyer.asptblbuymasid}>
                          {buyer.buyingagent}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> OrderPackType </label>
                    <select className="col-7 form-select" name="OrderPackType" value={order.OrderPackType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[12] = el)} onKeyDown={(e) => handleKeyDown(e, 12)}>
                      <option></option>
                      {orderPackTypeItems.map((pack) => (
                        <option key={pack.asptblordpactypmasid} value={pack.asptblordpactypmasid}>
                          {pack.orderPackType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> PayTerm </label>
                    <select className="col-7 form-select" name="PayTerms" value={order.PayTerms || ""} onChange={handleChange} ref={(el) => (inputRefs.current[16] = el)} onKeyDown={(e) => handleKeyDown(e, 16)}>
                      <option></option>
                      {payTermItems.map((term) => (
                        <option key={term.asptblpaytermasid} value={term.asptblpaytermasid}>
                          {term.payTerm}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row pt-1">
                    <label className="col-5 col-form-label"> UnAsstAlllowed </label>
                    <select className="col-7 form-select" name="UnAssortAllowed" value={order.UnAssortAllowed || ""} onChange={handleChange} ref={(el) => (inputRefs.current[20] = el)} onKeyDown={(e) => handleKeyDown(e, 20)}>
                      <option></option>
                      <option value={"Yes"}>Yes</option>
                      <option value={"No"}>No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-1">
                  <div style={{ padding: "0px", border: "1px solid var(--bs-white)", alignItems: "right" }}>
                    <ImageUploader images={garimages} setImage={setGarImage} name="OrdLogo" value={order.OrdLogo} defaultimage={defaultimage} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 pt-1">
                    <div className="row">
                      <label className="col-2 col-form-label"> Merchandiser </label>
                      <select className="col-4 form-select" name="Merchandiser" value={order.Merchandiser || ""} onChange={handleChange} ref={(el) => (inputRefs.current[21] = el)} onKeyDown={(e) => handleKeyDown(e, 21)}>
                        <option></option>
                        {styleCategoryItems.map((item) => (
                          <option key={item.asptblstycatmasid} value={item.asptblstycatmasid}>
                            {item.stylecategory}
                          </option>
                        ))}
                      </select>
                      <label className="col-2 col-form-label"> Follower </label>
                      <select className="col-4 form-select" name="Follower" value={order.Follower || ""} onChange={handleChange} ref={(el) => (inputRefs.current[22] = el)} onKeyDown={(e) => handleKeyDown(e, 22)}>
                        <option></option>
                        {styleCategoryItems.map((item) => (
                          <option key={item.asptblstycatmasid} value={item.asptblstycatmasid}>
                            {item.stylecategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 pt-1">
                    <div className="row">
                      <label className="col-2 col-form-label"> AsstMerch </label>
                      <select className="col-4 form-select" name="AsstMerch" value={order.AsstMerch || ""} onChange={handleChange} ref={(el) => (inputRefs.current[23] = el)} onKeyDown={(e) => handleKeyDown(e, 23)}>
                        <option></option>
                        {colorItems.map((item, i) => (
                          <option key={i} value={item.asptblcolmasid}>
                            {item.colorname}
                          </option>
                        ))}
                      </select>

                      <label className="col-2"> Currency </label>
                      <select className="col-4 form-select" name="Currency" value={order.Currency || ""} onChange={handleChange} ref={(el) => (inputRefs.current[24] = el)} onKeyDown={(e) => handleKeyDown(e, 24)}>
                        <option></option>
                        {currencyItems.map((item) => (
                          <option key={item.asptblcurmasid} value={item.asptblcurmasid}>
                            {item.currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 pt-1">
                    <div className="row">
                      <label className="col-2 col-form-label"> CunCrrentValue </label>
                      <select className="col-4 form-select" name="CunCrrentValue" value={order.CunCrrentValue || ""} onChange={handleChange} ref={(el) => (inputRefs.current[25] = el)} onKeyDown={(e) => handleKeyDown(e, 25)}>
                        <option></option>
                        {currencyItems.map((item) => (
                          <option key={item.asptblcurmasid} value={item.asptblcurmasid}>
                            {item.symbol}
                          </option>
                        ))}
                      </select>

                      <label className="col-2 col-form-label"> SizeTemplate </label>
                      <select className="col-4 form-select" name="SizeTemplate" value={order.SizeTemplate || ""} onChange={handleChange} ref={(el) => (inputRefs.current[26] = el)} onKeyDown={(e) => handleKeyDown(e, 26)}>
                        <option></option>
                        {items?.map((item, i) => (
                          <option key={i} value={item.asptblsizgrpid}>
                            {item.sizegroup}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 pt-1">
                    {" "}
                    <div className="row">
                      <label className="col-2 col-form-label">SampleNo</label>

                      <select className="col-10 m-0 form-select" name="SampleNo" value={order.SampleNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[27] = el)} onKeyDown={(e) => handleKeyDown(e, 27)}>
                        <option></option>

                        <option value="SampleNo - 1">SampleNo-1</option>

                        <option value="SampleNo - 2">SampleNo-2</option>
                      </select>
                    </div>
                  </div>
                  <div className="row pt-1">
                    <label className="col-md-1 col-form-label">SplCategory</label>
                    <div className="col-md-8 p-0">
                      <MultiSelect
                        className="w-100 p-0"
                        name="SplCategory"
                        colorValue={colorValue}
                        styleGroupItems={styleGroupItems}
                        selectedOptions={order.CategorySelected || []}
                        setSelectedOptions={setOrder}
                        handleChange={handleChange}
                        labelField="stylegroup"
                        valueField="asptblstygrpmasid"
                      />
                    </div>
                    <label className="col-1 col-form-label">Active</label>
                    <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" className="col-md-1" name="Active" checked={active} onChange={handleChange} />
                      <span></span>
                      <i className="indicator"></i>
                    </label>
                  </div>
                </div>

                <div className="row pt-1">
                  <TabNav tabs={tabs1} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 5)} />
                  {/* <ul>
                    {tabs1.map((tab) => (
                      <li className="ps-2" key={tab.id}>
                        <button
                          type="button"
                          className={newButton === 1 ? "tabs active-tabs btn" : "tabs"}
                          onClick={() => TabIndexClick(tab.id, tab.param)}
                          style={{
                            backgroundColor: colorValue,
                            width: "100%",
                            padding: "1%",
                            fontWeight: "bold",
                          }}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul> */}

                  <div className="content-tabs">
                    <div className={newButton === 1 ? "content active-content" : "content"}>
                      <div className="row animate-zoom">
                        <div className="table-responsive">
                          <div className="table-responsive" style={{ maxHeight: "400px", width: "35%" }}>
                            <table className="table table-bordered table-sm align-middle mb-0">
                              <thead style={{ backgroundColor: colorValue, color: foreValue }}>
                                <tr>
                                  {orderSizeHeaders
                                    .filter((col) => col.visible) // ✅ boolean check
                                    .map((col) => (
                                      <th
                                        key={col.field}
                                        style={{
                                          width: col.width,
                                          fontFamily: "Roboto",
                                          fontSize: "var(--bs-font-sm)",
                                          backgroundColor: colorValue,
                                          color: foreValue,
                                        }}
                                        className="p-2"
                                      >
                                        {col.label}
                                      </th>
                                    ))}
                                </tr>
                              </thead>
                              <tbody>
                                {orderSizeValues.map((row, RowIndex) => (
                                  <tr key={RowIndex}>
                                    {orderSizeHeaders
                                      .filter((col) => col.visible)
                                      .map((col, colIndex) => {
                                        const value = row[col.field] || "";
                                        if (col.field === "SNo") {
                                          return (
                                            <td key={colIndex} className="text-center p-0" style={{ width: col.widths, disabled: col.disabled }}>
                                              {RowIndex + 1}
                                            </td>
                                          );
                                        }
                                        // TEXT
                                        if (col.type === "text") {
                                          return (
                                            <td key={colIndex} className="p-0" style={{ width: col.widths }}>
                                              <input type="text" className="w-100" style={{ padding: "4px" }} value={value} disabled={col.disabled} onChange={(e) => handleSizeChange(RowIndex, col.field, e.target.value)} />
                                            </td>
                                          );
                                        }

                                        // SELECT
                                        if (col.type === "select") {
                                          return (
                                            <td key={colIndex} className="p-0" style={{ width: col.widths }}>
                                              <select className="w-100 no-arrow" style={{ padding: "5px" }} value={row.asptblsizmasid} name={col.field} disabled={col.disabled} onChange={(e) => handleSizeChange(RowIndex, col.field, e.target.value)}>
                                                <option value=""></option>
                                                {sizeItems?.map((item, i) => (
                                                  <option key={i} value={item.asptblsizmasid}>
                                                    {item.sizename}
                                                  </option>
                                                ))}
                                                {/* <option key={RowIndex} value={row.asptblsizmasid}>
                                              {row.sizename}
                                            </option> */}
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
                    </div>
                    <div className={newButton === 4 ? "content active-content" : "content"}>
                      <div className="row animate-zoom">
                        <div className="table-responsive">
                          <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}>
                            <table className="table table-bordered table-sm align-middle mb-0" id="orderTable">
                              <thead style={{ backgroundColor: colorValue, color: foreValue, position: "sticky" }}>
                                <tr>
                                  {orderComboHeaders
                                    .filter((col) => col.visible)
                                    .map((col) => (
                                      <th
                                        key={col.field}
                                        style={{
                                          width: col.widths,
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
                                {orderOrdValues.map((row, RowIndex) => (
                                  <tr key={RowIndex} style={{ margin: "0", padding: "0" }} onContextMenu={(e) => handleRightClick(e, row, RowIndex)}>
                                    {orderComboHeaders
                                      .filter((col) => col.visible)
                                      .map((col, colIndex) => {
                                        const value = row[col.field] || "";
                                        const tcols = orderComboHeaders.filter((c) => c.visible).length;
                                        const tabIndexValue = RowIndex * tcols + colIndex + 1;
                                        const commonStyle = { width: col.widths, padding: 0, margin: 0 };
                                        // S.No
                                        if (col.field === "sNo") {
                                          return (
                                            <td key={colIndex} className="text-center p-0" style={{ commonStyle }}>
                                              <input type="text" className="w-100" style={{ padding: "4px" }} value={RowIndex + 1} disabled={col.disabled} onChange={(e) => handleComboChange(RowIndex, col.field, e.target.value)} />
                                            </td>
                                          );
                                        }
                                        // YES / NO
                                        if (col.type === "selectYN") {
                                          return (
                                            <td key={colIndex} className="p-0" style={{ commonStyle }}>
                                              <select
                                                className="w-100 p-2 form-select"
                                                value={value}
                                                name={col.field}
                                                onChange={(e) => handleComboChange(RowIndex, col.field, e.target.value)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#orderTable");
                                                }}
                                              >
                                                <option value=""></option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                              </select>
                                            </td>
                                          );
                                        }

                                        // TEXT
                                        if (col.type === "text") {
                                          return (
                                            <td key={colIndex} className="p-0" style={{ commonStyle }}>
                                              <input
                                                type="text"
                                                className="w-100 p-1 form-control"
                                                value={value}
                                                readOnly={dis === "No" && col.field === "ratio"}
                                                onChange={(e) => handleComboChange(RowIndex, col.field, e.target.value)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#orderTable");
                                                }}
                                              />
                                            </td>
                                          );
                                        }

                                        // DATE
                                        if (col.type === "date") {
                                          return (
                                            <td key={colIndex} className="p-0" style={{ commonStyle }}>
                                              <input
                                                type="date"
                                                className="w-100 form-control"
                                                style={{ paddingBottom: "3px" }}
                                                value={value}
                                                onChange={(e) => handleComboChange(RowIndex, col.field, e.target.value)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#orderTable");
                                                }}
                                              />
                                            </td>
                                          );
                                        }
                                        if (col.type === "select") {
                                          let options = [];

                                          if (col.field === "styleGroup" || col.field === "bPono") {
                                            options = styleGroupitem;
                                          } else if (col.field === "color") {
                                            options = colorItems;
                                          } else if (col.field === "combo") {
                                            options = comboItems;
                                          }

                                          return (
                                            <td key={colIndex} className="p-0" style={{ commonStyle }}>
                                              <select
                                                className="w-100 p-2 form-select"
                                                value={value}
                                                name={col.field}
                                                onChange={(e) => handleComboChange(RowIndex, col.field, e.target.value)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#orderTable");
                                                }}
                                              >
                                                <option value=""></option>
                                                {options.map((item, i) => (
                                                  <option key={i} value={item.asptblstyleitemmasid || item.asptblcolmasid || item.asptblcolmasid}>
                                                    {item.stylegroup || item.colorname || item.colorname}
                                                  </option>
                                                ))}
                                              </select>
                                            </td>
                                          );
                                        }

                                        // IMAGE
                                        if (col.type === "img") {
                                          return (
                                            <td key={colIndex} className="text-center p-0" style={{ commonStyle }}>
                                              <img
                                                src={imagebutton}
                                                alt="edit"
                                                tabIndex={0}
                                                className="p-0 m-0"
                                                style={{ height: "20px" }}
                                                onClick={() => handleStyleDetails(row, RowIndex)}
                                                onKeyDown={(e) => {
                                                  if (e.key === "Enter") {
                                                    handleStyleDetails(row, RowIndex);
                                                  }
                                                }}
                                                // onKeyDown={(e) => {
                                                //   handleEnterFocus(e, "#orderTable");
                                                // }}
                                              ></img>
                                            </td>
                                          );
                                        }
                                        if (col.type === "button") {
                                          return (
                                            <td key={colIndex} style={{ commonStyle }}>
                                              <button
                                                style={{ width: 0, margin: "0", padding: "0" }}
                                                disabled={col.disabled}
                                                onFocus={() => handleAddRow(RowIndex)}
                                                onKeyDown={(e) => {
                                                  handleEnterFocus(e, "#orderTable");
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
                    <div className={newButton === 5 ? "content active-content" : "content"}>
                      <div className="row animate-zoom">
                        <div className="table-responsive">
                          <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}>
                            <table className="table table-bordered table-sm align-middle mb-0" id="shipTable">
                              <thead style={{ backgroundColor: colorValue, color: foreValue, position: "sticky" }}>
                                <tr>
                                  {orderShipHeaders
                                    .filter((col) => col.visible)
                                    .map((col) => (
                                      <th
                                        key={col.field}
                                        style={{
                                          width: col.widths,
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
                                {ordeShiValues.map((row, RowIndex) => (
                                  <tr key={RowIndex}>
                                    {orderShipHeaders
                                      .filter((col) => col.visible)
                                      .map((col, colIndex) => {
                                        const value = row[col.field] || "";
                                        const tcols = orderShipHeaders.filter((c) => c.visible).length;
                                        const tabIndexValue = RowIndex * tcols + colIndex + 1;
                                        const commonStyle = { width: col.widths, padding: 0, margin: 0, fontFamily: "Roboto", fontSize: "var(--bs-font-sm)" };
                                        // TEXT
                                        if (col.type === "text") {
                                          return (
                                            <td key={colIndex} className="text-center p-0" style={{ commonStyle }}>
                                              <input
                                                type="text"
                                                className="w-100 p-1 form-control"
                                                style={{ padding: "4px" }}
                                                value={value}
                                                disabled={col.disabled}
                                                onChange={(e) => handleShipChange(RowIndex, col.field, e.target.value)}
                                                onKeyDown={(e) => handleEnterFocus(e, "#shipTable")}
                                              />
                                            </td>
                                          );
                                        }

                                        // DATE
                                        if (col.type === "date") {
                                          return (
                                            <td key={colIndex} className="p-0" style={{ commonStyle }}>
                                              <input
                                                type="date"
                                                className="w-100 form-control"
                                                style={{ paddingBottom: "3px" }}
                                                value={value}
                                                onChange={(e) => handleShipChange(RowIndex, col.field, e.target.value)}
                                                onKeyDown={(e) => handleEnterFocus(e, "#shipTable")}
                                              />
                                            </td>
                                          );
                                        }

                                        // SELECT

                                        if (col.type === "select") {
                                          let options = [];
                                          // assortNo,bPoNo,portofLoading,destination,destinationPort,combo,color
                                          if (col.field === "assortNo") {
                                            options = styleItems;
                                          } else if (col.field === "bPoNo") {
                                            options = sizeItems;
                                          } else if (col.field === "portofLoading") {
                                            options = sizeItems;
                                          } else if (col.field === "destination") {
                                            options = sizeItems;
                                          } else if (col.field === "destinationPort") {
                                            options = sizeItems;
                                          } else if (col.field === "combo") {
                                            options = sizeItems;
                                          } else if (col.field === "color") {
                                            options = sizeItems;
                                          }

                                          return (
                                            <td key={colIndex} className="p-0" style={{ commonStyle }}>
                                              <select className="w-100 p-2 form-select" value={value} onChange={(e) => handleShipChange(RowIndex, col.field, e.target.value)} onKeyDown={(e) => handleEnterFocus(e, "#shipTable")}>
                                                <option value=""></option>
                                                <option value="1">Option 1</option>
                                                <option value="2">Option 2</option>
                                              </select>
                                            </td>
                                          );
                                        }

                                        // BUTTON
                                        if (col.type === "button") {
                                          return (
                                            <td key={colIndex} className="text-center p-0" style={{ commonStyle }}>
                                              <button src={imagebutton} style={{ width: 0, margin: "0", padding: "0" }} onFocus={() => handleShipAddRow(RowIndex)} onKeyDown={(e) => handleEnterFocus(e, "#shipTable")}></button>
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

                <Popup
                  show={showPopup}
                  onClose={() => setShowPopup(false)}
                  title="Style Details"
                  foreValue={foreValue}
                  colorValue={colorValue}
                  popupDataCopy={popupDataCopy}
                  setPopupDataCopy={setPopupDataCopy}
                  handlePopupPopulate={handlePopupPopulate}
                  handlePopupSave={handlePopupSave}
                  handlePopupClear={handlePopupClear}
                >
                  <div className="row animate-zoom" style={{ height: "300px" }}>
                    <div className="table-responsive">
                      <div className="table-responsive" style={{ maxHeight: "300px", overflow: "auto" }}>
                        <table className="table table-bordered table-sm align-middle mb-0 " id="popUpTable">
                          <thead style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, position: "sticky" }}>
                            <tr>
                              {orderPopUpHeaders
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
                            {orderPopUpValues.map((row, RowIndex) => (
                              <tr key={RowIndex}>
                                {orderPopUpHeaders
                                  .filter((col) => col.visible)
                                  .map((col, colIndex) => {
                                    const value = row[col.field] || "";
                                    const scols = orderPopUpHeaders.filter((c) => c.visible).length;
                                    const tabIndexValue = RowIndex * scols + colIndex + 1;
                                    if (col.field === "sNo") {
                                      return (
                                        <td key={colIndex} className="text-center p-0" style={{ width: col.widths, margin: "0", padding: "0", disabled: col.disabled }}>
                                          <input
                                            type={col.type}
                                            className="w-100"
                                            style={{ padding: "4px" }}
                                            value={RowIndex + 1}
                                            disabled={col.disabled}
                                            onChange={(e) => handlePopupChange(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#popUpTable");
                                            }}
                                          />
                                        </td>
                                      );
                                    }
                                    if (col.field === "rowIndex") {
                                      return (
                                        <td key={colIndex} className="text-center p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                          <input
                                            type="text"
                                            className="w-100"
                                            style={{ padding: "4px" }}
                                            value={value}
                                            disabled={col.disabled}
                                            onChange={(e) => handlePopupChange(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#popUpTable");
                                            }}
                                          />
                                        </td>
                                      );
                                    }
                                    // SELECT
                                    if (col.type === "select") {
                                      let options = [];

                                      if (col.field === "styleitem") {
                                        options = styleItems;
                                      } else if (col.field === "sizename") {
                                        options = sizeItems;
                                      }

                                      return (
                                        <td key={colIndex} className="p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                          <select
                                            className="w-100 p-1"
                                            disabled={col.disabled}
                                            value={row.asptblsizmasid}
                                            onChange={(e) => handlePopupChange(e, RowIndex, col.field)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#popUpTable");
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

                                    return (
                                      <td key={colIndex} className="p-0" style={{ width: col.widths, margin: "0", padding: "0px" }}>
                                        <input
                                          type={col.type}
                                          className="w-100"
                                          disabled={col.disabled}
                                          style={{ padding: "4px" }}
                                          value={value}
                                          onChange={(e) => handlePopupChange(e, RowIndex, col.field)}
                                          onKeyDown={(e) => {
                                            handleEnterFocus(e, "#popUpTable");
                                          }}
                                        />
                                      </td>
                                    );
                                  })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Popup>
              </div>
            </div>
            <div className={newButton === 2 ? "content active-content" : "content"}>
              <div className="row">
                <Search
                  colorValue={colorValue}
                  searchs={orderEntry_Search}
                  setsearchs={setOrderEntrySearch}
                  SearchLable1={searchLable1}
                  SearchLable2={searchLable2}
                  SearchLable3={searchLable3}
                  stylecolor={foreValue}
                  handleChange={handleChange}
                  ChangeValues={order}
                  searchCompCode={searchCompCode}
                  searchUserName={searchUserName}
                />
                {!fetchError && newButton === 2 ? (
                  <>
                    <DataTable
                      heights={heights}
                      colorValue={colorValue}
                      headers={OrderEntryColumn}
                      comments={orderEntryItem}
                      setComments={setOrderEntryItem}
                      searches={orderEntry_Search}
                      setSearches={setOrderEntrySearch}
                      foreValue={foreValue}
                      totalItems={totalItems}
                      setTotalItems={setTotalItems}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      sorting={sorting}
                      setSorting={setSorting}
                      ITEM_PER_PAGE={ITEM_PER_PAGE}
                      EditData={OrderEntryCheck}
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

export default OrderEntry;
