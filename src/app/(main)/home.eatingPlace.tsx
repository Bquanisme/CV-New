import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react'
import ApiFakeHome from '@/api/api.fakeHome';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IImage } from '@/typescript/home';

type IProps = {
    image?: IImage
}

const HomeEatingPlace = (props: IProps) => {
  return (
    <Box sx={{mt: 10, mb: 10}}>
        <Box sx={{
            textAlign: 'center',
            mb: 6
        }}
        >
            <Typography sx={{
                fontFamily: 'SVN-Gilroy',
                fontWeight: 700,
                fontSize: '40px',
                color: '#1C5C80'
            }}>
                Địa điểm ăn uống
            </Typography>
            <Typography sx={{
                fontWeight: 400,
                fontSize: '16px',
                color: '#565656',
                mt: 3,

            }}>
                Lựa chọn địa điểm thưởng thức ẩm thực cũng là một trong những trải nghiệm đáng nhớ khi <br />
                đến Nha Trang.  Hãy tìm cho mình một không gian xanh để thư giãn và tận hưởng hành trình <br /> 
                một cách thật trọn vẹn.
            </Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3.5,
        }}>
            {ApiFakeHome?.place.map(place => (
                <Box
                    key={place?.id}
                    bgcolor={"white"}
                    sx={{
                        width: 312,
                        height: 604,
                        borderRadius: 5
                    }}
                >
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, textAlign: 'center'}}>
                        <Image
                        priority={false} 
                        src={place?.image}
                        alt="place"
                        width={219.7}
                        height={219}
                        style={{ objectFit: "cover", borderRadius: '50%' }} 
                        />
                        <Rating value={5} readOnly size="medium" sx={{mt: 1}}/>
                        <Typography sx={{ color: '#A9A9A9', fontWeight: 400, fontSize: '14px', mt: 1, mb: 2 }}>
                            3,014 Review
                        </Typography>
                        <Typography sx={{ color: '#0B0B0B', fontWeight: 700, fontSize: '18px', mt: 1, mb: 1.5 }}>
                            {place?.title}
                        </Typography>
                        <Typography sx={{ color: '#343434', fontWeight: 500, fontSize: '14px', mb: 1, fontStyle: "Medium" }}>
                            {place?.tour}
                        </Typography>
                        <Typography sx={{ color: '#565656', fontWeight: 400, fontSize: '14px', mb: 3, fontStyle: "Regular", p: 2 }}>
                            {place?.description}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1
                        }}>
                            <PhoneIcon sx={{
                                width: 19.97,
                                height: 20,
                                color: '#A9A9A9'
                            }}/>
                            <Typography sx={{ color: '#A9A9A9', fontWeight: 400, fontSize: '16px', mb: 1, fontStyle: "Regular" }}>
                                0913.504.319
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 1
                        }}>
                            <AccessTimeIcon sx={{
                                width: 19.97,
                                height: 20,
                                color: '#A9A9A9'
                            }}/>
                            <Typography sx={{ color: '#A9A9A9', fontWeight: 400, fontSize: '16px', mb: 1, fontStyle: "Regular" }}>
                                10h20-23h00
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box><br />
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '10px',
            '&:hover': { bgcolor: 'darkred' }
          }}
        >
          Xem thêm
        </Button>
      </Box>
    </Box>
  )
}

export default HomeEatingPlace
