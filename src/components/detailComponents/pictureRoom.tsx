import React from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IHotTour } from '@/typescript/home';
import Image from 'next/image';
import Room1 from '../../assets/room11.jpg'
import Room2 from '../../assets/room14.jpg'
import Room3 from '../../assets/room17.jpg'
import RoomImage from "../../assets/room14.jpg";

type IProps = {
  data: IHotTour | undefined
}

const PictureRoom = ({ data }: IProps) => {
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
              src={data?.logo || RoomImage}
              alt="changeLogo"
              width={164}
              height={164}
              style={{ objectFit: "cover", borderRadius: '10px' }}
            />
            <Image
              priority={false}
              src={Room1}
              alt="changeLogo"
              width={164}
              height={164}
              style={{ objectFit: "cover", borderRadius: '10px' }}
            />
            <Image
              priority={false}
              src={Room2}
              alt="changeLogo"
              width={164}
              height={164}
              style={{ objectFit: "cover", borderRadius: '10px' }}
            />
            <Image
              priority={false}
              src={Room3}
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

export default PictureRoom
