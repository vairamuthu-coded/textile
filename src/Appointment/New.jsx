import React, { useState } from 'react'
import {closeModal, entry, getDefaultUrl, postappointment} from './Lib'
import axios from 'axios'
const New = (props) => {
  let [title_length,setTitleLength]=useState(0)
    let [des_length,setdesLength]=useState(0)
  let [add_length,setaddLength]=useState(0)
const url=props.url;

  const newApp=(e)=>{
    let {name,value,type,checked}=e.target;
    if(type==="checkbox"){
     entry[name]=checked; 
    }
    else{
    entry[name]=value.toUpperCase();  
  }
    if(name==="title"){
      setTitleLength(value.length)
    }
    if(name==="description"){
      setdesLength(value.length)
    }
    if(name==="address"){
      setaddLength(value.length)
    }
  }

  const postApp=()=>{ 
      axios.post(`${url}`,entry).then((r)=>{          
      if(r.data.asptblAppointmentmasid>0){
         getDefaultUrl(`${url}`).then(data=>{props.setDataList(data)})
          closeModal("new_modal");         
      alert("Record Saved Successfully")}}).catch(e=>alert(e))   
  }

  return (
 
    <div className='modal-container'>  <p className='right ' onClick={()=>closeModal("new_modal")}  ><i className='fa fa-times'></i></p>
          <h3 className='modal-title'>New Appointment </h3>
        
           <div className='row'>
             <div className='col-md-12'>            
           <div className='col-md-12 mt-1'>
                <label className='col-md-2'>Title</label>
                <input type='text' className='col-md-7'  name="title" maxLength={50} onChange={newApp}></input>
                <span className='col-md-1 right'>{title_length}/50</span>
             </div>
                 <div className='col-md-12 mt-1'>
                  <label className='col-md-2'>Desc</label>
                  <textarea  className='col-md-7' name="description" maxLength={100} cols={3} rows={6} onChange={newApp}></textarea>
                  <span className='col-md-1 right'>{des_length}/100</span>
             </div>
              <div className='col-md-12 mt-1'>
                  <label className='col-md-2'>Address</label>
                  <input type='text' className='col-md-7' name="address" maxLength={50} onChange={newApp}></input>
                 <span className='col-md-1 right' >{add_length}/50</span>
             </div>
             <div className='col-md-12 mt-1'>
                       <label className='col-md-2' >Level-Of-Im</label>
        <select className='col-md-7' name='levelOfImportance' id='levelOfImportance'  defaultValue={4} onChange={newApp} >
             <option value={0} disabled>level of importance </option>
            <option  value={1}>Very-Low </option>
            <option  value={2}>Low </option>
            <option  value={3}>Normal </option>
            <option  value={4}>Medium </option>
            <option  value={5}>High </option>
            <option  value={6}>Very-Hight </option>         
        </select>     
             </div>
                    <div className='col-md-12 mt-1'>
                  <label className='col-md-2'>Date</label>
                  <input type='date' className='col-md-2 me-2' name="date"   onChange={newApp}></input>
                 
                  <label className='me-2'>Time</label>
                  <input type='time' className='col-md-2 me-2' name="time" onChange={newApp}></input>
                 
          

                  <label className='me-2'>Deleted</label>
                  <input type='checkbox' className='col-md-1 me-2' name="deleted" onChange={newApp}></input>
                 
           
                   <label className='me-2'>Done</label>
                  <input type='checkbox' className='col-md-1' name="done" onChange={newApp}></input>
                  
             </div>
              <div className='col-md-12 mt-1 center'>
                 <label className='col-md-3'></label>
                  
                  <button type='button' className='col-md-3'  name="add_n" onClick={()=>postApp()}>Add</button>
                 <button type='button' className='col-md-3' onClick={()=>closeModal("new_modal")}   name="Add_n">Cancel</button>
             </div>
              </div>
           </div>

    </div>
  )
}

export default New