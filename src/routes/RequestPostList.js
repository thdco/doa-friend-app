import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../CSS/RequestPostList.css";
import Layout from "../components/Layout"; // ✅ 추가

export default function RequestPostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "requests"));

      const postList = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();

          let name = "이름 없음";
          if (data.userId) {
            const userRef = doc(db, "users", data.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              name = userSnap.data().name || "이름 없음";
            }
          }

          return {
            id: docSnap.id,
            name,
            request: data.request || data.detail || "내용 없음",
            title: data.title || "제목 없음",
            createdAt: data.createdAt?.toDate().toLocaleString() || "날짜 없음"
          };
        })
      );

      setPosts(postList);
    };

    fetchPosts();
  }, []);

  return (
    <Layout> {/* ✅ Layout으로 감싸기 */}
      <div className="post-list-wrapper">
        <h2>📝 도움 요청 목록</h2>

        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
            현재 도움을 요청하는 이웃이 없어요 😢
          </p>
        ) : (
          <div className="post-card-container">
            {posts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-meta">👤 {post.name} | 🕒 {post.createdAt}</p>
                <p className="post-snippet">{post.request.slice(0, 50)}...</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
