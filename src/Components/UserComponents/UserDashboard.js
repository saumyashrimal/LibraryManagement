import React from "react";
import ResponsiveDrawer from "./UserDrawer";
import { Box } from "@mui/material";

function UserDashboard(props) {
  let userInfo = JSON.parse(localStorage.getItem("user"));
  let { issuedBooks } = userInfo;

  return (
    <>
      <ResponsiveDrawer>
        <Box
          sx={{
            backgroundColor: "blue",
            color: "white",
            marginBottom: "10px",
            border: "1px solid black",
            borderRadius: "100px",
            padding: "10px",
            width: "40%",
            textAlign: "center",
          }}
        >
          <h5>TOTAL BOOKS ISSUED - {issuedBooks.length}</h5>
        </Box>
        <Box
          sx={{
            backgroundColor: "blue",
            color: "white",
            border: "1px solid black",
            borderRadius: "100px",
            padding: "10px",
            width: "40%",
            textAlign: "center",
          }}
        >
          <h5>TOTAL FIINE - </h5>
        </Box>
      </ResponsiveDrawer>
    </>
  );
}

export default UserDashboard;
