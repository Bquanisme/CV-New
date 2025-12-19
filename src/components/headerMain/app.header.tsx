"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import header from "../../assets/header.jpg";
import logo from "../../assets/avatarLogo.jpg";
import { useQuery } from "@tanstack/react-query";
import { fetchHeaderUser } from "@/api/home/api.home";
import { IUser } from "@/typescript/home";
import HeaderBookingList from "../headerMain/header.bookingList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppMenu from "../headerMain/app.menu";
import { useAppSelector } from "@/redux/hooks";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppContact from "../headerMain/app.contact";
import Drawer from "@mui/material/Drawer";

const AppHeader = () => {
  const pathname = usePathname();
  const id = useAppSelector((state) => state.auth?.user?.id);
  
  const [contact, setContact] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openRegister, setOpenRegister] = React.useState(false);

  // Menu dropdown cho nav
  const [navMenu, setNavMenu] = React.useState({
    el: null as HTMLElement | null,
    label: null as string | null,
  });

  // Drawer mobile
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleNavMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    label: string
  ) => setNavMenu({ el: event.currentTarget, label });

  const handleNavMenuClose = () => setNavMenu({ el: null, label: null });

  const handleOpenContact = () => setContact(true);
  const handleCloseContact = () => setContact(false);

  const { data, error } = useQuery<IUser>({
    queryKey: ["headerUser", id],
    queryFn: () => fetchHeaderUser(id!),
    enabled: !!id,
    staleTime: Infinity,
  });

  if (error) return <p>Lỗi: {(error as Error).message}</p>;

  const navItems = [
    { label: "Trang chủ", href: "/" },
    {
      label: "Điểm đến",
      children: [
        { label: "Điểm du lịch", href: "/travel" },
        { label: "Nơi cư trú", href: "/hotel" },
      ],
    },
    { label: "Tour", href: "/tour" },
    { label: "Tin tức", href: "/new" },
    { label: "Liên hệ", onClick: handleOpenContact },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#001A40",
        color: "white",
        width: "100%",
        height: { xs: "70px", md: "89px" },
        px: { xs: 2, md: 3 },
        position: "sticky",
        top: 0,
        zIndex: 1200,
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
            width={70}
            height={70}
            style={{
              borderRadius: 8,
              width: "auto",
              height: "auto",
              maxWidth: 55,
              maxHeight: 55,
            }}
          />
        </Link>

        {/* Navigation Desktop */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: { md: 4, lg: 7 },
            alignItems: "center",
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            if (item.children) {
              return (
                <Box key={item.label}>
                  <Typography
                    onClick={(e) => handleNavMenuClick(e, item.label)}
                    sx={{
                      cursor: "pointer",
                      fontSize: { md: "15px", lg: "16px" },
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      "&:hover": { color: "#f9b190ff" },
                    }}
                  >
                    {item.label}
                    <ArrowDropDownIcon />
                  </Typography>

                  <Menu
                    anchorEl={
                      navMenu.label === item.label ? navMenu.el : null
                    }
                    open={navMenu.label === item.label}
                    onClose={handleNavMenuClose}
                  >
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.href}
                        onClick={handleNavMenuClose}
                        sx={{ width: 192 }}
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

            if (item.onClick) {
              return (
                <Typography
                  key={item.label}
                  onClick={item.onClick}
                  sx={{
                    cursor: "pointer",
                    fontSize: { md: "15px", lg: "16px" },
                    fontWeight: 500,
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  {item.label}
                </Typography>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href!}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    cursor: "pointer",
                    fontSize: { md: "15px", lg: "16px" },
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#ffb300" : "white",
                    py: 0.5,
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            );
          })}
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3,
          }}
        >
          <HeaderBookingList />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Image
              src={data?.avatar || logo}
              alt="User"
              width={38}
              height={38}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
            <Typography
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ fontWeight: 600, fontSize: "16px", cursor: "pointer" }}
            >
              {data?.display_name || "Tài khoản"}
            </Typography>
            <ArrowDropDownIcon
              onClick={(e: any) => setAnchorEl(e.currentTarget)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <HeaderBookingList />

          <Image
            src={data?.avatar || logo}
            width={33}
            height={33}
            alt="avatar"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />

          <Box
            onClick={() => setDrawerOpen(true)}
            sx={{ fontSize: 28, cursor: "pointer", userSelect: "none" }}
          >
            ☰
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

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 20px",
            p: 2,
            bgcolor: "#ffffff",
          },
        }}
      >
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 20,
              color: "#001A40",
            }}
          >
            Menu
          </Typography>
        </Box>

        {navItems.map((item) => {
          if (item.children) {
            return (
              <Box
                key={item.label}
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(0,0,0,0.04)",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: "#001A40",
                    mb: 1,
                  }}
                >
                  {item.label}
                </Typography>

                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setDrawerOpen(false)}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        pl: 2,
                        py: 1,
                        color: "#444",
                        fontSize: 15,
                        borderRadius: 1,
                        transition: "0.2s",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.06)",
                          color: "#001A40",
                          pl: 2.5,
                        },
                      }}
                    >
                      {child.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            );
          }

          if (item.onClick) {
            return (
              <Typography
                key={item.label}
                onClick={() => {
                  item.onClick?.();
                  setDrawerOpen(false);
                }}
                sx={{
                  cursor: "pointer",
                  py: 1.5,
                  fontSize: 16,
                  color: "#001A40",
                  fontWeight: 600,
                  borderRadius: 1,
                  px: 1,
                  mb: 1,
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.06)",
                    pl: 1.5,
                  },
                }}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              onClick={() => setDrawerOpen(false)}
              style={{ textDecoration: "none" }}
            >
              <Typography
                sx={{
                  py: 1.5,
                  fontSize: 16,
                  color: "#001A40",
                  fontWeight: 600,
                  borderRadius: 1,
                  px: 1,
                  mb: 1,
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.06)",
                    pl: 1.5,
                  },
                }}
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}

        <Box sx={{ mt: 3, borderTop: "1px solid #ddd", pt: 2 }}>
          <Typography sx={{ fontSize: 15, color: "#001A40", opacity: 0.6 }}>
            © 2025 Dịch vụ du lịch
          </Typography>
        </Box>
      </Drawer>


      <AppContact contact={contact} handleCloseContact={handleCloseContact} />
    </Box>
  );
};

export default AppHeader;
