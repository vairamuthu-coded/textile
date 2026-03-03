import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import Search from '../Custom/Search';
import { toast } from 'react-toastify';

const CountryMaster = ({ title, subTitle }) => {
  const {   foreValue, newButton, setNewButton,  handleSubmit,userRights,setUserRights,
     currentPage, setCurrentPage, API_URL,colorValue,defaultDetails,
     countryValues, setCountryValues,handlepage,setError,
    sorting, setSorting, tabindex, state_CountryData, CityParam,
    searchLable1,searchLable2,searchLable3,isloading,setIsLoading,
    setSearchLable1,setSearchLable2,setSearchLable3, color1,
 } = useContext(DataContext)

  let ITEM_PER_PAGE = 20;  
  const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
  const CountryParam = API_URL + '/CountryMaster/GridLoad';
  const insert_update = API_URL+"/CountryMaster/Saves";
  const deleteData = API_URL + "/CountryMaster/DeleteCommond";
  let validcheck = true;
  const [totalItems,setTotalItems]=useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([])

  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
   const [checkall,setCheckAll]=useState(false)   
   const [checkchild,setCheckchild]=useState(false)  



  
  const [country_FilterSearch, setCountry_FilterSearch] = useState([]);

useEffect(() => { 
     axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).then((ress) => {
       setUserRights(ress.data)    
      axios.get(`${CountryParam}`).then((res1) => { setItems(res1.data);         
        setNewButton(1); 
        }).catch((error) => {setError(error) })    
       }).catch((error) => { alert("loginCompCode"+error); });
  }, [])

  useEffect(() => { 
    const filterResult = items.filter((post) => ((post.countryname).includes(search)))
    setCountry_FilterSearch(filterResult.reverse());
  }, [items, search]);

  const HeadersColumn =
    [
      { headername: "", field: "visible" },
      { headername: "ID", field: "gtcountrymastid" },
      { headername: "Country", field: "countryname" },
      { headername: "Actuve", field: "active" }
    ]

  const heights = "380px";



  const handleChange = (e) => {
    const { name, value,checked,type} = e.target;
  
    setCountryValues((pre)=>({           
        ...pre, [name]:type==="checkbox" ? checked: value,       
  }))
  };



