import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import SocialMissing from './SocialMissing';
import DataContext from '../context/CreateContext';
const SocialPostPage = () => {
  const {colorValue,posts,handleDelete}=useContext(DataContext)
  const {id}=useParams(); 
  const post=posts.find(post=>(post.id).toString()===id)
  return (
    <div className='container-fluid' style={{backgroundColor:"var(--bs-light)", overflow:"auto"}} >
      {
       post && 
       <>
        <div className='row' style={{color:`${colorValue}`}} >             
            <input type='text' className='col-md-5' value={post.title}  ></input>
            <input type='text' className='col-md-5' value={post.datetime}  />
        </div>
        <div className='row' style={{margin:"1rem"}}>
        <textarea className='col-md-11' rows="5" style={{padding:"5px",fontSize:"var(--bs-font)"}}  
           type='text' id="postBody"     placeholder='postBody'    aria-label='postBody'             > 
           {post.body}            
        </textarea>
       </div>
        <div className='row' style={{margin:"1rem"}}>
          
          <div className='col-md-6'> 
          <Link to={`/edit/${post.id}`}>  
          <button className='btn' >Update Post</button> 
           </Link>  </div>   
          
        <div className='col-md-6'>      <button className='btn' onClick={(e)=>handleDelete(post.id)}>Delete Post</button>    </div>   
      </div>
        </>
    }
    {!post && <SocialMissing/>}
   </div>
  )
}

export default SocialPostPage