"use client";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  Typography,
  Divider,
  Box,
  Slide,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Hiệu ứng mở modal trượt lên
import { TransitionProps } from "@mui/material/transitions";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

type IProps = {
  openSuccessVerify: boolean;
  handleCloseSuccessVerify: () => void;
  handleClickOpen: () => void;
};

export default function HomeVerifySuccess({ openSuccessVerify, handleCloseSuccessVerify, handleClickOpen }: IProps) {

  const handleChangeLogin = () => {
    handleCloseSuccessVerify();
    handleClickOpen();
  }

  return (
    <BootstrapDialog
      open={openSuccessVerify}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleChangeLogin()
      }}
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0px 8px 40px rgba(0,0,0,0.25)",
          maxWidth: "444px",
          height: 262,
          width: "100%",
          m: 0,
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
    >
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            flex: 1,
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            gap: 2
          }}
        >
            <CheckCircleIcon sx={{width: 91.109375, height: 91.109375, borderRadius: '50%', color: "#1C5C80"}}/>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "18px",
                color: "#1C5C80",
              }}
            >
              Đăng ký thành công
            </Typography>
        </Box>
        <IconButton
            aria-label="close"
            onClick={handleChangeLogin}
            sx={(theme) => ({
                position: "absolute",
                right: 16,
                top: 16,
                color: '#1C5C80',
            })}
        >
            <CloseIcon />
        </IconButton>
        </Box>       
    </BootstrapDialog>
  );
}
