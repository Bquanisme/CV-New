import ApiFakeHome from '@/api/api.fakeHome';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';
import { IHome } from '@/typescript/home';

type IProps = {
  home?: IHome;
};

const HomeDiscover = (props: IProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        px: 2,
        overflow: 'hidden',       
      }}
    >
      {ApiFakeHome.cards.map((travel: any) => (
        <Box
          key={travel.id}
          sx={{
            flex: "1 1 0",        
            minWidth: 150,         
            maxWidth: 312,         
          }}
        >
          <Box
            sx={{
              width: '100%',
              aspectRatio: '312 / 459',
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src={travel.image}
              alt={travel.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>

          <Typography
            sx={{
              mt: 1,
              fontWeight: 600,
              color: '#1C5C80',
              fontFamily: 'SVN-Gilroy',
              fontSize: '20px',
            }}
          >
            {travel.title}
          </Typography>

          <Typography
            sx={{
              mb: 2,
              color: '#000',
              fontSize: '14px',
              fontWeight: 400,
            }}
          >
            {travel.tour}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Rating name="size-small" value={5} size="small" readOnly />
            <Typography sx={{ color: '#A9A9A9', fontSize: 14 }}>3,4K Review</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HomeDiscover;
