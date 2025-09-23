"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ App Router
import header from "../assets/header.jpg";
import HeaderBookingList from "./header.bookingList";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Điểm đến", href: "/destination" },
  { label: "Tour", href: "/tour" },
  { label: "Thuê tàu xe", href: "/rent" },
  { label: "Tin tức", href: "/new" },
  { label: "Liên hệ", href: "/contact" },
];

const AppHeader = () => {
  const pathname = usePathname(); // lấy đường dẫn hiện tại

  return (
    <Box
      sx={{
        bgcolor: "#001A40",
        color: "white",
        width: "100%",
        height: "89px",
        px: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={header}
            alt="Header"
            width={77}
            height={77}
            style={{ borderRadius: 8 }}
          />
        </Link>

        {/* Navigation */}
        <Box sx={{ display: "flex", gap: 5 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href; // quan trọng, ktra link active

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#ffb300" : "white", 
                    position: "relative",
                    paddingBottom: "4px",
                    transition: "all 0.3s ease",
                    "&:hover": { 
                      color: "#90caf9" 
                    },

                    "&::after": {
                      content: '""', //phần tử ảo
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: isActive ? "100%" : "0%",
                      height: "2px",
                      backgroundColor: "#ffb300",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            );
          })}
        </Box>

        <Box sx={{display: 'flex', gap: 2}}>
          <HeaderBookingList />
        </Box>
      </Box>
    </Box>
  );
};

export default AppHeader;
