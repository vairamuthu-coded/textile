import useAxiosFetch from '../hooks/useFetch';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateTreeViewContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import Search from '../Custom/Search';
import { toast } from 'react-toastify';
const MenuNameMaster = ({ title, subTitle }) => {
  const {
    inputref,
    handleSubmit, newButton, setNewButton,defaultDetails,
    colorValue,  menuNameValues,setMenuNameValues,foreValue,
    totalItems, setTotalItems, currentPage, setCurrentPage, API_URL,
    sorting, setSorting, tabindex,color1, searchLable1, searchLable2, searchLable3,
    setSearchLable1, setSearchLable2, setSearchLable3,ITEM_PER_PAGE
  } = useContext(DataContext)
    const [userRights1, setUserRights1] = useState([])
  const [menu_active, setMenuActive] = useState(false)
  const [menuMaster_Search, setMenuMaster_Search] = useState([]);
  const [menuMaster_FilterSearch, setMenuMaster_FilterSearch] = useState([]);
  const [fetchError, setFetchError] = useState(null)
  const [menu_menuItems, setMenuItems] = useState([])
  setSearchLable1("Search"); setSearchLable2(""); setSearchLable3('')

  const [checkall, setCheckAll] = useState([])
  const [checkchild, setCheckchild] = useState([])
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
  const menunameparam = API_URL + "/MenuNameMaster/MenuNameMaster";
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const heights = "399px"; 

  useEffect(() => {
   
    axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).then((re0) => {        
      setUserRights1(re0.data);    
    axios.get(`${menunameparam}`).then((res) => {
      setMenuItems(res.data); setNewButton(1);
    }).catch((error) => { alert(error) });
  }).catch((error) => { alert(error) });
  }, [])

  const HeadersColumn =
    [
      {headername:"S.No",field:"SNo"},    
      { headername: "", field: "visible" },
      { headername: "ID", field: "menunameid" },
      { headername: "MenuName", field: "menuname" },
      { headername: "ParentMenuID", field: "parentmenuid" },
      { headername: "AliasName", field: "aliasname" },
      { headername: "Actives", field: "active" }
    ]




  useEffect(() => {
    const filterResult = menu_menuItems.filter((post) => ((post.menuname).includes(menuMaster_Search)))
    setMenuMaster_FilterSearch(filterResult.reverse());
  }, [menu_menuItems, menuMaster_Search]);

  const MenuNameMasterCheck = (id) => {
    try {
      const myitem = menu_menuItems.filter(item => item.menunameid === id.menunameid);
     
      const updatepost = { active: myitem[0].active === "T" ? true : false };
      setMenuNameValues({
        menunameid: myitem[0].menunameid,
        menuname: myitem[0].menuname,
        parentmenuid: myitem[0].parentmenuid,
        aliasname: myitem[0].aliasname,
        active: updatepost.active
      });
      setMenuActive(updatepost.active);




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
    setMenuNameValues((pre) => ({     
        ...pre, [name]:type==="checkbox" ? checked : value,      
    }))

  };




  const MenuNameMaster_Save = async () => {
  try {
    const CountryData = {
      menunameid: menuNameValues.menunameid > 0 ? menuNameValues.menunameid : 0,
      menuname: menuNameValues.menuname,
      parentmenuid: menuNameValues.parentmenuid,
      aliasname: menuNameValues.aliasname,   
      active: menuNameValues.active ? "T" : "F",
    };   
    const response = await axios.post(menunameparam, CountryData);
    if (response.data.message) {      
      const res = await axios.get(`${menunameparam}`);     
      setMenuItems(res.data);
       setMenuNameValues([])
      toast.success(response.data.message);
    } else {
      toast.error("No response from server"+response.data.message);
    }

  } catch (err) {
    const msg = err.response?.data.message ||err.message || "An error occurred";
    setFetchError(msg);
    toast.error(msg);
  }
};

  const MenuNameMaster_Delete = async () => {
  try {
    if (!menuNameValues.menunameid) {
      toast.error("Empty Not Allowed");
      return;
    }

    const id = menuNameValues.menunameid;

    const response = await axios.delete(`${menunameparam}/${id}`);

    if (response.data === true) {
      const res = await axios.get(`${menunameparam}`);

      if (res?.data) {
        setMenuItems(res.data);
        setMenuNameValues([])
        toast.success("Record Deleted Successfully");
      }
    } else {
      setFetchError(response.error || "Unknown error");
      toast.error(response.data || "Delete failed");
    }

  } catch (err) {
    console.error("Delete Error:", err);
    toast.error(`Error: ${err?.response?.data || err.message}`);
  }
};


  const MenuNameMaster_New = () => { setMenuNameValues([]); setMenuActive(false); }

  const commentsData = useMemo(() => {
    let computedComments = menu_menuItems;
    if (computedComments.length >= 1) {
      if (menuMaster_Search) {
        computedComments = computedComments.filter((item) => ((item.menuname).includes(menuMaster_Search)))
      }
      setTotalItems(computedComments.length);
      //sorting comments
      if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        computedComments = computedComments.sort((a, b) =>
          reversed * a[sorting.field].localeCompare(b[sorting.field]))
      }
    }
    return computedComments.slice(
      (currentPage - 1) * ITEM_PER_PAGE,
      (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [menu_menuItems, currentPage, menuMaster_Search, sorting])


  return (

     <form onSubmit={handleSubmit}>
            {userRights1.length >= 1 &&
                <div className='container-fluid animate-zoom pt-0' >
                   <div className='row' style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>

<ul className='boxShadow d-flex justify-content-end'>
                                <li > <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{display:`${userRights1[0].news}`==='T' ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => MenuNameMaster_New()}    >News</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].saves}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => MenuNameMaster_Save()}    >Save</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].deletes}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => MenuNameMaster_Delete(menuNameValues.menunameid)}  >Delete</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].search}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => MenuNameMaster_New()}  > Search </button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].prints}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => MenuNameMaster_New()} >Prints</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].readonlys}` === "T" ? "none" : "none",backgroundColor:`${colorValue}`}} onClick={() => MenuNameMaster_New()} >Readonlys</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].treebutton}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => MenuNameMaster_New()} >TreeButton</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].globalsearch}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => MenuNameMaster_New()} > Globalsearch </button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].login}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => MenuNameMaster_New()} >Login</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].changepassword}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => MenuNameMaster_New()} >Changepassword</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].changeskin}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => MenuNameMaster_New()} >Changeskin</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].contact}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => MenuNameMaster_New()} > Contact </button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].pdf}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => MenuNameMaster_New()} >Pdf</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].import}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => MenuNameMaster_New()} > Import </button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].download}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => MenuNameMaster_New()} > Download </button></li>
                            </ul>

           
 

 <div className='row pt-1'>
          
          <div className='col-md-5'>
              <div className='bloc-tabs' >
                <div className="tabs active-tabs" style={{backgroundColor:`${colorValue}`, color: `${foreValue}` }}> {title} </div>
              </div>
              <div className='content active-content' style={{ backgroundColor: `${foreValue}` }}>
              
            

                  <div className='container-fluid'>
                    <div className='row py-1'>
                      <label className='col-md-4' id="ID"  >ID</label>
                      <input className='col-md-7' type='text' name="menunameid" readOnly
                        value={menuNameValues.menunameid || ""} />
                    </div>
                    <div className='row'>
                      <label className='col-md-4'   >MenuName</label>
                      <input className='col-md-7' type='text' name="menuname" ref={inputref}
                        value={menuNameValues.menuname || ""} onChange={handleChange} />
                    </div>
                    <div className='row py-1'>
                      <label className='col-md-4'   >ParentMenuID</label>
                      <input className='col-md-7' type='text' name="parentmenuid" ref={inputref}
                        value={menuNameValues.parentmenuid || ""} onChange={handleChange}
                      />
                    </div>
                    <div className='row '>
                      <label className='col-md-4'   >AliasName</label>
                      <input className='col-md-7' type='text' name="aliasname" ref={inputref}
                        value={menuNameValues.aliasname || ""} onChange={handleChange} />
  </div>
  <div className='row  py-1'>
                      <label className='col-md-4' >Active</label>
                      <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                        <input type="checkbox" name="active" checked={menuNameValues.active} onChange={handleChange} />
                        <span></span>
                        <i className='indicator'></i>
                      </label>
                    </div>
                  </div>


            </div>
            </div>


            <div className='col-md-7' style={{backgroundColor:`${foreValue}`, color: `${foreValue}`, padding: "0" }}>
              <div className='bloc-tabs' >
                <div className="tabs active-tabs" style={{ backgroundColor:`${colorValue}`,color: `${foreValue}` }}> {subTitle} </div>
              </div>
              <div className='row' >
                <Search colorValue={colorValue} searchs={menuMaster_Search} setsearchs={setMenuMaster_Search}
              SearchLable1={searchLable1} SearchLable2={searchLable2}
              SearchLable3={searchLable3}  stylecolor={foreValue}
              handleChange={handleChange} ChangeValues={menuNameValues}
              searchCompCode={searchCompCode} searchUserName={searchUserName} />
                  {fetchError &&
                    <div style={{ color: "red", border: `1px solid ${colorValue}`, textAlign: "center" }}>
                      <h3 style={{ fontSize: "var(--bs-font", fontWeight: "bold" }}>{fetchError}</h3>
                    </div>}
                  {menu_menuItems.length > 0 ? (
                      <div className='pt-1 '   >
                      <DataTable heights={heights}  colorValue={colorValue} headers={HeadersColumn}
                        comments={menu_menuItems} setComments={setMenuItems} foreValue={foreValue}
                        searches={menuMaster_Search} setSearches={setMenuMaster_Search}
                        totalItems={totalItems} setTotalItems={setTotalItems}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                        sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                        EditData={MenuNameMasterCheck}
                        commentsData={commentsData} setCheckAll={setCheckAll}
                        setCheckchild={setCheckchild} />
                    </div>
                  ) : <p style={{ marginTop: "1rem", color: "var(--bs-danger)" }} ></p>}
                </div>
            
            </div>
          </div>
          </div>
          </div>
}
        


       
      </form>
    
  )
}


export default MenuNameMaster;
