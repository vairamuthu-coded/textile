import React, { useContext, useEffect, useMemo, useState } from 'react'
import DataContext from '../context/CreateTreeViewContext';
import axios, { Axios } from 'axios';
import Search from '../Custom/Search';
import SocialMissing from '../Social/SocialMissing';
import styled from 'styled-components';
import { toast } from 'react-toastify';
const Button =styled.button`
width:100%;padding-left:10px;margin:2px;color:white;
`


const UserRights = ({ title, subTitle,  }) => {
  const { userRights,setUserRights,
    inputref,
    handleSubmit, newButton, setNewButton, color1,foreValue,
    totalItems, setTotalItems, currentPage, setCurrentPage, API_URL,
    sorting, setSorting, naviValues, setNaviValues, navi_Items1, setNaviItems1,
    currentPage1, setCurrentPage1, totalItems1, setTotalItems1, sorting1, setSorting1,
    searchLable1, searchLable2, searchLable3, navigate,
    setSearchLable1, setSearchLable2, setSearchLable3, colorValue,defaultDetails
  } = useContext(DataContext)


const [userRightValues, setUserRightValues] = useState([]);
  const [navi_naviSearch, setNaviSearch] = useState([]);
  const [navi_Items, setNaviItems] = useState([])
  const [deleteAll, setDeleteAll] = useState(false);
  const [actAll, setActAll] = useState(false);
  const [newsAll, setNewsAll] = useState(false)
  const [saveAll, setSaveAll] = useState(false)
  const [rOnlyAll, setROnlyAll] = useState(false)
  const [printAll, setPrintAll] = useState(false)
  const [searAll, setSearAll] = useState(false)
  const [delAll, setDelAll] = useState(false)
  setSearchLable1("SEARCH"); setSearchLable2("COMPCODE"); setSearchLable3('USER')

  const [naviMaster_FilterSearch, setNavi_FilterSearch] = useState([]);
  const [fetchError, setFetchError] = useState(null)
  const [navi_menuItems, setMenuItems] = useState([])

  const [userData, setUserData] = useState([])
  const [checkall, setCheckAll] = useState([])
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])

  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const naviparam = API_URL + "/UserRights/UserRightsFilter";
  const insert_update = API_URL + "/UserRights/UserRights";
  const menunameparam = API_URL + "/MenuNameMaster/MenuNameMaster";
  const compcodeparam = API_URL + "/CompanyMaster/CompanyMaster";
  const usernameparam = API_URL + "/UserMaster/UserMaster";
  const deleteparam = API_URL + "/UserRights/UserRights";
  const UserRightsFilter = API_URL + "/UserRights/UserRightsFilter";
  var sss = '';
  const heights = "440px"; let ITEM_PER_PAGE = 180; let ITEM_PER_PAGE1 = 180;
 const HeadersColumn = [
  { headername: "S.No", field: "SNo", types: "text", widths: 20, readonly: false },
  { headername: "Del", field: "Del", types: "text", widths: 50, readonly: true },
  { headername: "Id", field: "userrightsid", types: "text", widths: 30, readonly: false },
  { headername: "MenuID", field: "menuid", types: "text", widths: 30, readonly: false },
  { headername: "MenuName", field: "menuname", types: "text", widths: 350, readonly: false },
  { headername: "Navurl", field: "navurl", types: "text", widths: 80, readonly: false },
  { headername: "PID", field: "parentmenuid", types: "text", widths: 80, readonly: false },

  // Checkbox Columns
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

  // Text fields
  { headername: "Code", field: "compcode", types: "text", widths: 80, readonly: false },
  { headername: "User", field: "username", types: "text", widths: 80, readonly: false },
    { headername: "Aliasname", field: "aliasname", types: "text", widths: 350, readonly: false },
];


  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => { 
    async function fetchApi(){
      await axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).then((re0) => {  setUserRights(re0.data);}).catch((error) => { alert(error) });
      await axios.get(`${UserRightsFilter}/${defaultDetails.Compcode}/${defaultDetails.User}`).then((res1) => { setNaviItems(res1.data);}).catch((error) => { alert(error) });
      await axios.get(`${menunameparam}`).then((res2) => {setMenuItems(res2.data); }).catch((error) => { alert(error) });
      await axios.get(`${compcodeparam}`).then((res3) => {setSearchCompCode(res3.data); }).catch((error) => { alert(error) });     
    }
    fetchApi();  
  }, [])


  useEffect(() => {

    const filterResult = navi_Items.filter((post) => ((post.menuname).includes(navi_naviSearch) || (post.navurl).includes(navi_naviSearch)))
    setNavi_FilterSearch(filterResult);
  }, [navi_Items, navi_naviSearch]);


  // const TreeViewCheck = (e, index, id) => {

  //   setEditContactId(id)
  //   const { name, value } = e.target;
  //   const newContacts = [...navi_Items];

  //   if (name === "parentmenuid") {
  //     newContacts[index].parentmenuid = e.target.value;
  //   }
  //   setNaviItems(newContacts)

  // }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserRightValues((previousValue) => {
      return {
        ...previousValue, [name]: value,
      }
    })
    if (name === "compcode") {

      axios.get(`${usernameparam}/${e.target.value}`).then((res) => {
        setSearchUserName(res.data);
      }).catch((error) => { alert(error) });

      setActAll(false); setNewsAll(false); setSaveAll(false); setSearAll(false); setROnlyAll(false); setDelAll(false);
      setPrintAll(false)
    }
    if (name === "username") {
      axios.get(`${UserRightsFilter}/${searchCompCode[0].compcode}/${e.target.value}`).then((res) => {
        setNaviItems(res.data);
      }).catch((error) => { alert(error) });
      setActAll(false); setNewsAll(false); setSaveAll(false); setSearAll(false); setROnlyAll(false); setDelAll(false); setPrintAll(false)
    }
  };

  
  const handleChangeCheckbox = (e, index, id) => {


    const { name, value, checked } = e.target;
    const newContacts = [...navi_Items];
    setNaviSearch([]);
      const item = newContacts[index];
  const toTF = (v) => (v ? "T" : "F");
  const textFields = ["menuname", "navurl", "parentmenuid", "aliasname"];
  if (textFields.includes(name)) {
    item[name] = value;
  }

  const toggleFields = [
    "active", "news", "saves", "prints", "readonlys", "search",
    "deletes", "download", "contact", "pdf", "imports", "treebutton",
    "globalsearch", "login", "changepassword", "changeskin"
  ];

  if (toggleFields.includes(name)) {
    item[name] = toTF(checked);  }
  setNaviItems(newContacts);    
    var ss = navi_Items.filter((item) => (item.userrightsid === id));
    let filterResult1 = navi_Items.filter(post => post.userrightsid === ss[0].userrightsid)
    if (filterResult1.length === 1) { }
    else {
      ss[0].compcode = userRightValues.compcode;
      ss[0].username = userRightValues.username;
      ss[0].sno = navi_Items.length === 0 ? 0 : navi_Items.length;
      setNaviItems1(previousData => [...previousData, ...ss]);
    }

  }



