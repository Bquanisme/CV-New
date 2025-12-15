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
import { useAppDispatch } from "@/redux/hooks";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createCategory } from "@/redux/Slice/adminSlice";

interface IProps {
    refetch: () => void;
}

const NewCategorySchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên!"),
    number: Yup.string().required("Vui lòng nhập số!"),
    description: Yup.string().required("Vui lòng nhập mô tả!"),
});

const NewCategory = ({ refetch }: IProps) => {
    const [openDialog, setOpenDialog] = useState(false)
    const initialValues = {
        name: "",
        number: "",
        description: "",
    }
    const scroll = 'paper';

    const dispatch = useAppDispatch();

    const handleClick = () => {
        setOpenDialog(true)
    };

    const handleClose = () => {
        setOpenDialog(false)
    };

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <Button
                variant='contained'
                sx={{ textTransform: 'none' }}
                onClick={handleClick}
            >
                New Category
            </Button>
            <Dialog
                maxWidth={false}
                open={openDialog}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                PaperProps={{
                    sx: {
                        position: 'absolute',
                        top: 80,
                        m: 0,
                        borderRadius: 2,
                        width: 750
                    },
                }}
            >
                <Box margin='20px'>
                    <Box>
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
                            Thêm mới Category
                        </Typography>
                    </Box> <br />
                    <Divider variant="middle" /><br />
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={NewCategorySchema}
                        onSubmit={async (values) => {
                            try {
                                await dispatch(
                                    createCategory({
                                        payload: {
                                            name: values.name,
                                            number: values.number,
                                            description: values.description
                                        }
                                    })
                                ).unwrap();
                                toast.success('Bạn đã tạo mới thành công!')
                                await refetch();
                                close();
                            } catch (err) {
                                toast.error('Lỗi! Hiện tại không tạo mới được Category!')
                            }

                            refetch();
                            setOpenDialog(false);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Box ml={1.5}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography sx={{ color: 'red', ml: 0.5, fontFamily: 'Inter' }}>*</Typography>
                                                <Typography sx={{ color: 'black', fontFamily: 'Inter' }}>Name Category</Typography>
                                            </Box>
                                            <Box>
                                                <Field
                                                    as={TextField}
                                                    name="name"
                                                    size="small"
                                                    placeholder="Nhập tên category"
                                                    sx={{ width: 330, mt: 1, fontFamily: 'Inter' }}
                                                    error={touched.name && Boolean(errors.name)}
                                                    helperText={touched.name && errors.name}
                                                />
                                            </Box>
                                        </Box>
                                        <Box ml={1.5}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography sx={{ color: 'red', ml: 0.5, fontFamily: 'Inter' }}>*</Typography>
                                                <Typography sx={{ color: 'black', fontFamily: 'Inter' }}>Number</Typography>
                                            </Box>
                                            <Box>
                                                <Field
                                                    as={TextField}
                                                    name="number"
                                                    type="number"
                                                    size="small"
                                                    placeholder="Nhập số lượng người"
                                                    sx={{ width: 330, mt: 1, fontFamily: 'Inter' }}
                                                    error={touched.number && Boolean(errors.number)}
                                                    helperText={touched.number && errors.number}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box ml={1.5}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography sx={{ color: 'red', ml: 0.5, fontFamily: 'Inter' }}>*</Typography>
                                            <Typography sx={{ color: 'black', fontFamily: 'Inter' }}>Description</Typography>
                                        </Box>
                                        <Box>
                                            <Field
                                                as={TextField}
                                                name="description"
                                                multiline
                                                rows={4}
                                                placeholder="Nhập mô tả"
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
                                </Box>
                                <DialogActions>
                                    <Button
                                        variant='outlined'
                                        sx={{ textTransform: 'none', color: "grey", borderColor: 'lightgray', fontFamily: 'Inter' }}
                                        onClick={handleClose}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        variant='contained'
                                        sx={{ textTransform: 'none', fontFamily: 'Inter' }}
                                        type="submit"
                                    >
                                        Thêm mới
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Dialog>
        </Box>
    );
}

export default NewCategory
