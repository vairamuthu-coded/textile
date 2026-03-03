import React from 'react'
import Post from './Post'
import { NavItem } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Posts =() => {
    const {posts}= useSelector(store=>store.post)  

  return (
   <>
      {posts.length>=1?  
      <div  className='d-flex flex-column' >
           { posts.map((post)=> <Post post={post} />)}
    </div>
   : ''}
   </>
  )
}

export default Posts