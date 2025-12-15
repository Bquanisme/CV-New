'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { IUser } from '@/typescript/home';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

type IProps = {
    anchorEl: null | HTMLElement
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
    data: IUser | undefined
};

export default function AppMenuCheck(props: IProps) {

    const { anchorEl, setAnchorEl, data } = props

    const router = useRouter();

    const openMenu = Boolean(anchorEl);
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            {data
                && (<Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={openMenu}
                        onClose={handleCloseMenu}
                        onClick={handleCloseMenu}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Button
                            sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: '#E54141',
                                m: 1,
                                borderRadius: "10px",
                                textTransform: 'none',
                                width: 237,
                                height: 45,
                                color: 'white'
                            }}
                            onClick={() => router.push('/')}
                        >
                            Trang chủ
                        </Button>
                    </Menu>
                </Box>)
            }
        </React.Fragment>
    );
}
