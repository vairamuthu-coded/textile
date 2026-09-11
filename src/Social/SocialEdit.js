import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SocialMissing from './SocialMissing';
import DataContext from '../context/CreateContext';

const SocialEdit = () => {
    const {posts,editTitle,setEditTitle,editBody,setEditBody,handleEdit}=useContext(DataContext)
    
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id)   
    useEffect(() => {
        if(post){
            setEditTitle(post.title);
             setEditBody(post.body);
            }       
    },[post,setEditTitle, setEditBody])


  return (   
    <>
    {editTitle &&
   
        <div style={{backgroundColor:"var(--bs-light)"}}>
            <form onSubmit={(e)=>e.preventDefault()} >
                <div className='container-fluid' style={{margin:"5px"}}> 
                    <div className='row' style={{margin:"1rem"}}>
                        <label className='col-md-1' style={{padding:"5px",fontSize:"var(--bs-font)"}}> Title </label>
                        <input className='col-md-11' type='text' id="postTitle"  style={{padding:"5px",fontSize:"var(--bs-font)"}}  required  placeholder='Posts'   
                        value={editTitle} onChange={(e)=>setEditTitle(e.target.value)}  aria-label='postTitle'>
                            </input> 
                    </div>
                    <div className='row' style={{margin:"1rem"}}>
                        <label className='col-md-1' style={{padding:"5px",fontSize:"var(--bs-font)"}}> Post </label>
                        <textarea className='col-md-11' rows="5" style={{padding:"5px",fontSize:"var(--bs-font)"}}  
                            type='text' id="postBody" placeholder='postBody' aria-label='postBody'
                            value={editBody} onChange={(e)=>setEditBody(e.target.value)}>  
                            {setEditBody}           
                        </textarea> 
                    </div>
                    <div className='row' style={{margin:"1rem"}}>
                        <button type='submit' onClick={()=>handleEdit(post.id)} className='col-md-12 btn'>submit</button>
                    </div>
                </div>
            </form> 
        </div>
   
    }
     {!editTitle 
        && <SocialMissing/>
       
     }
        </>
  )
}

export default SocialEdit