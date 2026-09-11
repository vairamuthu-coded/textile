import React from 'react'
const Select = ({
  id, name, value, compcodeData, className, className1, name1, stylecolor, visible, handleChange, setBarValues
}) => {

  handleChange = async (e) => {
    name = e.target.name; value = e.target.value;

    if (e.target.value !== "") {
      setBarValues((previousValue) => {
        return {
          ...previousValue, [name]: value,
        }
      })
    }
  }
  return (
    <>
      <label className={className1} style={{ color: `${stylecolor}`, fontWeight: "bold", display: `${visible === false ? "none" : "block"}` }} > {name1} </label>
      <select className={className} id={id} name={name} compcodeData={compcodeData} visible={visible} setBarValues={setBarValues} onChange={handleChange}  >
        <option>   
          {
             compcodeData.map((result, index) => (
              <option key={index} value={result.gtcompmastid}>
                {result.compcode}
              </option>))
          }     
        </option>        
      </select>


    </>
  )
}

export default Select