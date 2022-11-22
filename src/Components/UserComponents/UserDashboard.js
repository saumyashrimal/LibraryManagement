import React from "react";
import ResponsiveDrawer from "./UserDrawer";
import { Box } from "@mui/material";

function UserDashboard(props) {
  let userInfo = JSON.parse(localStorage.getItem("user"));
    let {issuedBooks} = userInfo;
  return (
    <>
      <ResponsiveDrawer>
        <Box sx={{backgroundColor: "blue", color:"white", border:"1px solid black", borderRadius:"100px", padding:"10px", width:"40%"}}>
          <h1>TOTAL BOOKS ISSUED -  {issuedBooks.length}</h1>
        </Box>
        <Box sx={{backgroundColor: "blue", color:"white", border:"1px solid black", borderRadius:"100px", padding:"10px", width:"40%"}}>
          <h1>TOTAL FIINE - </h1>
        </Box>
      </ResponsiveDrawer>
    </>
  );
}

export default UserDashboard;
