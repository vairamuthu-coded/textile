import React from 'react'

const Payment = ({title,colorValue}) => {
  return (
    <div className='container-fluid' style={{backgroundColor:`${colorValue}`, borderTop:"2px solid var(--bs-white)"}} >
    <h3 style={{textAlign:"center",color:"var(--bs-white)"}} >{title}</h3>
  </div>
  )
}

export default Payment
