import { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import { utilityState } from "../utilityState";
import { toast } from "react-toastify";
import Search from "../Custom/Search";

const PayTermMaster = ({ title, subTitle }) => {
  const { handleSubmit, API_URL, newButton, tabindex, currentPage, setCurrentPage, tablecheck, userRights, setUserRights, defaultDetails, foreValue, colorValue, searchLable1, searchLable2, searchLable3, mode, sorting, setSorting, setNewButton } =
    useContext(DataContext);
  const [paytermValues, setPayTermValues] = useState([]);
  let ITEM_PER_PAGE = 50;
  const PayTerms = API_URL + "/PayTermMasters";
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  let validcheck = true;
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [color_FilterSearch, setColor_FilterSearch] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const HeadersColumn = [
    { headername: "ID", field: "asptblpaytermasid" },
    { headername: "PayTerm", field: "payTerm" },
    { headername: "Noofdays", field: "noofDays" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";

  useEffect(() => {
    async function fetApi() {
      const [userRes, payRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(`${PayTerms}`)]);
      setUserRights(userRes.data.reverse());
      setItems(payRes.data);
    }

    fetApi();
  }, [defaultDetails.Compcode, defaultDetails.User, title]);

  useEffect(() => {
    const filterResult = items
      .filter((x) => x.payTerm?.toLowerCase().includes(search.toLowerCase()))
      .slice()
      .reverse();
    setColor_FilterSearch(filterResult);
  }, [items, search]);

  const handleChange = (e) => {
    utilityState(e, setPayTermValues);
  };

  const validate = (paytermValues) => {
    // Pay Term validation
    if (!paytermValues.payTerm || !paytermValues.payTerm.trim()) {
      toast.error("Invalid Pay Term");
      return false;
    }

    // Allow only letters + numbers + spaces
    if (!/^[a-zA-Z0-9\s]+$/.test(paytermValues.payTerm)) {
      toast.error("Pay Term should not contain special characters");
      return false;
    }

    // No of Days validation
    if (!paytermValues.noofDays || paytermValues.noofDays.toString().trim() === "") {
      toast.error("Invalid No of Days");
      return false;
    }

    const days = Number(paytermValues.noofDays);

    if (isNaN(days)) {
      toast.error("No of Days must be a number");
      return false;
    }

    // Optional: range validation
    if (days <= 0 || days > 3650) {
      toast.error("No of Days should be between 1 and 3650");
      return false;
    }

    return true;
  };
  const PayTermMaster_Check = (id) => {
    const myitem = items.find((item) => item.asptblpaytermasid === id.asptblpaytermasid);

    if (!myitem) {
      toast.error("Item not found");
      return;
    }

    setPayTermValues({
      asptblpaytermasid: myitem.asptblpaytermasid,
      payTerm: myitem.payTerm,
      noofDays: myitem.noofDays,
      active: myitem.active === "T",
    });

    setNewButton(1);
  };

  const PayTermMaster_Save = async () => {
    try {
      // ✅ validation (important)
      if (!validate(paytermValues)) return;

      const ColorData = {
        asptblpaytermasid: paytermValues.asptblpaytermasid > 0 ? paytermValues.asptblpaytermasid : 0,
        payterm: paytermValues.payTerm, // ✅ consistent naming
        noofdays: paytermValues.noofDays, // ✅ consistent naming
        active: paytermValues.active ? "T" : "F",
      };

      const response = await axios.post(`${PayTerms}`, ColorData);

      if (response.data !== "") {
        const res = await axios.get(`${PayTerms}`);
        setItems(res.data);
        setPayTermValues({});
        toast.success("Saved successfully ✅");
      } else {
        toast.error("Error " + response.data);
      }
    } catch (err) {
      if (err.response) {
        setFetchError(err.response);
      }
      toast.error("Error " + err.message);
    } finally {
      setNewButton(2);
    }
  };

  const PayTermMaster_Delete = async (id) => {
    if (!id) {
      toast.error("Invalid ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      const response = await axios.delete(`${PayTerms}/${id}`);

      if (response.data !== "") {
        // ✅ Optimized (no extra API call)
        setItems((prev) => prev.filter((item) => item.asptblpaytermasid !== id));

        toast.success(response.data);
        setNewButton(2);
      } else {
        toast.error("Error " + response.data);
      }
    } catch (err) {
      toast.error("Error " + err.message);
    }
  };

  const inputref = useRef();

  const PayTermMaster_New = () => {
    setPayTermValues({});
  };

  const menuButtons = [
    { key: "news", label: "News", action: PayTermMaster_New },
    { key: "saves", label: "Save", action: PayTermMaster_Save },
    { key: "deletes", label: "Delete", action: PayTermMaster_Delete },
    { key: "searches", label: "Search", action: PayTermMaster_New },
    { key: "prints", label: "Prints", action: PayTermMaster_New },
    { key: "treebutton", label: "TreeButton", action: PayTermMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: PayTermMaster_New },
    { key: "login", label: "Login", action: PayTermMaster_New },
    { key: "changepassword", label: "Changepassword", action: PayTermMaster_New },
    { key: "changeskin", label: "Changeskin", action: PayTermMaster_New },
    { key: "contact", label: "Contact", action: PayTermMaster_New },
    { key: "pdf", label: "Pdf", action: PayTermMaster_New },
    { key: "import", label: "Import", action: PayTermMaster_New },
    { key: "download", label: "Download", action: PayTermMaster_New },
  ];
  const commentsData = useMemo(() => {
    let computedComments = items;
    if (search) {
      computedComments = computedComments.filter((item) => item.payTerm.includes(search));
    }
    setTotalItems(computedComments.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [items, currentPage, search, sorting]);

  return (
    <div onSubmit={handleSubmit} className="row animate-zoom ">
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
                    {title}{" "}
                  </div>
                </div>
                <div className="row pt-1">
                  <label className="col-md-2"> PayTermID </label> <input className="col-md-2" type="text" name="asptblpaytermasid" value={paytermValues.asptblpaytermasid || ""} />
                </div>
                <div className="row pt-1">
                  <label className="col-md-2"> PayTerm </label> <input className="col-md-5" type="text" name="payTerm" ref={inputref} onChange={handleChange} value={paytermValues.payTerm || ""} />
                </div>
                <div className="row pt-1">
                  <label className="col-md-2"> No of Days </label> <input className="col-md-5" type="number" name="noofDays" ref={inputref} onChange={handleChange} value={paytermValues.noofDays || ""} />
                </div>
                <div className="row pt-1">
                  <label className="col-md-2"> Active </label>{" "}
                  <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                    <input type="checkbox" name="active" checked={paytermValues.active} onChange={handleChange} /> <span></span> <i className="indicator"></i>{" "}
                  </label>
                </div>
              </div>

              <div className="col-md-6 pt-1" style={{ backgroundColor: `${foreValue}`, padding: "0" }}>
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
                    ChangeValues={paytermValues}
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
                    EditData={PayTermMaster_Check}
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
          {/* ) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing>} */}
        </div>
      )}
    </div>
  );
};

export default PayTermMaster;
