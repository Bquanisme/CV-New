import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { IPage } from '@/typescript/home';

const PaginationControl = ({page, setPage, totalPages}: IPage) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" padding='30px' paddingTop='10px' mt={2}>
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value: any) => setPage(value)}
        sx={{
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: (theme) => theme.palette.error.main,
            color: '#fff',
            border: 'solid 1px #131111ff',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.error.dark,
            },
          },
          '& .MuiPaginationItem-root': {
            borderColor: (theme) => theme.palette.error.main,
          },
        }}
        />
    </Stack>
    </Box>
  );
};

export default PaginationControl;
