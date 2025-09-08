import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    InputBase,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    IconButton, alpha
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { User, Post } from "../types";
import HomeIcon from "@mui/icons-material/Home";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import {Link, useNavigate} from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    maxWidth: 400,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}));

const Navbar: React.FC = () => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState<{ users: User[]; posts: Post[] }>({
        users: [],
        posts: [],
    });
    const navigate = useNavigate();

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && keyword.trim() !== "") {
            const res = await fetch(
                `http://localhost:8080/api/search?keyword=${keyword}`
            );
            const data = await res.json();
            setResults(data);
        }
    };

    // @ts-ignore
    return (
        <AppBar position="sticky" color="inherit" elevation={1}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Logo */}
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#2C7BE5" }}
                    onClick={() => navigate("/")}
                >
                    PICKBooking
                </Typography>

                {/* Search Bar */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm..."
                            inputProps={{ "aria-label": "search" }}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </Search>

                    {/* Kết quả hiển thị ngay dưới search */}
                    {keyword && (results.users.length > 0 || results.posts.length > 0) && (
                        <Paper
                            sx={{
                                position: "absolute",
                                top: 60,
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 400,
                                maxHeight: 400,
                                overflowY: "auto",
                                zIndex: 999,
                                p: 1,
                            }}
                        >
                            {/* Users */}
                            {results.users.length > 0 && (
                                <>
                                    <Typography variant="subtitle1">👥 Người dùng</Typography>
                                    <List>
                                        {results.users.map((u) => (
                                            <ListItem
                                                  key={u.userId}
                                                  button
                                                  onClick={() => navigate(`/profile/${u.userId}`)}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar src={u.avatarUrl || ""}>
                                                        {!u.avatarUrl &&
                                                            u.username.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={u.fullName || u.username}
                                                    secondary={u.email}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Divider />
                                </>
                            )}

                            {/* Posts */}
                            {results.posts.length > 0 && (
                                <>
                                    <Typography variant="subtitle1">📝 Bài viết</Typography>
                                    <List>
                                        {results.posts.map((p) => (
                                            <ListItem key={p.postId}>
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
                        </Paper>
                    )}
                    {/* Menu Icons */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <IconButton component={Link} to="/"
                                    sx={{
                                        "&:hover": {
                                            transform: "scale(1.1)",  // hiệu ứng phóng to nhẹ khi hover
                                        },
                                        borderRadius: 2,            // bo tròn góc (mặc định là tròn 50%)
                                        padding: "10px"
                                    }}
                        >
                            <HomeIcon />
                        </IconButton>
                        <IconButton>
                            <FlashOnIcon />
                        </IconButton>
                        <IconButton>
                            <VideoCallIcon />
                        </IconButton>
                        <IconButton component={Link} to="/admin"
                                    sx={{
                                        "&:hover": {
                                            transform: "scale(1.1)",  // hiệu ứng phóng to nhẹ khi hover
                                        },
                                        borderRadius: 2,            // bo tròn góc (mặc định là tròn 50%)
                                        padding: "10px"
                                    }}
                        >
                            <AccountCircleIcon/>
                        </IconButton>
                    </Box>

                    {/* Right side */}
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <IconButton sx={{
                            "&:hover": {
                                transform: "scale(1.1)",  // hiệu ứng phóng to nhẹ khi hover
                            },
                            borderRadius: 2,            // bo tròn góc (mặc định là tròn 50%)
                            padding: "10px"
                        }}>
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton sx={{
                            "&:hover": {
                                transform: "scale(1.1)",  // hiệu ứng phóng to nhẹ khi hover
                            },
                            borderRadius: 2,            // bo tròn góc (mặc định là tròn 50%)
                            padding: "10px"
                        }}>
                            <SettingsIcon />
                        </IconButton >
                        <Avatar sx={{
                            "&:hover": {
                                transform: "scale(1.1)",  // hiệu ứng phóng to nhẹ khi hover
                            },
                        }} alt="User" src="https://i.pravatar.cc/40" component={Link} to="/myprofile"/>
                    </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