function ListData(useStateItems) {
  const data = [];

  const booleanControls = {
    active: actAll,
    news: newsAll,
    saves: saveAll,
    prints: printAll,
    readonlys: rOnlyAll,
    search: searAll,
    deletes: delAll,
    passwords: deleteAll,
  };

  const toTF = (val) => (val ? "T" : "F");

  const normalBooleanFields = [
    "treebutton",
    "globalsearch",
    "login",
    "changepassword",
    "changeskin",
    "download",
    "contact",
    "pdf",
    "imports",
  ];

  useStateItems.forEach((obj, index) => {
    const item = {
      userrightsid: obj.userrightsid,
      menuid: obj.menuid,
      menuname: obj.menuname,
      navurl: obj.navurl,
      parentmenuid: obj.parentmenuid,
      aliasname: obj.aliasname,
      // fields controlled by "ALL" checkboxes
      ...Object.fromEntries(
        Object.keys(booleanControls).map((field) => [
          field,
          booleanControls[field] === false
            ? obj[field] // keep original "T/F"
            : toTF(booleanControls[field]),
        ])
      ),

      // convert normal boolean fields
      ...Object.fromEntries(
        normalBooleanFields.map((field) => [
          field,
          obj[field] === "T" ? "T" : "F",
        ])
      ),

      compcode: userRightValues.compcode,
      username: userRightValues.username,
      sno: index,
    };

    data.push(item);
  });

  return data;
}


