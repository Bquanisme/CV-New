"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchReview } from "@/api/home/api.home";
import { IReview } from "@/typescript/home";

type IProps = {
  id: string;
};

export default function EvaluateAndCommentTour({ id }: IProps) {
  const {
    data,
    error,
    isLoading,
  } = useQuery<IReview[]>({ //[] nghĩa là nhiều kp 1
    queryKey: ["review", id],
    queryFn: () => fetchReview(Number(id)),
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading)
    return (
      <Typography sx={{ mt: 2, color: "#888" }}>Đang tải đánh giá...</Typography>
    );

  if (error)
    return (
      <Typography color="error">
        Lỗi tải đánh giá: {(error as Error).message}
      </Typography>
    );

  if (!data || data.length === 0)
    return (
      <Box
        sx={{
          width: "100%",
          minWidth: 729,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "22px",
            color: "#111",
            fontFamily: "Inter",
            mb: 2,
          }}
        >
          Đánh giá & Bình luận
        </Typography>
        <Box
          sx={{
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            bgcolor: "#FFF",
            p: 2.5,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            },
          }}
        >
          <Typography sx={{ color: "#666" }}>
            Chưa có đánh giá nào cho tour này.
          </Typography>
        </Box>
      </Box>
    );

  // console.log(data)

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "22px",
          color: "#111",
          fontFamily: "Inter",
          mb: 2,
        }}
      >
        Đánh giá & Bình luận
      </Typography>

      <Box
        sx={{
          width: "100%",
          minWidth: 729,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {data?.map((review) => {
          console.log(review?.user?.avatar)
          return (
            <Box
              key={review.id}
              sx={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                bgcolor: "#FFF",
                p: 2.5,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s",
                "&:hover": {
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                },
              }}
            >
              {/* Header */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Avatar
                  src={review?.user?.avatar || "/default-avatar.png"}
                  alt={review?.user?.display_name || "Người dùng"}
                  sx={{ width: 48, height: 48 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#111",
                        fontFamily: "Inter",
                      }}
                    >
                      {review?.user?.display_name || "Ẩn danh"}
                    </Typography>
                  </Box>

                  <Rating
                    name="read-only"
                    value={review.rate || 0}
                    readOnly
                    size="small"
                    sx={{ color: "#FFB400", mt: 0.3 }}
                  />
                </Box>
              </Box>

              {/* Nội dung bình luận */}
              <Typography
                sx={{
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#333",
                  mt: 1.5,
                }}
              >
                {review.content || "Người dùng chưa để lại bình luận."}
              </Typography>

              {/* Ảnh minh họa */}
              {review.image && review.image.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1.5 }}>
                  {review.image
                    .filter((img) => img.image_data)
                    .map((img, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          width: 110,
                          height: 110,
                          borderRadius: "10px",
                          overflow: "hidden",
                          border: "1px solid #eee",
                        }}
                      >
                        <Image
                          src={img?.image_data}
                          alt={`Ảnh ${idx + 1}`}
                          width={154}
                          height={150}
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    ))}
                </Box>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  );
}
