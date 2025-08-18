import React, {useEffect, useState} from "react";

interface Comment {
    id: number;
    user: string;
    content: string;
}

const CommentList: React.FC<{ postId: number; userId: number }> = ({ postId, userId }) => {
    const [comments, setComments] = useState<any[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/api/posts/${postId}/comments`)
            .then(res => res.json())
            .then(data => setComments(data));
    }, [postId]);

    const addComment = () => {
        fetch(`http://localhost:8080/api/posts/${postId}/comments?userId=${userId}&content=${encodeURIComponent(text)}`, {
            method: "POST"
        })
            .then(res => res.json())
            .then(c => setComments([...comments, c]));
        setText("");
    };

    return (
        <div>
            {comments.map((c, i) => (
                <p key={i}><b>{c.user.fullName || c.user.username}:</b> {c.content}</p>
            ))}
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Viết bình luận..." />
            <button onClick={addComment}>Gửi</button>
        </div>
    );
};

export default CommentList;
