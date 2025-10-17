import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
import { TourismIdBreadcrumbs } from '@/components/breadcrumbs'
import Image from 'next/image'
import Banner from "../../../../assets/DetailImage.jpg"
import { useQuery } from '@tanstack/react-query'
import { IHotTour } from '@/typescript/home'
import { fetchDetailTour } from '@/api/home/api.home'
import Rating from '@mui/material/Rating'
import LocationPinIcon from '@mui/icons-material/LocationPin';
import ClassIcon from '@mui/icons-material/Class';
import StarIcon from '@mui/icons-material/Star';
import PhotoIcon from '@mui/icons-material/Photo';
import MapIcon from '@mui/icons-material/Map';
import Button from '@mui/material/Button'


type IProps = {
    id: string
}

const DetailUI = ({ id }: IProps) => {
  const { data, error } = useQuery<IHotTour>({
    queryKey: ["detailTour", id],
    queryFn: () => fetchDetailTour(Number(id)),
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (error) return <p>Lỗi: {(error as Error).message}</p>;

  return (
    <Box sx={{bgcolor: '#f4f0f0ff', display: 'flex', flexDirection: 'column', gap: 10}}>
      <Box sx={{ position: "relative", width: "100%", height: "382px" }}>
        <Image
          priority={false}
          src={Banner}
          alt="Header"
          fill
          style={{ objectFit: "cover", opacity: 0.9 }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 301,
            width: "100%",
            color: "white",
            fontSize: 14,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TourismIdBreadcrumbs id={id} data={data} />
        </Box>

        {/* Logo + Thông tin + Button */}
        <Box
          sx={{
            position: "absolute",
            top: "315px",
            left: 301,
            right: 40,
            width: "calc(100% - 340px)",
            display: "flex",
            justifyContent: "space-between", 
            alignItems: "flex-end",
            gap: 4,
          }}
        >
          {/* Logo */}
          <Image
            priority={false}
            src={data?.logo}
            alt="Logo"
            width={224}
            height={224}
            style={{
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          />

          {/* Thông tin chi tiết */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              flex: 1, // 👈 giúp text co giãn giữa logo & nút
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "35px",
                color: "#E54141",
                fontFamily: "SVN-Gilroy",
              }}
            >
              {data?.name}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
              <Rating value={5} readOnly size="medium" />
              <Typography
                color="error"
                fontSize="16px"
                sx={{ fontWeight: 600, fontFamily: "Inter" }}
              >
                Đánh giá: 4.4 Rất tốt
              </Typography>
              <Typography
                color="#3C3C3C"
                fontSize="16px"
                sx={{ fontWeight: 600, fontFamily: "Inter" }}
              >
                (1.27k đánh giá)
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mt: 1.5 }}>
              <LocationPinIcon color="primary" />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#4475F2",
                  fontFamily: "Inter",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Số 1, Cầu Đá, Nha Trang, Khánh Hòa
              </Typography>
            </Box>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Button
              variant="contained"
              color="error"
              sx={{
                width: 311,
                height: 51,
                fontWeight: 700,
                fontSize: "18px",
                color: "#FFFFFF",
                fontFamily: "SVN-Gilroy",
                flexShrink: 0,
              }}
            >
              Liên hệ đặt vé
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{
                width: 311,
                height: 51,
                fontWeight: 700,
                fontSize: "18px",
                color: "#E54141",
                fontFamily: "SVN-Gilroy",
                flexShrink: 0,
              }}
            >
              VIẾT BÌNH LUẬN
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{
        mt: 15, 
        pl: '300px', 
        display: 'flex',
        justifyContent: 'space-between'
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <Box sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center'
          }}>
            <ClassIcon />
            <Typography 
            sx={{
              fontWeight: 500, 
              fontSize: '16px',
              color: '#343434',
              fontFamily: 'Inter'
            }}>
              Giới thiệu
            </Typography><br />
          </Box>
          <Box sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center'
          }}>
            <ClassIcon />
            <Typography 
            sx={{
              fontWeight: 500, 
              fontSize: '16px',
              color: '#343434',
              fontFamily: 'Inter'
            }}>
              Giá vé
            </Typography><br />
          </Box>
          <Box sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center'
          }}>
            <PhotoIcon />
            <Typography 
            sx={{
              fontWeight: 500, 
              fontSize: '16px',
              color: '#343434',
              fontFamily: 'Inter'
            }}>
              Hình ảnh
            </Typography><br />
          </Box>
          <Box sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center'
          }}>
            <StarIcon />
            <Typography 
            sx={{
              fontWeight: 500, 
              fontSize: '16px',
              color: '#343434',
              fontFamily: 'Inter'
            }}>
              Đánh giá & Bình luận
            </Typography><br />
          </Box>
          <Box sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center'
          }}>
            <MapIcon />
            <Typography 
            sx={{
              fontWeight: 500, 
              fontSize: '16px',
              color: '#343434',
              fontFamily: 'Inter'
            }}>
              Bản đồ
            </Typography><br />
          </Box>
        </Box>
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
      </Box>
      </Box>
    </Box>
  )
}

export default DetailUI
