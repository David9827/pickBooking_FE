import React, {useEffect, useState} from "react";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Card,
    CardContent,
    Typography,
    CardMedia,
    Avatar,
    Divider,
    Button,
    TextField, Box, IconButton,
} from "@mui/material";
import { Post, User, Comment } from "../types";
import {blue} from "@mui/material/colors";

interface PostListProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    user: User;
}

const PostList: React.FC<PostListProps> = ({ posts, setPosts, user }) => {
    const [commentText, setCommentText] = React.useState<{ [key: number]: string }>({});
    const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
    // khi component mount, fetch danh sách bài viết
/*    useEffect(() => {
        fetch("http://localhost:8080/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error("Lỗi khi tải posts:", err));
    }, [setPosts]);
    useEffect(() => {
        posts.forEach((post) => {
            fetch(`http://localhost:8080/api/posts/${post.postId}/comments`)
                .then((res) => res.json())
                .then((data) =>
                    setComments((prev) => ({ ...prev, [post.postId]: data }))
                )
                .catch((err) => console.error("Lỗi load comments:", err));
        });
    }, [posts]);*/
    useEffect(() => {
        const loadComments = async () => {
            const results = await Promise.all(
                posts.map((p) =>
                    fetch(`http://localhost:8080/api/posts/${p.postId}/comments`)
                        .then((res) => res.json())
                        .then((data) => [p.postId, data] as const)
                )
            );
            setComments(Object.fromEntries(results));
        };
        if (posts.length > 0) loadComments();
    }, [posts]);

    // Thả reaction
    const react = (postId: number, type: string) => {
        fetch(
            `http://localhost:8080/api/posts/${postId}/react?userId=${user.userId}&type=${type}`,
            { method: "POST" }
        )
            .then(() =>
                fetch("http://localhost:8080/api/posts")
                    .then((res) => res.json())
                    .then((data) => setPosts(data))
            );
    };

    // Thêm comment
    const addComment = (postId: number) => {
        const text = commentText[postId];
        if (!text || text.trim() === "") return;

        fetch(
            `http://localhost:8080/api/posts/${postId}/comments?userId=${user.userId}&content=${encodeURIComponent(
                text
            )}`,
            { method: "POST" }
        )
            .then(() =>
                fetch("http://localhost:8080/api/posts")
                    .then((res) => res.json())
                    .then((data) => setPosts(data))
            );
        setCommentText((prev) => ({ ...prev, [postId]: "" }));
    };

    function stringToColor(name: string): string {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = "#";
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += ("00" + value.toString(16)).slice(-2);
        }
        return color;
    }

    return (
        <div style={{ maxWidth: 600, margin: "20px auto" }}>
            {posts.map((post) => (
                <Card
                    key={post.postId}
                    style={{ marginBottom: "20px", borderRadius: "10px" }}
                >
                    <CardContent>
                        {/* Header: Avatar + User Info */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Avatar>
                                {(post.user.fullName || post.user.username || "?")
                                    .charAt(0)
                                    .toUpperCase()}
                            </Avatar>
                            <div>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {post.user.fullName || post.user.username}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {new Date(post.createdAt).toLocaleString()}
                                </Typography>
                            </div>
                        </div>

                        <Divider style={{ margin: "10px 0" }} />

                        {/* Nội dung bài viết */}
                        <Typography variant="body1" style={{display: "flex", marginTop: "5px" }}>{post.content }</Typography>

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
                        <Typography variant="body2"
                                    color="textSecondary"
                                    display={"flex"}
                                    style={{ marginTop: "5px" }}
                        >
                            {/* ❤️ {post.reactionCount || 0} · 💬 {post.commentCount || 0}*/}
                            <span style={{ fontSize: "1.15rem" }}>❤️</span> {post.reactionCount || 0}
                            {" · "}
                            <span style={{ fontSize: "1.15rem" }}>💬</span> {post.commentCount || 0}
                        </Typography>

                        {/* Reaction bar */}
                        <div style={{gap: "1px", marginTop: "5px", marginLeft: "1px" }}>
                            {["👍","❤️","😂","😮","😢","😡"].map((r) => (
                                <Button
                                    key={r}
                                    size="small"
                                    onClick={() => react(post.postId, r)}
                                    sx={{ minWidth: 50, padding: "2px 6px" }}
                                >
                                    <span style={{ fontSize: "1.2rem" }}>{r}</span>
                                </Button>
                            ))}
                        </div>


                        <div style={{ marginTop: "10px" }}>
                            {(post.comments || []).map((c: any, i: number) => (
                                <Typography key={i} variant="body2">
                                    <b>{c.user?.fullName || c.user?.username}:</b> {c.content}
                                </Typography>
                            ))}
                        </div>
                        {/* Comment section */}
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle2">💬 Bình luận</Typography>

                        {/* Danh sách comment */}
                        <List>
                            {(comments[post.postId] || []).map((c) => (
                                <ListItem key={c.commentId} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar
                                            src={c.user?.avatarUrl || ""}
                                            sx={{
                                                width: 28,
                                                height: 28,
                                                bgcolor: c.user?.avatarUrl ? "transparent" : stringToColor(c.user?.username || "A"),
                                                color: "white",
                                                //fontWeight: "bold",
                                            }}>
                                            {c.user?.username?.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography variant="subtitle2" fontWeight="bold">
                                                    {c.user?.username || "Ẩn danh"}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(post.createdAt).toLocaleString()}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={<Typography variant="body2">{c.content}</Typography>}
                                    />
                                </ListItem>
                            ))}
                        </List>


                        {/* Comment input */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Viết bình luận..."
                                value={commentText[post.postId] || ""}
                                onChange={(e) =>
                                    setCommentText((prev) => ({
                                        ...prev,
                                        [post.postId]: e.target.value,
                                    }))
                                }
                            />
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => addComment(post.postId)}
                            >
                                Gửi
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default PostList;
