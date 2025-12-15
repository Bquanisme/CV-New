"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    MenuItem,
    Typography,
    Dialog,
} from "@mui/material";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { createRoom, createTour } from "@/redux/Slice/adminSlice";

interface IProps {
    refetch: () => void;
}

const statuses = [{ label: "Hoạt động", value: 1 }];

const roomTypes = [
    { label: "Du lịch", value: "tour" },
    { label: "Phòng nghỉ", value: "room" },
];

const ValidationSchema = Yup.object({
    name: Yup.string().required("Tên tour bắt buộc"),
    cost: Yup.number().required("Giá bắt buộc"),
    description: Yup.string().required("Nhập mô tả"),
    type_room: Yup.string().required("Chọn loại phòng"),
    type: Yup.string().required("Chọn danh mục"),
    status: Yup.number().required("Chọn trạng thái"),
    start_date: Yup.string().required("Chọn ngày bắt đầu"),
    end_date: Yup.string().required("Chọn ngày kết thúc"),
});

export default function NewManageTour({ refetch }: IProps) {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    const dispatch = useAppDispatch();

    const initialValues = {
        name: "",
        cost: "",
        type: "",
        status: 1,
        type_room: "",
        logo: null as File | null,
        banner: [] as File[],
        start_date: "",
        end_date: "",
        description: "",
    };

    const handleClose = () => {
        setOpenDialog(false);
        setLogoPreview(null);
        setBannerPreview([]);
    };

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                onClick={() => setOpenDialog(true)}
            >
                New Category
            </Button>

            <Dialog
                maxWidth={false}
                open={openDialog}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        position: "absolute",
                        top: 80,
                        m: 0,
                        borderRadius: 2,
                        width: 900,
                        p: 2,
                    },
                }}
            >
                <Box p={3} sx={{ width: "100%", margin: "0 auto" }}>
                    <Typography variant="h5" mb={3} sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                        Thêm mới Tour
                    </Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={ValidationSchema}
                        onSubmit={async (values) => {
                            const formData = new FormData();

                            formData.append("name", values.name);
                            formData.append("cost", String(values.cost));
                            formData.append("type", values.type);
                            formData.append("status", String(values.status));
                            formData.append("type_room", values.type_room);
                            formData.append("start_date", values.start_date);
                            formData.append("end_date", values.end_date);
                            formData.append("description", values.description);

                            if (values.logo instanceof File) {
                                formData.append("logo", values.logo);
                            }

                            if (Array.isArray(values.banner)) {
                                values.banner.forEach((file) => {
                                    formData.append("banner[]", file);
                                });
                            }

                            try {
                                if (values.type_room === "tour") {
                                    await dispatch(createTour(formData)).unwrap();
                                    toast.success("Bạn đã tạo tour mới thành công!");
                                } else {
                                    await dispatch(createRoom(formData)).unwrap();
                                    toast.success("Bạn đã tạo phòng mới thành công!");
                                }

                                await refetch();
                                handleClose();
                            } catch (err) {
                                toast.error("Lỗi! Không thể tạo mục mới!");
                            }
                        }}
                    >
                        {({ values, errors, touched, handleChange, setFieldValue }) => (
                            <Form>
                                <Box display="flex" gap={2}>
                                    <TextField
                                        label="Name Tour"
                                        name="name"
                                        fullWidth
                                        value={values.name}
                                        onChange={handleChange}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                    <TextField
                                        label="Category"
                                        name="type"
                                        fullWidth
                                        value={values.type}
                                        onChange={handleChange}
                                        error={touched.type && Boolean(errors.type)}
                                        helperText={touched.type && errors.type}
                                    />
                                </Box>

                                <Box display="flex" gap={2} mt={2}>
                                    <TextField
                                        label="Cost"
                                        name="cost"
                                        type="number"
                                        fullWidth
                                        value={values.cost}
                                        onChange={handleChange}
                                        error={touched.cost && Boolean(errors.cost)}
                                        helperText={touched.cost && errors.cost}
                                    />
                                    <TextField
                                        label="Type Room"
                                        name="type_room"
                                        select
                                        fullWidth
                                        value={values.type_room}
                                        onChange={handleChange}
                                        error={touched.type_room && Boolean(errors.type_room)}
                                        helperText={touched.type_room && errors.type_room}
                                    >
                                        {roomTypes.map((r) => (
                                            <MenuItem key={r.value} value={r.value}>
                                                {r.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>

                                <Box display="flex" gap={2} mt={2}>
                                    <TextField
                                        label="Date Start"
                                        type="date"
                                        name="start_date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={values.start_date}
                                        onChange={handleChange}
                                        error={touched.start_date && Boolean(errors.start_date)}
                                        helperText={touched.start_date && errors.start_date}
                                    />
                                    <TextField
                                        label="Date End"
                                        type="date"
                                        name="end_date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={values.end_date}
                                        onChange={handleChange}
                                        error={touched.end_date && Boolean(errors.end_date)}
                                        helperText={touched.end_date && errors.end_date}
                                    />
                                </Box>

                                <Box display="flex" gap={4} mt={3}>

                                    {/* Logo */}
                                    <Box>
                                        <Typography mb={1}>IMG Logo</Typography>
                                        <Button variant="contained" component="label">
                                            Choose File
                                            <input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    setFieldValue("logo", file);
                                                    if (file) setLogoPreview(URL.createObjectURL(file));
                                                }}
                                            />
                                        </Button><br />

                                        {logoPreview && (
                                            <Image
                                                src={logoPreview}
                                                alt="logo"
                                                width={130}
                                                height={100}
                                                style={{ objectFit: "cover", borderRadius: 8, marginTop: 8 }}
                                            />
                                        )}
                                    </Box>

                                    {/* Banner - MULTIPLE FILES */}
                                    <Box>
                                        <Typography mb={1}>IMG Banner</Typography>
                                        <Button variant="contained" component="label">
                                            Choose Files
                                            <input
                                                hidden
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files || []);
                                                    setFieldValue("banner", files);
                                                    setBannerPreview(files.map((file) => URL.createObjectURL(file)));
                                                }}
                                            />
                                        </Button>

                                        <Box mt={1} sx={{ display: "flex", gap: 1 }}>
                                            {bannerPreview.map((src, idx) => (
                                                <Image
                                                    key={idx}
                                                    src={src}
                                                    alt="banner"
                                                    width={139}
                                                    height={100}
                                                    style={{ objectFit: "cover", borderRadius: 8 }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>

                                    {/* Status */}
                                    <Box flex={1}>
                                        <Typography mb={1}>Status</Typography>
                                        <TextField
                                            name="status"
                                            select
                                            fullWidth
                                            value={values.status}
                                            onChange={handleChange}
                                        >
                                            {statuses.map((s) => (
                                                <MenuItem key={s.value} value={s.value}>
                                                    {s.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                </Box>

                                <TextField
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    margin="normal"
                                    value={values.description}
                                    onChange={handleChange}
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                />

                                <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                    <Button onClick={handleClose} color="error" variant="contained">
                                        Hủy
                                    </Button>
                                    <Button type="submit" variant="contained">
                                        Tạo mới
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Dialog>
        </Box>
    );
}
