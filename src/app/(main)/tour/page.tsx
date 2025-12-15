'use client'
import React from 'react'
import Typography from "@mui/material/Typography";
import Banner from "../../../assets/TourBanner.jpg"
import Box from '@mui/material/Box';
import Image from "next/image"
import { TourBreadcrumbs } from '@/components/otherComponents/breadcrumbs';
import { useRouter } from 'next/navigation';
import TourDiscover from './tourDiscover';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TourTicket from './tourTicket';

const Tour = () => {
  const route = useRouter();
  return (
    <Box sx={{ bgcolor: '#D9D9D9', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Box sx={{ position: "relative", width: "100%", height: "569px" }}>
        <Image
          priority={false}
          src={Banner}
          alt="Header"
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: '100%',
            bgcolor: "#3635356e ",
            color: "white",
            fontSize: 14,
          }}
        >

          <Box
            sx={{
              position: "absolute",
              top: '50%',
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
            <TourBreadcrumbs />
            <Typography sx={{
              fontWeight: 700,
              textAlign: 'center',
              fontSize: '45px',
              color: '#ffffffff',
              fontFamily: 'SVN-Gilroy'
            }}>
              Tour
            </Typography>
          </Box>
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
            Khám phá địa điểm
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
            Dịch vụ giải trí được tìm kiếm, lựa chọn nhiều nhất. Chúng tôi sẽ đề xuất cho bạn
          </Typography>
        </Box>
      </Box>
      <TourDiscover />
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
              color: '#3C3C3C',
              textAlign: 'center',
              mb: 3
            }}
          >
            Chào hè 2023 sôi động với những Tour du lịch hấp dẫn, những địa điểm thu hút khách du <br />
            lịch tại Nha Trang. Khám phá ngay để có thêm những trải nghiệm hè thật sôi động bên gia <br />
            đình, người thân nào !
          </Typography>
        </Box>
        <TourTicket />
        <Box sx={{ display: "flex", justifyContent: "center", mb: 5, gap: 2 }}>
          <Link href="/travel/tourism" style={{ textTransform: 'none', textDecoration: "none", }}>
            <Typography sx={{ color: '#1C5C80', fontWeight: 700, fontSize: '20px', mb: 1, fontStyle: "Bold", fontFamily: 'SVN-Gilroy' }}>
              Khám phá thêm
            </Typography>
          </Link>
          <Link href="/travel/tourism" style={{ textTransform: 'none', textDecoration: "none", }}>
            <ArrowForwardIcon sx={{ width: 30, height: 30, color: '#1C5C80' }} />
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Tour
