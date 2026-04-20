import { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import toast from "react-hot-toast";

const FinYearMaster = ({ title, subTitle }) => {
  const {
    handleSubmit,
    API_URL,
    newButton,
    tabindex,

    currentPage,
    setCurrentPage,
    tablecheck,
    userRights,
    setUserRights,
    defaultDetails,
    foreValue,
    colorValue,
    searchLable1,
    searchLable2,
    searchLable3,
    mode,
    sorting,
    setSorting,
    setNewButton,
  } = useContext(DataContext);
  let ITEM_PER_PAGE = 50;

  const insert_update = `${API_URL}/FinYearMasters`;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck/${defaultDetails.Compcode}/${defaultDetails.User}/FinYearMaster`;

  let validcheck = true;
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const [finYearItems, setFinYearItems] = useState([]);
  const [finYearValue, setFinYearValue] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [color_FilterSearch, setColor_FilterSearch] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const [userRights1, setUserRights1] = useState([]);
  const HeadersColumn = [
    { headername: "ID", field: "GtFinancialYearID" },
    { headername: "FinYear", field: "FinYear" },
    { headername: "CurrentYear", field: "CurrentFinYr" },
    { headername: "StartDate", field: "StartDate" },
    { headername: "EndDate", field: "EndDate" },
    { headername: "Closed", field: "Closed" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";
  //localhost:5271/api/UserRights/userrightsMenuCheck/AGF/VAIRAM/FinYearMaster;
  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        const [rightsRes, resGetFinYear] = await Promise.all([axios.get(`${userrightsMenuCheck}`)]);
        setUserRights(rightsRes.data);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchMyAPI();
  }, [defaultDetails.Compcode, defaultDetails.User, title]);

  useEffect(() => {
    const filterResult = finYearItems.filter((post) => post.FinYear.includes(search));
    setColor_FilterSearch(filterResult.reverse());
  }, [finYearItems, search]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type !== "checkbox") {
      setFinYearValue((previousValue) => {
        return {
          ...previousValue,
          [name]: value,
        };
      });
    } else {
      setFinYearValue((previousValue) => {
        return {
          ...previousValue,
          [name]: checked,
        };
      });
    }
  };
  const validate = (finYearValue) => {
    if (!finYearValue.FinYear.trim()) {
      toast.error("Invalid Financial Year Name");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(finYearValue.FinYear)) {
      toast.error("Special Character not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  };

  const ColorMaster_Check = (id) => {
    try {
      const myitem = finYearItems.filter((item) => item.GtFinancialYearID === id.GtFinancialYearID);

      setFinYearValue({ GtFinancialYearID: myitem[0].GtFinancialYearID, FinYear: myitem[0].FinYear, Active: myitem[0].active === "T" ? true : false });
    } catch (err) {
      if (err.response) {
        setFetchError(err.response);
      }
    } finally {
      setNewButton(1);
    }
  };

  const FinanciYear_Save = async () => {
    try {
      const FinData = {
        GtFinancialYearID: finYearValue.GtFinancialYearID || 0,
        FinYear: finYearValue.FinYear,
        CurrentFinYear: finYearValue.CurrentFinYear ? "T" : "F",
        Closed: finYearValue.Closed ? "T" : "F",
        Active: finYearValue.active ? "T" : "F",
      };

      const response = await axios.post(insert_update, FinData);

      if (response.data === true) {
        // Fetch updated list
        const res = await axios.get(insert_update);
        setFinYearItems(res.data);
        setNewButton(2);

        // Success message
        toast.success(finYearValue.GtFinancialYearID ? "Updated Successfully" : "Record Saved Successfully");
      } else {
        toast.error("Error " + response.data);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const FinanciYear_Delete = async (id) => {
    try {
      if (finYearValue.FinYear === "") {
        toast.error(`Empty Not Allowed`);
        return;
      }
      if (finYearValue.GtFinancialYearID >= 1) {
        const id = finYearValue.GtFinancialYearID;
        await axios
          .delete(`${insert_update}/${id}`)
          .then((respose) => {
            if (respose.data === "true") {
              axios
                .get(`${insert_update}`)
                .then((res) => {
                  setFinYearItems(res.data);
                })
                .catch((error) => {
                  setFetchError(error);
                });
              toast.success("Record Deleted Successfully");
              setNewButton(2);
            } else {
              setFetchError(respose.error);
              toast.error("Error " + respose.data);
            }
          })
          .catch((error) => {
            setFetchError(error);
          });
      }
    } catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    }
  };

  const inputref = useRef();

  const FinanciYear_New = (tabindex) => {
    setNewButton(tabindex);
    setFinYearValue({ GtFinancialYearID: "", FinYear: "", StartDate: "", EndDate: "", CurrentFinYear: "", Closed: "", Active: false });
  };

  const commentsData = useMemo(() => {
    let computedComments = finYearItems;
    if (search) {
      computedComments = computedComments.filter((item) => item.FinYear.includes(search));
    }
    setTotalItems(computedComments.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [finYearItems, currentPage, search, sorting]);

  const buttonConfig = [
    { label: "News", key: "news", action: FinanciYear_New },
    { label: "Save", key: "saves", action: FinanciYear_Save },
    { label: "Delete", key: "deletes", action: () => FinanciYear_Delete(finYearValue.GtFinancialYearID) },
    { label: "Search", key: "searches", action: FinanciYear_New },
    { label: "Prints", key: "prints", action: FinanciYear_New },
    { label: "TreeButton", key: "treebutton", action: FinanciYear_New },
    { label: "Globalsearch", key: "globalsearch", action: FinanciYear_New },
    { label: "Login", key: "login", action: FinanciYear_New },
    { label: "Changepassword", key: "changepassword", action: FinanciYear_New },
    { label: "Changeskin", key: "changeskin", action: FinanciYear_New },
    { label: "Contact", key: "contact", action: FinanciYear_New },
    { label: "Pdf", key: "pdf", action: FinanciYear_New },
    { label: "Import", key: "import", action: FinanciYear_New },
    { label: "Download", key: "download", action: FinanciYear_New },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {userRights.length > 0 && (
        <div className="container-fluid animate-zoom">
          <div className="row" style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
            <ul className="d-flex flex-row-reverse boxShadow">
              {buttonConfig.map((btn, index) => {
                const isVisible = userRights[0]?.[btn.key] === "T";
                if (!isVisible) return null;
                return (
                  <li key={index}>
                    <button className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{ backgroundColor: colorValue }} onClick={btn.action}>
                      {btn.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="row pt-2" style={{ backgroundColor: `${foreValue}` }}>
              <div className="col-md-3">
                <div className="bloc-tabs">
                  <div className="tabs active-tabs" style={{ backgroundColor: `${colorValue}`, color: `${foreValue}` }}>
                    {" "}
                    {title}{" "}
                  </div>
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> ID </label>
                  <input className="col-md-8" type="text" name="GtFinancialYearID" value={finYearValue.GtFinancialYearID} />
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> FinYear </label>
                  <input className="col-md-8" type="text" name="FinYear" ref={inputref} onChange={handleChange} value={finYearValue.FinYear} required />
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> StartDate </label>
                  <input className="col-md-8" type="date" maxLength={10} name="StartDate" ref={inputref} onChange={handleChange} value={finYearValue.StartDate} required />
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> EndDate </label>
                  <input className="col-md-8" type="date" maxLength={10} placeholder="" name="EndDate" ref={inputref} onChange={handleChange} value={finYearValue.EndDate} required />
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> CurrentYear </label>
                  <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                    <input type="checkbox" name="CurrentFinYear" checked={finYearValue.CurrentFinYear} onChange={handleChange} />
                    <span></span>
                    <i className="indicator"></i>
                  </label>
                  <label className="col-md-3"> Closed </label>
                  <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                    <input type="checkbox" name="Closed" checked={finYearValue.Closed} onChange={handleChange} />
                    <span></span>
                    <i className="indicator"></i>
                  </label>
                </div>
                <div className="row pt-1">
                  <label className="col-md-4"> Active </label>
                  <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                    <input type="checkbox" name="Active" checked={finYearValue.Active} onChange={handleChange} />
                    <span></span>
                    <i className="indicator"></i>
                  </label>
                </div>
              </div>

              <div className="col-md-6 pt-1">
                <div className="row ">
                  <DataTable
                    heights={heights}
                    colorValue={colorValue}
                    headers={HeadersColumn}
                    comments={finYearItems}
                    setComments={setFinYearItems}
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
                    EditData={ColorMaster_Check}
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
    </form>
  );
};

export default FinYearMaster;
