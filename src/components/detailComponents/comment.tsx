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
    TextField,
    Rating,
    Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { reviewComment } from "@/redux/Slice/userSlice";
import { useQuery } from "@tanstack/react-query";
import { IReview } from "@/typescript/home";
import { fetchReview } from "@/api/home/api.home";

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
    id: string;
};

const CommentSchema = Yup.object().shape({
    rate: Yup.number()
        .min(1, "Vui lòng chọn mức đánh giá")
        .required("Bắt buộc chọn đánh giá"),
    content: Yup.string()
        .min(10, "Nội dung tối thiểu 10 ký tự")
        .required("Vui lòng nhập nội dung đánh giá"),
    images: Yup.array()
        .of(Yup.mixed())
        .min(1, "Vui lòng chọn ít nhất 1 hình ảnh"),
});

export default function Comment({ open, handleClose, id }: IProps) {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const { refetch } = useQuery<IReview[]>({
        queryKey: ["review", id],
        queryFn: () => fetchReview(Number(id)),
        enabled: !!id,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const [previewImages, setPreviewImages] = React.useState<string[]>([]);

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
                    maxWidth: "700px",
                    width: "90%",
                    m: 0,
                    position: "absolute",
                    top: "15%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: 670,
                },
            }}
        >
            <Box sx={{ display: "flex", height: "100%" }}>
                <Box
                    sx={{
                        flex: 1,
                        px: 7,
                        py: 8,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 3,
                    }}
                >
                    <Formik
                        initialValues={{
                            rate: 5,
                            content: "",
                            images: [] as File[],
                        }}
                        validationSchema={CommentSchema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            try {
                                const formData = new FormData();
                                formData.append("room_id", String(id ?? ""));
                                formData.append("user_id", String(user?.id ?? ""));
                                formData.append("rate", String(values.rate ?? ""));
                                formData.append("content", values.content ?? "");

                                values.images.forEach((img) => {
                                    formData.append("images[]", img);
                                });  //mảng chèn đa ảnh

                                await dispatch(reviewComment(formData)).unwrap();

                                toast.success("🎉 Gửi đánh giá thành công!", { theme: "colored" });
                                await refetch();
                                resetForm();
                                handleClose();
                            } catch (err: any) {
                                toast.error(err.message || "Có lỗi xảy ra!", { theme: "colored" });
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            isSubmitting,
                        }) => (
                            <Form>
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        pb: 3,
                                        fontFamily: "SVN-Gilroy",
                                        fontWeight: 600,
                                        fontSize: "26px",
                                        color: "#343434",
                                    }}
                                >
                                    Gửi đánh giá của bạn về chuyến đi
                                </Typography>

                                {/* --- Rating --- */}
                                <Typography sx={{ fontSize: "16px", color: "#666", mb: 1 }}>
                                    Mức độ hài lòng:
                                </Typography>

                                <Rating
                                    name="rate"
                                    value={values.rate}
                                    onChange={(_, newValue) =>
                                        setFieldValue("rate", newValue)
                                    }
                                    size="large"
                                />
                                {touched.rate && errors.rate && (
                                    <Typography color="error" fontSize={13}>
                                        {errors.rate}
                                    </Typography>
                                )}

                                {/* --- Nội dung --- */}
                                <TextField
                                    name="content"
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    label="Nội dung đánh giá"
                                    variant="outlined"
                                    sx={{ mt: 3 }}
                                    value={values.content}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.content && Boolean(errors.content)}
                                    helperText={touched.content && errors.content}
                                />

                                {/* --- Upload nhiều ảnh --- */}
                                <Box sx={{ mt: 3 }}>
                                    <Typography sx={{ fontSize: "16px", color: "#666", mb: 1 }}>
                                        Ảnh minh chứng (tùy chọn)
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{
                                            textTransform: "none",
                                            borderRadius: "10px",
                                            fontFamily: "Inter",
                                        }}
                                    >
                                        Tải ảnh lên
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || []);
                                                setFieldValue("images", [
                                                    ...values.images,
                                                    ...files,
                                                ]);

                                                // tạo preview ảnh
                                                const previews = files.map((file) =>
                                                    URL.createObjectURL(file)
                                                );
                                                setPreviewImages((prev) => [
                                                    ...prev,
                                                    ...previews,
                                                ]);
                                            }}
                                        />
                                    </Button>

                                    {previewImages.length > 0 && (
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                            sx={{ mt: 2 }}
                                        >
                                            {previewImages.map((img, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        position: "relative",
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 2,
                                                        overflow: "hidden",
                                                        border: "1px solid #ccc",
                                                    }}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`preview-${index}`}
                                                        width="80"
                                                        height="80"
                                                        style={{
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                        }}
                                                    />
                                                </Box>
                                            ))}
                                        </Stack>
                                    )}
                                </Box>

                                {/* --- Nút hành động --- */}
                                <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        type="submit"
                                        disabled={isSubmitting}
                                        sx={{
                                            flex: 1,
                                            height: 51,
                                            fontWeight: 700,
                                            fontSize: "18px",
                                            color: "#FFFFFF",
                                            fontFamily: "SVN-Gilroy",
                                        }}
                                    >
                                        Gửi đánh giá
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleClose}
                                        sx={{
                                            flex: 1,
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
                            </Form>
                        )}
                    </Formik>
                </Box>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: "absolute",
                        right: 16,
                        top: 16,
                        color: theme.palette.grey[100],
                        backgroundColor: "rgba(0,0,0,0.4)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                    })}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </BootstrapDialog>
    );
}
