'use client'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PaginationControl from '@/components/otherComponents/paginationControl'
import Button from '@mui/material/Button'
import { useQuery } from '@tanstack/react-query'
import { getCustomerAPI } from '@/api/home/api.admin'
import CircularProgressLoading from '@/components/otherComponents/circularProgress.loading'
import TableCustomer from '@/components/adminComponents/customer/table.customer'
import { TextField } from '@mui/material'
import { Formik, Form } from "formik";
import * as Yup from "yup";

const SearchCustomerSchema = Yup.object().shape({
    name: Yup.string(),
});

const Customer = () => {
    const [name, setName] = useState<string>('')
    const [page, setPage] = useState<number>(1);
    const rowsPerPage = 5;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['customer'],
        queryFn: () => getCustomerAPI(),
        staleTime: Infinity,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <CircularProgressLoading />

    const filteredData = data.filter((order: any) => {
        const searchName = name
            ? order?.display_name?.toLowerCase().includes(name.toLowerCase())
            : true;
        return searchName;
    });

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedCustomer = filteredData.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    return (
        <Box sx={{ px: 2, py: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                <Formik
                    initialValues={{ name: "" }}
                    validationSchema={SearchCustomerSchema}
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
                                    Name Customer
                                </Typography>

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
                        </Form>
                    )}
                </Formik>

                <Box sx={{ bgcolor: '#ffffffff', m: -1.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ pt: 2, pl: 2 }}>
                        Quản lý Customer
                    </Typography>

                    <TableCustomer paginatedCustomer={paginatedCustomer} refetch={refetch} />
                </Box>
            </Box>
            <br />

            <PaginationControl
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
        </Box>
    );
}

export default Customer;
