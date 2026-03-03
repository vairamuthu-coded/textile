import React, { useContext, useEffect, useMemo, useState } from 'react'
import DataContext from '../context/CreateTreeViewContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import Search from '../Custom/Search';
import { toast } from 'react-toastify';


const TreeViewMaster = ({ title, subTitle, }) => {
  const {
    inputref, handleSubmit,  totalItems, setTotalItems, currentPage, setCurrentPage, API_URL,
    sorting, setSorting, color1, navi_Items1, setNaviItems1, navi_Items, setNaviItems, defaultDetails,
    currentPage1, setCurrentPage1, totalItems1, setTotalItems1, sorting1, setSorting1,
    searchLable1, searchLable2, searchLable3, setSearchLable1, setSearchLable2, setSearchLable3,
    colorValue,userRightValues,setUserRightValues ,setNewButton,newButton,foreValue
  } = useContext(DataContext)
  // const [navi_active, setNaviActive] = useState(false);
  const [navi_naviSearch, setNaviSearch] = useState([]);
  const [navi_naviSearch1, setNaviSearch1] = useState([]);
  // const [naviMaster_FilterSearch1, setNavi_FilterSearch1] = useState([]);
  const [naviMaster_FilterSearch, setNavi_FilterSearch] = useState([]);
  const [naviDelete, setNaviDelete] = useState([]);
  const [fetchError, setFetchError] = useState(null)
  const [navi_menuItems, setMenuItems] = useState([])
  const [navi_deleteItems, navi_DeleteItems] = useState([])
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
  const [checkall, setCheckAll] = useState(false)
  const [checkchild, setCheckchild] = useState(false)
  const [checkall1, setCheckAll1] = useState(false)
  const [checkchild1, setCheckchild1] = useState(false)
    const [userRights1, setUserRights1] = useState([])
  setSearchLable1("Search"); setSearchLable2("Com"); setSearchLable3('User')
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const naviparam = API_URL + "/TreeView/TreeViewMaster";
  const insert_update = API_URL + "/UserRights/UserRights";
  const menunameparam = API_URL + "/MenuNameMaster/MenuNameMaster";
  const compcodeparam = API_URL + "/CompanyMaster/CompanyMaster";
  const usernameparam = API_URL + "/UserMaster/UserMaster";
  const deleteparam = API_URL + '/UserRights/UserRights';
  const UserRightsFilter = API_URL + "/UserRights/UserRightsDetails";
  
  const heights = "380px"; let ITEM_PER_PAGE = 40; let ITEM_PER_PAGE1 = 40;


const HeadersColumn = [
  { headername: "", field: "visible" },
  { headername: "ID", field: "menuid" },
  { headername: "Menu Name", field: "menuname" },
  { headername: "Nav URL", field: "navurl" },
  { headername: "PID", field: "parentmenuid" },
  { headername: "Menu ID", field: "menunameid" },
   { headername: "Aliasname", field: "aliasname" }
];


  const HeadersColumn1 =
    [
      { headername: "", field: "visible" },
      { headername: "ID", field: "menuid" },
      { headername: "MenuName", field: "menuname" },
      { headername: "Nav Url", field: "navurl" },
      { headername: "PID", field: "parentmenuid" },
      { headername: "Menu ID", field: "menunameid" },
      { headername: "Aliasname", field: "aliasname" }

    ]

useEffect(() => {
  async function fetchApi() {
    try {
      const [
        rightsRes,
        naviRes,
        menuRes,
        compRes
      ] = await Promise.all([
        axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
        axios.get(`${naviparam}`),
        axios.get(`${menunameparam}`),
        axios.get(`${compcodeparam}`)
      ]);
      
      setUserRights1(rightsRes.data);
      setNaviItems(naviRes.data);
      setMenuItems(menuRes.data);
      setSearchCompCode(compRes.data);

      // After all data is ready
      TreeViewNew();

    } catch (error) {
      alert("API Error: " + error);
    }
  }

  fetchApi();
}, []);

useEffect(() => {
  const search = String(navi_naviSearch || "").toLowerCase();
  const filterResult = navi_Items.filter(item =>
    item.menuname?.toLowerCase().includes(search)
  );
  setNavi_FilterSearch(filterResult);
}, [navi_Items, navi_naviSearch]);

// useEffect(() => {
//     const search =String(navi_naviSearch1 || "").toLowerCase();
//   let filtered = navi_Items1;
  

//     filtered = navi_Items1.filter(item =>
//       item.menuname?.toLowerCase().includes(search)
//     );
  
//    setNavi_FilterSearch1(filtered);

// }, [navi_Items1, navi_naviSearch1]);

// useEffect(() => {
//   const search = (list, text) =>
//     list
//       .filter(item =>
//         item.menuname?.toLowerCase().includes(text?.toLowerCase() || "")
//       )
//       .slice() ;   // create copy
          

//   setNavi_FilterSearch(search(navi_Items, navi_naviSearch));
//   setNavi_FilterSearch1(search(navi_Items1, navi_naviSearch1));
// }, [navi_Items, navi_naviSearch, navi_Items1, navi_naviSearch1]);


  const TreeViewCheck1 = (id) => {
    try {
      if (checkall1 === true) {
        setNaviDelete(navi_Items1);
      } else {     
        if(id.userrightsid==0){
        const filterResult = navi_Items1.filter(post => post.menuid !== id.menuid)
        setNaviItems1(filterResult)
        }else{
        const filterResult1 = navi_Items1.filter(post => post.userrightsid === id.userrightsid)
        setNaviDelete(previousData => [...previousData, ...filterResult1]);
      }}
    }
    catch (err) {
      if (err.response) {
        console.log(`Error ${err.message}`);
      }
    }
    finally {
    }

  }


  const TreeViewCheck = (id) => {

    try {
      if (checkall === true) {
        setNaviItems1([]); setNaviItems1(navi_Items);
      } else {
        const filterResult = navi_Items.filter(post => post.menuid === id.menuid)
        let filterResult1 = navi_Items1.filter(post => post.menuid === filterResult[0].menuid)
        if (filterResult1.length === 1) { }
      else{
          const newData = filterResult.map(object => ({
            userrightsid: 0,
            menuid: object.menuid,
            menuname: object.menuname,
            aliasname: object.aliasname,
            navurl: object.navurl,
            parentmenuid: object.parentmenuid,
            menunameid: object.menunameid,
            compcode: object.compcode,
            username: object.username,
            active: object.active,
          }));
          setNaviItems1(previousData => [...previousData, ...newData]);
       }

      }
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
  const { name, value } = e.target;

  setUserRightValues(prev => ({
    ...prev,
    [name]: value,
  }));

  if (name === "compcode") {
    axios.get(`${usernameparam}/${value}`)
    .then(res => setSearchUserName(res.data))
    .catch(err => toast.error("Error: " + err));
  }

  if (name === "username") {
    axios.get(`${UserRightsFilter}/${value}`)
    .then(res => {
      setNaviItems1(res.data);
      setNaviDelete([]);
      
    })
    .catch(err => toast.error("Error: " + err));
  }
};



function ListData(useStateItems) {
  const data = [];

  useStateItems.forEach((obj, index) => {
    if (Number(obj.userrightsid) === 0) {
      const makeTF = (v) => (v === "T" ? "T" : "F");

      const newItem = {
        userrightsid: obj.userrightsid || 0,
        menuid: obj.menuid,
        menuname: obj.menuname,
        aliasname: obj.aliasname,
        navurl: obj.navurl,
        parentmenuid: obj.parentmenuid,
        active: makeTF(obj.active),
        news: makeTF(obj.news),
        saves: makeTF(obj.saves),
        prints: makeTF(obj.prints),
        readonlys: makeTF(obj.readonlys),
        search: makeTF(obj.search),
        deletes: makeTF(obj.deletes),
        treebutton: makeTF(obj.treebutton),
        globalsearch: makeTF(obj.globalsearch),
        login: makeTF(obj.login),
        changepassword: makeTF(obj.changepassword),
        changeskin: makeTF(obj.changeskin),
        download: makeTF(obj.download),
        contact: makeTF(obj.contact),
        pdf: makeTF(obj.pdf),
        imports: makeTF(obj.imports),
        passwords: makeTF(obj.passwords),
        compcode: userRightValues.compcode,
        username: userRightValues.username,
        sno: index
      };

      data.push(newItem);
    }
  });

  return data;
}





  const TreeView_Save = async () => {
    try {
      const users = ListData(navi_Items1);

      if (users.length === 0) return;

      let lastMessage = "";
      for (let i = 0; i < users.length; i++) {
        const obj = users[i];
        const response = await axios.post(`${insert_update}/${i + 1}`, obj);
        lastMessage = response.data;
      }

      setNaviItems1([]);
      toast.success(lastMessage);
    } catch (e) {
      toast.error(e.message || "Error saving");
    }    
  }

const TreeView_Delete = async () => {
  try {
    if (!userRightValues.compcode)
      return toast.error("Empty Not Allowed");

    if (naviDelete.length === 0)
      return toast.error("Invalid");

    const validUser =
      userRightValues.compcode > 0 &&
      userRightValues.username > 0;

    if (!validUser)
      return toast.error("Invalid compcode / username");
    setNaviDelete([]);
    const requests = naviDelete.map((obj, index) =>

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
    if (Number(splitdata[0]) !== naviDelete.length) {
      return toast.error("Some items were not deleted");
    }

    toast.success(splitdata[1]);
    TreeViewNew();
  } catch (err) {
    toast.error("Unexpected error: " + err);
  }
};


  const TreeViewNew = () => {
    setUserRightValues([]);  setNaviDelete([]);
    setNaviItems1([]); setCheckAll(false); setCheckchild(false); setCheckAll1(false); setCheckchild1(false);
    // axios.get(`${naviparam}`).then((res) => {
    //   setNaviItems(res.data);alert(JSON(res.data))
    // }).catch((error) => { alert(error) });
    setNewButton(1);
  }



  const commentsData = useMemo(() => {

  let computed = [...navi_Items];
  const search = String(navi_naviSearch || "").toLowerCase();
  // Filtering
  if (search) {
    computed = computed.filter(item =>
      item.menuname?.toLowerCase().includes(search) ||
      item.navurl?.toLowerCase().includes(search)
    );
  }

  // Update total items (safe)
  setTotalItems(computed.length);

  // Sorting
  if (sorting.field) {
    const dir = sorting.order === "asc" ? 1 : -1;

    computed.sort((a, b) => {
      const aVal = a[sorting.field] ?? "";
      const bVal = b[sorting.field] ?? "";

      // Convert non-strings to string for safe localeCompare
      return dir * String(aVal).localeCompare(String(bVal));
    });
  }

  // Pagination
  const start = (currentPage - 1) * ITEM_PER_PAGE;
  return computed.slice(start, start + ITEM_PER_PAGE);

}, [navi_Items, currentPage, navi_naviSearch, sorting]);



const commentsData1 = useMemo(() => {

  let search = String(navi_naviSearch1 || "").toLowerCase();

  let computedComments1 = navi_Items1;

  if (search) {
    computedComments1 = computedComments1.filter((item) => {
      const name = String(item.menuname || "").toLowerCase();
      const url  = String(item.navurl || "").toLowerCase();
      return name.includes(search) || url.includes(search);
    });
  }

  setTotalItems1(computedComments1.length);

  // Sorting
  if (sorting1.field) {
    const reversed = sorting1.order === "asc" ? 1 : -1;
    computedComments1 = [...computedComments1].sort((a, b) =>
      reversed * String(a[sorting1.field] || "").localeCompare(String(b[sorting1.field] || ""))
    );
  }

  // Pagination
  return computedComments1.slice(
    (currentPage1 - 1) * ITEM_PER_PAGE1,
    (currentPage1 - 1) * ITEM_PER_PAGE1 + ITEM_PER_PAGE1
  );

}, [navi_Items1, currentPage1, navi_naviSearch1, sorting1]);

  return (
    
      <form onSubmit={handleSubmit}>
         {userRights1.length >= 1 &&
         <div className='container-fluid animate-zoom pt-0' >
                   <div className='row' style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>

 <ul className='boxShadow d-flex justify-content-end'>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display:`${userRights1[0].news}`==='T' ? "block" : "none",backgroundColor:`${colorValue}`}}>News</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeView_Save()}   style={{display: userRights1[0].saves === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}>Save</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeView_Delete()} style={{display: userRights1[0].deletes === "T" ? "block" : "none" ,backgroundColor:`${colorValue}` }}>Delete</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].search === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}> Search </button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].prints === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}>prints</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].readonlys === "T" ? "none" : "none" ,backgroundColor:`${colorValue}`}}>readonlys</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].treebutton === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}>treebutton</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].globalsearch === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}> globalsearch </button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].login === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}>login</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].changepassword === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}>changepassword</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].changeskin === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}>changeskin</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].contact === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}> contact </button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].pdf === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}>pdf</button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].imports === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}> import </button></li>
                <li> <button className={newButton === 1  ? "tabs active-tabs" : "tabs" } onClick={() => TreeViewNew()}     style={{display: userRights1[0].download === "T" ? "block" : "none" ,backgroundColor:`${colorValue}`}}> download </button></li>
        </ul>
           




             <div className='content-tabs p-1' style={{display:"flex", justifyContent:'space-evenly'}} >
             
              <Search colorValue={colorValue} searchs={navi_naviSearch1} setsearchs={setNaviSearch1}
                    SearchLable1={searchLable1} SearchLable2={searchLable2}
                    SearchLable3={searchLable3} stylecolor={foreValue}
                    handleChange={handleChange} ChangeValues={userRightValues}
                    searchCompCode={searchCompCode} searchUserName={searchUserName} />
                   
                    </div>
          <div className='row pt-2'>
   
              <div className='col-md-6' style={{padding: "0" }}>
                {/* <div className="tabs active-tabs" style={{  backgroundColor: `${colorValue}`,color: `${foreValue}` }}> {subTitle} </div> */}

               
                  <div className="row">
                    {navi_Items.length > 0 ? (
                      <>
                        <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}
                          comments={navi_Items} setComments={setNaviItems} foreValue={foreValue}
                          searches={navi_naviSearch} setSearches={setNaviSearch}
                          totalItems={totalItems} setTotalItems={setTotalItems}
                          currentPage={currentPage} setCurrentPage={setCurrentPage}
                          sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                          EditData={TreeViewCheck} commentsData={commentsData}
                          checkall={checkall} setCheckAll={setCheckAll}
                          checkchild={checkchild} setCheckchild={setCheckchild}
                        />
                      </>
                    ) : <p style={{ marginTop: "2rem", color: "var(--bs-danger)" }} ></p>}
                  </div>
              
              </div>
              <div className='col-md-6' style={{float: "left", padding: "0" }}>
               

               
                  <div className="content active-content border-start" >
                    {navi_Items1.length > 0 ? (
                      <>
                        <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn1}
                          comments={navi_Items1} setComments={setNaviItems1} foreValue={foreValue}
                          searches={navi_naviSearch1} setSearches={setNaviSearch1}
                          totalItems={totalItems1} setTotalItems={setTotalItems1}
                          currentPage={currentPage1} setCurrentPage={setCurrentPage1}
                          sorting={sorting1} setSorting={setSorting1} ITEM_PER_PAGE={ITEM_PER_PAGE1}
                          EditData={TreeViewCheck1} commentsData={commentsData1}
                          checkall={checkall1} setCheckAll={setCheckAll1}
                          checkchild={checkchild1} setCheckchild={setCheckchild1}
                        />
                      </>
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
export default TreeViewMaster

