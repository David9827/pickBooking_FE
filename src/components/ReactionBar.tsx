import React, { useState } from "react";
import { IconButton } from "@mui/material";

const reactions = ["👍", "❤️", "😂", "😮", "😡"];

interface ReactionBarProps {
    onReact: (reaction: string) => void;
}

const ReactionBar: React.FC<{ postId: number; userId: number }> = ({ postId, userId }) => {
    const reactions = ["LIKE", "LOVE", "HAHA", "WOW", "ANGRY"];

    const react = (type: string) => {
        fetch(`http://localhost:8080/api/posts/${postId}/react?userId=${userId}&type=${type}`, {
            method: "POST"
        }).then(() => console.log("Reacted:", type));
    };

    return (
        <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
            {reactions.map(r => (
                <button key={r} onClick={() => react(r)}>{r}</button>
            ))}
        </div>
    );
};

export default ReactionBar;
