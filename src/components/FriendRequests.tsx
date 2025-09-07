import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Divider,
} from "@mui/material";
import { User } from "../types";

interface FriendRequestsProps {
    userId: number; // user hiện tại
}

const FriendRequests: React.FC<FriendRequestsProps> = ({ userId }) => {
    const [requests, setRequests] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8082/api/friends/requests/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setRequests(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi load friend requests:", err);
                setLoading(false);
            });
    }, [userId]);

    const handleAccept = async (senderId: number) => {
        await fetch(
            `http://localhost:8082/api/friends/respond?senderId=${senderId}&receiverId=${userId}&accept=true`,
            { method: "POST" }
        );
        setRequests(requests.filter((r) => r.userId !== senderId));
    };

    const handleReject = async (senderId: number) => {
        await fetch(
            `http://localhost:8082/api/friends/respond?senderId=${senderId}&receiverId=${userId}&accept=false`,
            { method: "POST" }
        );
        setRequests(requests.filter((r) => r.userId !== senderId));
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {requests.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    Không có lời mời kết bạn nào
                </Typography>
            ) : (
                requests.map((req) => (
                    <Card key={req.userId} sx={{ mb: 2 }}>
                        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar src={req.avatarUrl || ""}>
                                {!req.avatarUrl ? req.username.charAt(0).toUpperCase() : ""}
                            </Avatar>
                            <Box flex={1}>
                                <Typography fontWeight="bold">
                                    {req.fullName || req.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    📧 {req.email}
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => handleAccept(req.userId)}
                            >
                                Chấp nhận
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleReject(req.userId)}
                            >
                                Từ chối
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default FriendRequests;
