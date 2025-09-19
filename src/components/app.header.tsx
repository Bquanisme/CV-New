"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ App Router
import header from "../assets/header.jpg";

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
          justifyContent: "space-between",
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
            const isActive = pathname === item.href; // kiểm tra link active

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
                    color: isActive ? "#90caf9" : "white",
                    transition: "0.3s",
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default AppHeader;
