
import React, { useState, ChangeEvent } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Avatar,
    TextField,
    Typography,
    Divider,
    IconButton
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { User, Post } from "../types";

interface PostFormProps {
    user: User;
    onPostCreated: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ user, onPostCreated }) => {
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async () => {
        if (!content.trim() && !image) return;
        if (imageUrl == "") {
            try {
                let imageUrl = "";
                //  Nếu có ảnh, bạn cần upload ảnh trước
                if (image) {
                    const formData = new FormData();
                    formData.append("file", image);

                    const uploadRes = await fetch("http://localhost:8080/api/uploads", {
                        method: "POST",
                        body: formData,
                    });
                    const data = await uploadRes.json();
                    imageUrl = data.url;

                    if (!uploadRes.ok) throw new Error("Upload ảnh thất bại");
                    imageUrl = await uploadRes.text(); // backend trả về link ảnh
                }
            } catch (err) {
                console.error("Lỗi khi đăng bài:", err);
            }
            //  Gửi bài viết đến backend
            const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: user.userId,
                    content,
                    imageUrl,
                }),
            });
        } else {
            //  Gửi bài viết đến backend
            const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    userId: user.userId,
                    content,
                    imageUrl,
                }),
            });

            if (!response.ok) {
                throw new Error("Không thể đăng bài");
            }

            const newPost: Post = await response.json();

            //Thêm vào danh sách bài viết FE
            onPostCreated(newPost);

            // Reset form
            setContent("");
            setImage(null);
            setPreview(null);
            setImageUrl("");

        };
    }

    return (
        <Card sx={{ mb: 2, boxShadow: 2 }}>
            <CardContent>
                <Box display="flex" alignItems="flex-start" gap={2}>
                    {/* Avatar user */}
                    <Avatar src={user.avatarUrl || ""} alt={user.username}/>

                    <Box flex={1}>
                        {/* Text nhập nội dung */}
                        <TextField
                            multiline
                            fullWidth
                            variant="outlined"
                            placeholder="Bạn đang nghĩ gì thế?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            fullWidth
                            placeholder="Link ảnh (nếu có)"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            style={{ marginTop: "10px" }}
                        />

                        {/* Preview ảnh nếu có */}
                        {preview && (
                            <Box
                                component="img"
                                src={preview}
                                alt="preview"
                                sx={{
                                    width: "100%",
                                    borderRadius: 2,
                                    mb: 1,
                                    maxHeight: 300,
                                    objectFit: "cover"
                                }}
                            />
                        )}

                        <Divider sx={{ mb: 1 }} />

                        {/* Action buttons */}
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <label htmlFor="upload-photo">
                                <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="upload-photo"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Đăng bài
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostForm;
