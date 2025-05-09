// components/RequestForm.js
import React, { useState } from 'react';

export default function RequestForm({ onSubmit }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSubmit(text); // 상위로 전달
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <textarea
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="요청사항을 입력하세요"
                className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 rounded">
                제출하기
            </button>
        </form>
    );
}
