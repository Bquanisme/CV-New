"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { TourismIdBreadcrumbs } from "@/components/otherComponents/breadcrumbs";
import Introduce from "@/components/detailComponents/introduce";
import TicketPrice from "@/components/detailComponents/ticketPrice";
import PictureTour from "@/components/detailComponents/pictureTour";
import EvaluateAndComment from "@/components/detailComponents/evaluateAndComment";
import BoxContactTour from "@/components/detailComponents/boxContactTour";

import Banner from "../../../../../assets/DetailImage.jpg";
import TourImage from "../../../../../assets/tour-dao1.jpg";

import LocationPinIcon from "@mui/icons-material/LocationOn";
import ClassIcon from "@mui/icons-material/Class";
import StarIcon from "@mui/icons-material/Star";
import PhotoIcon from "@mui/icons-material/Photo";
import MapIcon from "@mui/icons-material/Map";

import { IHotTour } from "@/typescript/home";
import { fetchDetail } from "@/api/home/api.home";

type IProps = {
  id: string;
};

const menuItems = [
  { icon: <ClassIcon />, text: "Giới thiệu", id: "introduce" },
  { icon: <ClassIcon />, text: "Giá vé", id: "price" },
  { icon: <PhotoIcon />, text: "Hình ảnh", id: "gallery" },
  { icon: <StarIcon />, text: "Đánh giá & Bình luận", id: "review" },
  { icon: <MapIcon />, text: "Bản đồ", id: "map" },
];

const DetailUI = ({ id }: IProps) => {
  const { data, error } = useQuery<IHotTour>({
    queryKey: ["detail", id],
    queryFn: () => fetchDetail(Number(id)),
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (error) return <p>Lỗi: {(error as Error).message}</p>;

  return (
    <Box sx={{ bgcolor: "#f4f0f0ff", overflowX: "hidden" }}>
      <Box sx={{ position: "relative", width: "100%", height: { xs: 260, md: 382 } }}>
        <Image
          src={Banner}
          alt="Header"
          fill
          style={{ objectFit: "cover", opacity: 0.9 }}
        />

        {/* Breadcrumb */}
        <Box sx={{ position: "absolute", top: 12, left: { xs: 16, md: "15%" } }}>
          <TourismIdBreadcrumbs id={id} data={data} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: { xs: -180, md: -170 },
            left: { xs: 16, md: "15%" },
            right: { xs: 16, md: "9%" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            alignItems: { xs: "flex-start", md: "flex-end" },
          }}
        >
          <Image
            src={data?.logo || TourImage}
            alt="Logo"
            width={230}
            height={230}
            style={{
              objectFit: "cover",
              borderRadius: 10,
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: 22, sm: 22, md: 24, lg: 30 },
                color: "#E54141",
                fontFamily: "SVN-Gilroy",

                maxWidth: {
                  xs: "100%",
                  sm: "100%",
                  md: "100%",
                  lg: "65%",
                },

                display: "-webkit-box",
                WebkitLineClamp: { xs: 2, sm: 2, md: 2, lg: 3 },
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.25,
              }}
            >
              {data?.name}
            </Typography>


            <Box sx={{ display: "flex", gap: 2, mt: 1.5, flexWrap: "wrap" }}>
              <Rating value={5} readOnly />
              <Typography color="error" fontWeight={600}>
                4.4 Rất tốt
              </Typography>
              <Typography color="#3C3C3C">(1.27k đánh giá)</Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <LocationPinIcon color="primary" />
              <Typography color="#4475F2">
                Số 1, Cầu Đá, Nha Trang, Khánh Hòa
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mt: { xs: 22, md: 30 },
          px: { xs: 2, md: "15%" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: "4%" },
        }}
      >
        <Box
          sx={{
            flex: "0 0 180px",
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 2,
            overflowX: { xs: "auto", md: "unset" },
            position: { md: "sticky" },
            top: { md: 120 },
            whiteSpace: "nowrap",
          }}
        >
          {menuItems.map((item) => (
            <Box
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { color: "#4475F2" },
              }}
            >
              {item.icon}
              <Typography fontWeight={500}>{item.text}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box id="introduce">
            <Introduce data={data} />
          </Box>

          <Box id="price" mt={4}>
            <TicketPrice data={data} />
          </Box>

          <Box id="gallery" mt={8}>
            <PictureTour data={data} />
          </Box>

          <Box id="review" mt={8}>
            <EvaluateAndComment id={id} />
          </Box>

          <Box id="map" mt={8}>

          </Box>
        </Box>

        <Box
          sx={{
            flexShrink: 0,

            width: {
              xs: "100%",
              sm: "100%",
              md: 360,   // ⬅️ tablet
              lg: 420,   // desktop
            },

            position: {
              xs: "static",
              sm: "static",
              md: "sticky",
            },

            top: { md: 120 },
          }}
        >
          <BoxContactTour id={id} />
        </Box>
      </Box>
    </Box>
  );
};

export default DetailUI;
