'use client'
import { Box, Button, Dialog, Typography } from '@mui/material'
import React, { useState } from 'react'
import PaginationControl from '@/components/otherComponents/paginationControl'
import { useQuery } from '@tanstack/react-query'
import { getStaffAPI } from '@/api/home/api.admin'
import CircularProgressLoading from '@/components/otherComponents/circularProgress.loading'
import TableStaff from '@/components/adminComponents/staff/table.staff'
import NewStaff from '@/components/adminComponents/staff/newStaff'

// import TableStaff from './TableStaff'
// import NewStaff from './NewStaff'

const Staff = () => {
    const [page, setPage] = useState<number>(1);
    const [open, setOpen] = useState(false)
    const rowsPerPage = 3;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['staff'],
        queryFn: () => getStaffAPI(),
        staleTime: Infinity,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <CircularProgressLoading />

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginatedStaff = data.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <Box
            sx={{
                px: 2,
                py: 8,
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Box
                    sx={{
                        bgcolor: '#ffffffff',
                        m: -1.5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 0 }}>
                        <Typography

                        >
                            Quản lý Staff
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant='outlined' disabled sx={{ textTransform: 'none' }}>Admin</Button>
                            <Button variant='contained' sx={{ textTransform: 'none' }} onClick={handleOpen}>New Staff</Button>
                        </Box>
                    </Box>
                    <TableStaff paginatedStaff={paginatedStaff} refetch={refetch} />
                </Box>
            </Box><br />
            <PaginationControl
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />

            <NewStaff
                open={open}
                onClose={() => setOpen(false)}
                refetch={refetch}
            />
        </Box>
    )
}

export default Staff
