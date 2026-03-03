import React from 'react'

const Project1Button = ({colorValue,buttonText,reqType,setReqType}) => {
  return (
    <button style={{backgroundColor:`${colorValue}`}} className={buttonText===reqType ? 'selected': null} type='button'
     onClick={()=>setReqType(buttonText)} >      
    {buttonText}
    </button>
  )
}

export default Project1Button
