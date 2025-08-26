import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
    Button,
    CircularProgress,
} from "@mui/material";
import { User } from "../types";

interface MyProfileProps {
    userId: number;// ID user hiện tại (có thể lấy từ login context hoặc props)
}

const MyProfile: React.FC<MyProfileProps> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const userStr = localStorage.getItem("user");
    if (userStr) {
        const currentUser = JSON.parse(userStr);
        setUser(currentUser.userId); // lấy id từ localStorage
    }

    useEffect(() => {
        // 🚀 Gọi API lấy thông tin user theo ID
        fetch(`http://localhost:8081/api/admin/users/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi load user:", err);
                setLoading(false);
            });

    }, [userId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h6" color="error">
                    Không tìm thấy thông tin người dùng
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, margin: "20px auto" }}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
                <Box display="flex" alignItems="center" gap={3}>
                    <Avatar
                        src={user.avatarUrl || ""}
                        alt={user.username}
                        sx={{ width: 100, height: 100, fontSize: 36 }}
                    >
                        {(!user.avatarUrl && user.username)
                            ? user.username.charAt(0).toUpperCase()
                            : ""}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {user.fullName || user.username}
                        </Typography>
                        <Typography color="text.secondary">
                            📧 {user.email}
                        </Typography>
                        <Typography color="text.secondary">
                            📱 {user.phone || "Chưa cập nhật"}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <CardContent>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                👤 Vai trò
                            </Typography>
                            <Typography color="text.secondary">
                                {user.role}
                            </Typography>
                        </Grid>

                    </Grid>
                </CardContent>

                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                    <Button variant="outlined" color="primary">
                        Chỉnh sửa thông tin
                    </Button>
                    <Button variant="contained" color="error">
                        Đăng xuất
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default MyProfile;
