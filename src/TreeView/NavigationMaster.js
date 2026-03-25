import React, { useContext, useEffect, useMemo, useState } from 'react'
import useAxiosFetch from '../hooks/useFetch';
import Label from '../Custom/Label';
import Table from '../Custom/Table';
import Search from '../Custom/Search';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import DataContext from '../context/CreateTreeViewContext';
import {toast} from 'react-toastify';
const NavigationMaster = ({ title, subTitle,  }) => {
  const {
    inputref,color1,handleSubmit, colorValue,defaultDetails,naviValues,setNaviValues,
    totalItems, setTotalItems, currentPage, setCurrentPage, API_URL,ITEM_PER_PAGE,
    sorting, setSorting, newButton,foreValue,searchLable1,searchLable2,searchLable3,
    setSearchLable1,setSearchLable2,setSearchLable3
  } = useContext(DataContext)
  const [navi_active, setNaviActive] = useState(true)
  const [navi_naviSearch, setNaviSearch] = useState([]);
  const [naviMaster_FilterSearch, setNavi_FilterSearch] = useState([]);
  const [fetchError, setFetchError] = useState(null)
  const [navi_Items, setNaviItems] = useState([])
  const [navi_menuItems, setMenuItems] = useState([])
  const [checkall, setCheckAll] = useState([])
  const [checkchild, setCheckchild] = useState([])
  const [compcodeData, setCompCodeData] = useState([])
  const [userData, setUserData] = useState([])
  const naviparam = API_URL + "/NavigationMaster/NavigationMaster";
  // const insert_update = API_URL + "/NavigationMaster/Saves";
  const menunameparam = API_URL + "/MenuNameMaster/MenuNameMaster";
  const compcodeparam = API_URL + "/CompanyMaster/CompanyMaster";
  const usernameparam = API_URL + "/UserMaster/UserMaster";
  const NavigationMaster_Detete = API_URL + "/NavigationMaster/NavigationMaster_Delete";
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  setSearchLable1("Search");  setSearchLable2("Com");  setSearchLable3("User")
  const heights = "380px"; //let ITEM_PER_PAGE = 100;
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
  const [userRights1, setUserRights1] = useState([])
  const HeadersColumn =
    [
      {headername:"S.No",field:"SNo"},    
      { headername: "",field: "none" },
      { headername: "id", field: "menuid" },
      { headername: "MenuName", field: "menuname" },
      { headername: "NavUrl", field: "navurl" },
      { headername: "ParentMenuID", field: "parentmenuid" },
      { headername: "MenuNameID", field: "menunameid" },
      { headername: "CompCode", field: "compcode" },
      { headername: "UserName", field: "username" },
      { headername: "Active", field: "active" }
    ]

useEffect(() => {
  const fetchAPI = async () => {
    try {
      const [
        rightsRes,
        naviRes,
        menuRes,
        compRes,
        userRes
      ] = await Promise.all([
        axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
        axios.get(`${naviparam}/${defaultDetails.Compcode}`),
        axios.get(`${menunameparam}`),
        axios.get(`${compcodeparam}`),
         axios.get(`${usernameparam}/${defaultDetails.Compcode}/${defaultDetails.User}`)
      
      ]);

       setUserRights1(rightsRes.data);
       setNaviItems(naviRes.data);
       
       setMenuItems(menuRes.data);
       setCompCodeData(compRes.data);
       setUserData(userRes.data);
    }
    catch (error) {
      alert("API Error: " + error.message);
    }
  };

  fetchAPI();
}, []);


useEffect(() => {
  const search = String(navi_naviSearch || "").toLowerCase();

  const filterResult = navi_Items.filter(item =>
    item.menuname?.toLowerCase().includes(search)
  );

  setNavi_FilterSearch(filterResult);
}, [navi_Items, navi_naviSearch]);


  const NavigationCheck = (id) => {
   
    try {
      const myitem = navi_Items.filter(item => item.menuid === id.menuid);       
   
      setNaviValues({
        menuid: myitem[0].menuid,
        menuname: myitem[0].menuname,
        menunameid: myitem[0].menunameid,
        navurl: myitem[0].navurl,
        parentmenuid: myitem[0].parentmenuid,
        username: myitem[0].userId,
        compcode: myitem[0].gtcompmastid,
        active: myitem[0].active==="T" ? true : false
      });    
    }
    catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    }
    finally {
    }
  }

  const handleChange = (e) => {
    const { name, value,type,checked } = e.target;
    setNaviValues((pre) => ({     
        ...pre, [name]:type === "checkbox" ? checked :  value,     
    }))

  };



