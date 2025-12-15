import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ActionStaff from './actionStaff';
// import ActionStaff from './ActionStaff';

interface IProps {
    paginatedStaff: any
    refetch: () => void
}

export default function TableStaff({ paginatedStaff, refetch }: IProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }}>ID</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Role ID</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Status</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Name</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Phone</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Email</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Detail Address</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: "Inter", }} align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedStaff && paginatedStaff.map((row: any) => (
                        <TableRow
                            key={row?.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row?.id}
                            </TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.role_id == 1 ? 'admin' : 'staff'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.status || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.display_name || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.phone_number || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.email || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>{row?.detail_address || 'null'}</TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Inter", fontSize: 15, fontWeight: 400, }}>
                                <ActionStaff id={row?.id} refetch={refetch} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
