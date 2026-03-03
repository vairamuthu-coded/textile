import React, { useContext, useState } from 'react'
import TableColumn from './TableColumn'

import DataContext from '../context/CreateUserContext';
const DataTableHeader = ({headers,onSorting,setCheckAll,comments,checkall,foreValue}) => {
    const [sortingField,setSortingField]=useState('')
    const [sortingOrder,setSortingOrder]=useState("asc") 
  let {colorValue}=useContext(DataContext)
    const onSortingChange=field=>{
       
        const order= field===sortingField && sortingOrder==="asc" ? "desc" : "asc"; 
        setSortingField(field);
        setSortingOrder(order);
        onSorting(field,order);        
    }

    return(
       
    <thead style={{backgroundColor:`${colorValue}`}}   >

        <tr  >
            <>
            {        
                headers.map(({headername,field,sortable})=>(                    
                    <TableColumn key={headername} foreValue={foreValue}  setCheckAll={setCheckAll}  name={headername} sortable={sortable} field={field} sortingField={sortingField} sortingOrder={sortingOrder} onSortingChange={onSortingChange} />
                ))
               
            }
            </>
        </tr>
      
    </thead>
  )
 
}

export default DataTableHeader
