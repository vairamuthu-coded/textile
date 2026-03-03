import React, { useState } from 'react'

const useForm = (validate) => {
const [values,setValues]=useState({
    CountryID:"",
    countryname:"",   
    active:"",
});

const [errors,setErrors]=useState({})

const handleSubmit=(e)=>{
  e.preventDefault();
  setErrors(validate(values));
  alert(values.active)
}

const handleChange=(e)=>{
    const {name,value}=e.target;
    setValues((previousValue)=>{
        return{
            ...previousValue,[name]:value,
        }
    })
};
return {handleChange,values,handleSubmit,errors};
};
export default useForm;
