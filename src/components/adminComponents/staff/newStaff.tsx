"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    InputAdornment,
    IconButton,
    MenuItem,
    Avatar,
    Dialog,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/hooks";
import { createStaff } from "@/redux/Slice/adminSlice";
import { toast } from "react-toastify";

interface IProps {
    refetch: () => void;
    onClose: () => void;
    open: boolean;
}

const StaffSchema = Yup.object().shape({
    email: Yup.string().required("Vui lòng nhập email!"),
    display_name: Yup.string().required("Vui lòng nhập tên!"),
    phone_number: Yup.string()
        .required("Vui lòng nhập số điện thoại!")
        .matches(/^[0-9]+$/, "Chỉ được nhập số")
        .min(8, "Phải có ít nhất 8 số")
        .max(10, "Chỉ được tối đa 10 số"),
    detail_address: Yup.string().required("Vui lòng nhập địa chỉ!"),
    password: Yup.string(),
    role_id: Yup.string()
        .oneOf(["1", "3"], "Vai trò không hợp lệ")
        .required("Vui lòng chọn vai trò"),
});

const NewStaff = ({ open, onClose, refetch }: IProps) => {
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const [preview, setPreview] = useState<string | null>(null);

    const initialValues = {
        email: "",
        password: "",
        display_name: "",
        phone_number: "",
        detail_address: "",
        role_id: "",
        image_data: null as File | null,
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { borderRadius: 3, width: 600 } }}
        >
            <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 600 }}>Tạo mới nhân viên</DialogTitle>

            <Formik
                enableReinitialize //tự reset khi ini thay đổi
                initialValues={initialValues}
                validationSchema={StaffSchema}
                onSubmit={async (values) => {
                    const formData = new FormData();
                    formData.append("email", values.email);
                    formData.append("password", values.password);
                    formData.append("display_name", values.display_name);
                    formData.append("phone_number", values.phone_number);
                    formData.append("detail_address", values.detail_address);
                    formData.append("role_id", values.role_id);

                    if (values.image_data) {
                        formData.append("image_data", values.image_data);
                    }

                    try {
                        await dispatch(createStaff({ formData: formData })).unwrap();
                        toast.success('Bạn đã tạo nhân viên thành công!')
                        await refetch();
                        onClose();
                    } catch (err) {
                        toast.error('Lỗi! Hiện tại không tạo được nhân viên!')
                    }
                }}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                        <DialogContent dividers>

                            {/* Avatar */}
                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <Avatar
                                    src={preview || ""}
                                    sx={{ width: 80, height: 80, border: "1px solid #ccc" }}
                                />
                                <Box>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{ textTransform: "none" }}
                                    >
                                        Upload ảnh
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setFieldValue("image_data", file);
                                                    setPreview(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                    </Button>
                                </Box>
                            </Box>

                            {/* email */}
                            <TextField
                                name="email"
                                label="Email"
                                fullWidth
                                margin="dense"
                                value={values.email}
                                onChange={(e) => setFieldValue("email", e.target.value)}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email ? (errors.email as string) : undefined}
                            />

                            {/* display_name */}
                            <TextField
                                name="display_name"
                                label="Tên hiển thị"
                                fullWidth
                                margin="dense"
                                value={values.display_name}
                                onChange={(e) => setFieldValue("display_name", e.target.value)}
                                error={touched.display_name && Boolean(errors.display_name)}
                                helperText={touched.display_name ? (errors.display_name as string) : undefined}
                            />

                            {/* phone_number */}
                            <TextField
                                name="phone_number"
                                label="Số điện thoại"
                                fullWidth
                                margin="dense"
                                value={values.phone_number}
                                onChange={(e) => setFieldValue("phone_number", e.target.value)}
                                error={touched.phone_number && Boolean(errors.phone_number)}
                                helperText={touched.phone_number ? (errors.phone_number as string) : undefined}
                            />

                            {/* detail_address */}
                            <TextField
                                name="detail_address"
                                label="Địa chỉ chi tiết"
                                fullWidth
                                margin="dense"
                                value={values.detail_address}
                                onChange={(e) => setFieldValue("detail_address", e.target.value)}
                                error={touched.detail_address && Boolean(errors.detail_address)}
                                helperText={touched.detail_address ? (errors.detail_address as string) : undefined}
                            />

                            {/* password */}
                            <TextField
                                name="password"
                                label="Password"
                                fullWidth
                                margin="dense"
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={(e) => setFieldValue("password", e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* role_id */}
                            <TextField
                                select
                                label="Vai trò"
                                fullWidth
                                margin="dense"
                                value={values.role_id}
                                onChange={(e) => setFieldValue("role_id", e.target.value)}
                                error={touched.role_id && Boolean(errors.role_id)}
                                helperText={touched.role_id ? (errors.role_id as string) : undefined}
                            >
                                <MenuItem value="1">Admin</MenuItem>
                                <MenuItem value="3">Staff</MenuItem>
                            </TextField>
                        </DialogContent>

                        <DialogActions>
                            <Button sx={{ textTransform: "none" }} onClick={onClose}>
                                Hủy
                            </Button>
                            <Button type="submit" variant="contained" sx={{ textTransform: "none" }}>
                                Lưu
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default NewStaff;
