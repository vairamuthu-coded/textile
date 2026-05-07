import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import { toast } from "react-toastify";

import "../ContextMenu.css";
import ContextMenu from "../ContextMenu";
import ActionButtton from "../ActionButtton";

const SizeGroupMaster = ({ title, subTitle }) => {
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
    sizeGroupValues,
    setSizeGroupValues,
    sizeValues,
    sizeGroupDetails,
    setsizeGroupDetails,
    setLoading,
    loading,
    fetchError,
    setFetchError,
    contextMenu,
    setContextMenu,
  } = useContext(DataContext);

  let ITEM_PER_PAGE = 15;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const insert_update = `${API_URL}/SizeGroupMasters`;
  const SizeParam = `${API_URL}/SizeMasters`;

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState([]);

  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [sizeItems, setSizeItems] = useState([]);
  const [sizeGroup_FilterSearch, setSizeGroup_FilterSearch] = useState([]);
  const [sizeGroupGrid, setSizeGroupGrid] = useState([]);

  setNewButton(1);

  let validcheck = true;

  const validate = (sizeGroupValues) => {
    if (!sizeGroupValues.trim()) {
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(sizeGroupValues)) {
      validcheck = false;
      return;
    }
    return validcheck;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [rightsRes, sizeGroupRes, sizeRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(insert_update), axios.get(SizeParam)]);
        if (!isMounted) return;
        setUserRights(rightsRes.data || []);
        setItems(sizeGroupRes.data || []);
        setSizeItems(sizeRes.data || []);
      } catch (err) {
        if (!isMounted) return;
        toast.error("API Error:", err);

        setFetchError(err.response?.data || err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
  }, [defaultDetails?.Compcode, defaultDetails?.User, title]);

  useEffect(() => {
    const filterResult = items.filter((post) => post.sizegroup.includes(search));
    setSizeGroup_FilterSearch(filterResult);
  }, [items, search]);

  const HeadersColumn = [
    { headername: "", field: "visible" },
    { headername: "id", field: "asptblsizgrpid" },
    { headername: "SizeGroup", field: "sizegroup" },
    { headername: "Active", field: "active" },
  ];

  const heights = "420px";

  const SizeGropupMaster_Check = async (id) => {
    try {
      setSizeGroupValues({ asptblsizgrpid: id.asptblsizgrpid, sizegroup: id.sizegroup, active: id.active === "T" });
      if (id.asptblsizgrpid > 0) {
        var res = await axios.get(`${insert_update}/${id.asptblsizgrpid}`);
        setsizeGroupDetails(res?.data);
      }
    } catch (err) {
      setFetchError(err.response);
    } finally {
      setNewButton(1);
    }
  };

  let maxid = "";
  const ListData = (items) => {
    return items
      .filter((obj) => obj.sizename && obj.sizename !== "")
      .map((obj, index) => ({
        asptblsizgrpDetid: obj.asptblsizgrpDetid === "" || obj.asptblsizgrpDetid === null ? 0 : obj.asptblsizgrpDetid, // ✅ fixed typo
        asptblsizgrpid: sizeGroupValues.asptblsizgrpid || 0,
        sizename: obj.sizename,
        sizeGroupRow: index + 1,
      }));
  };

  const SizeGropupMaster_Save = async () => {
    if (loading) return;

    // ✅ Validation
    if (!sizeGroupValues.sizegroup) {
      toast.error("Size Group is required");
      return;
    }

    if (!sizeGroupDetails.length) {
      toast.error("At least one detail row is required");
      return;
    }

    try {
      setLoading(true);
      const masterData = {
        asptblsizgrpid: sizeGroupValues.asptblsizgrpid > 0 ? sizeGroupValues.asptblsizgrpid : 0,
        sizegroup: sizeGroupValues.sizegroup.toUpperCase(),
        active: sizeGroupValues.active ? "T" : "F",
      };

      const payload = {
        Master: masterData,
        Details: ListData(sizeGroupDetails),
      };

      const response = await axios.post(insert_update, payload);

      if (response.status === 200 || response.status === 201) {
        if (response.data?.error) {
          toast.error(response.data.error);
          return;
        }

        setNewButton(1);
        toast.success("Record Saved Successfully");
        SizeGropupMaster_New();
      } else {
        toast.error("Failed to save data");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Error saving data");
    } finally {
      setLoading(false);
    }
  };

  const SizeGropupMaster_Delete = async () => {
    try {
      if (sizeGroupValues.sizegroup === "") {
        toast.error(`Empty Not Allowed`);
        return;
      }
      if (sizeGroupValues.asptblsizgrpid >= 1) {
        const asptblsizgrpid = sizeGroupValues.asptblsizgrpid;
        const respose = await axios.delete(`${insert_update}/${asptblsizgrpid}`);
        if (respose.data !== "") {
          const res = await axios.get(`${insert_update}`);

          setItems(res.data);
          setNewButton(1);

          toast.success("Record Deleted Successfully");
          SizeGropupMaster_New();
        } else {
          setFetchError(respose.error);
          toast.error("Error " + respose.data);
        }
      }
    } catch (err) {
      if (err.response) {
        toast.error(`Error ${err.message}`);
      }
    }
  };

  const SizeGropupMaster_New = async () => {
    setNewButton(1);
    setsizeGroupDetails([{ asptblsizgrpDetid: "0", sizeGroupGrid: "0", sizename: "", sizeGroupRow: "1" }]);
    setSizeGroupValues({ asptblsizgrpid: "0", sizegroup: "", active: false });

    var res = await axios.get(`${insert_update}`);
    setItems(res.data);
  };

  const commentsData = useMemo(() => {
    let computedComments = items;
    if (search) {
      computedComments = computedComments.filter((item) => item.sizegroup.includes(search));
    }
    setTotalItems(computedComments.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [items, currentPage, search, sorting]);

  const handleChangeCheckbox = (e, index, id) => {
    const { name, value, checked } = e.target;
    const newContacts = [...sizeGroupGrid];
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSizeGroupValues((previousValue) => {
      return {
        ...previousValue,
        [name]: value.toUpperCase(),
      };
    });
  };
  const refs = useRef([]);
  const handleEnter = (e, index) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const values = [...sizeGroupDetails];

    if (name === "sizename") {
      const cleanValue = value.trim();
      const isDuplicate = values.some((item, i) => item.sizename === cleanValue && i !== index);

      if (isDuplicate) {
        toast.error("Duplicate Row not allowed");
        return;
      }
      values[index].sizename = cleanValue;
      setsizeGroupDetails(values);
      if (index === values.length - 1 && cleanValue !== "") {
        handleAddRow();
      }
    }
  };

  const handleAddRow = () => {
    setsizeGroupDetails([...sizeGroupDetails, { asptblsizgrpDetid: "0", sizeGroupGrid: "0", sizename: "", sizeGroupRow: "" }]);
  };

  const handleDeleteRow = (index) => {
    const updated = sizeGroupDetails.filter((_, i) => i !== index);
    setsizeGroupDetails(updated);
    if (sizeGroupDetails.length === 1) {
      setsizeGroupDetails([{ asptblsizgrpDetid: "0", sizeGroupGrid: "0", sizename: "", sizeGroupRow: "" }]);
    }
  };

  const closeMenu = () => {
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };
  const handleRightClick = (e, row, index) => {
    e.preventDefault();

    // Close first to avoid flicker
    setContextMenu((prev) => ({ ...prev, visible: false }));

    setTimeout(() => {
      const menuWidth = 180;
      const menuHeight = 150;

      const x = Math.min(e.pageX, window.innerWidth - menuWidth);
      const y = Math.min(e.pageY, window.innerHeight - menuHeight);

      setContextMenu({
        visible: true,
        x,
        y,
        row,
        index,
      });
    }, 0);
  };

  const handleInsertBefore = () => {
    if (contextMenu.index == null) return;

    const values = [...sizeGroupDetails];
    values.splice(contextMenu.index, 0, { sizename: "" });

    setsizeGroupDetails(values);
    closeMenu();
  };

  const handleInsertAfter = () => {
    if (contextMenu.index == null) return;

    const values = [...sizeGroupDetails];
    values.splice(contextMenu.index + 1, 0, { sizename: "" });

    setsizeGroupDetails(values);
    closeMenu();
  };

  const handleDelete = () => {
    if (contextMenu.index == null) return;

    const values = [...sizeGroupDetails];
    values.splice(contextMenu.index, 1);

    setsizeGroupDetails(values);
    closeMenu();
  };

  const handleDeleteAll = () => {
    setsizeGroupDetails([
      {
        asptblsizgrpDetid: "",
        sizeGroupGrid: "",
        sizename: "",
        sizeGroupRow: "",
      },
    ]);

    closeMenu();
  };

  return (
    <form onSubmit={handleSubmit}>
      {userRights.length > 0 && (
        <div className="container-fluid animate-zoom">
          {!fetchError ? (
            <div style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
              <ActionButtton
                news={SizeGropupMaster_New}
                saves={SizeGropupMaster_Save}
                deletes={SizeGropupMaster_Delete}
                searches={SizeGropupMaster_New}
                prints={SizeGropupMaster_New}
                treebutton={SizeGropupMaster_New}
                globalsearch={SizeGropupMaster_New}
                login={SizeGropupMaster_New}
                changepassword={SizeGropupMaster_New}
                changeskin={SizeGropupMaster_New}
                contact={SizeGropupMaster_New}
                pdf={SizeGropupMaster_New}
                imports={SizeGropupMaster_New}
                download={SizeGropupMaster_New}
                userRights={userRights}
                colorValue={colorValue}
                newButton={newButton}
              />

              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-lg-6 mb-3" style={{ backgroundColor: foreValue }}>
                    <div className="p-2 text-center mb-2" style={{ backgroundColor: colorValue, color: foreValue }}>
                      {title}
                    </div>

                    <div className="container-fluid">
                      <div className="row mb-2 d-none">
                        <label className="col-4 col-md-2">ID</label>
                        <div className="col-8 col-md-4">
                          <input type="text" className="form-control" name="asptblsizgrpid" value={sizeGroupValues.asptblsizgrpid} readOnly />
                        </div>
                      </div>

                      <div className="row mb-2">
                        <label className="col-4 col-md-2">SizeGroup</label>
                        <div className="col-8 col-md-6">
                          <input type="text" className="form-control" name="sizegroup" value={sizeGroupValues.sizegroup} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="row mb-2 align-items-center">
                        <label className="col-4 col-md-2">Active</label>
                        <div className="col-8 col-md-6">
                          <input type="checkbox" className="form-check-input" name="active" checked={sizeGroupValues.active} onChange={handleChange} />
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive mt-3">
                      <div className="table-responsive">
                        <table className="table   align-middle" style={{ width: "50%" }}>
                          <thead style={{ backgroundColor: colorValue, color: foreValue }}>
                            <tr>
                              <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>S.No</th>
                              <th style={{ backgroundColor: colorValue, color: foreValue, textAlign: "center" }}>Size Name</th>
                            </tr>
                          </thead>

                          <tbody>
                            {sizeGroupDetails.map((row, index) => (
                              <tr key={index} onContextMenu={(e) => handleRightClick(e, row, index)}>
                                <td style={{ margin: "0px", padding: "0px", textAlign: "center" }}>{index + 1}</td>
                                <input type="hidden" value={row.asptblsizgrpDetid} />{" "}
                                <td style={{ margin: "0px", padding: "0px" }}>
                                  <select className="col-sm-12 col-md-12 col-lg-12 p-1" name="sizename" value={row.sizename} onChange={(e) => handleInputChange(index, e)}>
                                    <option value=""></option>
                                    {sizeItems?.map((item, i) => (
                                      <option key={i} value={item.asptblsizmasid}>
                                        {item.sizename}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <ContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu} onInsertBefore={handleInsertBefore} onInsertAfter={handleInsertAfter} onDelete={handleDelete} onDeleteAll={handleDeleteAll} />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mb-3" style={{ backgroundColor: foreValue }}>
                    <div className="p-2 text-center" style={{ color: colorValue }}>
                      {subTitle}
                    </div>

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
                      EditData={SizeGropupMaster_Check}
                      commentsData={commentsData}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing>
          )}
        </div>
      )}
    </form>
  );
};

export default SizeGroupMaster;
