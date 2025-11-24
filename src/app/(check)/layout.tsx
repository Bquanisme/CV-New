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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PlaceIcon from '@mui/icons-material/Place';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/avatarLogo.jpg';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/typescript/home';
import { fetchHeaderUser } from '@/api/home/api.home';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import AppMenuCheck from '@/components/app.menuCheck';
import { CartBreadcrumbs } from '@/components/breadcrumbs';
import { logout } from '@/redux/Slice/authSlice';
import { toast } from 'react-toastify';

const drawerWidth = 360;

export default function CheckLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useAppSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { data } = useQuery<IUser>({
        queryKey: ['headerUser', user?.id],
        queryFn: () => fetchHeaderUser(user?.id!),
        enabled: !!user?.id,
    });

    const menuItems = [
        {
            title: 'Cá nhân',
            items: [
                { text: 'Thông tin cá nhân', icon: <AccountCircleIcon />, href: '/individualUser' },
                { text: 'Đổi mật khẩu', icon: <LockIcon />, href: '/changePassword' },
            ],
        },
        {
            title: 'Đơn hàng',
            items: [{ text: 'Lịch sử', icon: <HistoryIcon color="error" />, href: '/cart' }],
        },
    ];

    const menuLiked = [
        {
            title: 'Yêu thích',
            items: [
                { text: 'Tour', icon: <FavoriteIcon /> },
                { text: 'Khách sạn', icon: <HotelIcon /> },
                { text: 'Ăn uống', icon: <RestaurantIcon /> },
                { text: 'Điểm du lịch', icon: <PlaceIcon /> },
            ],
        },
    ]

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
                <Box sx={{ p: 2, pt: 0 }}>
                    {menuItems.map((section, index) => (
                        <Box key={index}>
                            <Typography
                                variant="h6"
                                fontWeight={500}
                                fontSize="14px"
                                fontFamily="Inter"
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

                    {menuLiked.map((section, index) => (
                        <Box key={index}>
                            <Typography
                                variant="h6"
                                fontWeight={500}
                                fontSize="14px"
                                fontFamily="Inter"
                                my={2}
                                ml={2}
                            >
                                {section.title}
                            </Typography>
                            <List>
                                {section.items.map((item) => {
                                    return (
                                        <ListItem disablePadding key={item.text}>
                                            <ListItemButton
                                                sx={{
                                                    borderRadius: 2,
                                                    mx: 1,
                                                    my: 0.3,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(25,118,210,0.08)',
                                                        transform: 'translateX(3px)',
                                                        transition: '0.25s',
                                                    },
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 40,
                                                    }}
                                                >
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.text}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
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
                    <CartBreadcrumbs pathname={pathname} />
                    {data?.display_name && (
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            <Image
                                src={data?.avatar || logo}
                                alt="User"
                                width={38}
                                height={38}
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <Typography sx={{ fontFamily: 'SVN-Gilroy', fontWeight: 600, fontSize: '16px' }}>
                                {data?.display_name}
                            </Typography>
                            <ArrowDropDownIcon />
                        </Box>
                    )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Nội dung trang */}
                {children}
            </Box>

            <AppMenuCheck anchorEl={anchorEl} setAnchorEl={setAnchorEl} data={data} />
        </Box>
    );
}