const UserRights_Save = async () => {
  try {

    const users = navi_Items1.length === 0 ? ListData(naviMaster_FilterSearch) : navi_Items1;

    if (users.length === 0) return;

    let lastMessage = "";
 let lastMessage1 = "";
    for (let i = 0; i < users.length; i++) {
      const obj = users[i];    
      const response = await axios.post(`${insert_update}/${i + 1}`, obj);        
      const split = response.data.split("-");
      lastMessage = split[1];
      lastMessage1= split[0];
    }

    setNaviItems1([]);
    toast.success(lastMessage+ "-"+lastMessage1);
  } catch (e) {
    toast.error(e.message || "Error saving");
  }
};




  


const UserRights_Delete = async () => {
  try {

    const users = navi_Items1.length === 0 ? ListData(naviMaster_FilterSearch) : navi_Items1;

  const validUser =
        userRightValues.compcode > 0 &&
        userRightValues.username > 0;
  
      if (!validUser)
        return toast.error("Invalid compcode / username");

    const requests = users.map((obj, index) =>

      axios.delete(
        `${deleteparam}/${index + 1}/${obj.userrightsid}/${userRightValues.compcode}/${userRightValues.username}`
      )
    );    
   const responses = await Promise.all(requests);
    if (responses.length === 0) {
      return toast.error("Delete failed (empty response)");
    }

    const last = responses[responses.length - 1];
    const splitdata = last.data.split("-");

    // Optional validation (recommended)
    if (Number(splitdata[0]) !== users.length) {
      return toast.error("Some items were not deleted");
    }

    toast.success(splitdata[1]);

  } catch (err) {
    toast.error("Unexpected error: " + err);
  }
  
};

const loadNaviItems = async () => {
  try {
    const comp = searchCompCode?.[0]?.compcode;
    const user = searchUserName?.[0]?.username;

    if (!comp || !user) return toast.error("Invalid data");

    const { data } = await axios.get(`${naviparam}/${comp}/${user}`);

    setNaviItems(data);
    setNavi_FilterSearch([]);   setUserRightValues([]);  
  } catch (err) {
    toast.error("Error fetching data");
  }
};
  const UserRights_New = async () => {

           
await loadNaviItems();

  }

