import React from 'react';
import BackButton from './BackBtn'; // 경로 확인!

export default function Layout({ children }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <BackButton />
      {children}
    </div>
  );
}
