import React from 'react'

const Footer=({title,colorValue})=> {
  const today=new Date();
  return (
   
      <footer style={{backgroundColor:`${colorValue}`,marginTop:'1%'}}>{ title}    :  {today.getFullYear()}  </footer>
   
   
  )
}

export default Footer
