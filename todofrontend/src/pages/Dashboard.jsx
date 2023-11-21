import React, { useEffect, useState } from "react";
import CustomizedInputBase from "../Components/SearchBar";
import {  IconButton, InputBase, Paper } from '@mui/material';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import {
  Box,
  Divider,
  InputAdornment,
  Modal,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { Boxes } from "../Components/Box";
import { fetchDataWithAuthentication } from "../utils/fetchtodos";
import { AccountCircle } from "@mui/icons-material";
import AddTodo from "../Components/AddTodo";
import { createTaskWithToken } from "../utils/addtodo";
import { deleteTaskWithToken } from "../utils/deletetodo";
import PaginatedList from "./Pageination";
import UpdateTodo from "../Components/updateTodo";
import { fetchsingletodo } from "../utils/fetchsingletodo";
import { updateTask } from "../utils/updatetodo";
export const Dashboard = () => {
  const [data, setdata] = useState([]);
  const [content, setcontent] = useState("");
  const [hasMore, setmore] = useState("");
  const[open,setopen] = useState(false)
  const[singletoso,setsingle] = useState("")
  const[updatecontent,setupdatecontent] = useState("")
  const [total, settotal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * 3;
  const indexOfFirstItem = indexOfLastItem - 3;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(total / 3);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const handleUpdate = (e)=>{
    fetchsingletodo(e._id).then((res)=>{
      setsingle(res)
      setupdatecontent(res.content)
    })
    setopen(true)
  }

  const onChange = (e) => {
    setcontent(e.target.value);
  };
  const handleDelete = (e) =>{
    console.log(e._id);
    deleteTaskWithToken(e._id).then((res)=>{
      console.log(res);
      fetchDataWithAuthentication()
      .then((data) => {
        setdata(data.tasks)
        setmore(data.hasMore)
        settotal(data.totalCount)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }).catch((err)=>{
      console.log(err);
    })
  }
  const onSubmitUpdate = (e)=>{
    updateTask(singletoso._id,updatecontent).then((res)=>{
      console.log(res);
      fetchDataWithAuthentication(currentPage)
      .then((data) => {
        setdata(data.tasks)
        setmore(data.hasMore)
        settotal(data.totalCount)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      setopen(false)
    })
    console.log(singletoso._id);
    
  }
  const onSubmit = (e) => {
    createTaskWithToken(content)
      .then((res) => {
        
        fetchDataWithAuthentication(currentPage)
        .then((data) => {
          setdata(data.tasks)
          setmore(data.hasMore)
          settotal(data.totalCount)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      })
      .catch((err) => {
        console.log(err);
      });
      setcontent("");
  };
  useEffect(() => {
    fetchDataWithAuthentication(currentPage)
      .then((data) => {
        setdata(data.tasks)
        setmore(data.hasMore)
        settotal(data.totalCount)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [currentPage]);
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

      </div>
      {data?.map((ele) => {
        return <Boxes key={ele._id} handleUpdate={(e)=>handleUpdate(e)} handleDelete={(e)=>handleDelete(e)} ele={ele} />;
      })} 
      <div
        className="addtodo"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <AddTodo
          value={content}
          onChange={(e) => onChange(e)}
          onSubmit={(e) => onSubmit(e)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center",marginTop:'15px' }} >
     

     <Pagination
       count={totalPages}
       page={currentPage}
       onChange={handlePageChange}
       color="primary"
       variant="outlined"
       shape="rounded"
     />
   </div>
   <Modal
   open={open}
   onClose={()=>setopen(false)} 
   
   >
    <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            width: '100%',
          }}
        >
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
        onChange={(e)=>setupdatecontent(e.target.value)}
      />
      <IconButton onClick={(e)=>onSubmitUpdate(e)} type="button" sx={{ p: '10px' }} aria-label="search">
        <DownloadDoneIcon  />
      </IconButton>
      
    </Paper>
    </Box>
   </Modal>
    </div>
  );
};
