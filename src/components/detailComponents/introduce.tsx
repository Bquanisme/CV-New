import React from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IHotTour } from '@/typescript/home';

type IProps = {
  data: IHotTour | undefined
}

const Introduce = ({data} : IProps) => {
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
            Giới thiệu
        </Typography>
        <Box sx={{
            width: 727,
            height: '100%',
            maxHeight: 226,
            borderRadius: '10px',
            p: 3,
            bgcolor: '#FFFFFF',
            mt: 1,
        }}>
            <Typography sx={{
                fontWeight: 400,
                fontSize: "16px",
                color: "#343434",
                fontFamily: "Inter",
            }}>
                {data?.description || 'không có phần giới thiệu'}
            </Typography>
            <Typography sx={{
                fontWeight: 400,
                fontSize: "16px",
                color: "#343434",
                fontFamily: "Inter",
                py: 2
            }}>
                {data?.categories?.description || 'không có phần giới thiệu'}
            </Typography>
        </Box>
    </Box>
  )
}

export default Introduce