const validate = (countryValues) => {
  if (!countryValues.countryname?.trim()) {
    toast.error("Invalid Country Name");
    return false;
  }

  // Only alphabets and spaces allowed
  if (!/^[a-zA-Z\s]+$/.test(countryValues.countryname)) {
    toast.error("Special Character not allowed");
    return false;
  }

  return true;
};



  const CountryMaster_Check = (id) => {
    try {
      const myitem = items.filter(item => item.gtcountrymastid === id.gtcountrymastid); 
      setCountryValues({ gtcountrymastid: myitem[0].gtcountrymastid, countryname: myitem[0].countryname, active:myitem[0].active === "T" ? true : false  })
      
    }
    catch (err) {
      if (err.response) {
        setFetchError(err.response)
      }
    }
    finally {
      setNewButton(1);
    }
  }



  const CountryMaster_Save = () => {
    validate(countryValues);
    if (validcheck === true) {
        try {
      const CountryData = { gtcountrymastid: countryValues.gtcountrymastid > 0 ? countryValues.gtcountrymastid : 0, countryname: countryValues.countryname, active: countryValues.active === true ? "T" : "F" };
      axios.post(`${insert_update}`, CountryData)
        .then((respose) => {
          if (respose.data !== "") {
            axios.get(`${CountryParam}`)
              .then((res) => {
                setItems(res.data.reverse()); setNewButton(2);
                
              })
              .catch((error) => { setFetchError("Service does't running. pls check (ProcessMaster) API in Country Controller") });
          }
          else {
            alert("Error " + respose.data);
          }
        }).catch((error) => {
          alert(error)
        });
    }

    catch (err) {
      alert(`Error . ${err}`);
    } finally {
      setCountryValues({})
    }
    }
  }

  const CountryMaster_Delete = async (id) => {
    try {
      if (countryValues.countryname === '') { alert(`Empty Not Allowed`); return; }
      if (countryValues.gtcountrymastid >= 1) {
        const id = countryValues.gtcountrymastid;
        await axios.delete(`${deleteData}/${id}`)
          .then((respose) => {
            if (respose.data === true) {
              axios.get(`${CountryParam}`)
                .then((res) => { setItems(res.data.reverse());; })
                .catch((error) => { setFetchError(error) });
              alert("Record Deleted Successfully");
              setNewButton(2);
            }
            else {
              setFetchError(respose.error)             
            }
          }).catch((error) => {
            setFetchError(error)
          });

      }
    }
    catch (err) {
      
        console.log(`Error ${err.message}`);
      
    }
  }


  const inputref = useRef();

  const CountryMasterClear = () => {
    setCountryValues([]);
  }

  const CountryMasterNew = () => {
   setCountryValues([]);CountryMasterClear(); 

    setNewButton(tabindex); 
  }





  const commentsData = useMemo(() => {
 let searchs=String(search || "").toLowerCase();
    let computedComments = items;
    if (searchs) {
      computedComments = computedComments.filter((item) => {
      let country=String(item.countryname || "").toLowerCase();
      return country.includes(searchs)})
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
  }, [items, currentPage, search, sorting])

  // const [count,setCount]=useState({count:4,theme:'red' })


  // const handleIncrement=()=>{
  //    setCount(pre=>{return {...pre, count:pre.count+1}})
  // }

  // const handleDecrement=()=>{
  //   setCount(pre=>{return {...pre, count:pre.count-1}})
  // }



  return (
   <div onSubmit={handleSubmit}> 
       {userRights.length>0 &&
      <div className='container-fluid animate-zoom ' >             
  {!fetchError ? (
    <>
  <div  style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
 <ul className='boxShadow d-flex justify-content-end'>
              <li  > <button  className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{display:`${userRights[0].news}`==='T' ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => CountryMasterNew()}    >News</button></li>
                                <li > <button  className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].saves}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CountryMaster_Save()}    >Save</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].deletes}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CountryMaster_Delete(countryValues.gtcountrymastid)}  >Delete</button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].searches}` === "T" ? "block" : "none",ackgroundColor:`${colorValue}`}}  onClick={() => CountryMasterNew()}  > Search </button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].prints}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CountryMasterNew()} >Prints</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].readonlys}` === "T" ? "none" : "none",backgroundColor:`${colorValue}`}} onClick={() => CountryMasterNew()} >Readonlys</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].treebutton}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CountryMasterNew()} >TreeButton</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].globalsearch}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CountryMasterNew()} > Globalsearch </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].login}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CountryMasterNew()} >Login</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].changepassword}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CountryMasterNew()} >Changepassword</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].changeskin}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CountryMasterNew()} >Changeskin</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].contact}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => CountryMasterNew()} > Contact </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].pdf}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => CountryMasterNew()} >Pdf</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].import}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CountryMasterNew()} > Import </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights[0].download}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => CountryMasterNew()} > Download </button></li>
          </ul>    
          <div className='row' >
        <div className='col-md-6' style={{ backgroundColor: `${foreValue}`, padding: "0px",margin:'0px' }}>
                 <div className='content active-content' >
                <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{  backgroundColor: `${colorValue}` ,color:`${foreValue}`}}> {title} </div>
            </div>  
              
                    <div className='row py-1'>
                      <label className='col-md-2' > CountryID </label>
                      <input className='col-md-6' type='text' name='gtcountrymastid' value={countryValues.gtcountrymastid || ""} readOnly />
                    </div>
                    <div className='row' >
                      <label className='col-md-2' > countryname </label> 
                      <input className='col-md-6' type='text' name='countryname'   value={countryValues.countryname || ""} onChange={handleChange}  required />

                    </div>
                    <div className='row py-1' >
                      <label className='col-sm-2' > Active </label>
                      <label className='checkbox' style={{ padding: "0px", width: "60px" }}>
                        <input type="checkbox" name='active' checked={countryValues.active} onChange={handleChange} />
                        <span></span>
                        <i className='indicator'></i>
                      </label>
                    </div>
        
        </div> </div>
       
       <div className='col-md-6' style={{ backgroundColor: `${foreValue}`, padding: "0" }}>
    
            <div className="content active-content">
                <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{  backgroundColor: `${colorValue}` ,color:`${foreValue}`}}> {subTitle} </div>
            </div>   
             <Search colorValue={colorValue} searchs={search} setsearchs={setSearch}
              SearchLable1={searchLable1} SearchLable2={searchLable2} stylecolor={foreValue}
              SearchLable3={searchLable3} handleChange={handleChange} ChangeValues={countryValues}
              searchCompCode={searchCompCode} searchUserName={searchUserName} />

            
              <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}              
                comments={items} setComments={setItems} foreValue={foreValue}
                searches={search} setSearches={setSearch}
                totalItems={totalItems} setTotalItems={setTotalItems}
                currentPage={currentPage} setCurrentPage={setCurrentPage}
                sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                EditData={CountryMaster_Check}
                commentsData={commentsData} setCheckchild={setCheckchild} setCheckAll={setCheckAll} checkall={checkall}
                SearchLable1={searchLable1} SearchLable2={searchLable2} SearchLable3={searchLable3}
              />  


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

export default CountryMaster
