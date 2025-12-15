import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import ApiFakeHome from '@/api/api.fakeHome';
import Image from 'next/image';
import { IImage } from '@/typescript/home';

type IProps = {
    image?: IImage;
};

const TravelDiscover = (props: IProps) => {
    return (
        <Box sx={{ mb: 10, px: { xs: 2, md: 0 } }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: { xs: 2, md: 3 },
                }}
            >
                {/* LEFT BIG IMAGE */}
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 2,
                        width: { xs: '100%', sm: '46%', md: 424 },
                        height: { xs: 300, sm: 350, md: 574 },
                    }}
                >
                    <Image
                        src={ApiFakeHome.imageTravel[0].image}
                        alt="travel 1"
                        fill
                        style={{ objectFit: 'cover', borderRadius: 10 }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: '#30303099',
                            color: 'white',
                        }}
                    >
                        <Box sx={{ position: 'absolute', bottom: 22, left: 22 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 25 } }}>
                                Tắm biển
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 13, md: 16 } }}>
                                131 nhà hàng
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* MIDDLE COLUMN */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: { xs: 2, md: 1.8 },
                        width: { xs: '100%', sm: '46%', md: 'auto' },
                    }}
                >
                    {/* TOP SMALL */}
                    <Box
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            width: { xs: '100%', md: 424 },
                            height: { xs: 165, md: 278 },
                            borderRadius: 2,
                        }}
                    >
                        <Image
                            src={ApiFakeHome.imageTravel[1].image}
                            alt="travel 2"
                            fill
                            style={{ objectFit: 'cover', borderRadius: 10 }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                bgcolor: '#30303099',
                                color: 'white',
                            }}
                        >
                            <Box sx={{ position: 'absolute', bottom: 18, left: 22 }}>
                                <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 25 } }}>
                                    Sinh thái
                                </Typography>
                                <Typography sx={{ fontSize: { xs: 13, md: 16 } }}>
                                    131 nhà hàng
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* BOTTOM SMALL */}
                    <Box
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            width: { xs: '100%', md: 424 },
                            height: { xs: 165, md: 278 },
                            borderRadius: 2,
                        }}
                    >
                        <Image
                            src={ApiFakeHome.imageTravel[2].image}
                            alt="travel 3"
                            fill
                            style={{ objectFit: 'cover', borderRadius: 10 }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                bgcolor: '#30303099',
                                color: 'white',
                            }}
                        >
                            <Box sx={{ position: 'absolute', bottom: 18, left: 22 }}>
                                <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 25 } }}>
                                    Làng nghề
                                </Typography>
                                <Typography sx={{ fontSize: { xs: 13, md: 16 } }}>
                                    131 nhà hàng
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* RIGHT BIG IMAGE */}
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 2,
                        width: { xs: '100%', sm: '46%', md: 424 },
                        height: { xs: 300, sm: 350, md: 574 },
                    }}
                >
                    <Image
                        src={ApiFakeHome.imageTravel[3].image}
                        alt="travel 4"
                        fill
                        style={{ objectFit: 'cover', borderRadius: 10 }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: '#30303099',
                            color: 'white',
                        }}
                    >
                        <Box sx={{ position: 'absolute', bottom: 22, left: 22 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 25 } }}>
                                Di tích văn hóa
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 13, md: 16 } }}>
                                131 nhà hàng
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TravelDiscover;
