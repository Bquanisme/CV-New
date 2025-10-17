import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react'
import ApiFakeHome from '@/api/api.fakeHome';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import { IImage } from '@/typescript/home';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type IProps = {
    image?: IImage
}

const HotTravel = (props: IProps) => {
  return (
    <Box sx={{mt: 7, mb: 5}}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3.5,
        }}>
            {ApiFakeHome?.hotTravel.map(place => (
                <Box
                    key={place?.id}
                    bgcolor={"white"}
                    sx={{
                        width: 314,
                        height: 490,
                        borderRadius: 5
                    }}
                >
                    <Box sx={{ mt: 3 }}>
                        <Image
                        src={place?.image}
                        alt="place"
                        width={314}
                        height={243}
                        style={{ objectFit: "cover", borderRadius: '10px' }} 
                        />
                        <Typography sx={{ color: '#1C5C80', fontWeight: 600, fontSize: '20px', mt: 1, mb: 1.5, fontFamily: 'SVN-Gilroy' }}>
                            {place?.title}
                        </Typography>
                        <Typography sx={{ color: '#000000', fontWeight: 400, fontSize: '14px', mb: 1, fontStyle: "Regular", fontFamily: 'Inter' }}>
                            {place?.tour}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            mt: 2
                        }}>
                            <Rating value={5} readOnly size="medium"/>
                            <Typography sx={{ color: '#A9A9A9', fontWeight: 400, fontSize: '14px', mt: 1, mb: 2 }}>
                                3,4K Review
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center',  gap: 2}}>
            <Link href="/travel/tourism" style={{textTransform: 'none', textDecoration: "none",}}>
                <Typography sx={{ color: '#1C5C80', fontWeight: 700, fontSize: '18px', mb: 1, fontStyle: "Regular", fontFamily: 'SVN-Gilroy' }}>
                    Khám phá thêm
                </Typography>
            </Link>
            <Link href="/travel/tourism" style={{textTransform: 'none', textDecoration: "none",}}>
                <ArrowForwardIcon sx={{width: 26, height: 26}}/>
            </Link>
        </Box>
    </Box>
  )
}

export default HotTravel
