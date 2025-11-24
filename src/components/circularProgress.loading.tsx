import React from 'react'
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

const CircularProgressLoading = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
      <CircularProgress />
    </Box>
  )
}

export default CircularProgressLoading