const Navigation_Save = async () => {
  try {
    const payload = {
      menuid: naviValues.menuid > 0 ? naviValues.menuid : 0,
      menuname: naviValues.menuname,
      menunameid: naviValues.menunameid,
      parentmenuid: naviValues.parentmenuid,
      navurl: naviValues.navurl,
      compcode: naviValues.compcode,
      username: naviValues.username,
      active: naviValues.active===true ? "T" : "F",
    };

    // Save API
    const response = await axios.post(naviparam, payload);

    if (response.data) {
      toast.success(response.data);
      // Reload list
      const res = await axios.get(`${naviparam}/${naviValues.compcode}`);
      setNaviItems(res.data);
 setNaviValues([])
    } else {
      toast.error("Invalid response from server");
    }

  } catch (error) {
    console.error(error);
    toast.error(error.message || "Something went wrong");
  }
};



  const Navigation_Delete = async (id) => {
  try {
    if (!naviValues.menuname?.trim()) {
      alert("Empty Not Allowed");
      return;
    }

    // Delete API
    const response = await axios.delete(`${NavigationMaster_Detete}/${naviValues.compcode}/${id}`);

    if (response.data) {
      toast.success(response.data);

      // Fetch updated list
      try {
      const res = await axios.get(`${naviparam}/${naviValues.compcode}`);
      setNaviItems(res.data);
        setNaviValues([])
      } catch (error) {
        toast.error("Failed to reload list");
      }
    } else {
      toast.error("Delete failed");
    }
  } catch (ex) {
    toast.error(ex.message || "Something went wrong");
  }
};

   


  const Navigation_New = () => {setNaviValues([]); setNaviActive(false); 
     axios.get(`${naviparam}/${defaultDetails.Compcode}`).then((res) => { setNaviItems(res.data); }).catch((error) => 
      { alert(error); });
    }

