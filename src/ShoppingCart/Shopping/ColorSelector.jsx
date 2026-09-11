import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { changeColor } from "../../store/theme";
import ShopContext from '../../context/CreateShopContext';
const ColorSelector = () => {
    const [color,setColor]=useState('orange')
  const {dispatch}=useContext(ShopContext)
 let themeColor=useSelector((state)=>{return state.theme})

  return (
    <div style={{backgroundColor:`${themeColor.color}`}}>     
      {/* <input type="color"    value={color} onChange={(e)=>setColor(e.target.value)} /> */}
     <p> VAIRAMUTHU POTTAPPACHERI</p>
      <button  onClick={()=>dispatch(changeColor(themeColor.color))} >Change color</button>
      
    </div>
  )
}

export default ColorSelector

