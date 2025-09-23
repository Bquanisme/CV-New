import ApiFakeHome from '@/api/api.fakeHome';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React from 'react';

type IProps = {
  home?: IHome;
};

const HomeDiscover = (props: IProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2}}>
      {ApiFakeHome.cards.map((travel) => (
        <Box
          key={travel.id}
          sx={{
            width: 312,
            overflow: 'hidden',
          }}
        >
          <Image 
            src={travel.image} 
            alt={travel.title} 
            width={312} 
            height={459} 
            style={{ objectFit: 'cover' , borderRadius: 6}} 
          />
          <Typography 
            variant="h6" 
            sx=
            {{ 
                mt: 1, 
                fontWeight: 600, 
                color: '#1C5C80', 
                fontFamily: 'SVN-Gilroy',
                fontSize: '20px'
            }}
            >
            {travel.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
                mb: 2, 
                color: '#000000',
                fontSize: '14px',
                fontWeight: 400 
            }}>
            {travel.tour}
          </Typography>
            <Box sx={{display: 'flex', gap: 1}}>
                <Rating name="size-small" value={5} size="small" readOnly/>
                <Typography sx={{
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#A9A9A9'
                }}>
                    3,4K Review
                </Typography>
            </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HomeDiscover;
