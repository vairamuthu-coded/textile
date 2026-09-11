import React from 'react'
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'

const SocialHeader = ({colorValue,title,width}) => {
  return (
    <header style={{backgroundColor:`${colorValue}`,border:"1px solid var(--bs-white)"}}>
      <h1>{title}</h1>
      {width<768 ? <FaMobileAlt/> : width < 992 ? <FaTabletAlt/> : <FaLaptop/>}
    </header>
  )
}

export default SocialHeader
