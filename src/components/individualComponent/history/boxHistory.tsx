'use client'
import PaginationControl from '@/components/otherComponents/paginationControl';
import { useAppDispatch } from '@/redux/hooks';
import { checkDeleteOrder } from '@/redux/Slice/userSlice';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Dialog,
    DialogActions,
    Divider,
    Slide,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from '@mui/material/transitions';

type IProps = {
    orders: any;
    refetchOrders: () => void;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(2),
    },
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BoxHistory = ({ orders, refetchOrders }: IProps) => {
    const [page, setPage] = useState<number>(1);

    const [openOrderId, setOpenOrderId] = useState<number | null>(null);

    const rowsPerPage = 7;
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleDetailCart = (detailId: number) => {
        router.push(`/cart/${detailId}`)
    }

    const totalPages = Math.ceil(orders.length / rowsPerPage);
    const paginatedOrder = orders.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const handleOpenCheckDelete = (id: number) => {
        setOpenOrderId(id);
    };

    const handleCloseCheckDelete = () => {
        setOpenOrderId(null);
    };

    const handleCheckDeleteOrder = async (id: string) => {
        try {
            await dispatch(checkDeleteOrder({ id })).unwrap();
            handleCloseCheckDelete();
            toast.success('Bạn đã hủy đơn hàng thành công !');

            await refetchOrders();
        }
        catch (err: any) {
            toast.error(err || 'Có lỗi xảy ra!', { theme: 'colored' })
        }
    }

    return (
        <Box sx={{ width: '100%', mx: 'auto', mt: 3 }}>
            {paginatedOrder.map((order: any) => {
                let statusLabel = '';
                let statusColor:
                    | 'default'
                    | 'success'
                    | 'warning'
                    | 'error'
                    | 'info'
                    | 'secondary' = 'default';
                let statusBg = '';

                switch (order.status) {
                    case 'pending':
                        statusLabel = 'Chờ thanh toán';
                        statusColor = 'warning';
                        statusBg = '#FFF5E6';
                        break;
                    case 'access':
                        statusLabel = 'Đã thanh toán';
                        statusColor = 'success';
                        statusBg = '#E6F4EA';
                        break;
                    case 'ending':
                        statusLabel = 'Đã kết thúc';
                        statusColor = 'info';
                        statusBg = '#E8F1FC';
                        break;
                    case 'cancel':
                        statusLabel = 'Đã hủy';
                        statusColor = 'error';
                        statusBg = '#FDECEA';
                        break;
                    default:
                        statusLabel = 'Không xác định';
                        statusColor = 'default';
                        statusBg = '#F5F5F5';
                }

                return (
                    <Box key={order.id}>
                        <Card
                            sx={{
                                p: 2.5,
                                mb: 3,
                                borderRadius: 3,
                                boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                                border: '1px solid #e0e0e0',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            {/* Header */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        fontFamily="Inter"
                                        fontSize="16px"
                                    >
                                        Mã đơn hàng:{' '}
                                        <span style={{
                                            color: '#939393ff',
                                            fontFamily: "Inter",
                                            fontSize: "16px",
                                            marginLeft: 4,
                                        }}>
                                            ĐH2000{order.id}
                                        </span>
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#D9D9D9', fontSize: '20px' }}
                                    >
                                        |
                                    </Typography>

                                    {statusLabel && (
                                        <Chip
                                            label={statusLabel}
                                            color={statusColor}
                                            variant="outlined"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 13,
                                                backgroundColor: statusBg,
                                                border: 'none',
                                                px: 1.5,
                                                py: 0.5,
                                                textTransform: 'none',
                                            }}
                                        />
                                    )}
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {order.status === 'pending' && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleOpenCheckDelete(order.id)}
                                            sx={{
                                                borderRadius: 2,
                                                fontWeight: 500,
                                                textDecoration: 'none',
                                                textTransform: 'none',
                                            }}
                                        >
                                            Hủy đơn hàng
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleDetailCart(order.id)}
                                        sx={{
                                            borderRadius: 2,
                                            fontWeight: 500,
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                        }}
                                    >
                                        Chi tiết đơn hàng
                                    </Button>
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            {/* Content */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: {
                                        xs: 'column',
                                        sm: 'column',
                                        md: 'row',
                                    },
                                    gap: 3,
                                }}
                            >

                                {order.logo && (
                                    <CardMedia
                                        component="img"
                                        image={order.logo}
                                        alt={order.name}
                                        sx={{
                                            width: {
                                                xs: '100%',
                                                sm: '100%',
                                                md: 380,
                                            },
                                            height: {
                                                xs: 220,
                                                md: 250,
                                            },
                                            borderRadius: 2,
                                            objectFit: 'cover',
                                        }}
                                    />

                                )}

                                <CardContent sx={{ flex: 1, p: 0 }}>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{ mb: 2.5 }}
                                    >
                                        {order?.name}
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Typography variant="body2">
                                            <strong>Ngày bắt đầu:</strong> {order.start_date}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Ngày kết thúc:</strong> {order.end_date}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mt: 1.5 }}>
                                        <Typography variant="body2" fontWeight={600} gutterBottom>
                                            Đơn hàng:
                                        </Typography>
                                        <Typography variant="body2" sx={{ my: 1.5 }}>
                                            Người lớn × 2 = {order.cost?.toLocaleString() ?? 0} VND
                                        </Typography>
                                        <Typography variant="body2">
                                            Trẻ em × 2 = {order.cost?.toLocaleString() ?? 0} VND
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mt: 3,
                                            fontWeight: 600,
                                            color: '#d32f2f',
                                            fontSize: '20px',
                                        }}
                                    >
                                        Thành tiền: {order.cost?.toLocaleString() ?? 0} VND
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>

                        <BootstrapDialog
                            open={openOrderId === order.id}
                            onClose={handleCloseCheckDelete}
                            TransitionComponent={Transition}
                            BackdropProps={{
                                style: { backgroundColor: "rgba(0,0,0,0.4)" }
                            }}
                            PaperProps={{
                                sx: {
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    boxShadow: "0px 8px 40px rgba(0,0,0,0.25)",
                                    maxWidth: 700,
                                    width: "90%",
                                    m: 0,
                                    position: "absolute",
                                    top: "20%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    p: 3,
                                    pl: 7
                                },
                            }}
                        >
                            {/* Close Icon */}
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <CloseIcon
                                    onClick={handleCloseCheckDelete}
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "rgba(0,0,0,0.1)",
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                            </Box>

                            <Typography
                                fontWeight="bold"
                                color="primary.main"
                                fontSize={26}
                                sx={{ mb: 2 }}
                            >
                                HỦY ORDER
                            </Typography>

                            <Typography fontSize={18} sx={{ mb: 3 }}>
                                Bạn có chắc chắn muốn hủy đơn hàng này không?
                            </Typography>

                            <DialogActions>
                                <Button
                                    variant='contained'
                                    color='error'
                                    onClick={handleCloseCheckDelete}
                                    sx={{ borderRadius: 2, width: 100, textDecoration: 'none', textTransform: 'none' }}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    variant='contained'
                                    color='success'
                                    onClick={() => handleCheckDeleteOrder(order.id)}
                                    sx={{ borderRadius: 2, textDecoration: 'none', textTransform: 'none' }}
                                >
                                    Chấp nhận
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>

                    </Box>
                );
            })}

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <PaginationControl
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </Box>
        </Box>
    );
};

export default BoxHistory;
