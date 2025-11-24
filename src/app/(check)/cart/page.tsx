'use client';
import React, { useMemo, useState } from 'react';
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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");

  const { user } = useAppSelector(state => state.auth)

  const { data, isLoading } = useQuery({
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
        <CircularProgress size={45} thickness={4} color="primary" />
        <Typography variant="body1" color="text.secondary">
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
      <Box sx={{ textAlign: 'center', mt: 5, color: 'text.secondary' }}>
        <Typography variant="h6" fontWeight={500}>
          Bạn chưa có đơn hàng nào.
        </Typography>
      </Box>
    );
  }

  const term = search.toLowerCase();

  const filteredOrders = orders.filter((order: any) => {
    if (!term) return true;
    const name = order?.name?.toLowerCase() || '';
    const code = order?.code?.toLowerCase() || '';
    return name.includes(term) || code.includes(term);
  });

  filteredOrders.sort((a: any, b: any) =>
    sortOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost
  );


  return (
    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontFamily='Inter' fontWeight='700' fontSize='30px' sx={{ color: '#3C3C3C', mb: 1 }}>Lịch sử đơn hàng</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <TextField
              placeholder="Bạn có thể tìm kiếm theo tên đơn hàng"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: 350,
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
          </Box>
          <Box>
            <TourismMenuSelect
              setSortOrder={setSortOrder}
            />
          </Box>
        </Box>
      </Box>
      <BoxHistory orders={filteredOrders} />
    </Box>
  );
}
