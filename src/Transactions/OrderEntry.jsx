import React, { useContext, useEffect, useState } from "react";
import { utilityState } from "../utilityState";
import { useRef } from "react";
import DataContext from "../context/CreateUserContext";
import axios from "axios";
import { toast } from "react-toastify";

const OrderEntry = ({ title, subTitle }) => {
  const {
    API_URL,
    newButton,
    setFetchError,
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
  } = useContext(DataContext);
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const [order, setOrder] = useState([]);
  const [userRights1, setUserRights1] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [res1] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`)]);
        setUserRights1(res1.data);
      } catch (error) {
        setFetchError(error);
        toast.error(error);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    utilityState(e, setOrder);
  };
  const OrderEntry_New = () => {
    setOrder({});
    setNewButton(1);
  };
  const OrderEntry_Save = () => {
    setNewButton(1);
    alert(JSON.stringify(order));
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

  const buttons = [
    { label: "News", key: "news", action: OrderEntry_New },
    { label: "Save", key: "saves", action: OrderEntry_Save },
    { label: "Delete", key: "deletes", action: OrderEntry_Delete },
    { label: "Search", key: "searche", action: OrderEntry_Search },
    { label: "Prints", key: "prints", action: OrderEntry_Prints },
    { label: "TreeButton", key: "treebutton", action: OrderEntry_New },
    { label: "Globalsearch", key: "globalsearch", action: OrderEntry_New },
    { label: "Login", key: "login", action: OrderEntry_New },
    { label: "Changepassword", key: "changepassword", action: OrderEntry_New },
    { label: "Changeskin", key: "changeskin", action: OrderEntry_New },
    { label: "Contact", key: "contact", action: OrderEntry_New },
    { label: "Pdf", key: "pdf", action: OrderEntry_New },
    { label: "Import", key: "imports", action: OrderEntry_New },
    { label: "Download", key: "download", action: OrderEntry_New },
  ];

  const fields = [
    { label: "FabType", name: "FabType", type: "select" },
    { label: "Type", name: "Type", type: "select" },
    { label: "OrderType", name: "OrderType", type: "select" },
    { label: "OrderNo", name: "OrderNo", type: "text" },

    { label: "OrderDate", name: "OrderDate", type: "date" },
    { label: "Buyer", name: "Buyer", type: "select" },
    { label: "BuyingAgent", name: "BuyingAgent", type: "select" },
    { label: "ShipAgent", name: "ShipAgent", type: "select" },

    { label: "StyleRefNo", name: "StyleRefNo", type: "text" },
    { label: "OrderQty", name: "OrderQty", type: "text" },
    { label: "Uom", name: "Uom", type: "select" },
    { label: "OrderPackType", name: "OrderPackType", type: "select" },

    { label: "NoOfPcs", name: "NoOfPcs", type: "text" },
    { label: "ShipSystem", name: "ShipSystem", type: "select" },
    { label: "ShipMode", name: "ShipMode", type: "select" },
    { label: "PayTerm", name: "PayTerm", type: "select" },

    { label: "DutyType", name: "DutyType", type: "select" },
    { label: "LCExpDate", name: "LCExpDate", type: "date" },
    { label: "ExShipAllowed", name: "ExShipAllowed", type: "select" },
    { label: "UnAsstAlllowed", name: "UnAsstAlllowed", type: "select" },
  ];

  const cols = 4;
  const inputRefs = useRef([]);

  const focusField = (i) => {
    if (inputRefs.current[i]) {
      inputRefs.current[i].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    //e.preventDefault();
    switch (e.key) {
      case "Enter":
      case "ArrowRight":
        focusField(index + 1);
        break;
      case "ArrowLeft":
        focusField(index - 1);
        break;
      case "ArrowDown":
        focusField(index + cols);
        break;
      case "ArrowUp":
        focusField(index - cols);
        break;
      default:
        break;
    }
  };

  const TabIndexClick = async (inx) => {
    setNewButton(inx);
  };

  return (
    <div className="container-fluid">
      {userRights1.length >= 1 && (
        <div className="row">
          <ul className="boxShadow" style={{ display: "flex", justifyContent: "flex-end", margin: "0 0 5px 0", flexWrap: "wrap", gap: "5px" }}>
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
          </ul>

          <div className="col-md-12">
            <div className="row  pt-1">
              <div className="col-md-2">
                <div className="row pt-1">
                  <label className="col-5"> FabType </label>
                  <select className="col-7" name="FabType" value={order.FabType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[1] = el)} onKeyDown={(e) => handleKeyDown(e, 1)}>
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
                    <option value={1}>Buyer-1</option>
                    <option value={2}>Buyer-2</option>
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
                    <option value={1}>C&F</option>
                    <option value={2}>FCA</option>
                    <option value={3}>FOB</option>
                    <option value={4}>LC</option>
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
                    <option value={1}>Order-1</option>
                    <option value={2}>Sample-2</option>
                    <option value={3}>FabricOrder-3</option>
                    <option value={4}>PrePlan-3</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-4"> BuyingAgent </label>
                  <select className="col-8" name="BuyingAgent" value={order.BuyingAgent || ""} onChange={handleChange} ref={(el) => (inputRefs.current[7] = el)} onKeyDown={(e) => handleKeyDown(e, 7)}>
                    <option></option>
                    <option value={1}>BuyingAgent-1</option>
                    <option value={2}>BuyingAgent-2</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> Uom </label>
                  <select className="col-md-8" name="Uom" value={order.Uom || ""} onChange={handleChange} ref={(el) => (inputRefs.current[11] = el)} onKeyDown={(e) => handleKeyDown(e, 11)}>
                    <option></option>
                    <option value={1}>Uom-1</option>
                    <option value={2}>Uom-2</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> ShipMode </label>
                  <select className="col-md-8" name="ShipMode" value={order.ShipMode || ""} onChange={handleChange} ref={(el) => (inputRefs.current[15] = el)} onKeyDown={(e) => handleKeyDown(e, 15)}>
                    <option></option>
                    <option value={1}>AIR</option>
                    <option value={2}>SEA</option>
                    <option value={3}>SEA/AIR</option>
                    <option value={4}>ROAD</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> ExShipAllowed </label>
                  <select className="col-md-8" name="ExShipAllowed" value={order.ExShipAllowed || ""} onChange={handleChange} ref={(el) => (inputRefs.current[19] = el)} onKeyDown={(e) => handleKeyDown(e, 19)}>
                    <option></option>
                    <option value={1}>Yes-1</option>
                    <option value={2}>No-2</option>
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
                    <option value={1}>ShipAgent-1</option>
                    <option value={2}>ShipAgent-2</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-5"> OrderPackType </label>
                  <select className="col-7" name="OrderPackType" value={order.OrderPackType || ""} onChange={handleChange} ref={(el) => (inputRefs.current[12] = el)} onKeyDown={(e) => handleKeyDown(e, 12)}>
                    <option></option>
                    <option value={1}>OrderPackType-1</option>
                    <option value={2}>OrderPackType-2</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-5"> PayTerm </label>
                  <select className="col-7" name="PayTerm" value={order.PayTerm || ""} onChange={handleChange} ref={(el) => (inputRefs.current[16] = el)} onKeyDown={(e) => handleKeyDown(e, 16)}>
                    <option></option>
                    <option value={1}>PayTerm-1</option>
                    <option value={2}>PayTerm-2</option>
                  </select>
                </div>
                <div className="row pt-1">
                  <label className="col-md-5"> UnAsstAlllowed </label>
                  <select className="col-md-7" name="UnAsstAlllowed" value={order.UnAsstAlllowed || ""} onChange={handleChange} ref={(el) => (inputRefs.current[20] = el)} onKeyDown={(e) => handleKeyDown(e, 20)}>
                    <option></option>
                    <option value={1}>Yes-1</option>
                    <option value={2}>No-2</option>
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
                <select className="col-md-8" name="Merchandiser" value={order.Merchandiser || ""} onChange={handleChange} ref={(el) => (inputRefs.current[21] = el)} onKeyDown={(e) => handleKeyDown(e, 21)}>
                  <option></option>
                  <option value={1}>Merchandiser-1</option>
                  <option value={2}>Merchandiser-2</option>
                </select>
              </div>
              <div className="col-md-3 ">
                <label className="col-md-4"> Follower </label>
                <select className="col-md-8" name="Follower" value={order.Follower || ""} onChange={handleChange} ref={(el) => (inputRefs.current[22] = el)} onKeyDown={(e) => handleKeyDown(e, 22)}>
                  <option></option>
                  <option value={1}>Follower-1</option>
                  <option value={2}>Follower-2</option>
                </select>
              </div>
              <div className="col-md-6 pt-1">
                <div className="row">
                  <label className="col-md-2"> AsstMerch </label>
                  <select className="col-md-4" name="AsstMerchandiser" value={order.AsstMerchandiser || ""} onChange={handleChange} ref={(el) => (inputRefs.current[23] = el)} onKeyDown={(e) => handleKeyDown(e, 23)}>
                    <option></option>
                    <option value={1}>AsstMerchandiser-1</option>
                    <option value={2}>AsstMerchandiser-2</option>
                  </select>

                  <label className="col-md-2"> Currency </label>
                  <select className="col-md-4" name="Currency" value={order.Currency || ""} onChange={handleChange} ref={(el) => (inputRefs.current[24] = el)} onKeyDown={(e) => handleKeyDown(e, 24)}>
                    <option></option>
                    <option value={1}>Currency-1</option>
                    <option value={2}>Currency-2</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <label className="col-md-4"> CunCrrentValue </label>
                <select className="col-md-8" name="CunCrrentValue" value={order.CunCrrentValue || ""} onChange={handleChange} ref={(el) => (inputRefs.current[25] = el)} onKeyDown={(e) => handleKeyDown(e, 25)}>
                  <option></option>
                  <option value={1}>CunCrrentValue-1</option>
                  <option value={2}>CunCrrentValue-2</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="col-md-4"> Merchandiser </label>
                <select className="col-md-8" name="SizeTemplate" value={order.SizeTemplate || ""} onChange={handleChange} ref={(el) => (inputRefs.current[26] = el)} onKeyDown={(e) => handleKeyDown(e, 26)}>
                  <option></option>
                  <option value={1}>SizeTemplate-1</option>
                  <option value={2}>SizeTemplate-2</option>
                </select>
              </div>
              <div className="col-md-6 pt-1">
                <div className="row">
                  <label className="col-md-2"> SampleNo </label>
                  <select className="col-md-2" name="SampleNo" value={order.SampleNo || ""} onChange={handleChange} ref={(el) => (inputRefs.current[27] = el)} onKeyDown={(e) => handleKeyDown(e, 27)}>
                    <option></option>
                    <option value={1}>SampleNo-1</option>
                    <option value={2}>SampleNo-2</option>
                  </select>

                  <label className="col-md-2"> SplCategory </label>
                  <select className="col-md-6" name="SpecialCategory" value={order.SpecialCategory || ""} onChange={handleChange} ref={(el) => (inputRefs.current[28] = el)} onKeyDown={(e) => handleKeyDown(e, 28)}>
                    <option></option>
                    <option value={1}>SplCategory-1</option>
                    <option value={2}>SplCategory-2</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row pt-2">
              <ul className="" style={{ backgroundColor: `${colorValue}` }}>
                <li className="ps-2">
                  {" "}
                  <button className={newButton === 1 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor: `${colorValue}`, width: "100%", padding: "1%", fontWeight: "bold" }}>
                    Order Size Details{" "}
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
                  <div className="row animate-zoom">Order Size Details</div>
                </div>
                <div className={newButton === 2 ? "content active-content" : "content"}>
                  <div className="row animate-zoom">Order Combo Details</div>
                </div>
                <div className={newButton === 3 ? "content active-content" : "content"}>
                  <div className="row animate-zoom">Shipment Details</div>
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
