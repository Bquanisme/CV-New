'use client';
import React from 'react';
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
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/avatarLogo.jpg';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AdminBreadcrumbs } from '@/components/breadcrumbs';
import { logout } from '@/redux/Slice/authSlice';
import { toast } from 'react-toastify';

const drawerWidth = 360;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { admin } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const menuItems = [
        {
            title: 'Admin',
            items: [
                { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
                { text: 'Customer', icon: <PeopleOutlineIcon />, href: '/customer' },
                { text: 'Staff', icon: <PeopleOutlineIcon />, href: '/staff' },
                { text: 'Category', icon: <ListAltIcon />, href: '/category' },
                { text: 'Manage Tour', icon: <ListAltIcon />, href: '/manageTour' },
                { text: 'Cancel Request', icon: <ListAltIcon />, href: '/cancelRequest' },
                { text: 'Manage Orders', icon: <PaidIcon />, href: '/manageOrders' },
            ],
        },
    ];

    const handleLogout = async () => {
        await dispatch(logout());
        router.push('/');
        toast.success('Bạn đã đăng xuất thành công!');
    }

    return (
        <Box
            sx={{
                display: "flex",
                bgcolor: '#f8f9fb',
                minHeight: "100vh", //phủ toàn màn hình
            }}
        >
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#fff',
                        borderRight: '1px solid #eee',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ px: 2, pt: 0 }}>
                    {menuItems.map((section, index) => (
                        <Box key={index}>
                            <Typography
                                variant="h6"
                                fontWeight={500}
                                fontSize="18px"
                                fontFamily="Inter"
                                textAlign='center'
                                my={2}
                                ml={2}
                            >
                                {section.title}
                            </Typography>
                            <List>
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <ListItem disablePadding key={item.text}>
                                            <ListItemButton
                                                component={Link}
                                                href={item.href}
                                                selected={isActive}
                                                sx={{
                                                    borderRadius: 2,
                                                    mx: 1,
                                                    my: 0.3,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(25,118,210,0.08)',
                                                        transform: 'translateX(3px)',
                                                        transition: '0.25s',
                                                    },
                                                    ...(isActive && {
                                                        backgroundColor: 'rgba(25,118,210,0.12)',
                                                        fontWeight: 600,
                                                    }),
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        color: isActive ? 'primary.main' : 'text.secondary',
                                                        minWidth: 40,
                                                    }}
                                                >
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.text}
                                                    sx={{
                                                        fontWeight: isActive ? 600 : 400,
                                                        color: isActive ? 'primary.main' : 'text.primary',
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                            {index < menuItems.length - 1 && <Divider sx={{ my: 2 }} />}
                        </Box>
                    ))}

                    <Divider sx={{ my: 2 }} />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    mx: 1,
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'rgba(244,67,54,0.1)',
                                        transition: '0.25s',
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <LogoutIcon color="error" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Đăng xuất"
                                    primaryTypographyProps={{ color: 'error.main', fontWeight: 500 }}
                                    onClick={handleLogout}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* --- Nội dung chính --- */}
            <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AdminBreadcrumbs pathname={pathname} />
                    {admin?.display_name && (
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                        >
                            <Image
                                src={admin?.avatar || logo}
                                alt="User"
                                width={38}
                                height={38}
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <Typography sx={{ fontFamily: 'SVN-Gilroy', fontWeight: 600, fontSize: '16px' }}>
                                {admin?.display_name}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Nội dung trang */}
                {children}
            </Box>
        </Box>
    );
}
