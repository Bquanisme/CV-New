'use client'
import React from 'react'
import Typography from "@mui/material/Typography";
import Banner from "../../../assets/hotelBanner.jpg"
import Box from '@mui/material/Box';
import Image from "next/image"
import HotelDiscover from './hotelDiscover';
import HotelPropose from './hotelPropose';
import { HotelBreadcrumbs } from '@/components/breadcrumbs';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const Hotel = () => {
  const route = useRouter();
  return (
    <Box sx={{bgcolor: '#ffffffff', display: 'flex', flexDirection: 'column', gap: 5}}>
      <Box sx={{ position: "relative", width: "100%", height: "550px" }}> 
        <Image
          priority={false}
          src={Banner}
          alt="Header"
          fill //ảnh sẽ co giãn theo container cha
          style={{ 
            objectFit: 'cover' , 
            transform: "scaleX(-1)", // lật ngang
          }}
        />
        <Box
          sx={{
          position: "absolute",
          top: '50%' ,
          left: 0,
          width: "100%",
          height: 47,
          color: "white",
          fontSize: 14,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
          }}
        >
          <HotelBreadcrumbs />
          <Typography sx={{
            fontWeight: 700, 
            textAlign: 'center', 
            fontSize: '45px',
            color: '#ffffffff',
            fontFamily: 'SVN-Gilroy'
          }}>
            Nơi cư trú
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography 
            sx={{
              fontWeight: 700, 
              textAlign: 'center', 
              fontSize: '36px',
              color: '#3C3C3C',
              fontFamily: 'SVN-Gilroy'
            }}>
            Khám phá khách sạn
          </Typography><br />
          <Typography 
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '150%',
              color: '#3C3C3C',
              textAlign: 'center',
              fontFamily: 'Inter'
            }}
          >
            Các khách sạn được tìm kiếm & đặt nhiều nhất do chúng tôi đề xuất
          </Typography>
        </Box>
      </Box>
        <HotelDiscover />
      <Box>
        <Box>
          <Typography 
            sx={{
              fontWeight: 700, 
              textAlign: 'center', 
              fontSize: '36px',
              color: '#3C3C3C',
              fontFamily: 'SVN-Gilroy'
            }}>
            Đề xuất cho bạn
          </Typography><br />
          <Typography 
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '150%',
              color: '#3C3C3C',
              textAlign: 'center'
            }}
          >
            Nâng tầm du lịch với các top thương hiệu khách sạn, biệt thự hàng đầu
          </Typography>
        </Box>
        <HotelPropose />
        <Box sx={{ display: "flex", justifyContent: "center", mb: 5}}>
        <Button 
          variant="contained" 
          onClick={() => route.push('/hotel/allRoom')}
          sx={{
            width: 140,
            height: 56,
            bgcolor: 'green', 
            fontSize: '16px',
            color: 'white',
            textTransform: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '10px',
            '&:hover': { bgcolor: 'darkgreen' }
          }}
        >
          Xem thêm
        </Button>
      </Box>
      </Box>
    </Box>
  )
}

export default Hotel
