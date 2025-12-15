import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import ApiFakeHome from '@/api/api.fakeHome';
import Image from 'next/image';
import { IImage } from '@/typescript/home';

type IProps = {
    image?: IImage
};

const TourDiscover = (props: IProps) => {
    return (
        <Box sx={{ mb: 5, px: { xs: 2, md: 0 } }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: { xs: 2, md: 3 },
                    // flexWrap: "wrap",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 2,
                        width: { xs: "100%", sm: "46%", md: 360 },   // giảm từ 424 → 360
                        height: { xs: 300, sm: 350, md: 490 },      // giảm từ 574 → ~490
                    }}
                >
                    <Image
                        src={ApiFakeHome.imageTour[0].image}
                        alt="tour 1"
                        fill
                        style={{ objectFit: "cover", borderRadius: 10 }}
                    />

                    <Box sx={{ position: "absolute", bottom: 22, left: 22, color: "white" }}>
                        <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 22 } }}>
                            Tour đảo
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 13, md: 15 } }}>
                            131 tour
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'space-between',
                        gap: { xs: 2, md: 1.5 },
                        width: { xs: "100%", sm: "46%", md: "auto" },
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            width: { xs: "100%", md: 360 },
                            height: { xs: 165, md: 230 },
                            borderRadius: 2,
                        }}
                    >
                        <Image
                            src={ApiFakeHome.imageTour[1].image}
                            alt="tour 2"
                            fill
                            style={{ objectFit: "cover", borderRadius: 10 }}
                        />

                        <Box sx={{ position: "absolute", bottom: 18, left: 22, color: "white" }}>
                            <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 22 } }}>
                                Tour trải nghiệm
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 13, md: 15 } }}>
                                131 tour
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            width: { xs: "100%", md: 360 },
                            height: { xs: 165, md: 230 },
                            borderRadius: 2,
                        }}
                    >
                        <Image
                            src={ApiFakeHome.imageTour[2].image}
                            alt="tour 3"
                            fill
                            style={{ objectFit: "cover", borderRadius: 10 }}
                        />

                        <Box sx={{ position: "absolute", bottom: 18, left: 22, color: "white" }}>
                            <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 22 } }}>
                                Tour du thuyền
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 13, md: 15 } }}>
                                131 tour
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 2,
                        width: { xs: "100%", sm: "46%", md: 360 },
                        height: { xs: 300, sm: 350, md: 490 },
                    }}
                >
                    <Image
                        src={ApiFakeHome.imageTour[3].image}
                        alt="tour 4"
                        fill
                        style={{
                            objectFit: "cover",
                            borderRadius: 10,
                            transform: "scaleX(-1)",
                        }}
                    />

                    <Box sx={{ position: "absolute", bottom: 22, left: 22, color: "white" }}>
                        <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 22 } }}>
                            Tour nghỉ dưỡng
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 13, md: 15 } }}>
                            131 tour
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};

export default TourDiscover;
