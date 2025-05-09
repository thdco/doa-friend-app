import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../CSS/RequestHelpForm.css";
import Layout from "../components/Layout"; // ✅ 추가

export default function RequestHelpForm() {
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    reward: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate(`/login`);
      return;
    }

    const docRef = await addDoc(collection(db, "requests"), {
      ...formData,
      userId: user.uid,
      createdAt: Timestamp.now()
    });

    navigate(`/post/${docRef.id}`);
  };

  return (
    <Layout> {/* ✅ 여기 감싸줍니다 */}
      <div className="form-wrapper">
        <form className="request-form" onSubmit={handleSubmit}>
          <h2>도움 요청 작성</h2>
          <input
            name="title"
            placeholder="제목"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="detail"
            placeholder="요청 내용"
            value={formData.detail}
            onChange={handleChange}
            required
          />
          <input
            name="reward"
            placeholder="보상 (선택사항)"
            value={formData.reward}
            onChange={handleChange}
          />
          <button type="submit">요청 제출</button>
        </form>
      </div>
    </Layout>
  );
}
