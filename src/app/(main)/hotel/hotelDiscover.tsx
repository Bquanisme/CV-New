import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import ApiFakeHome from '@/api/api.fakeHome';
import Image from 'next/image';

const HotelDiscover = () => {
    return (
        <Box sx={{ mb: 10, px: { xs: 2, md: 0 } }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: { xs: 2, md: 3.5 },
                    width: "100%",
                    overflow: "hidden",
                    flexShrink: 1,
                }}
            >
                {/* LEFT LARGE IMAGE */}
                <Box
                    sx={{
                        position: "relative",
                        width: { xs: "32%", md: 424 },
                        height: { xs: 300, md: 574 },
                        borderRadius: 2,
                        overflow: "hidden",
                        flexShrink: 1,
                    }}
                >
                    <Image
                        src={ApiFakeHome.imageHotel[0].image}
                        alt="hotel 1"
                        fill
                        style={{ objectFit: "cover" }}
                    />

                    {/* Overlay */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 20,
                            left: 20,
                            color: "white",
                        }}
                    >
                        <Typography sx={{ fontFamily: "SVN-Gilroy", fontWeight: 700, fontSize: 25 }}>
                            Không gian ngoài trời
                        </Typography>
                        <Typography sx={{ fontFamily: "Inter", fontSize: 16 }}>
                            131 nơi lưu trú
                        </Typography>
                    </Box>
                </Box>

                {/* MIDDLE COLUMN (TWO SMALL IMAGES) */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 2, md: 1.8 },
                        width: { xs: "32%", md: 424 },
                        flexShrink: 1,
                    }}
                >
                    {/* TOP IMAGE */}
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: { xs: 140, md: 278 },
                            overflow: "hidden",
                            borderRadius: 2,
                            flexShrink: 1,
                        }}
                    >
                        <Image
                            src={ApiFakeHome.imageHotel[1].image}
                            alt="hotel 2"
                            fill
                            style={{ objectFit: "cover" }}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 20,
                                left: 20,
                                color: "white",
                            }}
                        >
                            <Typography sx={{ fontFamily: "SVN-Gilroy", fontWeight: 700, fontSize: 25 }}>
                                View biển
                            </Typography>
                            <Typography sx={{ fontFamily: "Inter", fontSize: 16 }}>
                                131 nơi lưu trú
                            </Typography>
                        </Box>
                    </Box>

                    {/* BOTTOM IMAGE */}
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: { xs: 140, md: 278 },
                            overflow: "hidden",
                            borderRadius: 2,
                            flexShrink: 1,
                        }}
                    >
                        <Image
                            src={ApiFakeHome.imageHotel[2].image}
                            alt="hotel 3"
                            fill
                            style={{ objectFit: "cover" }}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 20,
                                left: 20,
                                color: "white",
                            }}
                        >
                            <Typography sx={{ fontFamily: "SVN-Gilroy", fontWeight: 700, fontSize: 25 }}>
                                Nguyên căn
                            </Typography>
                            <Typography sx={{ fontFamily: "Inter", fontSize: 16 }}>
                                131 nơi lưu trú
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* RIGHT LARGE IMAGE */}
                <Box
                    sx={{
                        position: "relative",
                        width: { xs: "32%", md: 424 },
                        height: { xs: 300, md: 574 },
                        borderRadius: 2,
                        overflow: "hidden",
                        flexShrink: 1,
                    }}
                >
                    <Image
                        src={ApiFakeHome.imageHotel[3].image}
                        alt="hotel 4"
                        fill
                        style={{ objectFit: "cover" }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 20,
                            left: 20,
                            color: "white",
                        }}
                    >
                        <Typography sx={{ fontFamily: "SVN-Gilroy", fontWeight: 700, fontSize: 25 }}>
                            Cho phép thú cưng
                        </Typography>
                        <Typography sx={{ fontFamily: "Inter", fontSize: 16 }}>
                            131 nơi lưu trú
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HotelDiscover;
