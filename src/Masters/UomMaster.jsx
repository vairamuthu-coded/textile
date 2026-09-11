import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import { utilityState } from "./../utilityState";

const UomMaster = ({ title, subTitle }) => {
  const {
    foreValue,
    newButton,
    setNewButton,
    handleSubmit,
    userRights,
    setUserRights,
    currentPage,
    setCurrentPage,
    API_URL,
    colorValue,
    defaultDetails,
    handlepage,
    setError,
    sorting,
    setSorting,
    tabindex,
    state_CountryData,
    CityParam,
    searchLable1,
    searchLable2,
    searchLable3,
    isloading,
    setIsLoading,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    color1,
  } = useContext(DataContext);

  let ITEM_PER_PAGE = 20;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const CountryParam = `${API_URL}/UomMasters`;
  const insert_update = `${API_URL}/UomMasters`;
  const deleteData = `${API_URL}/UomMasters`;
  let validcheck = true;
  const [uomValues, setUomValues] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const [country_FilterSearch, setCountry_FilterSearch] = useState([]);

  useEffect(() => {
    if (!defaultDetails?.Compcode) return;
    const loadData = async () => {
      try {
        const [rightsRes, uomRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(CountryParam)]);

        setUserRights(rightsRes.data);
        setItems(uomRes.data);
        setNewButton(1);
      } catch (error) {
        setError(error);
      }
    };
    loadData();
  }, [defaultDetails?.Compcode, defaultDetails?.User]);

  useEffect(() => {
    const text = (search || "").toLowerCase();
    const filterResult = items.filter((post) => post.taxvalue?.toLowerCase().includes(text));
    setCountry_FilterSearch([...filterResult].reverse());
  }, [items, search]);

  const HeadersColumn = [
    { headername: "", field: "visible" },
    { headername: "ID", field: "asptbluommasid" },
    { headername: "Uom", field: "uom" },
    { headername: "Active", field: "active" },
  ];

  const heights = "380px";

  const handleChange = (e) => {
    utilityState(e, setUomValues);
  };

  const validate = (uomValues) => {
    const name = uomValues.uom?.toUpperCase().trim();

    if (!name) {
      toast.error("Uom is required");
      return false;
    }

    // Only alphabets and spaces
    const regex = /^[a-zA-Z0-9\s]+$/;

    if (!regex.test(name)) {
      toast.error("Only alphabets allowed");
      return false;
    }

    // Minimum length check
    if (name.length < 1) {
      toast.error("Tax name must be at least 3 characters");
      return false;
    }

    return true;
  };

  const UomMaster_Check = (row) => {
    setUomValues({
      asptbluommasid: row.asptbluommasid,
      uom: row.uom,
      active: row.active === "T" ? true : false,
    });

    setNewButton(1);
  };

  const UomMaster_Save = async () => {
    if (!validate(uomValues)) return;

    try {
      const UomData = {
        asptbluommasid: uomValues.asptbluommasid > 0 ? uomValues.asptbluommasid : 0,
        uom: uomValues.uom.toUpperCase().trim(),
        active: uomValues.active === "T",
      };

      const response = await axios.post(insert_update, UomData);
      if (response.data !== "") {
        const res = await axios.get(CountryParam);
        setItems(res.data);
        setNewButton(2);
        toast.success("Record Saved Successfully");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      setFetchError(error);
      toast.error(error.data);
    } finally {
      setUomValues({});
    }
  };

  const UomMaster_Delete = async () => {
    if (!uomValues.asptbluommasid) {
      toast.error("Select a record to delete");
      return;
    }

    try {
      const id = uomValues.asptbluommasid;
      const response = await axios.delete(`${deleteData}/${id}`);
      if (response.data != null) {
        const res = await axios.get(CountryParam);
        setItems(res.data);
        toast.success(response.data);
        UomMaster_Clear();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // setFetchError(error);
      toast.error(error.response.data);
    }
  };

  const inputref = useRef();

  const UomMaster_Clear = () => {
    setUomValues([]);
  };

  const UomMaster_New = () => {
    setUomValues([]);
    UomMaster_Clear();
    setNewButton(tabindex);
  };

  const commentsData = useMemo(() => {
    let searchs = String(search || "").toLowerCase();
    let computedComments = items;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let uom = String(item.uom || "").toLowerCase();
        return uom.includes(searchs);
      });
    }
    setTotalItems(computedComments.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [items, currentPage, search, sorting]);

  const menuButtons = [
    { key: "news", label: "News", action: UomMaster_New },
    { key: "saves", label: "Save", action: UomMaster_Save },
    { key: "deletes", label: "Delete", action: UomMaster_Delete },
    { key: "searches", label: "Search", action: UomMaster_New },
    { key: "prints", label: "Prints", action: UomMaster_New },
    { key: "treebutton", label: "TreeButton", action: UomMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: UomMaster_New },
    { key: "login", label: "Login", action: UomMaster_New },
    { key: "changepassword", label: "Changepassword", action: UomMaster_New },
    { key: "changeskin", label: "Changeskin", action: UomMaster_New },
    { key: "contact", label: "Contact", action: UomMaster_New },
    { key: "pdf", label: "Pdf", action: UomMaster_New },
    { key: "import", label: "Import", action: UomMaster_New },
    { key: "download", label: "Download", action: UomMaster_New },
  ];

  return (
    <div onSubmit={handleSubmit} className="row animate-zoom ">
      {userRights.length > 0 && (
        <div className="col-md-12 pt-1">
          {!fetchError ? (
            <>
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
                <div className="row pt-1">
                  <div className="col-md-6" style={{ backgroundColor: `${colorValue}`, padding: "0px", margin: "0px" }}>
                    <div className="content active-content">
                      <div className="bloc-tabs">
                        <div className="tabs active-tabs" style={{ backgroundColor: `${colorValue}`, color: `${foreValue}` }}>
                          {" "}
                          {title}{" "}
                        </div>
                      </div>

                      <div className="row py-1">
                        <label className="col-md-2"> ID </label>
                        <input className="col-md-6" type="text" name="asptbluommasid" value={uomValues.asptbluommasid || ""} readOnly />
                      </div>
                      <div className="row">
                        <label className="col-md-2"> Uom </label>
                        <input className="col-md-6" type="text" name="uom" value={uomValues.uom || ""} onChange={handleChange} required />
                      </div>
                      <div className="row py-1">
                        <label className="col-sm-2"> Active </label>
                        <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="active" checked={uomValues.active} onChange={handleChange} />
                          <span></span>
                          <i className="indicator"></i>
                        </label>
                      </div>
                    </div>{" "}
                  </div>

                  <div className="col-md-6" style={{ backgroundColor: `${foreValue}`, padding: "0" }}>
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
                        ChangeValues={uomValues}
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
                        searches={search}
                        setSearches={setSearch}
                        totalItems={totalItems}
                        setTotalItems={setTotalItems}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sorting={sorting}
                        setSorting={setSorting}
                        ITEM_PER_PAGE={ITEM_PER_PAGE}
                        EditData={UomMaster_Check}
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
            </>
          ) : (
            <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>
          )}
        </div>
      )}
    </div>
  );
};

export default UomMaster;
