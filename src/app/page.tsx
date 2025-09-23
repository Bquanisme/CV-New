'use client'
import { Typography } from "@mui/material";
import Banner from "../assets/Banner.jpg"
import Box from '@mui/material/Box';
import Image from "next/image"
import HomeDiscover from "./home.discover";
import HotTour from "./hotTour";
import HAR from '../assets/roomBanner.jpg'
import HomeHotelAndResolt from "./home.hotelAndResolt";


export default function Home() {
  return (
    <Box sx={{bgcolor: '#D9D9D9', display: 'flex', flexDirection: 'column', gap: 10}}>
      <Box sx={{ position: "relative", width: "100%", height: "843px" }}> 
        <Image
          src={Banner}
          alt="Header"
          fill //ảnh sẽ co giãn theo container cha
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box>
        <Box>
          <Typography 
            sx={{
              fontWeight: 'bold', 
              textAlign: 'center', 
              fontSize: '40px',
              color: '#1C5C80',
              fontFamily: 'SVN-Gilroy'
            }}>
            Khám phá điểm đến nổi bật 
          </Typography><br />
          <Typography 
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '150%',
              color: '#565656',
              textAlign: 'center'
            }}
          >
            Nhận cơ hội để đi du lịch | Đi nghỉ | Nghỉ dưỡng cùng gia đình | Tận hưởng chính mình
          </Typography>
        </Box>
      </Box>
      <HomeDiscover />
      <Box>
        <Box>
          <Typography 
            sx={{
              fontWeight: 700, 
              textAlign: 'center', 
              fontSize: '40px',
              color: '#1C5C80',
              fontFamily: 'SVN-Gilroy'
            }}>
            Tour HOT 2023
          </Typography><br />
          <Typography 
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '150%',
              color: '#565656',
              textAlign: 'center'
            }}
          >
            Chào hè 2023 sôi động với những Tour du lịch hấp dẫn, những địa điểm thu hút khách du <br/>
            lịch tại Nha Trang. Khám phá ngay để có thêm những trải nghiệm hè thật sôi động bên gia <br/>
            đình, người thân nào ! <br/>
          </Typography>
        </Box>
        <Box sx={{
          mt: 8,
          mb: 8,
        }}>
          <HotTour />
        </Box>
        <Box  
        sx={{
          backgroundImage: `url(${HAR.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
        }}
        >
          <HomeHotelAndResolt />
        </Box>
      </Box>
    </Box>
  )
}
