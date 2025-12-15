'use client';
import React, { useState, useMemo } from 'react';
import Banner from "../../../../assets/hotelBanner.jpg"
import Box from '@mui/material/Box';
import Image from "next/image";
import { AllRoomBreadcrumbs } from '@/components/otherComponents/breadcrumbs';
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
  const rowsPerPage: number = 9;


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
    <Box
      sx={{
        bgcolor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, md: 3 },
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 220, sm: 300, md: 382 },
        }}
      >
        <Image
          priority={false}
          src={Banner}
          alt="Header"
          fill
          style={{ objectFit: 'cover', transform: 'scaleX(-1)' }}
          sizes="100vw"
        />
      </Box>

      <Box sx={{ px: { xs: 2, sm: 4, md: 20 } }}>
        <AllRoomBreadcrumbs />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 0 },
            pt: { xs: 3, md: 5 },
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '100%', md: 280 },
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'row', md: 'column' },
              gap: { xs: 2, md: 0 },
              border: { xs: '1px solid #eee', sm: '1px solid #eee', md: 'none' },
              borderRadius: 2,
              p: { xs: 2, sm: 2, md: 0 },
            }}
          >
            <TourismSaleSlice
              data={data || []}
              onFilterChange={setFilteredByPrice}
            />

            <Box sx={{ py: { xs: 0, md: 2 } }}>
              <RoomChecked
                data={data || []}
                onFilterChange={setFilteredByType}
              />
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              pl: { xs: 0, md: 5 },
            }}
          >
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
