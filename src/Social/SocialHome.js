import React, { useContext } from 'react'
import SocialFeed from './SocialFeed'
import DataContext from '../context/CreateContext'
const SocialHome = () => {
  const {colorValue,searchresult,fetchError,isLoading}=useContext(DataContext)
  return (
    <div>
      {isLoading && <p>Loading Posts....</p>}
      {!isLoading && fetchError && 
       <div style={{color:"red",border:`1px solid ${colorValue}`,textAlign:"center"}}>
       <h3 style={{color:"var(--bs-danger)",fontSize:"var(--bs-font",fontWeight:"bold"}}>{fetchError}</h3>             
     </div>    }
      {!isLoading && !fetchError && searchresult.length ? (<SocialFeed posts={searchresult} colorValue={colorValue} />) : <p style={{marginTop:"2rem",color:"var(--bs-danger)"}} ></p>}
  </div>
  )
}

export default SocialHome