import React from 'react'

const SearchFilter = ({colorValue,searchs,setsearchs}) => {
  return (
    <div className='container-fluid' style={{backgroundColor:{colorValue}}}>
    <div className='row'>
        <div style={{margin:"5px",padding:"5px"}}>
        <div className='row'>
        <label className='col-md-1'>Search</label>
        <input  type='text' className='col-md-2' id="SearchItem" placeholder='Search Items' aria-label='SearchItem'    value={searchs}  onChange={(e)=>setsearchs(e.target.value.toUpperCase())}/>   
        <label className='col-md-2'  >CompCode</label>
        <select className='col-md-2' id="CompCode">   </select>       
        <label className='col-md-2'  >UserName</label>
        <select className='col-md-2'  id="UserName" >  </select>
        </div>
    </div>
</div>
</div>
  )
}

export default SearchFilter