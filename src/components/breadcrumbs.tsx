'use client'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import styles from "../css/style.module.css";
import { useQuery } from '@tanstack/react-query';
import { IHotTour } from '@/typescript/home';
import { fetchDetailTour } from '@/api/home/api.home';

//Tourism
export function TourismBreadcrumbs() {
  return (
    <div role="presentation">
      <Breadcrumbs  >
        <Link href="/" className={styles.linkTourism}>
            Trang chủ
        </Link>
        <Typography
          sx={{color: '#E54141', fontWeight: 700, fontFamily: 'Inter', fontSize: '14px'}}
        >
          Điểm đến
        </Typography>
        <Link href="/travel" className={styles.linkTourism}>
            Du lịch
        </Link>
        <Typography
          sx={{color: '#343434', fontWeight: 500, fontFamily: 'Inter', fontSize: '14px'}}
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
          sx={{color: '#FFFFFF', fontWeight: 600, fontFamily: 'Inter', fontSize: '14px'}}
        >
          Điểm đến
        </Typography>
        <Typography sx={{color: '#FFFFFF', fontWeight: 400, fontFamily: 'Inter', fontSize: '14px'}}>Du lịch</Typography>
      </Breadcrumbs>
    </div>
  );
}


//Detail tourism
type IProps = {
  id: string
  data: IHotTour | undefined
}

export function TourismIdBreadcrumbs({id, data}: IProps) {
  return (
    <div role="presentation">
      <Breadcrumbs sx={{color: '#fff'}}>
        <Link href="/" className={styles.linkTravel}>
            Trang chủ
        </Link>
        <Typography
          sx={{color: '#FFFFFF', fontWeight: 700, fontFamily: 'Inter', fontSize: '14px'}}
        >
          Điểm đến
        </Typography>
        <Link href="/travel/tourism" className={styles.linkTravel}>
            Du lịch
        </Link>
        <Typography
          sx={{color: '#A9A9A9', fontWeight: 500, fontFamily: 'Inter', fontSize: '14px'}}
        >
          {data?.name}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

