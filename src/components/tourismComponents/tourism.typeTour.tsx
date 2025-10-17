'use client';
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IHotTour } from '@/typescript/home';

type TourismCheckBoxProps = {
  data: IHotTour[];
  onFilterChange?: (filtered: IHotTour[]) => void;
};

export default function TourismTypeTour({ data, onFilterChange }: TourismCheckBoxProps) {
  const [checked, setChecked] = React.useState<number[]>([]);

  // 🔹 Lấy danh sách loại hình du lịch duy nhất
  const categories = React.useMemo(() => {
    const unique = new Map<number, string>();
    data.forEach((item) => {
      if (item?.categories) {
        unique.set(item.categories.id, item.categories.name);
      }
    });
    return Array.from(unique, ([id, name]) => ({ id, name }));
  }, [data]);

  const handleChange = (id: number) => {
    setChecked((prev) =>
      prev.includes(id)
      ? prev.filter((v) => v !== id) 
      : [...prev, id]
    );
  };

  React.useEffect(() => {
    if (!onFilterChange) return;

    if (checked.length === 0) {
      onFilterChange(data);
    } else {
      const filtered = data.filter((item) => checked.includes(item?.categories?.id));
      onFilterChange(filtered);
    }
  }, [checked, data, onFilterChange]);

  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        width: 312,
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
          Loại hình du lịch
        </Typography>

        <FormGroup>
          {categories.map((cate) => (
            <FormControlLabel
              key={cate.id}
              control={
                <Checkbox
                  checked={checked.includes(cate.id)}
                  onChange={() => handleChange(cate.id)}
                />
              }
              label={cate.name}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}
