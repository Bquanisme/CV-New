import React from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IHotTour } from '@/typescript/home';
import Image from 'next/image';
import Tour1 from '../../assets/tour2.jpg'
import Tour2 from '../../assets/hotTour3.jpg'
import Tour3 from '../../assets/tour4.jpg'
import TourImage from "../../assets/tour-dao1.jpg";

type IProps = {
    data: IHotTour | undefined
}

const PictureTour = ({ data }: IProps) => {
    return (
        <Box>
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: "22px",
                    color: "#000000",
                    fontFamily: "Inter",
                }}
            >
                Hình ảnh
            </Typography>
            <Box sx={{
                width: 727,
                height: '100%',
                maxHeight: 226,
                borderRadius: '10px',
                p: 1.5,
                py: 2,
                bgcolor: '#FFFFFF',
                mt: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: 2
                    }}>
                        <Image
                            priority={false}
                            src={data?.logo || TourImage}
                            alt="changeLogo"
                            width={164}
                            height={164}
                            style={{ objectFit: "cover", borderRadius: '10px' }}
                        />
                        <Image
                            priority={false}
                            src={Tour1}
                            alt="changeLogo"
                            width={164}
                            height={164}
                            style={{ objectFit: "cover", borderRadius: '10px' }}
                        />
                        <Image
                            priority={false}
                            src={Tour2}
                            alt="changeLogo"
                            width={164}
                            height={164}
                            style={{ objectFit: "cover", borderRadius: '10px' }}
                        />
                        <Image
                            priority={false}
                            src={Tour3}
                            alt="changeLogo"
                            width={164}
                            height={164}
                            style={{ objectFit: "cover", borderRadius: '10px' }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default PictureTour
