"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import FakeAPIForNews from "@/api/api.fakeForNews";
import NewLogo from '@/assets/night.jpg'
import { NewsBreadcrumbs } from "@/components/otherComponents/breadcrumbs";

export default function News() {
    return (
        <Box sx={{ backgroundColor: "#f5eeeeff", fontFamily: "Inter, sans-serif" }}>

            <Box
                sx={{
                    flex: 2,
                    position: "relative",
                    overflow: "hidden",
                    minHeight: { xs: 250, sm: 300, md: 700 },
                }}
            >
                <Image
                    src={NewLogo}
                    alt="News Logo"
                    fill
                    style={{ objectFit: "cover" }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: '100%',
                        bgcolor: "#3635356e ",
                        color: "white",
                        fontSize: 14,
                    }}
                >

                    <Box
                        sx={{
                            position: "absolute",
                            top: '40%',
                            left: 0,
                            width: "100%",
                            height: 47,
                            color: "white",
                            fontSize: 14,
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <NewsBreadcrumbs />
                        <Typography sx={{
                            fontWeight: 700,
                            textAlign: 'center',
                            fontSize: '45px',
                            color: '#ffffffff',
                            fontFamily: 'SVN-Gilroy'
                        }}>
                            News
                        </Typography>
                    </Box>
                </Box>
            </Box><br /><br />

            {/* Highlight Section */}
            <Typography
                sx={{ fontSize: 40, p: { xs: 2, md: 3 }, pl: { xs: 2, md: 5 }, fontWeight: "bold" }}
            >
                Mới nhất
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2,
                    mb: 5,
                    p: { xs: 2, md: 5 },
                    pt: { xs: 2, md: 3 },
                }}
            >
                {/* Highlight */}
                <Box
                    sx={{
                        flex: 2,
                        position: "relative",
                        borderRadius: 2,
                        overflow: "hidden",
                        minHeight: { xs: 250, sm: 300, md: 600 },
                    }}
                >
                    <Image
                        src={FakeAPIForNews.highlight.image}
                        alt={FakeAPIForNews.highlight.title}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: { xs: 0, md: "50%" },
                            p: { xs: 2, md: 3 },
                            bgcolor: "rgba(0,0,0,0.6)",
                            color: "#f5f5f5",
                            borderRadius: "0 0 8px 8px",
                            width: { xs: "100%", md: "auto" },
                        }}
                    >
                        <Typography >{FakeAPIForNews.highlight.date}</Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {FakeAPIForNews.highlight.title}
                        </Typography>
                        <Typography fontSize="14px" mt={1}>
                            {FakeAPIForNews.highlight.description}
                        </Typography>
                        <Button size="small" sx={{ color: "orange", mt: 1 }}>
                            Đọc thêm
                        </Button>
                    </Box>
                </Box>

                {/* Most Viewed */}
                <Box
                    sx={{
                        flex: 1,
                        bgcolor: "#e9ddddff",
                        p: 4,
                        borderRadius: 2,
                        overflowY: "auto",
                        minHeight: { xs: "auto", md: 500 },
                    }}
                >
                    <Typography fontWeight="bold" color="blue" mb={3} fontSize='20px'>
                        Xem nhiều nhất
                    </Typography>
                    {FakeAPIForNews.mostViewed.map((news) => (
                        <Box key={news.id} mb={2}>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Typography fontSize="15px" color="orange" fontFamily='Inter'>
                                    Nổi bật
                                </Typography>
                                <Typography fontSize="15px" color="gray" fontFamily='Inter'>
                                    {news.date}
                                </Typography>
                            </Box>
                            <Typography fontWeight="500" my={1.5} fontFamily='Inter'>{news.title}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Cards */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                    gap: 3,
                    p: { xs: 3, md: 10 },
                    pt: { xs: 2, md: 3 },
                }}
            >
                {FakeAPIForNews.cards.map((card) => (
                    <Box key={card.id} sx={{ borderRadius: 2, overflow: "hidden" }}>
                        <Box sx={{ width: "100%", height: { xs: 180, sm: 200, md: 300 }, position: "relative" }}>
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </Box>

                        <Box pt={2}>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Typography fontSize="16px" color="orange" fontFamily='Inter'>
                                    Nổi bật
                                </Typography>
                                <Typography fontSize="16px" color="gray" fontFamily='Inter'>
                                    {card.date}
                                </Typography>
                            </Box>
                            <Typography fontWeight="bold" mt={1} fontFamily='Inter'>
                                {card.title}
                            </Typography>
                            <Typography fontSize="16px" mt={1} fontFamily='Inter'>
                                {card.description}
                            </Typography>
                            <Typography fontFamily='Inter' sx={{ color: "blue", mt: 1, cursor: "pointer", fontWeight: "bold" }}>
                                Đọc thêm
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Posts */}
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={1}
                sx={{ pl: { xs: 3, md: 10 }, pt: 3, fontSize: 25 }}
            >
                Bài viết
            </Typography>

            {FakeAPIForNews.posts.map((post) => (
                <Box
                    key={post.id}
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2,
                        p: { xs: 3, },
                        pt: 0,
                        pl: { xs: 3, md: 9 },
                        pr: { xs: 3, md: 35 },

                    }}
                >
                    <Box
                        sx={{
                            width: { xs: "100%", md: 250 },
                            minHeight: { xs: 300, md: 200 },
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </Box>

                    <Box flex={1}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Typography fontSize="16px" color="orange" fontFamily='Inter'>
                                Nổi bật
                            </Typography>
                            <Typography fontSize="16px" color="gray" fontFamily='Inter'>
                                {post.date}
                            </Typography>
                        </Box>

                        <Typography fontWeight="bold" mt={1}>
                            {post.title}
                        </Typography>

                        <Typography fontSize="17px" fontFamily='Inter'>{post.description}</Typography>

                        <Typography
                            fontFamily='Inter'
                            sx={{ color: "#3a2f68ff", mt: 1, cursor: "pointer", fontWeight: "bold" }}
                        >
                            Đọc thêm
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
