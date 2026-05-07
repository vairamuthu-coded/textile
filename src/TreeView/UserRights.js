import React, { useContext, useEffect, useMemo, useState } from "react";
import DataContext from "../context/CreateTreeViewContext";
import axios, { Axios } from "axios";
import Search from "../Custom/Search";
import SocialMissing from "../Social/SocialMissing";
import styled from "styled-components";
import { toast } from "react-toastify";
import ActionButtton from "../ActionButtton";
const Button = styled.button`
  width: 100%;
  padding-left: 10px;
  margin: 2px;
  color: white;
`;

const UserRights = ({ title, subTitle }) => {
  const {
    userRights,
    setUserRights,
    inputref,
    handleSubmit,
    newButton,
    setNewButton,
    color1,
    foreValue,
    totalItems,
    setTotalItems,
    currentPage,
    setCurrentPage,
    API_URL,
    sorting,
    setSorting,
    naviValues,
    setNaviValues,
    navi_Items1,
    setNaviItems1,
    currentPage1,
    setCurrentPage1,
    totalItems1,
    setTotalItems1,
    sorting1,
    setSorting1,
    searchLable1,
    searchLable2,
    searchLable3,
    navigate,
    setSearchLable1,
    setSearchLable2,
    setSearchLable3,
    colorValue,
    defaultDetails,
  } = useContext(DataContext);

  const [userRightValues, setUserRightValues] = useState([]);
  const [navi_naviSearch, setNaviSearch] = useState([]);
  const [navi_Items, setNaviItems] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);
  const [actAll, setActAll] = useState(false);
  const [newsAll, setNewsAll] = useState(false);
  const [saveAll, setSaveAll] = useState(false);
  const [rOnlyAll, setROnlyAll] = useState(false);
  const [printAll, setPrintAll] = useState(false);
  const [searAll, setSearAll] = useState(false);
  const [delAll, setDelAll] = useState(false);
  useEffect(() => {
    setSearchLable1("SEARCH");
    setSearchLable2("COMPCODE");
    setSearchLable3("USER");
  }, []);

  const [naviMaster_FilterSearch, setNavi_FilterSearch] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [navi_menuItems, setMenuItems] = useState([]);
  const [userData, setUserData] = useState([]);
  const [checkall, setCheckAll] = useState([]);
  const [searchCompCode, setSearchCompCode] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);

  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const naviparam = API_URL + "/UserRights/UserRightsFilter";
  const insert_update = API_URL + "/UserRights";
  const menunameparam = API_URL + "/MenuNameMaster/MenuNameMaster";
  const compcodeparam = API_URL + "/CompanyMaster/CompanyMaster";
  const usernameparam = API_URL + "/UserMaster/UserMaster";
  const deleteparam = API_URL + "/UserRights/UserRights";
  const UserRightsFilter = API_URL + "/UserRights/UserRightsFilter";
  var sss = "";
  const heights = "440px";
  let ITEM_PER_PAGE = 180;
  let ITEM_PER_PAGE1 = 180;
  const HeadersColumn = [
    { headername: "S.No", field: "SNo", types: "text", widths: 20, readonly: false },
    { headername: "Del", field: "Del", types: "text", widths: 50, readonly: true },
    { headername: "Id", field: "userrightsid", types: "text", widths: 30, readonly: false },
    { headername: "MenuID", field: "menuid", types: "text", widths: 30, readonly: false },
    { headername: "MenuName", field: "menuname", types: "text", widths: 350, readonly: false },
    { headername: "Navurl", field: "navurl", types: "text", widths: 80, readonly: false },
    { headername: "PID", field: "parentmenuid", types: "text", widths: 80, readonly: false },
    { headername: "Act", field: "active", types: "checkbox", widths: 80, readonly: false },
    { headername: "News", field: "news", types: "checkbox", widths: 80, readonly: false },
    { headername: "Save", field: "saves", types: "checkbox", widths: 80, readonly: false },
    { headername: "Print", field: "prints", types: "checkbox", widths: 80, readonly: false },
    { headername: "ROnly", field: "readonly", types: "checkbox", widths: 80, readonly: false },
    { headername: "Sear", field: "search", types: "checkbox", widths: 80, readonly: false },
    { headername: "Dele", field: "deletes", types: "checkbox", widths: 80, readonly: false },
    { headername: "Down", field: "download", types: "checkbox", widths: 80, readonly: false },
    { headername: "Cont", field: "contact", types: "checkbox", widths: 80, readonly: false },
    { headername: "Pdf", field: "pdf", types: "checkbox", widths: 80, readonly: false },
    { headername: "Impo", field: "imports", types: "checkbox", widths: 80, readonly: false },
    { headername: "TBut", field: "treebutton", types: "checkbox", widths: 80, readonly: false },
    { headername: "Glo", field: "globalsearch", types: "checkbox", widths: 80, readonly: false },
    { headername: "Log", field: "login", types: "checkbox", widths: 80, readonly: false },
    { headername: "ChanP", field: "changepassword", types: "checkbox", widths: 80, readonly: false },
    { headername: "Skin", field: "changeskin", types: "checkbox", widths: 80, readonly: false },
    { headername: "Code", field: "compcode", types: "text", widths: 80, readonly: false },
    { headername: "User", field: "username", types: "text", widths: 80, readonly: false },
    { headername: "Aliasname", field: "aliasname", types: "text", widths: 350, readonly: false },
  ];

  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    if (!defaultDetails?.Compcode || !defaultDetails?.User) return;

    const fetchApi = async () => {
      try {
        const [r0, r1, r2, r3] = await Promise.all([
          axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
          axios.get(`${UserRightsFilter}/${defaultDetails.Compcode}/${defaultDetails.User}`),
          axios.get(menunameparam),
          axios.get(compcodeparam),
        ]);

        setUserRights(r0.data);
        setNaviItems(r1.data);
        setMenuItems(r2.data);
        setSearchCompCode(r3.data);
      } catch (error) {
        console.error(error);
        // better than alert
        setFetchError(error.message || "Error fetching data");
      }
    };

    fetchApi();
  }, [defaultDetails.Compcode, defaultDetails.User, title]);

  useEffect(() => {
    const filterResult = navi_Items.filter((post) => post.menuname.includes(navi_naviSearch) || post.navurl.includes(navi_naviSearch));
    setNavi_FilterSearch(filterResult);
  }, [navi_Items, navi_naviSearch]);

  const resetAllFlags = () => {
    setActAll(false);
    setNewsAll(false);
    setSaveAll(false);
    setSearAll(false);
    setROnlyAll(false);
    setDelAll(false);
    setPrintAll(false);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setUserRightValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      if (name === "compcode") {
        const res = await axios.get(`${usernameparam}/${value}`);
        setSearchUserName(res.data);
        resetAllFlags();
      }

      if (name === "username") {
        const comp = searchCompCode?.[0]?.compcode;
        if (!comp) return;

        const res = await axios.get(`${UserRightsFilter}/${comp}/${value}`);
        setNaviItems(res.data);
        resetAllFlags();
      }
    } catch (error) {
      console.error(error);
      // better than alert
      // toast.error(error.message || "Error fetching data");
    }
  };

  const handleChangeCheckbox = (e, index, id) => {
    const { name, value, checked, type } = e.target;

    const textFields = ["menuname", "navurl", "parentmenuid", "aliasname"];

    const toggleFields = ["active", "news", "saves", "prints", "readonlys", "search", "deletes", "download", "contact", "pdf", "imports", "treebutton", "globalsearch", "login", "changepassword", "changeskin", "passwords"];

    const updatedItems = [...navi_Items];
    const updatedItem = {
      ...updatedItems[index],
    };

    // Text fields
    if (textFields.includes(name)) {
      updatedItem[name] = value;
    }

    // Checkbox fields
    if (toggleFields.includes(name)) {
      updatedItem[name] = checked ? "T" : "F";
    }

    updatedItems[index] = updatedItem;

    // Main State
    setNaviItems(updatedItems);

    // Clear Search
    setNaviSearch([]);

    // Save Changed Rows
    const preparedItem = {
      ...updatedItem,
      compcode: userRightValues.compcode,
      username: userRightValues.username,
      sno: index,
    };

    setNaviItems1((prev) => {
      const existingIndex = prev.findIndex((x) => x.userrightsid === id);

      if (existingIndex !== -1) {
        const updatedPrev = [...prev];
        updatedPrev[existingIndex] = preparedItem;
        return updatedPrev;
      }

      return [...prev, preparedItem];
    });
  };

  const ListData = (items) => {
    const toTF = (val) => (val ? "T" : "F");

    const booleanControls = {
      active: actAll,
      news: newsAll,
      saves: saveAll,
      prints: printAll,
      readonlys: rOnlyAll,
      search: searAll,
      deletes: delAll,
    };

    const normalBooleanFields = ["treebutton", "globalsearch", "login", "changepassword", "changeskin", "download", "contact", "pdf", "imports"];

    return items.map((obj, index) => ({
      userrightsid: obj.userrightsid,
      menuid: obj.menuid,
      menuname: obj.menuname,
      navurl: obj.navurl,
      parentmenuid: obj.parentmenuid,
      aliasname: obj.aliasname,

      ...Object.fromEntries(Object.entries(booleanControls).map(([key, val]) => [key, val === false ? obj[key] : toTF(val)])),

      ...Object.fromEntries(normalBooleanFields.map((field) => [field, obj[field] === "T" ? "T" : "F"])),

      compcode: userRightValues.compcode,
      username: userRightValues.username,
      sno: index,
    }));
  };

  const UserRights_Save = async () => {
    try {
      if (!searchCompCode?.[0]?.compcode || !searchUserName?.[0]?.username) {
        toast.error("Please select Company and Username");
        return;
      }

      const users = navi_Items1.length === 0 ? navi_Items1 : ListData(naviMaster_FilterSearch);
      if (users.length === 0) {
        toast.warning("No data to save");
        return;
      }

      const data = { Details: users };
      const response = await axios.post(insert_update, data);

      toast.success(response?.data?.message);

      setNaviItems1([]);
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message || "Error saving");
    }
  };

  const UserRights_Delete = async () => {
    try {
      const users = navi_Items1.length > 0 ? navi_Items1 : ListData(naviMaster_FilterSearch);

      // Validation
      if (!userRightValues?.compcode || !userRightValues?.username) {
        return toast.error("Invalid compcode / username");
      }

      if (users.length === 0) {
        return toast.error("No records found");
      }

      const payload = {
        Details: users,
      };

      const response = await axios.delete(insert_update, {
        data: payload,
      });

      toast.success(response?.data?.message || "Deleted Successfully");
      loadNaviItems();
      // var res = axios.get(`${UserRightsFilter}/${defaultDetails.Compcode}/${defaultDetails.User}`);

      // setNavi_FilterSearch(res?.data);
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || err.message || "Unexpected error");
    }
  };

  const loadNaviItems = async () => {
    try {
      const comp = searchCompCode?.[0]?.compcode;
      const user = searchUserName?.[0]?.username;
      if (!comp || !user) return toast.error("Invalid data");

      const { data } = await axios.get(`${naviparam}/${comp}/${user}`);

      setNaviItems(data);
      setNavi_FilterSearch([]);
      setUserRightValues([]);
    } catch (err) {
      toast.error("Error fetching data");
    }
  };
  const UserRights_New = async () => {
    await loadNaviItems();
  };

  const headerCheckboxMap = {
    Del: {
      checked: deleteAll,
      setter: setDeleteAll,
      name: "DeleteAll",
    },
    Act: {
      checked: actAll,
      setter: setActAll,
      name: "ActAll",
    },
    News: {
      checked: newsAll,
      setter: setNewsAll,
      name: "NewsAll",
    },
    Save: {
      checked: saveAll,
      setter: setSaveAll,
      name: "SaveAll",
    },
    ROnly: {
      checked: rOnlyAll,
      setter: setROnlyAll,
      name: "ROnlyAll",
    },
    Print: {
      checked: printAll,
      setter: setPrintAll,
      name: "PrintAll",
    },
    Sear: {
      checked: searAll,
      setter: setSearAll,
      name: "SearAll",
    },
    Dele: {
      checked: delAll,
      setter: setDelAll,
      name: "DelAll",
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      {userRights.length >= 1 && (
        <div className="container-fluid animate-zoom">
          <ActionButtton
            news={UserRights_New}
            saves={UserRights_Save}
            deletes={UserRights_Delete}
            searches={UserRights_New}
            prints={UserRights_New}
            readonlys={UserRights_New}
            treebutton={UserRights_New}
            globalsearch={UserRights_New}
            login={UserRights_New}
            changepassword={UserRights_New}
            changeskin={UserRights_New}
            contact={UserRights_New}
            pdf={UserRights_New}
            imports={UserRights_New}
            download={UserRights_New}
            userRights={userRights}
            colorValue={colorValue}
            newButton={newButton}
          />

          <div className="m-2">
            <Search
              colorValue={colorValue}
              stylecolor={`${foreValue}`}
              searchs={navi_naviSearch}
              setsearchs={setNaviSearch}
              SearchLable1={searchLable1}
              SearchLable2={searchLable2}
              SearchLable3={searchLable3}
              handleChange={handleChange}
              ChangeValues={userRightValues}
              searchCompCode={searchCompCode}
              searchUserName={searchUserName}
            />
          </div>
          <div style={{ width: "1310px", height: `${heights}`, overflow: "auto", margin: "0px", padding: "0px" }}>
            <table className="table table-responsive table-striped sticky" id="maintable">
              <thead style={{ backgroundColor: colorValue, position: "sticky" }}>
                <tr>
                  {HeadersColumn.map(({ headername, widths }, index) => {
                    const checkbox = headerCheckboxMap[headername];
                    return (
                      <td
                        key={index}
                        style={{
                          backgroundColor: `${colorValue}`,
                          color: `${foreValue}`,
                          width: widths,
                          textAlign: "center",
                        }}
                      >
                        {headername}

                        {checkbox && <input type="checkbox" name={checkbox.name} checked={checkbox.checked} onChange={(e) => checkbox.setter(e.target.checked)} style={{ marginLeft: "5px" }} />}
                      </td>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {naviMaster_FilterSearch.map((item, index, widths) => (
                  <tr key={index} style={{ backgroundColor: `${colorValue}`, color: `${foreValue}`, border: "none", textAlign: "left" }}>
                    <td style={{ backgroundColor: `${colorValue}`, color: `${foreValue}` }}>{index + 1} </td>
                    <td>
                      <input
                        type="checkbox"
                        name="passwords"
                        checked={deleteAll === false ? (item.passwords === "T" ? true : false) : deleteAll === true ? true : false}
                        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)}
                        style={{ border: "none", padding: "0px", margin: "0px", width: "34px" }}
                      />{" "}
                    </td>
                    <td>{item.userrightsid} </td>
                    <td>{item.menuid} </td>
                    <td>{item.menuname} </td>
                    <td>{item.navurl} </td>{" "}
                    <td>
                      <input type="text" name="parentmenuid" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} value={item.parentmenuid} style={{ border: "none", padding: "0px", margin: "0px", width: "25px" }} />{" "}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="active"
                        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)}
                        checked={actAll === false ? (item.active === "T" ? true : false) : actAll === true ? true : false}
                        style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }}
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="news"
                        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)}
                        checked={newsAll === false ? (item.news === "T" ? true : false) : newsAll === true ? true : false}
                        style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }}
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="saves"
                        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)}
                        checked={saveAll === false ? (item.saves === "T" ? true : false) : saveAll === true ? true : false}
                        style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }}
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="prints"
                        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)}
                        checked={printAll === false ? (item.prints === "T" ? true : false) : printAll === true ? true : false}
                        style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }}
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="readonlys"
                        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)}
                        checked={rOnlyAll === false ? (item.readonlys === "T" ? true : false) : rOnlyAll === true ? true : false}
                        style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }}
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="search"
                        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)}
                        checked={searAll === false ? (item.search === "T" ? true : false) : searAll === true ? true : false}
                        style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }}
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="deletes"
                        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)}
                        checked={delAll === false ? (item.deletes === "T" ? true : false) : delAll === true ? true : false}
                        style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }}
                      />{" "}
                    </td>
                    <td>
                      <input type="checkbox" name="download" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.download === "T" ? true : false} />{" "}
                    </td>
                    <td>
                      <input type="checkbox" name="contact" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.contact === "T" ? true : false} />{" "}
                    </td>
                    <td>
                      <input type="checkbox" name="pdf" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.pdf === "T" ? true : false} />{" "}
                    </td>
                    <td>
                      <input type="checkbox" name="imports" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.imports === "T" ? true : false} />{" "}
                    </td>
                    <td>
                      <input type="checkbox" name="treebutton" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.treebutton === "T" ? true : false} />{" "}
                    </td>
                    <td>
                      <input type="checkbox" name="globalsearch" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.globalsearch === "T" ? true : false} />{" "}
                    </td>
                    <td>
                      <input type="checkbox" name="login" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.login === "T" ? true : false} />{" "}
                    </td>
                    <td>
                      <input type="checkbox" name="changepassword" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.changepassword === "T" ? true : false} />
                    </td>
                    <td>
                      <input type="checkbox" name="changeskin" onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.changeskin === "T" ? true : false} />{" "}
                    </td>
                    <td>{item.compcode}</td>
                    <td>{item.username} </td>
                    <td>{item.aliasname} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </form>
  );
};

export default UserRights;

//https://www.google.com/search?sca_esv=7a2c727ac526d59d&sca_upv=1&sxsrf=ADLYWIJWKXyYFJnD4rQqelbHHVBFZOKr9Q:1718272288669&q=table+rows+edit+in+react+js&tbm=vid&source=lnms&fbs=AEQNm0Bqzy2A7JdsZg3J6bXbexmPsgjtQvlWZL7ndTLwEpr_IW9DW0gpDTlsyp82QhSGZwv6rZNsjeNjGHrryK8Xeol_KXyoH3Dsd3VPOuMtP9w8HA93nE-31o6VmlSmIKPVEokfM7vtb4pyukiQDt6Cp_mEAAMCBM46do1OVZ2RxweoyvYt4Y97Plghy6kHrjBH08sp16QI&sa=X&ved=2ahUKEwj7yJKLp9iGAxUf1zgGHfv7Cc0Q0pQJegQIDhAB&biw=1360&bih=641&dpr=1#fpstate=ive&vld=cid:74bfa743,vid:dYjdzpZv5yc,st:0
