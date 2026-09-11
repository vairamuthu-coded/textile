import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import { utilityState } from "../utilityState";
import Search from "../Custom/Search";

const StyleGroupMaster = ({ title, subTitle }) => {
  const {
    API_URL,
    newButton,
    handleSubmit,
    tabindex,
    currentPage,
    setCurrentPage,
    CountryParam,
    color1,
    sorting,
    setSorting,
    colorValue,
    foreValue,
    setNewButton,
    styleGroupValues,
    defaultDetails,
    setError,
    setUserRights,
    userRights,
    setStyleGroupValues,
    selectText,
    setSelectedText,
    searchLable1,
    searchLable2,
    searchLable3,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
  } = useContext(DataContext);
  let ITEM_PER_PAGE = 15;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const insert_update = API_URL + "/StyleGroupMasters";
  const styleCategoryParams = API_URL + "/StyleCategoryMasters";
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [styleGroup_Search, setStyleGroup_Search] = useState("");
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(false);
  const [stylecate, setStylecate] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [size_FilterSearch, setSize_FilterSearch] = useState([]);

  setNewButton(1);

  const handleChange = (e) => {
    const { name, options } = e.target;

    if (name === "stylecategory") {
      setSelectedText(options[options.selectedIndex].text);
    }
    utilityState(e, setStyleGroupValues);
  };

  let validcheck = true;
  const validate = (styleGroupValues) => {
    if (!styleGroupValues.stylegroup.trim()) {
      alert("Invalid Country Name");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(styleGroupValues.stylegroup)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  };
  useEffect(() => {
    if (!defaultDetails?.Compcode) return;
    const loadData = async () => {
      try {
        const [rightsRes, styleCategoryRes, insert_updateRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(styleCategoryParams), axios.get(insert_update)]);
        setUserRights(rightsRes.data);
        setStylecate(styleCategoryRes.data);

        setItems(insert_updateRes.data);
        setNewButton(1);
      } catch (error) {
        setFetchError(error);
      }
    };
    loadData();
  }, [defaultDetails?.Compcode, defaultDetails?.User]);

  useEffect(() => {
    const filterResult = items.filter((post) => post.stylegroup.includes(styleGroup_Search));
    setSize_FilterSearch(filterResult.reverse());
  }, [items, styleGroup_Search]);

  const HeadersColumn = [
    { headername: "S.No", field: "SNo" },
    { headername: "id", field: "asptblstygrpmasid" },
    { headername: "StyleGroup", field: "stylegroup" },
    { headername: "Category", field: "stylecategory" },
    { headername: "ProductStyle", field: "productstylegroup" },
    { headername: "ShortCode", field: "shortcode" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";

  const StyleGroupMaster_Check = (id) => {
    try {
      axios
        .get(`${insert_update}/${id.asptblstygrpmasid}`)
        .then((res) => {
          if (res.data.asptblstygrpmasid === 0) {
            alert("Invalid Data");
          } else {
            const updatepost = { active: res.data[0].active === "T" ? true : false };
            setSelectedText(res.data[0].stylecategory);
            setStyleGroupValues({
              asptblstygrpmasid: res.data[0].asptblstygrpmasid,
              stylegroup: res.data[0].stylegroup,
              productstylegroup: res.data[0].stylecategory + "/" + res.data[0].stylegroup,
              stylecategory: res.data[0].asptblstycatmasid,
              shortcode: res.data[0].shortcode,
              active: res.data[0].active === "T" ? true : false,
            });
          }
        })
        .catch((error) => {
          alert(error);
        });
    } catch (err) {
      if (err.response) {
        setFetchError(err.response);
      }
    } finally {
      setNewButton(1);
    }
  };

  const StyleGroupMaster_Save = async () => {
    // validate(styleGroupValues);
    // if (validcheck == true) {
    try {
      const CountryData = {
        asptblstygrpmasid: styleGroupValues.asptblstygrpmasid > 0 ? styleGroupValues.asptblstygrpmasid : 0,
        stylegroup: styleGroupValues.stylegroup.toUpperCase(),
        stylecategory: styleGroupValues.stylecategory,
        productstylegroup: selectText + "/" + styleGroupValues.stylegroup.toUpperCase(),
        shortcode: styleGroupValues.shortcode.toUpperCase(),
        active: active === true ? "T" : "F",
      };

      await axios
        .post(`${insert_update}`, CountryData)
        .then((respose) => {
          if (respose.data !== "") {
            if (respose.data.asptblstygrpmasid > 0) {
              alert("Updated Successfully");
            }
            if (respose.data.asptblstygrpmasid === 0) {
              alert("Record Saved Successfully");
            }
          } else {
            setFetchError(respose.error);
            alert("Error " + respose.data);
          }
          axios
            .get(`${insert_update}`)
            .then((res) => {
              setItems(res.data);
            })
            .catch((error) => {
              setFetchError(error);
            });
        })
        .catch((error) => {
          setFetchError(error);
        });
    } catch (err) {
      setFetchError(`Error . ${err}`);
    } finally {
      StyleGroupMaster_New();
    }
  };

  const StyleGroupMaster_Delete = async () => {
    try {
      if (styleGroupValues.stylegroup === "") {
        alert(`Empty Not Allowed`);
        return;
      }
      if (styleGroupValues.asptblstygrpmasid >= 1) {
        const asptblstygrpmasid = styleGroupValues.asptblstygrpmasid;
        await axios
          .delete(`${insert_update}/${asptblstygrpmasid}`)
          .then((respose) => {
            if (respose.data.asptblstygrpmasid > 0) {
              alert("Record Deleted Successfully");
              StyleGroupMaster_New();
            } else {
              setFetchError(respose.error);
              alert("Error " + respose.data);
            }
            axios
              .get(`${insert_update}`)
              .then((res) => {
                setItems(res.data);
              })
              .catch((error) => {
                setFetchError(error);
              });
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

  const StyleGroupMaster_New = () => {
    setNewButton(1);
    setSelectedText("");
    setStyleGroupValues({ asptblstygrpmasid: 0, stylecategory: "", stylegroup: "", productstylegroup: selectText + "/" + "", shortcode: "", active: active });
  };

  const commentsData = useMemo(() => {
    let computedComments = items;
    if (styleGroup_Search) {
      computedComments = computedComments.filter((item) => item.stylegroup.includes(styleGroup_Search.toUpperCase()));
    }
    setTotalItems(computedComments.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [items, currentPage, styleGroup_Search, sorting]);

  const menuButtons = [
    { key: "news", label: "News", action: StyleGroupMaster_New },
    { key: "saves", label: "Save", action: StyleGroupMaster_Save },
    { key: "deletes", label: "Delete", action: StyleGroupMaster_Delete },
    { key: "searches", label: "Search", action: StyleGroupMaster_New },
    { key: "prints", label: "Prints", action: StyleGroupMaster_New },
    { key: "treebutton", label: "TreeButton", action: StyleGroupMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: StyleGroupMaster_New },
    { key: "login", label: "Login", action: StyleGroupMaster_New },
    { key: "changepassword", label: "Changepassword", action: StyleGroupMaster_New },
    { key: "changeskin", label: "Changeskin", action: StyleGroupMaster_New },
    { key: "contact", label: "Contact", action: StyleGroupMaster_New },
    { key: "pdf", label: "Pdf", action: StyleGroupMaster_New },
    { key: "import", label: "Import", action: StyleGroupMaster_New },
    { key: "download", label: "Download", action: StyleGroupMaster_New },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {userRights.length > 0 && (
        <div className="container-fluid animate-zoom">
          {!fetchError ? (
            <>
              {/* HEADER BUTTONS */}
              <div className="row">
                <div className="col-12">
                  <div style={{ background: "var(--bs-header)" }}>
                    <ul className="boxShadow d-flex flex-wrap justify-content-end gap-2 ">
                      {menuButtons.map(
                        (btn, index) =>
                          userRights[0][btn.key] === "T" && (
                            <li key={index}>
                              <button type="button" className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{ backgroundColor: colorValue }} onClick={btn.action}>
                                {btn.label}
                              </button>
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT */}
              <div className="row g-2">
                {/* LEFT FORM */}
                <div className="col-12 col-lg-5  p-2">
                  <div className="tabs active-tabs text-center mb-2" style={{ backgroundColor: `${colorValue}` }}>
                    {title}
                  </div>

                  <div className="bg-light p-2">
                    {/* ID */}
                    <div className="row align-items-center mb-2">
                      <label className="col-12 col-md-4 col-form-label">ID</label>
                      <div className="col-12 col-md-8">
                        <input className="form-control" type="text" value={styleGroupValues.asptblstygrpmasid} readOnly />
                      </div>
                    </div>

                    {/* Style Category */}
                    <div className="row align-items-center mb-2">
                      <label className="col-12 col-md-4 col-form-label">Style Category</label>
                      <div className="col-12 col-md-8">
                        <select className="form-select col-12" name="stylecategory" value={styleGroupValues.stylecategory} onChange={handleChange}>
                          <option value=""></option>
                          {stylecate?.map((item, index) => (
                            <option key={index} value={item.asptblstycatmasid}>
                              {item.stylecategory}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Style Group */}
                    <div className="row align-items-center mb-2">
                      <label className="col-12 col-md-4 col-form-label">Style Group</label>
                      <div className="col-12 col-md-8">
                        <input className="form-control" name="stylegroup" type="text" value={styleGroupValues.stylegroup} onChange={handleChange} />
                      </div>
                    </div>

                    {/* Product Style Group */}
                    <div className="row align-items-center mb-2">
                      <label className="col-12 col-md-4 col-form-label">Product Style Group</label>
                      <div className="col-12 col-md-8">
                        <input className="form-control" type="text" readOnly value={styleGroupValues.asptblstygrpmasid === 0 ? `${selectText}/${styleGroupValues.stylegroup}` : styleGroupValues.productstylegroup} />
                      </div>
                    </div>

                    {/* Short Code */}
                    <div className="row align-items-center mb-2">
                      <label className="col-12 col-md-4 col-form-label">Short Code</label>
                      <div className="col-12 col-md-8">
                        <input className="form-control" name="shortcode" type="text" value={styleGroupValues.shortcode} onChange={handleChange} />
                      </div>
                    </div>

                    {/* Active */}
                    <div className="row align-items-center mb-2">
                      <label className="col-12 col-md-4 col-form-label">Active</label>
                      <div className="col-12 col-md-8">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="active" checked={styleGroupValues.active} onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* RIGHT TABLE */}
                <div className="col-12 col-lg-7 p-2">
                  <div className="tabs active-tabs text-center mb-2" style={{ backgroundColor: `${colorValue}` }}>
                    {title}
                  </div>

                  <div className={newButton === 1 ? "content active-content" : "content"}>
                    <Search
                      colorValue={colorValue}
                      searchs={styleGroup_Search}
                      setsearchs={setStyleGroup_Search}
                      SearchLable1={searchLable1}
                      SearchLable2={searchLable2}
                      SearchLable3={searchLable3}
                      stylecolor={foreValue}
                      handleChange={handleChange}
                      ChangeValues={styleGroupValues}
                      searchCompCode={searchCompCode}
                      searchUserName={searchUserName}
                    />
                    <DataTable
                      heights={heights}
                      colorValue={colorValue}
                      foreValue={foreValue}
                      headers={HeadersColumn}
                      comments={items}
                      setComments={setItems}
                      searches={styleGroup_Search}
                      setSearches={setStyleGroup_Search}
                      totalItems={totalItems}
                      setTotalItems={setTotalItems}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      sorting={sorting}
                      setSorting={setSorting}
                      ITEM_PER_PAGE={ITEM_PER_PAGE}
                      EditData={StyleGroupMaster_Check}
                      commentsData={commentsData}
                    />
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

export default StyleGroupMaster;
