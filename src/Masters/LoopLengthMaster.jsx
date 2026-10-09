import { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import ActionButtton from "../ActionButtton";
import TabNav from "../component/TabNav";

const LoopLengthMaster = ({ title, subTitle }) => {
  const {
    colorValue,
    defaultDetails,
    loopLengthValues,
    setLoopLengthValues,
    newButton,
    setNewButton,
    foreValue,
    handleSubmit,
    userRights,
    setUserRights,
    currentPage,
    setCurrentPage,
    API_URL,
    sorting,
    setSorting,
    ITEM_PER_PAGE,
    searchLable1,
    searchLable2,
    searchLable3,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
  } = useContext(DataContext);

  const HeadersColumn = [
    { headername: "SNo", field: "SNo", visible: "true" },
    { headername: "", field: "none", visible: "true" },
    { headername: "Id", field: "asptblllmasid", visible: "false" },
    { headername: "LL", field: "ll", visible: "true" },
    { headername: "Active", field: "active", visible: "true" },
  ];

  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [lLItems, setLLItems] = useState([]);

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
  const insert_update = API_URL + "/LoopLengthMasters";

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
        setLLItems(proRes.data);
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
    setLoopLengthValues((pre) => ({
      ...pre,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (loopLengthValues) => {
    if (!loopLengthValues.LL?.trim()) {
      toast.error("Invalid LL");
      return false;
    }

    const specialCharRegex = /[^a-zA-Z0-9\s]/;
    if (specialCharRegex.test(loopLengthValues.LL)) {
      toast.error("Special Characters Not Allowed in LL");
      return false;
    }
    return true;
  };

  const LoopLengthMaster_Check = async (row) => {
    try {
      if (row) {
        setLoopLengthValues({
          asptblllmasid: row.asptblllmasid,
          ll: row.ll,
          active: row.active === "T",
        });
      } else {
        toast.error("Record not found");
      }
    } catch (err) {
      toast.error(err.message);
    }

    setNewButton(1);
  };

  const LoopLengthMaster_Save = async () => {
    try {
      const seqnoData = {
        Asptblllmasid: loopLengthValues.asptblllmasid > 0 ? loopLengthValues.asptblllmasid : 0,
        LL: loopLengthValues.ll.toUpperCase() || "",
        Active: loopLengthValues.active === true ? "T" : "F",
      };

      const response = await axios.post(`${insert_update}`, seqnoData);

      if (response?.data.asptblllmasid > 0) {
        const res = await axios.get(`${insert_update}`);

        if (res?.data) {
          setLLItems(res.data);
          toast.success(response.data);
        }
      } else {
        toast.error("Error " + response?.data);
      }
    } catch (err) {
      setFetchError(`Error: ${err}`);
    } finally {
      LoopLengthMaster_New();
    }
  };

  const LoopLengthMaster_Delete = async (id) => {
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
      LoopLengthMaster_New();
    }
  };

  const options = [seqnoData];

  const LoopLengthMaster_New = () => {
    setNewButton(1);
    setLoopLengthValues([]);
  };

  const commentsData = useMemo(() => {
    let search = String(state_Search || "").toLowerCase();
    let computedComments = lLItems;
    setTotalItems(computedComments.length);
    if (computedComments.length > 0) {
      if (search) {
        computedComments = computedComments.filter((item) => {
          let process = String(item.ll || "").toLowerCase();
          return process.includes(search);
        });
      }

      if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
      }
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [lLItems, currentPage, state_Search, sorting]);

  return (
    <div onSubmit={handleSubmit}>
      {userRights.length >= 1 && (
        <div className="container-fluid animate-zoom" style={{ backgroundColor: "whitesmoke" }}>
          {!fetchError ? (
            <>
              <div style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
                <ActionButtton
                  news={LoopLengthMaster_New}
                  saves={LoopLengthMaster_Save}
                  deletes={LoopLengthMaster_Delete}
                  searches={LoopLengthMaster_New}
                  prints={LoopLengthMaster_New}
                  treebutton={LoopLengthMaster_New}
                  globalsearch={LoopLengthMaster_New}
                  login={LoopLengthMaster_New}
                  changepassword={LoopLengthMaster_New}
                  changeskin={LoopLengthMaster_New}
                  contact={LoopLengthMaster_New}
                  pdf={LoopLengthMaster_New}
                  imports={LoopLengthMaster_New}
                  download={LoopLengthMaster_New}
                  userRights={userRights}
                  colorValue={colorValue}
                  newButton={newButton}
                  screenHeader="LOOP LENGTH MASTER"
                />
                <div className="container-fluid">
                  <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />

                  <div className={newButton === 1 ? "content active-content" : "content"}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="content active-content">
                          <div className="row py-1">
                            <label className="col-md-2"> ID </label>
                            <input className="col-md-4" type="text" name="asptblllmasid" value={loopLengthValues.asptblllmasid || ""} readOnly />
                          </div>
                          <div className="row">
                            <label className="col-md-2"> LL </label>
                            <input className="col-md-4" type="text" name="ll" value={loopLengthValues.ll || ""} onChange={handleChange} />
                          </div>

                          <div className="row pt-1">
                            <label className="col-md-2"> Active </label>
                            <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                              <input type="checkbox" name="active" checked={loopLengthValues.active} onChange={handleChange} />
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
                          ChangeValues={loopLengthValues}
                          searchCompCode={searchCompCode}
                          searchUserName={searchUserName}
                        />

                        <DataTable
                          heights={heights}
                          colorValue={colorValue}
                          headers={HeadersColumn}
                          comments={lLItems}
                          setComments={setLLItems}
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
                          EditData={LoopLengthMaster_Check}
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

export default LoopLengthMaster;
