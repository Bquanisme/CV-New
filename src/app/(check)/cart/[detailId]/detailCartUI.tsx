import React from 'react'
import {
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Steppers from '@/components/steppers';
import DetailCartLeft from '@/components/detailCart/detailCartLeft';
import { useRouter } from 'next/navigation';
import DetailCartRight from '@/components/detailCart/detailCartRight';

type IProps = {
  id: string
  data: any
}

const DetailCartUI = ({ id, data }: IProps) => {
  const router = useRouter();
  const handleReturn = () => {
    router.push("/cart")
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '30%' }}>
          <IconButton
            onClick={handleReturn}
            sx={(theme) => ({
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.6)",
                color: theme.palette.grey[100],
              },
            })}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="body2"
            fontWeight={600}
            fontFamily="Inter"
            fontSize="16px"
          >
            Mã đơn hàng:  {' '}
            <span style={{
              color: '#939393ff',
              fontFamily: "Inter",
              fontSize: "16px",
              marginLeft: 4,
            }}>
              ĐH2000{id}
            </span>
          </Typography>
        </Box>
        <Steppers />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: '1 1 68%' }}>
            <DetailCartLeft data={data} />
          </Box>
          <Box sx={{ flex: '1 1 30%' }}>
            <DetailCartRight data={data} id={id}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DetailCartUI
