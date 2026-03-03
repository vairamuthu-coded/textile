import React from 'react'
import { Button } from 'react-bootstrap';
import Delete from './Delete';

import { activeId, entry, openModal } from './Lib';
import dateFormat from 'dateformat';

const Home = (props) => {
  let {asptblAppointmentmasid,title,description,date,time,address,levelOfImportance,deleted,done}=props.item;
  let levelOfImportance1=["Very-Low","Low","Normal","Medium","High","Very-Hight"]

   const defaultDate=typeof(entry.date)==="string" ? entry.date.split("T")[0] : "" ;  

     const handleDelete=(asptblAppointmentmasid)=>{     
     activeId.id=asptblAppointmentmasid;
      props.stateListener(Math.random() * 848 * Math.random());   
      openModal("delete_modal")
 }
 
  const handleEdit=(row)=>{  
    activeId.id=row.asptblAppointmentmasid
      Object.assign(entry,row)    
     props.stateListener(Math.random()* 578 * Math.random());       
      openModal("edit_modal")
     }
     

  return (
    <div classname={`row underline ${deleted ? 'danger' : done ? 'success' : ''}` } key={asptblAppointmentmasid} >
          <div className='col-md-12' style={{fontSize:"16px"}}>      
              <label className='col-md-1'>{asptblAppointmentmasid}</label>
              <label className='col-md-1'>{title.toUpperCase()}</label>
              <label className='col-md-2'>{description.toUpperCase()}</label>
              <label className={`col-md-1 ${levelOfImportance===0 ? 'success' : levelOfImportance===4 ? 'danger' :  levelOfImportance===5  ? 'primary' : ''}`}>{levelOfImportance1[levelOfImportance]}</label>
              <label className='col-md-1'>{dateFormat(date,"dd-mm-yyyy")}</label>           
              <label className='col-md-1'>{time}</label>
              <label className='col-md-3'>{address.toUpperCase()}</label>
              <div  onClick={()=>handleEdit(props.item)} className={`btn fa fa-edit ${deleted} ? 'not-allowed' : ''`} style={{marginRight:"80px"}}  ></div>
              <div onClick={()=>handleDelete(asptblAppointmentmasid)}  className={` btn fa fa-trash  ${deleted ? 'not-allowed' : ''}` } >
                <div   className={` ${deleted ? 'no-event' : ''}` } ></div>
              </div>
        </div>
    </div>
          
  )
}

export default Home