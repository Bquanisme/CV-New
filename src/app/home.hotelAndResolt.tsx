import { fetchRooms } from '@/api/home/api.home';
import { IHotTour } from '@/typescript/home';
import { Chip, Rating, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

type IProps = {
  hotTour?: IHotTour;
};

const HomeHotelAndResolt = (props: IProps) => {
  const [changeLike, setChangeLike] = useState<{[key: number]: boolean}>({})

  const { data, isLoading } = useQuery({
    queryKey: ['rooms'],            // Query key cố định
    queryFn: fetchRooms,            // API function
    staleTime: Infinity,              // luôn fresh
    refetchOnWindowFocus: false,      // không tự refetch khi focus
    refetchOnReconnect: false,        // không tự refetch khi mạng reconnect
  })

  // console.log(data)

  if (isLoading) return <p>Loading...</p>

  const toggleLike = (id: number) => {
    setChangeLike((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <Box sx={{mt: 10, mb: 10}}>
        <Box>
            <Typography sx={{
                fontFamily: 'Mulish',
                fontWeight: 700,
                fontSize: '40px',
                color: '#FFFFFF',
                textAlign: 'right',
                pr: '10%',
                pb: 8
            }}>
                Khách sạn & Resorts
            </Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', gap: 5}}>
            {data && data?.map((room: any) => (
            <Box
            key={room.id}
            sx={{
                width: 424,
                height: 541,
                overflow: 'hidden',
                bgcolor: 'white',
                borderRadius: 4
            }}
            >
            <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 2
            }}
            > 
              <Image 
                src={room?.logo} 
                alt={room?.title} 
                width={424} 
                height={287} 
                style={{ objectFit: 'cover' }} 
              />
              <Box
                onClick={() => toggleLike(room.id)}
                sx={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                  width: 36,
                  height: 36,
                  bgcolor: "#ffffffe7", 
                  color: "white",
                  fontSize: 14,
                  borderRadius: '10px',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  '&:hover': { bgcolor: '#c7c4c4d2' }
                }}
              >
                {changeLike[room.id] ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon sx={{color: 'gray'}} />
                )}
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
            <Typography
              fontFamily={'SVN-Gilroy'}
              fontWeight="700"
              color="#343434"
              fontSize="22px"
              mb={2}
              >
              {room?.name}
              </Typography>

              <Rating value={5} readOnly size="medium"  />
              <Typography color="error" fontSize="14px" mt={2} sx={{fontWeight: 600}}>
              Đánh giá: 4.0 Rất tốt <span style={{ color: '#343434', fontSize: '13px' }}>(1.27k đánh giá)</span>
              </Typography>

              <Stack direction="row" spacing={1} mt={1.5} mb={1}>
              <Chip label="Giá Tốt" size="small" color="primary" />
              <Chip label="Gần Biển" size="small" color="primary" />
              <Chip label="Luxury" size="small" color="primary" />
              </Stack>

              <Box display="flex" justifyContent="left" gap={3} alignItems="center" mt={3}>
              <Typography fontWeight="bold" color="error" fontSize="24px">
                  {room?.cost.toLocaleString('vi-VN')} đ
              </Typography>
              <Typography fontSize="14px" color="#343434" fontWeight={500}>
                  * Chấp nhận khách sau 24h
              </Typography>
              </Box>
          </Box>
        </Box>
        ))}
        </Box>
    </Box>
  )
}

export default HomeHotelAndResolt
