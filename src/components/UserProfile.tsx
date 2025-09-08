import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent, CardMedia,
    CircularProgress,
    Divider, IconButton, Menu, MenuItem,
    Typography,
} from "@mui/material";
import {Post, User} from "../types";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [requestSent, setRequestSent] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);


    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const senderId = currentUser.id; // chính là id user đang đăng nhập
    const receiverId = userId;   // id user bạn muốn gửi lời mời kết bạn



    useEffect(() => {
        fetch(`http://localhost:8080/api/posts/userId/${userId}`)
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error("Lỗi load bài viết:", err));
    }, [userId]);
    useEffect(() => {
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

    const sendFriendRequest = async () => {
        await fetch(
            `http://localhost:8082/api/friends/request?senderId=${senderId}&receiverId=${receiverId}`,
            {
                method: "POST"
            }
        ).catch((err) => console.error("Lỗi:", err));
        setRequestSent(true);
    };

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );

    if (!user)
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h6" color="error">
                    Người dùng không tồn tại
                </Typography>
            </Box>
        );

    return (
        <Box sx={{ maxWidth: 600, margin: "20px auto" }}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                        src={user.avatarUrl || ""}
                        sx={{ width: 100, height: 100, fontSize: 36 }}
                    >
                        {!user.avatarUrl && user.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {user.fullName || user.username}
                        </Typography>
                        <Typography color="text.secondary">📧 {user.email}</Typography>
                        <Typography color="text.secondary">📱 {user.phone}</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendFriendRequest}
                        disabled={requestSent}
                    >
                        {requestSent ? "✅ Hủy yêu cầu" : "➕Thêm bạn"}
                    </Button>
                </Box>

                <Divider sx={{ my: 2 }} />
                {posts.length === 0 ? (
                    <Typography color="text.secondary">Người này chưa có bài viết nào.</Typography>
                ) : (
                    posts.map((post) => (
                        <CardContent>
                            {/* Header: Avatar + User Info */}
                            <div
                                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                            >
                                <Avatar>
                                    {(post.user.fullName || post.user.username || "?")
                                        .charAt(0)
                                        .toUpperCase()}
                                </Avatar>
                                <Box sx={{ position: "relative", padding: "8px" }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {post.user.fullName || post.user.username}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(post.createdAt).toLocaleString()}
                                    </Typography>

                                </Box>
                            </div>

                            <Divider style={{ margin: "10px 0" }} />

                            {/* Nội dung bài viết */}
                            <Typography
                                variant="body1"
                                style={{ display: "flex", marginTop: "5px" }}
                            >
                                {post.content}
                            </Typography>

                            {/* Ảnh nếu có */}
                            {post.imageUrl && (
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={post.imageUrl}
                                    alt="Post image"
                                    style={{ marginTop: "10px", borderRadius: "10px" }}
                                    sx={{
                                        mt: 1,
                                        borderRadius: 2,
                                        width: "100%",
                                        height: 300,
                                        objectFit: "cover"
                                    }}
                                />
                            )}

                            {/* Reaction summary */}
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                display={"flex"}
                                style={{ marginTop: "5px" }}
                            >
                                <span style={{ fontSize: "1.15rem" }}>❤️</span>{" "}
                                {post.reactionCount || 0} {" · "}
                                <span style={{ fontSize: "1.15rem" }}>💬</span>{" "}
                                {post.commentCount || 0}
                            </Typography>
            </CardContent>
                    ))
                )}
            </Card>
        </Box>
    );
};

export default UserProfile;
