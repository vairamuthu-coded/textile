import React from 'react'
import { Link } from 'react-router-dom'

const SocialMissing = ({colorValue,fetchError}) => {

  return (
    <div style={{color:"red",border:`none`,textAlign:"center"}} >
      <h1>Page Not Found</h1>
     <p>{fetchError}</p>
      <Link to='/Dashboard'>Visit Our Homepage</Link>
    </div>
  )
}

export default SocialMissing