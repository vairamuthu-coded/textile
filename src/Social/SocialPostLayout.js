import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const SocialPostLayout = ({colorValue}) => {
  return (
    <div style={{backgroundColor:`${colorValue}`,color:"var(--bs-white)"}} >       
    <Link to="/SocialPostPage/1" style={{color:"var(--bs-white)"}}>  Post1 </Link>    
    <Link to="/SocialPostPage/2" style={{color:"var(--bs-white)"}}>  Post2 </Link>
    <Link to="/SocialPostPage/3" style={{color:"var(--bs-white)"}}>  Post3 </Link>   
    <Link to="/SocialPostPage/SocialNewPost" style={{color:"var(--bs-white)"}}>NewPost</Link>
    <Outlet/>
  </div>
  )
}

export default SocialPostLayout
