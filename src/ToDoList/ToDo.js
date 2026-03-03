import React,{useEffect, useState} from 'react'
  import ToDoList from '../ToDoList/ToDoList';
 import AddItems from '../ToDoList/AddItems';
 import SearchItem from '../ToDoList/SearchItem';
import apiRequest from '../apiRequest';
import axios from 'axios';
import { el } from 'date-fns/locale';

const ToDo = () => {
    const API_URL='http://localhost:3002/Items';
     const[items,setItems ]=useState([]);
     const[newItem,setNewItem]=useState('');
     const[search,setSearch]=useState('');  
     const[fetchError,setFetchError]=useState('') 
     const[isLoading,setIsLoading]=useState(true) 
    useEffect(()=>{
      const  fetchItems= async()=>{      
        try{
          const response= await fetch(API_URL);    
          if(!response.ok) throw Error("Data Not Received")  ;
          const listItems= await response.json();         
          setItems(listItems);
          setFetchError(null)
        }
        catch(err){
          setFetchError(err.message);
        }finally{
          setIsLoading(false);
        }
      }

      setTimeout(() => {
        (async () => await fetchItems())()     
      }, []);
       
    },[])

    const addItem= async (item)=>{
     try {
      
     
      const id=items.length ? items[items.length-1].id+1 : 1;
      const addNewItem={id,checked:false,item};
      const listItems=[...items,addNewItem];
      setItems(listItems);
      //  const postOptions={
      //    method:"POST",
      //    headers:{'Content-Type':'application/json'},
      //    body:JSON.stringify(addNewItem)
      //  }
      const result=await axios.post(API_URL,addNewItem);
      if(result) setFetchError(result);
  
   } catch (ex) {
      alert(ex.toString())
     }
    }
  
    const  handleCheck= async(id)=>{
      const myitem=items.filter(item=>item.id===id);    
       if(myitem[0].id===id){
      setNewItem(myitem[0].item)     
                let updateOptions={
                  checked:myitem[0].checked===true ? false : true,
                    item:newItem
              }

    const result=await axios.patch(`${API_URL}/${id}`,updateOptions);
          if(result.statusText==="OK"){
                const response= await axios.get(API_URL);         
                setItems(response.data);
                setFetchError(null);
          }
      }else{
        alert("Invaid Data")
      }
    }
    const handleDelete=async(id)=>{
      const listremove=items.filter((item)=>item.id !==id)
      setItems(listremove)
      const deleteOptions={
        method:"DELETE",       
      }
      const requrl=`${API_URL}/${id}`
     const result=await apiRequest(requrl,deleteOptions);
     if(result) setFetchError(result);
    }
  
  
  
    const handleSubmit=(e)=>{   
      try{
        e.preventDefault()
        if(!newItem){return;}else{        
        addItem(newItem);
        setNewItem('')
      }
    }
    catch(ex){
      alert(ex.toString())
    }
    }

  return (
    <>
       <AddItems newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
       <SearchItem search={search} setSearch={setSearch} />
        <div>
        {isLoading && <p> Items Loading ... </p>}
        {fetchError && <p>{`${fetchError}`}</p>}
        {!isLoading && !fetchError &&
         <ToDoList  items={items.filter(item=>(item.item).includes(search.toLowerCase()))} handleCheck={handleCheck} handleDelete={handleDelete}  /> 
        }
       </div> 

    </>
  )
}

export default ToDo
