
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import BorderColorIcon from "@mui/icons-material/BorderColor";

interface IProps {
    paginatedCancel: any
}

export default function TableCancelRequest({ paginatedCancel }: IProps) {
    const getStatusColor = (status: any) => {
        if (status === "pending") return "blue";
        if (status === "cancel") return "red";
        return "green";
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">ID order</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Name</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Type</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Cost</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Status</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedCancel && paginatedCancel.map((row: any) => (
                        <TableRow
                            key={row?.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" sx={{ color: 'blue' }}>
                                {row?.id}
                            </TableCell>
                            <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.order_id || 'null'}</TableCell>
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
                                    <Typography>{row.status}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="left">
                                <BorderColorIcon
                                    sx={{
                                        color: "green",
                                        fontSize: 22,
                                        cursor: "pointer",
                                        "&:hover": { opacity: 0.7 },
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
