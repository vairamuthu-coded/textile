import React from 'react'

const Button = ( ButtonName,
    buttonWidth,
    buttonHeight,
    buttonColor,
    buttonShadowColor) => {
   
  return (
    <button style={{width:buttonWidth,height:buttonHeight,color:buttonColor,
        filter:`drop-shadow(2px 4px 6px ${buttonShadowColor})`}}
        className='appButton'
    >
      {ButtonName}
    </button>
  )
}

export default Button
