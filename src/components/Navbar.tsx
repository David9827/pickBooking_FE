import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Box,
    IconButton,
    Avatar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import {Link} from "react-router-dom";

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
        // vertical padding + search icon size
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}));

const Navbar: React.FC = () => {
    return (
        <AppBar position="sticky" color="inherit" elevation={1}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Logo */}
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2C7BE5" }}>
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
                    />
                </Search>

                {/* Menu Icons */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                    <IconButton>
                        <FlashOnIcon />
                    </IconButton>
                    <IconButton>
                        <VideoCallIcon />
                    </IconButton>
                    <IconButton>
                        <AccountCircleIcon />
                    </IconButton>
                </Box>

                {/* Right side */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton >
                    <Avatar alt="User" src="https://i.pravatar.cc/40" component={Link} to="/admin"/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
