import React, { useContext } from 'react'
import {FaTrashAlt} from 'react-icons/fa';
import DataContext from '../context/CreateUserContext';
const LineItem = ({item,handleCheck,handleDelete}) => {
  let {colorValue}=useContext(DataContext)
  return (
    <li className='item' >
       <input type="checkbox" checked={item.checked} onChange={()=>handleCheck(item.id)} />
        <label style={(item.checked) ? {textDecoration: 'line-through'}: null} onClick={()=>handleCheck(item.id)} >{item.item}</label>
        <FaTrashAlt style={{backgroundColor:"var(--bs-danger"}} role="button" tabIndex="0" aria-label={`Delete ${item.item}`}  onClick={()=>handleDelete(item.id)} />
    </li>
  )
}

export default LineItem
