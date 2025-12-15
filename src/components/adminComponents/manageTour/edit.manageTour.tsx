"use client";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    Divider,
    TextField,
    FormControl,
    InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getDetailRoomTourAPI } from "@/api/home/api.admin";
import { IEditTourForm, IManageTourDetail } from "@/typescript/home";
import { useAppDispatch } from "@/redux/hooks";
import { editManageTour } from "@/redux/Slice/adminSlice";
import { toast } from "react-toastify";

interface IProps {
    id: number;
    refetch: () => void;
}

const EditManageTourSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên!"),
    type: Yup.string().required("Vui lòng nhập thể loại!"),
    cost: Yup.string().required("Vui lòng nhập giá!"),
    status: Yup.string().required("Vui lòng nhập trạng thái!"),
    start_date: Yup.string().required("Chọn ngày bắt đầu!"),
    end_date: Yup.string().required("Chọn ngày kết thúc!"),
    description: Yup.string().required("Vui lòng nhập mô tả!"),
});

const EditManageTour = ({ id, refetch }: IProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [logoPreview, setLogoPreview] = useState("");

    const dispatch = useAppDispatch();

    const { data } = useQuery<IManageTourDetail>({
        queryKey: ["manageTourDetail", id],
        queryFn: () => getDetailRoomTourAPI(id),
        enabled: !!id,
    });

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    return (
        <Box>
            <BorderColorIcon
                onClick={handleOpen}
                sx={{ color: "green", fontSize: 22, cursor: "pointer" }}
            />

            <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
                <Box p={3}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography fontWeight={600} fontSize="20px" fontFamily={"Inter"}>
                            Update Tour
                        </Typography>
                        <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Formik<IEditTourForm>
                        enableReinitialize
                        initialValues={{
                            name: data?.name || "",
                            type: data?.type || "",
                            cost: data?.cost || "",
                            status: data?.status || "",
                            start_date: moment(data?.start_date).format("YYYY-MM-DD"),
                            end_date: moment(data?.end_date).format("YYYY-MM-DD"),
                            description: data?.description || "",
                            type_room: data?.type_room || "",
                            logo: null,
                            logo_delete: false,
                        }}
                        validationSchema={EditManageTourSchema}
                        onSubmit={async (values) => {
                            const formData = new FormData();

                            Object.entries(values).forEach(([key, val]) => {
                                if (key === "logo" && val) {
                                    formData.append("logo", val);
                                } else {
                                    formData.append(key, val as string);
                                }
                            });

                            try {
                                await dispatch(editManageTour({ id, formData })).unwrap();
                                toast.success('Bạn đã cập nhật thành công!')
                                await refetch();
                                handleClose();
                            } catch (err) {
                                toast.error('Lỗi! Hiện tại không cập nhật được!')
                            }
                        }}
                    >
                        {({ setFieldValue, errors, touched }) => (
                            <Form>
                                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
                                    <Field name="name">
                                        {({ field }: any) => (
                                            <TextField
                                                {...field}
                                                label="Name Tour"
                                                fullWidth
                                                error={touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ fontFamily: "Inter" }}
                                            />
                                        )}
                                    </Field>

                                    <Field name="type">
                                        {({ field }: any) => (
                                            <TextField
                                                {...field}
                                                label="Category"
                                                fullWidth
                                                error={touched.type && !!errors.type}
                                                helperText={touched.type && errors.type}
                                                sx={{ fontFamily: "Inter" }}
                                            />
                                        )}
                                    </Field>

                                    <Field name="cost">
                                        {({ field }: any) => (
                                            <TextField
                                                {...field}
                                                label="Cost (VND)"
                                                type="number"
                                                fullWidth
                                                error={touched.cost && !!errors.cost}
                                                helperText={touched.cost && errors.cost}
                                            />
                                        )}
                                    </Field>

                                    <Field name="status">
                                        {({ field }: any) => (
                                            <TextField
                                                {...field}
                                                label="Status"
                                                fullWidth
                                                error={touched.status && !!errors.status}
                                                helperText={touched.status && errors.status}
                                                sx={{ fontFamily: "Inter" }}
                                            />
                                        )}
                                    </Field>
                                </Box>

                                <Box display='flex' flexDirection='column' alignItems='center' my={4}>
                                    {(logoPreview || data?.logo) && (
                                        <Image
                                            src={logoPreview || data?.logo || ""}
                                            width={350}
                                            height={200}
                                            alt="Tour Logo"
                                            style={{ borderRadius: 10, objectFit: "cover" }}
                                        />
                                    )}

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        component="label"
                                        sx={{ mt: 2, fontFamily: "Inter", textDecoration: 'none', textTransform: 'none' }}
                                    >
                                        Đổi Logo
                                        <input
                                            hidden
                                            type="file"
                                            accept="image/*"
                                            onChange={(e: any) => {
                                                const file = e.target.files?.[0] || null;
                                                if (file) {
                                                    setFieldValue("logo", file);
                                                    setFieldValue("logo_delete", true);
                                                    setLogoPreview(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                    </Button>
                                </Box>

                                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
                                    <Field name="start_date">
                                        {({ field }: any) => (
                                            <TextField
                                                {...field}
                                                label="Date Start"
                                                type="date"
                                                fullWidth
                                                sx={{ fontFamily: "Inter" }}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        )}
                                    </Field>

                                    <Field name="end_date">
                                        {({ field }: any) => (
                                            <TextField
                                                {...field}
                                                label="Date End"
                                                type="date"
                                                fullWidth
                                                sx={{ fontFamily: "Inter" }}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        )}
                                    </Field>
                                </Box>

                                <Box mt={3}>
                                    <Field name="description">
                                        {({ field }: any) => (
                                            <TextField
                                                {...field}
                                                label="Description"
                                                fullWidth
                                                sx={{ fontFamily: "Inter" }}
                                                multiline
                                                rows={4}
                                            />
                                        )}
                                    </Field>
                                </Box>

                                <DialogActions sx={{ mt: 3 }}>
                                    <Button onClick={handleClose} variant="outlined" sx={{ fontFamily: "Inter", textDecoration: 'none', textTransform: 'none' }}>
                                        Hủy
                                    </Button>
                                    <Button type="submit" variant="contained" sx={{ fontFamily: "Inter", textDecoration: 'none', textTransform: 'none' }}>
                                        Lưu
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Dialog>
        </Box>
    );
};

export default EditManageTour;
