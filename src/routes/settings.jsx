import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../settings.css';

function Settings({ setIsLoggedIn }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  return (
    <div className="settings-page">
      <h2>설정</h2>

      <div className="setting-item">
        <label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={toggleNotifications}
          />
          알림 설정 (체크 시 소리 재생)
        </label>
      </div>

      <div className="setting-item">
        <button>차단한 사용자 관리</button>
      </div>

      <div className="setting-item">
        <button>언어 설정</button>
      </div>

      <div className="setting-item">
        <a href="/">
          <button className="logout-button">로그아웃</button>
        </a>
      </div>
    </div>
  );
}

export default Settings;
