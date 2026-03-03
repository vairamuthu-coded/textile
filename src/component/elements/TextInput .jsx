import React, { forwardRef } from "react";

const TextInput = ({ref,type,className1,className,stylecolor,name1,disabled,
  handleChange,setBarValues,maxLength,visible}) => {

         handleChange = async (e) => {   
        const { name, value,type,checked } = e.target;       
            if (value.length > maxLength) return;
          setBarValues((pre) => ({              
           ...pre, [name]:type === "checkbox"  ? checked :  type === "number"  ? Number(value) : type === "date"  ? value  : value,               
            }))
    }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();  
      ref?.current?.focus();   
    }
  };

  return (
    <>  
<label className={className1}  style={{color:`${stylecolor}`,fontWeight:"bold",display:`${visible===false ? "none" : "block"}`}} > {name1} </label>
  <input className={className} onChange={handleChange} disabled={disabled}
    type={type} 
    ref={ref}
    onKeyDown={handleKeyDown}
  />
    </>
  );
};

export default TextInput;
