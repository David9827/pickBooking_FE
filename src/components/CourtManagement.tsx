import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, Stack, Table, TableRow, TableHead, TableCell, TableBody } from "@mui/material";

interface Court {
    courtId: number;
    name: string;
    location: string;
    available: boolean;
    court_number: number;
}

const CourtManagement: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);

    useEffect(() => {
        fetch("http://localhost:8081/api/admin/courts")
            .then((res) => res.json())
            .then((data) => setCourts(data))
            .catch((err) => console.error("Lỗi load courts:", err));
    }, []);

    return (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
                Quản lý sân
            </Typography>
            <Stack direction="row" spacing={2} marginBottom={2}>
                <Button variant="contained" color="primary">
                    Thêm sân mới
                </Button>
            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tên sân</TableCell>
                        <TableCell>Địa điểm</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Số sân</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courts.map((court) => (
                        <TableRow key={court.courtId}>
                            <TableCell>{court.courtId}</TableCell>
                            <TableCell>{court.name}</TableCell>
                            <TableCell>{court.location}</TableCell>
                            <TableCell>{court.available ? "Còn trống" : "Đang đặt"}</TableCell>
                            <TableCell>{court.court_number}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CourtManagement;
