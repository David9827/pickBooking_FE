import commentList from "./components/CommentList";

export interface User {
    userId: number;
    username: string;
    fullName?: string;
    email?: string;
    role?: string;
}

export interface Post {
    postId: number;
    user: User;
    content: string;
    imageUrl?: string;
    createdAt: string;
    reactionCount: number;
    commentCount: number;
    comments: undefined;
}


export interface Post {
    postId: number;
    content: string;
    imageUrl?: string;
    createdAt: string;
    user: User;
}
