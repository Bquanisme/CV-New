import React, { useState } from "react";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useAppDispatch } from "@/redux/hooks";
import { deleteCategory } from "@/redux/Slice/adminSlice";
import { toast } from "react-toastify";
import { color } from "@mui/system";
import EditStaff from "./editStaff";
// import DeleteStaff from "./DeleteStaff";
// import EditStaff from "./EditStaff";

interface IProps {
    id: number
    refetch: () => void
}

const ActionStaff = ({ id, refetch }: IProps) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useAppDispatch();

    const handleConfirmDelete = async () => {
        try {
            await dispatch(deleteCategory({ ids: [id] })).unwrap();
            toast.success('Bạn đã xóa nhân viên thành công!')
            setOpenConfirm(false);
            await refetch();
        } catch (err) {
            toast.error('Lỗi! Hiện tại không xóa được nhân viên!')
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 1 }}>

            <DeleteOutlineIcon
                onClick={() => setOpenConfirm(true)}
                sx={{
                    color: "red",
                    fontSize: 22,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                }}
            />

            <BorderColorIcon
                onClick={() => setOpenDialog(true)}
                sx={{
                    color: "green",
                    fontSize: 22,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                }}
            />

            {/* Dialog Edit */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                PaperProps={{
                    sx: {
                        position: "absolute",
                        top: 80,
                        borderRadius: 2,
                        width: 750,
                    },
                }}
            >
                <EditStaff close={() => setOpenDialog(false)} id={id} refetch={refetch} />
            </Dialog>

            {/* Dialog */}
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                PaperProps={{
                    sx: { borderRadius: 2, width: 400 },
                }}
            >
                <DialogTitle sx={{ fontFamily: "Inter", fontSize: 25, fontWeight: 600, color: 'red' }}>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontFamily: "Inter", fontSize: 18, fontWeight: 400, color: 'red' }}>Bạn có chắc muốn xóa nhân viên này?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpenConfirm(false)} sx={{ textTransform: 'none', textDecoration: 'none' }}>Hủy</Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        sx={{ textTransform: 'none', textDecoration: 'none' }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ActionStaff;
