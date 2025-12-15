'use client';
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getDashboardAPI } from "@/api/home/api.admin";
import CircularProgressLoading from "@/components/otherComponents/circularProgress.loading";
import { Box } from "@mui/material";
import { DashboardData } from "@/typescript/home";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function DashboardChart() {
    const { data, isLoading } = useQuery<DashboardData>({
        queryKey: ['dashboard'],
        queryFn: getDashboardAPI,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    if (isLoading) return <CircularProgressLoading />;

    const labels = [
        "Customer", "Pending", "Access", "Ending",
        "Cancel", "Pending Cancel", "Room", "Tour"
    ];

    const dataset = {
        labels,
        datasets: [
            {
                label: "Dashboard Data",
                data: [
                    data?.customer ?? 0,
                    data?.order_pending ?? 0,
                    data?.order_access ?? 0,
                    data?.order_ending ?? 0,
                    data?.order_cancel ?? 0,
                    data?.order_pending_cancel ?? 0,
                    data?.room ?? 0,
                    data?.tour ?? 0,
                ],
                backgroundColor: [
                    "rgba(77, 255, 7, 0.5)",
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                    "rgba(201, 203, 207, 0.5)",
                ],
                borderColor: [
                    "rgba(6, 228, 24, 1)",
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 206, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(153, 102, 255)",
                    "rgb(255, 159, 64)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Dashboard Overview'
            },
        },
        scales: {
            y: { beginAtZero: true }
        },
    };

    return (
        <Box
            sx={{
                width: "100%",
                mx: "auto",
                p: { xs: 1, sm: 2 },
                height: {
                    xs: 300,   // mobile
                    sm: 380,   // tablet
                    md: 450,   // desktop nhỏ
                    lg: 520,   // desktop lớn
                },
            }}
        >
            <Bar data={dataset} options={options} />
        </Box>
    );
}
