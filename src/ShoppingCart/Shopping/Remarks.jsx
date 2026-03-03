import React, { useReducer } from 'react'

const Remarks = () => {

let COUNTERACTION={INCREMENT:"increment",DECREMENT:"decrement",RESET:"reset"}

  let reducer = (state, couterAction) => {   
    switch (couterAction.type) {
      case COUNTERACTION.INCREMENT :
        return { ...state, count: state.count + 1 };
      case COUNTERACTION.DECREMENT :
        return { ...state, count: state.count - 1 };
      case COUNTERACTION.RESET :
        return { ...state, count: 0 };
      default:
        return state;
    }
  }

  let [state,dispatch]= useReducer(reducer,{count:0})  

  return (
    <div className='card'>      
     <button className='btn  col-md-3' onClick={()=>dispatch({type:COUNTERACTION.INCREMENT})}>increment</button>  
     <p>{state.count}</p>
     <button className='btn  col-md-3' onClick={()=>dispatch({type:COUNTERACTION.DECREMENT})}>decrement</button>  
     <button className='btn  col-md-3' onClick={()=>dispatch({type:COUNTERACTION.RESET})}>reset</button>  
    </div>
  )
}

export default Remarks
