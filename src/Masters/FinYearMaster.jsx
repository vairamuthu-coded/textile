import { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import { toast } from "react-toastify";

const FinYearMaster = ({ title, subTitle }) => {
  const { handleSubmit, API_URL, newButton, tabindex, currentPage, setCurrentPage, tablecheck, userRights, setUserRights, defaultDetails, foreValue, colorValue, searchLable1, searchLable2, searchLable3, mode, sorting, setSorting, setNewButton } =
    useContext(DataContext);
  let ITEM_PER_PAGE = 50;

  const insert_update = `${API_URL}/FinYearMasters`;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck/${defaultDetails.Compcode}/${defaultDetails.User}/FinYearMaster`;

  let validcheck = true;
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const [finYearItems, setFinYearItems] = useState([]);
  const [finYearValue, setFinYearValue] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [finyear_FilterSearch, setFinYear_FilterSearch] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const [userRights1, setUserRights1] = useState([]);
  const HeadersColumn = [
    { headername: "ID", field: "gtFinancialYearID" },
    { headername: "FinYear", field: "finYear" },
    { headername: "StartDate", field: "startDate" },
    { headername: "EndDate", field: "endDate" },
    { headername: "CurrentYear", field: "currentFinYear" },
    { headername: "Closed", field: "closed" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";
  //localhost:5271/api/UserRights/userrightsMenuCheck/AGF/VAIRAM/FinYearMaster;
  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        const [rightsRes, resGetFinYear] = await Promise.all([axios.get(userrightsMenuCheck), axios.get(insert_update)]);
        setUserRights(rightsRes.data);
        setFinYearItems(resGetFinYear.data);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchMyAPI();
  }, [defaultDetails.Compcode, defaultDetails.User, title]);

  useEffect(() => {
    const text = (search || "").toLowerCase();
    const filterResult = finYearItems.filter((post) => post.FinYear?.toLowerCase().includes(text));
    setFinYear_FilterSearch([...filterResult].reverse());
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

  const convertToISO = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };
  const FinYearMaster_Check = (id) => {
    try {
      const myitem = finYearItems.filter((item) => item.gtFinancialYearID === id.gtFinancialYearID);

      setFinYearValue({
        GtFinancialYearID: myitem[0].gtFinancialYearID,
        FinYear: myitem[0].finYear,
        StartDate: convertToISO(myitem[0].startDate),
        EndDate: convertToISO(myitem[0].endDate),
        CurrentFinYear: myitem[0].currentFinYear === "T" ? true : false,
        Closed: myitem[0].closed === "T" ? true : false,
        Active: myitem[0].active === "T",
      });
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
        StartDate: finYearValue?.StartDate.substring(0, 10),
        EndDate: finYearValue?.EndDate.substring(0, 10),
        CurrentFinYear: finYearValue.CurrentFinYear ? "T" : "F",
        Closed: finYearValue.Closed ? "T" : "F",
        Active: finYearValue.Active ? "T" : "F",
      };
      const Data = {
        Master: FinData,
      };
      const response = await axios.post(insert_update, Data);

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
      toast.error(error?.response?.data);
    }
  };

  const FinanciYear_Delete = async (id) => {
    try {
      if (!id) {
        toast.error("Invalid ID");
        return;
      }

      const response = await axios.delete(`${insert_update}/${id}`);
      if (response.status === 200 || response.status === 204) {
        // ✅ Refresh list properly
        const res = await axios.get(`${insert_update}`);
        setFinYearItems(res.data);
        toast.success("Record Deleted Successfully");
        setNewButton(2);
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        toast.error(err.response.data?.message || "Server error");
      } else {
        toast.error("Network error");
      }
    }
  };

  const inputref = useRef();

  const FinanciYear_New = (tabindex) => {
    setNewButton(tabindex);
    setFinYearValue({ GtFinancialYearID: 0, FinYear: "", StartDate: "", EndDate: "", CurrentFinYear: false, Closed: false, Active: false });
  };

  const commentsData = useMemo(() => {
    let searchs = String(search || "").toLowerCase();
    let computedComments = finYearItems;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let finYear = String(item.FinYear || "").toLowerCase();
        return finYear.includes(searchs);
      });
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
          <div className="row pt-1" style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
            <ul className="d-flex justify-content-end boxShadow">
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
              <div className="col-12 col-md-8 col-lg-4">
                <div className="bloc-tabs">
                  <div className="tabs active-tabs text-center p-2" style={{ backgroundColor: colorValue, color: foreValue }}>
                    {title}
                  </div>
                </div>

                {/* ID */}
                <div className="row align-items-center mb-1">
                  <label className="col-12 col-md-4">ID</label>
                  <div className="col-12 col-md-8">
                    <input className="form-control" type="text" readOnly name="GtFinancialYearID" value={finYearValue.GtFinancialYearID} />
                  </div>
                </div>

                {/* FinYear */}
                <div className="row align-items-center mb-1">
                  <label className="col-12 col-md-4">FinYear</label>
                  <div className="col-12 col-md-8">
                    <input className="form-control" type="text" name="FinYear" ref={inputref} onChange={handleChange} value={finYearValue.FinYear} required />
                  </div>
                </div>

                {/* Start Date */}
                <div className="row align-items-center mb-1">
                  <label className="col-12 col-md-4">StartDate</label>
                  <div className="col-12 col-md-8">
                    <input className="form-control" type="date" name="StartDate" onChange={handleChange} value={finYearValue.StartDate} required />
                  </div>
                </div>

                {/* End Date */}
                <div className="row align-items-center mb-1">
                  <label className="col-12 col-md-4">EndDate</label>
                  <div className="col-12 col-md-8">
                    <input className="form-control" type="date" name="EndDate" onChange={handleChange} value={finYearValue.EndDate} required />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="row mb-2">
                  <label className="col-6 col-md-4">CurrentYear</label>
                  <div className="col-6 col-md-2">
                    <input type="checkbox" name="CurrentFinYear" checked={finYearValue.CurrentFinYear} onChange={handleChange} />
                  </div>

                  <label className="col-6 col-md-3">Closed</label>
                  <div className="col-6 col-md-3">
                    <input type="checkbox" name="Closed" checked={finYearValue.Closed} onChange={handleChange} />
                  </div>
                </div>

                <div className="row mb-1">
                  <label className="col-6 col-md-4">Active</label>
                  <label className="col-6 col-md-8 checkbox" style={{ padding: "0px", width: "60px" }}>
                    <input type="checkbox" name="Active" checked={finYearValue.Active} onChange={handleChange} />
                    <span></span>
                    <i className="indicator"></i>
                  </label>
                </div>
              </div>

              <div className="col-md-8 pt-1">
                <div className="row ">
                  <DataTable
                    heights={heights}
                    colorValue={colorValue}
                    headers={HeadersColumn}
                    comments={finYearItems}
                    setComments={setFinYearItems}
                    mode={mode}
                    foreValue={foreValue}
                    searches={search}
                    setSearches={setSearch}
                    totalItems={totalItems}
                    setTotalItems={setTotalItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    sorting={sorting}
                    setSorting={setSorting}
                    ITEM_PER_PAGE={ITEM_PER_PAGE}
                    EditData={FinYearMaster_Check}
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
