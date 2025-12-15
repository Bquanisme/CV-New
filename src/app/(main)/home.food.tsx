import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react'
import ApiFakeHome from '@/api/api.fakeHome';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { IImage } from '@/typescript/home';

type IProps = {
    image?: IImage
}

const HomeFood = () => {

    // Hàm render ảnh với kích thước cố định (giữ đúng như bạn muốn)
    const RenderImage = ({ src, w, h }: { src: any; w: number; h: number }) => {
        return (
            <Box
                sx={{
                    position: "relative",
                    width: w,
                    height: h,
                    borderRadius: 2,
                    overflow: "hidden",
                }}
            >
                <Image
                    src={src}
                    alt="food"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </Box>
        );
    };

    return (
        <Box sx={{ mt: 10, mb: 10 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography sx={{
                    fontFamily: 'SVN-Gilroy',
                    fontWeight: 700,
                    fontSize: '40px',
                    color: '#1C5C80'
                }}>
                    Khám phá ẩm thực
                </Typography>

                <Typography sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    color: '#565656',
                    mt: 3,
                }}>
                    Nha Trang có một kho tàng mĩ vị đặc sắc khiến vạn người thử qua đều mê mẩn khó quên. <br />
                    Thưởng thức ẩm thực địa phương sẽ là cách để du khách trải nghiệm chính văn hóa của <br />
                    vùng đất tuyệt vời này.
                </Typography>
            </Box>

            {/* Layout ảnh */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                }}
            >

                {/* Ảnh lớn */}
                <RenderImage src={ApiFakeHome.imageFood[0].image} w={312} h={478} />

                {/* Cột 2 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                    <RenderImage src={ApiFakeHome.imageFood[1].image} w={312} h={226} />
                    <RenderImage src={ApiFakeHome.imageFood[2].image} w={312} h={226} />
                </Box>

                {/* Cột 3 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                    <RenderImage src={ApiFakeHome.imageFood[3].image} w={312} h={226} />

                    {/* Ảnh có overlay */}
                    <Box sx={{ position: "relative", width: 312, height: 226, borderRadius: 2, overflow: "hidden" }}>
                        <Image
                            src={ApiFakeHome.imageFood[4].image}
                            alt="food overlay"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: 47,
                                bgcolor: "#00000099",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                px: 2
                            }}
                        >
                            <Typography sx={{ fontFamily: "SVN-Gilroy", fontWeight: 700, fontSize: '16px' }}>
                                Bánh Đập Nha Trang
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Cột 4 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                    <RenderImage src={ApiFakeHome.imageFood[5].image} w={312} h={226} />
                    <RenderImage src={ApiFakeHome.imageFood[6].image} w={312} h={226} />
                </Box>

            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button
                    variant="contained"
                    sx={{
                        width: 140,
                        height: 56,
                        bgcolor: 'red',
                        fontSize: '16px',
                        color: 'white',
                        textTransform: 'none',
                        borderRadius: '10px',
                        '&:hover': { bgcolor: 'darkred' }
                    }}
                >
                    Xem thêm
                </Button>
            </Box>
        </Box>
    );
};

export default HomeFood;
