import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react'
import ApiFakeHome from '@/api/api.fakeHome';
import Image from 'next/image';
import { IImage } from '@/typescript/home';

type IProps = {
    image?: IImage
}

const TravelDiscover = (props: IProps) => {
  return (
    <Box sx={{ mb: 10}}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3.5,
        }}>
            <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 2
            }}
            >
                <Image
                    src={ApiFakeHome?.imageTravel[0]?.image}
                    alt="food 1"
                    width={424}
                    height={574}
                    style={{ objectFit: 'cover' , borderRadius: 10}} 
                />
                <Box
                    sx={{
                    position: "absolute",
                    bottom: 5 ,
                    left: 0,
                    width: "100%",
                    height: '100%',
                    bgcolor: "#30303099 ", 
                    color: "white",
                    fontSize: 14,
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    }}
                >
                    <Box sx={{
                        pl: 4,
                        pt: '500px'
                    }}>
                        <Typography sx={{
                            fontFamily: "SVN-Gilroy",
                            fontWeight: 700,
                            fontSize: '25px',
                        }}>
                            Tắm biển
                        </Typography>
                        <Typography sx={{
                            fontFamily: "Inter",
                            fontWeight: 500,
                            fontSize: '16px',
                        }}>
                            131 nhà hàng
                        </Typography>
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
                   gap: 1.8
                }}>
                    <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 2
                    }}
                    >
                        <Image
                            src={ApiFakeHome?.imageTravel[1]?.image}
                            alt="travel 2"
                            width={424}
                            height={278}
                            style={{borderRadius: 10}}
                        />

                        {/* Overlay chữ dưới ảnh */}
                        <Box
                            sx={{
                            position: "absolute",
                            bottom: 5 ,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "#30303099 ", 
                            color: "white",
                            fontSize: 14,
                            borderBottomRightRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            }}
                        >
                            <Box sx={{
                                pl: 4,
                                pt: '200px'
                            }}>
                                <Typography sx={{
                                    fontFamily: "SVN-Gilroy",
                                    fontWeight: 700,
                                    fontSize: '25px',
                                }}>
                                    Sinh thái
                                </Typography>
                                <Typography sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontSize: '16px',
                                }}>
                                    131 nhà hàng
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 2
                    }}
                    >
                        <Image
                            src={ApiFakeHome?.imageTravel[2]?.image}
                            alt="travel 3"
                            width={424}
                            height={278}
                            style={{borderRadius: 10}}
                        />

                        {/* Overlay chữ dưới ảnh */}
                        <Box
                            sx={{
                            position: "absolute",
                            bottom: 5 ,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "#30303099 ", 
                            color: "white",
                            fontSize: 14,
                            borderBottomRightRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            }}
                        >
                            <Box sx={{
                                pl: 4,
                                pt: '200px'
                            }}>
                                <Typography sx={{
                                    fontFamily: "SVN-Gilroy",
                                    fontWeight: 700,
                                    fontSize: '25px',
                                }}>
                                    Làng nghề 
                                </Typography>
                                <Typography sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 500,
                                    fontSize: '16px',
                                }}>
                                    131 nhà hàng
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 2
            }}
            >
                <Image
                    src={ApiFakeHome?.imageTravel[3]?.image}
                    alt="food 1"
                    width={424}
                    height={574}
                    style={{ objectFit: 'cover' , borderRadius: 10}} 
                />
                <Box
                    sx={{
                    position: "absolute",
                    bottom: 5 ,
                    left: 0,
                    width: "100%",
                    height: '100%',
                    bgcolor: "#30303099 ", 
                    color: "white",
                    fontSize: 14,
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    }}
                >
                    <Box sx={{
                        pl: 4,
                        pt: '500px'
                    }}>
                        <Typography sx={{
                            fontFamily: "SVN-Gilroy",
                            fontWeight: 700,
                            fontSize: '25px',
                        }}>
                            Di tích văn hóa
                        </Typography>
                        <Typography sx={{
                            fontFamily: "Inter",
                            fontWeight: 500,
                            fontSize: '16px',
                        }}>
                            131 nhà hàng
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default TravelDiscover
