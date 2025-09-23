import { fetchTravels } from '@/api/home/api.home';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FlagIcon from '@mui/icons-material/Flag';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

type IProps = {
  hotTour?: IHotTour
}

const HotTour = (props: IProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['travels'],            // Query key cố định
    queryFn: fetchTravels,            // API function
    staleTime: Infinity,              // luôn fresh
    refetchOnWindowFocus: false,      // không tự refetch khi focus
    refetchOnReconnect: false,        // không tự refetch khi mạng reconnect
  })

  // console.log(data)

  if (isLoading) return <p>Loading...</p>



  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        justifyContent: 'center'
      }}>
        {data?.map((item: any) => {
          const getDiffDays = (start_date: string, end_date: string): number => {
            if (!start_date || !end_date) return 0;

            const start = new Date(start_date);
            const end = new Date(end_date);

            const diffMs = Math.abs(end.getTime() - start.getTime());
            return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
          };

          const diffDays = getDiffDays(item.start_date, item.end_date);
          
          return(
          <Box
          key={item?.id}
          sx={{
            width: '90%',
            maxWidth: 1320,
            bgcolor: '#fff',
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            margin: '16px auto',
            minHeight: 278,
            border: '1px solid #D9D9D9',
            boxShadow: '0 4px 4px #00000040'
          }}
        >
          <Box sx={{ position: "relative", width: '35%', maxWidth: 424, minHeight: 278 }}>
            <Image
              src={item?.logo}
              alt={item?.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>

          <Box sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 3 }}>
            <Typography 
              sx={{ 
                fontWeight: 600, 
                color: '#1C5C80', 
                fontSize: 20,
                mb: 1 
              }}
            >
              {item?.name}
            </Typography>
            <Typography sx={{ color: '#565656', flexGrow: 1, fontSize: '15px' }}>
              {item?.description}
            </Typography>

            <Box sx={{display: 'flex', gap: 3, mt: 2}}>
              <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <AccessTimeIcon sx={{ fontSize: 18, color: '#A9A9A9' }} />
                <Typography sx={{ fontSize: 14, color: '#A9A9A9' }}>
                  {diffDays} ngày
                </Typography>
              </Box>
              <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <PeopleOutlineIcon sx={{ fontSize: 18, color: '#A9A9A9' }} />
                <Typography sx={{ fontSize: 14, color: '#A9A9A9' }}>
                  20 người
                </Typography>
              </Box>
              <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <FlagIcon sx={{ fontSize: 18, color: '#A9A9A9' }} />
                <Typography sx={{ fontSize: 14, color: '#A9A9A9' }}>
                  {item?.categories?.number} địa điểm
                </Typography>
              </Box>
              <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <DirectionsBoatIcon sx={{ fontSize: 18, color: '#A9A9A9' }} />
                <Typography sx={{ fontSize: 14, color: '#A9A9A9' }}>
                  Tàu + Ô tô
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box 
            sx={{ 
              width: '220px', 
              borderLeft: '3px dashed #ccc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              gap: 1,
              position: 'relative' // để absolute bám vào
            }}
          >
            {/* Hình tròn trên */}
            <Box
              sx={{
                width: 52,
                height: 52,
                bgcolor: '#D9D9D9', 
                borderRadius: '50%',
                position: 'absolute',
                top: -26,             
                left: -26,            
                border: '1px solid #D9D9D9',
                boxShadow: '0 4px 4px #00000040',
              }}
            />

            {/* Hình tròn dưới */}
            <Box
              sx={{
                width: 52,
                height: 52,
                bgcolor: '#D9D9D9',
                borderRadius: '50%',
                position: 'absolute',
                bottom: -26,
                left: -26,
                border: '1px solid #D9D9D9',
                boxShadow: '0 4px 4px #00000040',
              }}
            />

            <Typography sx={{ color: '#A9A9A9', fontWeight: 400, fontSize: '14px' }}>
              3,014 Review
            </Typography>
            <Rating value={5} readOnly size="medium" /><br />
            <Typography sx={{ fontWeight: 600, fontSize: 20, color: '#343434' }}>
              {item?.cost?.toLocaleString()} VND
            </Typography>
            <Typography variant="body2" sx={{ color: '#343434', fontWeight: 600, fontSize: '20px' }}>
              / người
            </Typography>
            <Button
              variant='outlined'
              sx={{
                mt: 1,
                px: 3,
                py: 1,
                color: '#1C5C80',
                border: 'solid 1px #1C5C80',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': { bgcolor: '#1C5C80', color: 'white' }
              }}
            >
              Đặt ngay
            </Button>
          </Box>

        </Box>
      )})}
      </Box><br />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
      </Box>
    </Box>
  )
}

export default HotTour
