'use client'
import React, { useEffect, useState } from 'react'
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
// import { useQueryClient } from '@tanstack/react-query'
import { editPassword } from '@/redux/Slice/userSlice'
import Link from 'next/link'

const ChangeUserSchema = Yup.object().shape({
    password: Yup.string()
        .required('Vui lòng nhập mật khẩu hiện tại!'),

    newPassword: Yup.string()
        .required('Vui lòng nhập mật khẩu mới!')
        .min(6, 'Phải có ít nhất 6 ký tự')
        .max(20, 'Chỉ được tối đa 20 ký tự'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không trùng khớp!')
        .required('Vui lòng xác nhận mật khẩu!'),
})

const ChangePassword = () => {
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const [initialValues, setInitialValues] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
    })

    return (
        <Box sx={{ width: '100%', bgcolor: '#FFFFFF', borderRadius: '10px', py: 4 }}>
            <Box sx={{ px: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '30px', color: '#3C3C3C' }}>
                    Đổi mật khẩu
                </Typography>
                <Typography sx={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '15px', color: '#000', mb: 2 }}>
                    Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Formik
                    enableReinitialize
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
                            ).unwrap();
                            toast.success('✅ Cập nhật thông tin thành công!', { theme: 'colored' })
                        } catch (err: any) {
                            toast.error(err || 'Có lỗi xảy ra!', { theme: 'colored' })
                            console.log(err)
                        } finally {
                            setSubmitting(false)
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, isSubmitting }) => (
                        <Form>
                            <Table sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
                                <TableBody>

                                    <TableRow>
                                        <TableCell sx={{ width: 220, border: 'none' }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '16px', color: '#000' }}>
                                                Mật khẩu hiện tại
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: 'none' }}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                name="password"
                                                placeholder="Nhập mật khẩu hiện tại"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                error={touched.password && Boolean(errors.password)}
                                                helperText={touched.password && errors.password}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ width: 150, border: 'none', textAlign: 'right' }}>
                                            <Link
                                                href="/"
                                                style={{
                                                    fontWeight: 500,
                                                    fontSize: '15px',
                                                    fontFamily: 'Inter',
                                                    color: '#0A599A',
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                Quên mật khẩu?
                                            </Link>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ border: 'none' }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '16px', color: '#000' }}>
                                                Mật khẩu mới
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: 'none' }} colSpan={2}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                name="newPassword"
                                                placeholder="Nhập mật khẩu mới"
                                                type="password"
                                                value={values.newPassword}
                                                onChange={handleChange}
                                                error={touched.newPassword && Boolean(errors.newPassword)}
                                                helperText={touched.newPassword && errors.newPassword}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{ border: 'none' }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '16px', color: '#000' }}>
                                                Xác nhận mật khẩu
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: 'none' }} colSpan={2}>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                name="confirmPassword"
                                                placeholder="Nhập lại mật khẩu mới"
                                                type="password"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                                helperText={touched.confirmPassword && errors.confirmPassword}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: 'none' }}>
                                        </TableCell>
                                        <TableCell sx={{ border: 'none' }} colSpan={2}>
                                            <Box sx={{ width: '100%', mt: 5 }}>
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    sx={{
                                                        bgcolor: '#E54141',
                                                        color: 'white',
                                                        height: 50,
                                                        borderRadius: '10px',
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        fontSize: '16px',
                                                        width: 150,
                                                        '&:hover': {
                                                            bgcolor: '#7e1f10ff',
                                                            transform: 'scale(1.02)',
                                                            transition: '0.2s',
                                                        },
                                                    }}
                                                >
                                                    Xác nhận
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default ChangePassword
