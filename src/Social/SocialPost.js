import React from 'react'
import { Link } from 'react-router-dom'

const SocialPost = ({post,colorValue}) => {
   
  return (
    <>  

     <article className='container-fluid' style={{fontSize:"var(--bs-font-sm)"}}>
      <Link to={`SocialPostPage/${post.id}`}>
      <h4 style={{color:`${colorValue}`}} >{post.title} {post.datetime}</h4>
      </Link>
      <p style={{borderBottom:"1px solid var(--bs-mouseover)",padding:"0.5rem"}}>{(post.body).length <=25 ? post.body : `${(post.body).slice(0,25)}...`}</p>     
     </article>
     
    </>
  )
}

export default SocialPost
