import React from 'react'
import { NavLink } from 'react-router-dom'

function Button() {
  return (
      <NavLink to="SignUp">
        <button className='btn' >SignUp </button>
      </NavLink>
  )
}

export default Button

