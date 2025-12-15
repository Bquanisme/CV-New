'use client'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
// import TableCategory from './TableCategory'
import PaginationControl from '@/components/otherComponents/paginationControl'
import { getCategoryAPI } from '@/api/home/api.admin'
import { useQuery } from '@tanstack/react-query'
import CircularProgressLoading from '@/components/otherComponents/circularProgress.loading'
import TableCategory from '@/components/adminComponents/category/table.category'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import NewCategory from '@/components/adminComponents/category/new.category'
import DeleteCategory from '@/components/adminComponents/category/delete.category'
// import DeleteCategory from './DeleteCategory'

const SearchCategorySchema = Yup.object().shape({
    name: Yup.string(),
});

const Category = () => {
    const [name, setName] = useState<string>('')
    const [page, setPage] = useState<number>(1);
    const rowsPerPage = 5;
    const [selectedIds, setSelectedIds] = useState<(number)[]>([]);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: () => getCategoryAPI(),
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
                    validationSchema={SearchCategorySchema}
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
                                    Name Category
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
                                    <NewCategory refetch={refetch} />
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
                            <DeleteCategory selectedIds={selectedIds} refetch={refetch} />
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
                    <Typography sx={{ pt: 2, pl: 2 }}>
                        Quản lý Category
                    </Typography>

                    <TableCategory
                        filteredData={filteredData}
                        paginatedCategory={paginatedCategory}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        refetch={refetch}
                    />
                </Box>
            </Box ><br />
            <PaginationControl
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
        </Box >
    )
}

export default Category
