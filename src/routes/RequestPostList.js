import React, { useEffect, useState } from "react";
import { analytics, db} from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function RequestPostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
        const snapshot = await getDocs(collection(db, "requests"));
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>도움 요청 목록</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                    <Link to={`/post/${post.id}`}>
                    <strong>{post.name}</strong>: {post.request.slice(0, 20)}...
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}
