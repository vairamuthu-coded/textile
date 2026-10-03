import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import ActionButtton from "../ActionButtton";
import CustomSelect from "../Custom/CustomSelect";
const YarnMaster = ({ title, subTitle }) => {
  const {
    newButton,
    setNewButton,
    inputref,
    handleSubmit,
    userRights,
    setUserRights,
    API_URL,
    totalItems,
    foreValue,
    setTotalItems,
    currentPage,
    setCurrentPage,
    sorting,
    setSorting,
    ITEM_PER_PAGE,
    defaultDetails,
    colorValue,
    searchLable1,
    searchLable2,
    searchLable3,
    color1,
    yarnValues,
    setYarnValues,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
  } = useContext(DataContext);
  const [fab_Search, setYarnValues_Search] = useState("");
  const [yarnContentData, setYarnContentData] = useState([]);
  const [YarnYarnBlend, setYarnYarnBlend] = useState([]);
  const [YarnYarnType, setYarnYarnType] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [active, setActive] = useState(false);

  const [countsItems, setCountsItems] = useState([]);
  const [fab_FilterSearch, setYarnValues_FilterSearch] = useState([]);
  const [hsnItems, setHsnItems] = useState([]);
  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };

  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const GetYarnBlendMaster = `${API_URL}/YarnBlendMasters`;
  const GetYarnContentMaster = `${API_URL}/YarnContentMasters`;
  const GetYarnType = `${API_URL}/YarnTypeMasters`;
  const insert_update = `${API_URL}/YarnMasters`;
  const getCounts = `${API_URL}/CountsMasters`;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const hsnData = `${API_URL}/HsnMasters`;
  const heights = "400px";
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  const HeadersColumn = [
    { headername: "ID", field: "asptblyarmasid", visible: "none" },
    { headername: "Yarn", field: "yarn" },
    { headername: "AliasName", field: "aliasname" },
    // { headername: "Active", field: "active" },
  ];

  let totalper = 0;
  const [yarnItems, setYarnItems] = useState([]);

  const refs = useRef([]);
  const handleEnter = (e, index) => {
    const { name } = e.target;

    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (e) => {
    e.target.style.backgroundColor = `${colorValue}`;
    e.target.style.color = `${"var(--bs-light)"}`;
    e.target.style.fontWeight = "bolder";
  };

  const handleBlur = (e) => {
    e.target.style.backgroundColor = "";
    e.target.style.color = `${"var(--bs-dark)"}`;
  };

  const [artists, setArtists] = useState({
    asptblyarmasid: "0",
    yarncontent: "",
    per1: "",
    per2: "",
    per3: "",
    per4: "",
    yarnblend1: "",
    yarnblend2: "",
    yarnblend3: "",
    yarnblend4: "",
    counts: "",
    yarntype: "",
    yarn: "",
    aliasname: "",
    hsncode: "",
    per: 0,
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, selectedIndex } = e.target;

    const fieldValue = type === "checkbox" ? checked : value;

    if (type !== "checkbox" && !/^[a-zA-Z0-9%() ]*$/.test(String(fieldValue ?? ""))) {
      return;
    }

    setArtists((prev) => {
      const updated = { ...prev, [name]: type === "select-one" ? selectedIndex : value };

      const perValues = [parseInt(updated.per1 || 0), parseInt(updated.per2 || 0), parseInt(updated.per3 || 0), parseInt(updated.per4 || 0)];

      const yValues = [updated.yarnblend1, updated.yarnblend2, updated.yarnblend3, updated.yarnblend4];

      const totalper = perValues.reduce((a, b) => a + b, 0);

      let blend = "";

      perValues.forEach((p, i) => {
        if (p && yValues[i]) {
          blend += `${p}%${yValues[i]} `;
        }
      });

      let fabricText = "";

      if (blend !== "") {
        fabricText = `${updated.counts}/${updated.yarncontent}(${blend.trim()})/${updated.yarntype}`;
      } else {
        fabricText = `(${blend.trim()})` || "";
      }

      if (totalper > 100) {
        toast.error(`Yarn Percentage Exceed. Maximum 100% allowed (${totalper}%)`);
      }

      return {
        ...updated,
        yarn: fabricText,
        per: totalper,
      };
    });

    setYarnValues((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  let validcheck = true;
  const validate = (fab) => {
    if (!yarnValues.yarnblend) {
      alert("Invalid yarnblend");
      validcheck = false;
      return;
    }

    if (/^[a-zA-Z]$/.test(yarnValues.fabric)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRightsRes, YarnYarnBlendRes, yarnContentDataRes, gridRes, hsnRes, countsRes, yarntypeRes] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(GetYarnBlendMaster),
          axios.get(GetYarnContentMaster),
          axios.get(insert_update),
          axios.get(hsnData),
          axios.get(getCounts),
          axios.get(GetYarnType),
        ]);

        setUserRights(userRightsRes?.data ?? []);
        setYarnYarnBlend(YarnYarnBlendRes?.data ?? []);
        setYarnContentData(yarnContentDataRes?.data ?? []);
        setYarnItems(gridRes?.data ?? []);
        setHsnItems(hsnRes?.data ?? []);
        setCountsItems(countsRes?.data ?? []);
        setYarnYarnType(yarntypeRes?.data);
      } catch (error) {
        toast.error(error?.message || "Error fetching data");
        setFetchError(error?.message || "Unknown error");
      }
    };

    fetchData();
  }, [defaultDetails?.Compcode, defaultDetails?.User, title]);

  useEffect(() => {
    const text = fab_Search.toLowerCase() || "";
    const filterResult = yarnItems.filter((post) => post.yarn?.toLowerCase().includes(text));
    setYarnValues_FilterSearch([...filterResult].reverse());
  }, [yarnItems, fab_Search]);

  // useEffect(() => {
  //   const search = fab_Search?.toLowerCase() || "";
  //   const filterResult = yarnItems?.filter((item) =>
  //     !search ||
  //     item?.fabrictype?.toLowerCase().includes(search) ||
  //     item?.fabric?.toLowerCase().includes(search)
  //   ) || [];

  //   setTotalItems(filterResult.length);
  //   setYarnValues_FilterSearch([...filterResult].reverse());

  // }, [yarnItems, fab_Search]);

  const YarnMaster_Check = (id) => {
    try {
      axios
        .get(`${insert_update}/${id.asptblyarmasid}`)
        .then((res) => {
          if (res.data.length === 0) {
            alert("Invalid Data");
          } else {
            setYarnValues({
              asptblyarmasid: res.data[0].asptblyarmasid,
              yarncontent: res.data[0].asptblyarconmasid,
              per1: res.data[0].per1,
              per2: res.data[0].per2,
              per3: res.data[0].per3,
              per4: res.data[0].per4,
              yarnblend1: res.data[0].yarn1,
              yarnblend2: res.data[0].yarn2,
              yarnblend3: res.data[0].yarn3,
              yarnblend4: res.data[0].yarn4,
              counts: res.data[0].asptblcoumasid,
              yarntype: res.data[0].asptblyartypmasid,
              yarn: res.data[0].yarn,
              aliasname: res.data[0].aliasname,
              hsncode: res.data[0].hsncode,
              active: res.data[0].active === "T" ? true : false,
            });
            let fabricText = "";

            setArtists((prev) => {
              const updated = { ...prev, ...res.data[0] };

              const perValues = [parseInt(updated.per1 || 0), parseInt(updated.per2 || 0), parseInt(updated.per3 || 0), parseInt(updated.per4 || 0)];

              fabricText = `${updated.yarn}`;

              const totalper = perValues.reduce((a, b) => a + b, 0);
              return {
                ...updated,
                yarn: fabricText,
                per: totalper,
              };
            });
          }
        })
        .catch((error) => {
          setFetchError(error);
        });
    } catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    } finally {
    }
  };

  const YarnMaster_Save = async () => {
    const totalPer = parseInt(artists.per || 0);

    if (totalPer !== 100) {
      if (totalPer > 100) {
        toast.error(`Maximum % Exceed ${totalPer}`);
      } else {
        toast.error(`Minimum % Below ${totalPer}`);
      }
      return;
    }

    try {
      const CountryData = {
        asptblyarmasid: yarnValues.asptblyarmasid > 0 ? yarnValues.asptblyarmasid : 0,
        yarncontent: yarnValues.yarncontent,
        per1: yarnValues.per1,
        per2: yarnValues.per2 || 0,
        per3: yarnValues.per3 || 0,
        per4: yarnValues.per4 || 0,
        yarnblend1: yarnValues.yarnblend1 || 0,
        yarnblend2: yarnValues.yarnblend2 || 0,
        yarnblend3: yarnValues.yarnblend3 || 0,
        yarnblend4: yarnValues.yarnblend4 || 0,
        counts: yarnValues.counts,
        yarntype: yarnValues.yarntype,
        yarn: artists.yarn,
        aliasname: artists.yarn,
        hsncode: yarnValues.hsncode,
        active: yarnValues.active ? "T" : "F",
      };

      const response = await axios.post(insert_update, CountryData);

      if (response.data.asptblyarmasid === 0) {
        toast.success("Record Saved Successfully");
        YarnMaster_New();
      } else {
        toast.success("Record Updated Successfully");
      }

      const gridRes = await axios.get(insert_update);
      setYarnItems(gridRes.data);
    } catch (err) {
      toast.error(`Error: ${err}`);
    }
  };

  const YarnMaster_Delete = async (id) => {
    try {
      if (yarnValues.asptblyarmasid == "") {
        alert(`Empty Not Allowed`);
        return;
      }
      await axios
        .delete(`${insert_update}/${id.asptblyarmasid}`)
        .then((respose) => {
          if (respose.data.asptblyarmasid > 0) {
            axios
              .get(`${insert_update}`)
              .then((res) => {
                setYarnItems(res.data.reverse());
              })
              .catch((error) => {
                alert(error);
                setFetchError(error);
              });
            alert("Record Deleted Successfully");
          } else {
            setFetchError(respose.error);
            alert(respose.error);
          }
        })
        .catch((error) => {
          alert(error);
          setFetchError(error);
        });
    } catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
        alert(err.error);
      }
    }
  };

  const YarnMaster_New = () => {
    setNewButton(1);
    totalper = 0;
    setArtists({});
    setActive(false);
    setYarnValues([]);
  };

  const YarnMaster_Search = () => {};

  const commentsData = useMemo(() => {
    let searchs = String(fab_Search || "").toLowerCase();
    let computedComments = yarnItems;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
        let fabric = String(item.fabric || "").toLowerCase();
        return fabric.includes(searchs);
      });
    }

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [yarnItems, currentPage, fab_Search, sorting]);

  return (
    <>
      {userRights?.length > 0 ? (
        <div className="container-fluid animate-zoom" style={{ textAlign: "left", borderTop: "1px solid var(--bs-white)" }}>
          <div className="row" style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
            <ActionButtton
              news={YarnMaster_New}
              saves={YarnMaster_Save}
              deletes={YarnMaster_Delete}
              searches={YarnMaster_New}
              prints={YarnMaster_New}
              treebutton={YarnMaster_New}
              globalsearch={YarnMaster_New}
              login={YarnMaster_New}
              changepassword={YarnMaster_New}
              changeskin={YarnMaster_New}
              contact={YarnMaster_New}
              pdf={YarnMaster_New}
              imports={YarnMaster_New}
              download={YarnMaster_New}
              userRights={userRights}
              colorValue={colorValue}
              newButton={newButton}
              foreValue={foreValue}
              screenHeader="YARN MASTER"
            />
          </div>
          <div className="row pt-1">
            <ul className="" style={{ backgroundColor: `${colorValue}` }}>
              <li className="ps-2">
                {" "}
                <button className={newButton === 1 || newButton === 10 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor: `${colorValue}`, padding: "1%", fontWeight: "bold" }}>
                  {title}{" "}
                </button>
              </li>
            </ul>

            <div className="col-5">
              <div className="content active-content">
                <fieldset>
                  <legend></legend>
                  <div className="container-fluid">
                    <div className="row" style={{ display: HeadersColumn[0].visible }}>
                      <label className="col-md-2"> ID </label>
                      <input className="col-md-1" type="text" name="asptblyarmasid" value={yarnValues.asptblyarmasid || "0"} readOnly />
                    </div>

                    <div className="row py-1">
                      <label className="col-md-2"> Content </label>
                      <CustomSelect
                        visible="block"
                        className="col-10 form-select"
                        name="yarncontent"
                        value={yarnValues.yarncontent || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={10}
                        ref={(el) => (refs.current[10] = el)}
                        onKeyDown={(e) => handleEnter(e, 10)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {/* <option value="" className="col-md-12 p-2"></option> */}

                        {yarnContentData !== null &&
                          yarnContentData.map((result, index) => (
                            <option key={index} value={result.asptblyarconmasid}>
                              {result.yarncontent}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>
                    <div className="row">
                      <label className="col-md-2"> Per1 </label>
                      <input className="col-md-2" type="number" min="0" max="100" name="per1" id="per1" value={yarnValues.per1 || ""} onChange={handleChange} />
                      <label className="col-md-2"> Yarn Blend </label>
                      <CustomSelect
                        visible="block"
                        className="col-6 form-select"
                        name="yarnblend1"
                        value={yarnValues.yarnblend1 || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={10}
                        ref={(el) => (refs.current[10] = el)}
                        onKeyDown={(e) => handleEnter(e, 10)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {YarnYarnBlend !== null &&
                          YarnYarnBlend.map((result, index) => (
                            <option key={index} value={result.asptblyarblemasid}>
                              {result.yarnblend}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>

                    <div className="row py-1">
                      <label className="col-md-2"> Per2 </label>
                      <input className="col-md-2" type="number" min="0" max="100" name="per2" id="per2" value={yarnValues.per2 || ""} onChange={handleChange} />
                      <label className="col-md-2"> Yarn Blend </label>

                      <CustomSelect
                        visible="block"
                        className="col-6 form-select"
                        name="yarnblend2"
                        value={yarnValues.yarnblend2 || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={10}
                        ref={(el) => (refs.current[10] = el)}
                        onKeyDown={(e) => handleEnter(e, 10)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {YarnYarnBlend !== null &&
                          YarnYarnBlend.map((result, index) => (
                            <option key={index} value={result.asptblyarblemasid}>
                              {result.yarnblend}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>

                    <div className="row">
                      <label className="col-md-2"> Per3 </label>
                      <input className="col-md-2" type="number" min="0" max="100" name="per3" id="per3" value={yarnValues.per3 || ""} onChange={handleChange} />
                      <label className="col-md-2"> Yarn Blend </label>
                      <CustomSelect
                        visible="block"
                        className="col-6 form-select"
                        name="yarnblend3"
                        value={yarnValues.yarnblend3 || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={10}
                        ref={(el) => (refs.current[10] = el)}
                        onKeyDown={(e) => handleEnter(e, 10)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {YarnYarnBlend !== null &&
                          YarnYarnBlend.map((result, index) => (
                            <option key={index} value={result.asptblyarblemasid}>
                              {result.yarnblend}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>
                    <div className="row py-1">
                      <label className="col-md-2"> Per4 </label>
                      <input className="col-md-2" type="number" min="0" max="100" name="per4" id="per4" value={yarnValues.per4 || ""} onChange={handleChange} />
                      <label className="col-md-2"> Yarn Blend </label>
                      <CustomSelect
                        visible="block"
                        className="col-6 form-select"
                        name="yarnblend4"
                        value={yarnValues.yarnblend4 || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={10}
                        ref={(el) => (refs.current[10] = el)}
                        onKeyDown={(e) => handleEnter(e, 10)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {YarnYarnBlend !== null &&
                          YarnYarnBlend.map((result, index) => (
                            <option key={index} value={result.asptblyarblemasid}>
                              {result.yarnblend}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>
                    <div className="row">
                      <label className="col-md-2"> Counts </label>
                      <CustomSelect
                        visible="block"
                        className="col-2 form-select"
                        name="counts"
                        value={yarnValues.counts || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={10}
                        ref={(el) => (refs.current[10] = el)}
                        onKeyDown={(e) => handleEnter(e, 10)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {countsItems !== null &&
                          countsItems.map((result, index) => (
                            <option key={index} value={result.asptblcoumasid}>
                              {result.counts}
                            </option>
                          ))}
                      </CustomSelect>
                      <label className="col-md-2"> Yarn Type </label>
                      <CustomSelect
                        visible="block"
                        className="col-6 form-select"
                        name="yarntype"
                        value={yarnValues.yarntype || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={10}
                        ref={(el) => (refs.current[10] = el)}
                        onKeyDown={(e) => handleEnter(e, 10)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {YarnYarnType !== null &&
                          YarnYarnType.map((result, index) => (
                            <option key={index} value={result.asptblyartypmasid}>
                              {result.yarntype}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>
                    <div className="row py-1">
                      <label className="col-md-2"> Yarn </label>
                      <input className="col-10 p-2 hdr" type="text" placeholder="Enter yarn" name="yarn" id="yarn" value={artists.yarn || ""} />
                    </div>
                    <div className="row">
                      <label className="col-md-2"> AliasName </label>
                      <input className="col-10 p-2 hdr" type="text" placeholder="Enter Alias Name" name="aliasname" value={yarnValues.aliasname || ""} onChange={handleChange} />
                    </div>
                    <div className="row py-1">
                      <label className="col-md-2"> HSN </label>
                      <CustomSelect
                        visible="block"
                        className="col-6 form-select"
                        name="hsncode"
                        value={yarnValues.hsncode || ""}
                        onChange={handleChange}
                        colorValue={colorValue}
                        tabIndex={10}
                        ref={(el) => (refs.current[10] = el)}
                        onKeyDown={(e) => handleEnter(e, 10)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        {hsnItems !== null &&
                          hsnItems.map((result, index) => (
                            <option key={index} value={result.asptblhsnmasid}>
                              {result.hsncode}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>
                    <div className="row">
                      <label className="col-md-2"> Active </label>
                      <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                        <input type="checkbox" name="active" placeholder="active" checked={yarnValues.active} onChange={(e) => setYarnValues({ ...yarnValues, active: e.target.checked })} />
                        <span></span>
                        <i className="indicator"></i>
                      </label>
                      <input className="col-md-2" type="text" name="per" value={artists.per || ""} style={{ display: HeadersColumn[0].visible }} />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="col-7">
              <div className="content-tabs">
                <Search
                  colorValue={colorValue}
                  searchs={fab_Search}
                  setsearchs={setYarnValues_Search}
                  SearchLable1={searchLable1}
                  SearchLable2={searchLable2}
                  SearchLable3={searchLable3}
                  handleChange={handleChange}
                  ChangeValues={yarnValues}
                  searchCompCode={searchCompCode}
                  searchUserName={searchUserName}
                />

                <DataTable
                  heights={heights}
                  colorValue={colorValue}
                  headers={HeadersColumn}
                  foreValue={foreValue}
                  comments={yarnItems}
                  setComments={setYarnItems}
                  searches={fab_Search}
                  setSearches={setYarnValues_Search}
                  totalItems={totalItems}
                  setTotalItems={setTotalItems}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  sorting={sorting}
                  setSorting={setSorting}
                  ITEM_PER_PAGE={ITEM_PER_PAGE}
                  EditData={YarnMaster_Check}
                  commentsData={commentsData}
                  checkall={checkall}
                  setCheckAll={setCheckAll}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid animate-zoom" style={{ textAlign: "center", borderTop: "1px solid var(--bs-white)" }}>
          <h3 style={{ color: colorValue, padding: "50px" }}>You Don't Have Access To This Page</h3>
        </div>
      )}
    </>
  );
};

export default YarnMaster;
