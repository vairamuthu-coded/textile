import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import { utilityState } from "../utilityState";

const StyleItemMaster = ({ title, subTitle }) => {
  const {
    API_URL,
    newButton,
    handleSubmit,
    colorValue,
    tabindex,
    currentPage,
    setCurrentPage,
    CountryParam,
    color1,
    sorting,
    setSorting,
    setNewButton,
    styleItemValues,
    defaultDetails,
    setError,
    foreValue,
    setStyleItemValues,
    selectText,
    setSelectedText,
  } = useContext(DataContext);
  let ITEM_PER_PAGE = 15;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const stylegrouoparams = API_URL + "/StyleGroupMasters";
  const StyleCategoryParams = API_URL + "/StyleCategoryMasters";
  const insert_update = API_URL + "/StyleItemMasters";

  const [fetchError, setFetchError] = useState(null);
  const [totalItems, setTotalItems] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [stygroup, setStyGroup] = useState([]);
  const [active, setActive] = useState(false);
  const [stylecate, setStylecate] = useState([]);
  const [selectTextGroup, setSelectTextGroup] = useState([]);
  const [size_FilterSearch, setSize_FilterSearch] = useState([]);
  const [userRights, setUserRights] = useState([]);
  setNewButton(1);

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "stylegroup") {
      setSelectedText(options[options.selectedIndex].text);
      setStyleItemValues((prevValues) => ({
        ...prevValues,
        styleitem: options[options.selectedIndex].text + "/" + selectTextGroup,
      }));
    }
    if (name === "stylecategory") {
      setSelectTextGroup(options[options.selectedIndex].text);
      setStyleItemValues((prevValues) => ({
        ...prevValues,
        styleitem: selectText + "/" + options[options.selectedIndex].text,
      }));
    }
    utilityState(e, setStyleItemValues);
  };

  let validcheck = true;
  const validate = (styleItemValues) => {
    if (!styleItemValues.styleitem.trim()) {
      alert("Invalid Country Name");
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(styleItemValues.stylegroup)) {
      alert("Special Charector not allowed");
      validcheck = false;
      return;
    }
    return validcheck;
  };

  useEffect(() => {
    if (!defaultDetails?.Compcode || !defaultDetails?.User || !title) return;

    let isMounted = true;

    const loadData = async () => {
      try {
        const [rightsRes, styleGroupRes, styleCategoryRes, insert_updateRes] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(stylegrouoparams),
          axios.get(StyleCategoryParams),
          axios.get(insert_update),
        ]);

        if (!isMounted) return;

        setUserRights(rightsRes.data);
        setStyGroup(styleGroupRes.data || []);
        setStylecate(styleCategoryRes.data || []);
        setItems(insert_updateRes.data || []);

        setNewButton(1);
      } catch (error) {
        console.error(error);
        setError(error?.message || "Error loading data");
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [defaultDetails?.Compcode, defaultDetails?.User, title]);

  useEffect(() => {
    const filterResult = items.filter((post) => post.stylegroup.includes(search));
    setSize_FilterSearch(filterResult.reverse());
  }, [items, search]);

  const HeadersColumn = [
    { headername: "S.No", field: "SNo" },
    { headername: "id", field: "Asptblstyleitemmasid" },
    { headername: "StyleGroup", field: "stylegroup" },
    { headername: "Category", field: "stylecategory" },
    { headername: "StyleItem", field: "styleitem" },
    { headername: "aliasname", field: "aliasname" },
    { headername: "hsn", field: "hsn" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";

  const StyleItemMaster_Check = async (id) => {
    try {
      const res = await axios.get(`${insert_update}/${id.asptblstyleitemmasid}`);

      if (!res.data || res.data.length === 0) {
        alert("Invalid Data");
        return;
      }

      const data = res.data[0];

      setSelectedText(data.stylegroup);
      setSelectTextGroup(data.stylecategory);

      setStyleItemValues({
        asptblstyleitemmasid: data.asptblstyleitemmasid,
        stylegroup: data.asptblstygrpmasid,
        stylecategory: data.asptblstycatmasid,
        styleitem: data.styleitem,
        aliasname: data.aliasname,
        hsn: data.hsn,
        active: data.active === "T",
      });
    } catch (error) {
      console.error(error);
      alert(error?.message || "Something went wrong");
    } finally {
      setNewButton(1);
    }
  };

  const StyleItemMaster_Save = async () => {
    validate(styleItemValues);
    if (validcheck == true) {
      try {
        const CountryData = {
          asptblstyleitemmasid: styleItemValues.asptblstyleitemmasid > 0 ? styleItemValues.asptblstyleitemmasid : 0,
          stylegroup: styleItemValues.stylegroup,
          stylecategory: styleItemValues.stylecategory,
          styleitem: selectText + "/" + selectTextGroup,
          aliasname: styleItemValues.aliasname,
          hsn: styleItemValues.hsn,
          active: styleItemValues.active === true ? "T" : "F",
        };

        await axios
          .post(`${insert_update}`, CountryData)
          .then((respose) => {
            if (respose.data !== "") {
              if (respose.data.asptblstyleitemmasid > 0) {
                alert("Updated Successfully");
              }
              if (respose.data.asptblstyleitemmasid === 0) {
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
        StyleItemMaster_New();
      }
    } else {
      alert("pls Enter Mandatory Field");
    }
  };

  const StyleItemMaster_Delete = async () => {
    try {
      if (styleItemValues.stylegroup === "") {
        alert(`Empty Not Allowed`);
        return;
      }
      if (styleItemValues.asptblstyleitemmasid >= 1) {
        const asptblstyleitemmasid = styleItemValues.asptblstyleitemmasid;
        await axios
          .delete(`${insert_update}/${asptblstyleitemmasid}`)
          .then((respose) => {
            if (respose.data.asptblstyleitemmasid > 0) {
              alert("Record Deleted Successfully");
              StyleItemMaster_New();
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

  const StyleItemMaster_New = () => {
    setNewButton(1);
    setActive(false);
    setSelectedText("");
    setSelectedText("");
    setStyleItemValues({ asptblstyleitemmasid: 0, stylecategory: "", stylegroup: "", styleitem: "", aliasname: "", hsn: "", active: active });
  };

  const commentsData = useMemo(() => {
    let computedComments = items;
    if (search) {
      computedComments = computedComments.filter((item) => item.styleitem.includes(search));
    }
    setTotalItems(computedComments.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [items, currentPage, search, sorting]);

  const menuButtons = [
    { key: "news", label: "News", action: StyleItemMaster_New },
    { key: "saves", label: "Save", action: StyleItemMaster_Save },
    { key: "deletes", label: "Delete", action: StyleItemMaster_Delete },
    { key: "searches", label: "Search", action: StyleItemMaster_New },
    { key: "prints", label: "Prints", action: StyleItemMaster_New },
    { key: "treebutton", label: "TreeButton", action: StyleItemMaster_New },
    { key: "globalsearch", label: "Globalsearch", action: StyleItemMaster_New },
    { key: "login", label: "Login", action: StyleItemMaster_New },
    { key: "changepassword", label: "Changepassword", action: StyleItemMaster_New },
    { key: "changeskin", label: "Changeskin", action: StyleItemMaster_New },
    { key: "contact", label: "Contact", action: StyleItemMaster_New },
    { key: "pdf", label: "Pdf", action: StyleItemMaster_New },
    { key: "import", label: "Import", action: StyleItemMaster_New },
    { key: "download", label: "Download", action: StyleItemMaster_New },
  ];

  return (
    <div onSubmit={handleSubmit}>
      {userRights.length > 0 && (
        <div className="container-fluid">
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
                <div className="row pt-2 g-2">
                  {/* LEFT FORM */}
                  <div className="col-12 col-lg-5 bg-white p-2">
                    <div className="bloc-tabs">
                      <div className="tabs active-tabs text-center" style={{ backgroundColor: colorValue }}>
                        {title}
                      </div>
                    </div>

                    <div className="content active-content">
                      <fieldset>
                        <div className="bg-light p-2">
                          {/* ID */}
                          <div className="row align-items-center">
                            <label className="col-12 col-md-4 col-form-label">ID</label>
                            <div className="col-12 col-md-8">
                              <input type="text" className="form-control" value={styleItemValues.asptblstyleitemmasid} readOnly />
                            </div>
                          </div>

                          {/* Style Group */}
                          <div className="row align-items-center pt-1">
                            <label className="col-12 col-md-4 col-form-label">Style Group</label>
                            <div className="col-12 col-md-8">
                              <select className="form-select col-12" name="stylegroup" value={styleItemValues.stylegroup} onChange={handleChange}>
                                <option value=""></option>
                                {stygroup?.map((item, index) => (
                                  <option key={index} value={item.asptblstygrpmasid}>
                                    {item.stylegroup}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Style Category */}
                          <div className="row align-items-center pt-1">
                            <label className="col-12 col-md-4 col-form-label">Style Category</label>
                            <div className="col-12 col-md-8">
                              <select className="form-select col-12" name="stylecategory" value={styleItemValues.stylecategory} onChange={handleChange}>
                                <option value=""></option>
                                {stylecate?.map((item, index) => (
                                  <option key={index} value={item.asptblstycatmasid}>
                                    {item.stylecategory}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Style Item */}
                          <div className="row align-items-center pt-1">
                            <label className="col-12 col-md-4 col-form-label">Style Item</label>
                            <div className="col-12 col-md-8">
                              <input type="text" className="form-control" value={styleItemValues.styleitem} readOnly />
                            </div>
                          </div>

                          {/* Alias */}
                          <div className="row align-items-center pt-1">
                            <label className="col-12 col-md-4 col-form-label">Alias Name</label>
                            <div className="col-12 col-md-8">
                              <input type="text" className="form-control" name="aliasname" value={styleItemValues.aliasname} onChange={handleChange} />
                            </div>
                          </div>

                          {/* HSN */}
                          <div className="row align-items-center pt-1">
                            <label className="col-12 col-md-4 col-form-label">HSN Code</label>
                            <div className="col-12 col-md-8">
                              <input type="text" className="form-control" name="hsn" value={styleItemValues.hsn} onChange={handleChange} />
                            </div>
                          </div>

                          {/* Active */}
                          <div className="row align-items-center mb-2">
                            <label className="col-12 col-md-4 col-form-label">Active</label>
                            <div className="col-12 col-md-8">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="active" checked={styleItemValues.active} onChange={handleChange} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  {/* RIGHT TABLE */}
                  <div className="col-12 col-lg-7 bg-white p-2">
                    <div className="bloc-tabs">
                      <div className="tabs active-tabs text-center" style={{ backgroundColor: colorValue }}>
                        {title}
                      </div>
                    </div>

                    <div className={newButton === 1 ? "content active-content" : "content"}>
                      <DataTable
                        heights={heights}
                        colorValue={colorValue}
                        foreValue={foreValue}
                        headers={HeadersColumn}
                        comments={items}
                        setComments={setItems}
                        searches={search}
                        setSearches={setSearch}
                        totalItems={totalItems}
                        setTotalItems={setTotalItems}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sorting={sorting}
                        setSorting={setSorting}
                        ITEM_PER_PAGE={ITEM_PER_PAGE}
                        EditData={StyleItemMaster_Check}
                        commentsData={commentsData}
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

export default StyleItemMaster;
