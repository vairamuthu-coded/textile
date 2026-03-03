import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import  {toast} from 'react-toastify';

const SizeMaster = ({title,subTitle}) => {   
  const {API_URL,newButton,handleSubmit,defaultDetails, foreValue, currentPage,setCurrentPage,CountryParam,
    sorting,setSorting, setNewButton,sizeValues,setSizeValues,colorValue}=useContext(DataContext)
 let ITEM_PER_PAGE=15;
     const userrightsMenuCheck = API_URL + "/UserRights/userrightsMenuCheck";
 const insert_update=API_URL+"/SizeMasters/PostSizeMaster";
 const sizeparam=API_URL+"/SizeMasters/GetSizeMaster";
 const deleteData=API_URL+"/SizeMasters/DeleteSizeMaster";
  const [totalItems,setTotalItems]=useState([]);
 const [fetchError,setFetchError]=useState(null)
 const [data,setData]=useState([])
 const [isLoading,setIsLoading]=useState(false)
 const [search,setSearch]=useState('');
 const [items,setItems]=useState([])   
 const [active,setActive]=useState(false)    
 const [size_FilterSearch,setSize_FilterSearch]=useState([]);
    const [userRights1, setUserRights1] = useState([]) 
setNewButton(1);

const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setSizeValues(prev => ({
    ...prev,
    [name]:  type === "checkbox"  ? checked : type === "number"  ? Number(value) : value,
  }));
};

  
  


 useEffect(()=>{   
   axios.get(`${userrightsMenuCheck}/${defaultDetails.Compcode}/${defaultDetails.User}/${title}`).then((ress) => {           
                  setUserRights1(ress.data); }).catch((error) => { setFetchError(error) });
  axios.get(`${sizeparam}`)
  .then((res) => {setItems(res.data); setNewButton(1);})
  .catch((error)=>{setFetchError("Service does't running. pls check (Country Master) API in Country Controller")}); 
  },[])

  useEffect(()=>{    
    const filterResult=items.filter((post)=>((post.sizename).includes(search)))
    setSize_FilterSearch(filterResult.reverse());  
  },[items,search]);

  const HeadersColumn=
  [
    { headername: "",field: "visible" },
    {headername:"id",field:"asptblsizmasid"},    
      {headername:"Size",field:"sizename"},
      {headername:"active",field:"active" }   
 ]

 const heights="400px";




  const SizeMaster_Check=(id)=>{   
    try {
      const myitem = items.filter(
        (item) => item.asptblsizmasid === id.asptblsizmasid
      );

      if (myitem.length === 0) {
        throw new Error("No matching size found");
      }

      setSizeValues({
        asptblsizmasid: myitem[0].asptblsizmasid,
        sizename: myitem[0].sizename,
        active: myitem[0].active === "T" ? true : false,
      });   
  
    } catch (err) {
      if (err.response) {
        setFetchError(err.response);
        toast.error("Server error occurred");
      } else {
        toast.error(err.message || "An unexpected error occurred");
      }
    } finally {
      setNewButton(1);
    }
    
  }
  
let validcheck=false;
  const validate = (sizeValues) => {
  const name = sizeValues.sizename?.trim();

  if (!name) {
    alert("Invalid Size Name");
    return false;
  }
  const invalidChars = /[^a-zA-Z0-9\s-]/;
  if (invalidChars.test(name)) {
    toast.error("Special characters are not allowed");
    return false;
  }

  return true;
};

  const SizeMaster_Insert= async ()=>{     

    const validcheck = validate(sizeValues);
  if (!validcheck) return;
    try {
      const CountryData = {
        asptblsizmasid:sizeValues.asptblsizmasid > 0 ? sizeValues.asptblsizmasid : 0,
        sizename: sizeValues.sizename,
        active: sizeValues.active === true ? "T" : "F",
      };   
      var response  = await axios.post(`${insert_update}`, CountryData);
      const data = response .data;
      if (data !== "") {
        try {
          const res = await axios.get(`${sizeparam}`);
          setItems(res.data);
        } catch (error) {
          setFetchError(error);
          toast.error("Error fetching size list");
        }
       
        if (data.asptblsizmasid > 0) { 
          toast.success("Updated Successfully");
        } else {
          toast.success("Record Saved Successfully");
        }
      } else {
        toast.error("Error: Empty response from server");
      }
    } catch (err) {
      setFetchError(err);
      toast.error(`Error: ${err.message || err}`);
    } finally {
      SizeMasterNew();
    }

}



const SizeMaster_Save = ()=>
{   

  try
  {
    SizeMaster_Insert();
    
  }
  catch(err){alert(err);}
  finally{  SizeMasterNew(1); 
  }
}

