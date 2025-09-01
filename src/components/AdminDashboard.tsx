import React, {useEffect, useState} from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import {Court, User} from "../types";



const AdminDashboard: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://localhost:8081/api/admin/users")
            .then((res) => res.json())
            .then((data) => setCourts(data))
            .catch((err) => console.error("Lỗi load users:", err));
    }, []);
    return (
        <Grid container>
            <Grid item md={3}>
                <AdminSidebar />
            </Grid>
            <Grid item md={9} p={3}>
                <Typography variant="h4" gutterBottom>
                    📊 Admin Dashboard
                </Typography>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">👥 Người dùng</Typography>
                            <Typography variant="h4">120</Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">🏟️ Sân</Typography>
                            <Typography variant="h4">12</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AdminDashboard;
