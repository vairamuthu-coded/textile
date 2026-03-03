import React from 'react'

const Input = () => {
  return (
    <div>
      
    </div>
  )
}

export default Input

// import React from 'react';
// import colorNames from 'colorname/colors.json'
// const Input = ({colorValue,setColorValue,setHexValue,isDarkText, setIsDarkText}) => {

//   return (
//     <form className='addForm' onSubmit={(e)=>handleSubmit(e)} >     
//     <input  type='text'
//         autoFocus
//         id="addItem" 
//         placeholder='add Color Name'
//         required
//         value={colorValue}
//         onChange={(e)=>{
//             setColorValue(e.target.value);
//             setHexValue(colorNames(e.target.value));
//        }} />
//     <button type='button' onClick={()=>setIsDarkText(!isDarkText)} aria-label='Add item'  >
//    Toogle Text color
//     </button>
// </form>
//   );
// }

// export default Input;
