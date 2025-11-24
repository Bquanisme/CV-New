'use client'
import PaginationControl from '@/components/paginationControl';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type IProps = {
    orders: any;
};

const BoxHistory = ({ orders }: IProps) => {
    const [page, setPage] = useState<number>(1);
    const rowsPerPage = 7;

    const router = useRouter();

    const handleDetailCart = (detailId: number) => {
        router.push(`/cart/${detailId}`)
    }

    const totalPages = Math.ceil(orders.length / rowsPerPage);
    const paginatedOrder = orders.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

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
                    <Card
                        key={order.id}
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
                                    Mã đơn hàng:  {' '}
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
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            {order.logo && (
                                <CardMedia
                                    component="img"
                                    image={order.logo}
                                    alt={order.name}
                                    sx={{
                                        width: 400,
                                        height: 252,
                                        borderRadius: 2,
                                        objectFit: 'cover',
                                        backgroundColor: '#f8f8f8',
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
