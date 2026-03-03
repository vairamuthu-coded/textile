import React, { useState } from 'react'

const DataTableSearch = ({onSearch}) => {
  const [search1,setSearch1]=useState('');
  const onInputChange=(value)=>{
setSearch1(value);
onSearch(value);
  }
  return (
    <input type='text' className='form-control' value={search1} onChange={(e)=>onInputChange(e.target.value)} style={{width:"250px"}} placeholder='search' />
  )
}

export default DataTableSearch
