"use client";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
    Dialog,
    IconButton,
    Typography,
    Box,
    Slide,
    Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import ContactImage from "../../assets/TourBanner.jpg";


// Hiệu ứng mở modal trượt lên
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { orderTour } from "@/redux/Slice/userSlice";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
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
    check: boolean;
    handleCloseCheck: () => void;
    id: string;
};


export default function TourModalCheck({ check, handleCloseCheck, id }: IProps) {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth)
    const queryClient = useQueryClient();

    const handleBookingTiket = async () => {
        try {
            await dispatch(
                orderTour({
                    id_room: id,
                    id_user: user?.id,
                })
            );

            queryClient.invalidateQueries({
                queryKey: ["orders", user?.id],
            });

            toast.success("🎉 Đặt vé thành công!", { theme: "colored" });
        } catch (err: any) {
            toast.error(err.message || "Có lỗi xảy ra!", { theme: "colored" });
        } finally {
            handleCloseCheck()
        }
    }

    return (
        <BootstrapDialog
            open={check}
            TransitionComponent={Transition}
            keepMounted
            onClose={(event, reason) => {
                if (reason === "backdropClick") return;
                handleCloseCheck();
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
                    height: 427,
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
                                fontSize: "26px",
                                color: "#343434",
                            }}
                        >
                            Bạn có chắc chắn sự lựa chọn của bạn là chuyến đi này không?
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleBookingTiket}
                            sx={{
                                width: '100%',
                                height: 51,
                                fontWeight: 700,
                                fontSize: "18px",
                                color: "#FFFFFF",
                                fontFamily: "SVN-Gilroy",
                            }}
                        >
                            Đặt ngay
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleCloseCheck}
                            sx={{
                                width: '100%',
                                height: 51,
                                fontWeight: 700,
                                fontSize: "18px",
                                color: "#E54141",
                                fontFamily: "SVN-Gilroy",
                            }}
                        >
                            Hủy
                        </Button>
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
                        onClick={handleCloseCheck}
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
