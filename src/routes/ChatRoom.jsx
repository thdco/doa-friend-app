import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

export default function ChatRoom() {
  const { id: chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const scrollRef = useRef();

  useEffect(() => {
    const msgRef = collection(db, "chats", chatId, "messages");
    const q = query(msgRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: auth.currentUser.uid,
      content: input,
      createdAt: new Date(),
    });
    setInput("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>← 나가기</button>
      <h2>요청자와의 채팅</h2>
      <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "8px" }}>
            <strong>{msg.senderId === auth.currentUser.uid ? "나" : "상대"}:</strong> {msg.content}
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          style={{ flex: 1, padding: "8px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSend}>보내기</button>
      </div>
    </div>
  );
}
