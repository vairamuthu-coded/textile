import { useContext, useReducer, useState } from 'react'
import DataContext from '../context/CreateUserContext'
function reducer(state,action){
   
    switch(action.type){
        case 'ADD_TASK':
          return [...state,{id:state.length+1,name:action.payload}]
         case 'DELETE_TASK':
          return state.filter(item=>item.id !== action.payload) 
           case 'EDIT_TASK':  
          return state.map((item)=>(item.id === action.payload.id ?            
           {...item,name:action.payload.name}  : item))
          
        default:
            return state;
    }
}

const InitialState=[]
function Init(InitialState){
    const data=[...InitialState,{id:1,name:'INDIA'}]
    return data
}

const BinMaster = () => {
    const {colorValue}=useContext(DataContext)
    const [todos,dispatch]=useReducer(reducer,InitialState,Init)
    const [bin,setBin]=useState('')

    const handleChange=(e)=>{       
        if(e.key==="Enter"){
        dispatch({type:"ADD_TASK",payload:e.target.value})
         
        }
    }

     const handleDelete=(id)=>{      
        dispatch({type:"DELETE_TASK",payload:id})        
    }

      const handleEdit=(id,name)=>{    
       dispatch({type:"EDIT_TASK",payload:{id:id,name:name}})
setBin(name)

    }

          const handleUpdate=(id)=>{    
       dispatch({type:"EDIT_TASK",payload:{id:id,name:bin}})
      alert(bin)
    }

  return (
    <>
    <h3 style={{color:`${colorValue}`}}>BinMaster {todos.length}</h3>
    <label>Bin</label>
    <input type='text' id='name' value={bin} onChange={(e)=>setBin(e.target.value)}  onKeyDown={(e)=>handleChange(e)} ></input>
    <ul>
        { 
            todos.map((todo)=>(
                <li key={todo.id} onClick={()=>handleEdit(todo.id,todo.name)}>{todo.id}.{todo.name}
                <button onClick={()=>handleDelete(todo.id)} style={{color:'red'}} >Detete</button>
                <button onClick={()=>handleUpdate(todo.id)} style={{color:'green'}}>Update</button>
                </li>
            ))
        }
    </ul>
    </>
  )
}

export default BinMaster
