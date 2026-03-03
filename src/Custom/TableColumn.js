import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DataContext from '../context/CreateUserContext';
const TableColumn = ({name,field,sortable,sortingField, sortingOrder,onSortingChange,setCheckAll,foreValue}) => {
  let {colorValue}=useContext(DataContext)
  
  return (
    <>

    <th key={name} onClick={()=>sortable ? onSortingChange(field) : null} style={{color:`${foreValue}`, display:"fled-flex", justifyContent:"space-between", backgroundColor:`${colorValue}`}}>
    {field==="visible" ? <input type='checkbox' name='chkActive'   onChange={(e) => setCheckAll(e.target.checked)}   /> : '' } {name}
      {
      
      sortingField && sortingField === field && 
        ( 
        <FontAwesomeIcon icon=
        {
          sortingOrder === "asc" ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down' 
        }  
        />
        )
      } 
      </th>

      </>
 
  )
}

export default TableColumn