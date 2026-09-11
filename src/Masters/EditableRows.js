import React from 'react'
const EditableRows = ({handleChange, cityValues, cityStateData, cityCountryData, 
  city_active, setCityActive }) => {

  return (

    <tr style={{margin:"0px",padding:"0px"}} >
      <td style={{margin:"0px",padding:"0px"}}>{cityValues.gtcitymastid}     </td>
      <td style={{margin:"0px",padding:"0px"}}>  <input type='text' name="cityname" style={{margin:"0px",padding:"0px"}}
        value={cityValues.cityname} onChange={handleChange}
        required />   </td>
      <td style={{margin:"0px",padding:"0px"}}><select name='statename' value={cityValues.statename} onChange={handleChange} >
        {
          cityStateData !== null &&
          cityStateData.map((result, index) => (
            <option key={index} value={result.gtstatemastid}>
              {result.statename}
            </option>))
        }
      </select></td>
      <td style={{margin:"0px",padding:"0px"}}> <select name='countryname' value={cityValues.countryname} onChange={handleChange}style={{margin:"0px",padding:"0px"}} >
        {
          cityCountryData !== null &&
          cityCountryData.map((result, index) => (
            <option key={index} value={result.gtcountrymastid}>
              {result.countryname}
            </option>))
        }
      </select></td>
      <td style={{margin:"0px",padding:"0px"}}>
        <input type="checkbox" name='active' checked={city_active} onChange={(e) => setCityActive(e.target.checked)} style={{margin:"0px",padding:"0px"}} />
      </td>
         </tr>
  )
}

export default EditableRows
