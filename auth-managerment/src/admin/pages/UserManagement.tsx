import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import AdminSidebar from "../components/AdminSidebar";
import { AdminUser } from "../types/adminTypes";

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/users") // BE sẽ viết sau
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Lỗi load users:", err));
    }, []);

    return (
        <Box display="flex">
            <AdminSidebar />
            <Box flexGrow={1} p={3}>
                <Typography variant="h4" gutterBottom>
                    👥 Quản lý người dùng
                </Typography>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell>{u.id}</TableCell>
                                    <TableCell>{u.username}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>{u.role}</TableCell>
                                    <TableCell>
                                        <Button size="small" color="primary">Sửa</Button>
                                        <Button size="small" color="error">Xóa</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Box>
    );
};

export default UserManagement;
