import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'transparent',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      &lt;
    </button>
  );
}
