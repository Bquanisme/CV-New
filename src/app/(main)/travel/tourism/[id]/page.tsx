"use client";
import { useParams } from "next/navigation";
import React from "react";
import DetailUI from "./detailUI";

const DetailTour = () => {
  const { id } = useParams();

  return (
    <div>
        <DetailUI id={id}/>
    </div>
  );
};

export default DetailTour;
