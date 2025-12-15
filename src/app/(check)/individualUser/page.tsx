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
import CircularProgressLoading from '@/components/otherComponents/circularProgress.loading'
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
        <Box
            sx={{
                width: '100%',
                bgcolor: '#FFFFFF',
                borderRadius: '10px',
                minHeight: { md: 574 },
            }}
        >
            <Box
                sx={{
                    p: { xs: 2, md: 3 },
                    px: { xs: 2, md: 5 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                {/* Title */}
                <Typography
                    sx={{
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: { xs: '22px', md: '30px' },
                        color: '#3C3C3C',
                    }}
                >
                    Thông tin cá nhân
                </Typography>

                <Typography
                    sx={{
                        fontFamily: 'Inter',
                        fontWeight: 400,
                        fontSize: '15px',
                        color: '#000',
                        mb: 2,
                    }}
                >
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={ChangeUserSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const formData = new FormData();
                            formData.append('display_name', values.display_name);
                            formData.append('phone_number', values.phone_number);
                            formData.append('detail_address', values.detail_address);
                            formData.append('image_delete', values.image_delete ? 'true' : 'false');

                            if (values.image_data.length > 0) {
                                formData.append('image_data', values.image_data[0]);
                            }

                            await dispatch(
                                editUser({
                                    id: Number(user?.id),
                                    formData,
                                })
                            );

                            if (user?.id) {
                                queryClient.invalidateQueries({
                                    queryKey: ['headerUser', user.id],
                                });
                            }

                            toast.success('✅ Cập nhật thông tin thành công!', { theme: 'colored' });
                        } catch (err: any) {
                            toast.error(err.message || 'Có lỗi xảy ra!', { theme: 'colored' });
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        setFieldValue,
                        isSubmitting,
                    }) => (
                        <Form>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    gap: { xs: 4, md: 0 },
                                }}
                            >
                                <Box sx={{ flex: 1, width: '100%' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column', md: 'row' },
                                            gap: 2,
                                        }}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Typography fontWeight={500} fontSize="15px" fontFamily="Inter">
                                                Tài khoản
                                            </Typography>
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
                                            <Typography fontWeight={500} fontSize="15px" fontFamily="Inter">
                                                Email
                                            </Typography>
                                            <Field
                                                as={TextField}
                                                fullWidth
                                                margin="normal"
                                                name="email"
                                                value={values.email}
                                                InputProps={{
                                                    readOnly: true,
                                                    style: {
                                                        backgroundColor: '#f5f5f5',
                                                        color: '#777',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Phone + Address */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column', md: 'row' },
                                            gap: 2,
                                            mt: 2,
                                        }}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Typography fontWeight={500} fontSize="15px" fontFamily="Inter">
                                                Số điện thoại
                                            </Typography>
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
                                            <Typography fontWeight={500} fontSize="15px" fontFamily="Inter">
                                                Địa chỉ
                                            </Typography>
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

                                    {/* Submit */}
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
                                            width: { xs: '100%', sm: 231 },
                                            maxWidth: '100%',
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

                                {/* RIGHT: AVATAR */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        alignItems: 'center',
                                        ml: { md: 4 },
                                        order: { xs: -1, md: 0 },
                                    }}
                                >
                                    <Image
                                        src={values.previewImage || avatarLogo}
                                        alt="Avatar user"
                                        width={200}
                                        height={230}
                                        style={{
                                            width: '100%',
                                            maxWidth: 236,
                                            aspectRatio: '1 / 1',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                            border: '2px solid #ddd',
                                        }}
                                    />

                                    <input
                                        id="upload-avatar"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            const file = e.currentTarget.files?.[0];
                                            if (file) handleAvatarChange(file, setFieldValue);
                                        }}
                                    />

                                    <Button
                                        variant="outlined"
                                        component="label"
                                        htmlFor="upload-avatar"
                                        sx={{
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            px: 3,
                                            py: 1,
                                            color: 'red',
                                        }}
                                    >
                                        Đổi avatar
                                    </Button>

                                    <Typography
                                        sx={{
                                            width: 232,
                                            textAlign: 'center',
                                            fontFamily: 'Inter',
                                            fontSize: 15,
                                        }}
                                    >
                                        Dung lượng file tối đa 1 MB
                                    </Typography>
                                    <Typography
                                        sx={{
                                            width: 232,
                                            textAlign: 'center',
                                            fontFamily: 'Inter',
                                            fontSize: 15,
                                            mt: -1,
                                        }}
                                    >
                                        Định dạng: .JPEG, .PNG
                                    </Typography>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );

}

export default IndividualUser
