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
    IconButton,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
import AppMenuCheck from '@/components/headerMain/app.menuCheck';
import { CartBreadcrumbs } from '@/components/otherComponents/breadcrumbs';
import { logout } from '@/redux/Slice/authSlice';
import { toast } from 'react-toastify';

const drawerWidth = 320;

export default function CheckLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isMobile = useMediaQuery('(max-width:1024px)');
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleDrawer = () => setMobileOpen((prev) => !prev);

    const { data } = useQuery<IUser>({
        queryKey: ['headerUser', user?.id],
        queryFn: () => fetchHeaderUser(user?.id!),
        enabled: !!user?.id,
    });

    const handleLogout = async () => {
        await dispatch(logout());
        router.push('/');
        toast.success('Bạn đã đăng xuất thành công!');
    };

    const menuItemStyle = (active = false) => ({
        borderRadius: 2,
        mx: 1,
        my: 0.4,
        '&:hover': {
            backgroundColor: 'rgba(25,118,210,0.08)',
            transform: 'translateX(3px)',
            transition: '0.25s',
        },
        ...(active && {
            backgroundColor: 'rgba(25,118,210,0.12)',
        }),
    });

    /* ===== SIDEBAR CONTENT ===== */
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
                Tài khoản
            </Typography>

            <List>
                <Typography fontSize={13} fontWeight={600} ml={2} my={2} color="text.secondary">
                    Cá nhân
                </Typography>

                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/individualUser"
                        selected={pathname === '/individualUser'}
                        sx={menuItemStyle(pathname === '/individualUser')}
                        onClick={() => setMobileOpen(false)}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <AccountCircleIcon color={pathname === '/individualUser' ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Thông tin cá nhân" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/changePassword"
                        selected={pathname === '/changePassword'}
                        sx={menuItemStyle(pathname === '/changePassword')}
                        onClick={() => setMobileOpen(false)}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <LockIcon color={pathname === '/changePassword' ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Đổi mật khẩu" />
                    </ListItemButton>
                </ListItem>

                <Divider sx={{ my: 2 }} />

                <Typography fontSize={13} fontWeight={600} ml={2} my={2} color="text.secondary">
                    Đơn hàng
                </Typography>

                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/cart"
                        selected={pathname === '/cart'}
                        sx={menuItemStyle(pathname === '/cart')}
                        onClick={() => setMobileOpen(false)}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <HistoryIcon color={pathname === '/cart' ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary="Lịch sử đặt vé" />
                    </ListItemButton>
                </ListItem>

                <Divider sx={{ my: 2 }} />

                <Typography fontSize={13} fontWeight={600} ml={2} my={2} color="text.secondary">
                    Yêu thích
                </Typography>

                {[FavoriteIcon, HotelIcon, RestaurantIcon, PlaceIcon].map((Icon, i) => (
                    <ListItem disablePadding key={i}>
                        <ListItemButton sx={menuItemStyle()}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={['Tour', 'Khách sạn', 'Ăn uống', 'Điểm du lịch'][i]} />
                        </ListItemButton>
                    </ListItem>
                ))}

                <Divider sx={{ my: 2 }} />

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            mx: 1,
                            borderRadius: 2,
                            '&:hover': { backgroundColor: 'rgba(244,67,54,0.1)' },
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Đăng xuất"
                            primaryTypographyProps={{ color: 'error.main', fontWeight: 500 }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', bgcolor: '#f8f9fb', minHeight: '100vh' }}>
            {/* MOBILE DRAWER */}
            {isMobile && (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={toggleDrawer}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* DESKTOP DRAWER */}
            {!isMobile && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            borderRight: '1px solid #eee',
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* ===== MAIN ===== */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* HEADER */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isMobile && (
                            <IconButton onClick={toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <CartBreadcrumbs pathname={pathname} />
                    </Box>

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
                            <Typography fontWeight={600}>{data?.display_name}</Typography>
                            <ArrowDropDownIcon />
                        </Box>
                    )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {children}
            </Box>

            <AppMenuCheck anchorEl={anchorEl} setAnchorEl={setAnchorEl} data={data} />
        </Box>
    );
}
