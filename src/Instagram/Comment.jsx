import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Comment = ({comment}) => {
    const {user}=useSelector(store=>store.auth) 
  return (
    <div className='flex-column justify-content-center'>     
        <div className='pt-2 d-flex flex-row'>         
          <Link className='pe-2'> <Avatar src={user.profilePicture} style={{width:"20px", height:"20px"}}></Avatar></Link>
          <Link style={{textDecoration: "none" }} > <span style={{color:"black", fontWeight:"bold"}}>{user.username}</span>   <span className='fw-light ms-2' style={{color:"black", fontWeight:"normal" }}> {comment.comment}</span></Link>
          </div>
    </div>
  )
}

export default Comment