import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import EditManageOrders from './edit.manageOrders';
// import EditOrder from './EditOrder';

interface IProps {
    paginatedOrder: any;
    refetch: () => void;
}

export default function TableManageOrders({ paginatedOrder, refetch }: IProps) {
    const getStatusColor = (status: any) => {
        if (status === "pending") return "blue";
        if (status === "cancel") return "red";
        if (status === "access") return "green";
        return "orange";
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }}>ID</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">UserID</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Name</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Type</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Cost</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Status</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedOrder && paginatedOrder.map((row: any) => (
                        <TableRow
                            key={row?.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" sx={{ color: 'blue' }}>
                                {row?.id}
                            </TableCell>
                            <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.user_id || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.name || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.type_room || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.cost || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: 'Inter' }}>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            bgcolor: getStatusColor(row.status),
                                        }}
                                    />
                                    <Typography sx={{ fontFamily: 'Inter' }}>{row.status}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="left">
                                <EditManageOrders id={row?.id} status={row?.status} refetch={refetch}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
