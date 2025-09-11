// src/components/FriendList.tsx
import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import { User } from "../types";

interface FriendListProps {
    userId: number; // user hiện tại
}

interface Friendship {
    id: number;
    sender: User;
    receiver: User;
    status: "PENDING" | "ACCEPTED";
}

const FriendList: React.FC<FriendListProps> = ({ userId }) => {
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        fetch(`http://localhost:8082/api/friends/${userId}`)
            .then((res) => res.json())
            .then((data: Friendship[]) => {
                if (!mounted) return;

                const accepted = Array.isArray(data)
                    ? data.filter((f) => f?.status === "ACCEPTED")
                    : [];

                // Lấy "đầu kia" của quan hệ bạn bè
                const list = accepted
                    .map((f) => (f.sender?.userId === userId ? f.receiver : f.sender))
                    .filter(Boolean) as User[];

                setFriends(list);
            })
            .catch((err) => {
                console.error("Lỗi load friends:", err);
                setFriends([]);
            })
            .finally(() => mounted && setLoading(false));

        return () => {
            mounted = false;
        };
    }, [userId]);

    // Tên hiển thị an toàn
    const displayName = (u: User) =>
        (u?.fullName && u.fullName.trim().length > 0
            ? u.fullName
            : u?.username) || "Người dùng";

    // Lấy chữ cái đầu an toàn (không còn lỗi charAt)
    const firstLetter = (u: User) => displayName(u).charAt(0).toUpperCase();

    if (loading) {
        return (
            <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Bạn bè
                </Typography>

                {friends.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        Chưa có bạn bè được chấp nhận.
                    </Typography>
                ) : (
                    <List dense>
                        {friends.map((f) => (
                            <ListItem key={f.userId}>
                                <ListItemAvatar>
                                    <Avatar>{firstLetter(f)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={displayName(f)}
                                    secondary={f?.email || ""}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default FriendList;
