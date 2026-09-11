import React, { useEffect, useState } from 'react'
import DataContext from '../context/CreateUserContext';
import { useContext } from 'react';
import axios from 'axios';
import ReadOnlyRows from './ReadOnlyRows';
import EditableRows from './EditableRows';
const PartyMaster = ({title,subTitle,colorValue}) => {
  const {
    newButton,setNewButton, inputref,handleSubmit,cityValues,setCityValues,
    cityStateData,setCityStateData,cityCountryData,setCityCountryData,selectedTitle,
 API_URL, totalItems,setTotalItems,currentPage,setCurrentPage,sorting,setSorting,ITEM_PER_PAGE
  } = useContext(DataContext)

  const [cityItems,setCityItems]=useState([])   
  const [city_active,setCityActive]=useState(false)   
  const [editcitymasid,setEditcitymasid]=useState(null)
  const [fetchError,setFetchError]=useState(null)
  const [checkall,setCheckAll]=useState(false)   
  const [checkchild,setCheckchild]=useState(false)  
  const [editContactId,setEditContactId]=useState(null);
const CityParam="/CityMaster/CityMaster";
const StateParam="/StateMaster/StateMaster_Data";
const CountryParam="/StateMaster/StateMaster_Find_Country";
const insert_update=API_URL+"/CityMaster/CityMaster_Insert_Update";
const deleteData="/CityMaster/CityMaster_Delete";

  const naviparam = API_URL + "/CityMaster/CityMaster";

  useEffect(() => {   
      axios.get(`${naviparam}`).then((res) => {
        setCityItems(res.data.reverse());
        axios.get(`${API_URL}${StateParam}`).then((res) => {setCityStateData(res.data);    setNewButton(1);    
        }).catch((error)=>{setFetchError("Service does't running. pls check (State Master) API in Country Controller ")});      
 
      }).catch((error) => { alert(error) });   

  }, [])

  const handleChange=(e)=>{
    const {name,value}=e.target;    
    setCityValues((previousValue)=>{
        return{
            ...previousValue,[name]:value,
        }
    })
    if(name==="statename"){
    handleStateChange(e.target.value);
    }
  };

  const handleStateChange=(id)=>{   
    try{
      axios.get(`${API_URL}${CountryParam}/${id}`).then((res) => {setCityCountryData(res.data.reverse());  
      })
      .catch((error)=>{setFetchError("Service does't running. pls check (City Master) ");});    
        }
        catch(e){    
        }
        finally{
        }
       
  }

  const CityMasterCheck=(e,id)=>{   
    setEditContactId(id.gtcitymastid)
    
    try{     
       axios.get(`${API_URL}${CityParam}/${id.gtcitymastid}`)
      .then((res) => {     
       if(res.data.length===0){alert("Invalid Data")}else{   
       const updatepost={active:res.data[0].active==="T" ? true : false}; 
       setCityValues({gtcitymastid:res.data[0].gtcitymastid,cityname:res.data[0].cityname,
         statename:res.data[0].gtstatemastid,countryname:res.data[0].gtcountrymastid,
         active:res.data[0].active==="T" ? true : false}); 
         setCityActive(updatepost.active);      
         handleStateChange(res.data[0].gtstatemastid);
       }
     })
     .catch((error)=>{setFetchError(error)}); 
   }
   catch(err){ 
     if(err.response){
       console.log(`Error ${err.message}`);
     }
   }
   finally{    } 
 } 


 let validcheck=true;
const validate=(cityValues)=>{    

  if(!cityValues.cityname){
    alert("Invalid cityname");
    validcheck=false;
    return;
}

if(/^[a-zA-Z]$/.test(cityValues.cityname)){
    alert("Special Charector not allowed");
    validcheck=false;
    return;
}  
return validcheck;
}

  
const CityMaster_Delete=async(id)=>
  {    
    cityValues.gtcitymastid=id;
    try{
      if(cityValues.gtcitymastid == ''){alert(`Empty Not Allowed`);return;}    

      await axios.delete(`${API_URL}${deleteData}/${id}`)
      .then((respose)=>{
        if(respose.data==='true'){
          axios.get(`${API_URL}${CityParam}`)
          .then((res) => {setCityItems(res.data.reverse()); })
          .catch((error)=>{alert(error);setFetchError(error)});  
                alert("Record Deleted Successfully");
              
           }
          else{
            setFetchError(respose.error)
            alert(respose.error);
          }
       }).catch((error)=>{
        alert(error);
        setFetchError(error)
       });
    }
    catch(err)
    {
      if(err.response){
        console.log(`Error ${err.message}`);
        alert(err.error);
      }
    }
  }


const CityMasterGrid=async()=>{       
  try{  
await axios.get(`${API_URL}${CityParam}`).then((res) => {setCityItems(res.data.reverse()); })
.catch((error)=>{setFetchError("Service does't running. pls check (City Master) ");});    
  }
  catch(e){
  }finally{
    setNewButton(2); 
  }
}
const CityMaster_Save = ()=>
  {    
          CityMaster_Insert();
   
  }

 const  CityMaster_Insert= ()=>{  
   
  validate(cityValues);
  if(validcheck==true){    
    try
    {        
      cityValues.gtcountrymastid=cityCountryData[0].gtcountrymastid;   
   const CountryData={gtcitymastid:cityValues.gtcitymastid> 0 ? cityValues.gtcitymastid : 0 ,cityname:cityValues.cityname,
     state:cityValues.statename,
     country:cityValues.gtcountrymastid,active:city_active===true ? "T" : "F"};           
 
    axios.post(`${insert_update}`,CountryData)
   .then((respose)=>{
    if(respose.data !== ""){
      axios.get(`${API_URL}${CityParam}`)
      .then((res) => {setCityItems(res.data.reverse()); })
      .catch((error)=>{setFetchError(error)});       
     alert(respose.data); 
     
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
    console.log(`Error . ${err}`);
  }
  finally{
    
  }
}
}


const CityMaster_New=()=>{ 
  setNewButton(1); 
  setCityValues({}); setCityActive(false);
   setCityCountryData([]);
 }

 const CityMaster_Search=()=>{ 
  setNewButton(2);

 }

//  const [contacts,setContacts]=useState([]); 

//  const [addFormData,setAddFormData]=useState({
//   gtcitymastid:"",
//   cityname:"",
//   statename:"",
//   countryname:"",
//   active:""
//  });

//  const [cityValues,setCityValues]=useState({
//   gtcitymastid:"",
//   cityname:"",
//   statename:"",
//   countryname:"",
//   active:""
//  });


//  const handleAddFormChange=(eve)=>{
//   eve.preventDefault();

//   const {name,value}=eve.target;    
//   setAddFormData((previousValue)=>{
//     return{
//         ...previousValue,[name]:value,
//     }
// })
//  }

//  const handleEditFormChange=(eve)=>{


//   const fieldName=eve.target.getAttribute("name");

//   const fieldValue=eve.target.value;
//   const newFormData=[...editFormData];
//   newFormData[fieldName]=fieldValue;
//   alert("handleEditFormChange"+JSON.stringify(editFormData))
//   setEditFormData(newFormData); 
//  }

  // const handleAddFormSubmit=(eve)=>{
  //   eve.preventDefault();
  //   const newcontact={
  //     gtcitymastid:addFormData.gtcitymastid,
  //     cityname:addFormData.cityname,
  //     statename:addFormData.statename,
  //     countryname:addFormData.countryname,
  //     active:addFormData.active
  //   }  
  //   const newContacts=[...contacts,newcontact];
  //   setContacts(newContacts);
  //  }



  //  const handleEditFormSubmit=(eve)=>{
  //   eve.preventDefault();
  //   const editedcontact={
  //     gtcitymastid:editContactId,
  //     cityname:cityValues.cityname,
  //     statename:cityValues.statename,
  //     countryname:cityValues.countryname,
  //     active:cityValues.active
  //   }  
  //   const newContacts=[...contacts];
  //     const index=contacts.findIndex((contact)=>contact.gtcitymastid===editContactId);
  //     newContacts[index]=editedcontact;
  //     setContacts(newContacts);
  //     setEditContactId(null);
  // }

//    const handleEditClick=(eve,contact)=>{
//      eve.preventDefault();
     
//      setEditContactId(contact.gtcitymastid);
//      try{     
//       axios.get(`${API_URL}${CityParam}/${contact.gtcitymastid}`)
//      .then((res) => {     
//       if(res.data.length===0){alert("Invalid Data")}else{   
//       const updatepost={active:res.data[0].active==="T" ? true : false}; 
//       setCityValues({gtcitymastid:res.data[0].gtcitymastid,cityname:res.data[0].cityname,
//         statename:res.data[0].gtstatemastid,countryname:res.data[0].gtcountrymastid,
//         active:res.data[0].active==="T" ? true : false}); 
//         setCityActive(updatepost.active);      
//         handleStateChange(res.data[0].gtstatemastid);
//       }
//     })
//     .catch((error)=>{setFetchError("Service does't running. pls check City Master) API in Country Controller")}); 
//   }
//   catch(err){ 
//     if(err.response){
//       console.log(`Error ${err.message}`);
//     }
//   }
// }
  
  // const handleCancelClick=()=>{
  //   setEditContactId(null)
  // }

  // const handleDeleteClick=(deleteid)=>{
  //   const newcontacts=[...contacts];
  //   const index=contacts.findIndex((contact)=>contact.gtcitymastid===deleteid);
  //   newcontacts.splice(index,1);
  //   setContacts(newcontacts)        
  // } 


  return (
    <form onSubmit={handleSubmit}>
    <div className='container-fluid'>
      <div className='col-md-12' style={{textAlign:"right"}}>
      <ul >    
          <li> <button type='submit'  onClick={()=>CityMaster_New(1)}  style={{color:`${colorValue}`}}>News</button></li>
          <li> <button type='submit'  onClick={()=>CityMaster_Save()} style={{color:`${colorValue}`}}>Save</button></li>          
          <li> <button type='submit'  onClick={()=>CityMaster_Delete(cityValues.gtcitymastid)} style={{color:`${colorValue}`}}>Delete</button></li>
          <li> <button type='submit'  onClick={()=>CityMaster_Search()}  style={{color:`${colorValue}`}}> Search </button></li>
      </ul>
   </div>  
      <table  className='table table-responsive table-striped' >
        <thead>
          <tr>
          <th> ID </th>
            <th> cityname </th>
            <th> statename </th>
            <th> countryname </th>
            <th> active </th>

          </tr>
        </thead>
        <tbody>
          {
        cityItems.map((contact,index)=>(    
          <>     
          {
           editContactId===contact.gtcitymastid ?  
           (<EditableRows handleChange={handleChange}  cityValues={cityValues} 
            cityStateData={cityStateData} cityCountryData={cityCountryData}  city_active={city_active}
             setCityActive={setCityActive}  />  ):        
           (<ReadOnlyRows contact={contact} CityMasterCheck={CityMasterCheck} />)
          }
         </>     
        ))
          }
        </tbody>
      </table>
    
    </div>
    </form>
  )
}

export default PartyMaster
//https://www.google.com/search?sca_esv=7a2c727ac526d59d&sca_upv=1&sxsrf=ADLYWIJWKXyYFJnD4rQqelbHHVBFZOKr9Q:1718272288669&q=table+rows+edit+in+react+js&tbm=vid&source=lnms&fbs=AEQNm0Bqzy2A7JdsZg3J6bXbexmPsgjtQvlWZL7ndTLwEpr_IW9DW0gpDTlsyp82QhSGZwv6rZNsjeNjGHrryK8Xeol_KXyoH3Dsd3VPOuMtP9w8HA93nE-31o6VmlSmIKPVEokfM7vtb4pyukiQDt6Cp_mEAAMCBM46do1OVZ2RxweoyvYt4Y97Plghy6kHrjBH08sp16QI&sa=X&ved=2ahUKEwj7yJKLp9iGAxUf1zgGHfv7Cc0Q0pQJegQIDhAB&biw=1360&bih=641&dpr=1#fpstate=ive&vld=cid:74bfa743,vid:dYjdzpZv5yc,st:0