import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import { toast } from "react-toastify";
import "../ContextMenu.css";
import ContextMenu from "../ContextMenu";
import ActionButtton from "../ActionButtton";
import CustomSelect from "../Custom/CustomSelect";
import TabNav from "../component/TabNav";

const ProcessGroupMaster = ({ title, subTitle }) => {
  const {
    foreValue,
    newButton,
    setNewButton,
    handleSubmit,
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
    proGroValues,
    setProGroValues,
    proGroDetValues,
    setProGroDetValues,
    setLoading,
    loading,
    contextMenu,
    setContextMenu,
  } = useContext(DataContext);

  let ITEM_PER_PAGE = 15;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;
  const insert_update = `${API_URL}/ProcessGroupMasters`;
  const GetProcessSeqParam = `${API_URL}/ProcessGroupSequenceMasters`;
  const GetProcessParam = `${API_URL}/ProcessMaster/GetProcess`;
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const [search, setSearch] = useState("");
  const [proGroSeqValues, setproGroSeqValues] = useState([]);
  const [proGroItems, setProGroItems] = useState([]);
  const [proValues, setProValues] = useState([]);
  const [process_FilterSearch, setprocess_FilterSearch] = useState([]);
  const [asptblprogroid, setasptblprogroid] = useState([]);
  const [userRights, setUserRights] = useState([]);
  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };

  const tabs = [
    { id: 1, label: title },

    { id: 2, label: subTitle },
  ];

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
  let validcheck = true;

  const validate = (proGroValues) => {
    if (!proGroValues.trim()) {
      validcheck = false;
      return;
    }
    if (/^[a-zA-Z]$/.test(proGroValues)) {
      validcheck = false;
      return;
    }
    return validcheck;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [rightsRes, proRes, proSeqRes, proGroRes] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(`${GetProcessParam}`),
          axios.get(`${GetProcessSeqParam}`),
          axios.get(`${insert_update}`),
        ]);
        setUserRights(rightsRes.data || []);
        setProValues(proRes.data || []);
        setproGroSeqValues(proSeqRes.data || []);
        setProGroItems(proGroRes.data);
      } catch (err) {
        console.error("API Error:", err);

        toast.error(err.response?.data || err.message || "Something went wrong");

        setFetchError(err.response?.data || err.message || "Something went wrong");
      } finally {
        setLoading(false);
        setNewButton(1);
      }
    };

    fetchData();
  }, [defaultDetails?.Compcode, defaultDetails?.User, title]);

  useEffect(() => {
    const filterResult = proGroSeqValues.filter((post) => post.processgroup.includes(search));
    setprocess_FilterSearch(filterResult);
  }, [proGroSeqValues, search]);

  const HeadersColumn = [
    { headername: "SNo", field: "SNo", visible: "true" },
    { headername: "", field: "none", visible: "false" },
    { headername: "id", field: "asptblprogroid", visible: "false" },
    { headername: "ProcessGroup", field: "processgroup", visible: "true" },
    { headername: "Active", field: "active", visible: "true" },
  ];

  const createHeadersProcessGroup = (v1 = false, v2 = true) => [
    { field: "sNo", label: "SNo", visible: true, type: "text", widths: "20px", disabled: v1 },
    { field: "asptblprogrodetid", label: "AsptblProGroDetid", visible: v1, type: "text", widths: "10px", disabled: v2 },
    { field: "asptblprogroid", label: "AsptblProGroid", visible: v1, type: "text", widths: "50px", disabled: v1 },
    { field: "process", label: "PROCCESS", visible: true, type: "select", widths: "150px", pattern: "", disabled: v1 },
    { field: "processgroup", label: "ProcessGroup", visible: v1, type: "text", widths: "150px", pattern: "", disabled: v1 },
    { field: "seqno", label: "SEQNO", visible: v2, type: "text", widths: "50px", disabled: v2 },
    { field: "notes", label: "NOTES", visible: 2, type: "text", widths: "50px", disabled: v1 },
    { field: "action", label: "", visible: true, type: "button", widths: "10px", disabled: false },
  ];

  const HeadersProcessGroup = createHeadersProcessGroup(false, true);

  const heights = "420px";

  const inputRefs = useRef([]);

  const focusField = (i) => {
    if (inputRefs.current[i]) {
      inputRefs.current[i].focus();
    }
  };

  const handleEnterFocus = (e, tableid) => {
    const td = e.target.closest("td");
    if (!td) return;

    const tr = td.parentElement;
    const table = tr.closest(tableid);

    if (!table) return;

    let nextRow = tr.RowIndex;
    let nextCell = td.cellIndex;

    switch (e.key) {
      case "Enter":
      case "ArrowRight":
        e.preventDefault();
        nextCell++;
        // Move next row first cell
        if (nextCell >= tr.cells.length) {
          nextCell = 0;
          nextRow++;
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        nextCell--;
        // Move previous row last cell
        if (nextCell < 0) {
          nextRow--;
          if (nextRow >= 0) {
            nextCell = table.rows[nextRow].cells.length - 1;
          }
        }
        break;
      default:
        return;
    }

    // Prevent invalid index
    if (nextRow < 0 || nextCell < 0) return;
    const nextElement = table.rows[nextRow]?.cells[nextCell]?.querySelector("input:not(:disabled), select:not(:disabled), button:not(:disabled), img");

    if (nextElement) {
      nextElement.focus();

      if (nextElement.tagName === "INPUT") {
        nextElement.select();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case "Enter":
      case "Tab":
        e.preventDefault(); // IMPORTANT for Tab
        focusField(index + 1);
        break;
      case "ArrowRight":
        e.preventDefault(); // IMPORTANT for Tab
        focusField(index + 1);
        break;

      case "ArrowLeft":
        e.preventDefault();
        focusField(index - 1);
        break;

      default:
        break;
    }
  };

  const ProcessGroupMaster_Check = async (id) => {
    try {
      if (id.asptblprogroid > 0) {
        var res = await axios.get(`${insert_update}/${id.asptblprogroid}`);
        setProGroValues({ asptblprogroid: id.asptblprogroid, processgroup: res.data[0].asptblprogroseqmasid, active: id.active === "T" });
        setProGroDetValues(res.data);
      }
    } catch (err) {
      setFetchError(err.response);
    } finally {
      setNewButton(1);
    }
  };

  let maxid = "";
  const ListData = (proGroSeqValues) => {
    return proGroSeqValues
      .filter((obj) => obj.process && obj.process !== "")
      .map((obj, index) => ({
        asptblprogrodetid: obj.asptblprogrodetid === "" || obj.asptblprogrodetid === null ? 0 : Number(obj.asptblprogrodetid), // ✅ fixed typo
        asptblprogroid: Number(proGroValues.asptblprogroid || 0),
        process: Number(obj.process),
        processgroup: Number(obj.processgroup),
        seqno: Number(index + 1),
      }));
  };

  const ProcessGroupMaster_Save = async () => {
    if (loading) return;

    // ✅ Validation
    if (!proGroValues.processgroup) {
      toast.error("Size Group is required");
      return;
    }

    if (!proGroDetValues.length) {
      toast.error("At least one detail row is required");
      return;
    }

    try {
      setLoading(true);
      const masterData = {
        asptblprogroid: proGroValues.asptblprogroid > 0 ? Number(proGroValues.asptblprogroid) : 0,
        processgroup: Number(proGroValues.processgroup),
        active: proGroValues.active ? "T" : "F",
      };

      const payload = {
        Master: masterData,
        Details: ListData(proGroDetValues),
      };

      const response = await axios.post(insert_update, payload);

      if (response.status === 200 || response.status === 201) {
        if (response.data?.error) {
          toast.error(response.data.error);
          return;
        }

        setNewButton(1);
        toast.success("Record Saved Successfully");
        ProcessGroupMaster_New();
      } else {
        toast.error("Failed to save data");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Error saving data");
    } finally {
      setLoading(false);
    }
  };

  const ProcessGroupMaster_Delete = async () => {
    // try {
    //   if (proGroValues.process === "") {
    //     toast.error(`Empty Not Allowed`);
    //     return;
    //   }
    //   if (proGroValues.asptblprogroid >= 1) {
    //     const asptblprogroid = proGroValues.asptblprogroid;
    //     const respose = await axios.delete(`${insert_update}/${asptblprogroid}`);
    //     if (respose.data !== "") {
    //       const res = await axios.get(`${insert_update}`);
    //       setproGroSeqValues(res.data);
    //       setNewButton(1);
    //       toast.success("Record Deleted Successfully");
    //       ProcessGroupMaster_New();
    //     } else {
    //       setFetchError(respose.error);
    //       toast.error("Error " + respose.data);
    //     }
    //   }
    // } catch (err) {
    //   if (err.response) {
    //     toast.error(`Error ${err.message}`);
    //   }
    // }
  };

  const ProcessGroupMaster_New = async () => {
    setNewButton(1);
    setProGroDetValues([{ asptblprogrodetid: "0", asptblprogroid: "0", process: "", processgroup: "", seqno: "1" }]);
    setProGroValues({ asptblprogroid: "0", processgroup: "", active: false });

    var res = await axios.get(`${insert_update}`);
    setProGroItems(res.data);
  };

  const commentsData = useMemo(() => {
    let computedComments = proGroItems;
    if (search) {
      computedComments = computedComments.filter((item) => item.processgroup.includes(search));
    }
    setTotalItems(computedComments.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [proGroItems, currentPage, search, sorting]);

  const handleChangeCheckbox = (e, index, id) => {
    const { name, value, checked } = e.target;
    const newContacts = [...asptblprogroid];
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProGroValues((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const values = [...proGroDetValues];

    if (name === "process") {
      const cleanValue = value.trim();
      const isDuplicate = values.some((item, i) => item.process === cleanValue && i !== index);

      if (isDuplicate) {
        toast.error("Duplicate Row not allowed");
        return;
      }
      values[index].process = cleanValue;
      setProGroDetValues(values);
      // if (index === values.length - 1 && cleanValue !== "") {
      //   handleAddRow();
      // }
    }
  };

  const handleAddRow = (RowIndex) => {
    setProGroDetValues([...proGroDetValues, { asptblprogrodetid: "0", asptblprogroid: "0", process: "", processgroup: "", seqno: Number(RowIndex) }]);
  };

  const handleDeleteRow = (index) => {
    const updated = proGroDetValues.filter((_, i) => i !== index);
    setProGroDetValues(updated);
    if (proGroDetValues.length === 1) {
      setProGroDetValues([{ asptblprogrodetid: "0", asptblprogroid: "0", process: "", processgroup: "", seqno: "" }]);
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

    const values = [...proGroDetValues];
    values.splice(contextMenu.index, 0, { process: "" });
    setProGroDetValues(values);
    closeMenu();
  };

  const handleInsertAfter = () => {
    if (contextMenu.index == null) return;

    const values = [...proGroDetValues];
    values.splice(contextMenu.index + 1, 0, { process: "" });

    setProGroDetValues(values);
    closeMenu();
  };

  const handleDelete = () => {
    if (contextMenu.index == null) return;

    const values = [...proGroDetValues];
    values.splice(contextMenu.index, 1);

    setProGroDetValues(values);
    closeMenu();
  };

  const handleDeleteAll = () => {
    setProGroDetValues([
      {
        asptblprogrodetid: "",
        asptblprogroid: "",
        process: "",
        processgroup: "",
        seqno: "",
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
                news={ProcessGroupMaster_New}
                saves={ProcessGroupMaster_Save}
                deletes={ProcessGroupMaster_Delete}
                searches={ProcessGroupMaster_New}
                prints={ProcessGroupMaster_New}
                treebutton={ProcessGroupMaster_New}
                globalsearch={ProcessGroupMaster_New}
                login={ProcessGroupMaster_New}
                changepassword={ProcessGroupMaster_New}
                changeskin={ProcessGroupMaster_New}
                contact={ProcessGroupMaster_New}
                pdf={ProcessGroupMaster_New}
                imports={ProcessGroupMaster_New}
                download={ProcessGroupMaster_New}
                userRights={userRights}
                colorValue={colorValue}
                newButton={newButton}
              />

              <div className="container-fluid">
                <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />
                <div className="row">
                  <div className={newButton === 1 ? "content active-content" : "content"}>
                    <div className="col-5 col-lg-5 my-3" style={{ backgroundColor: foreValue }}>
                      <div className="container-fluid">
                        <div className="row mb-2 d-none">
                          <label className="col-2">ID</label>
                          <div className="col-6">
                            <input type="text" className="form-control" name="asptblprogroid" value={proGroValues.asptblprogroid} readOnly />
                          </div>
                        </div>

                        <div className="row mb-2">
                          <label className="col-2 ">process</label>
                          <div className="col-6">
                            <CustomSelect
                              visible="block"
                              className="col-12 form-select"
                              name="processgroup"
                              value={proGroValues.processgroup || ""}
                              onChange={handleChange}
                              colorValue={colorValue}
                              tabIndex={10}
                              ref={(el) => (refs.current[10] = el)}
                              onKeyDown={(e) => handleEnter(e, 10)}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                            >
                              {proGroSeqValues !== null &&
                                proGroSeqValues.map((result, index) => (
                                  <option key={index} value={result.asptblprogroseqmasid}>
                                    {result.processgroup}
                                  </option>
                                ))}
                            </CustomSelect>
                          </div>
                        </div>

                        <div className="row mb-2 align-proGroSeqValues-center">
                          <label className="col-2">Active</label>
                          <div className="col-6">
                            <input type="checkbox" className="form-check-input" name="active" checked={proGroValues.active} onChange={handleChange} />
                          </div>
                        </div>
                      </div>

                      <div className="row animate-zoom">
                        <div className="table-responsive">
                          <div className="table-responsive" style={{ minHeight: "300px", overflow: "auto" }}>
                            <table className="table table-bordered table-sm align-middle mb-0 " id="ProGroupTable">
                              <thead style={{ backgroundColor: colorValue, color: foreValue, position: "sticky" }}>
                                <tr>
                                  {HeadersProcessGroup.filter((col) => col.visible).map((col) => (
                                    <th
                                      key={col.field}
                                      style={{
                                        width: col.widths,
                                        minWidth: col.widths,
                                        fontFamily: "Roboto",
                                        fontSize: "var(--bs-font-sm)",
                                        backgroundColor: colorValue,
                                        color: foreValue,
                                        padding: "0",
                                        margin: "0",
                                      }}
                                      className="p-2"
                                    >
                                      {col.label}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {proGroDetValues.map((row, RowIndex) => (
                                  <tr key={RowIndex} style={{ margin: "0", padding: "0" }} onContextMenu={(e) => handleRightClick(e, row, RowIndex)}>
                                    {HeadersProcessGroup.filter((col) => col.visible).map((col, colIndex) => {
                                      const value = row[col.field] ?? "";

                                      const commonStyle = {
                                        width: col.widths,
                                        minWidth: col.widths,
                                        padding: "0",
                                        margin: "0",
                                        height: col.heights,
                                        alignItems: col.alignItems,
                                      };

                                      // S.No
                                      if (col.field === "sNo") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input type="text" className="w-100 form-control" value={RowIndex + 1} disabled={true} readOnly />
                                          </td>
                                        );
                                      }

                                      // TEXT
                                      if (col.type === "text" && col.field === "processgroup") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={proGroValues.processgroup}
                                              disabled={col.disabled}
                                              onChange={(e) => handleInputChange(RowIndex, e)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#ProGroupTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.type === "text" && col.field === "seqno") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={RowIndex}
                                              disabled={col.disabled}
                                              onChange={(e) => handleInputChange(RowIndex, e)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#ProGroupTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }
                                      if (col.type === "text") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <input
                                              type="text"
                                              className="w-100 form-control"
                                              value={value}
                                              disabled={col.disabled}
                                              onChange={(e) => handleInputChange(RowIndex, e)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#ProGroupTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }

                                      // SELECT
                                      if (col.type === "select") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <select className="w-100 no-arrow" style={{ padding: "5px" }} value={row.process ?? ""} name={col.field} disabled={col.disabled} onChange={(e) => handleInputChange(RowIndex, e)}>
                                              <option value=""></option>

                                              {proValues?.map((item, i) => (
                                                <option key={i} value={item.asptblpromasid}>
                                                  {item.processname}
                                                </option>
                                              ))}
                                            </select>
                                          </td>
                                        );
                                      }

                                      // BUTTON
                                      if (col.type === "button") {
                                        return (
                                          <td key={colIndex} className="p-0 m-0" style={commonStyle}>
                                            <button
                                              type="button"
                                              style={{
                                                width: "0px",
                                                margin: "0",
                                                padding: "0",
                                                border: "0",
                                              }}
                                              disabled={col.disabled}
                                              onFocus={() => handleAddRow(RowIndex)}
                                              onKeyDown={(e) => {
                                                handleEnterFocus(e, "#ProGroupTable");
                                              }}
                                            />
                                          </td>
                                        );
                                      }

                                      return null;
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <ContextMenu contextMenu={contextMenu} setContextMenu={setContextMenu} onInsertBefore={handleInsertBefore} onInsertAfter={handleInsertAfter} onDelete={handleDelete} onDeleteAll={handleDeleteAll} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={newButton === 2 ? "content active-content" : "content"}>
                    <div className="col-12 col-lg-12 mb-3" style={{ backgroundColor: foreValue, textAlign: "right" }}>
                      <div className="p-2 text-center" style={{ color: colorValue }}>
                        {subTitle}
                      </div>

                      <DataTable
                        heights={heights}
                        colorValue={colorValue}
                        headers={HeadersColumn}
                        comments={proGroItems}
                        setComments={setProGroItems}
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
                        EditData={ProcessGroupMaster_Check}
                        commentsData={commentsData}
                        checkchild={checkchild}
                        setCheckchild={setCheckchild}
                        checkall={checkall}
                        setCheckAll={setCheckAll}
                      />
                    </div>
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

export default ProcessGroupMaster;
