import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import { utilityState } from "./../utilityState";
import ActionButtton from "../ActionButtton";
import TabNav from "../component/TabNav";

const YarnBlendMaster = ({ title, subTitle }) => {
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
    CityParam,
    searchLable1,
    searchLable2,
    searchLable3,
    isloading,
    setIsLoading,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    yarnblendValues,
    setYarnBlendValues,
    color1,
  } = useContext(DataContext);
  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };

  const tabs = [
    { id: 1, label: title },
    { id: 2, label: subTitle },
  ];

  let ITEM_PER_PAGE = 20;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const insert_update = `${API_URL}/YarnBlendMasters`;

  let validcheck = true;
  const [totalItems, setTotalItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);

  const [YarnBlend_FilterSearch, setYarnBlend_FilterSearch] = useState([]);

  useEffect(() => {
    if (!defaultDetails?.Compcode) return;

    const loadData = async () => {
      try {
        const [rightsRes, YarnBlendRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(insert_update)]);

        setUserRights(rightsRes.data);
        setItems(YarnBlendRes.data);
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
    const filterResult = items.filter((post) => post.yarnblend?.toLowerCase().includes(text));
    setYarnBlend_FilterSearch([...filterResult].reverse());
  }, [items, search]);

  const HeadersColumn = [
    { headername: "", field: "visible" },
    { headername: "ID", field: "asptblyarblemasid" },
    { headername: "YarnBlend", field: "yarnblend" },
    { headername: "Active", field: "active" },
  ];

  const heights = "380px";

  const handleChange = (e) => {
    utilityState(e, setYarnBlendValues);
  };

  const validate = (yarnblendValues) => {
    const name = yarnblendValues.yarnblend?.trim();

    if (!name) {
      toast.error("YarnBlend Name is required");
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
      toast.error("YarnBlend name must be at least 3 characters");
      return false;
    }

    return true;
  };

  const YarnBlendMaster_Check = (row) => {
    setYarnBlendValues({
      asptblyarblemasid: row.asptblyarblemasid,
      yarnblend: row.yarnblend,
      active: row.active === "T",
    });

    setNewButton(1);
  };

  const YarnBlendMaster_Save = async () => {
    if (!validate(yarnblendValues)) return;

    try {
      const YarnBlendData = {
        asptblyarblemasid: yarnblendValues.asptblyarblemasid > 0 ? yarnblendValues.asptblyarblemasid : 0,
        yarnblend: yarnblendValues.yarnblend,
        active: yarnblendValues.active ? "T" : "F",
      };

      const response = await axios.post(insert_update, YarnBlendData);
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
      setYarnBlendValues({});
    }
  };

  const YarnBlendMaster_Delete = async () => {
    if (!yarnblendValues.asptblyarblemasid) {
      toast.error("Select a record to delete");
      return;
    }

    try {
      const id = yarnblendValues.asptblyarblemasid;
      const response = await axios.delete(`${insert_update}/${id}`);

      if (response.data.message != null) {
        const res = await axios.get(insert_update);
        setItems(res.data.reverse());
        toast.success(response.data.message);
        YarnBlendMasterClear();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // setFetchError(error);
      toast.error(error.response.data);
    }
  };

  const inputref = useRef();

  const YarnBlendMasterClear = () => {
    setYarnBlendValues([]);
  };

  const YarnBlendMasterNew = () => {
    setYarnBlendValues([]);
    YarnBlendMasterClear();

    setNewButton(tabindex);
  };

  const commentsData = useMemo(() => {
    let searchs = String(search || "").toLowerCase();
    let computedComments = items;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let YarnBlend = String(item.yarnblend || "").toLowerCase();
        return YarnBlend.includes(searchs);
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
    <div className="container-fluid">
      {userRights.length > 0 && (
        <>
          {!fetchError ? (
            <div className="row" style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
              <ActionButtton
                news={YarnBlendMasterNew}
                saves={YarnBlendMaster_Save}
                deletes={YarnBlendMaster_Delete}
                searches={YarnBlendMasterNew}
                prints={YarnBlendMasterNew}
                treebutton={YarnBlendMasterNew}
                globalsearch={YarnBlendMasterNew}
                login={YarnBlendMasterNew}
                changepassword={YarnBlendMasterNew}
                changeskin={YarnBlendMasterNew}
                contact={YarnBlendMasterNew}
                pdf={YarnBlendMasterNew}
                imports={YarnBlendMasterNew}
                download={YarnBlendMasterNew}
                userRights={userRights}
                colorValue={colorValue}
                newButton={newButton}
                foreValue={foreValue}
                screenHeader="YARN BLEND MASTER"
              />
              <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />
              <div className="content-tabs">
                <div className={newButton === 1 ? "content active-content" : "content"}>
                  <div className="row animate-zoom">
                    <div className="row">
                      <div className="row" style={{ backgroundColor: `${foreValue}`, padding: "0px", margin: "0px" }}>
                        <div className="content active-content">
                          <div className="row py-1">
                            <label className="col-md-2"> ID </label>
                            <input className="col-md-6" type="text" name="asptblyarblemasid" value={yarnblendValues.asptblyarblemasid || ""} readOnly />
                          </div>
                          <div className="row">
                            <label className="col-md-2"> YarnBlend </label>
                            <input className="col-md-6" type="text" name="yarnblend" value={yarnblendValues.yarnblend || ""} onChange={handleChange} required />
                          </div>
                          <div className="row py-1">
                            <label className="col-sm-2"> Active </label>
                            <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                              <input type="checkbox" name="active" checked={yarnblendValues.active} onChange={handleChange} />
                              <span></span>
                              <i className="indicator"></i>
                            </label>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={newButton === 2 ? "content active-content" : "content"}>
                  <div className="row animate-zoom"></div>
                  <div className="row" style={{ backgroundColor: `${foreValue}`, padding: "0px", margin: "0px" }}>
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
                        ChangeValues={yarnblendValues}
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
                        EditData={YarnBlendMaster_Check}
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
            </div>
          ) : (
            <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>
          )}
        </>
      )}
    </div>
  );
};

export default YarnBlendMaster;
