import React from "react";
import { Container, Typography, Paper, Avatar, Box, Button } from "@mui/material";

const ProfilePage: React.FC = () => {
    return (
        <Container sx={{ mt: 6 }}>
            <Paper
                sx={{
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
                    textAlign: "center"
                }}
            >
                {/* Avatar */}
                <Avatar
                    src="https://i.pravatar.cc/150?img=12"
                    sx={{
                        width: 120,
                        height: 120,
                        margin: "0 auto",
                        mb: 2,
                        border: "4px solid #2575fc"
                    }}
                />
                <Typography variant="h5" fontWeight="bold">
                    Nguyễn Văn A
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Thành viên từ: 2025
                </Typography>

                {/* Info box */}
                <Box sx={{ mt: 4, textAlign: "left" }}>
                    <Typography variant="h6" fontWeight="600">
                        Thông tin cá nhân
                    </Typography>
                    <Typography>Email: nguyenvana@example.com</Typography>
                    <Typography>SĐT: 0987 654 321</Typography>
                    <Typography>Vai trò: Người dùng</Typography>
                </Box>

                {/* Button */}
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        px: 4,
                        py: 1.5,
                        borderRadius: 5,
                        fontWeight: "bold",
                        background: "linear-gradient(90deg, #2575fc, #6a11cb)"
                    }}
                >
                    Chỉnh sửa hồ sơ
                </Button>
            </Paper>
        </Container>
    );
};

export default ProfilePage;
