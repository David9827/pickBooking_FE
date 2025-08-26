
// User type
export interface User {
    userId: number;
    username: string;
    password?: string; // optional vì không nên lộ trên frontend
    email?: string;
    fullName?: string;
    phone?: string;
    role: "USER" | "ADMIN";
    avatarUrl?: string; // thêm để hiển thị avatar
    createdAt: string;
}

// Comment type
export interface Comment {
    commentId: number;
    content: string;
    createdAt: string;
    user: User;
}

// Reaction type
export interface Reaction {
    reactionId: number;
    type: "LIKE" | "LOVE" | "HAHA" | "WOW" | "ANGRY";
    user: User;
}

// Post type
export interface Post {
    postId: number;
    content: string;
    imageUrl?: string;
    image_Url?: string;
    createdAt: string;
    updatedAt?: string;
    user: User;

    // Thống kê
    reactionCount: number;
    commentCount: number;

    // Chi tiết (nếu cần)
    comments: Comment[];
    reactions?: Reaction[];
}
export interface Court {
    courtId: number;
    courtName: string;
    status: string;
    location: string;

}
