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
  Checkbox,
  FormControlLabel,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import LoginImage from "../assets/loginImage.jpg";
import { login } from "@/redux/Slice/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";

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
  open: boolean;
  handleClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickOpenRegister: () => void;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Không phải email hợp lệ").required("Vui lòng nhập email!"),
  password: Yup.string().required("Vui lòng nhập mật khẩu!").min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export default function HomeLogin({ open, handleClose, handleClickOpenRegister }: IProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  // const router = useRouter();

  return (
    <BootstrapDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        handleClose();
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
            pt: 16,
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
              Đăng nhập
            </Typography>
            <Divider
              variant="middle"
              sx={{ width: "96px", border: "solid 1.39px #1C5C80", mb: 3 }}
            />
            <DialogContent sx={{ p: 0 }}>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                try {
                  const res = await dispatch(
                    login({
                      email: values.email,
                      password: values.password,
                      device_token: "xxx111xxx",
                    })
                  );

                  if (login.fulfilled.match(res)) {
                    toast.success("🎉 Đăng nhập thành công!", { theme: "colored" });
                    handleClose()
                    // setTimeout(() => 
                    //   router.replace('/')
                    // , 1200);
                  } else {
                    toast.error(res.payload || "❌ Sai email hoặc mật khẩu", { theme: "colored" });
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
                    {/* Email */}
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

                    {/* Password */}
                    <Field
                      as={TextField}
                      fullWidth
                      margin="normal"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu"
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

                    {/* Button */}
                    <Button
                      fullWidth
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
                        "&:hover": {
                          bgcolor: "#155170",
                          transform: "scale(1.02)",
                          transition: "0.2s",
                        },
                      }}
                    >
                      Đăng nhập
                    </Button>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <FormControlLabel control={<Checkbox name="remember" />} label="Nhớ mật khẩu" />
                      <Typography
                        sx={{ fontSize: 14, color: "#1C5C80", cursor: "pointer" }}
                      >
                        Quên mật khẩu?
                      </Typography>
                    </Box>

                    {/* Sign up */}
                    <Box sx={{ textAlign: "center", mt: 1 }}>
                      <Typography sx={{ fontSize: 14 }}>
                        Chưa có tài khoản?{" "}
                        <span
                        onClick={() => {
                          handleClickOpenRegister() 
                          handleClose()
                          }
                        }
                          style={{
                            color: "#1C5C80",
                            textTransform: "none",
                            textDecoration: "none",
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          Đăng ký
                        </span>{" "}
                        ngay
                      </Typography>
                    </Box>
                  </Form>
                )}
              </Formik>
            </DialogContent>
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
            src={LoginImage}
            alt="Login"
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
            onClick={handleClose}
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
