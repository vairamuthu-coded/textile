import './ToDoListStyle.css';
import ItemsList from './ItemsList';
import React from 'react';

const ToDoList = ({items,handleCheck,handleDelete}) => { 
  return (

     <div style={{height:"450px", overflow:"auto"}}>    
      {     
         (items.length>0) ? (        
          <ItemsList items={items} handleCheck={handleCheck} handleDelete={handleDelete}/>          
         ):(<p style={{color:'var(--bs-sidebar)'}}>Items is Empty</p>)
       }
     </div>
  )
}

export default ToDoList;
