import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import { utilityState } from "./../utilityState";

const TaxTempMaster = ({ title, subTitle }) => {
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
    taxTempValues,
    setTaxTempValues,
  } = useContext(DataContext);

  let ITEM_PER_PAGE = 20;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const insert_update = `${API_URL}/TaxTempMasters`;

  let validcheck = true;
  // const [taxTempValues, setTaxTempValues] = useState([]);
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
        const [rightsRes, countryRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(insert_update)]);

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
    const filterResult = items.filter((post) => post.taxName?.toLowerCase().includes(text));
    setCountry_FilterSearch([...filterResult].reverse());
  }, [items, search]);

  const HeadersColumn = [
    { headername: "", field: "visible" },
    { headername: "ID", field: "asptblTaxTemMasid" },
    { headername: "TaxName", field: "taxName" },
    { headername: "Active", field: "active" },
  ];

  const heights = "380px";

  const handleChange = (e) => {
    utilityState(e, setTaxTempValues);
    //   const { name, value, checked, type } = e.target;

    //   const finalValue =
    //     type === "checkbox"
    //       ? checked
    //       : type === "number"
    //       ? Number(value)
    //       : value.trimStart();

    //   setTaxTempValues((prev) => ({
    //     ...prev,
    //     [name]: finalValue,
    //   }));
  };

  const validate = (taxTempValues) => {
    const name = taxTempValues.TaxName?.trim();
    if (!name) {
      toast.error("Tax Name is required");
      return false;
    }

    // Only alphabets and spaces
    const regex = /^[a-zA-Z \s]+$/;

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
    setTaxTempValues({
      asptblTaxTemMasid: row.asptblTaxTemMasid,
      TaxName: row.taxName,
      active: row.active === "T",
    });

    setNewButton(1);
  };

  const TaxTempMaster_Save = async () => {
    if (!validate(taxTempValues)) return;

    try {
      const CountryData = {
        asptblTaxTemMasid: taxTempValues.asptblTaxTemMasid > 0 ? taxTempValues.asptblTaxTemMasid : 0,
        taxName: taxTempValues.TaxName,
        active: taxTempValues.active ? "T" : "F",
      };

      const response = await axios.post(insert_update, CountryData);
      if (response.data !== "") {
        const res = await axios.get(insert_update);
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
      setTaxTempValues({});
    }
  };

  const TaxTempMaster_Delete = async () => {
    if (!taxTempValues.asptblTaxTemMasid) {
      toast.error("Select a record to delete");
      return;
    }

    try {
      const id = taxTempValues.asptblTaxTemMasid;
      const response = await axios.delete(`${insert_update}/${id}`);

      if (response.data != null) {
        const res = await axios.get(insert_update);
        setItems(res.data);
        toast.success(response.data);
        TaxTempMaster_Clear();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // setFetchError(error);
      toast.error(error.response.data);
    }
  };

  const inputref = useRef();

  const TaxTempMaster_Clear = () => {
    setTaxTempValues([]);
  };

  const TaxTempMaster_New = () => {
    setTaxTempValues([]);
    TaxTempMaster_Clear();
    setNewButton(tabindex);
  };

  const commentsData = useMemo(() => {
    let searchs = String(search || "").toLowerCase();
    let computedComments = items;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let country = String(item.taxName || "").toLowerCase();
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
    { key: "news", label: "News", action: TaxTempMaster_New },
    { key: "saves", label: "Save", action: TaxTempMaster_Save },
    { key: "deletes", label: "Delete", action: TaxTempMaster_Delete },
    { key: "searches", label: "Search", action: TaxTempMaster_New },
    { key: "prints", label: "Prints", action: TaxTempMaster_New },
    { key: "treebutton", label: "TreeButton", action: TaxTempMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: TaxTempMaster_New },
    { key: "login", label: "Login", action: TaxTempMaster_New },
    { key: "changepassword", label: "Changepassword", action: TaxTempMaster_New },
    { key: "changeskin", label: "Changeskin", action: TaxTempMaster_New },
    { key: "contact", label: "Contact", action: TaxTempMaster_New },
    { key: "pdf", label: "Pdf", action: TaxTempMaster_New },
    { key: "import", label: "Import", action: TaxTempMaster_New },
    { key: "download", label: "Download", action: TaxTempMaster_New },
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
                        <input className="col-md-6" type="text" name="asptblTaxTemMasid" value={taxTempValues.asptblTaxTemMasid || ""} readOnly />
                      </div>
                      <div className="row">
                        <label className="col-md-2"> TaxName </label>
                        <input className="col-md-6" type="text" name="TaxName" value={taxTempValues.TaxName || ""} onChange={handleChange} required />
                      </div>
                      <div className="row py-1">
                        <label className="col-sm-2"> Active </label>
                        <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="active" checked={taxTempValues.active} onChange={handleChange} />
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
                        ChangeValues={taxTempValues}
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

export default TaxTempMaster;
