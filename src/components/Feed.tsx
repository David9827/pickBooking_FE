import React from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { User, Post } from "../types";

interface FeedProps {
    user: User;
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    onPostCreated: (post: Post) => void;
}

const Feed: React.FC<FeedProps> = ({ user, posts, setPosts, onPostCreated }) => {
    return (
        <div style={{ flex: 1, maxWidth: "650px", margin: "0 auto" }}>
            <PostForm user={user} onPostCreated={onPostCreated} />
            <PostList posts={posts} setPosts={setPosts} user={user} />
        </div>
    );
};

export default Feed;
