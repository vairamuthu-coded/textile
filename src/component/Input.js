import React, { useState } from 'react'

const Input = (props) => {
  const {label,onChange,errorMessage,id,...inputProps}=props;
  const [focused,setFocusted]=useState(false);

  const hangelFocus=(e)=>{
    setFocusted(true);
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <label className='col-md-2 pt-1 mt-1'>{label}</label>
        <input className='col-md-2 pt-1 mt-1'  {...inputProps} onChange={onChange} onBlur={hangelFocus}
         onFocus={()=>inputProps.name === "confirmpassword" && setFocusted(true)}
         focused={focused.toString()}   />
        <span  >{errorMessage}</span>
      </div>
    </div>
  )
}

export default Input