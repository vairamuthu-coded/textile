import React from 'react';
import { FaPlus } from 'react-icons/fa';
const AddItems = ({newItem,setNewItem,handleSubmit}) => {
  return (
    <form className='addForm' onSubmit={(e)=>handleSubmit(e)} >     
        <input  type='text'
            autoFocus
            id="addItem" name="item"
            placeholder='add Items'
            required
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)} />
        <button type='submit' aria-label='Add item'  >
        <FaPlus/>
        </button>
    </form>
  );
}

export default AddItems;
