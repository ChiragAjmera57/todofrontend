import { Button, Stack, TextField } from '@mui/material'
import React, { useReducer } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { signUpUser } from '../utils/userSignup.req'
const initialState = {
  name:"",
  fatherName:"",
  email:"",
  mobile:"",
  password:"",
}
const reducer = (state=initialState,{type,payload})=>{
  const{name,fatherName,email,mobile,password} = state
  switch (type) {
    case "SETNAME":
      return {
        ...state,name:payload
      }
     
    case "SETFATHER":
      return {
        ...state,fatherName:payload
      }
    case "SETEMAIL":
      return {
        ...state,email:payload
      }
    case "SETMOBILE":
      return {
        ...state,mobile:payload
      }
    case "SETPASS":
      return {
        ...state,password:payload
      }
      
      
  
    default:
      return state
     
  }
}
export const SignUp = () => {
  const[state,dispatch] = useReducer(reducer,initialState)
  const navigate = useNavigate()
  const handleSubmit = ()=>{
    
    const result = signUpUser(state).then((res)=>{
      navigate("/login");
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className='sign login'>
        
          <Stack spacing={2}>
          <h1>Sign Up</h1>
            <TextField label="Full Name" onChange={(e)=>dispatch({type:"SETNAME",payload:e.target.value})}/>
            <TextField label="Father Name"  onChange={(e)=>dispatch({type:"SETFATHER",payload:e.target.value})}/>
            <TextField label="Email" required onChange={(e)=>dispatch({type:"SETEMAIL",payload:e.target.value})} />
            <TextField label="Phone Number" type='number' required onChange={(e)=>dispatch({type:"SETMOBILE",payload:e.target.value})} />
            <TextField label="Password" type='password' required onChange={(e)=>dispatch({type:"SETPASS",payload:e.target.value})} />
            
            <Button variant='contained' onClick={handleSubmit}>Sign Up</Button>
            <p>Already a member?<Button onClick={()=>navigate(`/login`)}>Login</Button></p>
          </Stack>
            
        
    </div>
  )
}
