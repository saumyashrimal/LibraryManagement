import React from "react";
import ResponsiveDrawer from "./AdminDrawer";
import { Box } from "@mui/material";

function AdminDashboard(props) {
    // total Requests
    // total books 
    // total Students
    //total staff
  return (
    <>
      <ResponsiveDrawer>
        <Box sx={{backgroundColor: "blue", color:"white", border:"1px solid black", borderRadius:"100px", padding:"10px", width:"40%", marginBottom:"10px"}}>
            TOTAL REQUESTS
        </Box>
        <Box sx={{backgroundColor: "blue", color:"white", border:"1px solid black", borderRadius:"100px", padding:"10px", width:"40%", marginBottom:"10px"}}>
            AVAILABLE BOOKS
        </Box>
        <Box sx={{backgroundColor: "blue", color:"white", border:"1px solid black", borderRadius:"100px", padding:"10px", width:"40%", marginBottom:"10px"}}>
            TOTAL STUDENTS
        </Box>
        <Box sx={{backgroundColor: "blue", color:"white", border:"1px solid black", borderRadius:"100px", padding:"10px", width:"40%", marginBottom:"10px"}}>
            STAFF MEMBERS
        </Box>
      </ResponsiveDrawer>
    </>
  );
}

export default AdminDashboard;