import { Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
let renderCount=0;
const SignUp = () => {
    let paperstyle = {
        width: 400,
        margin: "20px auto",
        padding: "10px",
        display:"grid",
        gap:"5px",
    }
    renderCount++;
    let [inputCount,setInputCount]=useState("")
    let {register,handleSubmit,formState:{error}}=useForm();


  return (
    <Paper elevation={20} style={paperstyle}>
      <Typography>Create Account {renderCount}</Typography>
      <input type='text' name="compcode"  {...register("compcode")}></input>
      <input type='text' name="username"  {...register("username")}></input>
      <input type='text' name="password"  {...register("password")}></input>

    </Paper>
  )
}

export default SignUp
