import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';

const StyleItemMaster = ({title,subTitle,colorValue}) => {   
  const {API_URL,newButton,handleSubmit, tabindex, totalItems,setTotalItems,currentPage,setCurrentPage,CountryParam,color1,
    sorting,setSorting, setNewButton,styleItemValues, setStyleItemValues,selectText,setSelectedText}=useContext(DataContext)
 let ITEM_PER_PAGE=15;
 const insert_update=API_URL+"/StyleItemMasters/PostStyleItemMaster";
 const styleGroupparam=API_URL+"/StyleGroupMasters/GetStyleGroupMaster";
 const deleteData=API_URL+"/StyleItemMasters/DeleteStyleItemMaster";
 const stylecateparam=API_URL+"/StyleCategoryMasters/Getasptblstycatmas";
 const GetGrid=API_URL+"/StyleItemMasters/GetStyleItemMaster";

 const [fetchError,setFetchError]=useState(null);

 const [data,setData]=useState([])
 const [isLoading,setIsLoading]=useState(false)
 const [search,setSearch]=useState('');
 const [items,setItems]=useState([])   
 const [stygroup,setStyGroup]=useState([])   
 const [active,setActive]=useState(false)    
 const [stylecate,setStylecate]=useState([]) 
 const [selectTextGroup,setSelectTextGroup]=useState([]) 
 const [size_FilterSearch,setSize_FilterSearch]=useState([]);

setNewButton(1);

 const handleChange=(e)=>{

  const { name, value,options} = e.target; 
  setStyleItemValues((previousValue)=>{     
          return{
              ...previousValue,[name]:value.toUpperCase(),
          }
      })
      if(name==='stylegroup'){
        setSelectedText(options[value].text);          
       }
       if(name==='stylecategory'){
        setSelectTextGroup(options[value].text);          
       }
    
  };


  let validcheck=true;
  const validate=(styleItemValues)=>{    
    if(!styleItemValues.stylegroup.trim()){
        alert("Invalid Country Name");
        validcheck=false;
        return;
    }
    if(/^[a-zA-Z]$/.test(styleItemValues.stylegroup)){
        alert("Special Charector not allowed");
        validcheck=false;
        return;
    }  
    return validcheck;
}

 useEffect(()=>{   
  axios.get(`${GetGrid}`)
  .then((res) => {setItems(res.data); setStyGroup(res.data);StyleItemMasterNew();
    axios.get(`${stylecateparam}`)
    .then((res) => {setStylecate(res.data); setNewButton(1);})   
    .catch((error)=>{setFetchError(error)});
    
  })
  .catch((error)=>{setFetchError(error)}); 
  },[])

  useEffect(()=>{    
    const filterResult=items.filter((post)=>((post.stylegroup).includes(search)))
    setSize_FilterSearch(filterResult.reverse());  
  },[items,search]);

  const HeadersColumn=
  [
      {headername:"S.No",field:"SNo"}, 
      {headername:"id",field:"asptblstyleitemmasid"},    
      {headername:"StyleGroup",field:"stylegroup"},
      {headername:"Category",field:"stylecategory"},
      {headername:"StyleItem",field:"styleitem"},
      {headername:"aliasname",field:"aliasname"},
      {headername:"hsn",field:"hsn"},
      {headername:"Active",field:"active" }   
 ]

 const heights="420px";




  const StyleItemMaster_Check=(id)=>{   
    try{      
      axios.get(`${GetGrid}/${id.asptblstyleitemmasid}`)
      .then((res) => {             
        if(res.data.asptblstyleitemmasid===0){alert("Invalid Data")}else{    
          const updatepost = {active: res.data[0].active === "T" ? true : false };   
          setSelectedText(res.data[0].stylegroup);setSelectTextGroup(res.data[0].stylecategory);
      setStyleItemValues({asptblstyleitemmasid:res.data[0].asptblstyleitemmasid,
        stylegroup:res.data[0].asptblstycatmasid,
        stylecategory:res.data[0].asptblstycatmasid,
        styleitem:res.data[0].stylegroup+"/"+res.data[0].stylecategory,
        aliasname:res.data[0].aliasname,
        hsn:res.data[0].hsn,
        active: res.data[0].active === "T" ? true : false });     
    }}).catch((error) => { alert(error) });
  }
    catch(err){ 
      if(err.response){

        setFetchError(err.response)
      }
    }
    finally{
      setNewButton(1)
      
    } 
  }



const StyleItemMaster_Save =async ()=>
{   

    validate(styleItemValues);
if(validcheck==true){

try
{    
  const  CountryData={asptblstyleitemmasid:styleItemValues.asptblstyleitemmasid> 0  ? styleItemValues.asptblstyleitemmasid : 0,
    stylegroup:styleItemValues.stylegroup,
    stylecategory:styleItemValues.stylecategory,
    styleitem:selectText+"/"+selectTextGroup,
    aliasname:styleItemValues.aliasname,   
    hsn:styleItemValues.hsn,
    active:active===true ? "T" : "F"}; 

    alert(JSON.stringify(CountryData));
   
  await axios.post(`${insert_update}`,CountryData)
   .then((respose)=>{
    if(respose.data !== ""){        
      if(respose.data.asptblstyleitemmasid>0){
            alert("Updated Successfully");
            
         } 
     if(respose.data.asptblstyleitemmasid === 0){
          alert("Record Saved Successfully");
          
          }
       }
      else{
        setFetchError(respose.error)
        alert("Error "+respose.data);
      }
      axios.get(`${styleGroupparam}`)
      .then((res) => {setItems(res.data); })
      .catch((error)=>{setFetchError(error)}); 
   }).catch((error)=>{       
    setFetchError(error)
   }); 


}
catch(err){
  setFetchError(`Error . ${err}`);
}
finally{
  StyleItemMasterNew();
}
}else{
  alert("pls Enter Mandatory Field");
}
}

const StyleItemMaster_Delete= async()=>{    
  try{
    if(styleItemValues.stylegroup === ''){alert(`Empty Not Allowed`);return;}
    if(styleItemValues.asptblstyleitemmasid>=1){
    const asptblstyleitemmasid=styleItemValues.asptblstyleitemmasid;
    await axios.delete(`${deleteData}/${asptblstyleitemmasid}`)
    .then((respose)=>{
     
     if(respose.data.asptblstyleitemmasid > 0){     
             alert("Record Deleted Successfully");
             StyleItemMasterNew();
        }
       else{
         setFetchError(respose.error)
         alert("Error "+respose.data);
       }
       axios.get(`${styleGroupparam}`)
       .then((res) => {setItems(res.data); })
       .catch((error)=>{setFetchError(error)}); 
    }).catch((error)=>{
     setFetchError(error)
    });

}}
catch(err){
  if(err.response){
    console.log(`Error ${err.message}`);
  }
}
}


const inputref=useRef();

  const StyleItemMasterNew=()=>{   setNewButton(1);   setActive(false) ;setSelectedText("");setSelectedText("");
    setStyleItemValues({asptblstyleitemmasid:0, stylecategory:'',stylegroup:'',styleitem:'',
      aliasname:'',hsn:'',active:active});

    }





const commentsData=useMemo(()=>{
  let computedComments=items;
  if(search)
  {
    computedComments=computedComments.filter((item)=>((item.styleitem).includes(search))   )  
  } 
  setTotalItems(computedComments.length);
  //sorting comments
  if(sorting.field){
      const reversed=sorting.order==="asc" ? 1 : -1;
      computedComments=computedComments.sort((a,b)=>
          reversed * a[sorting.field].localeCompare(b[sorting.field]))
  }
  return computedComments.slice(
      (currentPage-1)*ITEM_PER_PAGE,
      (currentPage-1)*ITEM_PER_PAGE+ITEM_PER_PAGE);
},[items,currentPage,search,sorting])


return (
  <form onSubmit={handleSubmit}  >
 <div className='container-fluid animate-zoom' >

  <div className='row' style={{backgroundColor:"white"}}>
  {/* {!fetchError ? (
    <> */}
<div className='col-md-12' style={{textAlign:"right"}}>
 <div style={{background :"var(--bs-header)"}}>
   <ul >    
       <li> <button type='submit'  onClick={()=>StyleItemMasterNew()} style={{backgroundColor:`${color1[0]}`}}>News</button></li>
       <li> <button type='submit' onClick={()=>StyleItemMaster_Save()} style={{backgroundColor:`${color1[1]}`}}>Save</button></li>          
       <li> <button type='submit' onClick={(e)=>StyleItemMaster_Delete()} style={{backgroundColor:`${color1[2]}`}}>Delete</button></li>
       <li> <button type='submit'  onClick={()=>StyleItemMasterNew()} style={{backgroundColor:`${color1[3]}`}}> Search </button></li>
    </ul>
 </div>
 </div>
 <div className='col-md-7' style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
            <div className='bloc-tabs' >
              <div className="tabs active-tabs" style={{ color: `${colorValue}` }}> {title} </div>
            </div>

<div className='content-tabs' >
   <div className="content active-content">
    <fieldset><legend></legend>
    <div className='col-md-12' style={{ backgroundColor: "var(--bs-light)", padding: "0" }}>
      
       <div className='row'>         
         <label className='col-md-3'  > ID </label>
         <input className='col-md-1'  type='text' name="asptblstyleitemmasid" value={styleItemValues.asptblstyleitemmasid} readOnly  /> 
       </div> 
       <div className='row'>  
       <label className='col-md-3'  > StyleGroup </label>
       <select className='col-md-4' name='stylegroup' onChange={handleChange} value={styleItemValues.stylegroup} >
                      <option></option>
                      {
                        stygroup !== null &&
                        stygroup.map((result, index) => (<option key={index}  value={result.asptblstygrpmasid}>
                          {result.stylegroup}
                        </option>))
                      }
                    </select>
                   
                   
                    </div>

       <div className='row py-1'>  
       <label className='col-md-3'  > Style Category </label>
       <select className='col-md-4' name='stylecategory' onChange={handleChange} value={styleItemValues.stylecategory} >
                      <option></option>
                      {
                        stylecate !== null &&
                        stylecate.map((result, index) => (<option key={index}  value={result.asptblstycatmasid}>
                          {result.stylecategory}
                        </option>))
                      }
                    </select>

                    </div>
       <div className='row'>      
         <label className='col-md-3'> StyleItem </label>     
         <input  className='col-md-4' name="styleitem"   type='text' readOnly  value={styleItemValues.asptblstyleitemmasid===0 ?  selectText +"/"+selectTextGroup : ""} />   
       </div>    
       <div className='row py-1' >      
         <label className='col-md-3' >  AliasName </label>    
         <input  className='col-md-4' name="aliasname"  type='text'   value={styleItemValues.aliasname}  onChange={handleChange}  />   
       </div>   
       <div className='row' >      
         <label className='col-md-3' >  HSNCode </label>
    
         <input  className='col-md-4' name="hsn"   type='text'    value={styleItemValues.hsn} onChange={handleChange}   />   
       </div> 
       <div className='row py-1'>   
       <label className='col-md-3' > Active </label>  
       <label className='checkbox' style={{ padding:"0px",width:"60px"}}>
        <input type="checkbox"  name="active" checked={active}  onChange={(e)=>setActive(e.target.checked)} />
        <span></span>
        <i className='indicator'></i>
        </label>
       </div>   
       </div>

       </fieldset>
   </div>
   </div>
   </div>
   <div className='col-md-5' style={{ backgroundColor: "var(--bs-white)", padding: "0" }}>
         
<div className='bloc-tabs' >
  <div className="tabs active-tabs" style={{ color: `${colorValue}` }}> {title} </div>
</div>
   <div className={newButton ===1 ? "content active-content" : "content"} >
    <DataTable heights={heights} colorValue={colorValue}  headers={HeadersColumn}
          comments={items} setComments={setItems}
          searches={search} setSearches={setSearch}
          totalItems={totalItems}setTotalItems={setTotalItems}
          currentPage={currentPage} setCurrentPage={setCurrentPage}
          sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
          EditData={StyleItemMaster_Check}
          commentsData={commentsData}
          />

   </div>
</div>
{/* </>
) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing> } */}

</div>
</div>
</form>
)

  
}




export default StyleItemMaster
