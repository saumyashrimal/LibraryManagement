import { Box } from '@mui/material'
import React from 'react'

function NoDataFound() {
  return (
    <Box sx={{backgroundColor: "gray", fontWeight:"bold", fontSize:"78", padding:"60px"}}>
        <h1>No Data Found...</h1>
    </Box>
  )
}

export default NoDataFound