const headerCheckboxMap = {
  Del:   { name: "DeleteAll", state: deleteAll,  setState: setDeleteAll },
  Act:   { name: "ActAll",    state: actAll,     setState: setActAll },
  News:  { name: "NewsAll",   state: newsAll,    setState: setNewsAll },
  Save:  { name: "SaveAll",   state: saveAll,    setState: setSaveAll },
  ROnly: { name: "ROnlyAll",  state: rOnlyAll,   setState: setROnlyAll },
  Print: { name: "PrintAll",  state: printAll,   setState: setPrintAll },
  Sear:  { name: "SearAll",   state: searAll,    setState: setSearAll },
  Dele:  { name: "DelAll",    state: delAll,     setState: setDelAll }
};



  return (
    <form onSubmit={handleSubmit}>
      {userRights.length >= 1 &&
        <div className='container-fluid animate-zoom' >
            <div className='row ' style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>

                    <ul className='boxShadow d-flex justify-content-end'>
            <li className='pe-1' > <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`, display: userRights[0].news === "T" ? "block" : "none" }}>News</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_Save()} style={{ backgroundColor: `${colorValue}`,  display: userRights[0].saves === "T" ? "block" : "none" }}>Save</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_Delete()} style={{ backgroundColor:`${colorValue}`, display: userRights[0].deletes === "T" ? "block" : "none" }}>Delete</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}` ,  display: userRights[0].search === "T" ? "block" : "none"}}> Search </button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,   display: userRights[0].prints === "T" ? "block" : "none" }}>Prints</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,   display: userRights[0].readonlys === "T" ? "block" : "none" }}>Readonlys</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,   display: userRights[0].treebutton === "T" ? "block" : "none" }}>TButton</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,    display: userRights[0].globalsearch === "T" ? "block" : "none" }}> GSearch </button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,    display: userRights[0].login === "T" ? "block" : "none" }}>Login</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,    display: userRights[0].changepassword === "T" ? "block" : "none" }}>CPass</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,    display: userRights[0].changeskin === "T" ? "block" : "none" }}>CSkin</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,    display: userRights[0].contact === "T" ? "block" : "none" }}> Contact </button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,    display: userRights[0].pdf === "T" ? "block" : "none" }}>Pdf</button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,    display: userRights[0].imports === "T" ? "block" : "none" }}> Import </button></li>
            <li className='pe-1'> <button  onClick={() => UserRights_New()} style={{ backgroundColor: `${colorValue}`,    display: userRights[0].download === "T" ? "block" : "none" }}> Download </button></li>
          </ul>        

          {!fetchError ? (<>
            <div className='m-2'>
              <Search colorValue={colorValue} stylecolor={`${foreValue}`} searchs={navi_naviSearch} setsearchs={setNaviSearch}
                SearchLable1={searchLable1} SearchLable2={searchLable2}
                SearchLable3={searchLable3}
                handleChange={handleChange} ChangeValues={userRightValues}
                searchCompCode={searchCompCode} searchUserName={searchUserName} />
            </div>
            <div style={{ width: "1310px", height:`${heights}`, overflow: "auto",margin:"0px",padding:"0px" }}>
              <table className='table table-responsive table-striped' id='maintable' >
                <thead style={{ backgroundColor: colorValue, textAlign: "center", alignItems: "center" }}>
                <tr style={{ textAlign: "center", alignItems: "center" }}>
                  {HeadersColumn.map(({ headername, widths }) => {
                    const checkbox = headerCheckboxMap[headername];

                    return (
                      <td
                        key={headername}
                        style={{
                          backgroundColor: colorValue,
                          color: foreValue,
                          width: widths,
                          textAlign: "center",
                          alignItems: "center"
                        }}
                      >
                        {headername}                       
                        {checkbox && (
                          <input
                            type="checkbox"
                            name={checkbox.name}
                            checked={checkbox.state}
                            onChange={(e) => checkbox.setState(e.target.checked)}
                            style={{ marginLeft: 5 }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              </thead>
                <tbody >
                  {
                    naviMaster_FilterSearch.map((item, index,widths) => (
                      <tr key={index} style={{ backgroundColor: `${colorValue}`  ,color: `${foreValue}`,border: "none",textAlign:'left' }}   >
                        <td style={{backgroundColor: `${colorValue}`  ,color: `${foreValue}` }}>{index + 1} </td>
                        <td><input type='checkbox' name='passwords' checked={deleteAll === false ? item.passwords === 'T' ? true : false : deleteAll === true ? true : false} onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} style={{ border: "none", padding: "0px", margin: "0px", width: "34px" }} />        </td>
                        <td >{item.userrightsid} </td>
                        <td>{item.menuid} </td>
                        <td>{item.menuname} </td>
                        <td>{item.navurl} </td>                                              <td><input type='text'     name='parentmenuid'   onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} value={item.parentmenuid} style={{ border: "none", padding: "0px", margin: "0px", width: "25px" }} />                            </td>
                        <td><input type='checkbox' name='active'         onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={actAll ===  false ? item.active ===    'T' ? true : false : actAll ===   true ? true : false} style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }} />  </td>
                        <td><input type='checkbox' name='news'           onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={newsAll === false ? item.news ===      'T' ? true : false : newsAll ===  true ? true : false} style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }} />  </td>
                        <td><input type='checkbox' name='saves'          onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={saveAll === false ? item.saves ===     'T' ? true : false : saveAll ===  true ? true : false} style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }} />  </td>
                        <td><input type='checkbox' name='prints'         onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={printAll ===false ? item.prints ===    'T' ? true : false : printAll === true ? true : false} style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }} />  </td>
                        <td><input type='checkbox' name='readonlys'      onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={rOnlyAll ===false ? item.readonlys === 'T' ? true : false : rOnlyAll === true ? true : false} style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }} />  </td>
                        <td><input type='checkbox' name='search'         onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={searAll === false ? item.search ===    'T' ? true : false : searAll ===  true ? true : false} style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }} />  </td>
                        <td><input type='checkbox' name='deletes'        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={delAll ===  false ? item.deletes ===   'T' ? true : false : delAll ===   true ? true : false} style={{ border: "none", padding: "0px", margin: "0px", width: "50px" }} />  </td>
                        <td><input type='checkbox' name='download'       onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.download === 'T' ? true : false} />      </td>
                        <td><input type='checkbox' name='contact'        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.contact === 'T' ? true : false} />       </td>
                        <td><input type='checkbox' name='pdf'            onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.pdf === 'T' ? true : false} />           </td>
                        <td><input type='checkbox' name='imports'        onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.imports === 'T' ? true : false} />       </td>
                        <td><input type='checkbox' name='treebutton'     onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.treebutton === 'T' ? true : false} />    </td>
                        <td><input type='checkbox' name='globalsearch'   onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.globalsearch === 'T' ? true : false} />  </td>
                        <td><input type='checkbox' name='login'          onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.login === 'T' ? true : false} />         </td>
                        <td><input type='checkbox' name='changepassword' onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.changepassword === 'T' ? true : false} /></td>
                        <td><input type='checkbox' name='changeskin'     onChange={(e) => handleChangeCheckbox(e, index, item.userrightsid)} checked={item.changeskin === 'T' ? true : false} />    </td>
                        <td>{item.compcode}</td>
                        <td>{item.username} </td>
                         <td>{item.aliasname} </td>
                      </tr>

                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
          ) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing>}
        </div>
      </div>
}
    </form>


  )

}

export default UserRights


//https://www.google.com/search?sca_esv=7a2c727ac526d59d&sca_upv=1&sxsrf=ADLYWIJWKXyYFJnD4rQqelbHHVBFZOKr9Q:1718272288669&q=table+rows+edit+in+react+js&tbm=vid&source=lnms&fbs=AEQNm0Bqzy2A7JdsZg3J6bXbexmPsgjtQvlWZL7ndTLwEpr_IW9DW0gpDTlsyp82QhSGZwv6rZNsjeNjGHrryK8Xeol_KXyoH3Dsd3VPOuMtP9w8HA93nE-31o6VmlSmIKPVEokfM7vtb4pyukiQDt6Cp_mEAAMCBM46do1OVZ2RxweoyvYt4Y97Plghy6kHrjBH08sp16QI&sa=X&ved=2ahUKEwj7yJKLp9iGAxUf1zgGHfv7Cc0Q0pQJegQIDhAB&biw=1360&bih=641&dpr=1#fpstate=ive&vld=cid:74bfa743,vid:dYjdzpZv5yc,st:0