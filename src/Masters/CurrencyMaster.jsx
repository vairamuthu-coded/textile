import { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import { utilityState } from "../utilityState";
import { toast } from "react-toastify";
import Search from "../Custom/Search";

const CurrencyMaster = ({ title, subTitle }) => {
  const { handleSubmit, API_URL, newButton, tabindex, currentPage, setCurrentPage, tablecheck, userRights, setUserRights, defaultDetails, foreValue, colorValue, searchLable1, searchLable2, searchLable3, mode, sorting, setSorting, setNewButton } =
    useContext(DataContext);
  const [currencyValues, setCurrencyValues] = useState([]);
  let ITEM_PER_PAGE = 50;
  const Currencies = API_URL + "/CurrencyMasters";
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
    { headername: "ID", field: "asptblcurmasid" },
    { headername: "Currency", field: "currency" },
    { headername: "Symbol", field: "symbol" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";

  useEffect(() => {
    async function fetApi() {
      const [userRes, payRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(`${Currencies}`)]);
      setUserRights(userRes.data.reverse());
      setItems(payRes.data);
    }

    fetApi();
  }, [defaultDetails.Compcode, defaultDetails.User, title]);

  useEffect(() => {
    const filterResult = items
      .filter((x) => x.currency?.toLowerCase().includes(search.toLowerCase()))
      .slice()
      .reverse();
    setColor_FilterSearch(filterResult);
  }, [items, search]);

  const handleChange = (e) => {
    utilityState(e, setCurrencyValues);
  };

  const validate = (currencyValues) => {
    // Pay Term validation
    if (!currencyValues.currency || !currencyValues.currency.trim()) {
      toast.error("Invalid Pay Term");
      return false;
    }

    // Allow only letters + numbers + spaces
    if (!/^[a-zA-Z\s]+$/.test(currencyValues.currency)) {
      toast.error("Currency should not contain special characters");
      return false;
    }

    // No of Days validation
    if (!currencyValues.symbol || currencyValues.symbol.toString().trim() === "") {
      toast.error("Invalid Symbol");
      return false;
    }

    return true;
  };
  const CurrencyMaster_Check = (id) => {
    const myitem = items.find((item) => item.asptblcurmasid === id.asptblcurmasid);

    if (!myitem) {
      toast.error("Item not found");
      return;
    }

    setCurrencyValues({
      asptblcurmasid: myitem.asptblcurmasid,
      currency: myitem.currency,
      symbol: myitem.symbol,
      active: myitem.active === "T",
    });

    setNewButton(1);
  };

  const CurrencyMaster_Save = async () => {
    try {
      // ✅ validation (important)
      if (!validate(currencyValues)) return;

      const ColorData = {
        asptblcurmasid: currencyValues.asptblcurmasid > 0 ? currencyValues.asptblcurmasid : 0,
        currency: currencyValues.currency.toUpperCase().trim(), // ✅ consistent naming
        symbol: currencyValues.symbol, // ✅ consistent naming
        active: currencyValues.active ? "T" : "F",
      };

      const response = await axios.post(`${Currencies}`, ColorData);

      if (response.data !== "") {
        const res = await axios.get(`${Currencies}`);
        setItems(res.data);
        setCurrencyValues({});
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

  const CurrencyMaster_Delete = async (id) => {
    if (!id) {
      toast.error("Invalid ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      const response = await axios.delete(`${Currencies}/${id}`);

      if (response.data !== "") {
        // ✅ Optimized (no extra API call)
        setItems((prev) => prev.filter((item) => item.asptblcurmasid !== id));

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

  const CurrencyMaster_New = () => {
    setCurrencyValues({});
  };

  const menuButtons = [
    { key: "news", label: "News", action: CurrencyMaster_New },
    { key: "saves", label: "Save", action: CurrencyMaster_Save },
    { key: "deletes", label: "Delete", action: CurrencyMaster_Delete },
    { key: "searches", label: "Search", action: CurrencyMaster_New },
    { key: "prints", label: "Prints", action: CurrencyMaster_New },
    { key: "treebutton", label: "TreeButton", action: CurrencyMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: CurrencyMaster_New },
    { key: "login", label: "Login", action: CurrencyMaster_New },
    { key: "changepassword", label: "Changepassword", action: CurrencyMaster_New },
    { key: "changeskin", label: "Changeskin", action: CurrencyMaster_New },
    { key: "contact", label: "Contact", action: CurrencyMaster_New },
    { key: "pdf", label: "Pdf", action: CurrencyMaster_New },
    { key: "import", label: "Import", action: CurrencyMaster_New },
    { key: "download", label: "Download", action: CurrencyMaster_New },
  ];
  const commentsData = useMemo(() => {
    let computedComments = items;
    if (search) {
      computedComments = computedComments.filter((item) => item.currency.includes(search));
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
                  <label className="col-md-2"> ID </label> <input className="col-md-2" type="text" name="asptblcurmasid" value={currencyValues.asptblcurmasid || ""} />
                </div>
                <div className="row pt-1">
                  <label className="col-md-2"> Currency </label> <input className="col-md-5" type="text" name="currency" ref={inputref} onChange={handleChange} value={currencyValues.currency || ""} />
                </div>
                <div className="row pt-1">
                  <label className="col-md-2"> Symbol </label> <input className="col-md-5" type="text" name="symbol" ref={inputref} onChange={handleChange} value={currencyValues.symbol || ""} />
                </div>
                <div className="row pt-1">
                  <label className="col-md-2"> Active </label>{" "}
                  <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                    <input type="checkbox" name="active" checked={currencyValues.active} onChange={handleChange} /> <span></span> <i className="indicator"></i>{" "}
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
                    ChangeValues={currencyValues}
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
                    EditData={CurrencyMaster_Check}
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

export default CurrencyMaster;
