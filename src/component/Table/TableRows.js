import React, { useEffect } from 'react'
import TablesCell from './TablesCell'



const TableRows = ({item,CountryMaster_Check}) => {


  return (
     <tr onClick={()=>CountryMaster_Check(item.id)} >
      {
        Object.entries(item).map(([key,value])=>{
            return( 
               <TablesCell key={key.id} cellData={value}  />
               
            )

        })
       }
     </tr>
   
  )
}

export default TableRows
