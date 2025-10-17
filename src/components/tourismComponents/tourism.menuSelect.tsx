"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface TourismMenuSelectProps {
  setSortOrder: (value: "asc" | "desc") => void;
}

export default function TourismMenuSelect({ setSortOrder }: TourismMenuSelectProps) {
  const [sort, setSort] = React.useState<"asc" | "desc">("asc");

  const handleChange = (event: any) => {
    const value = event.target.value as "asc" | "desc";
    setSort(value);
    setSortOrder(value);
  };

  return (
    <Box
      sx={{
        minWidth: 180,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: "SVN-Gilroy",
          fontWeight: 400,
          fontSize: "16px",
          color: "#333",
        }}
      >
        Sắp xếp theo:
      </Typography>

      <FormControl variant="standard" sx={{ minWidth: 180 }}>
        <Select
          value={sort}
          onChange={handleChange}
          IconComponent={ExpandMoreIcon}
          sx={{
            fontFamily: "SVN-Gilroy",
            fontWeight: 500,
            fontSize: "16px",
            border: "none",
            boxShadow: "none",
            "&::before": { borderBottom: "none" },
            "&::after": { borderBottom: "none" },
            "&:hover::before": { borderBottom: "none !important" },
          }}
        >
          <MenuItem value="asc">Giá từ thấp đến cao</MenuItem>
          <MenuItem value="desc">Giá từ cao đến thấp</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
