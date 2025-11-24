import React from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import { IHotTour } from '@/typescript/home';

type IProps = {
  data: IHotTour | undefined
}

const TicketPrice = ({data} : IProps) => {
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
            Giá vé
        </Typography>
        <Box sx={{
            width: 727,
            height: '100%',
            maxHeight: 226,
            borderRadius: '10px',
            p: 5,
            bgcolor: '#FFFFFF',
            mt: 1,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    <BookOnlineIcon />
                    <Typography sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#001A40",
                        fontFamily: "Inter",
                    }}>
                        Người lớn
                    </Typography>
                    <Typography sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#343434",
                        fontFamily: "Inter",
                        mt: 0.5
                    }}>
                        {data?.cost.toLocaleString() || 'không có phần giới thiệu'} <span style={{
                            fontWeight: 500,
                            fontSize: "16px",
                            color: "#343434",
                            fontFamily: "Inter",
                        }}>/ người / lượt</span>
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    <BookOnlineIcon />
                    <Typography sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#001A40",
                        fontFamily: "Inter",
                    }}>
                        Sinh viên và học sinh trên 10 tuổi
                    </Typography>
                    <Typography sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#343434",
                        fontFamily: "Inter",
                        mt: 0.5
                    }}>
                        {data?.cost.toLocaleString() || 'không có phần giới thiệu'} <span style={{
                            fontWeight: 500,
                            fontSize: "16px",
                            color: "#343434",
                            fontFamily: "Inter",
                        }}>/ người / lượt</span>
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    <BookOnlineIcon />
                    <Typography sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#001A40",
                        fontFamily: "Inter",
                    }}>
                        Trẻ em dưới 10 tuổi
                    </Typography>
                    <Typography sx={{
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#343434",
                        fontFamily: "Inter",
                        mt: 0.5
                    }}>
                        Miễn phí <span style={{
                            fontWeight: 500,
                            fontSize: "16px",
                            color: "#343434",
                            fontFamily: "Inter",
                        }}>/ người / lượt</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default TicketPrice
