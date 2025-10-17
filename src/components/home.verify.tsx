"use client";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Divider,
  Box,
  TextField,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register, verify } from "@/redux/Slice/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";
// Hiệu ứng mở modal trượt lên
import { TransitionProps } from "@mui/material/transitions";
import HomeVerifySuccess from "./home.verifySuccess";

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
  openVerify: boolean;
  handleCloseVerify: () => void;
  email: string;
  handleClickOpen: () => void;
};

const LoginSchema = Yup.object().shape({
  code: Yup.string().required("Vui lòng nhập thông tin xác nhận!"),
});

export default function HomeVerify({ openVerify, handleCloseVerify, email, handleClickOpen }: IProps) {
  const [openSuccessVerify, setOpenSuccessVerify] = React.useState(false);

    const dispatch = useAppDispatch();

  const handleOpenSuccessVerify = () => {
    setOpenSuccessVerify(true);
  };
  const handleCloseSuccessVerify = () => {
    setOpenSuccessVerify(false);
  };

  return (
    <BootstrapDialog
      open={openVerify}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleCloseVerify();
      }}
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0px 8px 40px rgba(0,0,0,0.25)",
          maxWidth: "592px",
          width: "90%",
          m: 0,
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                pl: 1.5,
                pb: 1,
                fontFamily: "SVN-Gilroy",
                fontWeight: 700,
                fontSize: "24px",
                color: "#1C5C80",
              }}
            >
              Xác nhận đăng ký tài khoản
            </Typography>
            <Divider
              variant="middle"
              sx={{ width: "96px", border: "solid 1.39px #1C5C80", mb: 3 }}
            />
            <DialogContent sx={{ p: 0 }}>
              <Formik
                initialValues={{ email: "", code: "" }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                try {
                  const res = await dispatch(
                    verify({
                      email: email,
                      code: values.code,
                    })
                  );

                  if (verify.fulfilled.match(res)) {
                    handleCloseVerify();
                    handleOpenSuccessVerify();
                  } else {
                    toast.error("❌ Sai mã xác nhận!! Vui lòng kiểm tra lại Email", { theme: "colored" });
                  }
                } catch (err: any) {
                  toast.error(err.message || "Có lỗi xảy ra!", { theme: "colored" });
                } finally {
                  setSubmitting(false);
                }
              }}
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form>
                    {/* Name & Address */}
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Box sx={{width: '100%'}}>
                            <Typography sx={{fontWeight: 600, fontSize: '16px',  fontFamily: 'Inter'}}>
                                Tên người dùng
                            </Typography>
                            <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            name="code"
                            placeholder="Nhập code xác minh"
                            value={values.code}
                            onChange={handleChange}
                            error={touched.code && Boolean(errors.code)}
                            helperText={touched.code && errors.code}
                            />
                        </Box>
                    </Box><br />

                    {/* Button */}
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        bgcolor: "#1C5C80",
                        color: "white",
                        mt: 2,
                        height: 45,
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "16px",
                        width: '100%',
                        "&:hover": {
                          bgcolor: "#155170",
                          transform: "scale(1.02)",
                          transition: "0.2s",
                        },
                      }}
                    >
                      Xác nhận
                    </Button>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Box>
        </Box>
      </Box>
      <HomeVerifySuccess openSuccessVerify={openSuccessVerify} handleCloseSuccessVerify={handleCloseSuccessVerify} handleClickOpen={handleClickOpen}/>
    </BootstrapDialog>
  );
}
