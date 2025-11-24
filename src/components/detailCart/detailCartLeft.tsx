import React from 'react'
import {
    Button,
    Box,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material';
import Image from 'next/image';
import Tour from '../../assets/hotTour1.jpg'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

type IProps = {
    data: any
}

const DetailCartLeft = ({ data }: IProps) => {
    const getDiffDays = (start_date: string, end_date: string): number => {
        if (!start_date || !end_date) return 0;

        const start = new Date(start_date);
        const end = new Date(end_date);

        const diffMs = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    };

    const formatDate = (dateStr: any) => {
        const d = new Date(dateStr);
        return `${d.getDate().toString().padStart(2, '0')} tháng ${(d.getMonth() + 1)
            .toString().padStart(2, '0')}`;
    };

    const diffDays = getDiffDays(data?.start_date, data?.end_date);
    return (
        <Box>
            <Box sx={{ width: '100%', bgcolor: '#FFFFFF', borderRadius: '10px' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ position: "relative", width: '35%', maxWidth: 324, minHeight: 418, overflow: 'hidden' }}>
                        <Image
                            src={data?.logo}
                            alt={data?.name}
                            fill
                            priority
                            style={{ objectFit: 'cover', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                        />
                    </Box>
                    <Box sx={{ py: 3, px: 1 }}>
                        <Box>
                            <Typography sx={{
                                color: '#292D32',
                                fontFamily: "Inter",
                                fontSize: "20px",
                                fontWeight: 600
                            }}>
                                {data?.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, my: 1.5 }}>
                                <Typography sx={{
                                    color: '#E54141',
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 600
                                }}>
                                    4.8 Rất tốt
                                </Typography>
                                <Typography sx={{
                                    color: '#b0b0b0ff',
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    mt: -0.1
                                }}>
                                    |
                                </Typography>
                                <Typography sx={{
                                    color: '#292D32',
                                    fontFamily: "Inter",
                                    fontSize: "14px",
                                    fontWeight: 400
                                }}>
                                    75 đánh giá
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 3, mt: 1.5, mb: 3 }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <AccessTimeFilledIcon sx={{
                                        color: '#4475F2',
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 400
                                    }} />
                                    <Typography sx={{
                                        color: '#4475F2',
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 400
                                    }}>
                                        {diffDays} ngày
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <LocationOnIcon sx={{
                                        color: '#4475F2',
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 400
                                    }} />
                                    <Typography sx={{
                                        color: '#4475F2',
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 400
                                    }}>
                                        4 địa điểm
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <DirectionsBoatIcon sx={{
                                        color: '#4475F2',
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 400
                                    }} />
                                    <Typography sx={{
                                        color: '#4475F2',
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        fontWeight: 400
                                    }}>
                                        Tàu + Ô tô
                                    </Typography>
                                </Box>
                            </Box>
                            <Table sx={{ ml: -1.5 }} size="medium">
                                <TableBody>

                                    {/* Địa điểm khởi hành */}
                                    <TableRow>
                                        <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
                                            <Typography fontWeight={600} fontSize={14} fontFamily='Inter' color="#3C3C3C">
                                                Địa điểm khởi hành
                                            </Typography>
                                        </TableCell>

                                        <TableCell sx={{ border: 'none', py: 0.5 }}>
                                            <Typography fontSize={14} color="#3C3C3C" fontFamily='Inter'>Hà Nội</Typography>
                                        </TableCell>

                                        <TableCell sx={{ border: 'none', width: 180 }}></TableCell>
                                    </TableRow><br />

                                    {/* Ngày khởi hành */}
                                    <TableRow>
                                        <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
                                            <Typography fontWeight={600} fontSize={14} fontFamily='Inter' color="#3C3C3C">
                                                Ngày khởi hành
                                            </Typography>
                                        </TableCell>

                                        <TableCell sx={{ border: 'none', py: 0.5 }}>
                                            <Typography fontSize={14} color="#3C3C3C" fontFamily='Inter'>
                                                {formatDate(data?.start_date)}
                                            </Typography>
                                        </TableCell>

                                        <TableCell sx={{ border: 'none' }}></TableCell>
                                    </TableRow><br />

                                    {/* Từ ngày */}
                                    <TableRow>
                                        <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
                                            <Typography fontWeight={600} fontSize={14} fontFamily='Inter'>Từ ngày</Typography>
                                        </TableCell>

                                        <TableCell sx={{ border: 'none', py: 0.5 }}>
                                            <Typography fontSize={14} fontFamily='Inter'>{formatDate(data?.start_date)}</Typography>
                                        </TableCell>

                                        <TableCell sx={{ border: 'none' }}></TableCell>
                                    </TableRow><br />

                                    {/* Đến ngày */}
                                    <TableRow>
                                        <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
                                            <Typography fontWeight={600} fontSize={14} fontFamily='Inter'>Đến ngày</Typography>
                                        </TableCell>

                                        <TableCell sx={{ border: 'none', py: 0.5 }}>
                                            <Typography fontSize={14} fontFamily='Inter'>{formatDate(data?.end_date)}</Typography>
                                        </TableCell>

                                        <TableCell sx={{ border: 'none' }}></TableCell>
                                    </TableRow><br />

                                    {/* Số khách */}
                                    <TableRow>
                                        <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
                                            <Typography fontWeight={600} fontSize={14} fontFamily='Inter'>Số khách</Typography>
                                        </TableCell>

                                        <TableCell colSpan={2} sx={{ border: 'none', py: 0.5 }}>
                                            <Box display="flex" justifyContent='space-between' alignItems='center'>
                                                <Typography fontSize={14} fontFamily='Inter' >• 02 người lớn</Typography>
                                                <Typography fontSize={18} fontFamily='Inter' fontWeight='600'>
                                                    {data?.cost.toLocaleString()} <span style={{ fontSize: 14, fontWeight: '400', fontFamily: 'Inter' }}>/người lớn</span>
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
                                        </TableCell>

                                        <TableCell colSpan={2} sx={{ border: 'none', py: 0.5 }}>
                                            <Box display="flex" justifyContent='space-between' alignItems='center'>
                                                <Typography fontSize={14} fontFamily='Inter'>• 01 trẻ em</Typography>
                                                <Typography fontSize={18} fontFamily='Inter' fontWeight='600'>
                                                    {data?.cost.toLocaleString()} <span style={{ fontSize: 14, fontWeight: '400', fontFamily: 'Inter' }}>/trẻ em</span>
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ my: 2 }}>
                <Typography fontSize={16} fontFamily='Inter' fontWeight='400' color='#4475F2'>
                    Thông tin chi tiết Tour <span style={{ fontSize: 16, color: '#6D6D6D', fontFamily: 'Inter' }}>(Click vào để xem chi tiết lịch trình, chính sách, dịch vụ)</span>
                </Typography>
            </Box>
            <Box sx={{ my: 2, width: '100%', bgcolor: '#FFFFFF', borderRadius: '10px', p: 3 }}>
                <Box display="flex" justifyContent='space-between' alignItems='center'>
                    <Typography fontSize={16} fontFamily='Inter' fontWeight='600' color='#3C3C3C'>
                        Thành tiền <span style={{ fontSize: 14, color: '#6D6D6D', fontFamily: 'Inter' }}>(Giá đã bao gồm thuế phí)</span>
                    </Typography>
                    <Typography fontSize={20} fontFamily='Bai Jamjuree' fontWeight='600' color='#E54141'>
                        {data?.cost.toLocaleString()} đ
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ my: 2, width: '100%', bgcolor: '#FFFFFF', borderRadius: '10px', p: 3 }}>
                <Typography fontSize={18} fontFamily='Inter' fontWeight='400' color='#6D6D6D' marginBottom={1}>
                    Đơn hàng của bạn đã được tiếp nhận và chờ xử lý, vui lòng đợi nhân viên của chúng tôi thực hiện xác minh và hướng dẫn thanh toán
                </Typography>
                <Typography fontSize={14} fontFamily='Inter' fontWeight='400' color='#3C3C3C'>
                    <span style={{ fontSize: 16, color: '#4475F2', fontFamily: 'Inter', fontWeight: 500, textDecoration: 'underline' }}>Điều khoản sử dụng</span> và <span style={{ fontSize: 16, color: '#4475F2', fontFamily: 'Inter', fontWeight: 500, textDecoration: 'underline' }}>Chính sách bảo mật</span> của chúng tôi
                </Typography>
            </Box>
        </Box >
    )
}

export default DetailCartLeft
