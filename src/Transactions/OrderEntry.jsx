import React, { useContext, useEffect, useState } from "react";
import { utilityState } from "../utilityState";
import { useRef } from "react";
import DataContext from "../context/CreateUserContext";
import axios from "axios";
import { toast } from "react-toastify";
import "../ContextMenu.css";
import ContextMenu from "../ContextMenu";
import ActionButtton from "../ActionButtton";

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
  useEffect(() => {
    const loadData = async () => {
      try {
        const [userRes, sizeGroupRes, sizeRes, styleGroupRes, colorRes, comboRes, buyerRes, agentRes, uomRes, orderPackTypeRes, payTermRes, currencyRes, styleCategoryRes] = await Promise.all([
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
    setNewButton(1);
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
  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case "Enter":
      case "Tab":
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

  const handleComboChange = (index, field, value) => {
    // setOrderOrdValues((prev) => prev.map((row, i) => (i === rowIndex ? { ...row, [field]: value } : row)));
    const updated = [...orderOrdValues];
    updated[index][field] = value;

    setOrderOrdValues(updated);
  };

  const SizeGropupMaster_Check = async (id) => {
    try {
      if (id !== "") {
        var res = await axios.get(`${insert_update}/${id}`);
        setOrderSizeValues(res?.data);
      }
    } catch (err) {
      toast.error(err.response);
    } finally {
      setNewButton(1);
    }
  };

  const orderSizeHeaders = [
    { field: "sNo", label: "SNo", visible: "true", type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "asptblOrdSizid", label: "AsptblOrdSizid", type: "text", visible: "true", widths: "50px", pattern: "", disabled: true },
    { field: "asptblOrdid", label: "AsptblOrdid", visible: "true", type: "text", widths: "50px", pattern: "", disabled: true },
    { field: "sizename", label: "SizeName", visible: "true", type: "select", widths: "250px", pattern: "", disabled: true },
    { field: "buyerPrice", label: "BuyerPrice", visible: "true", type: "text", widths: "250px", pattern: "", disabled: false },
    { field: "notes", label: "Notes", visible: "true", type: "text", widths: "50px", pattern: "", disabled: false },
  ];

  const [orderOrdValues, setOrderOrdValues] = useState([
    { sNo: "", AsptblOrdDetailsid: "", AsptblOrdid: "", StyleGroup: "", BPono: "", BPoDate: "", Combo: "", Color: "", RatioYN: "", Ratio: "", Ratio: "", ColorQty: "", TotalQty: "", StyleDetails: "", Notes: "" },
  ]);

  const orderComboHeaders = [
    { field: "sNo", label: "S.No", visible: "true", type: "text", widths: "50px", pattern: "" },
    { field: "asptblOrdDetailsid", label: "ID", visible: "true", type: "text", disabled: true, widths: "50px", pattern: "" },
    { field: "AsptblOrdid", label: "OrderID", visible: "true", type: "text", disabled: true, widths: "50px", pattern: "" },
    { field: "StyleGroup", label: "StyleGroup", visible: "true", type: "select", widths: "250px", pattern: "" },
    { field: "BPono", label: "BPono", visible: "true", type: "select", widths: "250px", pattern: "" },
    { field: "BPoDate", label: "Date", visible: "true", type: "date", widths: "150px", pattern: "" },
    { field: "Combo", label: "Combo", visible: "true", type: "select", widths: "350px", pattern: "" },
    { field: "Color", label: "Color", visible: "true", type: "select", widths: "350px", pattern: "" },
    { field: "RatioYN", label: "RatioY/N", visible: "true", type: "selectYN", widths: "50px", pattern: "" },
    { field: "Ratio", label: "Ratio", visible: "true", type: "text", widths: "50px", pattern: "" },
    { field: "ColorQty", label: "ColorQty", visible: "true", type: "text", widths: "50px", pattern: "" },
    { field: "TotalQty", label: "TotalQty", visible: "true", type: "text", widths: "50px", pattern: "" },
    { field: "StyleDetails", label: "StyleDetails", visible: "true", type: "selectYN", widths: "150px", pattern: "" },
    { field: "Notes", label: "Notes", visible: "true", type: "text", widths: "20px", pattern: "" },
    { field: "Action", label: "Add", visible: true, type: "button", width: "20px" },
    ,
  ];

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
          />

          {/* <ul className="boxShadow" style={{ display: "flex", justifyContent: "flex-end", margin: "0 0 5px 0", flexWrap: "wrap", gap: "5px" }}>
            {buttons.map((btn, index) => {
              const isVisible = userRights1?.[0]?.[btn.key] === "T";
              if (!isVisible) return null;
              return (
                <li key={index}>
                  <button type="button" className={newButton === index ? "tabs active-tabs" : "tabs"} style={{ backgroundColor: colorValue }} onClick={btn.action}>
                    {btn.label}
                  </button>
                </li>
              );
            })}
          </ul> */}

          <div className="col-md-12">
            <div className="row  pt-1">
              <div className="col-md-2">
                <div className="row pt-1">
                  <label className="col-5 form-select"> FabType </label>
                  <select className="col-7 form-select" name="FabType" value={order.FabType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[1] = el)} onKeyDown={(e) => handleKeyDown(e, 1)}>
                    <option></option>
                    <option value={1}>Hoisery-1</option>
                    <option value={2}>Woven-2</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-5"> OrderDate </label>
                  <input type="date" className="col-7" name="OrderDate" value={order.OrderDate || ""} onChange={handleChange} ref={(el) => (inputRefs.current[5] = el)} onKeyDown={(e) => handleKeyDown(e, 5)} />
                </div>
                <div className="row pt-1">
                  <label className="col-5"> StyleRefNo </label>
                  <input type="text" className="col-7" name="StyleRefNo" value={order.StyleRefNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[9] = el)} onKeyDown={(e) => handleKeyDown(e, 9)} />
                </div>
                <div className="row pt-1">
                  <label className="col-5"> NoOfPcs </label>
                  <input type="text" className="col-7" name="NoOfPcs" value={order.NoOfPcs || ""} onChange={handleChange} ref={(el) => (inputRefs.current[13] = el)} onKeyDown={(e) => handleKeyDown(e, 13)} />
                </div>
                <div className="row pt-1">
                  <label className="col-md-5"> DutyType </label>
                  <select className="col-md-7" name="DutyType" value={order.DutyType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[17] = el)} onKeyDown={(e) => handleKeyDown(e, 17)}>
                    <option></option>
                    <option value={1}>DutyType-1</option>
                    <option value={2}>DutyType-2</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="row pt-1">
                  <label className="col-4"> Type </label>
                  <select className="col-8" name="Type" value={order.Type || ""} onChange={handleChange} ref={(el) => (inputRefs.current[2] = el)} onKeyDown={(e) => handleKeyDown(e, 2)}>
                    <option></option>
                    <option value={1}>FromEnq</option>
                    <option value={2}>Direct</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4"> Buyer </label>
                  <select className="col-8" name="Buyer" value={order.Buyer || ""} onChange={handleChange} ref={(el) => (inputRefs.current[6] = el)} onKeyDown={(e) => handleKeyDown(e, 6)}>
                    <option></option>
                    {buyerItems.map((buyer) => (
                      <option key={buyer.id} value={buyer.asptblbuymasid}>
                        {buyer.buyercode}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4"> OrderQty </label>
                  <input type="text" className="col-8" name="OrderQty" value={order.OrderQty || ""} onChange={handleChange} ref={(el) => (inputRefs.current[10] = el)} onKeyDown={(e) => handleKeyDown(e, 10)} />
                </div>

                <div className="row pt-1">
                  <label className="col-md-4"> ShipSystem </label>
                  <select className="col-md-8" name="ShipSystem" value={order.ShipSystem || ""} onChange={handleChange} ref={(el) => (inputRefs.current[14] = el)} onKeyDown={(e) => handleKeyDown(e, 14)}>
                    <option></option>
                    <option value={"C&F"}>C&F</option>
                    <option value={"FCA"}>FCA</option>
                    <option value={"FOB"}>FOB</option>
                    <option value={"LC"}>LC</option>
                  </select>
                </div>

                <div className="row pt-1">
                  <label className="col-md-4"> LcExpDate </label>
                  <input type="text" className="col-md-8" name="LCExpDate" value={order.LCExpDate || ""} onChange={handleChange} ref={(el) => (inputRefs.current[18] = el)} onKeyDown={(e) => handleKeyDown(e, 18)} />
                </div>
              </div>
              <div className="col-md-3">
                <div className="row pt-1">
                  <label className="col-4"> OrderType </label>
                  <select className="col-8" name="OrderType" value={order.OrderType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[3] = el)} onKeyDown={(e) => handleKeyDown(e, 3)}>
                    <option></option>
                    <option value={"Order - 1"}>Order-1</option>
                    <option value={"Sample - 2"}>Sample-2</option>
                    <option value={"FabricOrder - 3"}>FabricOrder-3</option>
                    <option value={"PrePlan - 3"}>PrePlan-3</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4"> BuyingAgent </label>
                  <select className="col-8" name="BuyingAgent" value={order.BuyingAgent || ""} onChange={handleChange} ref={(el) => (inputRefs.current[7] = el)} onKeyDown={(e) => handleKeyDown(e, 7)}>
                    <option></option>
                    {buyerAgent.map((agent) => (
                      <option key={agent.id} value={agent.asptblagemasid}>
                        {agent.agentName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> Uom </label>
                  <select className="col-md-8" name="Uom" value={order.Uom || ""} onChange={handleChange} ref={(el) => (inputRefs.current[11] = el)} onKeyDown={(e) => handleKeyDown(e, 11)}>
                    <option></option>
                    {UomItems.map((agent) => (
                      <option key={agent.asptbluommasid} value={agent.asptbluommasid}>
                        {agent.uom}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> ShipMode </label>
                  <select className="col-md-8" name="ShipMode" value={order.ShipMode || ""} onChange={handleChange} ref={(el) => (inputRefs.current[15] = el)} onKeyDown={(e) => handleKeyDown(e, 15)}>
                    <option></option>
                    <option value={"AIR"}>AIR</option>
                    <option value={"SEA"}>SEA</option>
                    <option value={"SEA / AIR"}>SEA/AIR</option>
                    <option value={"ROAD"}>ROAD</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> ExShipAllowed </label>
                  <select className="col-md-8" name="ExShipAllowed" value={order.ExShipAllowed || ""} onChange={handleChange} ref={(el) => (inputRefs.current[19] = el)} onKeyDown={(e) => handleKeyDown(e, 19)}>
                    <option></option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="row">
                  <label className="col-5"> OrderNo </label>
                  <input type="text" className="col-7" name="OrderNo" value={order.OrderNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[4] = el)} onKeyDown={(e) => handleKeyDown(e, 4)} />
                </div>
                <div className="row pt-1">
                  <label className="col-5"> ShipAgent </label>
                  <select className="col-7" name="ShipAgent" value={order.ShipAgent || ""} onChange={handleChange} ref={(el) => (inputRefs.current[8] = el)} onKeyDown={(e) => handleKeyDown(e, 8)}>
                    <option></option>
                    {buyerItems.map((buyer) => (
                      <option key={buyer.asptblbuymasid} value={buyer.asptblbuymasid}>
                        {buyer.buyingagent}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-5"> OrderPackType </label>
                  <select className="col-7" name="OrderPackType" value={order.OrderPackType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[12] = el)} onKeyDown={(e) => handleKeyDown(e, 12)}>
                    <option></option>
                    {orderPackTypeItems.map((pack) => (
                      <option key={pack.asptblordpactypmasid} value={pack.asptblordpactypmasid}>
                        {pack.orderPackType}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-5"> PayTerm </label>
                  <select className="col-7" name="PayTerm" value={order.PayTerm || ""} onChange={handleChange} ref={(el) => (inputRefs.current[16] = el)} onKeyDown={(e) => handleKeyDown(e, 16)}>
                    <option></option>
                    {payTermItems.map((term) => (
                      <option key={term.asptblpaytermasid} value={term.asptblpaytermasid}>
                        {term.payTerm}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-md-5"> UnAsstAlllowed </label>
                  <select className="col-md-7" name="UnAsstAlllowed" value={order.UnAsstAlllowed || ""} onChange={handleChange} ref={(el) => (inputRefs.current[20] = el)} onKeyDown={(e) => handleKeyDown(e, 20)}>
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
              <div className="col-md-3 ">
                <label className="col-md-4"> Merchandiser </label>
                <select className="col-md-8 " name="Merchandiser" value={order.Merchandiser || ""} onChange={handleChange} ref={(el) => (inputRefs.current[21] = el)} onKeyDown={(e) => handleKeyDown(e, 21)}>
                  <option></option>
                  {styleCategoryItems.map((item) => (
                    <option key={item.asptblstycatmasid} value={item.asptblstycatmasid}>
                      {item.stylecategory}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 ">
                <label className="col-md-4"> Follower </label>
                <select className="col-md-8 " name="Follower" value={order.Follower || ""} onChange={handleChange} ref={(el) => (inputRefs.current[22] = el)} onKeyDown={(e) => handleKeyDown(e, 22)}>
                  <option></option>
                  {styleCategoryItems.map((item) => (
                    <option key={item.asptblstycatmasid} value={item.asptblstycatmasid}>
                      {item.stylecategory}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 pt-1">
                <div className="row">
                  <label className="col-md-2"> AsstMerch </label>
                  <select className="col-md-4 " name="AsstMerchandiser" value={order.AsstMerchandiser || ""} onChange={handleChange} ref={(el) => (inputRefs.current[23] = el)} onKeyDown={(e) => handleKeyDown(e, 23)}>
                    <option></option>
                    {colorItems.map((item, i) => (
                      <option key={i} value={item.asptblcolmasid}>
                        {item.colorname}
                      </option>
                    ))}
                  </select>

                  <label className="col-md-2"> Currency </label>
                  <select className="col-md-4 " name="Currency" value={order.Currency || ""} onChange={handleChange} ref={(el) => (inputRefs.current[24] = el)} onKeyDown={(e) => handleKeyDown(e, 24)}>
                    <option></option>
                    {currencyItems.map((item) => (
                      <option key={item.asptblcurmasid} value={item.asptblcurmasid}>
                        {item.currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <label className="col-md-4"> CunCrrentValue </label>
                <select className="col-md-8" name="CunCrrentValue" value={order.CunCrrentValue || ""} onChange={handleChange} ref={(el) => (inputRefs.current[25] = el)} onKeyDown={(e) => handleKeyDown(e, 25)}>
                  <option></option>
                  {currencyItems.map((item) => (
                    <option key={item.asptblcurmasid} value={item.asptblcurmasid}>
                      {item.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="col-md-4"> SizeTemplate </label>
                <select className="col-md-8" name="Sizegroup" value={order.Sizegroup || ""} onChange={handleChange} ref={(el) => (inputRefs.current[26] = el)} onKeyDown={(e) => handleKeyDown(e, 26)}>
                  <option></option>
                  {items?.map((item, i) => (
                    <option key={i} value={item.asptblsizgrpDetid}>
                      {item.sizegroup}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 pt-1">
                <div className="row">
                  <label className="col-md-2"> SampleNo </label>
                  <select className="col-md-2" name="SampleNo" value={order.SampleNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[27] = el)} onKeyDown={(e) => handleKeyDown(e, 27)}>
                    <option></option>
                    <option value={"SampleNo - 1"}>SampleNo-1</option>
                    <option value={"SampleNo - 2"}>SampleNo-2</option>
                  </select>

                  <label className="col-md-2"> SplCategory </label>
                  <select className="col-md-6" name="SpecialCategory" value={order.SpecialCategory || ""} onChange={handleChange} ref={(el) => (inputRefs.current[28] = el)} onKeyDown={(e) => handleKeyDown(e, 28)}>
                    <option></option>
                    {styleGroupItems.map((item, i) => (
                      <option key={i} value={item.asptblstycatmasid}>
                        {item.stylecategory}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row pt-2">
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
                      <div className="table-responsive" style={{ maxHeight: "400px", width: "30%" }}>
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

                                    if (col.field === "SNo") {
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
                      <div className="table-responsive" style={{ maxHeight: "400px" }}>
                        <table className="table table-bordered table-sm align-middle mb-0">
                          <thead style={{ backgroundColor: colorValue, color: foreValue }}>
                            <tr>
                              {orderComboHeaders
                                .filter((col) => col.visible)
                                .map((col) => (
                                  <th
                                    key={col.field}
                                    style={{
                                      width: col.width,
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

                                    // S.No
                                    if (col.field === "SNo") {
                                      return (
                                        <td key={colIndex} className="text-center p-0" style={{ width: col.width, margin: "0", padding: "0" }}>
                                          {rowIndex + 1}
                                        </td>
                                      );
                                    }

                                    // TEXT
                                    if (col.type === "text") {
                                      return (
                                        <td key={colIndex} className="p-0" style={{ width: col.width, margin: "0", padding: "0px" }}>
                                          <input type="text" className="w-100" style={{ padding: "4px" }} value={value} disabled={col.disabled} onChange={(e) => handleComboChange(rowIndex, col.field, e.target.value)} />
                                        </td>
                                      );
                                    }

                                    // DATE
                                    if (col.type === "date") {
                                      return (
                                        <td key={colIndex} className="p-0" style={{ width: col.width, margin: "0", padding: "0" }}>
                                          <input type="date" className="w-100" style={{ padding: "3px" }} value={value} onChange={(e) => handleComboChange(rowIndex, col.field, e.target.value)} />
                                        </td>
                                      );
                                    }

                                    // SELECT (DYNAMIC FIX)
                                    if (col.type === "select") {
                                      let options = [];

                                      if (col.field === "StyleGroup" || col.field === "BPono") {
                                        options = styleGroupItems;
                                      } else if (col.field === "Color") {
                                        options = colorItems;
                                      } else if (col.field === "Combo") {
                                        options = comboItems;
                                      }

                                      return (
                                        <td key={colIndex} className="p-0" style={{ width: col.widths, margin: "0", padding: "0" }}>
                                          <select className="w-100 p-1" value={value} name={col.field} onChange={(e) => handleComboChange(rowIndex, col.field, e.target.value)}>
                                            <option value=""></option>
                                            {options.map((item, i) => (
                                              <option key={i} value={item.asptblstygrpmasid || item.asptblcolmasid || item.asptblcolmasid}>
                                                {item.stylegroup || item.colorname || item.colorname}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                      );
                                    }

                                    // YES / NO
                                    if (col.type === "selectYN") {
                                      return (
                                        <td key={colIndex} className="p-0" style={{ width: col.width, margin: "0", padding: "0" }}>
                                          <select className="w-100 p-1" value={value} name={col.field} onChange={(e) => handleComboChange(rowIndex, col.field, e.target.value)}>
                                            <option value=""></option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                          </select>
                                        </td>
                                      );
                                    }
                                    if (col.type === "button") {
                                      return (
                                        <td key={colIndex} className="p-0 text-center" style={{ width: 0, margin: "0", padding: "0" }}>
                                          <button onFocus={() => handleAddRow(rowIndex)}>+</button>
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
                  <button className="row animate-zoom  button">Shipment Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderEntry;
