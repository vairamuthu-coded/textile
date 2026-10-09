import { useContext, useEffect, useMemo, useState } from "react";
import DataContext from "../context/CreateUserContext";
import DataTable from "../Custom/DataTable";
import SocialMissing from "../Social/SocialMissing";
import Search from "../Custom/Search";
import { toast } from "react-toastify";
import ActionButtton from "../ActionButtton";
import TabNav from "../component/TabNav";
import axios from "axios";

const DesignMaster = ({ title, subTitle }) => {
  const {
    colorValue,
    defaultDetails,
    designValues,
    setDesignValues,
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
    { headername: "Id", field: "asptbldesmasid", visible: "false" },
    { headername: "Design", field: "design", visible: "true" },
    { headername: "Active", field: "active", visible: "true" },
  ];

  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [designItems, setDesignItems] = useState([]);

  const [state_FilterSearch, setState_FilterSearch] = useState([]);
  const [state_Search, setState_Search] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [seqnoData, setseqnoData] = useState([]);

  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };
  const tabs = [
    { id: 1, label: title },
    // { id: 2, label: subTitle },
  ];

  const [checkadesign, setCheckAdesign] = useState(false);
  const [checkchild, setCheckchild] = useState(false);

  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  const [totalItems, setTotalItems] = useState([]);

  const insert_update = `${API_URL}/DesignMasters`;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;

  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        const [rightsRes, proRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(insert_update)]);
        setUserRights(rightsRes.data);
        setDesignItems(proRes.data);
      } catch (error) {
        toast.error(error.message);
        setFetchError(error);
      } finally {
        setNewButton(1);
      }
    };

    fetchMyAPI();
  }, [defaultDetails.Compcode, defaultDetails.User, title]);

  const heights = "380px";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDesignValues((pre) => ({
      ...pre,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (designValues) => {
    if (!designValues.design?.trim()) {
      toast.error("Invalid design");
      return false;
    }

    const specialCharRegex = /[^a-zA-Z0-9\s]/;
    if (specialCharRegex.test(designValues.design)) {
      toast.error("Special Characters Not Adesignowed in design");
      return false;
    }
    return true;
  };

  const DesignMaster_Check = async (row) => {
    try {
      if (row) {
        setDesignValues({
          asptbldesmasid: row.asptbldesmasid,
          design: row.design,
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

  const DesignMaster_Save = async () => {
    try {
      const seqnoData = {
        AsptblDesmasid: designValues.asptbldesmasid > 0 ? designValues.asptbldesmasid : 0,
        Design: designValues.design || "",
        Active: designValues.active === true ? "T" : "F",
      };

      const response = await axios.post(`${insert_update}`, seqnoData);

      if (response?.data.asptbldesmasid > 0) {
        const res = await axios.get(`${insert_update}`);

        if (res?.data) {
          setDesignItems(res.data);
          toast.success(response.data);
        }
      } else {
        toast.error("Error " + response?.data);
      }
    } catch (err) {
      setFetchError(`Error: ${err}`);
    } finally {
      DesignMaster_New();
    }
  };

  const DesignMaster_Delete = async (id) => {
    try {
      if (id === undefined) {
        toast.error("Please select a record to delete");
        return;
      }

      var response = await axios.delete(`${insert_update}/${id}`);
      if (response?.data == "true") {
        toast.success("Record Deleted Successfudesigny");
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
      DesignMaster_New();
    }
  };

  const options = [seqnoData];

  const DesignMaster_New = () => {
    setNewButton(1);
    setDesignValues("");
  };

  const commentsData = useMemo(() => {
    let search = String(state_Search || "").toLowerCase();
    let computedComments = designItems;
    setTotalItems(computedComments.length);
    if (computedComments.length > 0) {
      if (search) {
        computedComments = computedComments.filter((item) => {
          let process = String(item.design || "").toLowerCase();
          return process.includes(search);
        });
      }

      if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
      }
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [designItems, currentPage, state_Search, sorting]);

  return (
    <div onSubmit={handleSubmit}>
      {userRights.length >= 1 && (
        <div className="container-fluid animate-zoom" style={{ backgroundColor: "whitesmoke" }}>
          {!fetchError ? (
            <>
              <div style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
                <ActionButtton
                  news={DesignMaster_New}
                  saves={DesignMaster_Save}
                  deletes={DesignMaster_Delete}
                  searches={DesignMaster_New}
                  prints={DesignMaster_New}
                  treebutton={DesignMaster_New}
                  globalsearch={DesignMaster_New}
                  login={DesignMaster_New}
                  changepassword={DesignMaster_New}
                  changeskin={DesignMaster_New}
                  contact={DesignMaster_New}
                  pdf={DesignMaster_New}
                  imports={DesignMaster_New}
                  download={DesignMaster_New}
                  userRights={userRights}
                  colorValue={colorValue}
                  newButton={newButton}
                  screenHeader="DESIGN MASTER"
                />
                <div className="container-fluid">
                  <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />

                  <div className={newButton === 1 ? "content active-content" : "content"}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="content active-content">
                          <div className="row py-1">
                            <label className="col-md-2"> ID </label>
                            <input className="col-md-4" type="text" name="asptbldesmasid" value={designValues.asptbldesmasid || ""} readOnly />
                          </div>
                          <div className="row">
                            <label className="col-md-2"> Design </label>
                            <input className="col-md-4" type="text" name="design" value={designValues.design || ""} onChange={handleChange} />
                          </div>

                          <div className="row pt-1">
                            <label className="col-md-2"> Active </label>
                            <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                              <input type="checkbox" name="active" checked={designValues.active} onChange={handleChange} />
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
                          ChangeValues={designValues}
                          searchCompCode={searchCompCode}
                          searchUserName={searchUserName}
                        />

                        <DataTable
                          heights={heights}
                          colorValue={colorValue}
                          headers={HeadersColumn}
                          comments={designItems}
                          setComments={setDesignItems}
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
                          EditData={DesignMaster_Check}
                          commentsData={commentsData}
                          setCheckchild={setCheckchild}
                          setCheckAdesign={setCheckAdesign}
                          checkadesign={checkadesign}
                        />
                      </div>
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

export default DesignMaster;
