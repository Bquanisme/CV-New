"use client";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { getDetailStaffAPI } from "@/api/home/api.admin";
import { editStaff } from "@/redux/Slice/adminSlice";
import { toast } from "react-toastify";

interface IProps {
    refetch: () => void;
    close: () => void;
    id: number;
}

const StaffSchema = Yup.object().shape({
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

const EditStaff = ({ close, id, refetch }: IProps) => {
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const [preview, setPreview] = useState<string | null>(null);

    const { data } = useQuery({
        queryKey: ['detailStaff', id],
        queryFn: () => getDetailStaffAPI(id),
        enabled: !!id,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    const initialValues = {
        password: "",
        display_name: data?.display_name ?? "",
        phone_number: data?.phone_number ?? "",
        detail_address: data?.detail_address ?? "",
        role_id: data?.role_id ?? "",
        image_data: null as File | null,
        image_delete: false,
    };

    useEffect(() => {
        if (data?.avatar) {
            setPreview(data?.avatar);
        }
    }, [data]);



    return (
        <>
            <DialogTitle sx={{ fontFamily: 'Inter', fontWeight: 600 }}>Chỉnh sửa nhân viên</DialogTitle>

            <Formik
                enableReinitialize //tự reset khi ini thay đổi
                initialValues={initialValues}
                validationSchema={StaffSchema}
                onSubmit={async (values) => {
                    const formData = new FormData();
                    formData.append("password", values.password);
                    formData.append("display_name", values.display_name);
                    formData.append("phone_number", values.phone_number);
                    formData.append("detail_address", values.detail_address);
                    formData.append("role_id", values.role_id);
                    formData.append("image_delete", values.image_delete.toString());

                    if (values.image_data) {
                        formData.append("image_data", values.image_data);
                    }

                    try {
                        await dispatch(editStaff({ id, formData: formData })).unwrap();
                        toast.success('Bạn đã cập nhật thành công!')
                        await refetch();
                        close();
                    } catch (err) {
                        toast.error('Lỗi! Hiện tại không cập nhật được nhân viên!')
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
                                                    setFieldValue("image_delete", false);
                                                    setPreview(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                    </Button>

                                    {preview && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{ ml: 1, textTransform: "none" }}
                                            onClick={() => {
                                                setPreview(null);
                                                setFieldValue("image_data", null);
                                                setFieldValue("image_delete", true);
                                            }}
                                        >
                                            Xóa ảnh
                                        </Button>
                                    )}
                                </Box>
                            </Box>

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
                                label="Mật khẩu (để trống nếu không đổi)"
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
                            <Button sx={{ textTransform: "none" }} onClick={close}>
                                Hủy
                            </Button>
                            <Button type="submit" variant="contained" sx={{ textTransform: "none" }}>
                                Lưu
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default EditStaff;
