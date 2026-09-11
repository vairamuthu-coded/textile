import { useContext, useEffect, useMemo, useState } from "react";
import DataContext from "../../context/CreateUserContext";
import axios from "axios";
import Search from "../../Custom/Search";
import DataTable from "../../Custom/DataTable";
import ActionButtton from "../../ActionButtton.jsx";
import TabNav from "../../component/TabNav.js";
import { Button } from "bootstrap";
const DeviceCommunication = ({ title, subTitle }) => {
  const [att, setAtt] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const {
    newButton,
    setNewButton,
    inputref,
    foreValue,
    handleSubmit,
    colorValue,
    defaultDetails,
    cityValues,
    setCityValues,
    cityStateData,
    setCityStateData,
    cityCountryData,
    setCityCountryData,
    selectedTitle,
    userRights,
    setUserRights,
    setFetchError,
    API_URL,
    currentPage,
    setCurrentPage,
    sorting,
    setSorting,
    ITEM_PER_PAGE,
    searchLable1,
    searchLable2,
    searchLable3,
    color1,
    handlepage,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
  } = useContext(DataContext);
  const [city_FilterSearch, setCity_FilterSearch] = useState([]);
  const [attendance_FilterSearch, setattendance_FilterSearch] = useState([]);
  const [att_Search, setAtt_Search] = useState([]);
  const [attendance_Search, setAttendance_Search] = useState([]);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [totalItems1, setTotalItems1] = useState([]);
  const [userRights1, setUserRights1] = useState([]);
  const [checkall, setCheckAll] = useState(false);
  const [newButton1, setNewButton1] = useState(4);

  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const CityParam = "/CityMaster/GridLoad";
  const StateParam = "/StateMaster/SelectCommond";
  const CountryParam = "/StateMaster/GridLoad";
  const insert_update = API_URL + "/CityMaster/Saves";
  const deleteData = "/CityMaster/DeleteCommond";

  const heights = "260px";
  let ITEM_PER_PAGE1 = 1000;
  setSearchLable1("Search");
  setSearchLable2("");
  setSearchLable3("");

  const tabs = [{ id: 1, label: "Device Communication" }];

  const tabs1 = [
    { id: 1, label: "Finger Transfer", param: "Finger Transfer" },
    { id: 2, label: "Face Transfer", param: "Face Transfer" },
    { id: 3, label: "Card Transfer", param: "Card Transfer" },
    { id: 4, label: "Machine Data Clear", param: "Machine Data Clear" },
    { id: 5, label: "Attendance Logs", param: "Attendance Logs" },
    { id: 6, label: "Remove From Machines", param: "Remove From Machines" },
  ];

  useEffect(() => {
    async function fetApi() {
      await axios
        .get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`)
        .then((res0) => {
          setUserRights(res0.data);
        })
        .catch((error) => {
          setFetchError(error);
        });
    }

    fetApi();
  }, []);

  useEffect(() => {
    if (att.length > 3) {
      const filterResult = att.filter((item, index) => JSON.stringify(item.userId).includes(att_Search));
      if (filterResult !== null) {
        setCity_FilterSearch(filterResult.reverse());
      }
    }
    if (attendance.length > 3) {
      const filterResult = attendance.filter((item, index) => JSON.stringify(item.deviceUserId).includes(attendance_Search));
      if (filterResult !== null) {
        setattendance_FilterSearch(filterResult.reverse());
      }
    }
  }, [att, att_Search]);

  const HeadersColumn = [
    { headername: "", field: "visible" },
    { headername: "SNo", field: "SNo" },
    { headername: "userId", field: "userId" },
    { headername: "cardno", field: "cardno" },
  ];

  const HeadersColumn1 = [
    { headername: "", field: "visible" },
    { headername: "SNo", field: "SNo" },
    { headername: "userSn", field: "userSn" },
    { headername: "deviceUserId", field: "deviceUserId" },
    { headername: "recordTime", field: "recordTime" },
    { headername: "ip", field: "ip" },
  ];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type !== "checkbox") {
      setCityValues((previousValue) => {
        return {
          ...previousValue,
          [name]: value,
        };
      });
    } else {
      setCityValues((previousValue) => {
        return {
          ...previousValue,
          [name]: checked,
        };
      });
    }
  };

  const CityMasterCheck = (id) => {};

  const TabIndexClick = (inx) => {
    setNewButton(inx);
  };

  const TabIndexClick1 = async (inx) => {
    setNewButton1(inx);
  };

  const CityMaster_Insert = () => {};
  const CityMaster_Save = () => {
    CityMaster_Insert();
  };

  const handleStateChange = (id) => {};

  const CityMaster_Delete = async (id) => {};

  const CityMaster_New = () => {
    setNewButton(1);
    setCityValues([]);

    setCityCountryData([]);
  };

  const CityMaster_Search = () => {};

  const commentsData = useMemo(() => {
    let computedComments = att;
    if (att_Search.length > 1) {
      computedComments = computedComments.filter((item) => JSON.stringify(item.userId).includes(att_Search));
    }
    setTotalItems(att.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      computedComments = computedComments.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments.slice((currentPage - 1) * ITEM_PER_PAGE, (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [att, currentPage, att_Search, sorting]);

  const commentsData1 = useMemo(() => {
    let computedComments1 = attendance;
    if (attendance_Search.length > 1) {
      computedComments1 = computedComments1.filter((item) => JSON.stringify(item.deviceUserId).includes(attendance_Search));
    }
    setTotalItems1(attendance.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      computedComments1 = computedComments1.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]));
    }
    return computedComments1.slice((currentPage1 - 1) * ITEM_PER_PAGE1, (currentPage1 - 1) * ITEM_PER_PAGE1 + ITEM_PER_PAGE1);
  }, [attendance, currentPage1, attendance_Search, sorting]);

  const DeviceCommunication_New = () => {
    setNewButton(1);
    setNewButton(1);
    setCityValues([]);

    setCityCountryData([]);
  };

  const DeviceCommunication_Save = () => {
    setNewButton(1);
  };

  const DeviceCommunication_Delete = () => {
    setNewButton(1);
  };
  const DeviceCommunication_Search = () => {
    setNewButton(1);
  };

  const DeviceCommunication_Prints = () => {
    setNewButton(1);
  };

  const handleFingerDownload = () => {
    // Implementation for finger download
  };
  const handleFaceDownload = () => {
    // Implementation for face download
  };
  const handleCardDownload = () => {
    // Implementation for card download
  };

  return (
    <>
      <div className="container-fluid">
        {userRights.length >= 1 && (
          <div
            className="row"
            style={{
              display: `${userRights[0].readonlys === "T" ? "block" : "none"}`,
            }}
          >
            <ActionButtton
              news={DeviceCommunication_New}
              saves={DeviceCommunication_Save}
              deletes={DeviceCommunication_Delete}
              searches={DeviceCommunication_Search}
              prints={DeviceCommunication_Prints}
              treebutton={DeviceCommunication_New}
              globalsearch={DeviceCommunication_New}
              login={DeviceCommunication_New}
              changepassword={DeviceCommunication_New}
              changeskin={DeviceCommunication_New}
              contact={DeviceCommunication_New}
              pdf={DeviceCommunication_New}
              imports={DeviceCommunication_New}
              download={DeviceCommunication_New}
              userRights={userRights}
              colorValue={colorValue}
              newButton={newButton}
              foreValue={foreValue}
              screenHeader="DEVICE COMMUNICATION"
            />

            <div className="row" style={{ borderTop: `1px solid ${colorValue}` }}>
              <div className="col-md-12 ">
                <div className="row">
                  <div className="float-start  col-md-10">
                    <label className="col-md-1"> IPAddress </label>
                    <select className="col-md-2" name="username" value={cityValues.ipaddress || ""} onChange={handleChange}>
                      <option></option>
                      {cityStateData !== null &&
                        cityStateData.map((result, index) => (
                          <option key={index} value={result.gtstatemastid}>
                            {result.statename}
                          </option>
                        ))}
                    </select>
                    <button type="button" className="btn btn-primary col-md-2" onClick={handleFingerDownload}>
                      Finger Download
                    </button>
                    <button type="button" className="btn btn-primary col-md-2" onClick={handleFaceDownload}>
                      Face Download
                    </button>
                    <button type="button" className="btn btn-primary col-md-2" onClick={handleCardDownload}>
                      Card Download
                    </button>
                  </div>
                  <div className="float-end col-md-2 py-2">
                    <label className="checkbox col-md-2 " style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" name="active" checked={cityValues.active} onChange={handleChange} />
                      <span></span>
                      <i className="indicator"></i>
                    </label>
                  </div>
                </div>
                <TabNav tabs={tabs1} onTabClick={TabIndexClick1} colorValue={colorValue} isActive={(tab) => newButton1 === tabs.id || (tabs.id === 4 && newButton1 === 5)} />

                <div className={newButton === 1 ? "content active-content" : "content"}>
                  <Search
                    colorValue={colorValue}
                    searchs={att_Search}
                    setsearchs={setAtt_Search}
                    SearchLable1={searchLable1}
                    SearchLable2={searchLable2}
                    SearchLable3={searchLable3}
                    handleChange={handleChange}
                    ChangeValues={cityValues}
                    searchCompCode={searchCompCode}
                    searchUserName={searchUserName}
                  />

                  <DataTable
                    heights={heights}
                    colorValue={colorValue}
                    headers={HeadersColumn}
                    comments={att}
                    setComments={setAtt}
                    foreValue={foreValue}
                    searches={att_Search}
                    setSearches={setAtt_Search}
                    totalItems={totalItems}
                    setTotalItems={setTotalItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    sorting={sorting}
                    setSorting={setSorting}
                    ITEM_PER_PAGE={ITEM_PER_PAGE}
                    EditData={CityMasterCheck}
                    commentsData={commentsData}
                    checkall={checkall}
                    setCheckAll={setCheckAll}
                  />
                </div>
                <div className={newButton === 2 ? "content active-content" : "content"}>
                  <Search
                    colorValue={colorValue}
                    searchs={attendance_Search}
                    setsearchs={setAttendance_Search}
                    SearchLable1={searchLable1}
                    SearchLable2={searchLable2}
                    SearchLable3={searchLable3}
                    handleChange={handleChange}
                    ChangeValues={cityValues}
                    searchCompCode={searchCompCode}
                    searchUserName={searchUserName}
                  />

                  <DataTable
                    heights={heights}
                    colorValue={colorValue}
                    headers={HeadersColumn1}
                    comments={attendance}
                    setComments={setAttendance}
                    foreValue={foreValue}
                    searches={attendance_Search}
                    setSearches={setAttendance_Search}
                    totalItems={totalItems1}
                    setTotalItems={setTotalItems1}
                    currentPage={currentPage1}
                    setCurrentPage={setCurrentPage1}
                    sorting={sorting}
                    setSorting={setSorting}
                    ITEM_PER_PAGE={ITEM_PER_PAGE1}
                    EditData={CityMasterCheck}
                    commentsData={commentsData1}
                    checkall={checkall}
                    setCheckAll={setCheckAll}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeviceCommunication;
