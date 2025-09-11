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
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4B77D1"><path d="M480-600 340-740l140-140 140 140-140 140ZM40-160v-160q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v160H640v-91q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v92H40Zm120-280q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440Z"/></svg> Lời mời kết bạn
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
                            primary={req.sender.fullName}
                            secondary={req.sender.email}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAccept(req.id)}
                            sx={{ mr: 1 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg> Chấp nhận
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
