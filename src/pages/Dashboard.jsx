import React, { useEffect, useState } from "react";
import CustomizedInputBase from "../Components/SearchBar";
import { Box, Divider, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Boxes } from "../Components/Box";
import { fetchDataWithAuthentication } from "../utils/fetchtodos";
export const Dashboard = () => {
  console.log(localStorage.getItem('auth'));
const  [data,setdata]= useState([])
  useEffect(()=>{
    
  })
  return (
    <div className="dashboard"> 
      <div className="nav">
        <h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
          >
            <rect width="72" height="72" rx="5" fill="#2ECA34" />
            <mask
              id="mask0_614_63"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="10"
              y="6"
              width="56"
              height="56"
            >
              <rect x="10" y="6" width="56" height="56" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_614_63)">
              <path
                d="M32.2833 48L18.9833 34.7L22.3083 31.375L32.2833 41.35L53.6917 19.9417L57.0167 23.2667L32.2833 48Z"
                fill="white"
              />
            </g>
          </svg>
          To Do’s
        </h1>

        <CustomizedInputBase />
      </div>
      {/* {
        data?.map((ele)=>{
          return(<Boxes ele={ele} />)
        })
      } */}
    </div>
  );
};
