import TableDashboard from '@/components/adminComponents/dashboard/table.dashboard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
        <Box sx={{ py: 2 }}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: "20px",
            }}
          >
            Quản lý Dashboard
          </Typography>
        </Box>
        <TableDashboard />
      </Box>
    </Box>
  )
}

export default Dashboard
