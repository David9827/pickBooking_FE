import React, { useEffect, useState } from "react";
import {
    Paper,
    Typography,
    Button,
    Stack,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    IconButton, Menu, MenuItem
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Court {
    courtId: number;
    name: string;
    location: string;
    available: boolean;
    court_number: number;
}

const CourtManagement: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (
        event: React.MouseEvent<HTMLButtonElement>,
        court: Court
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedCourt(court);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCourt(null);
    };

    const deleteHandle = async () => {
        if (!selectedCourt) return;
        await fetch(`http://localhost:8081/api/admin/courts/${selectedCourt.courtId}`, {
            method: "DELETE"
        });
        setCourts(courts.filter((p) => p.courtId !== selectedCourt.courtId));
    };
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
                            <IconButton onClick={(e) => handleMenuOpen(e, court)}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={deleteHandle}>🗑️ Xóa</MenuItem>
                            </Menu>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CourtManagement;
