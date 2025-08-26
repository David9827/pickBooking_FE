import React from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";

const HomePage: React.FC = () => {
    return (
        <Container sx={{ mt: 6 }}>
            {/* Banner */}
            <Box
                sx={{
                    p: 4,
                    borderRadius: 3,
                    textAlign: "center",
                    color: "#fff",
                    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.15)"
                }}
            >
                <Typography variant="h3" fontWeight="bold">
                    Chào mừng bạn đến với PickBooking 🎾
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, opacity: 0.9 }}>
                    Đặt sân nhanh chóng - Giao lưu dễ dàng - Trải nghiệm hiện đại
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        px: 4,
                        py: 1.5,
                        borderRadius: 5,
                        background: "#fff",
                        color: "#2575fc",
                        fontWeight: "bold",
                        "&:hover": { background: "#f4f4f4" }
                    }}
                >
                    Bắt đầu ngay
                </Button>
            </Box>

            {/* Nội dung chính */}
            <Paper
                sx={{
                    mt: 6,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.1)"
                }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    📢 Bảng tin mới nhất
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Đây là nơi hiển thị các bài viết và cập nhật từ cộng đồng. Hãy chia sẻ
                    trải nghiệm thể thao và kết nối cùng bạn bè!
                </Typography>
            </Paper>
        </Container>
    );
};

export default HomePage;
