import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import { utilityState } from "./../utilityState";

const TaxMaster = ({ title, subTitle }) => {
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
    taxValues,
    setTaxValues,
  } = useContext(DataContext);

  let ITEM_PER_PAGE = 20;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const CountryParam = `${API_URL}/TaxMasters`;
  const insert_update = `${API_URL}/TaxMasters`;
  const deleteData = `${API_URL}/TaxMasters`;
  let validcheck = true;

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
        const [rightsRes, countryRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(CountryParam)]);

        setUserRights(rightsRes.data);
        setItems(countryRes.data);
        setNewButton(1);
      } catch (error) {
        console.error(error);
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
    { headername: "ID", field: "asptbltaxmasid" },
    { headername: "taxvalue", field: "taxvalue" },
    { headername: "Active", field: "active" },
  ];

  const heights = "380px";

  const handleChange = (e) => {
    utilityState(e, setTaxValues);
    //   const { name, value, checked, type } = e.target;

    //   const finalValue =
    //     type === "checkbox"
    //       ? checked
    //       : type === "number"
    //       ? Number(value)
    //       : value.trimStart();

    //   setTaxValues((prev) => ({
    //     ...prev,
    //     [name]: finalValue,
    //   }));
  };

  const validate = (taxValues) => {
    const name = taxValues.taxvalue?.trim();

    if (!name) {
      toast.error("Country Name is required");
      return false;
    }

    // Only alphabets and spaces
    const regex = /^[0-9\s]+$/;

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

  const TaxMaster_Check = (row) => {
    setTaxValues({
      asptbltaxmasid: row.asptbltaxmasid,
      taxvalue: row.taxvalue,
      active: row.active === "T",
    });

    setNewButton(1);
  };

  const TaxMaster_Save = async () => {
    if (!validate(taxValues)) return;

    try {
      const CountryData = {
        asptbltaxmasid: taxValues.asptbltaxmasid > 0 ? taxValues.asptbltaxmasid : 0,
        taxvalue: taxValues.taxvalue,
        active: taxValues.active ? "T" : "F",
      };

      const response = await axios.post(insert_update, CountryData);
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
      setTaxValues({});
    }
  };

  const TaxMaster_Delete = async () => {
    if (!taxValues.asptbltaxmasid) {
      toast.error("Select a record to delete");
      return;
    }

    try {
      const id = taxValues.asptbltaxmasid;
      const response = await axios.delete(`${deleteData}/${id}`);

      if (response.data != null) {
        const res = await axios.get(CountryParam);
        setItems(res.data);
        toast.success(response.data);
        TaxMaster_Clear();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // setFetchError(error);
      toast.error(error.response.data);
    }
  };

  const inputref = useRef();

  const TaxMaster_Clear = () => {
    setTaxValues([]);
  };

  const TaxMaster_New = () => {
    setTaxValues([]);
    TaxMaster_Clear();
    setNewButton(tabindex);
  };

  const commentsData = useMemo(() => {
    let searchs = String(search || "").toLowerCase();
    let computedComments = items;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let country = String(item.taxvalue || "").toLowerCase();
        return country.includes(searchs);
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
    { key: "news", label: "News", action: TaxMaster_New },
    { key: "saves", label: "Save", action: TaxMaster_Save },
    { key: "deletes", label: "Delete", action: TaxMaster_Delete },
    { key: "searches", label: "Search", action: TaxMaster_New },
    { key: "prints", label: "Prints", action: TaxMaster_New },
    { key: "treebutton", label: "TreeButton", action: TaxMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: TaxMaster_New },
    { key: "login", label: "Login", action: TaxMaster_New },
    { key: "changepassword", label: "Changepassword", action: TaxMaster_New },
    { key: "changeskin", label: "Changeskin", action: TaxMaster_New },
    { key: "contact", label: "Contact", action: TaxMaster_New },
    { key: "pdf", label: "Pdf", action: TaxMaster_New },
    { key: "import", label: "Import", action: TaxMaster_New },
    { key: "download", label: "Download", action: TaxMaster_New },
  ];

  return (
    <div onSubmit={handleSubmit}>
      {userRights.length > 0 && (
        <div className="container-fluid animate-zoom p-1">
          {!fetchError ? (
            <>
              <div style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
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
                <div className="row">
                  <div className="col-md-6" style={{ backgroundColor: `${foreValue}`, padding: "0px", margin: "0px" }}>
                    <div className="content active-content">
                      <div className="bloc-tabs">
                        <div className="tabs active-tabs" style={{ backgroundColor: `${colorValue}`, color: `${foreValue}` }}>
                          {" "}
                          {title}{" "}
                        </div>
                      </div>

                      <div className="row py-1">
                        <label className="col-md-2"> TaxID </label>
                        <input className="col-md-6" type="text" name="asptbltaxmasid" value={taxValues.asptbltaxmasid || ""} readOnly />
                      </div>
                      <div className="row">
                        <label className="col-md-2"> TaxValue </label>
                        <input className="col-md-6" type="text" name="taxvalue" value={taxValues.taxvalue || ""} onChange={handleChange} required />
                      </div>
                      <div className="row py-1">
                        <label className="col-sm-2"> Active </label>
                        <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="active" checked={taxValues.active} onChange={handleChange} />
                          <span></span>
                          <i className="indicator"></i>
                        </label>
                      </div>
                    </div>{" "}
                  </div>

                  <div className="col-md-6" style={{ backgroundColor: `${foreValue}`, padding: "0" }}>
                    <div className="content active-content">
                      <div className="bloc-tabs">
                        <div className="tabs active-tabs" style={{ backgroundColor: `${colorValue}`, color: `${foreValue}` }}>
                          {" "}
                          {subTitle}{" "}
                        </div>
                      </div>
                      <Search
                        colorValue={colorValue}
                        searchs={search}
                        setsearchs={setSearch}
                        SearchLable1={searchLable1}
                        SearchLable2={searchLable2}
                        stylecolor={foreValue}
                        SearchLable3={searchLable3}
                        handleChange={handleChange}
                        ChangeValues={taxValues}
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
                        EditData={TaxMaster_Check}
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

export default TaxMaster;
