'use client'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CircularProgressLoading from '@/components/otherComponents/circularProgress.loading'
import { useAppDispatch } from '@/redux/hooks'
import { useQuery } from '@tanstack/react-query'
import { getCancelAPI } from '@/api/home/api.admin'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PaginationControl from '@/components/otherComponents/paginationControl'
import TableCancelRequest from '@/components/adminComponents/cancelRequest/table.cancelRequest'

const SearchCancelRequestSchema = Yup.object().shape({
  name: Yup.string(),
  status: Yup.string(),
});

const CancelRequest = () => {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cancel'],
    queryFn: () => getCancelAPI(),
    staleTime: Infinity,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CircularProgressLoading />

  const filteredData = data.filter((order: any) => {
    const searchName = name
      ? order?.name?.includes(name)
      : true;

    const searchStatus = status
      ? order?.status === status
      : true;
    return searchName && searchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedCancel = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        px: 2,
        py: 3,
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Formik
          initialValues={{ name: "", status: "" }}
          validationSchema={SearchCancelRequestSchema}
          onSubmit={(values) => {
            setName(values.name)
            setStatus(values.status)
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
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
        <Box
          sx={{
            bgcolor: '#ffffffff',
            m: -1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 0 }}>
            <Typography>
              Quản lý Cancel Request
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant='outlined' disabled sx={{ textTransform: 'none', width: 100, fontSize: 16 }}>Tour</Button>
              <FormControl sx={{ width: 130 }}>
                <InputLabel id="demo-simple-select-label">Pending</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="access">Access</MenuItem>
                  <MenuItem value="cancel">Cancel</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <TableCancelRequest
            paginatedCancel={paginatedCancel}
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

export default CancelRequest

