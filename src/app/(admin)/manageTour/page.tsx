'use client'
import { getRoomTourAPI } from '@/api/home/api.admin'
import CircularProgressLoading from '@/components/otherComponents/circularProgress.loading'
import PaginationControl from '@/components/otherComponents/paginationControl'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TableManageTour from '@/components/adminComponents/manageTour/table.manageTour'
import NewManageTour from '@/components/adminComponents/manageTour/new.manageTour'
import DeleteManageTour from '@/components/adminComponents/manageTour/delete.manageTour'

const SearchManageTourSchema = Yup.object().shape({
  name: Yup.string(),
});

const ManageTour = () => {
  const [name, setName] = useState('')
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 5;
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['manageTour'],
    queryFn: () => getRoomTourAPI(),
    staleTime: Infinity,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CircularProgressLoading />

  const filteredData = data.filter((order: any) => {
    const searchName = name
      ? order?.name?.includes(name)
      : true;
    return searchName;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedCategory = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box
      sx={{
        px: 2,
        py: 3,
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={SearchManageTourSchema}
          onSubmit={(values) => {
            setName(values.name)
            setPage(1)
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  sx={{
                    color: '#353333ff',
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: '20px'
                  }}>
                  Search Name
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    <TextField
                      name="name"
                      size="small"
                      value={values.name}
                      onChange={handleChange}
                      sx={{
                        width: 300,
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />

                    <Button
                      variant='contained'
                      size='small'
                      type="submit"
                      sx={{
                        textTransform: 'none',
                        fontSize: 16,
                        pl: 2,
                        pr: 2,
                        width: 80,
                        fontFamily: "Inter",
                        fontWeight: 400,
                      }}
                    >
                      Search
                    </Button>
                  </Box>
                  <NewManageTour refetch={refetch} />
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
        <Box sx={{ m: 0, mt: -10, mb: -5 }}>
          {selectedIds.length > 0 && (
            <Box sx={{ display: 'flex', gap: 2, pb: 0, pt: 10 }}>
              <Button
                variant="outlined"
                sx={{ textTransform: "none", borderColor: "#1b1b1bff", color: '#1b1b1bff' }}
              >
                Selected {selectedIds.length} items
              </Button>
              <DeleteManageTour selectedIds={selectedIds} refetch={refetch} />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            bgcolor: '#ffffffff',
            m: -1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
          <Typography sx={{ pt: 2, pl: 2, }}>
            Quản lý RoomTour
          </Typography>

          <TableManageTour
            filteredData={filteredData}
            paginatedCategory={paginatedCategory}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            refetch={refetch}
          />
        </Box>
      </Box><br />
      <PaginationControl
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </Box>
  )
}

export default ManageTour
