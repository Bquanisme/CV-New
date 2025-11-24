'use client'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import styles from "../css/style.module.css";
import { IHotTour } from '@/typescript/home';

//Tourism
export function TourismBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs  >
        <Link href="/" className={styles.linkTourism}>
          Trang chủ
        </Link>
        <Typography
          sx={{ color: '#E54141', fontWeight: 700, fontFamily: 'Inter', fontSize: '14px' }}
        >
          Điểm đến
        </Typography>
        <Link href="/travel" className={styles.linkTourism}>
          Du lịch
        </Link>
        <Typography
          sx={{ color: '#343434', fontWeight: 500, fontFamily: 'Inter', fontSize: '14px' }}
        >
          Tắm biển
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

//Travel
export function TravelBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs>
        <Link href="/" className={styles.linkTravel}>
          Trang chủ
        </Link>
        <Typography
          sx={{ color: '#FFFFFF', fontWeight: 600, fontFamily: 'Inter', fontSize: '14px' }}
        >
          Điểm đến
        </Typography>
        <Typography sx={{ color: '#FFFFFF', fontWeight: 400, fontFamily: 'Inter', fontSize: '14px' }}>Du lịch</Typography>
      </Breadcrumbs>
    </div>
  );
}

//Hotel
export function HotelBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs sx={{ color: '#fff' }}>
        <Link href="/" className={styles.linkTravel}>
          Trang chủ
        </Link>
        <Typography
          sx={{ color: '#FFFFFF', fontWeight: 600, fontFamily: 'Inter', fontSize: '14px' }}
        >
          Điểm đến
        </Typography>
        <Typography sx={{ color: '#FFFFFF', fontWeight: 400, fontFamily: 'Inter', fontSize: '14px' }}>Khách sạn</Typography>
      </Breadcrumbs>
    </div>
  );
}

//All Room
export function AllRoomBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs >
        <Link href="/" className={styles.linkTourism}>
          Trang chủ
        </Link>
        <Typography
          sx={{ color: '#E54141', fontWeight: 600, fontFamily: 'Inter', fontSize: '14px' }}
        >
          Điểm đến
        </Typography>
        <Link href="/hotel" className={styles.linkTourism}>
          Nơi cư trú
        </Link>
        <Typography sx={{ color: '#343434', fontWeight: 500, fontFamily: 'Inter', fontSize: '14px' }}>Phòng nghỉ</Typography>
      </Breadcrumbs>
    </div>
  );
}


//Detail tourism
type IProps = {
  id: string
  data: IHotTour | undefined
}

export function TourismIdBreadcrumbs({ id, data }: IProps) {
  return (
    <div role="presentation">
      <Breadcrumbs sx={{ color: '#fff' }}>
        <Link href="/" className={styles.linkTravel}>
          Trang chủ
        </Link>
        <Typography
          sx={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'Inter', fontSize: '14px' }}
        >
          Điểm đến
        </Typography>
        <Link href="/travel/tourism" className={styles.linkTravel}>
          Du lịch
        </Link>
        <Typography
          sx={{ color: '#A9A9A9', fontWeight: 500, fontFamily: 'Inter', fontSize: '14px' }}
        >
          {data?.name}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

export function RoomIdBreadcrumbs({ id, data }: IProps) {
  return (
    <div role="presentation">
      <Breadcrumbs sx={{ color: '#fff' }}>
        <Link href="/" className={styles.linkTravel}>
          Trang chủ
        </Link>
        <Typography
          sx={{ color: '#FFFFFF', fontWeight: 700, fontFamily: 'Inter', fontSize: '14px' }}
        >
          Điểm đến
        </Typography>
        <Link href="/hotel" className={styles.linkTravel}>
          Nơi cư trú
        </Link>
        <Link href="/hotel/allRoom" className={styles.linkTravel}>
          Phòng nghỉ
        </Link>
        <Typography
          sx={{ color: '#FFFFFF', fontWeight: 500, fontFamily: 'Inter', fontSize: '14px' }}
        >
          {data?.name}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

export function TourBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs sx={{ color: '#fff' }}>
        <Link href="/" className={styles.linkTravel}>
          Trang chủ
        </Link>
        <Typography sx={{ color: '#FFFFFF', fontWeight: 400, fontFamily: 'Inter', fontSize: '14px' }}>Tour</Typography>
      </Breadcrumbs>
    </div>
  );
}

export function CartBreadcrumbs({ pathname }: { pathname: string }) {
  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbMap: Record<string, string> = {
    individualUser: "Thông tin cá nhân",
    changePassword: "Đổi mật khẩu",
    cart: "Lịch sử đơn hàng",
  };

  return (
    <div role="presentation">
      <Breadcrumbs>
        <Link href="/" className={styles.linkTourism}>
          Trang chủ
        </Link>

        <Typography sx={{ color: '#E54141', fontWeight: 600, fontFamily: 'Inter', fontSize: '14px' }}>
          Cá nhân
        </Typography>

        {paths.map((item, index) => {
          const isLast = index === paths.length - 1;
          const title = breadcrumbMap[item] || item;

          return (
            <Typography
              key={item}
              sx={{
                color: isLast ? '#292D32' : '#E54141',
                fontWeight: isLast ? 400 : 600,
                fontFamily: 'Inter',
                fontSize: '14px',
              }}
            >
              {title}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

export function AdminBreadcrumbs({ pathname }: { pathname: string }) {
  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbMap: Record<string, string> = {
    dashboard: "Dashboard",
    changePassword: "Quản lý tài khoản",
    cart: "Lịch sử đơn hàng",
  };

  return (
    <div role="presentation">
      <Breadcrumbs>
        <Link href="/" className={styles.linkTourism}>
          Trang chủ
        </Link>

        {paths.map((item, index) => {
          const isLast = index === paths.length - 1;
          const title = breadcrumbMap[item] || item;

          return (
            <Typography
              key={item}
              sx={{
                color: isLast ? '#292D32' : '#E54141',
                fontWeight: isLast ? 400 : 600,
                fontFamily: 'Inter',
                fontSize: '14px',
              }}
            >
              {title}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
