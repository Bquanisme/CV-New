"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import header from "../assets/header.jpg";
import logo from "../assets/avatarLogo.jpg";
import { useQuery } from "@tanstack/react-query";
import { fetchHeaderUser } from "@/api/home/api.home";
import { IUser } from "@/typescript/home";
import HeaderBookingList from "./header.bookingList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppMenu from "./app.menu";
import { useAppSelector } from "@/redux/hooks";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppContact from "./app.contact";

const AppHeader = () => {
  const pathname = usePathname();
  const id = useAppSelector((state) => state.auth?.user?.id);

  // State mở modal liên hệ
  const [contact, setContact] = React.useState<boolean>(false);
  const handleOpenContact = () => setContact(true);
  const handleCloseContact = () => setContact(false);

  // State menu người dùng
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // State mở modal đăng ký
  const [openRegister, setOpenRegister] = React.useState<boolean>(false);

  // State menu cho các navItem có children
  const [navMenu, setNavMenu] = React.useState<{
    el: HTMLElement | null;
    label: string | null;
  }>({ el: null, label: null });

  const handleNavMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    label: string
  ) => setNavMenu({ el: event.currentTarget, label });

  const handleNavMenuClose = () => setNavMenu({ el: null, label: null });

  // Lấy thông tin user
  const { data, error } = useQuery<IUser>({
    queryKey: ["headerUser", id],
    queryFn: () => fetchHeaderUser(id!),
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (error) return <p>Lỗi: {(error as Error).message}</p>;

  // Navigation
  const navItems = [
    { label: "Trang chủ", href: "/" },
    {
      label: "Điểm đến",
      children: [
        { label: "Điểm du lịch", href: "/travel" },
        { label: "Nơi cư trú", href: "/hotel" },
        { label: "Ăn uống", href: "/food" },
        { label: "Giải trí", href: "/entertainment" },
      ],
    },
    { label: "Tour", href: "/tour" },
    { label: "Thuê tàu xe", href: "/rent" },
    { label: "Tin tức", href: "/new" },
    // Thêm sự kiện mở modal liên hệ
    { label: "Liên hệ", onClick: handleOpenContact },
  ];

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
        <Box sx={{ display: "flex", gap: 8 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            // Nếu có children → tạo dropdown
            if (item.children) {
              return (
                <Box key={item.label}>
                  <Typography
                    onClick={(e) => handleNavMenuClick(e, item.label)}
                    sx={{
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      "&:hover": { color: "#f9b190ff" },
                    }}
                  >
                    {item.label}
                    <ArrowDropDownIcon />
                  </Typography>

                  <Menu
                    anchorEl={navMenu.label === item.label ? navMenu.el : null}
                    open={navMenu.label === item.label}
                    onClose={handleNavMenuClose}
                  >
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.href}
                        onClick={handleNavMenuClose}
                        sx={{ width: 192, borderBottom: "solid 1px #DAD9D9" }}
                      >
                        <Link
                          href={child.href}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          {child.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              );
            }

            // Nếu có onClick (Liên hệ)
            if (item.onClick) {
              return (
                <Typography
                  key={item.label}
                  onClick={item.onClick}
                  sx={{
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "white",
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  {item.label}
                </Typography>
              );
            }

            // Mặc định có href → Link
            return (
              <Link
                key={item.label}
                href={item.href!}
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
                    "&:hover": { color: "#90caf9" },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: isActive ? "100%" : "0%",
                      height: "2px",
                      backgroundColor: "#ffb300",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": { width: "100%" },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            );
          })}
        </Box>

        {/* Khu vực tài khoản & booking */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <HeaderBookingList />

          <Box>
            {data?.display_name ? (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={data?.avatar || logo}
                  alt="User"
                  width={38}
                  height={38}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                />
                <Typography
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    fontFamily: "SVN-Gilroy",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  {data?.display_name}
                </Typography>
                <Box
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                >
                  <ArrowDropDownIcon />
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={logo}
                  alt="Default Avatar"
                  width={38}
                  height={38}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                />
                <Typography
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    fontFamily: "SVN-Gilroy",
                    fontWeight: 600,
                    fontSize: "16px",
                  }}
                >
                  Tài khoản
                </Typography>
                <Box
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                >
                  <ArrowDropDownIcon />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <AppMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        data={data}
        openRegister={openRegister}
        setOpenRegister={setOpenRegister}
      />

      <AppContact contact={contact} handleCloseContact={handleCloseContact}/>
    </Box>
  );
};

export default AppHeader;
