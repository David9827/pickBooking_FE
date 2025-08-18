import React, { useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    Avatar,
    Divider,
    Button,
    TextField,
} from "@mui/material";
import { Post, User } from "../types";

interface PostListProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    user: User;
}

const PostList: React.FC<PostListProps> = ({ posts, setPosts, user }) => {
    const [commentText, setCommentText] = React.useState<{ [key: number]: string }>({});

    // khi component mount, fetch danh sách bài viết
    useEffect(() => {
        fetch("http://localhost:8080/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data.reverse()))
            .catch((err) => console.error("Lỗi khi tải posts:", err));
    }, [setPosts]);

    // Thả reaction
    const react = (postId: number, type: string) => {
        fetch(
            `http://localhost:8080/api/posts/${postId}/react?userId=${user.userId}&type=${type}`,
            { method: "POST" }
        )
            .then(() =>
                fetch("http://localhost:8080/api/posts")
                    .then((res) => res.json())
                    .then((data) => setPosts(data.reverse()))
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
                    .then((data) => setPosts(data.reverse()))
            );
        setCommentText((prev) => ({ ...prev, [postId]: "" }));
    };

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
                        <Typography variant="body1">{post.content}</Typography>

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
                        <Typography variant="body2" color="textSecondary" style={{ marginTop: "5px" }}>
                            👍❤️😂 {post.reactionCount || 0} · 💬 {post.commentCount || 0}
                        </Typography>

                        {/* Reaction bar */}
                        <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                            {["LIKE", "LOVE", "HAHA", "WOW", "ANGRY"].map((r) => (
                                <Button
                                    key={r}
                                    size="small"
                                    onClick={() => react(post.postId, r)}
                                >
                                    {r}
                                </Button>
                            ))}
                        </div>

                        {/* Comment list */}
                        <div style={{ marginTop: "10px" }}>
                            {(post.comments || []).map((c: any, i: number) => (
                                <Typography key={i} variant="body2">
                                    <b>{c.user?.fullName || c.user?.username}:</b> {c.content}
                                </Typography>
                            ))}
                        </div>

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
