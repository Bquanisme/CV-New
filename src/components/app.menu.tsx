import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import HomeLogin from '@/components/home.login';
import { IUser } from '@/typescript/home';
import Box from '@mui/material/Box';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/Slice/authSlice';
import { toast } from 'react-toastify';
import HomeRegister from './home.register';

type IProps = {
  anchorEl: null | HTMLElement
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  data: IUser | undefined
  openRegister: boolean,
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>
};

export default function AppMenu(props: IProps) {

  const {anchorEl, setAnchorEl, data, openRegister, setOpenRegister} = props

  const openMenu = Boolean(anchorEl);
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState<boolean>(false);
  
  //login
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //register
  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };


  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout())
    toast.success("Bạn đã đăng xuất thành công !!")
  }

  return (
    <React.Fragment>
      {data 
      ? (<Box>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Button 
          sx={{
              p: 2,
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: '#E54141', 
              m: 1,
              borderRadius: "10px",
              textTransform: 'none',
              width: 237,
              height: 45,
              color: 'white'
          }} 
          onClick={handleLogOut}
        >
           Đăng xuất
        </Button>
      </Menu>
      </Box>)
      : (<Box>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Button 
            sx={{
                p: 2,
                display: 'flex', 
                alignItems: 'center', 
                bgcolor: '#E54141', 
                m: 1,
                borderRadius: "10px",
                textTransform: 'none',
                width: 237,
                height: 45,
                color: 'white'
            }} 
            onClick={handleClickOpen}
        >
           Đăng nhập
        </Button>
        <Typography sx={{fontWeight: 400, fontSize: '14px', p: 2, pb: 1, pt: 1, fontFamily: 'Inter'}}>
            Chưa có tài khoản? <span onClick={handleClickOpenRegister} style={{color: '#1C5C80', cursor: 'pointer'}}>Đăng ký</span> ngay
        </Typography>
      </Menu>
      <HomeLogin open={open} setOpen={setOpen} handleClose={handleClose} handleClickOpenRegister={handleClickOpenRegister}/>
      <HomeRegister openRegister={openRegister} setOpenRegister={setOpenRegister} handleCloseRegister={handleCloseRegister} handleClickOpen={handleClickOpen}/>
      </Box>)
      }
    </React.Fragment>
  );
}
