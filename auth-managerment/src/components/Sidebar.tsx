import React from "react";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Toolbar,
    Divider,
    Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export interface MenuItem {
    label: string;
    icon: JSX.Element; // dùng JSX.Element thay vì ReactNode để tránh lỗi
    path: string;
}

interface SidebarProps {
    items: MenuItem[];
    title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ items, title }) => {
    const location = useLocation();

    return (
        <Box
            sx={{
                width: 240,
                bgcolor: "white",
                borderRight: "1px solid #eee",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
                    {title || "Admin Panel"}
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {items.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItemButton
                            key={index}
                            component={Link}
                            to={item.path}
                            sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                bgcolor: isActive ? "primary.main" : "transparent",
                                color: isActive ? "white" : "text.primary",
                                "&:hover": {
                                    bgcolor: isActive ? "primary.dark" : "grey.100",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: isActive ? "white" : "text.secondary",
                                    minWidth: 40,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );
};

export default Sidebar;
