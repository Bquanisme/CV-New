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
import PaginationControl from "../paginationControl";
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2, pt: 0, position: 'relative'}}>
      <Box sx={{ display: "flex", justifyContent: 'right'}}>
        <TourismMenuSelect setSortOrder={setSortOrder}/>
      </Box>
      {data?.map((item: any) => (
        <Box
          key={item?.id}
          onClick={() => handleDetail(item?.id)}
          sx={{
            display: "flex",
            bgcolor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            overflow: "hidden",
            width: "100%",
            mx: "auto",
            flexWrap: 'wrap',
            position: "relative",
            border: "1px solid #EFEFEF",
            "&:hover": { 
              bgcolor: "rgba(249, 249, 249, 1)",
              cursor: 'pointer'
            },
          }}
        >
          {/* Ảnh bên trái */}
          <Box
            sx={{
              position: "relative",
              width: 400,
              height: 250,
              flexShrink: 0,
              borderTopLeftRadius: "16px",
              borderBottomLeftRadius: "16px",
              overflow: "hidden",
            }}
          >
            <Image
              src={item?.logo}
              alt={item?.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Nội dung bên phải */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}
          >

            <IconButton
              onClick={() => toggleLike(item?.id)}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              }}
            >
              {liked[item?.id] ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "gray" }} />
              )}
            </IconButton>


            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 600,
                color: "#002855",
                mb: 1,
                mr: 8
              }}
            >
              {item?.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Rating value={5} precision={0.1} readOnly size="small" />
              <Typography sx={{ color: "#D32F2F", fontSize: 14 }}>
                4.4 Rất tốt
              </Typography>
              <Typography sx={{ color: "#757575", fontSize: 14 }}>
                (1.27k đánh giá)
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
              {["Bãi biển", "Hòn Tằm", "Kim Sơn"].map((tag, idx) => (
                <Chip
                  key={idx}
                  label={tag}
                  sx={{
                    fontSize: 13,
                    bgcolor: "transparent",
                    border: "1px solid #1976d2",
                    color: "#1976d2",
                    height: 26,
                  }}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <LocationOnIcon sx={{ fontSize: 18, color: "#1976d2" }} />
              <Typography sx={{ fontSize: 14, color: "#1976d2" }}>
                44-46 Lê Thánh Tôn, Lộc Thọ, Nha Trang
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 14, color: "#D32F2F" }}>
              * Trẻ em dưới 4 tuổi miễn phí
            </Typography>

            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                right: 24,
                textAlign: "right",
              }}
            >
              <Typography sx={{ fontSize: 16, color: "#333", fontWeight: 500 }}>
                Giá vé:
              </Typography>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#D32F2F",
                  mt: 0.5,
                }}
              >
                {item?.cost?.toLocaleString()} đ
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: 'right'}}>
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
