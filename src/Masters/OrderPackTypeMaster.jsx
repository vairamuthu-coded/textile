import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import { utilityState } from "../utilityState";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import Search from "../Custom/Search";

const OrderPackTypeMaster = ({ title, subTitle }) => {
  const { handleSubmit, API_URL, newButton, tabindex, currentPage, setCurrentPage, tablecheck, userRights, setUserRights, defaultDetails, foreValue, colorValue, searchLable1, searchLable2, searchLable3, mode, sorting, setSorting, setNewButton } =
    useContext(DataContext);
  let ITEM_PER_PAGE = 50;
  const OrderPackTypeMasters = API_URL + "/OrderPackTypeMasters";
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  let validcheck = true;
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const [orderPackTypeValues, setOrderPackTypes] = useState([]);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [orderPackType_FilterSearch, setOrderPackType_FilterSearch] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const HeadersColumn = [
    { headername: "ID", field: "asptblordpactypmasid" },
    { headername: "Order Pack Type", field: "orderPackType" },
    { headername: "NoOfPcs", field: "noOfPcs" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [userRes, ordRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(OrderPackTypeMasters)]);
        setUserRights(userRes?.data || []);
        setItems(ordRes?.data || []);
      } catch (error) {
        setFetchError(error);
        toast.error("API Error:", error);
      }
    };

    fetchApi();
  }, [defaultDetails.Compcode, defaultDetails.User, title]);

  useEffect(() => {
    const filterResult = items.filter((post) => post.orderPackType?.toLowerCase().includes(search));
    setOrderPackType_FilterSearch(filterResult.reverse());
  }, [items, search]);

  const handleChange = (e) => {
    utilityState(e, setOrderPackTypes);
  };

  const validate = (orderPackTypeValues) => {
    if (!orderPackTypeValues.orderPackType.trim()) {
      toast.error("Invalid Order Pack Type");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(orderPackTypeValues.orderPackType)) {
      toast.error("Special Character not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  };

  const OrderPackTypeMaster_Check = (id) => {
    try {
      const myitem = items.find((item) => item.asptblordpactypmasid === id.asptblordpactypmasid);

      if (!myitem) {
        setNewButton(1); // ensure UI state updates even if not found
        return;
      }

      setOrderPackTypes({
        asptblordpactypmasid: myitem.asptblordpactypmasid,
        orderPackType: myitem.orderPackType,
        noOfPcs: myitem.noOfPcs,
        active: myitem.active === "T",
      });
    } catch (err) {
      if (err.response) {
        setFetchError(err.response);
      } else {
        console.error("Unexpected error:", err);
      }
    } finally {
      setNewButton(1);
    }
  };

  const OrderPackTypeMaster_Save = async () => {
    try {
      const isUpdate = orderPackTypeValues.asptblordpactypmasid > 0;

      const payload = {
        asptblordpactypmasid: isUpdate ? orderPackTypeValues.asptblordpactypmasid : 0,
        orderPackType: orderPackTypeValues.orderPackType,
        noOfPcs: orderPackTypeValues.noOfPcs,
        active: orderPackTypeValues.active ? "T" : "F",
      };

      const response = await axios.post(OrderPackTypeMasters, payload);

      if (response.data) {
        // Refresh list
        const res = await axios.get(OrderPackTypeMasters);
        setItems(res.data);
        // Reset form
        OrderPackTypeMaster_New();
        // Success message
        toast.success(isUpdate ? "Updated Successfully" : "Record Saved Successfully");
      } else {
        toast.error("Error: Empty response from server");
      }
    } catch (err) {
      if (err.response) {
        setFetchError(err.response);
        toast.error("Error: " + err.response.data);
      } else {
        console.error(err);
        toast.error("Unexpected error occurred");
      }
    }
  };
  const OrderPackTypeMaster_Delete = async (id) => {
    try {
      if (id < 1) return;

      const response = await axios.delete(`${OrderPackTypeMasters}/${id}`);

      if (response.data) {
        // Update UI without extra API call
        const updatedItems = items.filter((x) => x.asptblordpactypmasid !== id);

        setItems(updatedItems);

        toast.success("Record Deleted Successfully");
        setNewButton(1);
      } else {
        toast.error("Error: Empty response from server");
      }
    } catch (err) {
      if (err.response) {
        setFetchError(err.response);
        toast.error("Error: " + err.response.data);
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  const inputref = useRef();

  const OrderPackTypeMaster_New = () => {
    setNewButton(1);
    setOrderPackTypes({});
  };
  const menuButtons = [
    { key: "news", label: "News", action: OrderPackTypeMaster_New },
    { key: "saves", label: "Save", action: OrderPackTypeMaster_Save },
    { key: "deletes", label: "Delete", action: OrderPackTypeMaster_Delete },
    { key: "searches", label: "Search", action: OrderPackTypeMaster_New },
    { key: "prints", label: "Prints", action: OrderPackTypeMaster_New },
    { key: "treebutton", label: "TreeButton", action: OrderPackTypeMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: OrderPackTypeMaster_New },
    { key: "login", label: "Login", action: OrderPackTypeMaster_New },
    { key: "changepassword", label: "Changepassword", action: OrderPackTypeMaster_New },
    { key: "changeskin", label: "Changeskin", action: OrderPackTypeMaster_New },
    { key: "contact", label: "Contact", action: OrderPackTypeMaster_New },
    { key: "pdf", label: "Pdf", action: OrderPackTypeMaster_New },
    { key: "import", label: "Import", action: OrderPackTypeMaster_New },
    { key: "download", label: "Download", action: OrderPackTypeMaster_New },
  ];
  const commentsData = useMemo(() => {
    let computedComments = items;
    if (search) {
      computedComments = computedComments.filter((item) => item.orderPackType?.toLowerCase().includes(search.toLowerCase()));
    }
    setTotalItems(computedComments.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [items, currentPage, search, sorting]);

  return (
    <div className="row animate-zoom ">
      {userRights.length > 0 && (
        <div className="col-md-12 pt-1">
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
            <div className="row pt-1" style={{ backgroundColor: `${foreValue}` }}>
              <div className="col-md-6">
                <div className="bloc-tabs">
                  <div className="tabs active-tabs" style={{ backgroundColor: `${colorValue}`, color: `${foreValue}` }}>
                    {" "}
                    {title}{" "}
                  </div>
                </div>
                <div className="row pt-1">
                  <label className="col-md-3"> ID </label>
                  <input className="col-md-3" type="text" name="asptblordpactypmasid" value={orderPackTypeValues.asptblordpactypmasid} />
                </div>
                <div className="row pt-1">
                  <label className="col-md-3"> Order Pack Type </label>
                  <input className="col-md-6" type="text" name="orderPackType" ref={inputref} onChange={handleChange} value={orderPackTypeValues.orderPackType} required />
                </div>
                <div className="row pt-1">
                  <label className="col-md-3"> No of Pcs </label>
                  <input className="col-md-3" type="text" name="noOfPcs" ref={inputref} onChange={handleChange} value={orderPackTypeValues.noOfPcs} required />
                </div>
                <div className="row">
                  <label className="col-md-2"> Active </label>
                  <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                    <input type="checkbox" name="active" checked={orderPackTypeValues.active} onChange={handleChange} />
                    <span></span>
                    <i className="indicator"></i>
                  </label>
                </div>
              </div>

              <div className="col-md-6 pt-1">
                <div className="row ">
                  <div className="row">
                    <Search
                      colorValue={""}
                      searchs={search}
                      setsearchs={setSearch}
                      SearchLable1={searchLable1}
                      SearchLable2={searchLable2}
                      stylecolor={colorValue}
                      SearchLable3={searchLable3}
                      handleChange={handleChange}
                      ChangeValues={orderPackTypeValues}
                      searchCompCode={searchCompCode}
                      searchUserName={searchUserName}
                    />
                    <DataTable
                      heights={heights}
                      colorValue={colorValue}
                      headers={HeadersColumn}
                      comments={items}
                      setComments={setItems}
                      foreValue={foreValue}
                      mode={mode}
                      searches={search}
                      setSearches={setSearch}
                      totalItems={totalItems}
                      setTotalItems={setTotalItems}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      sorting={sorting}
                      setSorting={setSorting}
                      ITEM_PER_PAGE={ITEM_PER_PAGE}
                      EditData={OrderPackTypeMaster_Check}
                      commentsData={commentsData}
                      setCheckchild={setCheckchild}
                      setCheckAll={setCheckAll}
                      checkall={checkall}
                      SearchLable1={searchLable1}
                      SearchLable2={searchLable2}
                      SearchLable3={searchLable3}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: `${userRights[0].readonlys === "F" ? "block" : "none"}` }}>
              <SocialMissing />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPackTypeMaster;
