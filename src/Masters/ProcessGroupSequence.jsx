import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import styled from "styled-components";
import { toast } from "react-toastify";
import ActionButtton from "../ActionButtton";
import TabNav from "../component/TabNav";

const ProcessGroupSequence = ({ title, subTitle }) => {
  const {
    colorValue,
    defaultDetails,
    proGroSeqValues,
    setProGroSeqValues,
    foreValue,
    newButton,
    setNewButton,
    inputref,
    handleSubmit,
    userRights,
    setUserRights,
    currentPage,
    setCurrentPage,
    API_URL,
    handlepage,
    sorting,
    setSorting,
    ITEM_PER_PAGE,
    tabindex,
    state_seqnoData,
    CityParam,
    searchLable1,
    searchLable2,
    searchLable3,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    color1,
  } = useContext(DataContext);

  const HeadersColumn = [
    { headername: "SNo", field: "SNo", visible: "true" },
    { headername: "", field: "none", visible: "true" },
    { headername: "Id", field: "asptblprogroseqmasid", visible: "false" },
    { headername: "ProcessGroup", field: "processgroup", visible: "true" },
    { headername: "SeqNo", field: "seqno", visible: "true" },
    { headername: "Active", field: "active", visible: "true" },
  ];

  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [processgroupItems, setprocessgroupItems] = useState([]);

  const [state_FilterSearch, setState_FilterSearch] = useState([]);
  const [state_Search, setState_Search] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [seqnoData, setseqnoData] = useState([]);
  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };
  const tabs = [
    { id: 1, label: title },

    { id: 2, label: subTitle },
  ];
  const insert_update = API_URL + "/ProcessGroupSequenceMasters";

  const [checkall, setCheckAll] = useState(false);
  const [checkchild, setCheckchild] = useState(false);
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  const [totalItems, setTotalItems] = useState([]);
  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        const [rightsRes, proRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios(`${insert_update}`)]);
        setUserRights(rightsRes.data);

        setprocessgroupItems(proRes.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setNewButton(1);
      }
    };
    fetchMyAPI();
  }, []);

  const heights = "380px";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProGroSeqValues((pre) => ({
      ...pre,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (proGroSeqValues) => {
    // 1. State name required
    if (!proGroSeqValues.processgroup?.trim()) {
      toast.error("Invalid Process Group Sequence");
      return false;
    }

    // 2. seqno required
    if (!proGroSeqValues.seqno) {
      toast.error("Invalid seqno ");
      return false;
    }

    // 3. Special character check for state name (if needed)
    const specialCharRegex = /[^a-zA-Z0-9\s]/;

    if (specialCharRegex.test(proGroSeqValues.processgroup)) {
      toast.error("Special Characters Not Allowed in Process Group Sequence");
      return false;
    }

    return true; // validation passed
  };

  const ProcessGroupSeqMaster_Check = async (id) => {
    try {
      if (id !== "") {
        setProGroSeqValues({
          asptblprogroseqmasid: id.asptblprogroseqmasid,
          processgroup: id.processgroup,
          seqno: Number(id.seqno),
          active: id.active === "T" ? true : false,
        });
      } else {
        toast.error(id);
      }
    } catch (err) {
      toast.error(err);
    }

    setNewButton(1);
  };

  const ProcessGroupSeqMaster_Save = async () => {
    const isValid = validate(proGroSeqValues);
    if (!isValid) return;

    try {
      const seqnoData = {
        asptblprogroseqmasid: proGroSeqValues.asptblprogroseqmasid > 0 ? proGroSeqValues.asptblprogroseqmasid : 0,
        processgroup: proGroSeqValues.processgroup.toUpperCase() || "",
        seqno: proGroSeqValues.seqno,
        active: proGroSeqValues.active === true ? "T" : "F",
      };

      const response = await axios.post(`${insert_update}`, seqnoData);

      if (response?.data === true) {
        const res = await axios.get(`${insert_update}`);

        if (res?.data) {
          setprocessgroupItems(res.data);
          toast.success(response.data);
        }
      } else {
        toast.error("Error " + response?.data);
      }
    } catch (err) {
      setFetchError(`Error: ${err}`);
    } finally {
      ProcessGroupSeqMaster_New();
    }
  };

  const ProcessGroupSeqMaster_Delete = async (id) => {
    try {
      if (id === undefined) {
        toast.error("Please select a record to delete");
        return;
      }

      var response = await axios.delete(`${insert_update}/${id}`);
      if (response?.data == "true") {
        toast.success("Record Deleted Successfully");
        setNewButton(1);
      } else {
        setFetchError(response?.data);
        toast.error(response?.data);
      }
    } catch (err) {
      if (err.response) {
        toast.error(`Error ${err.message}`);
      }
    } finally {
      ProcessGroupSeqMaster_New();
    }
  };

  const options = [seqnoData];

  const ProcessGroupSeqMaster_New = () => {
    setNewButton(1);
    setProGroSeqValues([]);
  };

  const commentsData = useMemo(() => {
    let search = String(state_Search || "").toLowerCase();
    let computedComments = processgroupItems;
    setTotalItems(computedComments.length);
    if (computedComments.length > 0) {
      if (search) {
        computedComments = computedComments.filter((item) => {
          let process = String(item.processgroup || "").toLowerCase();
          let seqno = String(item.seqno || "").toLowerCase();
          return process.includes(search) || seqno.includes(search);
        });
      }

      if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
      }
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [processgroupItems, currentPage, state_Search, sorting]);

  return (
    <div onSubmit={handleSubmit}>
      {userRights.length >= 1 && (
        <div className="container-fluid animate-zoom" style={{ backgroundColor: "whitesmoke" }}>
          {!fetchError ? (
            <>
              <div style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
                <ActionButtton
                  news={ProcessGroupSeqMaster_New}
                  saves={ProcessGroupSeqMaster_Save}
                  deletes={ProcessGroupSeqMaster_Delete}
                  searches={ProcessGroupSeqMaster_New}
                  prints={ProcessGroupSeqMaster_New}
                  treebutton={ProcessGroupSeqMaster_New}
                  globalsearch={ProcessGroupSeqMaster_New}
                  login={ProcessGroupSeqMaster_New}
                  changepassword={ProcessGroupSeqMaster_New}
                  changeskin={ProcessGroupSeqMaster_New}
                  contact={ProcessGroupSeqMaster_New}
                  pdf={ProcessGroupSeqMaster_New}
                  imports={ProcessGroupSeqMaster_New}
                  download={ProcessGroupSeqMaster_New}
                  userRights={userRights}
                  colorValue={colorValue}
                  newButton={newButton}
                  screenHeader="PROCESS GROUP SEQUENCE MASTER"
                />
                <div className="container-fluid">
                  <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />

                  <div className={newButton === 1 ? "content active-content" : "content"}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="content active-content">
                          <div className="row py-1">
                            <label className="col-md-2"> ID </label>
                            <input className="col-md-4" type="text" name="asptblprogroseqmasid" value={proGroSeqValues.asptblprogroseqmasid || ""} readOnly />
                          </div>
                          <div className="row">
                            <label className="col-md-2"> Process </label>
                            <input className="col-md-4" type="text" name="processgroup" value={proGroSeqValues.processgroup || ""} onChange={handleChange} />
                          </div>

                          <div className="row py-1">
                            <label className="col-md-2"> SeqNo </label>

                            <input className="col-md-4" type="number" name="seqno" value={proGroSeqValues.seqno || ""} onChange={handleChange} />
                          </div>

                          <div className="row">
                            <label className="col-md-2"> Active </label>
                            <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                              <input type="checkbox" name="active" checked={proGroSeqValues.active} onChange={handleChange} />
                              <span></span>
                              <i className="indicator"></i>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 right">
                        <Search
                          colorValue={colorValue}
                          searchs={state_Search}
                          setsearchs={setState_Search}
                          SearchLable1={searchLable1}
                          SearchLable2={searchLable2}
                          SearchLable3={searchLable3}
                          stylecolor={foreValue}
                          handleChange={handleChange}
                          ChangeValues={proGroSeqValues}
                          searchCompCode={searchCompCode}
                          searchUserName={searchUserName}
                        />

                        <DataTable
                          heights={heights}
                          colorValue={colorValue}
                          headers={HeadersColumn}
                          comments={processgroupItems}
                          setComments={setprocessgroupItems}
                          foreValue={foreValue}
                          searches={state_Search}
                          setSearches={setState_Search}
                          totalItems={totalItems}
                          setTotalItems={setTotalItems}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          sorting={sorting}
                          setSorting={setSorting}
                          ITEM_PER_PAGE={ITEM_PER_PAGE}
                          EditData={ProcessGroupSeqMaster_Check}
                          commentsData={commentsData}
                          setCheckchild={setCheckchild}
                          setCheckAll={setCheckAll}
                          checkall={checkall}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={newButton === 2 ? "content active-content" : "content"}>Tesing</div>
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

export default ProcessGroupSequence;
