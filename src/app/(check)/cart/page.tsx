'use client';
import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import BoxHistory from '@/components/individualComponent/history/boxHistory';
import { useQuery } from '@tanstack/react-query';
import { fetchOrder } from '@/api/home/api.home';
import TourismMenuSelect from '@/components/tourismComponents/tourism.menuSelect';
import SearchIcon from '@mui/icons-material/Search';

export default function CartPage() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');

  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => fetchOrder(),
    enabled: !!user,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress size={45} thickness={4} />
        <Typography color="text.secondary">
          Đang tải lịch sử đơn hàng...
        </Typography>
      </Box>
    );
  }

  const orders = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  if (!orders.length) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Bạn chưa có đơn hàng nào.
        </Typography>
      </Box>
    );
  }

  const term = search.toLowerCase();
  const filteredOrders = orders
    .filter((order: any) => {
      if (!term) return true;
      return (
        order?.name?.toLowerCase().includes(term) ||
        order?.code?.toLowerCase().includes(term)
      );
    })
    .sort((a: any, b: any) =>
      sortOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost
    );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: { xs: 2, md: 0 },
          mb: 3,
        }}
      >
        <Typography
          fontFamily="Inter"
          fontWeight={700}
          fontSize={{ xs: 22, sm: 26, md: 30 }}
          color="#3C3C3C"
        >
          Lịch sử đơn hàng
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 2,
            width: { xs: '100%', md: 'auto' },
          }}
        >
          <TextField
            placeholder="Tìm theo tên hoặc mã đơn hàng"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 280, md: 350 },
              backgroundColor: '#fff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TourismMenuSelect setSortOrder={setSortOrder} />
        </Box>
      </Box>

      {/* LIST */}
      <BoxHistory orders={filteredOrders} refetchOrders={refetch} />
    </Box>
  );
}
