"use client";
import { useParams } from "next/navigation";
import React from "react";
import DetailCartUI from "./detailCartUI";
import { useQuery } from "@tanstack/react-query";
import { fetchDetailOrder } from "@/api/home/api.home";
import CircularProgressLoading from "@/components/otherComponents/circularProgress.loading";

const DetailTour = () => {
    const { detailId } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['orderDetail', detailId],
        queryFn: () => fetchDetailOrder(detailId),
        enabled: !!detailId,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <CircularProgressLoading />

    return (
        <div>
            <DetailCartUI id={detailId} data={data} />
        </div>
    );
};

export default DetailTour;
