import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import { User, Post } from "../types";

interface PostFormProps {
    user: User;
    onPostCreated: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ user, onPostCreated }) => {
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.userId,
                content,
                imageUrl,
            }),
        })
            .then((res) => res.json())
            .then((newPost) => {
                onPostCreated(newPost);
                setContent("");
                setImageUrl("");
            });
    };

    return (
        <Card style={{ marginBottom: "20px" }}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Bạn đang nghĩ gì?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        placeholder="Link ảnh (nếu có)"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        style={{ marginTop: "10px" }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "10px" }}
                    >
                        Đăng bài
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default PostForm;
