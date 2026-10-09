import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import { utilityState } from "./../utilityState";
import ActionButtton from "../ActionButtton";
const CountsMaster = ({ title, subTitle }) => {
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
    countsValues,
    setCountsValues,
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
  const insert_update = `${API_URL}/CountsMasters`;

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
        const [rightsRes, countsRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(insert_update)]);
        alert(JSON.stringify(countsRes.data));
        setUserRights(rightsRes.data);
        setItems(countsRes.data);
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
    const filterResult = items.filter((post) => post.counts?.toLowerCase().includes(text));
    setCountry_FilterSearch([...filterResult].reverse());
  }, [items, search]);

  const HeadersColumn = [
    { headername: "SNo", field: "SNo", visible: "true" },
    { headername: "", field: "none", visible: "true" },
    { headername: "ID", field: "asptblcoumasid", visible: "false" },
    { headername: "Counts", field: "counts", visible: "true" },
    { headername: "Active", field: "active", visible: "true" },
  ];

  const heights = "380px";

  const handleChange = (e) => {
    utilityState(e, setCountsValues);
    // const { name, value, checked, type } = e.target;

    // const finalValue =
    //   type === "checkbox"
    //     ? checked
    //     : type === "number"
    //     ? Number(value)
    //     : value.trimStart();

    // setCountsValues((prev) => ({
    //   ...prev,
    //   [name]: finalValue,
    // }));
  };

  const validate = (countsValues) => {
    const name = countsValues.counts?.trim();

    if (!name) {
      toast.error("Counts Name is required");
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
      toast.error("Counts name must be at least 3 characters");
      return false;
    }

    return true;
  };

  const CountsMaster_Check = (row) => {
    setCountsValues({
      asptblcoumasid: row.asptblcoumasid,
      counts: row.counts,
      active: row.active === "T",
    });

    setNewButton(1);
  };

  const CountsMaster_Save = async () => {
    if (!validate(countsValues)) return;

    try {
      const CountryData = {
        asptblcoumasid: countsValues.asptblcoumasid > 0 ? countsValues.asptblcoumasid : 0,
        counts: countsValues.counts,
        active: countsValues.active ? "T" : "F",
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
      setCountsValues({});
    }
  };

  const CountsMaster_Delete = async () => {
    if (!countsValues.asptblcoumasid) {
      toast.error("Select a record to delete");
      return;
    }

    try {
      const id = countsValues.asptblcoumasid;
      const response = await axios.delete(`${insert_update}/${id}`);

      if (response.data.message != null) {
        const res = await axios.get(insert_update);
        setItems(res.data.reverse());
        toast.success(response.data.message);
        CountsMasterClear();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // setFetchError(error);
      toast.error(error.response.data);
    }
  };

  const inputref = useRef();

  const CountsMasterClear = () => {
    setCountsValues([]);
  };

  const CountsMasterNew = () => {
    setCountsValues([]);
    CountsMasterClear();

    setNewButton(tabindex);
  };

  const commentsData = useMemo(() => {
    let searchs = String(search || "").toLowerCase();
    let computedComments = items;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let country = String(item.counts || "").toLowerCase();
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
                  news={CountsMasterNew}
                  saves={CountsMaster_Save}
                  deletes={CountsMaster_Delete}
                  searches={CountsMasterNew}
                  prints={CountsMasterNew}
                  treebutton={CountsMasterNew}
                  globalsearch={CountsMasterNew}
                  login={CountsMasterNew}
                  changepassword={CountsMasterNew}
                  changeskin={CountsMasterNew}
                  contact={CountsMasterNew}
                  pdf={CountsMasterNew}
                  imports={CountsMasterNew}
                  download={CountsMasterNew}
                  userRights={userRights}
                  colorValue={colorValue}
                  newButton={newButton}
                  foreValue={foreValue}
                  screenHeader="COUNTS MASTER"
                />

                <div className="row">
                  <div className="col-md-6" style={{ backgroundColor: `${foreValue}`, padding: "0px", margin: "0px" }}>
                    <div className="content active-content">
                      <div className="row py-1">
                        <label className="col-md-2"> ID </label>
                        <input className="col-md-6" type="text" name="asptblcoumasid" value={countsValues.asptblcoumasid || ""} readOnly />
                      </div>
                      <div className="row">
                        <label className="col-md-2"> Counts </label>
                        <input className="col-md-6" type="text" name="counts" value={countsValues.counts || ""} onChange={handleChange} required />
                      </div>
                      <div className="row py-1">
                        <label className="col-sm-2"> Active </label>
                        <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="active" checked={countsValues.active} onChange={handleChange} />
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
                        ChangeValues={countsValues}
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
                        EditData={CountsMaster_Check}
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

export default CountsMaster;
//https://www.google.com/search?sca_esv=982eb7504844ff8c&rlz=1C1GCEU_enIN1160IN1160&sxsrf=AHTn8zr3vi6PDglRDzsBSgI_Jo7YM68ESA:1747641090347&q=input+and+select+field+in+use+reducer&udm=7&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWp6IcynRBrzjy_vjxR0KoDMp_4ut2Z3jppK72fzdIpWsBpYmR8fwcVczrRGmP-Hf4kG9vVz30NlEzdDjoPm1ohfVYI4JJIY4mUU2uX9gHpdGY0JiHT8oeTKOT2A5tuMr14DVpibcW5Mcbr_an2WG__XE4C33L2zGVfdIWt73W8Ep3brPaBew92Nl7IqpUGPXfKFSyp3g&sa=X&ved=2ahUKEwiOgIqzhq-NAxVA3jgGHZszLa0QtKgLegQIFhAB&biw=1280&bih=551&dpr=1#fpstate=ive&vld=cid:0f6f43ee,vid:vA_556hkqz4,st:0

//https://www.google.com/search?q=react+js+tutorial+in+tamil&sca_esv=3035b77ba2076880&rlz=1C1GCEU_enIN1160IN1160&udm=7&biw=1360&bih=599&sxsrf=AHTn8zqvBxyX58KDjpLYyhNnj45uxdg06g%3A1747900327192&ei=p9cuaJHBC5fuseMPh5e6yA0&oq=react+&gs_lp=EhZnd3Mtd2l6LW1vZGVsZXNzLXZpZGVvIgZyZWFjdCAqAggBMgQQIxgnMgQQIxgnMgQQIxgnMgoQABiABBhDGIoFMg4QABiABBiRAhixAxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTIQEAAYgAQYsQMYQxiDARiKBTIIEAAYgAQYsQNInjBQAFi4B3AAeACQAQCYAYcBoAGnBaoBAzAuNrgBAcgBAPgBAZgCBqAC6QXCAgsQABiABBiRAhiKBcICDhAAGIAEGLEDGIMBGIoFwgILEAAYgAQYsQMYgwGYAwCSBwMwLjagB_g5sgcDMC42uAfpBQ&sclient=gws-wiz-modeless-video#fpstate=ive&vld=cid:9f09f8cf,vid:2sVeyo2tYbE,st:0
