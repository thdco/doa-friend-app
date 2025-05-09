import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import Layout from '../components/Layout'; // ✅ 레이아웃 import

export default function RequestPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [userName, setUserName] = useState('불러오는 중...');

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(db, 'requests', id);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const postData = postSnap.data();
        setPost(postData);

        const userRef = doc(db, 'users', postData.userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserName(userSnap.data().name);
        } else {
          setUserName('알 수 없음');
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleHelpClick = async () => {
    const currentUser = auth.currentUser;
    const chatId = [currentUser.uid, post.userId].sort().join("_");

    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [currentUser.uid, post.userId],
        createdAt: Timestamp.now(),
      });
    }

    navigate(`/chat/${chatId}`);
  };

  if (!post) return <p>로딩 중...</p>;

  return (
    <Layout> {/* ✅ Layout으로 감싸기 */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>{post.title}</h2>
        <p><strong>작성자:</strong> {userName}</p>
        <p><strong>등록일:</strong> {post.createdAt.toDate().toLocaleString()}</p>
        <hr />
        <p><strong>요청 내용:</strong><br />{post.detail}</p>
        <p><strong>보상:</strong> {post.reward ? post.reward : '없음'}</p>
        <button onClick={handleHelpClick}>도움 주기</button>
      </div>
    </Layout>
  );
}
