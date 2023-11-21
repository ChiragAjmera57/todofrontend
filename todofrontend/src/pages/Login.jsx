import { Button, Stack, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userlogin } from '../utils/userlogin'
import { AppContext } from '..'

export const Login = () => {
  const [token,settoken] = useState(null)
  const navigate = useNavigate()
  const[email,setemail] = useState("")
  const[password,setpassword] = useState("")
  const handleSubmit = ()=>{
    userlogin({email,password}).then((res)=>{
      console.log(res);
      settoken(res.token)
      localStorage.setItem('token',res.token)
      localStorage.setItem('auth',true)
      navigate("/");
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className='login'>
        
          <Stack spacing={2}>
          <h1>Login</h1>
            <TextField label="Email/Mobile"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            />
            <TextField label="Password" type='password'
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            />
            
            <p>Not a member? <Button onClick={()=>navigate(`/signup`)}>SignUp</Button></p>
            <Button variant='contained' onClick={handleSubmit} >Login</Button>
          </Stack>
            
        
    </div>
  )
}
