import { useContext, useEffect, useMemo, useState } from "react";
import DataContext from "../context/CreateUserContext";

import Search from "../Custom/Search";
import { toast } from "react-toastify";
import TabNav from "../component/TabNav";
import axios from "axios";
import SocialMissing from "../Social/SocialMissing";
import DataTable from "../Custom/DataTable";
import ActionButtton from "../ActionButtton";

const PortionMaster = ({ title, subTitle }) => {
  const {
    colorValue,
    defaultDetails,
    portionValues,
    setPortionValues,
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
    { headername: "Id", field: "asptblpormasid", visible: "false" },
    { headername: "Portion", field: "portion", visible: "true" },
    { headername: "Active", field: "active", visible: "true" },
  ];

  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [portionItems, setportionItems] = useState([]);

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

  const [checkaportion, setCheckAportion] = useState(false);
  const [checkchild, setCheckchild] = useState(false);

  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");
  const [totalItems, setTotalItems] = useState([]);

  const insert_update = `${API_URL}/PortionMasters`;
  const userrightsMenuCheck = `${API_URL}/UserRights/userrightsMenuCheck`;

  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        const [rightsRes, proRes] = await Promise.all([axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`), axios.get(insert_update)]);

        setUserRights(rightsRes.data);
        setportionItems(proRes.data);
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
    setPortionValues((pre) => ({
      ...pre,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (portionValues) => {
    if (!portionValues.portion?.trim()) {
      toast.error("Invalid portion");
      return false;
    }

    const specialCharRegex = /[^a-zA-Z0-9\s]/;
    if (specialCharRegex.test(portionValues.portion)) {
      toast.error("Special Characters Not Aportionowed in portion");
      return false;
    }
    return true;
  };

  const PortionMaster_Check = async (row) => {
    try {
      if (row) {
        setPortionValues({
          asptblpormasid: row.asptblpormasid,
          portion: row.portion,
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

  const PortionMaster_Save = async () => {
    try {
      const seqnoData = {
        Asptblpormasid: portionValues.asptblpormasid > 0 ? portionValues.asptblpormasid : 0,
        Portion: portionValues.portion || "",
        Active: portionValues.active === true ? "T" : "F",
      };

      const response = await axios.post(`${insert_update}`, seqnoData);

      if (response?.data.asptblpormasid > 0) {
        const res = await axios.get(`${insert_update}`);

        if (res?.data) {
          setportionItems(res.data);
          toast.success(response.data);
        }
      } else {
        toast.error("Error " + response?.data);
      }
    } catch (err) {
      setFetchError(`Error: ${err}`);
    } finally {
      PortionMaster_New();
    }
  };

  const PortionMaster_Delete = async (id) => {
    try {
      if (id === undefined) {
        toast.error("Please select a record to delete");
        return;
      }

      var response = await axios.delete(`${insert_update}/${id}`);
      if (response?.data == "true") {
        toast.success("Record Deleted Successfuportiony");
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
      PortionMaster_New();
    }
  };

  const options = [seqnoData];

  const PortionMaster_New = () => {
    setNewButton(1);
    setPortionValues("");
  };

  const commentsData = useMemo(() => {
    let search = String(state_Search || "").toLowerCase();
    let computedComments = portionItems;
    setTotalItems(computedComments.length);
    if (computedComments.length > 0) {
      if (search) {
        computedComments = computedComments.filter((item) => {
          let process = String(item.portion || "").toLowerCase();
          return process.includes(search);
        });
      }

      if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
      }
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [portionItems, currentPage, state_Search, sorting]);

  return (
    <div onSubmit={handleSubmit}>
      {userRights.length >= 1 && (
        <div className="container-fluid animate-zoom" style={{ backgroundColor: "whitesmoke" }}>
          {!fetchError ? (
            <>
              <div style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
                <ActionButtton
                  news={PortionMaster_New}
                  saves={PortionMaster_Save}
                  deletes={PortionMaster_Delete}
                  searches={PortionMaster_New}
                  prints={PortionMaster_New}
                  treebutton={PortionMaster_New}
                  globalsearch={PortionMaster_New}
                  login={PortionMaster_New}
                  changepassword={PortionMaster_New}
                  changeskin={PortionMaster_New}
                  contact={PortionMaster_New}
                  pdf={PortionMaster_New}
                  imports={PortionMaster_New}
                  download={PortionMaster_New}
                  userRights={userRights}
                  colorValue={colorValue}
                  newButton={newButton}
                  screenHeader="PORTION MASTER"
                />
                <div className="container-fluid">
                  <TabNav tabs={tabs} onTabClick={TabIndexClick} colorValue={colorValue} isActive={(tab) => newButton === tab.id || (tab.id === 1 && newButton === 2)} />

                  <div className={newButton === 1 ? "content active-content" : "content"}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="content active-content">
                          <div className="row py-1">
                            <label className="col-md-2"> ID </label>
                            <input className="col-md-4" type="text" name="asptblpormasid" value={portionValues.asptblpormasid || ""} readOnly />
                          </div>
                          <div className="row">
                            <label className="col-md-2"> Portion </label>
                            <input className="col-md-4" type="text" name="portion" value={portionValues.portion || ""} onChange={handleChange} />
                          </div>

                          <div className="row pt-1">
                            <label className="col-md-2"> Active </label>
                            <label className="checkbox" style={{ padding: "0px", width: "60px" }}>
                              <input type="checkbox" name="active" checked={portionValues.active} onChange={handleChange} />
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
                          ChangeValues={portionValues}
                          searchCompCode={searchCompCode}
                          searchUserName={searchUserName}
                        />

                        <DataTable
                          heights={heights}
                          colorValue={colorValue}
                          headers={HeadersColumn}
                          comments={portionItems}
                          setComments={setportionItems}
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
                          EditData={PortionMaster_Check}
                          commentsData={commentsData}
                          setCheckchild={setCheckchild}
                          setCheckAportion={setCheckAportion}
                          checkaportion={checkaportion}
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

export default PortionMaster;
