import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { RoomIdBreadcrumbs } from "@/components/breadcrumbs";
import Image from "next/image";
import Banner from "../../../../../assets/RoomDetailBanner.jpg";
import { useQuery } from "@tanstack/react-query";
import { IHotTour } from "@/typescript/home";
import { fetchDetail } from "@/api/home/api.home";
import Rating from "@mui/material/Rating";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import ClassIcon from "@mui/icons-material/Class";
import StarIcon from "@mui/icons-material/Star";
import PhotoIcon from "@mui/icons-material/Photo";
import MapIcon from "@mui/icons-material/Map";
import Introduce from "@/components/detailComponents/introduce";
import TicketPrice from "@/components/detailComponents/ticketPrice";
import PictureRoom from "@/components/detailComponents/pictureRoom";
import BoxContactRoom from "@/components/detailComponents/boxContactRoom";
import EvaluateAndComment from "@/components/evaluateAndComment";
import RoomImage from "../../../../../assets/room14.jpg";

type IProps = {
  id: string;
};

const DetailRoom = ({ id }: IProps) => {
  const { data, error } = useQuery<IHotTour>({
    queryKey: ["detail", id],
    queryFn: () => fetchDetail(Number(id)),
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (error) return <p>Lỗi: {(error as Error).message}</p>;

  return (
    <Box
      sx={{
        bgcolor: "#f4f0f0ff",
        overflowX: "hidden",
        width: "100vw",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Banner */}
      <Box sx={{ position: "relative", width: "100%", height: "382px" }}>
        <Image
          priority={false}
          src={Banner}
          alt="Header"
          fill
          style={{
            objectFit: "cover",       // giữ tỉ lệ, lấp kín box
            objectPosition: "center", // lấy tâm ảnh làm trung tâm
            // transform: "scale(1.2)",  // phóng to 1.2 lần
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
            bgcolor: "#5453536e ",
            color: "white",
            fontSize: 14,
          }}
        >

          {/* Breadcrumb */}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: "15%",
              color: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <RoomIdBreadcrumbs id={id} data={data} />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: -190,
            left: "15%",
            right: "9%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 4,
          }}
        >
          <Image
            priority={false}
            src={data?.logo || RoomImage}
            alt="Logo"
            width={224}
            height={224}
            style={{
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              flex: 1,
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "35px",
                color: "#E54141",
                fontFamily: "SVN-Gilroy",
                width: '70%'
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
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          my: 30,
          px: "15%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          gap: "4%",
          boxSizing: "border-box",
        }}
      >
        {/* Sidebar trái */}
        <Box
          sx={{
            flex: "0 0 180px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {[
            { icon: <ClassIcon />, text: "Giới thiệu" },
            { icon: <ClassIcon />, text: "Giá vé" },
            { icon: <PhotoIcon />, text: "Hình ảnh" },
            { icon: <StarIcon />, text: "Đánh giá & Bình luận" },
            { icon: <MapIcon />, text: "Bản đồ" },
          ].map((item, i) => (
            <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              {item.icon}
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#343434",
                  fontFamily: "Inter",
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Nội dung giữa */}
        <Box sx={{ flex: "1 1 60%", maxWidth: "60%" }}>
          <Introduce data={data} />
          <Box mt={4}>
            <TicketPrice data={data} />
          </Box>
          <Box mt={8}>
            <PictureRoom data={data} />
          </Box>
          <Box mt={8}>
            <EvaluateAndComment id={id} />
          </Box>
        </Box>

        {/* Box liên hệ phải */}
        <Box sx={{ flex: "0 0 280px" }}>
          <BoxContactRoom id={id}/>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailRoom;
