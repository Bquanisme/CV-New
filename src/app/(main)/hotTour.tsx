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
import CircularProgressLoading from '@/components/otherComponents/circularProgress.loading';
import { useRouter } from 'next/navigation';

const HotTour = () => {

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["travels"],
    queryFn: fetchTravels,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  if (isLoading) return <CircularProgressLoading />;

  const getDiffDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    return Math.ceil(Math.abs(e.getTime() - s.getTime()) / (1000 * 3600 * 24));
  };

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        justifyContent: 'center'
      }}>
        {data?.map((item: any) => {

          const diffDays = getDiffDays(item.start_date, item.end_date);

          return (
            <Box
              key={item?.id}
              sx={{
                width: '90%',
                maxWidth: 1320,
                bgcolor: '#fff',
                borderRadius: 4,
                display: 'flex',

                // 📌 MOBILE (column) — DESKTOP (row)
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },

                margin: '16px auto',
                border: '1px solid #D9D9D9',
                boxShadow: '0 4px 4px #00000040',
              }}
            >
              {/* IMAGE */}
              <Box sx={{
                position: "relative",
                width: { xs: '100%', md: '35%' },
                minHeight: { xs: 220, md: 278 },
                overflow: 'hidden'
              }}>
                <Image
                  src={item?.logo}
                  alt={item?.name}
                  fill
                  priority
                  style={{
                    objectFit: 'cover',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10
                  }}
                />
              </Box>

              {/* CONTENT */}
              <Box sx={{
                flex: 1,
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 3
              }}>
                <Typography sx={{ fontWeight: 600, color: '#1C5C80', fontSize: 20 }}>
                  {item?.name}
                </Typography>

                <Typography sx={{ color: '#565656', fontSize: '15px' }}>
                  {item?.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#A9A9A9' }} />
                    <Typography sx={{ fontSize: 14, color: '#A9A9A9' }}>
                      {diffDays} ngày
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <PeopleOutlineIcon sx={{ fontSize: 18, color: '#A9A9A9' }} />
                    <Typography sx={{ fontSize: 14, color: '#A9A9A9' }}>
                      20 người
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <FlagIcon sx={{ fontSize: 18, color: '#A9A9A9' }} />
                    <Typography sx={{ fontSize: 14, color: '#A9A9A9' }}>
                      {item?.categories?.number} địa điểm
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <DirectionsBoatIcon sx={{ fontSize: 18, color: '#A9A9A9' }} />
                    <Typography sx={{ fontSize: 14, color: '#A9A9A9' }}>
                      Tàu + Ô tô
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* PRICE / RATING BOX */}
              <Box
                sx={{
                  width: { xs: '100%', md: '220px' },

                  // Border responsive
                  borderLeft: { md: '3px dashed #ccc' },
                  borderTop: { xs: '3px dashed #ccc', md: 'none' },

                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  gap: 1,
                  position: 'relative'
                }}
              >
                {/* Circle top — hidden on mobile */}
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
                    display: { xs: "none", md: "block" }
                  }}
                />

                {/* Circle bottom — hidden on mobile */}
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
                    boxShadow: 'inset 0px 4px 0px #00000040',
                    display: { xs: "none", md: "block" }
                  }}
                />

                <Typography sx={{ color: "#A9A9A9", fontSize: 14 }}>
                  3,014 Review
                </Typography>

                <Rating value={5} readOnly size="medium" />

                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                  {item.cost.toLocaleString()} VND
                </Typography>

                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                  / người
                </Typography>

                <Button
                  variant="outlined"
                  onClick={() => router.push(`/travel/tourism/${item.id}`)}
                  sx={{
                    mt: 1,
                    px: 3,
                    py: 1,
                    color: "#1C5C80",
                    border: "solid 1px #1C5C80",
                    borderRadius: "10px",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#1C5C80", color: "white" }
                  }}
                >
                  Đặt ngay
                </Button>
              </Box>
            </Box>
          )
        })}
      </Box>

      {/* Button xem thêm */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => router.push("/travel/tourism")}
          sx={{
            width: 140,
            height: 56,
            bgcolor: "red",
            fontSize: 16,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { bgcolor: "darkred" }
          }}
        >
          Xem thêm
        </Button>
      </Box>
    </Box>
  )
};

export default HotTour;
