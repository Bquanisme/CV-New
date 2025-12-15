import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import EditCategory from './edit.category';
// import EditCategory from './EditCategory';

interface IProps {
    paginatedCategory: any;
    filteredData: any;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
    refetch: () => void;
}


export default function TableCategory({ paginatedCategory, filteredData, selectedIds, setSelectedIds, refetch }: IProps) {

    const handleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item: any) => item !== id));
            //khi selectedIds là id thì khi click vào thì sẽ xóa check id đó 
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return (
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
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Name</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Description</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">People</TableCell>
                        <TableCell sx={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Inter' }} align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedCategory && paginatedCategory.map((row: any) => {
                        const isSelected = selectedIds.includes(row?.id);
                        return (
                            <TableRow
                                key={row?.id}
                                sx={{
                                    bgcolor: isSelected ? '#d5f4f8ff' : 'inherit',
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isSelected}
                                        onChange={() => handleSelect(row?.id)}
                                        sx={{
                                            color: 'grey',
                                            '&.Mui-checked': { color: 'green' }
                                        }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row" align='left'>
                                    {row?.id}
                                </TableCell>
                                <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.name || 'null'}</TableCell>
                                <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.description || 'null'}</TableCell>
                                <TableCell align="left" sx={{ fontFamily: 'Inter' }}>{row?.number || 'null'}</TableCell>
                                <TableCell align="left">
                                    <EditCategory id={row?.id} refetch={refetch} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
