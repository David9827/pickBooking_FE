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
    CardMedia,
    IconButton,
    Menu,
    MenuItem,
    Tabs,
    Tab,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { User, Post } from "../types";
import FriendList from "../components/FriendList";
import FriendRequests from "../components/FriendRequests";

interface MyProfileProps {
    userId: number; // ID user hiện tại
}

const MyProfile: React.FC<MyProfileProps> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [tab, setTab] = useState(0);

    const open = Boolean(anchorEl);

    const handleMenuOpen = (
        event: React.MouseEvent<HTMLButtonElement>,
        post: Post
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedPost(post);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPost(null);
    };

    const handleDelete = async () => {
        if (!selectedPost) return;
        await fetch(`http://localhost:8080/api/posts/${selectedPost.postId}`, {
            method: "DELETE",
        });
        setPosts(posts.filter((p) => p.postId !== selectedPost.postId));
        handleMenuClose();
    };

    const handleEdit = () => {
        if (!selectedPost) return;
        console.log("Sửa bài:", selectedPost.postId);
        // TODO: mở modal chỉnh sửa
        handleMenuClose();
    };

    useEffect(() => {
        // Gọi API lấy thông tin user
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

        // Gọi API lấy bài viết user
        fetch(`http://localhost:8080/api/posts/userId/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi load posts:", err);
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
                {/* Header thông tin cá nhân */}
                <Box display="flex" alignItems="center" gap={3}>
                    <Avatar
                        src={user.avatarUrl || ""}
                        alt={user.username}
                        sx={{ width: 100, height: 100, fontSize: 36 }}
                    >
                        {!user.avatarUrl && user.username
                            ? user.username.charAt(0).toUpperCase()
                            : ""}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {user.fullName || user.username}
                        </Typography>
                        <Typography color="text.secondary">📧 {user.email}</Typography>
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
                            <Typography color="text.secondary">{user.role}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>

                {/* Tabs */}
                <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
                    <Tab label="Bài viết" />
                    <Tab label="Bạn bè" />
                    <Tab label="Lời mời kết bạn" />
                </Tabs>

                {/* Nội dung Tabs */}
                {tab === 0 && (
                    <CardContent>
                        {posts.map((post) => (
                            <Card
                                key={post.postId}
                                style={{ marginBottom: "20px", borderRadius: "10px" }}
                            >
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

                                            {/* Nút 3 chấm */}
                                            <IconButton
                                                onClick={(e) => handleMenuOpen(e, post)}
                                                sx={{
                                                    position: "absolute",
                                                    top: 5,
                                                    left: 580
                                                }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={handleEdit}>✏️ Cập nhật</MenuItem>
                                                <MenuItem onClick={handleDelete}>🗑️ Xóa</MenuItem>
                                            </Menu>
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
                            </Card>
                        ))}
                    </CardContent>
                )}

                {tab === 1 && <FriendList userId={userId} />}
                {tab === 2 && <FriendRequests userId={userId} />}

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
