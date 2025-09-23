import { Button } from '@mui/material'
import React from 'react'

const AppButton = () => {
  return (
    <div>
      <Button 
        variant="contained" 
        sx={{
        width: 140,
        height: 56,
        bgcolor: 'red', 
        fontSize: '16px',
        color: 'white',
        textTransform: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '10px',
        '&:hover': { bgcolor: 'darkred' }
        }}
        >
          Xem thêm
        </Button>
    </div>
  )
}

export default AppButton
