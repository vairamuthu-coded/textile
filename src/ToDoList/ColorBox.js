import React, { useState } from 'react'
import Square from './Square'
import Input from './Input'

const ColorBox = () => {
    const[colorValue,setColorValue]=useState('')
    const[hexValue,setHexValue]=useState('')
    const[isDarkText,setIsDarkText]=useState(true)

  return (
    <div className='App'>

   <Square
   colorValue={colorValue}
   hexValue={hexValue}
   isDarkText={isDarkText}
   />
     
 <Input colorValue={colorValue} setColorValue={setColorValue} 
 hexValue={hexValue} setHexValue={setHexValue} 
 isDarkText={isDarkText} setIsDarkText={setIsDarkText} />

</div>
  )
}

export default ColorBox
