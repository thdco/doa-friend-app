import React, { useState } from 'react';
import '../Login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Firebase 설정 import

const Login = () => {
  const [username, setUsername] = useState('');  // 사용자 ID
  const [password, setPassword] = useState('');  // 비밀번호
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMsg('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 1. Firestore에서 입력한 ID와 일치하는 사용자 검색
      const q = query(collection(db, "users"), where("id", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      const userData = querySnapshot.docs[0].data();
      const email = userData.email;

      // 2. 이메일 + 비밀번호로 Firebase Auth 로그인
      await signInWithEmailAndPassword(auth, email, password);

      // 3. 로그인 성공 시 이동
      alert('로그인 성공!');
      setErrorMsg('');
      navigate('/home'); // 홈 화면으로 이동

    } catch (error) {
      setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

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