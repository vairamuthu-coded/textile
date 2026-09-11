import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import Project1Rows from './Project1Rows';
import Project1Table from './Project1Table';
// import Project1Form from './Project1Form';
// import Project1List from './Project1List';
// import Project1Button from './Project1Button';

const Project1 = ({colorValue}) => {
    const API_POST1='https://jsonplaceholder.typicode.com/';
    const[items,setItems]=useState([]);
    const[reqType,setReqType]=useState('users'); 
    useEffect(()=>{
        const fetchItems= async()=>{
            try{            
                    const response= await fetch(`${API_POST1}/${reqType}`);                
                    const listItems=await response.json();
                    setItems(listItems);
                } 
            catch(err)
            {
                console.log(err);
            }
        }
       (async ()=>await fetchItems())()
    },[reqType])


    const handleSubmit=(e)=>{
        e.preventDefault();
    }
  return (
        <main>           
           {/* <Project1Form  colorValue={colorValue} reqType={reqType} setReqType={setReqType}/> */}
            {/* <Project1List items={items} /> */}
                <form className='container-fluid' onSubmit={(e)=>handleSubmit(e)}>     
                <div className='row' >
                    <div className='col-md-4' style={{border:"1px solid orange"}}>
                            <button  style={{backgroundColor:`${colorValue}`}} className={"users"===reqType ? 'selected': null} type='button'
                                onClick={()=>setReqType("users")} >users </button>
                    </div>
                    <div className='col-md-4' style={{border:"1px solid orange"}}>
                                <button style={{backgroundColor:`${colorValue}`}} className={"posts"===reqType ? 'selected': null} type='button'
                                    onClick={()=>setReqType("posts")} > posts  </button>
                    </div>
                    <div className='col-md-4' style={{border:"1px solid orange"}}>
                        <button  style={{backgroundColor:`${colorValue}`}} className={"comments"===reqType ? 'selected': null} type='button'
                            onClick={()=>setReqType("comments")} > comments  </button>
                    </div>
                </div>   
            </form>
            <ul>
                {items.map(item=>(      
                    <li>{JSON.stringify(item)}</li>
                ))}
            </ul>

                    <Project1Table items={items} />
           
    </main> 
  )
}

export default Project1
