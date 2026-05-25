import React, { useContext, useEffect, useState } from "react";
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
  } = useContext(DataContext);
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const insert_update = `${API_URL}/SizeGroupMasters`;
  const SizeParam = `${API_URL}/SizeMasters`;
  const StyleGroupParam = `${API_URL}/StyleGroupMasters`;
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
  const [order, setOrder] = useState([]);
  const [userRights1, setUserRights1] = useState([]);
  const [items, setItems] = useState([]);
  const [sizeItems, setSizeItems] = useState([]);
  const [colorItems, setColorItems] = useState([]);
  const [comboItems, setComboItems] = useState([]);

  const [styleGroupItems, setStyleGroupItems] = useState([]);
  const [orderSizeValues, setOrderSizeValues] = useState([{ AsptblOrdSizid: "", AsptblOrdid: "", Sizename: "", BuyerPrice: "", Notes: "" }]);
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
  useEffect(() => {
    const loadData = async () => {
      try {
        const [userRes, sizeGroupRes, sizeRes, styleGroupRes, colorRes, comboRes, buyerRes, agentRes, uomRes, orderPackTypeRes, payTermRes, currencyRes, styleCategoryRes, styleitemRes] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(insert_update),
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
      } catch (error) {
        setFetchError(error);
        toast.error(error);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const finalValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value;
    setOrder((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    if (name === "Sizegroup") SizeGropupMaster_Check(value);
  };

  const OrderEntry_New = () => {
    setOrder({});
    setNewButton(1);
  };
  const OrderEntry_Save = () => {
    setNewButton(1);
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

    let nextRow = tr.rowIndex;
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

      case "ArrowDown":
        e.preventDefault();
        focusField(index + cols);
        break;

      case "ArrowUp":
        e.preventDefault();
        focusField(index - cols);
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
    values.splice(contextMenu.index, 0, { AsptblOrdSizid: "", AsptblOrdid: "", Sizename: "", BuyerPrice: "", Notes: "" });

    setOrderSizeValues(values);
    closeMenu();
  };

  const handleInsertAfter = () => {
    if (contextMenu.index == null) return;

    const values = [...orderSizeValues];
    values.splice(contextMenu.index + 1, 0, { AsptblOrdSizid: "", AsptblOrdid: "", Sizename: "", BuyerPrice: "", Notes: "" });

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
        AsptblOrdSizid: "",
        AsptblOrdid: "",
        Sizename: "",
        BuyerPrice: "",
        Notes: "",
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
        var res = await axios.get(`${insert_update}/${id}`);
        setPopupDataCopy([]);
        setOrderSizeValues(res?.data);
      }
    } catch (err) {
      toast.error(err.response);
    } finally {
      setNewButton(1);
    }
  };

  const orderSizeHeaders = [
    { field: "sNo", label: "SNo", visible: true, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "asptblOrdSizid", label: "AsptblOrdSizid", type: "text", visible: false, widths: "50px", pattern: "", disabled: true },
    { field: "asptblOrdid", label: "AsptblOrdid", visible: false, type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "sizename", label: "SizeName", visible: true, type: "select", widths: "250px", pattern: "", disabled: true },
    { field: "buyerPrice", label: "BuyerPrice", visible: true, type: "text", widths: "250px", pattern: "", disabled: false },
    { field: "notes", label: "Notes", visible: true, type: "text", widths: "50px", pattern: "", disabled: false },
  ];

  const [orderOrdValues, setOrderOrdValues] = useState([
    {
      sNo: "",
      AsptblOrdDetailsid: "",
      AsptblOrdid: "",
      StyleGroup: "",
      BPono: "",
      BPoDate: "",
      Combo: "",
      Color: "",
      RatioYN: "",
      Ratio: "",
      Ratio: "",
      ColorQty: "",
      TotalQty: "",
      StyleDetails: "",
      Notes: "",
    },
  ]);

  const orderComboHeaders = [
    { field: "sNo", label: "S.No", visible: true, type: "text", widths: "50px", disabled: true, pattern: "" },
    { field: "asptblOrdDetid", label: "ID", visible: false, type: "text", disabled: false, widths: "50px", pattern: "" },
    { field: "AsptblOrdid", label: "OrderID", visible: false, type: "text", disabled: false, widths: "50px", disabled: true, pattern: "" },
    { field: "StyleGroup", label: "StyleGroup", visible: true, type: "select", widths: "250px", disabled: false, pattern: "" },
    { field: "BPono", label: "BPono", visible: true, type: "select", widths: "250px", disabled: false, pattern: "" },
    { field: "BPoDate", label: "Date", visible: true, type: "date", widths: "150px", disabled: false, pattern: "" },
    { field: "Combo", label: "Combo", visible: true, type: "select", widths: "350px", disabled: false, pattern: "" },
    { field: "Color", label: "Color", visible: true, type: "select", widths: "350px", disabled: false, pattern: "" },
    { field: "RatioYN", label: "RatioY/N", visible: true, type: "selectYN", widths: "50px", disabled: false, pattern: "" },
    { field: "Ratio", label: "Ratio", visible: true, type: "text", widths: "50px", disabled: false, pattern: "" },
    { field: "ColorQty", label: "ColorQty", visible: true, type: "text", widths: "50px", disabled: false, pattern: "" },
    { field: "TotalQty", label: "TotalQty", visible: true, type: "text", widths: "50px", disabled: false, pattern: "" },
    { field: "StyleDetails", label: "Det", visible: true, type: "img", widths: "10px", disabled: false, pattern: "" },
    { field: "Notes", label: "Notes", visible: true, type: "text", widths: "20px", disabled: false, pattern: "" },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px", disabled: false },
  ];

  const orderPopUpHeaders = [
    { field: "sNo", label: "SNo", visible: true, type: "text", widths: "20px", disabled: true },
    { field: "rowIndex", label: "Row", visible: false, type: "text", widths: "10px", disabled: true },
    { field: "asptblOrdPopid", label: "asptblPopUpOrdid", visible: false, type: "text", widths: "50px", disabled: true },
    { field: "AsptblOrdSizid", label: "AsptblOrdSizid", visible: false, type: "text", widths: "50px", disabled: true },
    { field: "AsptblOrdid", label: "AsptblOrdid", visible: false, type: "text", widths: "50px", disabled: true },
    { field: "Styleitem", label: "Styleitem", visible: true, type: "select", widths: "250px", disabled: true },
    { field: "Sizename", label: "SizeName", visible: true, type: "select", widths: "80px", disabled: true },
    { field: "AssortQty", label: "AssortQty", visible: true, type: "text", widths: "50px", disabled: false },
    { field: "ShipQty", label: "ShipQty", visible: true, type: "text", widths: "50px", disabled: true },
    { field: "ExcessQty", label: "ExcessQty", visible: true, type: "text", widths: "50px", disabled: false },
    { field: "ProdQty", label: "ProdQty", visible: true, type: "text", widths: "50px", disabled: true },
    { field: "Notes", label: "Notes", visible: true, type: "text", widths: "30px", disabled: false },
  ];

  const orderShipHeaders = [
    { field: "SNo", label: "S.No", visible: true, type: "text", widths: "50px", disabled: true },
    { field: "AsptblOrdShiId", label: "ID", visible: false, type: "text", widths: "50px" },
    { field: "AsptblOrdId", label: "OrderID", visible: false, type: "text", widths: "50px" },
    { field: "AssortNo", label: "AssortNo", visible: true, type: "select", widths: "100px" },
    { field: "DelDate", label: "Act Del Date", visible: true, type: "date", widths: "120px" },
    { field: "BPoNo", label: "BPoNo", visible: true, type: "select", widths: "150px" },
    { field: "PortofLoading", label: "PortofLoading", visible: true, type: "select", widths: "250px" },
    { field: "Destination", label: "Destination", visible: true, type: "select", widths: "250px" },
    { field: "DestinationPort", label: "DestinationPort", visible: true, type: "select", widths: "250px" },
    { field: "Combo", label: "Combo", visible: true, type: "select", widths: "220px" },
    { field: "Color", label: "Color", visible: true, type: "select", widths: "220px" },
    { field: "ShipQty", label: "ShipQty", visible: true, type: "text", widths: "100px" },
    { field: "Notes", label: "Notes", visible: true, type: "text", widths: "0px" },
    { field: "Action", label: "", visible: true, type: "button", widths: "0px" },
  ];

  const [ordeShiValues, setOrdeShiValues] = useState([
    {
      SNo: 1,
      AsptblOrdShiId: "",
      AsptblOrdId: "",
      AssortNo: "",
      DelDate: "",
      BPoNo: "",
      PortofLoading: "",
      Destination: "",
      DestinationPort: "",
      Combo: "",
      Color: "",
      ShipQty: "",
      Notes: "",
    },
  ]);

  const handleShipChange = (rowIndex, field, value) => {
    const updated = [...ordeShiValues];
    updated[rowIndex][field] = value;
    setOrdeShiValues(updated);
  };

  const handleShipAddRow = () => {
    setOrdeShiValues([
      ...ordeShiValues,
      {
        SNo: ordeShiValues.length + 1,
        AsptblOrdShiId: "",
        AsptblOrdId: "",
        AssortNo: "",
        DelDate: "",
        BPoNo: "",
        PortofLoading: "",
        Destination: "",
        DestinationPort: "",
        Combo: "",
        Color: "",
        ShipQty: "",
        Notes: "",
      },
    ]);
  };

  const [popupData, setPopupData] = useState([]);
  const [assort, setAssort] = useState([]);
  const [assort1, setAssort1] = useState([]);

  const handlePopupChange = (e, rowIndex, field) => {
    const value = e.target.value;
    const updated = [...popupData];
    let totalAssort = 0;
    const currentOrder = orderOrdValues[sequence - 1];
    const Ratio_YN = currentOrder.RatioYN;
    const Total_Qty = Number(currentOrder.TotalQty || 0);
    const Ratio_ = Ratio_YN === "Yes" ? Number(currentOrder.Ratio || 0) : Total_Qty;
    updated[rowIndex][field] = value;
    // ASSORT QTY
    if (field === "AssortQty") {
      let shipqty = Ratio_YN === "Yes" ? (Total_Qty * Number(value || 0)) / Ratio_ : Number(value || 0);
      shipqty = Math.round(shipqty);
      updated[rowIndex]["ShipQty"] = shipqty;

      let totalShipQty = 0;
      for (let i = 0; i <= rowIndex; i++) {
        totalAssort += Number(updated[i].AssortQty || 0);
        totalShipQty += Number(updated[i].ShipQty || 0);
        if (totalAssort > Ratio_) {
          toast.info("Exces Ratio Qty Not Allowed");
          return;
        }
      }

      // Auto balance next row
      if (rowIndex < updated.length - 1) {
        if (totalAssort > Ratio_) {
          toast.info("Exces Ratio Qty Not Allowed");
          return;
        } else {
          updated[rowIndex + 1]["AssortQty"] = Ratio_ - totalAssort;

          updated[rowIndex + 1]["ShipQty"] = Ratio_YN === "Yes" ? Total_Qty - totalShipQty : Total_Qty - totalAssort;
        }
      }
      setAssort([totalAssort]);
      setAssort1([shipqty]);
    }
    // EXCESS QTY
    if (field === "ExcessQty") {
      const prodqty = (updated[rowIndex]["ShipQty"] * Number(value || 0)) / 100;
      updated[rowIndex]["ProdQty"] = Math.round(updated[rowIndex]["ShipQty"] + prodqty);
      updated[rowIndex]["ExcessQty"] = value;
    }

    setPopupData(updated);
  };

  const [showModal, setShowModal] = useState(false);

  const handleAddRow = (index) => {
    const newRow = {
      sNo: "",
      asptblOrdDetailsid: "",
      AsptblOrdid: "",
      StyleGroup: "",
      BPono: "",
      BPoDate: "",
      Combo: "",
      Color: "",
      RatioYN: "",
      Ratio: "",
      ColorQty: "",
      TotalQty: "",
      StyleDetails: "",
      Notes: "",
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
      AsptblPopUpOrdid: Number(i) + 2,
      AsptblOrdSizid: Number(i) + 2,
      AsptblOrdid: Number(i) + 2,
      Styleitem: row.StyleGroup,
      Sizename: item.sizename,
      AssortQty: "",
      ShipQty: "",
      ExcessQty: "",
      ProdQty: "",
      Notes: "",
    };
  };

  const handleStyleDetails = (row, rowIndex) => {
    const finid = Number(rowIndex) + 1;

    if (popupDataCopy.length >= 1) {
      const filteredData = popupDataCopy.filter((item) => item.rowIndex === finid);

      if (filteredData.length >= 1) {
        setSquence(finid);
        setPopupData(filteredData);
        setShowPopup(true);
      } else {
        const seq = finid;

        setSquence(seq);
        setPopupData([]);

        const newrow = orderSizeValues.map((item, i) => {
          if (i === 0) {
            return {
              sNo: Number(i) + 1,
              rowIndex: seq,
              AsptblPopUpOrdid: "0",
              AsptblOrdSizid: "0",
              AsptblOrdid: "0",
              Styleitem: row.StyleGroup,
              Sizename: item.sizename,
              AssortQty: row.RatioYN === "Yes" ? row.Ratio : row.TotalQty,
              ShipQty: row.RatioYN === "Yes" ? row.TotalQty : 0,
              ExcessQty: "",
              ProdQty: "",
              Notes: "",
            };
          }
          return handleAssortQty(item, row, i, seq);
        });

        setPopupData((prev) => [...prev, ...newrow]);
        setShowPopup(true);
      }
    } else {
      const seq = finid;

      setSquence(seq);
      setPopupData([]);

      const newrow = orderSizeValues.map((item, i) => {
        if (i === 0) {
          return {
            sNo: Number(i) + 1,
            rowIndex: seq,
            AsptblPopUpOrdid: "0",
            AsptblOrdSizid: "0",
            AsptblOrdid: "0",
            Styleitem: row.StyleGroup,
            Sizename: item.sizename,
            AssortQty: row.RatioYN === "Yes" ? row.Ratio : row.TotalQty,
            ShipQty: row.RatioYN === "Yes" ? row.TotalQty : 0,
            ExcessQty: "",
            ProdQty: "",
            Notes: "",
          };
        }

        return handleAssortQty(item, row, i, seq);
      });

      setPopupData((prev) => [...prev, ...newrow]);

      setShowPopup(true);
    }
  };

  const handlePopupPopulate = () => {
    setShowPopup(true);
    setPopupData([]);
    const finid = Number(sequence);

    if (orderSizeValues.length >= 1) {
      const finid = Number(sequence);
      const filteredData = popupDataCopy.filter((item) => item.rowIndex === finid);
      if (filteredData.length >= 1) {
        setPopupData(filteredData);
      }
    } else {
      toast.error("Invalid Row");
    }
  };

  const handlePopupSave = () => {
    const finid = Number(sequence);
    // VALIDATION
    const hasEmpty = popupData.some((item) => !item.AssortQty || Number(item.AssortQty) <= 0);

    const totalShipQty = popupData.reduce((sum, item) => sum + Number(item.ShipQty || 0), 0);

    const totalQty = Number(orderOrdValues[finid - 1]?.TotalQty || 0);

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
      setPopupDataCopy((prev) => [...prev, ...popupData]);
    } else {
      // UPDATE EXISTING
      const updated = popupDataCopy.map((item) => {
        if (item.rowIndex === finid) {
          return popupData.find((p) => p.AsptblPopUpOrdid === item.AsptblPopUpOrdid) || item;
        }

        return item;
      });

      setPopupDataCopy(updated);
    }

    setShowPopup(false);
    setPopupData([]);
  };

  const handlePopupClear = () => {
    setShowPopup(false);
    setPopupDataCopy([]);
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState([]);

  return (
    <div className="container-fluid">
      {userRights1.length >= 1 && (
        <div className="row" style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>
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
          />

          <div className="col-md-12">
            <div className="row  pt-1">
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
                  <label className="col-4 col-form-label"> Type </label>
                  <select className="col-8" name="Type" value={order.Type || ""} onChange={handleChange} ref={(el) => (inputRefs.current[2] = el)} onKeyDown={(e) => handleKeyDown(e, 2)}>
                    <option></option>
                    <option value={1}>FromEnq</option>
                    <option value={2}>Direct</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4 col-form-label"> Buyer </label>
                  <select className="col-8 form-select" name="Buyer" value={order.Buyer || ""} onChange={handleChange} ref={(el) => (inputRefs.current[6] = el)} onKeyDown={(e) => handleKeyDown(e, 6)}>
                    <option></option>
                    {buyerItems.map((buyer) => (
                      <option key={buyer.id} value={buyer.asptblbuymasid}>
                        {buyer.buyercode}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4 col-form-label"> OrderQty </label>
                  <input type="text" className="col-8" name="OrderQty" value={5000 || ""} onChange={handleChange} ref={(el) => (inputRefs.current[10] = el)} onKeyDown={(e) => handleKeyDown(e, 10)} />
                </div>

                <div className="row pt-1">
                  <label className="col-4 col-form-label"> ShipSystem </label>
                  <select className="col-8 form-select" name="ShipSystem" value={order.ShipSystem || ""} onChange={handleChange} ref={(el) => (inputRefs.current[14] = el)} onKeyDown={(e) => handleKeyDown(e, 14)}>
                    <option></option>
                    <option value={"C&F"}>C&F</option>
                    <option value={"FCA"}>FCA</option>
                    <option value={"FOB"}>FOB</option>
                    <option value={"LC"}>LC</option>
                  </select>
                </div>

                <div className="row pt-1">
                  <label className="col-4 col-form-label"> LcExpDate </label>
                  <input type="text" className="col-8 form-control" name="LCExpDate" value={order.LCExpDate || ""} onChange={handleChange} ref={(el) => (inputRefs.current[18] = el)} onKeyDown={(e) => handleKeyDown(e, 18)} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="row pt-1">
                  <label className="col-4 col-form-label"> OrderType </label>
                  <select className="col-8 form-select" name="OrderType" value={order.OrderType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[3] = el)} onKeyDown={(e) => handleKeyDown(e, 3)}>
                    <option></option>
                    <option value={"Order - 1"}>Order-1</option>
                    <option value={"Sample - 2"}>Sample-2</option>
                    <option value={"FabricOrder - 3"}>FabricOrder-3</option>
                    <option value={"PrePlan - 3"}>PrePlan-3</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4 col-form-label"> BuyingAgent </label>
                  <select className="col-8 form-select" name="BuyingAgent" value={order.BuyingAgent || ""} onChange={handleChange} ref={(el) => (inputRefs.current[7] = el)} onKeyDown={(e) => handleKeyDown(e, 7)}>
                    <option></option>
                    {buyerAgent.map((agent) => (
                      <option key={agent.id} value={agent.asptblagemasid}>
                        {agent.agentName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4 col-form-label"> Uom </label>
                  <select className="col-8 form-select" name="Uom" value={order.Uom || ""} onChange={handleChange} ref={(el) => (inputRefs.current[11] = el)} onKeyDown={(e) => handleKeyDown(e, 11)}>
                    <option></option>
                    {UomItems.map((agent) => (
                      <option key={agent.asptbluommasid} value={agent.asptbluommasid}>
                        {agent.uom}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4 col-form-label"> ShipMode </label>
                  <select className="col-8 form-select" name="ShipMode" value={order.ShipMode || ""} onChange={handleChange} ref={(el) => (inputRefs.current[15] = el)} onKeyDown={(e) => handleKeyDown(e, 15)}>
                    <option></option>
                    <option value={"AIR"}>AIR</option>
                    <option value={"SEA"}>SEA</option>
                    <option value={"SEA / AIR"}>SEA/AIR</option>
                    <option value={"ROAD"}>ROAD</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4 col-form-label"> ExShipAllowed </label>
                  <select className="col-8 form-select" name="ExShipAllowed" value={order.ExShipAllowed || ""} onChange={handleChange} ref={(el) => (inputRefs.current[19] = el)} onKeyDown={(e) => handleKeyDown(e, 19)}>
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
                  <select className="col-7 form-select" name="ShipAgent" value={order.ShipAgent || ""} onChange={handleChange} ref={(el) => (inputRefs.current[8] = el)} onKeyDown={(e) => handleKeyDown(e, 8)}>
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
                  <select className="col-7 form-select" name="PayTerm" value={order.PayTerm || ""} onChange={handleChange} ref={(el) => (inputRefs.current[16] = el)} onKeyDown={(e) => handleKeyDown(e, 16)}>
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
                  <select className="col-7 form-select" name="UnAsstAlllowed" value={order.UnAsstAlllowed || ""} onChange={handleChange} ref={(el) => (inputRefs.current[20] = el)} onKeyDown={(e) => handleKeyDown(e, 20)}>
                    <option></option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-1">
                <div style={{ padding: "0px", border: "1px solid var(--bs-white)", alignItems: "right" }}>
                  <img style={{ height: "70px", width: "70px", textAlign: "right" }} name="image" value={order.image} />
                  <input type="file" id="imageuploader" accept="image/" onChange={handleChange} className="form-control"></input>
                </div>
              </div>
              <div className="col-md-6 pt-1">
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
              <div className="col-md-6 pt-1">
                <div className="row">
                  <label className="col-2 col-form-label"> AsstMerch </label>
                  <select className="col-4 form-select" name="AsstMerchandiser" value={order.AsstMerchandiser || ""} onChange={handleChange} ref={(el) => (inputRefs.current[23] = el)} onKeyDown={(e) => handleKeyDown(e, 23)}>
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
              <div className="col-md-6 pt-1">
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
                  <select className="col-4 form-select" name="Sizegroup" value={order.SizeGroup} onChange={handleChange} ref={(el) => (inputRefs.current[26] = el)} onKeyDown={(e) => handleKeyDown(e, 26)}>
                    <option></option>
                    {items?.map((item, i) => (
                      <option key={i} value={item.asptblsizgrpDetid}>
                        {item.sizegroup}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row pt-1">
                <label className="col-md-1 col-form-label">SampleNo</label>

                <div className="col-md-2">
                  <select className="form-select" name="SampleNo" value={order.SampleNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[27] = el)} onKeyDown={(e) => handleKeyDown(e, 27)}>
                    <option></option>

                    <option value="SampleNo - 1">SampleNo-1</option>

                    <option value="SampleNo - 2">SampleNo-2</option>
                  </select>
                </div>

                {/* SplCategory */}
                <label className="col-md-1 col-form-label">SplCategory</label>
                <div className="col-md-8">
                  <MultiSelect
                    className="w-100"
                    name="SplCategory"
                    colorValue={colorValue}
                    styleGroupItems={styleGroupItems}
                    value={order.SplCategory || []}
                    onChange={handleChange}
                    ref={(el) => (inputRefs.current[28] = el)}
                    onKeyDown={(e) => handleKeyDown(e, 28)}
                  />
                </div>
              </div>
            </div>
            <div className="row pt-1">
              <ul className="" style={{ backgroundColor: `${colorValue}` }}>
                <li className="ps-2">
                  <button className={newButton === 1 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor: `${colorValue}`, width: "100%", fontWeight: "bold" }}>
                    {" "}
                    Size Details{" "}
                  </button>
                </li>
                <li className="ps-2">
                  {" "}
                  <button className={newButton === 2 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(2)} style={{ backgroundColor: `${colorValue}`, width: "100%", fontWeight: "bold" }}>
                    {" "}
                    Combo Size Details{" "}
                  </button>
                </li>
                <li className="ps-2">
                  {" "}
                  <button className={newButton === 3 ? "tabs active-tabs btn" : "tabs "} onClick={() => TabIndexClick(3)} style={{ backgroundColor: `${colorValue}`, width: "100%", fontWeight: "bold" }}>
                    {" "}
                    Shipment Details{" "}
                  </button>
                </li>
              </ul>
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
                            {orderSizeValues.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {orderSizeHeaders
                                  .filter((col) => col.visible)
                                  .map((col, colIndex) => {
                                    const value = row[col.field] || "";

                                    if (col.field === "sNo") {
                                      return (
                                        <td key={colIndex} className="text-center p-0" style={{ width: col.widths, disabled: col.disabled }}>
                                          {rowIndex + 1}
                                        </td>
                                      );
                                    }
                                    // TEXT
                                    if (col.type === "text") {
                                      return (
                                        <td key={colIndex} className="p-0" style={{ width: col.widths }}>
                                          <input type="text" className="w-100" style={{ padding: "4px" }} value={value} disabled={col.disabled} onChange={(e) => handleSizeChange(rowIndex, col.field, e.target.value)} />
                                        </td>
                                      );
                                    }

                                    // SELECT
                                    if (col.type === "select") {
                                      return (
                                        <td key={colIndex} className="p-0" style={{ width: col.widths }}>
                                          <select className="w-100 no-arrow" style={{ padding: "5px" }} value={value} name={col.field} disabled={col.disabled} onChange={(e) => handleSizeChange(rowIndex, col.field, e.target.value)}>
                                            <option value=""></option>
                                            {sizeItems.map((item, i) => (
                                              <option key={i} value={item.asptblsizmasid}>
                                                {item.sizename}
                                              </option>
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
                </div>
                <div className={newButton === 2 ? "content active-content" : "content"}>
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
                            {orderOrdValues.map((row, rowIndex) => (
                              <tr key={rowIndex} style={{ margin: "0", padding: "0" }} onContextMenu={(e) => handleRightClick(e, row, rowIndex)}>
                                {orderComboHeaders
                                  .filter((col) => col.visible)
                                  .map((col, colIndex) => {
                                    const value = row[col.field] || "";
                                    const tcols = orderComboHeaders.filter((c) => c.visible).length;
                                    const tabIndexValue = rowIndex * tcols + colIndex + 1;
                                    const commonStyle = { width: col.widths, padding: 0, margin: 0 };
                                    // S.No
                                    if (col.field === "sNo") {
                                      return (
                                        <td key={colIndex} className="text-center p-0" style={{ commonStyle }}>
                                          <input type="text" className="w-100" style={{ padding: "4px" }} value={rowIndex + 1} disabled={col.disabled} onChange={(e) => handleComboChange(rowIndex, col.field, e.target.value)} />
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
                                            onChange={(e) => handleComboChange(rowIndex, col.field, e.target.value)}
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
                                            readOnly={dis === "No" && col.field === "Ratio"}
                                            onChange={(e) => handleComboChange(rowIndex, col.field, e.target.value)}
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
                                            onChange={(e) => handleComboChange(rowIndex, col.field, e.target.value)}
                                            onKeyDown={(e) => {
                                              handleEnterFocus(e, "#orderTable");
                                            }}
                                          />
                                        </td>
                                      );
                                    }
                                    if (col.type === "select") {
                                      let options = [];

                                      if (col.field === "StyleGroup" || col.field === "BPono") {
                                        options = styleGroupitem;
                                      } else if (col.field === "Color") {
                                        options = colorItems;
                                      } else if (col.field === "Combo") {
                                        options = comboItems;
                                      }

                                      return (
                                        <td key={colIndex} className="p-0" style={{ commonStyle }}>
                                          <select
                                            className="w-100 p-2 form-select"
                                            value={value}
                                            name={col.field}
                                            onChange={(e) => handleComboChange(rowIndex, col.field, e.target.value)}
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
                                            onClick={() => handleStyleDetails(row, rowIndex)}
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter") {
                                                handleStyleDetails(row, rowIndex);
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
                                            onFocus={() => handleAddRow(rowIndex)}
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
                <div className={newButton === 3 ? "content active-content" : "content"}>
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
                            {ordeShiValues.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {orderShipHeaders
                                  .filter((col) => col.visible)
                                  .map((col, colIndex) => {
                                    const value = row[col.field] || "";
                                    const tcols = orderShipHeaders.filter((c) => c.visible).length;
                                    const tabIndexValue = rowIndex * tcols + colIndex + 1;
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
                                            onChange={(e) => handleShipChange(rowIndex, col.field, e.target.value)}
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
                                            onChange={(e) => handleShipChange(rowIndex, col.field, e.target.value)}
                                            onKeyDown={(e) => handleEnterFocus(e, "#shipTable")}
                                          />
                                        </td>
                                      );
                                    }

                                    // SELECT
                                    if (col.type === "select") {
                                      return (
                                        <td key={colIndex} className="p-0" style={{ commonStyle }}>
                                          <select className="w-100 p-2 form-select" value={value} onChange={(e) => handleShipChange(rowIndex, col.field, e.target.value)} onKeyDown={(e) => handleEnterFocus(e, "#shipTable")}>
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
                                          <button src={imagebutton} style={{ width: 0, margin: "0", padding: "0" }} onFocus={() => handleShipAddRow(rowIndex)} onKeyDown={(e) => handleEnterFocus(e, "#shipTable")}></button>
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
          </div>

          {/* //----------- popup start */}
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
                      {popupData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {orderPopUpHeaders
                            .filter((col) => col.visible)
                            .map((col, colIndex) => {
                              const value = row[col.field] || "";
                              const scols = orderPopUpHeaders.filter((c) => c.visible).length;
                              const tabIndexValue = rowIndex * scols + colIndex + 1;
                              if (col.field === "sNo") {
                                return (
                                  <td key={colIndex} className="text-center p-0" style={{ width: col.widths, margin: "0", padding: "0", disabled: col.disabled }}>
                                    <input
                                      type={col.type}
                                      className="w-100"
                                      style={{ padding: "4px" }}
                                      value={rowIndex + 1}
                                      disabled={col.disabled}
                                      onChange={(e) => handlePopupChange(e, rowIndex, col.field)}
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
                                      onChange={(e) => handlePopupChange(e, rowIndex, col.field)}
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

                                if (col.field === "Styleitem") {
                                  options = styleItems;
                                } else if (col.field === "Sizename") {
                                  options = sizeItems;
                                }

                                return (
                                  <td key={colIndex} className="p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                    <select
                                      className="w-100 p-1"
                                      disabled={col.disabled}
                                      value={value}
                                      onChange={(e) => handlePopupChange(e, rowIndex, col.field)}
                                      onKeyDown={(e) => {
                                        handleEnterFocus(e, "#popUpTable");
                                      }}
                                    >
                                      <option value=""></option>
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
                                    onChange={(e) => handlePopupChange(e, rowIndex, col.field)}
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
          {/* 
          //------------ pop end */}
        </div>
      )}
    </div>
  );
};

export default OrderEntry;
