import React from 'react'

const ReadOnlyRows = ({contact,CityMasterCheck}) => {
  return (
    <tr onClick={(e)=>CityMasterCheck(e, contact)} style={{margin:"0px",padding:"0px"}}>
    <td style={{margin:"0px",padding:"0px"}}>{contact.gtcitymastid}</td>
     <td style={{margin:"0px",padding:"0px"}}>{contact.cityname}</td>
     <td style={{margin:"0px",padding:"0px"}}>{contact.statename}</td>
     <td style={{margin:"0px",padding:"0px"}}>{contact.countryname}</td>
     <td style={{margin:"0px",padding:"0px"}}> 
        <input type="checkbox" name='active' checked={contact.active==='T' ? true : false }  />
       </td>
   </tr>
  )
}

export default ReadOnlyRows
