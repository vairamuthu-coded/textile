import { arrayLengthCompare } from '@blueprintjs/core/lib/esm/common/utils';
import axios from 'axios';
import React, { useRef } from 'react'
const Input = ({type,name,disabled,placeholder,ref,value,className,className1,name1,colorValue,stylecolor,visible,
  maxLength,handleChange,setBarValues,title,tabIndex,onKeyDown}) => {
     handleChange = async (e) => {   
        const { name, value,type,checked } = e.target;
            if (value.length > maxLength) return;
          setBarValues((pre) => ({              
           ...pre, [name]:type === "checkbox"  ? checked : type === "number"  ? Number(value) :type === "date"  ? value  : value,               
            }))
    }



  return (
    <>
   
    <label className={className1}  style={{color:`${stylecolor}`,fontWeight:"bold",display:`${visible===false ? "none" : "block"}`}} > {name1} </label>
    <input  className={className}   type={type}  name={name} title={title} tabIndex={tabIndex} value={value} placeholder={placeholder ? placeholder : ''}   style={{display:`${visible===false ? "none" : "block"}`,color:`${colorValue}`}}  maxLength={maxLength}
    onKeyDown={onKeyDown} ref={ref} onChange={handleChange} disabled={disabled}   />  
    
    </> 
  )
} 
export default Input