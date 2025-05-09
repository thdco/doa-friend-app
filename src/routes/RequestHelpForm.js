import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
      return;
    }

    const docRef = await addDoc(collection(db, "requests"), {
      ...formData,
      userId: user.uid,
      createdAt: Timestamp.now()
    });

    // 제출 후 해당 요청 상세 페이지로 이동
    navigate(`/post/${docRef.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}