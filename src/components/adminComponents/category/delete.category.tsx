import { useAppDispatch } from '@/redux/hooks';
import { deleteCategory } from '@/redux/Slice/adminSlice';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

interface IProps {
    selectedIds: number[];
    // setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
    refetch: () => void;
}

const DeleteCategory = ({ selectedIds, refetch }: IProps) => {
    const [openDialog, setOpenDialog] = useState(false)
    const scroll = 'paper'

    const dispatch = useAppDispatch();

    const handleClick = () => {
        setOpenDialog(true)
    };

    const handleClose = () => {
        setOpenDialog(false)
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return;
        try {
            await dispatch(
                deleteCategory({
                    ids: selectedIds
                })
            ).unwrap();
            toast.success('Bạn đã xóa thông tin thành công!')
            await refetch();
            setOpenDialog(false)
            close();
        } catch (err) {
            toast.error('Lỗi! Hiện tại không xóa được thông tin Category!')
        }
    }

    return (
        <Box>
            <Button
                variant="outlined"
                color="error"
                onClick={handleClick}
                sx={{ textTransform: "none" }}
            >
                Delete Category
            </Button>

            <Dialog
                open={openDialog}
                onClose={handleClose}
                scroll={scroll}
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        position: 'absolute',
                        top: 80,
                        m: 0,
                        borderRadius: 2,
                        width: 400
                    },
                }}
            >
                <DialogTitle id="scroll-dialog-title" sx={{ fontWeight: 600, fontSize: 22, fontFamily: 'Inter', color: 'red' }}>
                    Xóa Category
                </DialogTitle>
                <DialogContent >
                    <Typography sx={{ fontWeight: 500, fontSize: 22, fontFamily: 'Inter' }}>
                        Xác nhận xóa Category này
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button
                        variant='outlined'
                        sx={{ textTransform: 'none', color: "grey", borderColor: 'lightgray', fontSize: 15, fontFamily: 'Inter' }}
                        onClick={handleClose}
                        size='small'
                    >
                        Hủy
                    </Button>
                    <Button
                        variant='contained'
                        size='small'
                        sx={{ textTransform: 'none', fontSize: 15, fontFamily: 'Inter' }}
                        onClick={handleDelete}
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DeleteCategory
