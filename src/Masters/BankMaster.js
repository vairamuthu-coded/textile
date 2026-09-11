import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import useAxiosFetch from '../hooks/useFetch';
import Table from '../Custom/Table';
import Search from '../Custom/Search';
import DataTable from '../Custom/DataTable';
import axios from 'axios';
import SocialMissing from '../Social/SocialMissing';
import { Alert } from 'react-bootstrap';
import { json } from 'react-router-dom';

const BankMaster = ({title,subTitle,colorValue}) => {   
  const {handleSubmit,API_URL,newButton,tabindex,totalItems,setTotalItems,currentPage,setCurrentPage,
sorting,setSorting, setNewButton}=useContext(DataContext)
let ITEM_PER_PAGE=15;
const insert_update="/BankMaster_Insert_Update";
const deleteData="/BankMaster_Delete";
const BankParam="/BankMaster";
const [fetchError,setFetchError]=useState(null)
 const [data,setData]=useState([])
 const [isLoading,setIsLoading]=useState(false)
 const [search,setSearch]=useState('');
 const [items,setItems]=useState([])   
 const [valueID,setValueID]=useState('')
 const [bankname,setBankName]=useState('')
 const [active,setActive]=useState(false)    
  const [bank_FilterSearch,setBank_FilterSearch]=useState([]);
 useEffect(()=>{   
  axios.get(`${API_URL}${BankParam}`)
  .then((res) => {
    setItems(res.data.reverse()); setNewButton(1);   
  })
  .catch((error)=>{setFetchError("Service does't running. pls check (Bank Master) API in Bank Controller")}); 
  },[])

  useEffect(()=>{    
    const filterResult=items.filter((post)=>((post.bankname).includes(search)))
    setBank_FilterSearch(filterResult.reverse());  
  },[items,search]);

  const HeadersColumn=
  [
    {name:"id",field:"id"},    
      {name:"bankname",field:"bankname"},
      {name:"Active",field:"Active" }   
 ]

 const heights="420px";




  const BankMaster_Check=(id)=>{   
    try{      
      const myitem=items.filter(item=>item.id===id);
      const updatepost={id:myitem[0].id,BankName:myitem[0].bankname,Active:myitem[0].Active==="T" ? true : false};
      setValueID(updatepost.id);setBankName(updatepost.BankName);   setActive(updatepost.Active);
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
  

  const BankMaster_Insert= async ()=>{      

    try
    {    
      
      const  BankData={id:valueID> 0  ? valueID : 0,bankname:bankname,Active:active===true ? "T" : "F"}; 

alert(bankname,active);
alert(JSON.stringify(BankData));
      await axios.post(`${API_URL}${insert_update}`,BankData)
       .then((respose)=>{
        if(respose.data===true){
          axios.get(`${API_URL}${BankParam}`)
          .then((res) => {setItems(res.data.reverse()); setNewButton(1) ;})
          .catch((error)=>{alert(error);setFetchError(error)});  
          if(valueID !== ''){
                alert("Updated Successfully");
                setValueID('');
             } 
         if(valueID === ""){
              alert("Record Saved Successfully");
              setValueID('')
              }
           }
          else{
            setFetchError(respose.error)
            alert("Error "+respose.data);
          }
       }).catch((error)=>{
        alert(error);
        setFetchError(error)
       }); 


    }
    catch(err){
      setFetchError(`Error . ${err}`);
    }
  }



const BankMaster_Save = ()=>
{    
  try
  {
     if(bankname == ""){ alert(`Empty Not Allowed`); return;}
     if(bankname !== ""){BankMaster_Insert()}    
  }
  catch(err){alert(err);}
  finally{  BankMasterNew(tabindex); 
  }
}

const BankMaster_Delete= async(id)=>{    
  try{
    if(bankname === ''){alert(`Empty Not Allowed`);return;}
    if(valueID>=1){
    const id=valueID;
    await axios.delete(`${API_URL}${deleteData}/${id}`)
    .then((respose)=>{
     if(respose.data==='delete'){
      axios.get(`${API_URL}${BankParam}`)
      .then((res) => {setItems(res.data.reverse()); setNewButton(1) ;})
      .catch((error)=>{alert(error);setFetchError(error)});  
             alert("Record Deleted Successfully");
           BankMasterNew();
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
const BankMasterClear=()=>{setValueID('');    setBankName('');    }   
const BankMasterNew=(tabindex)=>{   setNewButton(tabindex);      BankMasterClear();setActive(false);    }





const commentsData=useMemo(()=>{
  let computedComments=items;
  if(search)
  {
    computedComments=computedComments.filter((item)=>((item.bankname).includes(search))   )  
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

  <div className='container-fluid' >

  <div className='row' style={{backgroundColor:"white"}}>
  {!fetchError && items.length ? (
    <>
  {/* <div className='col-md-4'>
<div className='heading blink'  >{title.length > 0 ? title : ""} </div> 
  </div> */}
<div className='col-md-12' style={{textAlign:"right"}}>
 <div style={{background :"var(--bs-header"}}>
   <ul >    
       <li> <button type='submit' onClick={()=>BankMasterNew(1)}  style={{backgroundColor:`${colorValue}`}}>News</button></li>
       <li> <button type='submit' onClick={()=>BankMaster_Save()} style={{backgroundColor:`${colorValue}`}}>Save</button></li>          
       <li> <button type='submit' onClick={(e)=>BankMaster_Delete(valueID)} style={{backgroundColor:`${colorValue}`}}>Delete</button></li>
       <li> <button type='submit' onClick={()=>BankMasterNew(2)}  style={{backgroundColor:`${colorValue}`}}> Search </button></li>
    </ul>
 </div>
 </div>
 <div className='bloc-tabs'>

 <div className={newButton ===1 ? "tabs active-tabs" : "tabs"} onClick={()=>setNewButton(1)} style={{color:`${colorValue}`}}> {title} </div>
<div className={newButton ===2 ? "tabs active-tabs" : "tabs"}  onClick={()=>setNewButton(2)} style={{color:`${colorValue}`}} > {subTitle} </div>
</div>

<div className='content-tabs' >
   <div className={newButton ===1 ? "content active-content" : "content"}>
       <form onSubmit={handleSubmit}>    
    
        

    
       <div className='content active-content' > 
 
       <div className='row py-1'>   
      
         <label className='col-md-2' > BankID </label>
         <input className='col-md-1'  type='text' id="BankID" value={valueID}   />  
      
       </div> 
       <div className='row' >      
         <label className='col-md-2' > BankName </label>
         <input  className='col-md-3'   type='text' id="bankname"  ref={inputref}  
           value={bankname} onChange={(e)=>setBankName(e.target.value.toUpperCase())} 
            required   />             
        
       </div>
       <div className='row py-1'>   
       <label className='col-md-2' > Active </label>  
       <label className='col-md-1 checkbox'>
        <input type="checkbox" id="BankActive" checked={active}  onChange={(e)=>setActive(e.target.checked)        } />
        <span></span>
        <i className='indicator'></i>
        </label>
       </div>
   
       </div>
    
       </form> 
   </div>
   <div className={newButton ===2 ? "content active-content" : "content"} >
    <DataTable heights={heights} colorValue={colorValue}  headers={HeadersColumn}
          comments={items} setComments={setItems}
          searches={search} setSearches={setSearch}
          totalItems={totalItems}setTotalItems={setTotalItems}
          currentPage={currentPage} setCurrentPage={setCurrentPage}
          sorting={sorting} setSorting={setSorting} ITEM_PER_PAGE={ITEM_PER_PAGE}
          EditData={BankMaster_Check}
          commentsData={commentsData}
          />

   </div>
</div>
</>
) : <SocialMissing colorValue={colorValue} fetchError={fetchError} ></SocialMissing> }

</div>
</div>

)

  
}

export default BankMaster
