import React, {useContext, useEffect, useState } from 'react'
import { FaDragon, FaEdit, FaTrash } from 'react-icons/fa';
import DataContext from '../context/CreateTreeViewContext';


const YarnMaster = () => {
    const {
     API_URL,      
    } = useContext(DataContext)
   





  let [item,setItem]=useState([
    {id:1, label:"javascript", checked:true},
    {id:2, label:"c#", checked:true},
    {id:3, label:"asp.net", checked:false},
  ]);

  let [newItem,setNewItem]=useState("");
  let [currentEleID,setCurrentEleID]=useState(null);
  let [isEditing,setisEditing]=useState(false);
  let handleChecked=(id)=>{
    let newListItem=item.map((items)=>{
      return  items.id===id ? {...items, checked: !items.checked} : items
    });
    setItem(newListItem);
    setisEditing(false)
  }

  let handleDeleted=(id)=>{
    let newListItem=item.filter((items)=>{return items.id !==id});
    setItem(newListItem);
   
  }

  let handleUpdate=(id)=>{   
    let listitem=item.find(items=>items.id===id);
    setNewItem(listitem.label);
    setisEditing(true);setCurrentEleID(id);   
  }

  let handleSave=()=>{    
    if(isEditing){   
      let newlistitem=item.map((items)=>{
        return items.id === currentEleID ? { ...items, label : newItem ,checked:items.checked} : items
      })   
     
       setItem(newlistitem);
      setNewItem("");setisEditing(false);setCurrentEleID(null);   
  }
    else{
      if(newItem !== ""){   
      setItem([...item,{id:item.length+1,label:newItem,checked:false}]);
      setNewItem("")
      setisEditing(false);setCurrentEleID(null);
      }
    }
   
  }

  return (
    <>

   
      <input type='text' value={newItem} onChange={(e)=>setNewItem(e.target.value)}  ></input>
      <button type='submit' className='btn' onClick={handleSave} >Search</button>

             <ul>
              {item.map((items)=>{
                return(
                  <li key={items.id} style={{width:"100%",margin:"0.5%"}}>
                    <input type='checkbox' checked={items.checked} onChange={()=>handleChecked(items.id)}></input>
                   <label>{items.label}</label>
                   <FaEdit role='button' tabIndex={1} onClick={()=>handleUpdate(items.id)}/>
                   <FaTrash role='button' tabIndex={1} onClick={()=>handleDeleted(items.id)}/>
                  </li>
                )
               })}
             
             </ul>
  </>
  )
}

export default YarnMaster
