import React from "react";
import CustomizedInputBase from "../Components/SearchBar";
import { Box, Divider, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

export const Boxes = (ele) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        
        alignItems: 'center',
        m:'auto',
        marginTop:"25px",
        width: 'fit-content',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        bgcolor: 'background.paper',
        color: 'text.secondary',
        '& svg': {
          m: 1.5,
        },
        '& hr': {
          mx: 0.5,
        },
       
      }}>
        <Typography>
        {ele.content}
        </Typography>
        <Typography>
        {ele.date}
        </Typography>
        <CancelIcon />
        <Divider orientation="vertical" variant="middle" flexItem />
        <EditIcon />
      </Box>
      
  )
}
