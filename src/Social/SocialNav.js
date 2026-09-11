import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from '../context/CreateContext'

const SocialNav = ({colorValue}) => {
  const {search,setSearch}=useContext(DataContext)
  return (
    <>
  <div style={{backgroundColor:`${colorValue}`,color:"var(--bs-danger)"}} >
    <ul>
      <li style={{width:"150px"}}><Link to="/" style={{color:"var(--bs-white)",listStyle:"none"}}>Home</Link></li>
      <li style={{width:"150px"}}><Link to="/SocialPostPage" style={{color:"var(--bs-white)"}}>Post</Link></li>    
      <li style={{width:"150px"}}><Link to="/About" style={{color:"var(--bs-white)"}} >About</Link></li>  
  </ul>
</div>  
<p style={{border:"2px solid var(--bs-white)"}}></p>
  <form onSubmit={(e)=>e.preventDefault()}  >
    <div className='container-fluid' style={{padding:"5px",backgroundColor:"var(--bs-light)"}}> 
    <div className='row'>
      <label className='col-md-2' style={{padding:"5px",fontSize:"var(--bs-font)"}}> Search </label>
      <input className='col-md-8' style={{padding:"5px",fontSize:"var(--bs-font)"}}  
      type='text' id="SearchItem"     placeholder='Search Items'    aria-label='SearchItem'   
        value={search}    onChange={(e)=>setSearch(e.target.value)} />   
    </div>
    </div>
  </form> 
<br></br>
    </>
  )
}

export default SocialNav
