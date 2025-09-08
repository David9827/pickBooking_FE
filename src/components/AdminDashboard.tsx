import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { Court, User } from "../types";

const AdminDashboard: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: kiểm tra lại port (8080 hay 8081) cho đúng backend của bạn
        const USERS_API = "http://localhost:8081/api/admin/users";
        const COURTS_API = "http://localhost:8081/api/admin/courts";

        Promise.all([
            fetch(USERS_API).then((r) => r.json()),
            fetch(COURTS_API).then((r) => r.json()),
        ])
            .then(([usersData, courtsData]) => {
                setUsers(usersData || []);
                setCourts(courtsData || []);
            })
            .catch((err) => console.error("Lỗi load dashboard:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} md={3}>
                <AdminSidebar />
            </Grid>

            <Grid item xs={12} md={9} p={3}>
                <Typography variant="h4" gutterBottom>
                    📊 Admin Dashboard
                </Typography>

                <Box sx={{ maxWidth: 600, mx: "auto", mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6">👥 Người dùng</Typography>
                                <Typography variant="h4">
                                    {loading ? "…" : users.length}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6">🏟️ Sân</Typography>
                                <Typography variant="h4">
                                    {loading ? "…" : courts.length}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AdminDashboard;
