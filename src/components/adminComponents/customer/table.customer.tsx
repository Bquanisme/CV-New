'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import ActionPage from './actionPage';

interface IProps {
    paginatedCustomer: any
    refetch: () => void;
}

export default function TableCustomer({ paginatedCustomer, refetch }: IProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }}>ID</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Tên hiển thị</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Email</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Số điện thoại</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Địa chỉ</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Status</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedCustomer && paginatedCustomer.map((row: any) => (
                        <TableRow
                            key={row?.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row?.id}
                            </TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.display_name || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.email || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.phone_number || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.detail_address || 'null'}</TableCell>
                            <TableCell align="left">
                                {row.status
                                    ? <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                bgcolor: 'green',
                                                fontFamily: "Inter",
                                                fontSize: 15,
                                                fontWeight: 400,
                                            }}
                                        />
                                        <Typography sx={{
                                            fontFamily: "Inter",
                                            fontSize: 15,
                                            fontWeight: 400,
                                        }}>
                                            Public
                                        </Typography>
                                    </Box>
                                    : <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                bgcolor: '#f7a409ff',
                                            }}
                                        />
                                        <Typography sx={{
                                            fontFamily: "Inter",
                                            fontSize: 15,
                                            fontWeight: 400,
                                        }}>
                                            UnPublic
                                        </Typography>
                                    </Box>
                                }
                            </TableCell>
                            <TableCell align="left">
                                <ActionPage id={row?.id} status={row?.status} refetch={refetch}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
