import React, { useContext } from 'react'
import DataContext from '../context/CreateContext'

const SocialNewPost = () => {
  const {handleSubmit, postTitle,setPostTitle,postBody,setPostBody}=useContext(DataContext)
  return (
    <div style={{backgroundColor:"var(--bs-light)"}}>
     <form onSubmit={handleSubmit} >
      <div className='container-fluid' style={{margin:"5px"}}> 
      <div className='row' style={{margin:"1rem"}}>
        <label className='col-md-1' style={{padding:"5px",fontSize:"var(--bs-font)"}}> Title </label>

        <input className='col-md-11' style={{padding:"5px",fontSize:"var(--bs-font)"}}  
        type='text' id="postTitle"  required value={postTitle} onChange={(e)=>setPostTitle(e.target.value)}   placeholder='Posts'    aria-label='postTitle'    />   

      
      </div>
      <div className='row' style={{margin:"1rem"}}>
      <label className='col-md-1' style={{padding:"5px",fontSize:"var(--bs-font)"}}> Post </label>
      <textarea className='col-md-11' rows="5" style={{padding:"5px",fontSize:"var(--bs-font)"}}  
           type='text' id="postBody"     placeholder='postBody'    aria-label='postBody'
           value={postBody} onChange={(e)=>setPostBody(e.target.value)}  >             
        </textarea> 
      </div>
      <div className='row' style={{margin:"1rem"}}>
           <button type='submit' className='col-md-12 btn' >submit</button>
      </div>
      </div>
  </form> 
  </div>
  )
}

export default SocialNewPost
