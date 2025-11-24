'use client';
import React, { useState, useMemo } from 'react';
import Banner from "../../../../assets/hotelBanner.jpg"
import Box from '@mui/material/Box';
import Image from "next/image";
import { AllRoomBreadcrumbs } from '@/components/breadcrumbs';
import TourismSaleSlice from '@/components/tourismComponents/tourism.saleSlice';
import { fetchAllRooms } from '@/api/home/api.home';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Typography } from '@mui/material';
import { IHotTour } from '@/typescript/home';
import RoomTicket from '@/components/hotelComponents.tsx/room.ticket';
import RoomChecked from '@/components/hotelComponents.tsx/room.checked';

const AllRoom = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['allRooms'],            // Query key cố định
    queryFn: fetchAllRooms,            // API function
    staleTime: Infinity,              // luôn fresh
    refetchOnWindowFocus: false,      // không tự refetch khi focus
    refetchOnReconnect: false,        // không tự refetch khi mạng reconnect
})

  const [filteredByPrice, setFilteredByPrice] = useState<IHotTour[] | null>(null);
  const [filteredByType, setFilteredByType] = useState<IHotTour[] | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
  const rowsPerPage : number = 9;


  const filteredTours = useMemo(() => {
    if (!data) return [];

    // Nếu chưa lọc gì → hiển thị tất cả
    if (!filteredByPrice && !filteredByType) {
      return data;
    }

    let result = data;

    // Nếu có lọc giá (kể cả rỗng)
    if (filteredByPrice) {
      result = result.filter((room: any) =>
        filteredByPrice.some((p) => p.id === room.id)
      );
    }

    // Nếu có lọc loại (kể cả rỗng)
    if (filteredByType) {
      result = result.filter((room: any) =>
        filteredByType.some((t) => t.id === room.id)
      );
    }

    // 🔹 Sắp xếp theo giá
    result = [...result].sort((a, b) =>
      sortOrder === "asc" ? a.cost - b.cost : b.cost - a.cost
    );
  return result;
  }, [data, filteredByPrice, filteredByType, sortOrder]);

  const totalPages = Math.ceil(filteredTours.length / rowsPerPage);
    const paginatedTours = filteredTours.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );

  const noResults =
    !isLoading &&
    data &&
    data.length > 0 &&
    filteredTours.length === 0 &&
    (filteredByPrice !== null || filteredByType !== null);

  return (
    <Box sx={{ bgcolor: '#fff', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ position: "relative", width: "100%", height: "312px" }}>
        <Image
          priority={false}
          src={Banner}
          alt="Header"
          fill
          style={{ objectFit: 'cover', transform: "scaleX(-1)", }}
          sizes="100vw"
        />
      </Box>

      <Box sx={{ px: 20 }}>
        <AllRoomBreadcrumbs />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 5 }}>
          {/* Bộ lọc */}
          <Box>
            <TourismSaleSlice
              data={data || []}
              onFilterChange={setFilteredByPrice}
            />
            <Box sx={{ py: 2 }}>
              <RoomChecked
                data={data || []}
                onFilterChange={setFilteredByType}
              />
            </Box>
          </Box>

          {/* Danh sách tour */}
          <Box sx={{ flex: 1, pl: 5 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
              </Box>
            ) : noResults ? (
              <Typography
                sx={{
                  color: '#D32F2F',
                  fontSize: 16,
                  fontWeight: 500,
                  textAlign: 'center',
                  mt: 5,
                }}
              >
                Không có tour nào phù hợp 😢
              </Typography>
            ) : (
              <RoomTicket
                data={paginatedTours} 
                isLoading={isLoading} 
                setSortOrder={setSortOrder}
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllRoom;