const commentsData = useMemo(() => {

  let search = String(navi_naviSearch || "").toLowerCase();

  let computedComments = navi_Items;

  if (search) {
    computedComments = computedComments.filter((item) => {
      const name = String(item.menuname || "").toLowerCase();
      const url  = String(item.navurl || "").toLowerCase();
      return name.includes(search) || url.includes(search);
    });
  }

  setTotalItems(computedComments.length);

  // Sorting
  if (sorting.field) {
    const reversed = sorting.order === "asc" ? 1 : -1;
    computedComments = [...computedComments].sort((a, b) =>
      reversed * String(a[sorting.field] || "").localeCompare(String(b[sorting.field] || ""))
    );
  }

  // Pagination
  return computedComments.slice(
    (currentPage - 1) * ITEM_PER_PAGE,
    (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE
  );

}, [navi_Items, currentPage, navi_naviSearch, sorting]);



  return (
 
     <form onSubmit={handleSubmit}>
            {userRights1.length >= 1 &&
                <div className='container-fluid animate-zoom pt-0' >
                   <div className='row' style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>

                     <ul className='boxShadow d-flex justify-content-end'>
                                <li > <button  className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{display:`${userRights1[0].news}`==='T' ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => Navigation_New()}    >News</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].saves}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => Navigation_Save()}    >Save</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].deletes}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => Navigation_Delete(naviValues.menuid)}  >Delete</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].search}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => Navigation_New()}  > Search </button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].prints}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => Navigation_New()} >Prints</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].readonlys}` === "T" ? "none" : "none",backgroundColor:`${colorValue}`}} onClick={() => Navigation_New()} >Readonlys</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].treebutton}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => Navigation_New()} >TreeButton</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].globalsearch}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => Navigation_New()} > Globalsearch </button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].login}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => Navigation_New()} >Login</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].changepassword}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => Navigation_New()} >Changepassword</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].changeskin}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => Navigation_New()} >Changeskin</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].contact}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => Navigation_New()} > Contact </button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].pdf}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => Navigation_New()} >Pdf</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].imports}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => Navigation_New()} > Import </button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].download}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => Navigation_New()} > Download </button></li>
                            </ul>

           
 

 <div className='row pt-2'>
            <div className='col-md-4 ' >
             <div className='bloc-tabs' >
                <div className="tabs active-tabs" style={{backgroundColor:`${colorValue}`, color: `${foreValue}` }}> {title} </div>
              </div>

        
                <div className='content active-content' >
                  
      
                        <div className='row py-1'>
                          <label className='col-md-4' id="ID"  >ID</label>
                          <input className='col-md-7' type='text' name="menuid" value={naviValues.menuid || ""} readOnly />
                        </div>
                        <div className='row' >
                          <Label className={`col-md-4`} labelName={"MenuNameID"}  ></Label>
                          <select className='col-md-7' name="menunameid"
                            value={naviValues.menunameid || ""} onChange={handleChange} >
                            <option></option>
                            {

                              navi_menuItems.map((result, index) => (<option key={index} value={result.menunameid}>
                                {result.menuname}
                              </option>))
                            }
                          </select>
                        </div>
                        <div className='row py-1'>
                          <label className='col-md-4'   >MenuName</label>
                          <input className='col-md-7' type='text' name="menuname" 
                            value={naviValues.menuname || ""} onChange={handleChange}
                          />
                        </div>
                        <div className='row'>
                          <label className='col-md-4' htmlFor=''   >Navigate Url</label>
                          <input className='col-md-7' type='text' name="navurl" autoComplete='off' ref={inputref}
                            value={naviValues.navurl || ""} onChange={handleChange}
                          />
                        </div>
                        <div className='row py-1'>
                          <label className='col-md-4'   >ParentID</label>
                          <input className='col-md-7' type='text' name="parentmenuid" autoComplete='off' ref={inputref}
                            value={naviValues.parentmenuid || ""} onChange={handleChange}
                          />
                        </div>

                        <div className='row'>
                          <label className='col-md-4'   >CompCode</label>
                          <select className='col-md-7' name="compcode"
                            value={naviValues.compcode || ""} onChange={handleChange} >
                            <option></option>
                            {
                              compcodeData.map((result, index) => (<option key={index} value={result.gtcompmastid}>
                                {result.compcode}
                              </option>))
                            }
                          </select>
                        </div>
                        <div className='row py-1' >
                          <Label className={`col-md-4`} labelName={"UserName"}  ></Label>
                          <select className='col-md-7' name="username"
                            value={naviValues.username || ""} onChange={handleChange} >
                            <option></option>
                            {
                              userData.map((result, index) => (<option key={index} value={result.userid}>
                                {result.username}
                              </option>))
                            } </select>
                        </div>
                        <div className='row'>
                          <label className='col-md-4'  > Active </label>
                          <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                            <input type="checkbox" name="active" checked={naviValues.active} onChange={handleChange} />
                            <span></span>
                            <i className='indicator'></i>
                          </label>
                        </div>
                     
                   
                    </div>
                </div>
           



            <div className='col-md-8' style={{ color:`${colorValue}`, padding: "0" }}>
             <div className='bloc-tabs' >
                <div className="tabs active-tabs" style={{backgroundColor:`${colorValue}`, color: `${foreValue}` }}> {subTitle} </div>
              </div>
       
             
                <div className="content active-content pt-2">
                <Search colorValue={colorValue} stylecolor={foreValue} searchs={navi_naviSearch} 
                setsearchs={setNaviSearch}
              SearchLable1={searchLable1} SearchLable2={searchLable2}
              SearchLable3={searchLable3} 
              handleChange={handleChange} ChangeValues={naviValues}
              searchCompCode={searchCompCode} searchUserName={searchUserName} />
                  {!fetchError && navi_Items.length > 0 ? (
                    <div className='pt-2 '   >
                     
                      <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}  
                           
                        comments={navi_Items} setComments={setNaviItems} foreValue={foreValue}
                        searches={navi_naviSearch} setSearches={setNaviSearch}
                        totalItems={totalItems} setTotalItems={setTotalItems}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                        sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                        EditData={NavigationCheck}
                        commentsData={commentsData}
                         setCheckAll={setCheckAll} setCheckchild={setCheckchild} />
                    </div>
                  ) : <p style={{ marginTop: "2rem", color: "var(--bs-danger)" }} ></p>}
                </div>
             
            </div>
          </div>
        </div>
        </div>
}
      
      </form>
    
  )
}
export default NavigationMaster

