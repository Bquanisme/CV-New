import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Dialog } from '@mui/material';
import moment from "moment";
import EditManageTour from './edit.manageTour';
import DetailManageTour from './detail.manageTour';
import Image from 'next/image';

interface IProps {
    paginatedCategory: any;
    filteredData: any;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
    refetch: () => void;
}


export default function TableManageTour({ paginatedCategory, filteredData, selectedIds, setSelectedIds, refetch }: IProps) {

    const handleSelect = (id: any) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [selectedIdRow, setSelectedIdRow] = React.useState<number>(0);
    const scroll = 'paper';

    const handleOpen = (row: any) => {
        setSelectedRow(row);
        setSelectedIdRow(row.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={
                                        selectedIds.length > 0 && selectedIds.length < filteredData.length
                                    }
                                    checked={
                                        filteredData.length > 0 && selectedIds.length === filteredData.length
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedIds(filteredData.map((row: any) => row.id));
                                        } else {
                                            setSelectedIds([]);
                                        }
                                    }}
                                    sx={{
                                        color: 'grey',
                                        '&.Mui-checked': { color: 'green' }
                                    }}
                                />
                            </TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }}>ID</TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }}></TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Name</TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Description</TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Type</TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Cost(VND)</TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Start date</TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">End date</TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Category</TableCell>
                            <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCategory && paginatedCategory.map((row: any) => {
                            const isSelected = selectedIds.includes(row?.id);

                            return (
                                <TableRow
                                    key={row?.id}
                                    onClick={() => handleOpen(row)}
                                    sx={{
                                        bgcolor: isSelected ? '#d5f4f8ff' : 'inherit',
                                        cursor: "pointer",
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={() => handleSelect(row)}
                                            sx={{
                                                color: 'grey',
                                                '&.Mui-checked': { color: 'green' }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        {row?.id}
                                    </TableCell>
                                    <TableCell>
                                        {row?.logo ? (
                                            <Image
                                                src={row.logo}
                                                width={150}
                                                height={100}
                                                alt="logo"
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: 4,
                                                    cursor: "pointer"
                                                }}
                                            />
                                        ) : (
                                            "null"
                                        )}
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.name || 'null'}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.description || 'null'}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.type || 'null'}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.cost.toLocaleString() || 'null'}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.start_date
                                        ? moment(row.start_date).format("DD/MM/YYYY")
                                        : "null"}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.end_date
                                        ? moment(row.end_date).format("DD/MM/YYYY")
                                        : "null"}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.categories?.name || 'null'}</TableCell>
                                    <TableCell align="left">
                                        <EditManageTour id={row?.id} refetch={refetch} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                maxWidth={false}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                PaperProps={{
                    sx: {
                        position: "absolute",
                        top: 0,
                        m: 0,
                        right: 0,
                        minHeight: '100%',
                        borderRadius: 2,
                        width: 900
                    }
                }}
            >
                {selectedRow && <DetailManageTour detailId={selectedIdRow} handleClose={handleClose} />}
            </Dialog>
        </>
    );
}
