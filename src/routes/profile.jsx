import React, { useState } from 'react';
import '../CSS/profile.css';

const PRO = () => {
    // 임시 사용자 데이터 (나중에 props나 API 연결로 교체 가능)
  const userInfo = {
    name: '홍길동',
    phone: '010-1234-5678',
    address: '서울특별시 강남구',
    email: 'hong@example.com',
    username: 'honggildong'
  };
    return (
        <div className="wrapper">
            <h2 className="title">프로필 정보</h2>
            <div className="profile-box">
                <div className="profile-item">
                    <label>이름</label>
                    <p>{userInfo.name}</p>
                </div>
                <div className="profile-item">
                    <label>전화번호</label>
                    <p>{userInfo.phone}</p>
                </div>
                <div className="profile-item">
                    <label>동네</label>
                    <p>{userInfo.address}</p>
                </div>
                <div className="profile-item">
                    <label>이메일</label>
                    <p>{userInfo.email}</p>
                </div>
                <div className="profile-item">
                    <label>아이디</label>
                    <p>{userInfo.username}</p>
                </div>

                <div className="btn_area">
                    <button type="button" className="btn_type">수정하기</button>
                </div>
            </div>
        </div>
    );
};

export default PRO;