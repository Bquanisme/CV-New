'use client';
import React, { useState } from "react";
import {
  Box,
  Popover,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useAppDispatch } from "@/redux/hooks";
import { deleteCustomer, deleteCategory, updateStatus } from "@/redux/Slice/adminSlice";
import { toast } from "react-toastify";

interface ActionPageProps {
  id: number;
  status: number | boolean;
  refetch: () => void;
}

type ActionType = "delete" | "edit" | null;

const ActionPage: React.FC<ActionPageProps> = ({ id, status, refetch }: ActionPageProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [type, setType] = useState<ActionType>(null);

  const dispatch = useAppDispatch();
  const scroll: "paper" = "paper";

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    actionType: ActionType
  ) => {
    setAnchorEl(event.currentTarget);
    setType(actionType);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setType(null);
  };

  const handleDeleteStatus = async () => {
    try {
      await dispatch(deleteCustomer({ ids: [id] })).unwrap();
      toast.success('Bạn đã xoas customer thành công!')
      handleClosePopover();
      await refetch();
    } catch (err) {
      toast.error('Lỗi! Hiện tại không xóa được customer!')
    }
  };

  const handleEditStatus = async () => {
    try {
      await dispatch(updateStatus({ id, payload: { status: !status } })).unwrap();
      toast.success('Bạn đã thay đổi status thành công!')
      handleClosePopover();
      await refetch();
    } catch (err) {
      toast.error('Lỗi! Hiện tại không thay đổi được status!')
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <DeleteOutlineIcon
        onClick={(e: any) => handleClick(e, "delete")}
        sx={{ color: "red", fontSize: 22, cursor: "pointer", "&:hover": { opacity: 0.7 } }}
      />

      <BorderColorIcon
        onClick={(e: any) => handleClick(e, "edit")}
        sx={{ color: "green", fontSize: 22, cursor: "pointer", "&:hover": { opacity: 0.7 } }}
      />

      {/* POPUP */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Card sx={{ p: 2, maxWidth: 500 }}>
          <CardContent>
            {type === "delete" && (
              <>
                <Typography sx={{ fontWeight: 'bold', mb: 1, color: "red", fontFamily: "Inter" }}>
                  <ErrorOutlineIcon sx={{ fontSize: 20, fontFamily: "Inter" }} /> Xác nhận xóa
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  Bạn có chắc chắn muốn xóa customer này?
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                  <Button variant="outlined" size="small" onClick={handleClosePopover} sx={{ textTransform: 'none', textDecoration: 'none' }}>Hủy</Button>
                  <Button variant="contained" size="small" color="error" onClick={handleDeleteStatus} sx={{ textTransform: 'none', textDecoration: 'none' }}>Xóa</Button>
                </Box>
              </>
            )}

            {type === "edit" && (
              <>
                <Typography sx={{ fontWeight: 'bold', mb: 1, color: "#f59e0b", fontFamily: "Inter" }}>
                  <ErrorOutlineIcon sx={{ fontSize: 20 }} /> Xác nhận thay đổi
                </Typography>

                <Typography sx={{ mb: 2, fontFamily: "Inter" }}>
                  Bạn có chắc chắn muốn thay đổi status customer này?
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                  <Button variant="outlined" size="small" onClick={handleClosePopover} sx={{ textTransform: 'none', textDecoration: 'none' }}>Hủy</Button>
                  <Button variant="contained" size="small" onClick={handleEditStatus} sx={{ textTransform: 'none', textDecoration: 'none' }}>
                    Xác nhận
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Popover>
    </Box>
  );
};

export default ActionPage;
