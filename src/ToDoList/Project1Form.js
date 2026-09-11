import React from 'react'
import Project1Button from './Project1Button';

const Project1Form = ({colorValue,reqType,setReqType}) => {
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <form className='container-fluid' onSubmit={(e)=>handleSubmit(e)}>     
    <div className='row' >
        <div className='col-md-4' style={{border:"1px solid orange"}}>
            <Project1Button className='btn' colorValue={colorValue}  reqType={reqType} setReqType={setReqType} buttonText="users"/>
           
        </div>
        <div className='col-md-4' style={{border:"1px solid orange"}}>
        <Project1Button className='btn'  reqType={reqType} setReqType={setReqType} buttonText="posts"/>
        </div>
        <div className='col-md-4' style={{border:"1px solid orange"}}>
        <Project1Button className='btn'  reqType={reqType} setReqType={setReqType} buttonText="comments"/>
        </div>
    </div>   
</form>
  )
}

export default Project1Form
