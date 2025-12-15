import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  Slide,
  DialogActions,
} from '@mui/material'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import QRCode from '../../assets/QRPayment.jpg'
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { checkDeleteOrder } from '@/redux/Slice/userSlice';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


type IProps = {
  data: any
  id: string
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const DetailCartRight = ({ data, id }: IProps) => {
  const [open, setOpen] = useState(false)
  const [openCheckDelete, setOpenCheckDelete] = useState(false)
  const dispatch = useAppDispatch();

  //Mở thanh toán
  const handleOpen = () => {
    setOpen(true)
  }

  //Đóng thanh toán
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpenCheckDelete = () => {
    setOpenCheckDelete(true)
  }

  //Đóng thanh toán
  const handleCloseCheckDelete = () => {
    setOpenCheckDelete(false)
  }

  const handleCheckDeleteOrder = async () => {
    try {
      await dispatch(
        checkDeleteOrder({ id })
      ).unwrap();
      handleCloseCheckDelete();
      toast.success('Bạn đã hủy đơn hàng thành công !');
    }
    catch (err: any) {
      toast.error(err || 'Có lỗi xảy ra!', { theme: 'colored' })
    }
  }

  return (
    <Box sx={{ width: '100%', bgcolor: '#FFFFFF', borderRadius: '10px', p: 3 }}>
      <Typography sx={{
        color: '#292D32',
        fontFamily: "Inter",
        fontSize: "20px",
        fontWeight: 600,
        mb: 3
      }}>
        Thông tin người thanh toán
      </Typography>
      <Table sx={{ ml: -1.5 }} size="medium">
        <TableBody>

          <TableRow>
            <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
              <Typography fontWeight={600} fontSize={16} fontFamily='Inter' color="#3C3C3C">
                Họ và tên
              </Typography>
            </TableCell>

            <TableCell sx={{ border: 'none', py: 0.5 }}>
              <Typography fontSize={16} color="#3C3C3C" fontFamily='Inter'>Nguyễn Minh Đạt</Typography>
            </TableCell>
          </TableRow><br />

          <TableRow>
            <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
              <Typography fontWeight={600} fontSize={16} fontFamily='Inter' color="#3C3C3C">
                Số tài khoản
              </Typography>
            </TableCell>

            <TableCell sx={{ border: 'none', py: 0.5 }}>
              <Typography fontSize={16} color="#3C3C3C" fontFamily='Inter'>
                000011112222333
              </Typography>
            </TableCell>
          </TableRow><br />

          <TableRow>
            <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
              <Typography fontWeight={600} fontSize={16} fontFamily='Inter'>Giới tính</Typography>
            </TableCell>

            <TableCell sx={{ border: 'none', py: 0.5 }}>
              <Typography fontSize={16} fontFamily='Inter'>
                Nữ
              </Typography>
            </TableCell>
          </TableRow><br />

          <TableRow>
            <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
              <Typography fontWeight={600} fontSize={16} fontFamily='Inter'>Số điện thoại</Typography>
            </TableCell>

            <TableCell sx={{ border: 'none', py: 0.5 }}>
              <Typography fontSize={16} fontFamily='Inter'>
                089328595
              </Typography>
            </TableCell>
          </TableRow><br />

          <TableRow>
            <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
              <Typography fontWeight={600} fontSize={16} fontFamily='Inter'>Email</Typography>
            </TableCell>

            <TableCell sx={{ border: 'none', py: 0.5 }}>
              <Typography fontSize={16} fontFamily='Inter'>
                minhdatj@gmail.com
              </Typography>
            </TableCell>
          </TableRow><br />

          <TableRow>
            <TableCell sx={{ border: 'none', width: 200, py: 0.5 }}>
              <Typography fontWeight={600} fontSize={16} fontFamily='Inter'>Ghi chú</Typography>
            </TableCell>

            <TableCell sx={{ border: 'none', py: 0.5 }}>
              <Typography fontSize={16} fontFamily='Inter'>
                Đến checkin muộn 20 phút
              </Typography>
            </TableCell>
          </TableRow><br />
        </TableBody>
      </Table>
      {data?.status === 'pending' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleOpenCheckDelete}
            sx={{
              borderRadius: '10px',
              fontWeight: 500,
              textDecoration: 'none',
              textTransform: 'none',
              height: 41.947242736816406,
              width: 154,
            }}
          >
            Hủy đơn hàng
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleOpen}
            sx={{
              borderRadius: '10px',
              fontWeight: 500,
              textDecoration: 'none',
              textTransform: 'none',
              height: 41.947242736816406,
              width: 154,
            }}
          >
            Thanh toán
          </Button>
        </Box>
      )}

      {/* dialog Thanh toán */}
      <BootstrapDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0px 8px 40px rgba(0,0,0,0.25)",
            maxWidth: 500,
            width: "90%",
            m: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {/* Close Icon */}
        <Box sx={{ alignSelf: "flex-end" }}>
          <CloseIcon
            onClick={handleClose}
            sx={(theme) => ({
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.6)",
                color: theme.palette.grey[100],
              },
            })}
          />
        </Box>

        {/* Tiêu đề */}
        <Typography
          fontWeight="bold"
          color="primary.main"
          textAlign="center"
          fontSize={{ xs: 22, md: 26 }}
          sx={{ mb: 3 }}
        >
          THANH TOÁN
        </Typography>

        <Box
          sx={{
            width: 250,
            height: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Image
            src={QRCode}
            alt="QR image"
            width={250}
            height={250}
            style={{
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Thông tin ngân hàng */}
        <Box sx={{ width: "100%" }}>
          {[
            { label: "Tên TK", value: "Cổng thông tin du lịch" },
            { label: "Số TK", value: "0123456789" },
            { label: "Ngân hàng", value: "Vietcombank - chi nhánh Ba Đình, Hà Nội" },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography fontWeight="bold" fontSize={14}>
                {item.label}:
              </Typography>
              <Typography fontSize={14}>{item.value}</Typography>
            </Box>
          ))}
        </Box>
      </BootstrapDialog>

      {/* dialog Hủy */}
      <BootstrapDialog
        open={openCheckDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCheckDelete}
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0px 8px 40px rgba(0,0,0,0.25)",
            maxWidth: 700,
            width: "90%",
            m: 0,
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 3,
            pl: 7
          },
        }}
      >
        {/* Close Icon */}
        <Box sx={{ alignSelf: "flex-end" }}>
          <CloseIcon
            onClick={handleCloseCheckDelete}
            sx={(theme) => ({
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.6)",
                color: theme.palette.grey[100],
                borderRadius: 10,
              },
            })}
          />
        </Box>

        {/* Tiêu đề */}
        <Typography
          fontWeight="bold"
          color="primary.main"
          fontSize={{ xs: 22, md: 26 }}
          sx={{ mb: 2 }}
        >
          HỦY ORDER
        </Typography>

        <Box
          sx={{
            mb: 3
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            fontFamily="Inter"
            fontSize="20px"
          >
            Bạn có chắc chắn muốn hủy đơn hàng này không ?
          </Typography>
        </Box>
        <DialogActions>
          <Button
            variant='contained'
            color='error'
            onClick={handleCloseCheckDelete}
            sx={{
              textDecoration: 'none',
              textTransform: 'none',
              borderRadius: 2,
              width: 100
            }}
          >
            Hủy
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={handleCheckDeleteOrder}
            sx={{
              textDecoration: 'none',
              textTransform: 'none',
              borderRadius: 2
            }}
            autoFocus
          >
            Chấp nhận
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  )
}

export default DetailCartRight
