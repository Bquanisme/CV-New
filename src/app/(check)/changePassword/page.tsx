'use client'
import React, { useState } from 'react'
import {
    Box,
    Typography,
    Divider,
    TextField,
    Button,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { editPassword } from '@/redux/Slice/userSlice'
import Link from 'next/link'

const ChangeUserSchema = Yup.object().shape({
    password: Yup.string().required('Vui lòng nhập mật khẩu hiện tại!'),
    newPassword: Yup.string().required('Vui lòng nhập mật khẩu mới!').min(6).max(20),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không trùng khớp!')
        .required('Vui lòng xác nhận mật khẩu!'),
})

const ChangePassword = () => {
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const [initialValues] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
    })

    return (
        <Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: '10px', py: 4 }}>
            <Box sx={{ px: { xs: 2, md: 5 } }}>
                <Typography fontSize={{ xs: 22, md: 30 }} fontWeight={700}>
                    Đổi mật khẩu
                </Typography>
                <Typography fontSize={15} mb={2}>
                    Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Formik
                    initialValues={initialValues}
                    validationSchema={ChangeUserSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await dispatch(
                                editPassword({
                                    id: Number(user?.id),
                                    payload: {
                                        password: values.password,
                                        newPassword: values.newPassword,
                                    },
                                })
                            ).unwrap()
                            toast.success('Đổi mật khẩu thành công!')
                        } catch (e: any) {
                            toast.error(e)
                        } finally {
                            setSubmitting(false)
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, isSubmitting }) => (
                        <Form>
                            <Box
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    flexDirection: 'column',
                                    gap: 3,
                                }}
                            >
                                <Box>
                                    <Typography mb={1}>Mật khẩu hiện tại</Typography>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                    <Box textAlign="right" mt={1}>
                                        <Link href="/" style={{ color: '#0A599A' }}>
                                            Quên mật khẩu?
                                        </Link>
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography mb={1}>Mật khẩu mới</Typography>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="password"
                                        name="newPassword"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        error={touched.newPassword && Boolean(errors.newPassword)}
                                        helperText={touched.newPassword && errors.newPassword}
                                    />
                                </Box>

                                <Box>
                                    <Typography mb={1}>Xác nhận mật khẩu</Typography>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                    />
                                </Box>

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{
                                        bgcolor: '#E54141',
                                        height: 48,
                                        borderRadius: '10px',
                                    }}
                                >
                                    Xác nhận
                                </Button>
                            </Box>

                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Table sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                                    <TableBody>

                                        <TableRow>
                                            <TableCell width={220}>
                                                Mật khẩu hiện tại
                                            </TableCell>
                                            <TableCell >
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link href="/" style={{ color: '#0A599A' }}>
                                                    Quên mật khẩu?
                                                </Link>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Mật khẩu mới</TableCell>
                                            <TableCell colSpan={2}>
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    type="password"
                                                    name="newPassword"
                                                    value={values.newPassword}
                                                    onChange={handleChange}
                                                />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell >Xác nhận mật khẩu</TableCell>
                                            <TableCell colSpan={2}>
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell />
                                            <TableCell colSpan={2} >
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={isSubmitting}
                                                    sx={{
                                                        bgcolor: '#E54141',
                                                        width: 150,
                                                        height: 48,
                                                        borderRadius: '10px',
                                                    }}
                                                >
                                                    Xác nhận
                                                </Button>
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </Box>

                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default ChangePassword
