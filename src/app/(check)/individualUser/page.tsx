'use client'
import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    Divider,
    TextField,
    Button
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import Image from 'next/image'
import avatarLogo from '../../../assets/avatarLogo.jpg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IUser } from '@/typescript/home'
import CircularProgressLoading from '@/components/circularProgress.loading'
import { editUser } from '@/redux/Slice/userSlice'
import { fetchHeaderUser } from '@/api/home/api.home'

const ChangeUserSchema = Yup.object().shape({
    display_name: Yup.string().required('Vui lòng nhập tên!'),
    phone_number: Yup.string()
        .required('Vui lòng nhập số điện thoại!')
        .matches(/^[0-9]+$/, 'Chỉ được nhập số')
        .min(8, 'Phải có ít nhất 8 số')
        .max(10, 'Chỉ được tối đa 10 số'),
    detail_address: Yup.string().required('Vui lòng nhập địa chỉ!'),
})

const IndividualUser = () => {
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery<IUser>({
        queryKey: ['headerUser', user?.id],
        queryFn: () => fetchHeaderUser(user?.id!),
        enabled: !!user?.id,
        staleTime: Infinity,
    })

    const [initialValues, setInitialValues] = useState({
        email: '',
        display_name: '',
        phone_number: '',
        detail_address: '',
        image_data: [] as File[],
        image_delete: false,
        previewImage: '',
    })

    useEffect(() => {
        if (data) {
            setInitialValues({
                email: data.email || '',
                display_name: data.display_name || '',
                phone_number: data.phone_number || '',
                detail_address: data.detail_address || '',
                image_data: [],
                image_delete: false,
                previewImage: data.avatar || '',
            })
        }
    }, [data])

    if (isLoading) return <CircularProgressLoading />
    if (error) return <p>Lỗi: {(error as Error).message}</p>

    const handleAvatarChange = (file: File, setFieldValue: any) => {
        const fileURL = URL.createObjectURL(file)
        setFieldValue('image_data', [file])
        setFieldValue('previewImage', fileURL)
        setFieldValue('image_delete', true)
    }

    return (
        <Box sx={{ width: '100%', height: 574, bgcolor: '#FFFFFF', borderRadius: '10px' }}>
            <Box sx={{ p: 3, px: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography sx={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '30px', color: '#3C3C3C' }}>
                    Thông tin cá nhân
                </Typography>
                <Typography sx={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '15px', color: '#000', mb: 2 }}>
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={ChangeUserSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const formData = new FormData()
                            formData.append('display_name', values.display_name)
                            formData.append('phone_number', values.phone_number)
                            formData.append('detail_address', values.detail_address)
                            formData.append('image_delete', values.image_delete ? 'true' : 'false')
                            if (values.image_data.length > 0) {
                                formData.append('image_data', values.image_data[0])
                            }

                            await dispatch(
                                editUser({
                                    id: Number(user?.id),
                                    formData,
                                })
                            )
                            if (user?.id) {
                                queryClient.invalidateQueries({
                                    queryKey: ['headerUser', user.id],
                                });
                            } //Recall API react-query v4

                            toast.success('✅ Cập nhật thông tin thành công!', { theme: 'colored' })
                        } catch (err: any) {
                            toast.error(err.message || 'Có lỗi xảy ra!', { theme: 'colored' })
                        } finally {
                            setSubmitting(false)
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
                        <Form>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '15px', fontFamily: 'Inter' }}>Tài khoản</Typography>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                margin="normal"
                                                name="display_name"
                                                placeholder="Nhập tên người dùng"
                                                value={values.display_name}
                                                onChange={handleChange}
                                                error={touched.display_name && Boolean(errors.display_name)}
                                                helperText={touched.display_name && errors.display_name}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '15px', fontFamily: 'Inter' }}>Email</Typography>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                margin="normal"
                                                name="email"
                                                value={values.email}
                                                InputProps={{ readOnly: true, style: { backgroundColor: '#f5f5f5', color: '#777' } }}
                                            />
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '15px', fontFamily: 'Inter' }}>Số điện thoại</Typography>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                margin="normal"
                                                name="phone_number"
                                                placeholder="Nhập số điện thoại"
                                                value={values.phone_number}
                                                onChange={handleChange}
                                                error={touched.phone_number && Boolean(errors.phone_number)}
                                                helperText={touched.phone_number && errors.phone_number}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '15px', fontFamily: 'Inter' }}>Địa chỉ</Typography>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                margin="normal"
                                                name="detail_address"
                                                placeholder="Nhập địa chỉ"
                                                value={values.detail_address}
                                                onChange={handleChange}
                                                error={touched.detail_address && Boolean(errors.detail_address)}
                                                helperText={touched.detail_address && errors.detail_address}
                                            />
                                        </Box>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={isSubmitting}
                                        sx={{
                                            bgcolor: '#E54141',
                                            color: 'white',
                                            mt: 3,
                                            height: 45,
                                            borderRadius: '10px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            width: '100%',
                                            maxWidth: 231,
                                            '&:hover': { bgcolor: '#7e1f10ff', transform: 'scale(1.02)', transition: '0.2s' },
                                        }}
                                    >
                                        Xác nhận
                                    </Button>
                                </Box>

                                {/* Right side: avatar */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', ml: 4 }}>
                                    <Image
                                        src={values.previewImage || avatarLogo}
                                        width={236}
                                        height={236}
                                        alt="Avatar user"
                                        style={{ objectFit: 'cover', borderRadius: '50%', border: '2px solid #ddd' }}
                                    />

                                    <input
                                        id="upload-avatar"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={e => {
                                            const file = e.currentTarget.files?.[0]
                                            if (file) handleAvatarChange(file, setFieldValue)
                                        }}
                                    />
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        htmlFor="upload-avatar"
                                        sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 500, px: 3, py: 1, color: 'red' }}
                                    >
                                        Đổi avatar
                                    </Button>

                                    <Typography sx={{ width: 232, textAlign: 'center', color: '#343538', fontFamily: 'Inter', fontSize: 15 }}>
                                        Dung lượng file tối đa 1 MB
                                    </Typography>
                                    <Typography sx={{ width: 232, textAlign: 'center', color: '#343538', fontFamily: 'Inter', fontSize: 15, mt: -1 }}>
                                        Định dạng: .JPEG, .PNG
                                    </Typography>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default IndividualUser
