import React from 'react'

const Checkbox = ({id,name,type,checked,className,className1,name1,stylecolor,visible,onChange,setActive,tabIndex}) => {

  onChange=(e) => setActive(e.target.checked)
  return (
    <>
    <label className={className1}  style={{color:`${stylecolor}`,fontWeight:"bold",display:`${visible===false ? "none" : "block"}`}} > {name1} </label>
    <input  className={className}  type={type} id={id} name={name} checked={checked} tabIndex={tabIndex}  style={{display:`${visible===false ? "none" : "block"}`}} onChange={onChange}  />      

    </>
  )
}

export default Checkbox