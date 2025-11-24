"use client";
import { useParams } from "next/navigation";
import React from "react";
import DetailRoom from "./detailRoom";

const DetailTour = () => {
  const { plug } = useParams();

  return (
    <div>
        <DetailRoom id={plug}/>
    </div>
  );
};

export default DetailTour;
