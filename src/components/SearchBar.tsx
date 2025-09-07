import React, { useState } from "react";
import {
    InputBase,
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { Post, User } from "../types";

const SearchBar: React.FC = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState<{ users: User[]; posts: Post[] }>({
        users: [],
        posts: [],
    });

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && keyword.trim() !== "") {
            const res = await fetch(`http://localhost:8080/api/search?keyword=${keyword}`);
            const data = await res.json();
            setResults(data);
        }
    };

    return (
        <Box sx={{ width: "100%", mb: 2 }}>
            {/* Ô tìm kiếm */}
            <Paper
                sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    boxShadow: 2,
                }}
            >
                <SearchIcon color="action" />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm user, bài viết..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </Paper>

            {/* Kết quả */}
            <Box mt={2}>
                {/* Danh sách người dùng */}
                {results.users.length > 0 && (
                    <>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                            👥 Người dùng
                        </Typography>
                        <List>
                            {results.users.map((u) => (
                                <ListItem key={u.userId} button>
                                    <ListItemAvatar>
                                        <Avatar src={u.avatarUrl || ""}>
                                            {!u.avatarUrl && u.username.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={u.fullName || u.username}
                                        secondary={u.email}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                    </>
                )}

                {/* Danh sách bài viết */}
                {results.posts.length > 0 && (
                    <>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                            📝 Bài viết
                        </Typography>
                        <List>
                            {results.posts.map((p) => (
                                <ListItem key={p.postId} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar src={p.user?.avatarUrl || ""}>
                                            {(!p.user?.avatarUrl && p.user?.username) &&
                                                p.user.username.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={p.user?.fullName || p.user?.username}
                                        secondary={p.content}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default SearchBar;
