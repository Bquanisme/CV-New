import React from 'react'
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Steppers from '@/components/otherComponents/steppers'
import DetailCartLeft from '@/components/detailCart/detailCartLeft'
import DetailCartRight from '@/components/detailCart/detailCartRight'
import { useRouter } from 'next/navigation'

type IProps = {
  id: string
  data: any
}

const DetailCartUI = ({ id, data }: IProps) => {
  const router = useRouter()

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: { xs: 2, md: 0 },
          mb: { xs: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: { xs: '100%', md: '30%' },
          }}
        >
          <IconButton
            onClick={() => router.push('/cart')}
            sx={(theme) => ({
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: theme.palette.grey[100],
              },
            })}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography fontWeight={600} fontSize={16} fontFamily="Inter">
            Mã đơn hàng:{' '}
            <Box component="span" sx={{ color: '#939393' }}>
              ĐH2000{id}
            </Box>
          </Typography>
        </Box>

        {/* Stepper */}
        <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
          <Steppers />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        <Box sx={{ flex: '1 1 68%', width: '100%' }}>
          <DetailCartLeft data={data} />
        </Box>

        <Box
          sx={{
            flex: '1 1 30%',
            width: '100%',
            position: { md: 'sticky' },
            top: { md: 90 },
            height: 'fit-content',
          }}
        >
          <DetailCartRight data={data} id={id} />
        </Box>
      </Box>
    </Box>
  )
}

export default DetailCartUI
