import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false); // 로그인 성공 상태
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMsg('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true); // ✅ 로그인 상태 true
      setSuccess(true); // ✅ 이동 트리거용 상태 변경
      setErrorMsg('');
      alert('로그인 성공!');
    } else {
      setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  useEffect(() => {
    if (success) {
      navigate('/'); // ✅ 로그인 성공하면 홈으로 이동
    }
  }, [success, navigate]);

  return (
    <div className="login-box">
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn_login" onClick={handleLogin}>
        로그인
      </button>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h5>계정이 없으신가요?</h5>
        <p style={{ marginLeft: '6px' }}>
          <a href="/signup">회원가입하러가기</a>
        </p>
      </div>
      <div className="error">{errorMsg}</div>
    </div>
  );
};

export default Login;
