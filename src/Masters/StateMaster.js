import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import Search from '../Custom/Search';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Button=styled.button`

margin:0px;padding-left:5px; padding-right:5px;width:100%;font-weight: bold;
 color:white;
`
const StateMaster = ({ title, subTitle}) => {
  const {
     colorValue ,defaultDetails,stateValues,setStateValues,foreValue,
    newButton, setNewButton, inputref, handleSubmit,userRights,setUserRights,
 currentPage, setCurrentPage, API_URL,handlepage,
    sorting, setSorting,ITEM_PER_PAGE, tabindex, state_CountryData, CityParam,
    searchLable1,searchLable2,searchLable3,
    setSearchLable1,setSearchLable2,setSearchLable3, color1,
  } = useContext(DataContext)

  const HeadersColumn =
    [
    { headername: "",field: "visible" },
     { headername: "SNo", field: "SNo" },
    { headername: "Id", field: "gtstatemastid" },
    { headername: "StateName", field: "statename" },
    { headername: "CountryName", field: "country" },
    { headername: "Active", field: "active" }
  ]

    const [searchCompCode, setSearchCompCode] = useState([])
    const [searchUserName, setSearchUserName] = useState([])
  const [stateItems, setStateItems] = useState([])

  const [state_FilterSearch, setState_FilterSearch] = useState([]);
  const [state_Search, setState_Search] = useState([]);
  const [fetchError, setFetchError] = useState(null)
  const [countryData, setCountryData] = useState([])
  const StateParam = "/StateMaster/GridLoad";
  const insert_update = "/StateMaster/Saves";
  const deleteData = "/StateMaster/DeleteCommond";
  const CountryParam = "/CountryMaster/GridLoad";
 
  const [checkall,setCheckAll]=useState(false)   
  const [checkchild,setCheckchild]=useState(false)  
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  //setSearchLable1("Search");  setSearchLable2("");  setSearchLable3("")
    const [totalItems,setTotalItems]=useState([]);
     
useEffect(() => {
  const fetchMyAPI = async () => {
    try {
      const [rightsRes, stateRes, countryRes] = await Promise.all([
        axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
        axios.get(`${API_URL}${StateParam}`),
        axios.get(`${API_URL}${CountryParam}`)
      ]);

      setUserRights(rightsRes.data);
      setStateItems(stateRes.data);
      setCountryData(countryRes.data);
    } 
    catch (error) {
      toast.error(error);
    }
  };

  fetchMyAPI();
}, []);







  const heights = "380px";

  const handleChange = (e) => {
    const { name, value,type,checked } = e.target;
   
    setStateValues((pre) => ({     
        ...pre, [name]:type==="checkbox"? checked : value,     
    }))
 
  };


const validate = (stateValues) => {
  // 1. State name required
  if (!stateValues.statename?.trim()) {
    toast.error("Invalid State Name");
    return false;
  }

  // 2. Country required
  if (!stateValues.country) {
    toast.error("Invalid Country Name");
    return false;
  }

  // 3. Special character check for state name (if needed)
  const specialCharRegex = /[^a-zA-Z0-9\s]/;

  if (specialCharRegex.test(stateValues.statename)) {
    toast.error("Special Characters Not Allowed in State Name");
    return false;
  }

  return true; // validation passed
};

  const  StateMasterCheck=(async(id)=>{

    try {
    var res= await axios.get(`${API_URL}${StateParam}/${id.gtstatemastid}`);      
  
        if(res?.data !==""){
          
          setStateValues({
            gtstatemastid: res.data[0].gtstatemastid, statename: res.data[0].statename,
            country: res.data[0].gtcountrymastid,
            active: res.data[0].active === "T" ? true : false         
          });     
        }else{
          toast.error(res?.data)
        }
       
    }
    catch (err) {
       toast.error(err)
    }    

      setNewButton(1);

    
  })




  const StateMaster_Save = async () => {
     const isValid = validate(stateValues);
  if (!isValid) return;

  try {
    const CountryData = {
      gtstatemastid: stateValues.gtstatemastid > 0 ? stateValues.gtstatemastid : 0,
      statename: stateValues.statename,
      country: stateValues.country,
      active: stateValues.active === true ? "T" : "F"
    };

    const response = await axios.post(`${API_URL}${insert_update}`, CountryData);

    if (response?.data) {
      const res = await axios.get(`${API_URL}${StateParam}`);

      if (res?.data) {
        setStateItems(res.data);
        toast.success(response.data);
      }
    } else {
      toast.error("Error " + response?.data);
    }
  }
  catch (err) {
    setFetchError(`Error: ${err}`);
  }
  finally {
    StateMasterNew();
  }

  }

  const StateMaster_Delete = async (id) => {
    try {
      if(id === undefined){
            toast.error("Please select a record to delete");
            return;
          }
      
   var response=await axios.delete(`${API_URL}${deleteData}/${id}`);       
          if (response?.data == 'delete') {         
            toast.success("Record Deleted Successfully");
            setNewButton(1);
          }
          else {
            setFetchError(response?.data)
            toast.error(response?.data)
          }    

    }
    catch (err) { if (err.response) { toast.error(`Error ${err.message}`); } }
    finally {
      StateMasterNew();
    }
  }

  const options = [countryData];

  const StateMasterNew = () => {

    setNewButton(1); 
    setStateValues([]);
  }

  const commentsData = useMemo(() => {
    let search = String(state_Search || '').toLowerCase();
    let computedComments =  stateItems;
      setTotalItems(computedComments.length); 
    if(computedComments.length>0){
    if (search) {
      computedComments = computedComments.filter((item) => {
       let statename= String(item.statename || "").toLowerCase();
       let country= String(item.country || "").toLowerCase();
       return  statename.includes(search) || country.includes(search)
      })
    }
    
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort((a, b) =>
        reversed * a[sorting.field].localeCompare(b[sorting.field]))
    }}
    return computedComments.slice(
      (currentPage - 1) * ITEM_PER_PAGE,
      (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
  }, [stateItems, currentPage, state_Search, sorting]
  )


  return ( 
<div onSubmit={handleSubmit}  >
 {userRights.length >= 1 &&
 <div className='container-fluid animate-zoom ' >               
  {!fetchError ? (
    <>
       <div style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
                     <ul className='bloc-tabs' style={{display:"flex", justifyContent: "right" }}>
                                <li> <button onClick={() => StateMasterNew()} className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{ backgroundColor:`${colorValue}`,display: userRights[0].news === "T" ? "block" : "none" }}    >News</button></li>
                                <li>  <button onClick={() => StateMaster_Save()}  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{backgroundColor:`${colorValue}`,display: userRights[0].saves === "T" ? "block" : "none" }}   >Save</button></li>
                                <li> <button onClick={(e) => StateMaster_Delete(stateValues.gtstatemastid)} className={newButton === 1 ? "tabs active-tabs" : "tabs"}  style={{backgroundColor:`${colorValue}`,display: userRights[0].deletes === "T" ? "block" : "none" }} >Delete</button></li>
                                <li> <button onClick={() => StateMaster_Delete()} className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{ backgroundColor:`${colorValue}`,display: userRights[0].search === "T" ? "block" : "none" }} > Search </button></li>
                        </ul>            
<div className='row' >
          
          <div className='col-md-6' >
               
            <div className='content active-content' >
                <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{  backgroundColor: `${colorValue}` ,color:`${foreValue}`}}> {title} </div>
            </div>      
            <fieldset><legend></legend>
                  <div className='row py-1'>
                    <label className='col-md-2' > ID </label>
                    <input className='col-md-4' type='text' name='gtstatemastid' value={stateValues.gtstatemastid || ""} readOnly />
                  </div>
                  <div className='row' >
                    <label className='col-md-2' > StateName </label>
                    <input className='col-md-4' type='text' name="statename"
                      value={stateValues.statename || ""} onChange={handleChange} />
                  </div>

                  <div className='row py-1' >
                    <label className='col-md-2' > Country </label>

                    <select className='col-md-4' name='country' onChange={handleChange} value={stateValues.country || ""} >
                      <option></option>
                      {
                        countryData !== null &&
                        countryData.map((result, index) => (<option key={index} value={result.gtcountrymastid}>
                          {result.countryname}
                        </option>))
                      }
                    </select>
                  </div>

                  <div className='row'>
                    <label className='col-md-2'  > Active </label>
                    <label className='checkbox' style={{ padding:"0px",width:"60px"}}>
                      <input type="checkbox" name='active' checked={stateValues.active} onChange={handleChange} />
                      <span></span>
                      <i className='indicator'></i>
                    </label>
                  </div>
                  </fieldset>
                </div>
              </div>
             
                 <div className='col-md-6' >

           
             
                <div className="content active-content">
                   <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{  backgroundColor: `${colorValue}` ,color:`${foreValue}`}}> {title} </div>
            </div>
                     <Search colorValue={colorValue} searchs={state_Search} setsearchs={setState_Search}
                            SearchLable1={searchLable1} SearchLable2={searchLable2}
                            SearchLable3={searchLable3}  stylecolor={foreValue}
                            handleChange={handleChange} ChangeValues={stateValues}
                            searchCompCode={searchCompCode} searchUserName={searchUserName} />

           
                       <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}                     
                      comments={stateItems} setComments={setStateItems} foreValue={foreValue}
                      searches={state_Search} setSearches={setState_Search}
                      totalItems={totalItems} setTotalItems={setTotalItems}
                      currentPage={currentPage} setCurrentPage={setCurrentPage}
                      sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                      EditData={StateMasterCheck}
                      commentsData={commentsData} 
                      setCheckchild={setCheckchild} setCheckAll={setCheckAll} checkall={checkall}   />
           
               
              </div>
            </div>         
 </div>
        </div>
    
     </>
) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing> } 
</div>
}
      </div> 
  

  )

}

export default StateMaster
