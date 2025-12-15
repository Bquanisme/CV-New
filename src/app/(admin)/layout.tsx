'use client';
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Drawer,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Collapse,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/avatarLogo.jpg';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/Slice/authSlice';
import { toast } from 'react-toastify';

const drawerWidth = 320;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { admin } = useAppSelector((state) => state.auth);

    // Responsive flag
    const isMobile = useMediaQuery("(max-width:1024px)");

    // Drawer open state
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    // Submenu toggles
    const [openUsers, setOpenUsers] = useState(false);

    const handleLogout = async () => {
        await dispatch(logout());
        router.push('/');
        toast.success('Bạn đã đăng xuất thành công!');
    };

    const drawerContent = (
        <Box sx={{ px: 2 }}>
            <Toolbar />

            <Typography
                variant="h6"
                textAlign="center"
                fontFamily="Inter"
                fontWeight={600}
                mb={3}
            >
                Admin
            </Typography>

            <List>

                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/dashboard"
                        selected={pathname === "/dashboard"}
                        sx={{ borderRadius: 2, mx: 1, my: 0.4 }}
                    >
                        <ListItemIcon>
                            <DashboardIcon color={pathname === "/dashboard" ? "primary" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => setOpenUsers(prev => !prev)}
                        sx={{ borderRadius: 2, mx: 1, my: 0.4 }}
                    >
                        <ListItemIcon>
                            <PersonOutlineIcon color={openUsers ? "primary" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText primary="Manage Users" />
                        {openUsers ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>

                <Collapse in={openUsers} timeout="auto" unmountOnExit>
                    <List sx={{ ml: 4 }}>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href="/customer"
                                selected={pathname === "/customer"}
                                sx={{ borderRadius: 2, my: 0.4 }}
                            >
                                <ListItemIcon><PeopleOutlineIcon /></ListItemIcon>
                                <ListItemText primary="Customer" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href="/staff"
                                selected={pathname === "/staff"}
                                sx={{ borderRadius: 2, my: 0.4 }}
                            >
                                <ListItemIcon><PeopleOutlineIcon /></ListItemIcon>
                                <ListItemText primary="Staff" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>

                {/* CATEGORY */}
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/category"
                        selected={pathname === "/category"}
                        sx={{ borderRadius: 2, mx: 1, my: 0.4 }}
                    >
                        <ListItemIcon><ListAltIcon /></ListItemIcon>
                        <ListItemText primary="Category" />
                    </ListItemButton>
                </ListItem>

                {/* MANAGE TOUR */}
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/manageTour"
                        selected={pathname === "/manageTour"}
                        sx={{ borderRadius: 2, mx: 1, my: 0.4 }}
                    >
                        <ListItemIcon><ListAltIcon /></ListItemIcon>
                        <ListItemText primary="Manage Tour" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/cancelRequest"
                        selected={pathname === "/cancelRequest"}
                        sx={{ borderRadius: 2, mx: 1, my: 0.4 }}
                    >
                        <ListItemIcon><ListAltIcon /></ListItemIcon>
                        <ListItemText primary="Cancel Request" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/manageOrders"
                        selected={pathname === "/manageOrders"}
                        sx={{ borderRadius: 2, mx: 1, my: 0.4 }}
                    >
                        <ListItemIcon><PaidIcon /></ListItemIcon>
                        <ListItemText primary="Manage Orders" />
                    </ListItemButton>
                </ListItem>

            </List>

            <Divider sx={{ my: 3 }} />

            {/* LOGOUT */}
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            mx: 1,
                            borderRadius: 2,
                            "&:hover": { backgroundColor: "rgba(244,67,54,0.1)" },
                        }}
                    >
                        <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
                        <ListItemText primary="Đăng xuất" sx={{ color: "error.main" }} />
                    </ListItemButton>
                </ListItem>
            </List>

        </Box>
    );

    return (
        <Box sx={{ display: "flex", bgcolor: "#f8f9fb", minHeight: "100vh" }}>

            {isMobile && (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}


            {!isMobile && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            <Box component="main" sx={{ flexGrow: 1, p: 3, }}>

                {isMobile && (
                    <IconButton onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                )}
                {/* HEADER */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    {/* {isMobile && (
                        <IconButton onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    )} */}

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Image
                            src={admin?.avatar || logo}
                            alt="avatar"
                            width={38}
                            height={38}
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                        <Typography sx={{ fontWeight: 600 }}>
                            {admin?.display_name}
                        </Typography>
                    </Box>
                </Box>
                <Divider sx={{ my: 3 }} />
                {children}
            </Box>

        </Box>
    );
}
