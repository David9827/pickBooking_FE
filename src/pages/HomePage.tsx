
import React, { useEffect, useState } from "react";
import {Box, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, Divider } from "@mui/material";
import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import AdminSidebar from "../components/AdminSidebar";
import UserTable from "../components/UserTable";
import ListItemButton from "@mui/material/ListItemButton"
import { User, Post } from "../types";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

// Giả lập dữ liệu bạn bè bên phải
const contacts = [
    { id: 1, name: "Hurin Seary", avatar: "https://i.pravatar.cc/150?img=1", status: "online" },
    { id: 2, name: "Victor Erixon", avatar: "https://i.pravatar.cc/150?img=2", status: "online" },
    { id: 3, name: "Surfiza Zakir", avatar: "https://i.pravatar.cc/150?img=3", status: "offline" },
    { id: 4, name: "David Goria", avatar: "https://i.pravatar.cc/150?img=4", status: "offline" },
];

interface HomePageProps {
    user: User;
    onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onLogout }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    // Load bài viết từ backend
    useEffect(() => {
        fetch("http://localhost:8080/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error("Lỗi load posts:", err));
    }, []);
    const handleNewPost = (post: Post) => {
        setPosts([post, ...posts]);
    };

    return (
        <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
            {/* Navbar ngang */}

            <Navbar />
            <Grid container spacing={2} sx={{ marginTop: 2, paddingX: 2 }}>
                {/* Cột trái - Sidebar menu */}
                <Grid item xs={12} md={3}>
                    <Box  sx={{
                        background: "#fff",
                        borderRadius: 2,
                        p: 2,
                        boxShadow: 1,
                        height: "calc(100vh - 80px)", // trừ phần Navbar phía trên
                        overflowY: "auto"
                    }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            New Feeds
                        </Typography>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                    <ListItemText primary="Newsfeed" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                    <ListItemText primary="Badges" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                    <ListItemText primary="Group" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate("/myprofile")}>
                                    <ListItemIcon><HomeIcon /></ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                            </ListItem>

                        </List>
                    </Box>
                </Grid>

                {/* Cột giữa - Bài viết */}
                <Grid item xs={12} md={6}>
                    <Paper style={{
                        padding: 16,
                        textAlign: "center",
                        height: "calc(100vh - 80px)",
                        overflowY: "auto"
                    }}>
                        <PostForm user={user} onPostCreated={handleNewPost} />
                        <PostList posts={posts} setPosts={setPosts} user={user} />
                    </Paper>
                </Grid>

                {/* Cột phải - Contacts */}

                <Grid item xs={12} md={3}>
                    <Paper style={{
                        padding: 16,
                        textAlign: "center",
                        height: "calc(100vh - 80px)",
                        overflowY: "auto"
                    }}>
                    <Box sx={{ background: "#fff", borderRadius: 2, p: 2, boxShadow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Contacts
                        </Typography>
                        <List>
                            {contacts.map((c) => (
                                <ListItem key={c.id}>
                                    <Avatar src={c.avatar} sx={{ marginRight: 1 }} />
                                    <ListItemText
                                        primary={c.name}
                                        secondary={c.status === "online" ? "Online" : "Offline"}
                                        secondaryTypographyProps={{
                                            color: c.status === "online" ? "green" : "gray",
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                            Nhóm chat sẽ đặt ở đây...
                        </Typography>
                    </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;
