import React from 'react'
const Label = ({labelName,className,stylecolor,visible,forecolor}) => {


     return ( <label   style={{color:`${forecolor}`,fontWeight:"bold",display:visible}}  className={className} >  {labelName} </label>)
    } 
export default Label