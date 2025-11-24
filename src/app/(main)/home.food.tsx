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

const HomeFood = (props: IProps) => {
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
                Khám phá ẩm thực
            </Typography>
            <Typography sx={{
                fontWeight: 400,
                fontSize: '16px',
                color: '#565656',
                mt: 3,

            }}>
                Nha Trang có một kho tàng mĩ vị  đặc sắc khiến vạn người thử qua đều mê mẩn khó quên. <br/>
                Thưởng thức ẩm thực địa phương sẽ là cách để du khách trải nghiệm chính văn hóa của <br /> 
                vùng đất tuyệt vời này. 
            </Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3.5,
        }}>
            <Box>
                <Image
                    priority={false} 
                    src={ApiFakeHome?.imageFood[0]?.image}
                    alt="food 1"
                    width={312}
                    height={478}
                    style={{ objectFit: 'cover' , borderRadius: 10}} 
                />
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1
            }}>
                <Box sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   gap: 3.5
                }}>
                    <Image
                        priority={false} 
                        src={ApiFakeHome?.imageFood[1]?.image}
                        alt="food 2"
                        width={312}
                        height={226}
                        style={{ objectFit: 'cover' , borderRadius: 10}}
                    />
                    <Image
                        priority={false} 
                        src={ApiFakeHome?.imageFood[2]?.image}
                        alt="food 3"
                        width={312}
                        height={226}
                        style={{ objectFit: 'cover' , borderRadius: 10}}
                    />
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1
            }}>
                <Box sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   gap: 3.5
                }}>
                    <Image
                        priority={false} 
                        src={ApiFakeHome?.imageFood[3]?.image}
                        alt="food 4"
                        width={312}
                        height={226}
                        style={{ objectFit: 'cover' , borderRadius: 10}}
                    />
                    <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 2
                    }}
                    >
                    <Image
                        priority={false} 
                        src={ApiFakeHome?.imageFood[4]?.image}
                        alt="food 5"
                        width={312}
                        height={226}
                        style={{borderRadius: 10}}
                    />

                    {/* Overlay chữ dưới ảnh */}
                    <Box
                        sx={{
                        position: "absolute",
                        bottom: 5 ,
                        left: 0,
                        width: "100%",
                        height: 47,
                        bgcolor: "#00000099 ", 
                        color: "white",
                        fontSize: 14,
                        borderBottomRightRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        }}
                    >
                        <Typography sx={{
                            fontFamily: "SVN-Gilroy",
                            fontWeight: 700,
                            fontSize: '16px',
                            padding: 1.5
                        }}>
                            Bánh Đập Nha Trang
                        </Typography>
                    </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1
            }}>
                <Box sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   gap: 3.5
                }}>
                    <Image
                        priority={false} 
                        src={ApiFakeHome?.imageFood[5]?.image}
                        alt="food 6"
                        width={312}
                        height={226}
                        style={{ objectFit: 'cover' , borderRadius: 10}}
                    />
                    <Image
                        priority={false} 
                        src={ApiFakeHome?.imageFood[6]?.image}
                        alt="food 7"
                        width={312}
                        height={226}
                        style={{ objectFit: 'cover' , borderRadius: 10}}
                    />
                </Box>
            </Box>
        </Box><br />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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

export default HomeFood
