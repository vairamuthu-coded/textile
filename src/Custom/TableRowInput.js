import React, { useState } from 'react'

const TableRowInput = ({item,columns,EditData,index,usernull,editValueChange}) => {

  return (
    <tr key={index}  onClick={()=>EditData(item)} >
    { 
        columns.map((columnitem, indx) => {
          return <td key={indx} style={{margin:"0",padding:"0",border:"1px solid white"}}  >
        
            <input type={`${columnitem.types}`} style={{ width: `${columnitem.widths}`,backgroundColor:"var(--bs-white)"}} 
            name={`${columnitem.fields}`}   readOnly={`${columnitem.readonly}`==="false" ?  null : `${columnitem.readonly}`} value={usernull !== null ? null : item[`${columnitem.field}`]}  onChange={(e)=>editValueChange(e)}  >
            </input>
            
          </td>
        })
     }  
     
  </tr>
  )
}

export default TableRowInput
