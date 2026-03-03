import React, { useState } from 'react'
import './PopUp.css';
const PopUp = (props) => {
   
  return (props.trigger) ? (
    <div className='popup'>
         <div className='popup-inner'>
      <button className=' btn btn-success close-btn' onClick={()=>props.setTrigger(false)} >close</button>
      {props.children}
      </div>
    </div>
    ): "";
 
}

export default PopUp
//https://www.google.com/search?sca_esv=49edd9b6d80ee3b4&sxsrf=ADLYWIJUbVMAWzBwNFITXWdxECPpXFiyYg:1735818658602&q=popup+window+in+react+js&udm=7&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWwAFG7ranuZ26H8lR7pf_8A-INd5ojJqZL-l5U4A6ut9d55nEcrHDWh7X1JeNwYHTZi_c0U7U7y2Js42XrarlJ-V4IAQB8zuHBw806uDlpnSbNxcZ1hQS4Cr0kdlC3P7cys-goMFIQmBRJBNRonzik9ivId0OyBg8ArbB-Hf1Auqz1hjSeiB4vKxcZlLZ8KnVzs-djg&sa=X&ved=2ahUKEwjZiam0_NaKAxU88DgGHTnQNRoQtKgLegQIFRAB&biw=1280&bih=593&dpr=1#fpstate=ive&vld=cid:d4921be1,vid:i8fAO_zyFAM,st:0