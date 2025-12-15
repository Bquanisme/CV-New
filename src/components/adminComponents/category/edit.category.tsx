import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    Divider,
    TextField,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useAppDispatch } from "@/redux/hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { editCategory } from "@/redux/Slice/adminSlice";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getDetailCategoryAPI } from "@/api/home/api.admin";

interface IProps {
    id: number;
    refetch: () => void;
}

const EditCategorySchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên!"),
    number: Yup.string().required("Vui lòng nhập số!"),
    description: Yup.string().required("Vui lòng nhập mô tả!"),
});

const EditCategory = ({ id, refetch }: IProps) => {
    const [openDialog, setOpenDialog] = useState(false)
    const scroll = 'paper';

    const { data } = useQuery({
        queryKey: ['categoryDetail', id],
        queryFn: () => getDetailCategoryAPI(id),
        enabled: !!id,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    const initialValues = {
        name: data?.name ?? "",
        number: data?.number ?? "",
        description: data?.description ?? "",
    }

    const dispatch = useAppDispatch();


    const handleClick = () => {
        setOpenDialog(true)
    };

    const handleClose = () => {
        setOpenDialog(false)
    };

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <BorderColorIcon
                onClick={handleClick}
                sx={{
                    color: "green",
                    fontSize: 22,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                }}
            />

            <Dialog
                maxWidth={false}
                open={openDialog}
                onClose={handleClose}
                scroll={scroll}
                PaperProps={{
                    sx: {
                        position: "absolute",
                        top: 80,
                        m: 0,
                        borderRadius: 2,
                        width: 750,
                    },
                }}
            >
                <Box margin="20px">
                    <Typography
                        fontWeight="600"
                        fontFamily="Inter"
                        color="black"
                        mb={0.5}
                        textAlign="left"
                        fontSize="20px"
                        margin="10px"
                        marginLeft="12px"
                    >
                        Update Category
                    </Typography>

                    <Divider variant="middle" sx={{ my: 2 }} />

                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={EditCategorySchema}
                        onSubmit={async (values) => {
                            try {
                                await dispatch(
                                    editCategory({
                                        id,
                                        data: {
                                            name: values.name,
                                            number: values.number,
                                            description: values.description
                                        }
                                    })
                                ).unwrap();
                                toast.success('Bạn đã cập nhật thành công!')
                                await refetch();
                                close();
                            } catch (err) {
                                toast.error('Lỗi! Hiện tại không cập nhật được Category!')
                            }

                            refetch();
                            setOpenDialog(false);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Box
                                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: 2,
                                        }}
                                    >
                                        <Box>
                                            <Typography sx={{ color: "black", fontFamily: 'Inter' }}>
                                                <span style={{ color: "red" }}>*</span> Name
                                            </Typography>

                                            <Field
                                                as={TextField}
                                                name="name"
                                                size="small"
                                                sx={{ width: 330, mt: 1, fontFamily: 'Inter' }}
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography sx={{ color: "black", fontFamily: 'Inter' }}>
                                                <span style={{ color: "red" }}>*</span> Number
                                            </Typography>

                                            <Field
                                                as={TextField}
                                                name="number"
                                                type="number"
                                                size="small"
                                                sx={{ width: 330, mt: 1, fontFamily: 'Inter' }}
                                                error={touched.number && Boolean(errors.number)}
                                                helperText={touched.number && errors.number}
                                            />
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Typography sx={{ color: "black", fontFamily: 'Inter' }}>
                                            <span style={{ color: "red" }}>*</span> Description
                                        </Typography>

                                        <Field
                                            as={TextField}
                                            name="description"
                                            multiline
                                            rows={4}
                                            sx={{ mt: 1, fontFamily: 'Inter' }}
                                            fullWidth
                                            error={
                                                touched.description && Boolean(errors.description)
                                            }
                                            helperText={
                                                touched.description && errors.description
                                            }
                                        />
                                    </Box>
                                </Box>

                                <DialogActions sx={{ mt: 3 }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            textTransform: "none",
                                            color: "grey",
                                            borderColor: "lightgray",
                                            fontFamily: 'Inter',
                                        }}
                                        onClick={handleClose}
                                    >
                                        Hủy
                                    </Button>

                                    <Button
                                        variant="contained"
                                        sx={{ textTransform: "none", fontFamily: 'Inter' }}
                                        type="submit"
                                    >
                                        Cập nhật
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

export default EditCategory;
