import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';

const StyleGroupMaster = ({title,subTitle,colorValue}) => {   
  const {API_URL,newButton,handleSubmit, tabindex, totalItems,setTotalItems,currentPage,setCurrentPage,CountryParam,color1,
    sorting,setSorting, setNewButton,styleGroupValues, setStyleGroupValues,selectText,setSelectedText}=useContext(DataContext)
 let ITEM_PER_PAGE=15;
 const insert_update=API_URL+"/StyleGroupMasters/PostStyleGroupMaster";
 const styleGroupparam=API_URL+"/StyleGroupMasters/GetStyleGroupMaster";
 const deleteData=API_URL+"/StyleGroupMasters/DeleteStyleGroupMaster";
 const stylecateparam=API_URL+"/StyleCategoryMasters/Getasptblstycatmas";
 const GetStyleGroupMaster=API_URL+"/StyleGroupMasters/GetStyleGroupMaster";
 const [fetchError,setFetchError]=useState(null)
 const [data,setData]=useState([])
 const [isLoading,setIsLoading]=useState(false)
 const [search,setSearch]=useState('');
 const [items,setItems]=useState([])   
 const [active,setActive]=useState(false)    
 const [stylecate,setStylecate]=useState([]) 

 const [size_FilterSearch,setSize_FilterSearch]=useState([]);

setNewButton(1);

 const handleChange=(e)=>{

  const { name, value,options} = e.target;
 
  setStyleGroupValues((previousValue)=>{     
          return{
              ...previousValue,[name]:value.toUpperCase(),
          }
      })
      if(name==='stylecategory'){
        setSelectedText(options[value].text);     
       
       }
       
  };


  let validcheck=true;
  const validate=(styleGroupValues)=>{    
    if(!styleGroupValues.stylegroup.trim()){
        alert("Invalid Country Name");
        validcheck=false;
        return;
    }
    if(/^[a-zA-Z]$/.test(styleGroupValues.stylegroup)){
        alert("Special Charector not allowed");
        validcheck=false;
        return;
    }  
    return validcheck;
}

 useEffect(()=>{   
  axios.get(`${styleGroupparam}`)
  .then((res) => {setItems(res.data);StyleGroupMasterNew();
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
      {headername:"id",field:"asptblstygrpmasid"},    
      {headername:"StyleGroup",field:"stylegroup"},
      {headername:"Category",field:"stylecategory"},
      {headername:"ProductStyle",field:"productstylegroup"},
      {headername:"ShortCode",field:"shortcode"},
      {headername:"Active",field:"active" }   
 ]

 const heights="420px";




  const StyleGroupMaster_Check=(id)=>{   
    try{      
      axios.get(`${GetStyleGroupMaster}/${id.asptblstygrpmasid}`)
      .then((res) => {             
        if(res.data.asptblstygrpmasid===0){alert("Invalid Data")}else{    
          const updatepost = {active: res.data[0].active === "T" ? true : false };   
          setSelectedText(res.data[0].stylecategory);
      setStyleGroupValues({asptblstygrpmasid:res.data[0].asptblstygrpmasid,stylegroup:res.data[0].stylegroup,
        productstylegroup:res.data[0].stylecategory+"/"+res.data[0].stylegroup,
        stylecategory:res.data[0].asptblstycatmasid,shortcode:res.data[0].shortcode,
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



const StyleGroupMaster_Save =async ()=>
{   
 
    validate(styleGroupValues);
if(validcheck==true){

try
{    
  const  CountryData={asptblstygrpmasid:styleGroupValues.asptblstygrpmasid> 0  ? styleGroupValues.asptblstygrpmasid : 0,
    stylegroup:styleGroupValues.stylegroup,
    stylecategory:styleGroupValues.stylecategory,
    productstylegroup:selectText+"/"+styleGroupValues.stylegroup,
    shortcode:styleGroupValues.shortcode,
    active:active===true ? "T" : "F"}; 
   
  await axios.post(`${insert_update}`,CountryData)
   .then((respose)=>{
    if(respose.data !== ""){        
      if(respose.data.asptblstygrpmasid>0){
            alert("Updated Successfully");
            
         } 
     if(respose.data.asptblstygrpmasid === 0){
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
  StyleGroupMasterNew();
}
}else{
  alert("pls Enter Mandatory Field");
}
}

const StyleGroupMaster_Delete= async()=>{    
  try{
    if(styleGroupValues.stylegroup === ''){alert(`Empty Not Allowed`);return;}
    if(styleGroupValues.asptblstygrpmasid>=1){
    const asptblstygrpmasid=styleGroupValues.asptblstygrpmasid;
    await axios.delete(`${deleteData}/${asptblstygrpmasid}`)
    .then((respose)=>{
     
     if(respose.data.asptblstygrpmasid > 0){     
             alert("Record Deleted Successfully");
           StyleGroupMasterNew();
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

  const StyleGroupMasterNew=()=>{   setNewButton(1);   setActive(false) ;setSelectedText("")
    setStyleGroupValues({asptblstygrpmasid:0,stylecategory:'',stylegroup:'',productstylegroup:'',shortcode:'',active:active});

    }





const commentsData=useMemo(()=>{
  let computedComments=items;
  if(search)
  {
    computedComments=computedComments.filter((item)=>((item.stylegroup).includes(search))   )  
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

<div className='col-md-12' style={{textAlign:"right"}}>
 <div style={{background :"var(--bs-header)"}}>
   <ul >    
       <li> <button type='submit'  onClick={()=>StyleGroupMasterNew()} style={{backgroundColor:`${color1[0]}`}}>News</button></li>
       <li> <button type='submit' onClick={()=>StyleGroupMaster_Save()} style={{backgroundColor:`${color1[1]}`}}>Save</button></li>          
       <li> <button type='submit' onClick={(e)=>StyleGroupMaster_Delete()} style={{backgroundColor:`${color1[2]}`}}>Delete</button></li>
       <li> <button type='submit'  onClick={()=>StyleGroupMasterNew()} style={{backgroundColor:`${color1[3]}`}}> Search </button></li>
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
         <input className='col-md-1'  type='text' name="asptblstygrpmasid" value={styleGroupValues.asptblstygrpmasid} readOnly  /> 

       </div> 
       <div className='row py-1'>  
       <label className='col-md-3'  > Style Category </label>
       <select className='col-md-4' name='stylecategory' onChange={handleChange} value={styleGroupValues.stylecategory} >
                      <option></option>
                      {
                        stylecate !== null &&
                        stylecate.map((result, index) => (<option key={index}  value={result.asptblstycatmasid}>
                          {result.stylecategory}
                        </option>))
                      }
                    </select>
                   

                    </div> 
        <div className='row' >      
         <label className='col-md-3' > StyleGroup </label>
    
         <input  className='col-md-4' name="stylegroup"   type='text'  value={styleGroupValues.stylegroup} onChange={handleChange}   />   
       </div>    
       <div className='row py-1' >      
         <label className='col-md-3' >  Product Style Group </label>
    
         <input  className='col-md-4' name="productstylegroup"  type='text' readOnly  value={styleGroupValues.asptblstygrpmasid===0 ? selectText+"/"+styleGroupValues.stylegroup : styleGroupValues.productstylegroup}   />   
       </div>   
       <div className='row' >      
         <label className='col-md-3' >  ShortCode </label>
    
         <input  className='col-md-4' name="shortcode"   type='text'    value={styleGroupValues.shortcode} onChange={handleChange}   />   
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
          EditData={StyleGroupMaster_Check}
          commentsData={commentsData}
          />

   </div>
  
</div>


</div>
</div> 
</form>
)

  
}

export default StyleGroupMaster
