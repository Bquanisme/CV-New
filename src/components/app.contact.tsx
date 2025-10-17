"use client";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  IconButton,
  Typography,
  Box,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import ContactImage from "../assets/contact.jpg";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LanguageIcon from '@mui/icons-material/Language';

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
  contact: boolean;
  handleCloseContact: () => void;
};


export default function AppContact({ contact, handleCloseContact }: IProps) {
  return (
    <BootstrapDialog
      open={contact}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleCloseContact();
      }}
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0px 8px 40px rgba(0,0,0,0.25)",
          maxWidth: "1141px",
          width: "90%",
          m: 0,
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          height: 497,
        },
      }}
    >
      <Box sx={{ display: "flex", height: "100%" }}>
        {/* Cột trái */}
        <Box
          sx={{
            flex: 1,
            px: 7,
            py: 10,
            pt: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                pl: 1.5,
                pb: 0,
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: "20px",
                color: "#343434",
              }}
            >
              Để đặt vé liên hệ ngay qua hotline hoặc truy cập và website để biết thêm thông tin
            </Typography>
          </Box>
          <Box sx={{display: 'flex', gap: 3, flexDirection: 'column', }}>
            <Box sx={{display: 'flex', gap: 6}}>
              <Box sx={{display: 'flex', gap: 2}}>
                <PhoneInTalkIcon sx={{width: 32, height: 32, color: 'red'}}/>
                <Typography 
                sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "18px",
                    color: "#E54141",
                }}>
                    Hotline:
                </Typography>
              </Box>
            <Typography 
                sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "18px",
                    color: "#343434",
                }}>
                    0362 334 912 - 0333 999 555
            </Typography>
          </Box>
          <Box sx={{display: 'flex', gap: 6}}>
            <Box sx={{display: 'flex', gap: 2}}>
              <LanguageIcon sx={{width: 32, height: 32, color: 'red'}}/>
              <Typography 
              sx={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "18px",
                  color: "#E54141",
              }}>
                  Website: 
              </Typography>
            </Box>
            <Typography 
              sx={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "18px",
                  color: "#343434",
              }}>
                  sealifelegend.com.vn
            </Typography>
          </Box>
          <Box sx={{display: 'flex', gap: 6}}>
            <Box sx={{display: 'flex', gap: 2}}>
              <PhoneInTalkIcon sx={{width: 32, height: 32, color: 'red'}}/>
              <Typography 
              sx={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "18px",
                  color: "#E54141",
              }}>
                  Facebook:
              </Typography>
            </Box>
            <Typography 
                sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "18px",
                    color: "#343434",
                    ml: -2
                }}>
                    Viện Hải Dương Học Nha Trang
            </Typography>
          </Box>
          </Box>
        </Box>
        

        {/* Cột phải */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            borderRadius: "0 12px 12px 0",
            overflow: "hidden",
          }}
        >
          <Image
            src={ContactImage}
            alt="contact image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw" //media + destop
            style={{
              objectFit: "cover",
              filter: "brightness(0.8)",
              transition: "transform 0.8s ease",
            }}
          />
          <IconButton
            aria-label="close"
            onClick={handleCloseContact}
            sx={(theme) => ({
              position: "absolute",
              right: 16,
              top: 16,
              color: theme.palette.grey[100],
              backgroundColor: "rgba(0,0,0,0.4)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.6)",
              },
            })}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </BootstrapDialog>
  );
}