const SizeMaster_Delete= async()=>{    
  try{
    if(sizeValues.sizename === ''){alert(`Empty Not Allowed`);return;}
    if(sizeValues.asptblsizmasid>=1){
    const asptblsizmasid=sizeValues.asptblsizmasid;
    await axios.delete(`${deleteData}/${asptblsizmasid}`)
    .then((respose)=>{     
     if(respose.data.asptblsizmasid > 0){
      axios.get(`${sizeparam}`)
      .then((res) => {setItems(res.data); setNewButton(1) ;})
      .catch((error)=>{alert(error);setFetchError(error)});  
             alert("Record Deleted Successfully");
           SizeMasterNew();
        }
       else{
         setFetchError(respose.error)
         alert("Error "+respose.data);
       }
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
 const SizeMasterClear=()=>{ setSizeValues({asptblsizmasid:"", sizename:"",active:active}) }
  const SizeMasterNew=()=>{   setNewButton(1);      SizeMasterClear(); setActive(false)   }





const commentsData=useMemo(()=>{
  let computedComments=items;
  if(search)
  {
    computedComments=computedComments.filter((item)=>((item.sizename).includes(search))   )  
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
 
<div onSubmit={handleSubmit}  >
 {userRights1.length >= 1 &&
 <div className='container-fluid animate-zoom ' >
             
  {!fetchError ? (
    <>
       <div className='row' style={{ display: `${userRights1[0].readonlys === "T" ? "block" : "none"}` }}>
 <ul className='boxShadow d-flex justify-content-end'>
                                <li> <button type='submit' className={newButton === 1  ? "tabs active-tabs" : "tabs" } style={{display:`${userRights1[0].news}`==='T' ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => SizeMasterNew()}    >News</button></li>
                                <li> <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].saves}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => SizeMaster_Save()}    >Save</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].deletes}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => SizeMaster_Delete(sizeValues.asptblsizmasid)}  >Delete</button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].searche}` === "T" ? "block" : "none",ackgroundColor:`${colorValue}`}}  onClick={() => SizeMasterNew()}  > Search </button></li>
                                <li  > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].prints}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={()=>SizeMasterNew()}  >Prints</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].readonlys}` === "T" ? "none" : "none",backgroundColor:`${colorValue}`}} onClick={() => SizeMasterNew()} >Readonlys</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].treebutton}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => SizeMasterNew()} >TreeButton</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].globalsearch}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => SizeMasterNew()} > Globalsearch </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].login}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => SizeMasterNew()} >Login</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].changepassword}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => SizeMasterNew()} >Changepassword</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].changeskin}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => SizeMasterNew()} >Changeskin</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].contact}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}} onClick={() => SizeMasterNew()} > Contact </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].pdf}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={(e) => SizeMasterNew()} >Pdf</button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].imports}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => SizeMasterNew()} > Import </button></li>
                                <li > <button type='submit' className={newButton === 1 ? "tabs active-tabs" : "tabs"} style={{display:`${userRights1[0].download}` === "T" ? "block" : "none",backgroundColor:`${colorValue}`}}  onClick={() => SizeMasterNew()} > Download </button></li>
                            </ul>

 
 </div>
  <div className='row'>
 <div className='col-md-6'>
             <ul className='bloc-tabs'>
                               <li> <button className={newButton === 1 ? "tabs active-tabs btn" : "tabs btn"}  style={{ backgroundColor:`${colorValue}`, width:'100%',padding:'1%',fontWeight:'bold',color:'white'}}>{title}  </button></li>

            </ul>

<div className='row' >
  
     

       <div className='row py-1'>         
         <label className='col-md-2'  style={{display:"none"}} > ID </label>
         <input className='col-md-1'  style={{display:"none"}} type='text' name="asptblsizmasid" value={sizeValues.asptblsizmasid} readOnly  /> 
       </div> 
       <div className='row' >      
         <label className='col-md-2' > sizename </label>
    
         <input  className='col-md-3' name="sizename" pattern="([A-Z])[\W\S.]{1,}" type='text'  value={sizeValues.sizename} onChange={handleChange}   />   
       </div>    
       <div className='row py-1'>   
       <label className='col-md-2' > active </label>  
       <label className='checkbox' style={{ padding:"0px",width:"60px"}}>
        <input type="checkbox"  name="active" checked={sizeValues.active}  onChange={handleChange} />
        <span></span>
        <i className='indicator'></i>
        </label>
       </div>   
      

      
  
   </div>
   </div>
   <div className='col-md-6'>
         <ul className='bloc-tabs'>
                               <li> <button className={newButton === 1 ? "tabs active-tabs btn" : "tabs btn"}  style={{ backgroundColor:`${colorValue}`, width:'100%',padding:'1%',fontWeight:'bold',color:'white'}}>{subTitle}  </button></li>

            </ul>

   <div className={newButton ===1 ? "content active-content" : "content"} >
    <DataTable heights={heights} colorValue={colorValue}  headers={HeadersColumn}
          comments={items} setComments={setItems} foreValue={foreValue}
          searches={search} setSearches={setSearch}
          totalItems={totalItems}setTotalItems={setTotalItems}
          currentPage={currentPage} setCurrentPage={setCurrentPage}
          sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
          EditData={SizeMaster_Check}
          commentsData={commentsData}
          />

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

export default SizeMaster
