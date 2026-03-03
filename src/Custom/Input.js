import React from 'react'
const Input = ({type,id,name, className,value,onchange,onKeyDown,placeholder}) => {
  return (      

       <input  className={className} type={type} id={id} name={name} value={value} onchange={onchange} onKeyDown={onKeyDown} placeholder={placeholder} />
       )}
export default Input