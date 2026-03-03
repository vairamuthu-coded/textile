import React, { useContext, useEffect, useMemo, useState } from 'react'

import Label from '../Custom/Label';

import DataTable from '../Custom//DataTable';
import SocialMissing from '../Social/SocialMissing';
import axios from 'axios';
import Search from '../Custom/Search';


// import PopUp from '../PopUp';
import { Viewer, Worker, SpecialZoomLevel, ViewMode } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { PrintIcon, printPlugin, PrintPluginProps } from '@react-pdf-viewer/print';
import DataContext from '../context/CreateTreeViewContext';
import {toast} from 'react-toastify';


const UserMaster = ({ title, subTitle, }) => {
 const {
  handleSubmit, inputref, tabindex, isLoading, color1,    totalItems, setTotalItems, currentPage, setCurrentPage, API_URL, sorting, setSorting, ITEM_PER_PAGE,
     searchLable1, searchLable2, searchLable3, newButton, setNewButton,
     colorValue ,defaultDetails,userValues, setUserValues,
    setSearchLable1, setSearchLable2, setSearchLable3,foreValue

 }=useContext(DataContext)



    const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const compcodeparam = API_URL + "/CompanyMaster/CompanyMaster";
  const API_URL_username = API_URL + '/UserMaster/UserMaster';
  const deptparam = API_URL + "/UserMaster/Department";
  const getpdffile = API_URL + "/UserMaster/GenerateReport";
  // const insert_update = API_URL + "/UserMaster";

  setSearchLable1("Search"); setSearchLable2(""); setSearchLable3("")
  const [buttonpopup, setButtonPopup] = useState(false)
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
  const [userRights1, setUserRights1] = useState([])

  const [userData, setUserData] = useState([])
  const [compcodeData, setCompCodeData] = useState([])
  const [checkall, setCheckAll] = useState([])
  const [checkchild, setCheckchild] = useState([])
  const [deptData, setDeptData] = useState([])
  const [userMaster_Search, setUserMaster_Search] = useState([]);
  const [userMaster_FilterSearch, setUserMaster_FilterSearch] = useState([]);
  const [fetchError, setFetchError] = useState(null)
  const [user_userItems, setUserItems] = useState([]) 

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });


  const thumbnailPluginInstance = defaultLayoutPluginInstance.thumbnailPluginInstance;
  const { Thumbnails } = thumbnailPluginInstance;
    const {printPluginInstance} = printPlugin();
    
  useEffect(() => { 
    async function fetchAPI(){  
        await  axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).then((re0)=>{setUserRights1(re0.data);}).catch((error) => { setFetchError("a4"+error) });       
        await axios.get(`${API_URL_username}/${defaultDetails.Compcode}`).then((res) =>{setUserItems(res.data);setUserData(res.data);}).catch((error)=>{setFetchError("res"+error) });         
        await axios.get(`${compcodeparam}`).then((res2) =>  { setCompCodeData(res2.data);}).catch((error)=>{setFetchError("res2"+error) });
        await axios.get(`${deptparam}`).then((res3) =>      {setDeptData(res3.data); }).catch((error) => {setFetchError("res3"+error) });
          // await axios.get(`${API_URL_username}/${defaultDetails.Compcode}/${defaultDetails.User}`).then((res) =>{setUserData(res.data);}).catch((error)=>{setFetchError("res"+error) });         

          }
          fetchAPI();
     setNewButton(1)
  }, [])


  const HeadersColumn =
    [
      { headername: "", field: "visible" },
      { headername: "id", field: "userid" },
      { headername: "CompCode", field: "compcode" },
      { headername: "UserName", field: "username" },
      { headername: "password", field: "password" },
      { headername: "SessionTime", field: "sessiontime" },
      { headername: "Dept", field: "department" },
      { headername: "Active", field: "active" }
    ]

  const heights = "250px";

  useEffect(() => {
    const filterResult = user_userItems.filter((post) => ((post.username).includes(userMaster_Search)))
    setUserMaster_FilterSearch(filterResult.reverse());
  }, [user_userItems, userMaster_Search]);

  const handleChange = (e) => {
    const { name, value,type,checked } = e.target;
    setUserValues((prev) => ({      
        ...prev, [name]: type==="checkbox" ?checked : value,      
    }))
  
  };

  const UserMasterCheck = async(id) => {
     
     try{
    await  axios.get(`${API_URL_username}/${id.compcode}/${id.userid}`).then((u)=>{
        setUserValues({
        userid: u.data[0].userid, finyear: u.data[0].finyear, dept: u.data[0].dept,
         compcode:u.data[0].gtcompmastid, username: u.data[0].username,
        password: u.data[0].password, binarypassword: u.data[0].newpassword, 
        sessiontime: u.data[0].sessiontime,active:u.data[0].active==="T" ?  true : false,
        
      });

      
           
    });     
    }
    catch(e){}
    finally{
      
    }

    
  }



  const UserMaster_Save = async () => {
      try {
          const UserData = {
            userid: userValues.userid > 0 ? userValues.userid : 0,
            finyear: userValues.finyear,
            dept: userValues.dept,
            compcode: userValues.compcode,
            username: userValues.username,
            password: userValues.password,
            newPassword: userValues.binarypassword,
            sessionTime: userValues.sessiontime,
            active: userValues.active===true ? "T" : "F",
          };
    const response = await axios.post(`${API_URL_username}`, UserData);
  
    if (response.data.message) {
      const res = await axios.get(`${API_URL_username}/${userValues.compcode}`);
      setUserItems(res.data);   
      UserMaster_New();
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    setFetchError(`Error: ${error.message || error}`);
    toast.error(error);
  } 

  }

  const UserMaster_Delete = async (id) => { 
      try {      
        const response = await axios.delete( `${API_URL_username}/${userValues.compcode}/${id}`);
        const message = response.data || "Record deleted successfully"; 
        const res = await axios.get(`${API_URL_username}/${userValues.compcode}`);
        setUserItems(res.data);
        toast.success(message);
      } catch (error) {
        const errMsg =
          error.response?.data ||
          error.message ||
          "An error occurred while deleting";

        setFetchError(errMsg);
        toast.error(errMsg);
      }
  }

  const UserMaster_Search=()=>{
    console.log("hellow")

  }

  let number = 1;
  const [pdfFile, setPdfFile] = useState(null);
 
  // const fileType="application/pdf";
  //   const handleChangeFile = (e) => {
  //     let seletedFile = e.target.files[0];
  //     if (seletedFile && fileType.includes(seletedFile.type)) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(seletedFile);
  //       reader.onload = (e) => {
  //         setPdfFile(e.target.result);
  //       }
  //     } else {
  //       setPdfFile(null);
  //     }
  //   }




  const UserMaster_Prints = async (userid) => {

    TabIndexClick(3);
    // setButtonPopup(true);
    await axios.get(`${getpdffile}/${userid}`)
      .then((res) => {  
          const aTag=document.createElement("a");
          const filenames="User.pdf";
          filenames.split(".").pop();   
        aTag.href='data:application/pdf;base64,'+res.data;    
        aTag.setAttribute("download", filenames+"-"+userid);
        setPdfFile(aTag.href)
        aTag.click();
        aTag.remove();
      }).catch((error) => { alert(error); });

  }

  const UserMaster_New =async () => {setNewButton(1); setUserValues([]); 

       await axios.get(`${API_URL_username}/${defaultDetails.Compcode}`).then((res) =>{setUserItems(res.data);setUserData(res.data);}).catch((error)=>{setFetchError("res"+error) });         

  }


  const commentsData = useMemo(() => {
    let computedComments = user_userItems;
    if (userMaster_Search) {
      computedComments = computedComments.filter((item) => ((item.username).includes(userMaster_Search)))
    }
    setTotalItems(computedComments.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) =>
        reversed * a[sorting.field].localeCompare(b[sorting.field]))
    }
    return computedComments.slice(
      (currentPage - 1) * ITEM_PER_PAGE,
      (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [user_userItems, currentPage, userMaster_Search, sorting])

  const TabIndexClick = (inx) => {

    setNewButton(inx);
  }
  // const theme = localStorage.getItem('theme') || 'light';
  // const handleSwitchTheme = (theme) => {
  //   alert(theme)
  //   localStorage.setItem('theme', theme);
  // };



  return (

    <div onSubmit={handleSubmit}  >

 {userRights1.length >= 1 &&
 <div className='container-fluid animate-zoom ' >

                    {!fetchError ? (
                      <>
                   <div className='row' style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>

          <ul className='boxShadow d-flex justify-content-end'>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].news === "T" ? "block" : "none" }} >New</button></li>
              <li> <button  onClick={() => UserMaster_Save()}                    className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].saves === "T" ? "block" : "none" }}>Save</button></li>
              <li> <button  onClick={() => UserMaster_Delete(userValues.userid)} className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].deletes === "T" ? "block" : "none" }} >Delete</button></li>
              <li> <button  onClick={() => UserMaster_Search()}                  className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].search === "T" ? "block" : "none" }} > Search </button></li>
              <li> <button  onClick={() => UserMaster_Prints()}                  className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].prints === "T" ? "block" : "none" }}>Print</button></li>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].readonlys === "T" ? "none" : "none" }}>Readonlys</button></li>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].treebutton === "T" ? "block" : "none" }}>treebutton</button></li>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].globalsearch === "T" ? "block" : "none" }}> globalsearch </button></li>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].login === "T" ? "block" : "none" }}>login</button></li>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].changepassword === "T" ? "block" : "none" }}>changepassword</button></li>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].changeskin === "T" ? "block" : "none" }}>changeskin</button></li>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].contact === "T" ? "block" : "none" }}> contact </button></li>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].pdf === "T" ? "block" : "none" }}>pdf</button></li>
              <li> <button  onClick={() => UserMaster_New()}                     className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].imports === "T" ? "block" : "none" }}> import </button></li>
              <li> <button  onClick={() => UserMaster_Prints()}                  className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{backgroundColor: `${colorValue}`, display: userRights1[0].download === "T" ? "block"  : "none",width:'100%' }}> Download </button></li>
            </ul>    
            
              <div className='content-tabs'  >
                <div className={newButton === 1 ? "content active-content" : "content"}>

              
                    <div className='content active-content'  >
                      <div className='row py-1'>

                        <Label className={`col-md-2`} labelName={"ID"}  ></Label>
                        <input className='col-md-1' type='text' name="userid" value={userValues.userid || ""} readOnly />
                        <Label className={`col-md-1`} labelName={"FinYear"}  ></Label>
                        <input className='col-md-1' type='text' id="finyear" value={userValues.finyear || ""} readOnly />
                        <Label className={`col-md-2`} labelName={"CompCode"}  ></Label>
                        <select className='col-md-3' name="compcode"
                          value={userValues.compcode || ""} onChange={handleChange} >
                          <option></option>
                          {
                            compcodeData.map((result, index) => (
                              <option key={index} value={result.gtcompmastid}>
                                {result.compcode}
                              </option>))
                          } </select>

                      </div>
                      <div className='row ' >
                        <Label className={`col-md-2`} labelName={"Dept"}  ></Label>
                        <select className='col-md-3' name="dept"
                          value={userValues.dept || ""} onChange={handleChange} >
                          <option></option>
                          {
                            deptData.map((result, index) => (<option key={index} value={result.asptbldeptmasid}>
                              {result.department}
                            </option>))
                          }
                        </select>
                        <Label className={`col-md-2`} labelName={"UserName"}  ></Label>
                        <input className='col-md-3' type='text' name="username" ref={inputref}
                          value={userValues.username || ""} onChange={handleChange}
                        />

                      </div>


                      <div className='row py-1' >
                       
                        <Label className={`col-md-2`} labelName={"binarypassword"}  ></Label>
                        <input className='col-md-3' type='text' name="binarypassword" ref={inputref}
                          value={userValues.binarypassword || ""} onChange={handleChange} />

                           <Label className={`col-md-2`} labelName={"Password"}  ></Label>
                        <input className='col-md-3' type='text' name="password" ref={inputref}
                          value={userValues.password || ""} onChange={handleChange} />


                      </div>
                      <div className='row' >
                        <Label className={`col-md-2`} labelName={"SessionTime"}  ></Label>
                        <input className='col-md-3' type='text' name="sessiontime" ref={inputref}
                          value={userValues.sessiontime || ""} onChange={handleChange} />

                        <Label className={`col-md-2`} labelName={"Active"}  ></Label>
                        <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                          <input type="checkbox" name="active" checked={userValues.active} onChange={handleChange} />
                          <span></span>
                          <i className='indicator'></i>
                        </label>
                      </div>
                    </div>
                 






                  <Search colorValue={colorValue} searchs={userMaster_Search} setsearchs={setUserMaster_Search}
                    SearchLable1={searchLable1} SearchLable2={searchLable2}
                    SearchLable3={searchLable3}  stylecolor={foreValue}
                    handleChange={handleChange} ChangeValues={userValues}
                    searchCompCode={searchCompCode} searchUserName={searchUserName} />
                  {user_userItems.length > 0 ? (
                    <div className='pt-2'>
                      <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}
                        comments={user_userItems} setComments={setUserItems} foreValue={foreValue}
                        searches={userMaster_Search} setSearches={setUserMaster_Search}
                        totalItems={totalItems} setTotalItems={setTotalItems}
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                        sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                        EditData={UserMasterCheck}
                        commentsData={commentsData} setCheckAll={setCheckAll} setCheckchild={setCheckchild} />

                    </div>
                  ) : <p style={{ marginTop: "2rem", color: "var(--bs-danger)" }} >{fetchError}</p>}

                </div></div>
              <div className={newButton === 3 ? "content active-content" : "content"}>
                <div style={{ width: "100%", height: "90%" }}>                 

                  {pdfFile && <>

                    <div
                      className="rpv-core__viewer"
                      style={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        height: '100%',
                      }}
                    >
                      <div
                        style={{
                          borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                          overflow: 'auto',
                          width: 'auto',height:'100%'
                        }}
                      >

<Thumbnails />
                      </div>





                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">


                        <Viewer theme='light'
                          fileUrl={pdfFile} viewMode={ViewMode.SinglePage} plugins={[defaultLayoutPluginInstance]} defaultScale={SpecialZoomLevel.ActualSize} />
                      </Worker>

                    </div>;
                  </>}

                
                </div>
              </div>
             </div>
</>
              ) : <SocialMissing colorValue={colorValue} fetchError={fetchError}></SocialMissing> 
                      }

      </div>

                      }          
    </div>

  )
}

export default UserMaster
