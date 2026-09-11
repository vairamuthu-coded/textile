import React, { useEffect } from 'react'
import TableRows from './TableRows'
const Tables = ({items,CountryMaster_Check}) => { 
  return (
       <>   
  
    <table className='table table-responsive table-striped' >
      <thead>
        <th>ID</th>
        <th>CountryName</th>
        <th>Active</th>
      </thead>
    <tbody>
        {
          
            items.map((item,index)=>(
            
               <TableRows key={index} item={item}  CountryMaster_Check={CountryMaster_Check}   />
            
               
            ))
        }
    </tbody>
</table>
</>
  )
}

export default Tables
