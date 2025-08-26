import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from "@mui/material";

interface User {
    userId: number;
    username: string;
    email: string;
    role: string;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Lỗi load users:", err));
    }, []);

    return (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
                Danh sách người dùng
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.userId}>
                            <TableCell>{user.userId}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default UserTable;
