import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import { utilityState } from "./../utilityState";

const SizeMaster = ({ title, subTitle }) => {
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
    sizeValues,
    setSizeValues,
  } = useContext(DataContext);

  let ITEM_PER_PAGE = 20;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const insert_update = `${API_URL}/SizeMasters`;

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
        toast.error(error);
        setError(error);
      }
    };
    loadData();
  }, [defaultDetails?.Compcode, defaultDetails?.User]);

  useEffect(() => {
    const text = (search || "").toLowerCase();
    const filterResult = items.filter((post) => post.sizename?.toLowerCase().includes(text));
    setCountry_FilterSearch([...filterResult]);
  }, [items, search]);

  const HeadersColumn = [
    { headername: "", field: "visible" },
    { headername: "ID", field: "asptblsizmasid" },
    { headername: "Size Name", field: "sizename" },
    { headername: "Active", field: "active" },
  ];

  const heights = "380px";

  const handleChange = (e) => {
    utilityState(e, setSizeValues);
  };

  const validate = (sizev) => {
    const name = sizeValues.sizename?.trim();

    if (!name) {
      toast.error("SizeName is required");
      return false;
    }

    // Only alphabets and spaces
    const regex = /[^a-zA-Z0-9\s-]/;
    if (regex.test(name)) {
      toast.error("Special characters are not allowed");
      return false;
    }

    // Minimum length check
    if (name.length < 1) {
      toast.error("Size name must be at least 1 character");
      return false;
    }

    return true;
  };

  const SizeMaster_Check = (row) => {
    setSizeValues({
      asptblsizmasid: row.asptblsizmasid,
      sizename: row.sizename,
      active: row.active === "T",
    });

    setNewButton(1);
  };

  const SizeMaster_Save = async () => {
    if (!validate(sizeValues)) return;

    try {
      const CountryData = {
        asptblsizmasid: sizeValues.asptblsizmasid > 0 ? sizeValues.asptblsizmasid : 0,
        sizename: sizeValues.sizename,
        active: sizeValues.active ? "T" : "F",
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
      SizeMaster_Clear();
    }
  };

  const SizeMaster_Delete = async () => {
    if (!sizeValues.asptblsizmasid) {
      toast.error("Select a record to delete");
      return;
    }

    try {
      const id = sizeValues.asptblsizmasid;
      const response = await axios.delete(`${insert_update}/${id}`);

      if (response.data != null) {
        const res = await axios.get(insert_update);
        setItems(res.data);
        toast.success(response.data);
        SizeMaster_Clear();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // setFetchError(error);
      toast.error(error.response.data);
    }
  };

  const inputref = useRef();

  const SizeMaster_Clear = () => {
    setSizeValues([]);
  };

  const SizeMaster_New = () => {
    setSizeValues([]);
    SizeMaster_Clear();
    setNewButton(tabindex);
  };

  const commentsData = useMemo(() => {
    let searchs = String(search || "").toLowerCase();
    let computedComments = items;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let country = String(item.sizename || "").toLowerCase();
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
    { key: "news", label: "News", action: SizeMaster_New },
    { key: "saves", label: "Save", action: SizeMaster_Save },
    { key: "deletes", label: "Delete", action: SizeMaster_Delete },
    { key: "searches", label: "Search", action: SizeMaster_New },
    { key: "prints", label: "Prints", action: SizeMaster_New },
    { key: "treebutton", label: "TreeButton", action: SizeMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: SizeMaster_New },
    { key: "login", label: "Login", action: SizeMaster_New },
    { key: "changepassword", label: "Changepassword", action: SizeMaster_New },
    { key: "changeskin", label: "Changeskin", action: SizeMaster_New },
    { key: "contact", label: "Contact", action: SizeMaster_New },
    { key: "pdf", label: "Pdf", action: SizeMaster_New },
    { key: "import", label: "Import", action: SizeMaster_New },
    { key: "download", label: "Download", action: SizeMaster_New },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {userRights.length > 0 && (
        <div className="container-fluid animate-zoom">
          {!fetchError ? (
            <>
              {userRights[0].readonlys === "T" && (
                <ul className="boxShadow d-flex flex-wrap justify-content-end gap-2 p-2">
                  {menuButtons.map(
                    (btn, index) =>
                      userRights[0][btn.key] === "T" && (
                        <li key={index}>
                          <button type="button" className={`tabs ${newButton === 1 ? "active-tabs" : ""}`} style={{ backgroundColor: colorValue }} onClick={btn.action}>
                            {btn.label}
                          </button>
                        </li>
                      ),
                  )}
                </ul>
              )}

              <div className="row g-2">
                {/* ✅ LEFT PANEL */}
                <div className="col-12 col-lg-5" style={{ backgroundColor: foreValue }}>
                  <div className="content active-content p-2">
                    <div className="tabs active-tabs text-center mb-2" style={{ backgroundColor: colorValue, color: foreValue }}>
                      {title}
                    </div>

                    {/* Size ID */}
                    <div className="row mb-2">
                      <label className="col-12 col-sm-4">SizeID</label>
                      <input className="col-12 col-sm-8 form-control" type="text" name="asptblsizmasid" value={sizeValues.asptblsizmasid || ""} readOnly />
                    </div>

                    {/* Size Name */}
                    <div className="row mb-2">
                      <label className="col-12 col-sm-4">SizeName</label>
                      <input className="col-12 col-sm-8 form-control" type="text" name="sizename" value={sizeValues.sizename || ""} onChange={handleChange} required />
                    </div>

                    {/* Active */}
                    <div className="row mb-2 align-items-center">
                      <label className="col-6 col-sm-4">Active</label>
                      <div className="col-6 col-sm-8">
                        <input type="checkbox" name="active" checked={sizeValues.active} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ RIGHT PANEL */}
                <div className="col-12 col-lg-3 ms-auto" style={{ backgroundColor: foreValue }}>
                  <div className="content active-content p-2">
                    <div className="tabs active-tabs text-center mb-2 " style={{ backgroundColor: colorValue, color: foreValue }}>
                      {subTitle}
                    </div>

                    {/* 🔍 Search */}
                    <Search
                      colorValue={colorValue}
                      searchs={search}
                      setsearchs={setSearch}
                      SearchLable1={searchLable1}
                      SearchLable2={searchLable2}
                      SearchLable3={searchLable3}
                      handleChange={handleChange}
                      ChangeValues={sizeValues}
                      searchCompCode={searchCompCode}
                      searchUserName={searchUserName}
                    />

                    {/* 📊 Table */}
                    <div className="table-responsive">
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
                        EditData={SizeMaster_Check}
                        commentsData={commentsData}
                        setCheckchild={setCheckchild}
                        setCheckAll={setCheckAll}
                        checkall={checkall}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <SocialMissing colorValue={colorValue} fetchError={fetchError} />
          )}
        </div>
      )}
    </form>
  );
};

export default SizeMaster;
