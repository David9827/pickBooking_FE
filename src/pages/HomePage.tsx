import React, { useState } from "react";
import { Tabs, Tab, Typography, Button } from "@mui/material";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { User, Post } from "../types";

interface HomePageProps {
    user: User;
    onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onLogout }) => {
    const [tab, setTab] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);

    // khi đăng bài thành công, thêm bài mới vào đầu danh sách
    const handleNewPost = (post: Post) => {
        setPosts([post, ...posts]);
    };

    return (
        <div style={{ background: "#f4f6f8", minHeight: "100vh", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4">🎾 PICKBooking</Typography>
                <Button variant="outlined" color="error" onClick={onLogout}>
                    Đăng xuất
                </Button>
            </div>

            <Tabs value={tab} onChange={(_, v) => setTab(v)} style={{ marginTop: "20px" }}>
                <Tab label="Bài viết" />
                <Tab label="Đặt sân" />
            </Tabs>

            {tab === 0 && (
                <>
                    <PostForm user={user} onPostCreated={handleNewPost} />
                    <PostList posts={posts} setPosts={setPosts} user={user} />
                </>
            )}

            {tab === 1 && (
                <div style={{ marginTop: "20px" }}>
                    <Typography variant="h6">📅 Chức năng đặt sân</Typography>
                    <p>Trang này sẽ hiển thị sơ đồ sân, chọn sân, đặt lịch...</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;
