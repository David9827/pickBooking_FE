import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
    CircularProgress,
} from "@mui/material";
import { User } from "../types";

interface Friendship {
    id: number;
    sender: User;
    receiver: User;
    status: string; // PENDING, ACCEPTED
}

interface FriendRequestsProps {
    userId: number; // ID user hiện tại
}

const FriendRequests: React.FC<FriendRequestsProps> = ({ userId }) => {
    const [requests, setRequests] = useState<Friendship[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8082/api/friends/${userId}/requests`)
            .then((res) => res.json())
            .then((data) => {
                setRequests(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi load requests:", err);
                setLoading(false);
            });
    }, [userId]);

    // Chấp nhận lời mời
    const handleAccept = async (friendshipId: number) => {
        await fetch(`http://localhost:8082/api/friends/${friendshipId}/accept`, {
            method: "POST",
        });
        setRequests(requests.filter((r) => r.id !== friendshipId));
    };

    // Từ chối lời mời
    const handleReject = async (friendshipId: number) => {
        await fetch(`http://localhost:8082/api/friends/${friendshipId}/reject`, {
            method: "POST",
        });
        setRequests(requests.filter((r) => r.id !== friendshipId));
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                📩 Lời mời kết bạn
            </Typography>
            <List>
                {requests.length === 0 && (
                    <Typography color="text.secondary">Không có lời mời nào</Typography>
                )}
                {requests.map((req) => (
                    <ListItem key={req.id}>
                        <ListItemAvatar>
                            <Avatar src={req.sender.avatarUrl || ""}>
                                {req.sender.username.charAt(0).toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={req.sender.username}
                            secondary={req.sender.email}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAccept(req.id)}
                            sx={{ mr: 1 }}
                        >
                            Chấp nhận
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleReject(req.id)}
                        >
                            Từ chối
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default FriendRequests;
