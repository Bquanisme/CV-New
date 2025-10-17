'use client'
import React from 'react'
import Typography from "@mui/material/Typography";
import Banner from "../../assets/travelBanner.jpg"
import Box from '@mui/material/Box';
import Image from "next/image"
import TravelDiscover from './travel.discover';
import BeachDiscover from './beach.discover';
import HotTravel from './hot.travel';
import {TravelBreadcrumbs} from '@/components/breadcrumbs';

const Travel = () => {
  return (
    <Box sx={{bgcolor: '#ffffffff', display: 'flex', flexDirection: 'column', gap: 10}}>
      <Box sx={{ position: "relative", width: "100%", height: "550px" }}> 
        <Image
          priority={false}
          src={Banner}
          alt="Header"
          fill //ảnh sẽ co giãn theo container cha
          style={{ objectFit: 'cover' }}
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
          <TravelBreadcrumbs />
          <Typography sx={{
            fontWeight: 700, 
            textAlign: 'center', 
            fontSize: '45px',
            color: '#ffffffff',
            fontFamily: 'SVN-Gilroy'
          }}>
            Du Lịch
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
              color: '#001A40',
              fontFamily: 'SVN-Gilroy'
            }}>
            Khám phá các địa điểm 
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
            Các địa điểm được tìm kiếm và có lượt đánh giá nhiều nhất. Chúng tôi sẽ đề xuất cho bạn 
          </Typography>
        </Box>
      </Box>
        <TravelDiscover />
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
            Khám phá bãi biển
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
            Tận hưởng sự tự do theo cách của bạn để có một kỳ nghỉ tuyệt vời
          </Typography>
        </Box>
        <Box sx={{
          mb: 8,
        }}>
          <BeachDiscover />
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
                    Địa điểm hot 2023
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
                    Tận hưởng sự tự do theo cách của bạn để có một kỳ nghỉ tuyệt vời
                </Typography>
            </Box>
            <Box>
                <HotTravel />
            </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Travel
