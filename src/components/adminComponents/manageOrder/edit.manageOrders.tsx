import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    Divider,
    TextField,
    Menu,
    MenuItem,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useAppDispatch } from "@/redux/hooks";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { editManageOrders } from "@/redux/Slice/adminSlice";

interface IProps {
    id: number;
    status: any;
    refetch: () => void;
}

const OrderSchema = Yup.object().shape({
    status: Yup.string()
        .oneOf(["access", "cancel", "ending"], "Status invalid!")
        .required("Status is required!"),
});

const EditManageOrders = ({ id, status, refetch }: IProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const dispatch = useAppDispatch();

    const handleInputClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            <BorderColorIcon
                onClick={() => setOpenDialog(true)}
                sx={{
                    color: "green",
                    fontSize: 22,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.7 },
                }}
            />

            <Dialog
                maxWidth="sm"
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                PaperProps={{
                    sx: {
                        top: 20,
                        borderRadius: 3,
                        width: 460,
                        paddingBottom: 2,
                    },
                }}
            >
                <Box sx={{ padding: "24px" }}>
                    <Typography
                        fontFamily="Inter"
                        fontWeight="600"
                        fontSize="18px"
                        mb={0.5}
                    >
                        Update Status Order
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Formik
                        enableReinitialize
                        initialValues={{ status: status || "" }}
                        validationSchema={OrderSchema}
                        onSubmit={async (values) => {
                            try {
                                await dispatch(
                                    editManageOrders({
                                        id,
                                        status: values.status,
                                    })
                                ).unwrap();

                                toast.success("Cập nhật thành công!");
                                await refetch();
                                setOpenDialog(false);
                            } catch {
                                toast.error("Lỗi! Không cập nhật được!");
                            }
                        }}
                    >
                        {({ values, errors, touched, setFieldValue }) => (
                            <Form>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Box>
                                        <Typography
                                            fontFamily="Inter"
                                            fontSize={14}
                                            sx={{ mb: 1 }}
                                        >
                                            Select Status
                                        </Typography>

                                        <TextField
                                            value={values.status}
                                            InputProps={{
                                                readOnly: true,
                                                sx: {
                                                    fontFamily: "Inter",
                                                    cursor: "pointer",
                                                },
                                                endAdornment: (
                                                    <Box sx={{ opacity: 0.6, mr: 1 }}>▼</Box>
                                                ),
                                            }}
                                            onClick={handleInputClick}
                                            sx={{
                                                width: "100%",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                    height: 44,
                                                },
                                            }}
                                            error={touched.status && Boolean(errors.status)}
                                        />

                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                                sx: {
                                                    borderRadius: 3,
                                                    minWidth: 230,
                                                    boxShadow:
                                                        "0 4px 20px rgba(0,0,0,0.08)",
                                                },
                                            }}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    setFieldValue("status", "access");
                                                    handleMenuClose();
                                                }}
                                                sx={{
                                                    fontFamily: "Inter",
                                                    py: 1.2,
                                                    bgcolor:
                                                        values.status === "access"
                                                            ? "#e6f7ec"
                                                            : "transparent",
                                                    "&:hover": { bgcolor: "#dff5e6" },
                                                    display: "flex",
                                                    gap: 1.2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "green",
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                                Access
                                            </MenuItem>

                                            <MenuItem
                                                onClick={() => {
                                                    setFieldValue("status", "cancel");
                                                    handleMenuClose();
                                                }}
                                                sx={{
                                                    fontFamily: "Inter",
                                                    py: 1.2,
                                                    bgcolor:
                                                        values.status === "cancel"
                                                            ? "#fdecee"
                                                            : "transparent",
                                                    "&:hover": { bgcolor: "#f8dbde" },
                                                    display: "flex",
                                                    gap: 1.2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "red",
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                                Cancel
                                            </MenuItem>

                                            <MenuItem
                                                onClick={() => {
                                                    setFieldValue("status", "ending");
                                                    handleMenuClose();
                                                }}
                                                sx={{
                                                    fontFamily: "Inter",
                                                    py: 1.2,
                                                    bgcolor:
                                                        values.status === "ending"
                                                            ? "#fff4dd"
                                                            : "transparent",
                                                    "&:hover": { bgcolor: "#ffedc9" },
                                                    display: "flex",
                                                    gap: 1.2,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "orange",
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                                Ending
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                </Box>

                                <DialogActions sx={{ mt: 3 }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            textTransform: "none",
                                            fontFamily: "Inter",
                                            color: "grey",
                                            borderColor: "#d0d0d0",
                                        }}
                                        onClick={() => setOpenDialog(false)}
                                    >
                                        Hủy
                                    </Button>

                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{
                                            textTransform: "none",
                                            fontFamily: "Inter",
                                        }}
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

export default EditManageOrders;
