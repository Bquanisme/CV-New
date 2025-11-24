"use client";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  IconButton,
  Box,
  Slide,
  Button,
  TextField,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import ContactImage from "../../assets/RoomDetailModal.jpg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { orderRoom } from "@/redux/Slice/userSlice";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0px 12px 40px rgba(0,0,0,0.25)",
    maxWidth: "1100px",
    width: "95%",
    height: 620,
  },
}));

const validationSchema = Yup.object().shape({
  start_date: Yup.date().required("Vui lòng chọn ngày đến"),
  end_date: Yup.date()
    .required("Vui lòng chọn ngày đi")
    .min(Yup.ref("start_date"), "Ngày đi phải sau ngày đến"),
});

type IProps = {
  check: boolean;
  handleCloseCheck: () => void;
  id: string;
};

export default function RoomModalCheck({ check, handleCloseCheck, id }: IProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <BootstrapDialog
      open={check}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleCloseCheck();
      }}
    >
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            flex: 1,
            p: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "#fff",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: "22px",
              color: "#002855",
              mb: 1,
              textTransform: "uppercase",
            }}
          >
            Vinpearl Resort & Spa Nha Trang Bay
          </Typography>
          <Divider sx={{ mb: 4, borderColor: "#dcdcdc" }} />

          <Formik
            initialValues={{ start_date: "", end_date: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await dispatch(
                  orderRoom({
                    id_room: id,
                    id_user: user?.id,
                    start_date: values.start_date,
                    end_date: values.end_date,
                  })
                );
                toast.success("🎉 Đặt vé thành công!", { theme: "colored" });
              } catch (err: any) {
                toast.error(err.message || "Có lỗi xảy ra!", { theme: "colored" });
              } finally {
                handleCloseCheck();
                setSubmitting(false);
              }
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
              <Form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "17px",
                      mb: 1,
                      color: "#333",
                    }}
                  >
                    Ngày đến
                  </Typography>
                  <TextField
                    type="date"
                    name="start_date"
                    value={values.start_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.start_date && Boolean(errors.start_date)}
                    helperText={touched.start_date && errors.start_date}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "17px",
                      mb: 1,
                      color: "#333",
                    }}
                  >
                    Ngày đi
                  </Typography>
                  <TextField
                    type="date"
                    name="end_date"
                    value={values.end_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.end_date && Boolean(errors.end_date)}
                    helperText={touched.end_date && errors.end_date}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{
                    height: 56,
                    fontWeight: 700,
                    fontSize: 17,
                    textTransform: "none",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(90deg, #0072CE 0%, #00AEEF 100%)",
                    boxShadow: "0px 4px 10px rgba(0, 114, 206, 0.4)",
                    mt: 1,
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #0062b8 0%, #00a0e0 100%)",
                    },
                  }}
                >
                  Đặt phòng
                </Button>
              </Form>
            )}
          </Formik>
        </Box>

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
            sizes="(max-width: 768px) 100vw, 50vw"
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
              color: "#fff",
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
