"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "@/api/home/api.home";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function HeaderBookingList() {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);
  const [count, setCount] = React.useState<number>(0);

  const { data, refetch } = useQuery({
    queryKey: ["orders", user?.id], // chỉ để react-query nhận biết khi user đổi
    queryFn: () => fetchOrder(),
    enabled: !!user,                // chỉ chạy khi có user
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const handleCheckUser = () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để có thể vào giỏ hàng !!")
    }
    else {
      router.push("/cart")
    }
  }

  React.useEffect(() => {
    if (data) {
      const numberCount = (Array.isArray(data) ? data.length : data?.total) ?? 0;
      setCount(numberCount);
    } else {
      setCount(0);
    }
  }, [data]);

  return (
    <Box
      sx={{
        color: "action.active",
        display: "flex",
        flexDirection: "column",
        "& .MuiBadge-root": { marginRight: 4 },
      }}
    >
      <Tooltip title="Đơn đặt hàng của bạn">
        <Badge
          color="error"
          badgeContent={count}
          sx={{
            color: "white",
            "& .MuiBadge-badge": {
              fontSize: "0.75rem",
              minWidth: 18,
              height: 18,
            },
          }}
        >
          <ShoppingCartIcon
            sx={{ cursor: "pointer", color: "white" }}
            onClick={handleCheckUser}
          />
        </Badge>
      </Tooltip>
    </Box>
  );
}
