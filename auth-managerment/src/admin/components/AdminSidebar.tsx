import React from "react";
import { Box, List, ListItemButton, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: 250, bgcolor: "background.paper", height: "100vh", boxShadow: 2 }}>
            <List>
                <ListItemButton onClick={() => navigate("/admin")}>
                    <ListItemText primary="📊 Dashboard" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/admin/users")}>
                    <ListItemText primary="👥 Quản lý người dùng" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/admin/courts")}>
                    <ListItemText primary="🏟️ Quản lý sân" />
                </ListItemButton>
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={() => navigate("/")}>
                    <ListItemText primary="⬅️ Quay lại User Site" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default AdminSidebar;
