"use client";
import {
  Box,
  Typography,
  Chip,
  Rating,
  CircularProgress,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import React, { useState } from "react";
import { ITour } from "@/typescript/home";
import TourismMenuSelect from "./tourism.menuSelect";
import PaginationControl from "../otherComponents/paginationControl";
import { useRouter } from 'next/navigation';

const TourismTicket = ({ data, isLoading, setSortOrder, page, setPage, totalPages }: ITour) => {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const router = useRouter();

  const handleDetail = (id: number) => {
    router.push(`/travel/tourism/${id}`)
  }

  const toggleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        p: { xs: 1, md: 2 },
        pt: 0,
        position: 'relative',
      }}
    >
      {/* Sort */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TourismMenuSelect setSortOrder={setSortOrder} />
      </Box>

      {data?.map((item: any) => (
        <Box
          key={item?.id}
          onClick={() => handleDetail(item?.id)}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            bgcolor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            width: '100%',
            mx: 'auto',
            position: 'relative',
            border: '1px solid #EFEFEF',
            '&:hover': {
              bgcolor: 'rgba(249,249,249,1)',
              cursor: 'pointer',
            },
          }}
        >
          {/* IMAGE */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: 400 },
              height: { xs: 200, md: 250 },
              flexShrink: 0,
            }}
          >
            <Image
              src={item?.logo}
              alt={item?.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
            />
          </Box>

          {/* CONTENT */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              position: 'relative',
            }}
          >
            {/* LIKE */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(item?.id);
              }}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                bgcolor: 'rgba(255,255,255,0.85)',
                '&:hover': { bgcolor: '#fff' },
              }}
            >
              {liked[item?.id] ? (
                <FavoriteIcon sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: 'gray' }} />
              )}
            </IconButton>

            {/* TITLE */}
            <Typography
              sx={{
                fontSize: { xs: 16, md: 20 },
                fontWeight: 600,
                color: '#002855',
                mr: 6,
              }}
            >
              {item?.name}
            </Typography>

            {/* RATING */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={5} precision={0.1} readOnly size="small" />
              <Typography sx={{ color: '#D32F2F', fontSize: 14 }}>
                4.4 Rất tốt
              </Typography>
              <Typography sx={{ color: '#757575', fontSize: 14 }}>
                (1.27k đánh giá)
              </Typography>
            </Box>

            {/* TAG */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['Bãi biển', 'Hòn Tằm', 'Kim Sơn'].map((tag, idx) => (
                <Chip
                  key={idx}
                  label={tag}
                  sx={{
                    fontSize: 13,
                    bgcolor: 'transparent',
                    border: '1px solid #1976d2',
                    color: '#1976d2',
                    height: 26,
                  }}
                />
              ))}
            </Box>

            {/* LOCATION */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ fontSize: 18, color: '#1976d2' }} />
              <Typography sx={{ fontSize: 14, color: '#1976d2' }}>
                44-46 Lê Thánh Tôn, Lộc Thọ, Nha Trang
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 14, color: '#D32F2F' }}>
              * Trẻ em dưới 4 tuổi miễn phí
            </Typography>

            {/* PRICE */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'space-between', md: 'flex-end' },
                alignItems: 'flex-end',
                mt: 'auto',
              }}
            >
              <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Typography sx={{ fontSize: 14, color: '#333' }}>
                  Giá vé
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 18, md: 24 },
                    fontWeight: 700,
                    color: '#D32F2F',
                  }}
                >
                  {item?.cost?.toLocaleString()} đ
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      {/* PAGINATION */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PaginationControl
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </Box>
    </Box>
  );

};

export default TourismTicket;
