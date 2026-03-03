import { useContext, useEffect, useMemo, useState } from 'react'
import DataContext from '../../context/CreateUserContext';
import axios from 'axios';
import Search from '../../Custom/Search';
import DataTable from '../../Custom/DataTable';

const DeviceCommunication = ({ title, subTitle }) => {
    const [att, setAtt] = useState([]);
        const [attendance, setAttendance] = useState([]);
  const { newButton, setNewButton, inputref,foreValue, handleSubmit, colorValue,
    defaultDetails,cityValues,setCityValues,
    cityStateData, setCityStateData, cityCountryData, setCityCountryData,
     selectedTitle,userRights,setUserRights,setFetchError,
    API_URL, currentPage, setCurrentPage, sorting, setSorting, ITEM_PER_PAGE,
    searchLable1,searchLable2,searchLable3,color1,handlepage,
    setSearchLable1,setSearchLable2,setSearchLable3 } = useContext(DataContext)
    const [city_FilterSearch, setCity_FilterSearch] = useState([]);
    const [attendance_FilterSearch, setattendance_FilterSearch] = useState([]);
  const [att_Search, setAtt_Search] = useState([]);
  const [attendance_Search, setAttendance_Search] = useState([]);
const [currentPage1,setCurrentPage1]=useState(1);
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
    const [totalItems,setTotalItems]=useState([]);  const [totalItems1,setTotalItems1]=useState([]);
      const [checkall, setCheckAll] = useState(false)
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const CityParam = "/CityMaster/GridLoad";
  const StateParam = "/StateMaster/SelectCommond";
  const CountryParam = "/StateMaster/GridLoad";
  const insert_update = API_URL + "/CityMaster/Saves";
  const deleteData = "/CityMaster/DeleteCommond";
  const heights = "260px";let ITEM_PER_PAGE1=1000;
  setSearchLable1("Search");  setSearchLable2("");  setSearchLable3("")
  useEffect(() => {
    async function fetApi(){
    await axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).then((res0) => { setUserRights(res0.data)    }).catch((error) => { setFetchError(error) });
     ///await axios.get("http://localhost:8086/attendance").then((res) => { setAtt(res.data.users); setAttendance(res.data.attendance);}).catch((error) => { alert("heading-attendane" + error); });
  }

    fetApi();
  
  }, [])

  useEffect(() => {
    
    if(att.length>3){ 
      const filterResult = att.filter((item,index)=>((JSON.stringify(item.userId)).includes(att_Search) ))  
    if(filterResult !==null){
    setCity_FilterSearch(filterResult.reverse());
   
  }
}
    if(attendance.length>3){ 
      const filterResult = attendance.filter((item,index)=>((JSON.stringify(item.deviceUserId)).includes(attendance_Search)))  
    if(filterResult !==null){
    setattendance_FilterSearch(filterResult.reverse());
   
  }
}
  }, [att, att_Search]);

  const HeadersColumn =
    [
      { headername: "", field: "visible" },
      { headername: "SNo", field: "SNo" },
      { headername: "userId", field: "userId" },
      { headername: "cardno", field: "cardno" } 
    ]

      const HeadersColumn1 =
    [
      { headername: "", field: "visible" },
       { headername: "SNo", field: "SNo" },
      { headername: "userSn", field: "userSn" },    
      { headername: "deviceUserId", field: "deviceUserId" },
      { headername: "recordTime", field: "recordTime" },
      { headername: "ip", field: "ip" }
    ]

  const handleChange = (e) => {
    const { name, value,checked,type } = e.target;
    if(type !=="checkbox"){
    setCityValues((previousValue) => {
      return {
        ...previousValue, [name]: value,
      }
     
    })
  }else{
        setCityValues((previousValue) => {
      return {
        ...previousValue, [name]: checked,
      }
     
    })
  }
    
 
  };


  const CityMasterCheck = (id) => {   
    // try {
    //   axios.get(`${API_URL}${CityParam}/${id.gtcitymastid}`)
    //     .then((res) => {
    //       if (res.data.length === 0) {  } else {
          
    //         setCityValues({
    //           gtcitymastid: res.data[0].gtcitymastid, cityname: res.data[0].cityname,
    //           state: res.data[0].gtstatemastid, country: res.data[0].gtcountrymastid,          
    //           active: res.data[0].active === "T" ? true : false
    //         });
       

    //         handleStateChange(res.data[0].gtstatemastid);
    //       }
    //     })
    //     .catch((error) => { setFetchError("Service does't running. pls check City Master) API in Country Controller") });
    // }
    // catch (err) {
    //   if (err.response) {
    //     console.log(`Error ${err.message}`);
    //   }
    // }
    // finally {

    //   setNewButton(1);

    // }
  }

  const CityMaster_Insert = () => {
  
   
      // try {
      //   cityValues.gtcountrymastid = cityCountryData[0].gtcountrymastid;
      //   const CountryData = {
      //     gtcitymastid: cityValues.gtcitymastid > 0 ? cityValues.gtcitymastid : 0, 
      //     cityname: cityValues.cityname,
      //     state: cityValues.state,
      //     country: cityValues.gtcountrymastid, active: cityValues.active === true ? "T" : "F"
      //   };
      //   axios.post(`${insert_update}`, CountryData)
      //     .then((respose) => {
      //       if (respose.data !== "") {
      //         axios.get(`${API_URL}${CityParam}`)
      //           .then((res) => { setCityItems(res.data); })
      //           .catch((error) => { setFetchError("Service does't running. pls check City Master) API in Country Controller") });
      //         alert(respose.data);

      //       }
      //       else {
      //         setFetchError(respose.error)
      //         alert("Error " + respose.data);
      //       }
      //     }).catch((error) => {
      //       alert(error);
      //       setFetchError(error)
      //     });
      // }
      // catch (err) {
      //   console.log(`Error . ${err}`);
      // }
      // finally {
      //   CityMaster_New();
      // }
   
  }
  const CityMaster_Save = () => {
    CityMaster_Insert();

  }

  const handleStateChange = (id) => {
    // try {
    //   axios.get(`${API_URL}${CountryParam}/${id}`).then((res) => {
    //     setCityCountryData(res.data);
    //   })
    //     .catch((error) => { setFetchError("Service does't running. pls check (City Master) "); });
    // }
    // catch (e) {
    // }
    // finally {
    // }

  }


  const CityMaster_Delete = async (id) => {
    // try {
    //   if (cityValues.gtcitymastid == '') { alert(`Empty Not Allowed`); return; }
    //   await axios.delete(`${API_URL}${deleteData}/${id.gtcitymastid}`)
    //     .then((respose) => {
    //       if (respose.data === 'true') {
    //         axios.get(`${API_URL}${CityParam}`)
    //           .then((res) => { setCityItems(res.data.reverse()); })
    //           .catch((error) => { alert(error); setFetchError(error) });
    //         alert("Record Deleted Successfully");

    //       }
    //       else {
    //         setFetchError(respose.error)
    //         alert(respose.error);
    //       }
    //     }).catch((error) => {
    //       alert(error);
    //       setFetchError(error)
    //     });
    // }
    // catch (err) {
    //   if (err.response) {
    //     console.log(`Error ${err.message}`);
    //     alert(err.error);
    //   }
    // }
  }



  const CityMaster_New = () => {  
     setNewButton(1);
     setCityValues([]);

     setCityCountryData([]);
  }

  const CityMaster_Search = () => { 
  

  
    }


    const TabIndexClick = (inx) => {
        setNewButton(inx);
    }


  const   commentsData = useMemo(() => {
 
    let computedComments = att;
    if (att_Search.length>1) {
      computedComments = computedComments.filter((item) => ((JSON.stringify(item.userId)).includes(att_Search))       
      )
    }
    setTotalItems(att.length);
    //sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) =>
        reversed * a[sorting.field].localeCompare(b[sorting.field]))
    }
    return computedComments.slice(
      (currentPage - 1) * ITEM_PER_PAGE,
      (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [att, currentPage, att_Search, sorting])


    const   commentsData1 = useMemo(() => { 
    let computedComments1 = attendance;
    if (attendance_Search.length>1) {
      computedComments1 = computedComments1.filter((item) => ((JSON.stringify(item.deviceUserId)).includes(attendance_Search)))
    }
    setTotalItems1(attendance.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments1 = computedComments1.sort((a, b) =>
        reversed * a[sorting.field].localeCompare(b[sorting.field]))
    }
    return computedComments1.slice(
      (currentPage1 - 1) * ITEM_PER_PAGE1,
      (currentPage1 - 1) * ITEM_PER_PAGE1 + ITEM_PER_PAGE1);
  }, [attendance, currentPage1, attendance_Search, sorting])

  return (
    <>
          <div onSubmit={handleSubmit}  >
           
       {userRights.length>0 &&
      <div className='container-fluid animate-zoom pt-2' style={{overflow:'hidden'}}  >
       <div className='row' style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>      
       <div className='row' style={{backgroundColor:`${foreValue}`,overflow:'hidden'}}>
                            <ul className='bloc-tabs boxShadow' style={{ display:'flex',justifyContent:'right'}}>
                                <li  > <button type='submit' className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{display:`${userRights[0].news}`==='T' ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => CityMaster_New()}    >News</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].saves}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CityMaster_Save()}    >Save</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].deletes}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CityMaster_Delete(cityValues.gtcitymastid)}  >Delete</button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].searches}` === "T" ? "block" : "none",ackgroundColor:`${colorValue}`}}  onClick={() => CityMaster_Search()}  > Search </button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].prints}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CityMaster_New()} >Prints</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].readonlys}` === "T" ? "none" : "none",backgroundColor:`${colorValue}`}} onClick={() => CityMaster_New()} >Readonlys</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].treebutton}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CityMaster_New()} >TreeButton</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].globalsearch}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CityMaster_New()} > Globalsearch </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].login}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CityMaster_New()} >Login</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].changepassword}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CityMaster_New()} >Changepassword</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].changeskin}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CityMaster_New()} >Changeskin</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].contact}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => CityMaster_New()} > Contact </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].pdf}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CityMaster_New()} >Pdf</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].import}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CityMaster_New()} > Import </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].download}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CityMaster_New()} > Download </button></li>
                            </ul>      
              <div className='row' >
             <div className='col-md-12'>
                   <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{  backgroundColor: `${colorValue}` ,color:`${foreValue}`}}> {title} </div>
            </div>                
            
               
                  <div className='row py-1'>
                    <label className='col-md-1' > compcode </label>
                    <select className='col-sm-2' name='compcode' value={cityValues.compcode || ""} onChange={handleChange} >
                      <option></option>
                      {
                        cityStateData !== null &&
                        cityStateData.map((result, index) => (
                          <option key={index} value={result.gtstatemastid}>
                            {result.statename}
                          </option>))
                      }
                    </select>
                
                    <label className='col-md-1' > username </label>
                    <select className='col-md-2' name='username' value={cityValues.username || ""} onChange={handleChange} >
                      <option></option>
                      {
                        cityStateData !== null &&
                        cityStateData.map((result, index) => (
                          <option key={index} value={result.gtstatemastid}>
                            {result.statename}
                          </option>))
                      }
                    </select>
                  <label className='col-md-1' > ipaddress </label>
                    <select className='col-md-2' name='username' value={cityValues.ipaddress || ""} onChange={handleChange} >
                      <option></option>
                      {
                        cityStateData !== null &&
                        cityStateData.map((result, index) => (
                          <option key={index} value={result.gtstatemastid}>
                            {result.statename}
                          </option>))
                      }
                    </select>
                    <label className='col-md-1'  > {'connected'} </label>
                    <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                      <input type="checkbox" name='active' checked={cityValues.active} onChange={handleChange} />
                      <span></span>
                      <i className='indicator'></i>
                    </label>
                  </div> 
                      <ul className='bloc-tabs'>
                               <li> <button type='button' className={newButton === 1  ? "tabs active-tabs" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor:`${colorValue}`,width:'100%' }}><b>{title} </b> </button></li>
                               <li> <button type='button' className={newButton === 2 ? "tabs active-tabs" : "tabs"} onClick={() => TabIndexClick(2)} style={{ backgroundColor:`${colorValue}`,width:'100%'  }} ><b> {subTitle}</b> </button></li>

                            </ul>  

        <div className={newButton === 1 ? "content active-content" : "content"}> 
                      
 <Search colorValue={colorValue} searchs={att_Search} setsearchs={setAtt_Search}
                    SearchLable1={searchLable1} SearchLable2={searchLable2}
                    SearchLable3={searchLable3}
                    handleChange={handleChange} ChangeValues={cityValues}
                    searchCompCode={searchCompCode} searchUserName={searchUserName} /> 

             
 <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}                 
                  comments={att} setComments={setAtt} foreValue={foreValue}
                  searches={att_Search} setSearches={setAtt_Search}
                  totalItems={totalItems} setTotalItems={setTotalItems}
                  currentPage={currentPage} setCurrentPage={setCurrentPage}
                  sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                  EditData={CityMasterCheck}
                  commentsData={commentsData} checkall={checkall} setCheckAll={setCheckAll} />
            
</div>
  <div className={newButton === 2 ? "content active-content" : "content"} > 
    
 <Search colorValue={colorValue} searchs={attendance_Search} setsearchs={setAttendance_Search}
                    SearchLable1={searchLable1} SearchLable2={searchLable2}
                    SearchLable3={searchLable3}
                    handleChange={handleChange} ChangeValues={cityValues}
                    searchCompCode={searchCompCode} searchUserName={searchUserName} />

                     <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn1}                 
                  comments={attendance} setComments={setAttendance} foreValue={foreValue}
                  searches={attendance_Search} setSearches={setAttendance_Search}
                  totalItems={totalItems1} setTotalItems={setTotalItems1}
                  currentPage={currentPage1} setCurrentPage={setCurrentPage1}
                  sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE1}
                  EditData={CityMasterCheck}
                  commentsData={commentsData1} checkall={checkall} setCheckAll={setCheckAll} />
    
     </div>

</div>
             
       
          
</div>
      </div>

          </div>
        </div>
} 
      </div>
    

    
    </>
  )
}

export default DeviceCommunication