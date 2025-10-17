'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { IHotTour } from '@/typescript/home';

type TourismSaleSliceProps = {
  data: IHotTour[];
  onFilterChange?: (filtered: IHotTour[] | null) => void;
};

const minDistance = 100000;

export default function TourismSaleSlice({
  data = [],
  onFilterChange,
}: TourismSaleSliceProps) {
  // 🔹 Lấy min & max từ data thực tế
  const { minPrice, maxPrice } = useMemo(() => {
    if (data.length === 0) return { minPrice: 0, maxPrice: 0 };
    const prices = data.map((item) => Number(item.cost)); // Ép kiểu an toàn
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [data]);

  // 🔹 Khởi tạo slider
  const [value, setValue] = useState<number[]>([minPrice, maxPrice]);

  // 🔹 Khi dữ liệu thay đổi → reset lại slider
  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  // 🔹 Khi người dùng kéo slider
  const handleChange = (
    event: Event,
    newValue: number[] | number,
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) return;

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  // 🔹 Khi người dùng thả chuột → mới lọc
const handleChangeCommitted = () => {
  if (!onFilterChange) return;
  const filtered = data.filter(
    (item) => item.cost >= value[0] && item.cost <= value[1]
  );

  onFilterChange(filtered);
};


  // 🔹 Hiển thị tiền Việt
  const formatCurrency = (val: number) =>
    val.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        width: 312,
        height: 160,
        mx: 'auto',
        border: 'solid 1px #EFEFEF',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '16px',
            color: '#3C3C3C',
            fontFamily: 'SVN-Gilroy',
            mb: 2,
          }}
        >
          Khoảng giá
        </Typography>

        {/* Slider */}
        <Box sx={{ px: 2 }}>
          <Slider
            getAriaLabel={() => 'Khoảng giá'}
            value={value}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
            valueLabelDisplay="off"
            disableSwap
            min={minPrice}
            max={maxPrice}
            step={100000}
            sx={{
              color: '#D32F2F',
              height: 6,
              '& .MuiSlider-thumb': {
                width: 20,
                height: 20,
              },
            }}
          />
        </Box>

        {/* Hiển thị giá */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
            mt: 1,
          }}
        >
          <Typography sx={{ fontSize: 14, color: '#555' }}>
            {formatCurrency(value[0])}
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#555' }}>–</Typography>
          <Typography sx={{ fontSize: 14, color: '#555' }}>
            {formatCurrency(value[1])}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
