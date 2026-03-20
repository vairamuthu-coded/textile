import React, { useContext, useEffect, useMemo, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import Search from '../Custom/Search';
import { toast } from 'react-toastify'; 
  import { useRef } from "react";
import SocialMissing from '../Social/SocialMissing';


const TaxTemplateMaster = ({ title, subTitle }) => {
  const { newButton, setNewButton, inputref,foreValue, handleSubmit, colorValue,defaultDetails,cityValues,setCityValues,
     setCityStateData, cityCountryData, setCityCountryData, selectedTitle,userRights,setUserRights,
    API_URL, currentPage, setCurrentPage, sorting, setSorting, ITEM_PER_PAGE,
    searchLable1,searchLable2,searchLable3,color1,handlepage,
    setSearchLable1,setSearchLable2,setSearchLable3 } = useContext(DataContext)
   const [taxValues, setTaxValues] = useState([])
   const [taxnameValue, setTaxNameValue] = useState([])
   const [taxnameDescValue, setTaxNameDescValue] = useState([])
  const [company_items, setCompanyItems] = useState([])
    const [totalItems,setTotalItems]=useState([]);
  const [city_Search, setCity_Search] = useState([]);
  const [city_FilterSearch, setCity_FilterSearch] = useState([]);
  const [cityItems, setCityItems] = useState([])
  const [searchCompCode, setSearchCompCode] = useState([])
  const [searchUserName, setSearchUserName] = useState([])
  const [city_active, setCityActive] = useState(false)
  const [fetchError, setFetchError] = useState(null)
  const [checkall, setCheckAll] = useState(false)
  const [checkchild, setCheckchild] = useState(false)
   const userrightsMenuCheck =`${API_URL}/UserRights/userrightsMenuCheck`;
  //const CompanyMasterGrid=`${API_URL}/CompanyMaster/CompanyMaster`;
   const CompanyMasterGrid=`${API_URL}/CompanyMaster/GridLoad`;
     const CountryParam = `${API_URL}/StateMaster/GridLoad`;
   const CityParam = `${API_URL}/  TaxTemplate/GridLoad`;
  // const StateParam = `${API_URL}/StateMaster/SelectCommond`;
  // const insert_update = `${API_URL}/  TaxTemplate/Saves`;
  // const deleteData = `${API_URL}/  TaxTemplate/DeleteCommond`;
  const heights = "380px";

    let one = React.createRef();
  let two = React.createRef();
  let three = React.createRef();
    let four = React.createRef();
  setSearchLable1("Search");  setSearchLable2("");  setSearchLable3("")

  const HeadersColumn =
    [
      { headername: "", field: "visible" },
      { headername: "id", field: "ASPTBLTAXTEMMASID" },
      { headername: "FINYEAR", field: "FINYEAR" },
      { headername: "TAXNAME", field: "TAXNAME" },
      { headername: "TAXNAMEDESC", field: "TAXNAMEDESC" },
      { headername: "ACTIVE", field: "ACTIVE" }
    ]

  

const refs = useRef([]);






// const handleChange = (e) => {
//    const { name, value, checked, type } = e.target;
//   const finalValue =
//     type === "checkbox"
//       ? checked
//       : type === "number"
//       ? Number(value)
//       : value;

//   setCityValues((prev) => ({
//     ...prev,
//     [name]: finalValue,
//   }));
// // utilityState(e, setCityValues);
//   if (name === "state") handleStateChange(value);
// };




  let validcheck = true;
const validate = (taxValues) => {

  if (!taxValues.cityname?.trim()) {
    toast.error("Invalid City Name");
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(taxValues.cityname)) {
    toast.error("Special Character not allowed");
    return false;
  }

  return true;
};
// ASPTBLTAXTEMMASID,FINYEAR,TAXNAME,TAXNAMEDESC,ACTIVE
useEffect(() => {
  const fetApi = async () => {
    try {
      const [menuRes,comRes,taxRes,taxDescRes] = await Promise.all([
        axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`),
        axios.get(CompanyMasterGrid),
        axios.get(CompanyMasterGrid),
        axios.get(CountryParam)

      ]);

      setUserRights(menuRes.data);
      setCompanyItems(comRes.data);
       setTaxNameValue(taxRes.data);
     setTaxNameDescValue(taxDescRes.data);
    } catch (error) {
      setFetchError(error);
    } finally{setNewButton(1)}
  };

  fetApi();

}, [defaultDetails?.Compcode, defaultDetails?.User, title]);



// useEffect(() => {
//   if (!city_Search) {
//     setCity_FilterSearch(cityItems);
//     return;
//   }
  
//   const search = String(city_Search || '').toLowerCase();
//   const filtered = cityItems
//     .filter((item) =>
//       item.cityname?.toLowerCase().includes(search) ||
//       item.country?.toLowerCase().includes(search) ||
//       item.state?.toLowerCase().includes(search)
//     ) ;

//   setCity_FilterSearch(filtered);
// }, [cityItems, city_Search]);

// ASPTBLTAXTEMMASID,FINYEAR,TAXNAME,TAXNAMEDESC,ACTIVE

const TaxTemplateCheck = async (id) => {
  try {
    const res = await axios.get(`${CityParam}/${id.ASPTBLTAXTEMMASID}`);
    if (res?.data?.length > 0) {
      const row = res.data[0];
      setTaxValues({
        ASPTBLTAXTEMMASID: row.ASPTBLTAXTEMMASID,
        FINYEAR: row.FINYEAR,
        TAXNAME: row.TAXNAME,
        TAXNAMEDESC: row.TAXNAMEDESC,
        ACTIVE: row.active === "T",
      });

     // handleStateChange(row.gtstatemastid);
    }
  } 
  catch (error) {
    setFetchError(
      "Service isn't running. Please check City Master API in Country Controller."
    );
  } 
  finally {
    setNewButton(1);
  }
};



  const TaxTemplate_Save = async () => {
   // Step 1: Validate values
  validate(taxValues);
  if (validcheck !== true) return;

  try {
    // Step 2: Check country dropdown data
    if (!taxnameDescValue?.length) {
      toast.error("No country selected");
      return;
    }
   let countryExists = taxnameDescValue.filter(c => c.ASPTBLTAXTEMMASID === taxValues.TAXNAME);
    // Step 3: Build payload (clean and consistent)
    const payload = {
      ASPTBLTAXTEMMASID: Number(taxValues.ASPTBLTAXTEMMASID) || 0,
      FINYEAR: taxValues.FINYEAR?.trim(),
      TAXNAME: taxValues.TAXNAME?.trim(),
      TAXNAMEDESC: taxValues.TAXNAMEDESC?.trim(), 
      ACTIVE: taxValues.ACTIVE ? "T" : "F",
    };
// ASPTBLTAXTEMMASID,FINYEAR,TAXNAME,TAXNAMEDESC,ACTIVE
    // Step 4: API call (Insert/Update)
    // const response = await axios.post(insert_update, payload);

    // if (!response?.data) {
    //   toast.error("Insert/Update failed.");
    //   return;
    // }

    // Step 5: Refresh Grid
    // const list = await axios.get(CityParam);
    // setCityItems(list.data);

    //toast.success(response.data);
  } 
  catch (error) {
    console.error(error);
    setFetchError(error);
    toast.error("Something went wrong. Check City Master API.");
  }
  finally {
    // Step 6: Always reset form after process
    TaxTemplate_New();
  }

  }

// const handleStateChange = async (id) => {

//   if (!id) return;
//   try {
//      const res = await axios.get(`${CountryParam}/${id}`); 
//      setTaxNameDescValue(res.data);
//   } 
//   catch (error) {
//     setFetchError("Service not running. Check API.");
//   }
// };


const TaxTemplate_Delete = async (id) => {
  
  try {
    if(id === undefined){
      toast.error("Please select a record to delete");
      return;
    }
    // const { data } = await axios.delete(`${deleteData}/${id}`);

    // if (data === true || data === "true") {
    //   setCityItems(prev => prev.filter(x => x.gtcitymastid !== id));
    //   toast.success("Record Deleted Successfully");
    // } else {
    //   toast.error("Delete failed");
    // }
  } catch (error) {
    toast.error(error?.message || "Server error");
  }

  try {
    // const res = await axios.get(`${CountryParam}/${id}`);
 
    // setCityCountryData(res.data);

  } 
  catch (error) {
    setFetchError("Service not running. Check API.");
  }
};



  const TaxTemplate_New = () => {  
    setNewButton(1);
    setTaxValues([]);
    setCityCountryData([]);
    setRows([ {id: 1, adname: "", adtype: "", aliasname: "", formula: "", sugg: "", notes: "" }]);
    setRows1([ {id: 1, compCode: "", compName: "", notes: "" }]);
  }

  const TaxTemplate_Search = () => {  }

const [rows1, setRows1] = useState([{ id: 1, compCode: "", compName: "", notes:"" }]);
const [rows, setRows] = useState([{ id: 1, adname: "", addType: "", aliasname: "", idNo: "" , formula: "", sugg: "",notes:"" }]);
const [fabricText, setFabricText] = useState("");

const handleChange1 = (e, index) => {
  const value = Number(e.target.value);
  const updated = [...rows1];
  const selected = company_items.find((item) => item.gtcompmastid === value);
  updated[index] = {
    ...updated[index],
    compCode: value,
    compName: selected?.compname?.toUpperCase() || ""
  };

  setRows1(updated);
};


const handleChange2 = (index, field, value) => {
  const updated = [...rows];
  updated[index][field] = value;
  setRows(updated);
};


const handleChange = (e) => {
  const { name, value, checked, type } = e.target;
    setTaxValues((prev) => ({
    ...prev,[name]: type === "checkbox" ? checked : value,
   }));
  // const updated = [...rows];
  // updated[index][field] = value;
  // setRows(updated);
};

const addRow1=()=>{setRows1(prev => [...prev,  { id: prev.length + 1, CompCode: "", CompName: ""}])}



const addRow = () => {
  setRows((prev) => [
    ...prev,
    {
      id: prev.length + 1,
      adname: "",
      idNo: "",
      adtype: "",
      aliasname: "",
      formula: "",
      sugg: "",
      notes: "",
    },
  ]);
};


const handleEnter = (e, index) => {
  if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    refs.current[index + 1]?.focus();
  }
};

const handleKeyDown = (e) => {
  const td = e.target.closest("td");
  const tr = td.parentElement;
  const table = tr.closest("table");
  const rowIndex = tr.rowIndex - 1;
  const cellIndex = td.cellIndex;
  if (e.key === "ArrowRight") { table.rows[rowIndex + 1]?.cells[cellIndex + 1] ?.querySelector("input,select")?.focus();  }
  if (e.key === "ArrowLeft") {  table.rows[rowIndex + 1]?.cells[cellIndex - 1] ?.querySelector("input,select")?.focus();  }
  if (e.key === "ArrowDown") {  table.rows[rowIndex + 2]?.cells[cellIndex]     ?.querySelector("input,select")?.focus();  }
  if (e.key === "ArrowUp") {    table.rows[rowIndex]?.cells[cellIndex] ?.querySelector("input,select")?.focus();  }
  if (e.key === "Enter") {   e.preventDefault();    table.rows[rowIndex + 2]?.cells[cellIndex]?.querySelector("input,select")?.focus();  }
};

const deleteRow = (index) => {
  const updated = rows.filter((_, i) => i !== index);
  setRows(updated);
if(rows.length === 1){
  setRows([
    { id: 1, adname: "", addType: "", aliasname: "", idNo: "" , formula: "", sugg: "",notes:"" }
  ]);
}};

const deleteRow1 = (index) => {
  const updated = rows1.filter((_, i) => i !== index);
  setRows1(updated);
if(rows1.length === 1){setRows1([ { id: 1, compCode: "", compName: "", notes:"" }  ]);}
};

    const TabIndexClick = (inx) => {
  
        setNewButton(inx);
      
    }

//   const   commentsData = useMemo(() => {
//     let search = String(city_Search || '').toLowerCase();
//      let computedComments = cityItems;

//     if (search) {
//       computedComments = computedComments.filter((item) => {
//          const country = String(item.country || "").toLowerCase();
//        const state  = String(item.state || "").toLowerCase();
//         const cityname  = String(item.cityname || "").toLowerCase();
//       return country.includes(search) || state.includes(search) || cityname.includes(search);
//       })
//     }

//     //sorting comments
//     if (sorting.field) {
//       const reversed = sorting.order === "asc" ? 1 : -1;
//       computedComments = computedComments.sort((a, b) =>
//         reversed * a[sorting.field].localeCompare(b[sorting.field]))
//     }
//     return computedComments.slice(
//       (currentPage - 1) * ITEM_PER_PAGE,
//       (currentPage - 1) * ITEM_PER_PAGE + ITEM_PER_PAGE);
//   }, [cityItems, currentPage, city_Search, sorting])


  const menuButtons = [
  { key: "news", label: "News", action: TaxTemplate_New },
  { key: "saves", label: "Save", action: TaxTemplate_Save },
  { key: "deletes", label: "Delete", action: TaxTemplate_Delete },
  { key: "searches", label: "Search", action: TaxTemplate_Search },
  { key: "prints", label: "Prints", action: TaxTemplate_New },
  { key: "treebutton", label: "TreeButton", action: TaxTemplate_New },
  { key: "globalsearch", label: "Globalsearch", action: TaxTemplate_New },
  { key: "login", label: "Login", action: TaxTemplate_New },
  { key: "changepassword", label: "Changepassword", action: TaxTemplate_New },
  { key: "changeskin", label: "Changeskin", action: TaxTemplate_New },
  { key: "contact", label: "Contact", action: TaxTemplate_New },
  { key: "pdf", label: "Pdf", action: TaxTemplate_New },
  { key: "import", label: "Import", action: TaxTemplate_New },
  { key: "download", label: "Download", action: TaxTemplate_New }
];

  return (

                <>
     {userRights?.length > 0  && (
       <div className='container-fluid animate-zoom p-1'  >
          <div className='row' style={{ display: `${userRights[0].readonlys === "T" ? "block" : "none"}` }}>
 
     <ul className="boxShadow d-flex justify-content-end">
                  {menuButtons.map((btn, index) => (
                    userRights[0][btn.key] === "T" && (
                      <li key={index}>
                        <button className={newButton === 1 ? "tabs active-tabs" : "tabs"}
                          style={{ backgroundColor: colorValue }}onClick={btn.action}  >
                          {btn.label}
                        </button>
                      </li>
                    )
                  ))}
        </ul>  
          <ul className='' style={{backgroundColor:`${colorValue}`}}>
             <li className='ps-2'> <button className={newButton === 1 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(1)} style={{ backgroundColor:`${colorValue}`, padding:'1%',fontWeight:'bold', width:'100%'}}>{title}  </button></li>
               <li className='ps-2'> <button className={newButton === 2 ? "tabs active-tabs btn" : "tabs"} onClick={() => TabIndexClick(2)} style={{ backgroundColor:`${colorValue}`, fontWeight:'bold', width:'100%' }} > {subTitle} </button></li>
                              
         </ul>
         <div className={newButton === 1 ? "content active-content" : "content"} >    
             
             <div className='row p-2'>   
                 <div className='col-md-3  float-start' >
             
                  <div className='row'>
                    <label className='col-md-4' > ID </label>
                    <input className='col-md-8' type='text' name='ASPTBLTAXTEMMASID' value={taxValues.ASPTBLTAXTEMMASID || ""} readOnly />
                  </div>
                 <div className='row py-1' >
                    <label className='col-md-4' > FinYear </label>
                    <input className='col-md-8' type='text' name="FINYEAR" 
                      value={taxValues.FINYEAR || ""} onChange={handleChange}  ref={el => refs.current[0] = el} onKeyDown={e => handleEnter(e,0)} />
                  </div> 
                  <div className='row ' >
                    <label className='col-md-4' > TaxName </label>
                    <input type='text' className='col-sm-8' name='TAXNAME' value={taxValues.TAXNAME || ""} onChange={handleChange} 
                    ref={el => refs.current[1] = el} onKeyDown={e => handleEnter(e,1)} />
                     
                 
                  </div>

             

                   <div className='row p-1'>
                    <label className='col-md-4'  > Active </label>
                    <label className='checkbox' style={{ padding: "0px", width: "60px" }} >
                      <input type="checkbox" name='active' checked={taxValues.ACTIVE} onChange={handleChange}   />
                      <span></span>
                      <i className='indicator'></i>
                    </label>
                  </div>  
                  </div>  <div className='col-md-1'></div>
              <div className='col-md-8' >
                  <div  style={{height:'100px',overflow:'auto'}}> 
                    
                     <table className="table animate-zoom table-responsive" >
                      <thead style={{backgroundColor:colorValue, color: foreValue}}>
                        <tr style={{backgroundColor:colorValue, color: foreValue}}>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>SNo</th>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>CompCode</th>
                          <th style={{backgroundColor:colorValue, color: foreValue, textAlign: 'center'}}>CompName</th>           
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>Delete</th>
                        </tr>
                      </thead>
                      <tbody className='col-sm-12 col-md-12 col-lg-12'>
                        {rows1.map((row1, index) => (
                          <tr key={row1.id} className='col-sm-12 col-md-12 col-lg-12' >
                            <td style={{margin:'0px',paddingLeft:'20px',width:'10px'}}>{index + 1}</td>
                          <td className='col-sm-2 col-md-2 col-lg-2' style={{margin:'0px',padding:'0px'}}>
                              <select className='col-sm-12 col-md-12 col-lg-12' name="compCode"   value={(row1.compCode || "")} onKeyDown={handleKeyDown}  onChange={(e)=>handleChange1(e,index)} >
                                 <option></option>         
                                {
                                  company_items !== null &&
                                  company_items.map((result, index) => (
                                    <option key={index} value={result.gtcompmastid}>
                                      {result.compcode}
                                    </option>))
                                }
                              </select>
                            </td>
                            <td  className='col-sm-12 col-md-12 col-lg-12' style={{margin:'0px',padding:'0px'}}>
                              <input type='text' name="compName" value={(row1.compName || "")}  className='col-sm-12 col-md-12 col-lg-12' style={{padding:'2px'}}  
                               onKeyDown={handleKeyDown} onChange={(e)=>handleChange1(e,index)}  />
                                                      
                             
                            </td>                        
                         
                             <td  className='col-sm-12 col-md-12 col-lg-12' style={{margin:'0px',padding:'0px'}}>
                              <button style={{margin:'0px',padding:'0px',textAlign:'center',color:'red'}} className='btn btn-danger fa-trash  fa fa-lg'                     
                               onClick={() => deleteRow1(index)}onKeyDown={handleKeyDown} 
                              >
                               
                              </button>
                            </td>
                          <td style={{margin:'0px',padding:'0px',width:'0px'}} > <input   
                          style={{margin:'0px',padding:'0px',width:'0px',border:'none'}}     onKeyDown={handleKeyDown}                           
                              onFocus={() => addRow1()}
                              /></td>
                          </tr>
                        ))}
                      </tbody>
            </table>
                
                  </div>
                 </div>
                  </div>    
       <div  style={{height:'340px',overflow:'auto'}}> 
            <table  className="table animate-zoom table-responsive" >
                      <thead style={{backgroundColor:colorValue, color: foreValue}}>
                        <tr style={{backgroundColor:colorValue, color: foreValue}}>
                          <th style={{backgroundColor:colorValue, color: foreValue, textAlign: 'center'}}>SNo</th>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>AdName</th>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>AddType</th>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>AliasName</th>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>ID</th>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>Formula</th>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>Sugg</th>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>Notes</th>
                          <th style={{backgroundColor:colorValue, color: foreValue,textAlign: 'center'}}>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={row.id}  >
                            <td style={{margin:'0px',padding:'0px'}}>{index + 1}</td>
                          <td style={{margin:'0px',padding:'0px'}}>
                              <select   className="col-md-12"  value={row.adname} onKeyDown={handleKeyDown} onChange={(e) =>handleChange2(index, "adname", e.target.value) } >
                                <option value=""></option>                               
                              </select>
                            </td>
                            <td style={{margin:'0px',padding:'0px'}}>
                              <select  className='col-sm-12 col-md-12 col-lg-12'  value={row.adtype} onKeyDown={handleKeyDown} onChange={(e) =>handleChange2(index, "adtype", e.target.value) } >
                                <option value=""></option>
                                <option value="Plus">Plus</option>
                                <option value="Minus">Minus</option>
                                <option value="Both">Both</option>
                              </select>
                            </td>
                            <td style={{margin:'0px',padding:'0px'}}>
                              <input
                                type="text"  style={{padding:'2px'}}
                               className='col-sm-12 col-md-12 col-lg-12'
                                value={row.aliasname} onKeyDown={handleKeyDown}
                                onChange={(e) =>
                                  handleChange2(index, "aliasname", e.target.value)
                                }
                              />
                            </td>
                            <td style={{margin:'0px',padding:'0px'}}>
                              <input
                                type="text"  style={{padding:'2px'}}
                              className='col-sm-12 col-md-12 col-lg-12'
                                value={row.id} onKeyDown={handleKeyDown}
                                onChange={(e) =>
                                  handleChange2(index, "id", e.target.value)
                                }
                              />
                            </td>
                          <td style={{margin:'0px',padding:'0px'}}>
                              <input
                                type="text"  style={{padding:'2px'}}
                               className='col-sm-12 col-md-12 col-lg-12'
                                value={row.formula} onKeyDown={handleKeyDown}
                                onChange={(e) =>
                                  handleChange2(index, "formula", e.target.value)
                                }
                              />
                            </td>
                            <td style={{margin:'0px',padding:'0px'}}>
                              <select className='col-sm-12 col-md-12 col-lg-12'  value={row.sugg} onKeyDown={handleKeyDown} onChange={(e) =>handleChange2(index, "sugg", e.target.value) } >
                                <option value=""></option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              
                              </select>
                            </td>
                            <td style={{margin:'0px',padding:'0px'}}>
                              <input
                                type="text" style={{padding:'2px'}}
                                 className='col-sm-12 col-md-12 col-lg-12'
                                value={row.notes} onKeyDown={handleKeyDown}
                                onChange={(e) =>
                                  handleChange2(index, "notes", e.target.value)
                                }  
                              />
                            </td>
                            <td style={{margin:'0px',padding:'0px'}}>
                              <button style={{margin:'0px',padding:'0px',textAlign:'center',color:'red'}} className='btn btn-danger fa-trash  fa fa-lg'                      
                                onClick={() => deleteRow(index)}
                              >
                                
                              </button>
                            </td>
                          <td style={{margin:'0px',padding:'0px',width:'0px'}} > <input   
                          style={{margin:'0px',padding:'0px',width:'0px',border:'none'}}                               
                              onFocus={() => addRow()}
                              /></td>
                          </tr>
                        ))}
                      </tbody>
            </table>
               </div>
        </div>
        <div className={newButton === 2 ? "content active-content" : "content"} > 
           <div className='row' >
          <div className='col-md-12' >
             
            

                <Search colorValue={colorValue} searchs={city_Search} setsearchs={setCity_Search}
                            SearchLable1={searchLable1} SearchLable2={searchLable2}
                            SearchLable3={searchLable3}  stylecolor={foreValue}
                            handleChange={handleChange} ChangeValues={taxValues}
                            searchCompCode={searchCompCode} searchUserName={searchUserName} />

                {/* <DataTable heights={heights} colorValue={colorValue} headers={HeadersColumn}                 
                  comments={cityItems} setComments={setCityItems} foreValue={foreValue}
                  searches={city_Search} setSearches={setCity_Search}
                  totalItems={totalItems} setTotalItems={setTotalItems}
                  currentPage={currentPage} setCurrentPage={setCurrentPage}
                  sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
                  EditData={CityMasterCheck}
                  commentsData={commentsData} setCheckchild={setCheckchild} checkall={checkall} setCheckAll={setCheckAll} />
 */}
              </div>

            </div>
        </div>


      </div>
      </div>   
     )}
     {fetchError && <SocialMissing message={fetchError} />} 
  </>
  )
}


export default TaxTemplateMaster