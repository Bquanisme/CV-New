"use client";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Divider,
  Box,
  TextField,
  InputAdornment,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register } from "@/redux/Slice/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";
import { TransitionProps } from "@mui/material/transitions";
import HomeVerify from "./home.verify";

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
  openRegister: boolean;
  handleCloseRegister: () => void;
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickOpen: () => void;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Không phải email hợp lệ").required("Vui lòng nhập email!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!").min(6, "Mật khẩu ít nhất 6 ký tự"),
  display_name: Yup.string().required("Vui lòng nhập tên!"),
  phone_number: Yup.string().required("Vui lòng nhập số điện thoại!").min(8, "Phải có ít nhất 8 số").max(10, "Chỉ được tối đa 10 số"),
  detail_address: Yup.string().required("Vui lòng nhập địa chỉ!"),
});

export default function HomeRegister({ openRegister, handleCloseRegister, handleClickOpen }: IProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [openVerify, setOpenVerify] = React.useState(false);
  const [emailNew, setEmailNew] = React.useState<string>(" ");
  const dispatch = useAppDispatch();
  
  const handleClickOpenVerify = () => {
    setOpenVerify(true);
  };
  const handleCloseVerify = () => {
    setOpenVerify(false);
  };


  return (
    <BootstrapDialog
      open={openRegister}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleCloseRegister();
      }}
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0px 8px 40px rgba(0,0,0,0.25)",
          maxWidth: "1092px",
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
              Đăng ký
            </Typography>
            <Divider
              variant="middle"
              sx={{ width: "96px", border: "solid 1.39px #1C5C80", mb: 3 }}
            />
            <DialogContent sx={{ p: 0 }}>
              <Formik
                initialValues={{ email: "", password: "", display_name: "", phone_number: "", detail_address: "", }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                try {
                  const res = await dispatch(
                    register({
                      email: values.email,
                      password: values.password,
                      display_name: values.display_name,
                      phone_number: values.phone_number,
                      detail_address: values.detail_address,
                    })
                  );

                  if (register.fulfilled.match(res)) {
                    await toast.success("🎉 Đăng ký thành công!", { theme: "colored" }); 
                    await toast.info("Vui lòng lấy mã xác nhận tại Email của bạn!", { theme: "colored" });
                    setEmailNew(values.email)
                    handleCloseRegister();
                    handleClickOpenVerify();
                    // setTimeout(() => 
                    //   router.replace('/')
                    // , 1200);
                  } else {
                    toast.error(res.payload || "❌ Sai thông tin!! Vui lòng kiểm tra lại", { theme: "colored" });
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
                            name="display_name"
                            placeholder="Nhập tên người dùng"
                            value={values.display_name}
                            onChange={handleChange}
                            error={touched.display_name && Boolean(errors.display_name)}
                            helperText={touched.display_name && errors.display_name}
                            />
                        </Box>
                        <Box sx={{width: '100%'}}>
                            <Typography sx={{fontWeight: 600, fontSize: '16px',  fontFamily: 'Inter'}}>
                                Địa chỉ
                            </Typography>
                            <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            name="detail_address"
                            placeholder="Nhập địa chỉ"
                            value={values.detail_address}
                            onChange={handleChange}
                            error={touched.detail_address && Boolean(errors.detail_address)}
                            helperText={touched.detail_address && errors.detail_address}
                            />
                        </Box>
                    </Box><br />

                    {/* Email & SĐT */}
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Box sx={{width: '100%'}}>
                            <Typography sx={{fontWeight: 600, fontSize: '16px',  fontFamily: 'Inter'}}>
                                Email
                            </Typography>
                            <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            name="email"
                            placeholder="Nhập email"
                            value={values.email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            />
                        </Box>
                        <Box sx={{width: '100%'}}>
                            <Typography sx={{fontWeight: 600, fontSize: '16px',  fontFamily: 'Inter'}}>
                                Nhập số điện thoại
                            </Typography>
                            <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            name="phone_number"
                            placeholder="Nhập số điện thoại"
                            value={values.phone_number}
                            onChange={handleChange}
                            error={touched.phone_number && Boolean(errors.phone_number)}
                            helperText={touched.phone_number && errors.phone_number}
                            />
                        </Box>
                    </Box><br />

                    {/* Password */}
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Box sx={{width: '100%'}}>
                            <Typography sx={{fontWeight: 600, fontSize: '16px',  fontFamily: 'Inter'}}>
                                Nhập mật khẩu
                            </Typography>
                            <Field
                            as={TextField}
                            fullWidth
                            margin="normal"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu"
                            value={values.password}
                            onChange={handleChange}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
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
                      Đăng ký
                    </Button>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Box>
        </Box>

        <IconButton
          aria-label="close"
          onClick={handleCloseRegister}
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
      <HomeVerify openVerify={openVerify} handleCloseVerify={handleCloseVerify} email={emailNew} handleClickOpen={handleClickOpen}/>
    </BootstrapDialog>
  );
}
