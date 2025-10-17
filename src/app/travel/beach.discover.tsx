import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react'
import ApiFakeHome from '@/api/api.fakeHome';
import Image from 'next/image';
import { IImage } from '@/typescript/home';

type IProps = {
    image?: IImage
}

const BeachDiscover = (props: IProps) => {
  return (
    <Box sx={{ mt: 4 }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10
        }}>
            {ApiFakeHome?.beach.map(beach => (
                <Box
                    key={beach?.id}
                    bgcolor={"white"}
                >
                    <Box sx={{ mt: 3, textAlign: 'center'}}>
                        <Image
                        src={beach?.image}
                        alt="beach"
                        width={160}
                        height={160}
                        style={{ objectFit: "cover", borderRadius: '50%' }} 
                        />
                        <Typography sx={{ color: '#3C3C3C', fontWeight: 600, fontSize: '16px', mt: 1, mb: 1.5, fontFamily: 'Inter' }}>
                            {beach?.title}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    </Box>
  )
}

export default BeachDiscover
