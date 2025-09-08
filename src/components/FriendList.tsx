import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from "@mui/material";
import { User } from "../types";

interface FriendListProps {
    userId: number; // user hiện tại
}

const FriendList: React.FC<FriendListProps> = ({ userId }) => {
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8082/api/friends/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setFriends(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi load friends:", err);
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {friends.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    Bạn chưa có bạn bè nào
                </Typography>
            ) : (
                friends.map((friend) => (
                    <Card key={friend.userId} sx={{ mb: 2 }}>
                        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar src={friend.avatarUrl || ""}>
                                {!friend.avatarUrl ? friend.username.charAt(0).toUpperCase() : ""}
                            </Avatar>
                            <Box>
                                <Typography fontWeight="bold">
                                    {friend.fullName || friend.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    📧 {friend.email}
                                </Typography>
                            </Box>

                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default FriendList;
