import {  IconButton, InputBase, Paper } from '@mui/material';
import * as React from 'react';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';


export default function UpdateTodo({onChange,onSubmit,updatecontent}) {
  const [toggel,settoggle] = React.useState(true)
   React.useEffect(()=>{

   },[toggel])
   const handlechange = (e) =>{
    settoggle(!toggel)
    onChange(e)
   }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 400,marginTop:'15px' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add Todos"
        value={updatecontent}
        inputProps={{ 'aria-label': 'add todos' }}
        onChange={(e)=>handlechange(e)}
      />
      <IconButton onClick={(e)=>onSubmit(e)} type="button" sx={{ p: '10px' }} aria-label="search">
        <DownloadDoneIcon  />
      </IconButton>
      
    </Paper>
  );
}