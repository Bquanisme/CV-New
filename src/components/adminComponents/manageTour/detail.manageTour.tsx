import { Box, DialogContent, DialogTitle, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from '@tanstack/react-query';
import { IManageTourDetail } from '@/typescript/home';
import { getDetailRoomTourAPI } from '@/api/home/api.admin';
import Image from 'next/image';

interface IProps {
    handleClose: () => void;
    detailId: number;
}

const DetailManageTour = ({ handleClose, detailId }: IProps) => {

    const { data } = useQuery<IManageTourDetail>({
        queryKey: ["manageTourDetail", detailId],
        queryFn: () => getDetailRoomTourAPI(detailId),
        enabled: !!detailId,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, m: 3 }}>
                <Box onClick={handleClose} sx={{ cursor: 'pointer' }}><CloseIcon /></Box>
                <DialogTitle sx={{ fontWeight: 'bold', fontFamily: "Inter" }}>
                    Xem chi tiết
                </DialogTitle>
            </Box>
            <Divider /><br />
            <DialogContent>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow >
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", width: 150, color: '#00000072' }}>ID</TableCell>
                                <TableCell sx={{ fontSize: 16, fontFamily: "Inter" }}>{data?.id}</TableCell>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", color: '#00000072' }}>Category Number</TableCell>
                                <TableCell sx={{ fontSize: 16, fontFamily: "Inter" }}>{data?.categories?.id || "null"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", color: '#00000072' }}>Type Room</TableCell>
                                <TableCell sx={{ fontSize: 16, fontFamily: "Inter" }}>{data?.type}</TableCell>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", color: '#00000072' }}>Status</TableCell>
                                <TableCell sx={{ fontSize: 16, fontFamily: "Inter" }}>{data?.status}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", color: '#00000072' }}>Start Date</TableCell>
                                <TableCell sx={{ fontSize: 16, fontFamily: "Inter" }}>{data?.start_date}</TableCell>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", color: '#00000072' }}>End Date</TableCell>
                                <TableCell sx={{ fontSize: 16, fontFamily: "Inter" }}>{data?.end_date}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", color: '#00000072' }}>Name Room</TableCell>
                                <TableCell sx={{ fontSize: 16, fontFamily: "Inter" }}>{data?.name}</TableCell>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", color: '#00000072' }}>Cost</TableCell>
                                <TableCell sx={{ fontSize: 16, fontFamily: "Inter" }}>{data?.cost}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", color: '#00000072' }}>Description</TableCell>
                                <TableCell colSpan={3} sx={{ fontSize: 16, fontFamily: "Inter" }}>{data?.description}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#f5f5f5', fontSize: 18, fontFamily: "Inter", color: '#00000072' }}>Logo</TableCell>
                                <TableCell colSpan={3}>
                                    {data?.logo ? (
                                        <Image
                                            src={data.logo}
                                            width={600}
                                            height={350}
                                            alt="Logo"
                                        />
                                    ) : (
                                        <Typography sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: 16, }}>Không có hình ảnh</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Box>
    )
}

export default DetailManageTour
