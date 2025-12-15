'use client';
import React, { useState, useMemo } from 'react';
import Banner from "../../../../assets/travelBanner.jpg";
import Box from '@mui/material/Box';
import Image from "next/image";
import { TourismBreadcrumbs } from '@/components/otherComponents/breadcrumbs';
import TourismTicket from '@/components/tourismComponents/tourism.ticket';
import TourismSaleSlice from '@/components/tourismComponents/tourism.saleSlice';
import { fetchTourism } from '@/api/home/api.home';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Typography } from '@mui/material';
import TourismTypeTour from '@/components/tourismComponents/tourism.typeTour';
import { IHotTour } from '@/typescript/home';

const Tourism = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tourism"],
    queryFn: fetchTourism,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

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
      result = result.filter((tour: any) =>
        filteredByPrice.some((p) => p.id === tour.id)
      );
    }

    // Nếu có lọc loại (kể cả rỗng)
    if (filteredByType) {
      result = result.filter((tour: any) =>
        filteredByType.some((t) => t.id === tour.id)
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
        <TourismBreadcrumbs />

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
              <TourismTypeTour
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
              <TourismTicket
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

export default Tourism;
