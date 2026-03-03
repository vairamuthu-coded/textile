import React, { useEffect, useState } from 'react'
import {activeId, closeModal, entry, getDefaultUrl, postappointment} from './Lib'
import axios from 'axios'

const Delete = (props) => {

      const url=props.url;
  useEffect(()=>{
  console.log("Delete Component")
  },[props.stateListener])

    const deleteData=async(id)=>{     
     await axios.delete(`${url}/${id}`).then((r)=>{       
      if(r.data !== "") {
          getDefaultUrl(`${url}`).then(data=>{                        
              props.setDataList(data);
            })
            
        alert("Record Deleted Successfully")
      }
    }).catch(e=>alert("error happened at position of newapp", e))
      closeModal("delete_modal");
  }

  return (
       <div className='modal-container'>
          <h3 className='modal-title'>Delete Appointment </h3>
           <div className='row'>
             <div className='col-md-12'>       
       Are You want to Delete
             
                 <label className='col-md-3'></label>                 
                  <div  className='btn'  name="Add_d" onClick={()=>closeModal("delete_modal")} style={{textAlign:"left"}}>Cancel</div>
                  <div  className='btn'  name="Delete_d" onClick={()=>deleteData(activeId.id)} style={{textAlign:"right"}}>Delete</div>

          
              </div>
           </div>

    </div>
  )
}

export default Delete