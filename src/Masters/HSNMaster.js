import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import { utilityState } from "./../utilityState";
import ActionButtton from "../ActionButtton";

const HSNMaster = ({ title, subTitle }) => {
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
    hsnValues,
    setHsnValues,
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

  const insert_update = `${API_URL}/HsnMasters`;

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
    const filterResult = items.filter((post) => post.hsn?.toLowerCase().includes(text));
    setCountry_FilterSearch([...filterResult].reverse());
  }, [items, search]);

  const HeadersColumn = [
    { headername: "", field: "visible" },
    { headername: "ID", field: "asptblhsnmasid" },
    { headername: "HSN", field: "hsn" },
    { headername: "HSN CODE", field: "hsncode" },
    { headername: "Active", field: "active" },
  ];

  const heights = "380px";

  const handleChange = (e) => {
    utilityState(e, setHsnValues);
    // const { name, value, checked, type } = e.target;

    // const finalValue =
    //   type === "checkbox"
    //     ? checked
    //     : type === "number"
    //     ? Number(value)
    //     : value.trimStart();

    // setHsnValues((prev) => ({
    //   ...prev,
    //   [name]: finalValue,
    // }));
  };

  const validate = (hsnValues) => {
    const name = hsnValues.hsn?.trim();

    if (!name) {
      toast.error("HSN Name is required");
      return false;
    }

    // Only alphabets and spaces
    const regex = /^[A-Za-z\s]+$/;

    if (!regex.test(name)) {
      toast.error("Only alphabets allowed");
      return false;
    }

    // Minimum length check
    if (name.length < 3) {
      toast.error("HSN must be at least 3 characters");
      return false;
    }

    return true;
  };

  const HsnMaster_Check = (row) => {
    setHsnValues({
      asptblhsnmasid: row.asptblhsnmasid,
      hsn: row.hsn,
      hsncode: row.hsncode,
      active: row.active === "T",
    });

    setNewButton(1);
  };

  const HsnMaster_Save = async () => {
    if (!validate(hsnValues)) return;

    try {
      const CountryData = {
        asptblhsnmasid: hsnValues.asptblhsnmasid > 0 ? hsnValues.asptblhsnmasid : 0,
        hsn: hsnValues.hsn,
        hsncode: hsnValues.hsncode,
        active: hsnValues.active ? "T" : "F",
      };

      const response = await axios.post(insert_update, CountryData);
      if (response.data !== "") {
        const res = await axios.get(insert_update);
        setItems(res.data.reverse());
        setNewButton(2);
        toast.success("Saved Successfully");
      } else {
        toast.error("Save Failed");
      }
    } catch (error) {
      setFetchError(error);
      toast.error("Service error");
    } finally {
      setHsnValues({});
    }
  };

  const HsnMaster_Delete = async () => {
    if (!hsnValues.asptblhsnmasid) {
      toast.error("Select a record to delete");
      return;
    }

    try {
      const id = hsnValues.asptblhsnmasid;
      const response = await axios.delete(`${insert_update}/${id}`);

      if (response.data.message != null) {
        const res = await axios.get(insert_update);
        setItems(res.data.reverse());
        toast.success(response.data.message);
        HsnMasterClear();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // setFetchError(error);
      toast.error(error.response.data);
    }
  };

  const inputref = useRef();

  const HsnMasterClear = () => {
    setHsnValues([]);
  };

  const HsnMasterNew = () => {
    setHsnValues([]);
    HsnMasterClear();

    setNewButton(tabindex);
  };

  const commentsData = useMemo(() => {
    let searchs = String(search || "").toLowerCase();
    let computedComments = items;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let country = String(item.hsn || "").toLowerCase();
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

  return (
    <div onSubmit={handleSubmit}>
      {userRights.length > 0 && (
        <div className="container-fluid animate-zoom">
          {!fetchError ? (
            <>
              <div style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
                <ActionButtton
                  news={HsnMasterNew}
                  saves={HsnMaster_Save}
                  deletes={HsnMaster_Delete}
                  searches={HsnMasterNew}
                  prints={HsnMasterNew}
                  treebutton={HsnMasterNew}
                  globalsearch={HsnMasterNew}
                  login={HsnMasterNew}
                  changepassword={HsnMasterNew}
                  changeskin={HsnMasterNew}
                  contact={HsnMasterNew}
                  pdf={HsnMasterNew}
                  imports={HsnMasterNew}
                  download={HsnMasterNew}
                  userRights={userRights}
                  colorValue={colorValue}
                  newButton={newButton}
                  foreValue={foreValue}
                  screenHeader="HSN MASTER"
                />

                <div className="row">
                  <div className="col-md-6" style={{ backgroundColor: `${foreValue}`, padding: "0px", margin: "0px" }}>
                    <div className="content active-content">
                      <div className="row py-1">
                        <label className="col-md-2"> ID </label>
                        <input className="col-md-6" type="text" name="asptblhsnmasid" value={hsnValues.asptblhsnmasid || ""} readOnly />
                      </div>
                      <div className="row">
                        <label className="col-md-2"> HSN </label>
                        <input className="col-md-6" type="text" name="hsn" value={hsnValues.hsn || ""} onChange={handleChange} required />
                      </div>
                      <div className="row py-1">
                        <label className="col-md-2"> hsncode </label>
                        <input className="col-md-6" type="text" name="hsncode" value={hsnValues.hsncode || ""} onChange={handleChange} required />
                      </div>
                      <div className="row py-1">
                        <label className="col-sm-2"> Active </label>
                        <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="active" checked={hsnValues.active} onChange={handleChange} />
                          <span></span>
                          <i className="indicator"></i>
                        </label>
                      </div>
                    </div>{" "}
                  </div>

                  <div className="col-md-6" style={{ backgroundColor: `${foreValue}`, padding: "0px", margin: "0px" }}>
                    <div className="content active-content">
                      <Search
                        colorValue={colorValue}
                        searchs={search}
                        setsearchs={setSearch}
                        SearchLable1={searchLable1}
                        SearchLable2={searchLable2}
                        stylecolor={foreValue}
                        SearchLable3={searchLable3}
                        handleChange={handleChange}
                        ChangeValues={hsnValues}
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
                        EditData={HsnMaster_Check}
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

export default HSNMaster;
