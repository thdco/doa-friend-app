import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../signUp.css';

const SignUp = () => {
  const [form, setForm] = useState({
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    phoneNum: '',
    email: '',
    emailDomain: '',
    consent: '',
  });

  const [errors, setErrors] = useState({});

  const emailDomains = [
    'naver.com',
    'gmail.com',
    'daum.net',
    'hanmail.net',
    'hotmail.com',
    'nate.com',
    'yahoo.co.kr',
    'empas.com',
    'freechal.com',
    'lycos.co.kr',
    'korea.com',
    'hanmir.com',
    'dreamwiz.com',
    'paran.com',
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9-_]{5,20}$/.test(form.id)) {
      newErrors.id =
        '5~20자의 영문 소대문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.';
    }

    if (!/^[a-zA-Z0-9~!@#$%^&*()_-]{10,20}$/.test(form.pw)) {
      newErrors.pw =
        '10~20자의 영문 소대문자, 숫자와 특수기호만 사용 가능합니다.';
    }

    if (form.pw !== form.pwCheck) {
      newErrors.pwCheck = '비밀번호가 일치하지 않습니다.';
    }

    if (!form.name) {
      newErrors.name = '성명을 입력해주세요.';
    }

    if (!/^01[016789][0-9]{7,8}$/.test(form.phoneNum)) {
      newErrors.phoneNum = '휴대폰 번호 형식이 올바르지 않습니다.';
    }

    if (!/^[0-9a-zA-Z-_.]+$/.test(form.email)) {
      newErrors.email = '이메일 형식이 올바르지 않습니다.';
    }

    if (!form.consent) {
      newErrors.consent = '개인정보 수집에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🔥 submit 눌림');

    if (!validate()) {
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } else {
      console.log('❌ 유효성 검사 실패');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <header>
          <h1>
            <img src="/image/main.png" alt="도와친구 회원가입" />
            <p>도와친구의 멤버가 되어주세요!!</p>
          </h1>
        </header>

        <h3 className="list">
          아이디<span className="required">*</span>
          <span>{errors.id}</span>
        </h3>
        <input type="text" id="id" value={form.id} onChange={handleChange} />

        <h3 className="list">
          비밀번호<span className="required">*</span>
          <span>{errors.pw}</span>
        </h3>
        <input
          type="password"
          id="pw"
          value={form.pw}
          onChange={handleChange}
        />

        <h3 className="list">
          비밀번호 재확인<span className="required">*</span>
          <span>{errors.pwCheck}</span>
        </h3>
        <input
          type="password"
          id="pwCheck"
          value={form.pwCheck}
          onChange={handleChange}
        />

        <h3 className="list">
          성명<span className="required">*</span>
          <span>{errors.name}</span>
        </h3>
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={handleChange}
        />

        <h3 className="list">
          전화번호("-" 제외)<span className="required">*</span>
          <span>{errors.phoneNum}</span>
        </h3>
        <input
          type="text"
          id="phoneNum"
          value={form.phoneNum}
          onChange={handleChange}
        />

        <h3 className="list">
          이메일<span>{errors.email}</span>
        </h3>
        <div className="emailInt">
          <input
            type="text"
            id="email"
            value={form.email}
            onChange={handleChange}
          />
          <span>@</span>
          <select
            id="emailDomain"
            onChange={(e) => setForm({ ...form, emailDomain: e.target.value })}
          >
            <option>이메일 선택</option>
            {emailDomains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        <h3 className="list">
          개인정보 수집/이용동의<span>{errors.consent}</span>
        </h3>
        <label className="select">
          <input
            type="radio"
            name="consent"
            value="동의"
            onChange={() => setForm({ ...form, consent: '동의' })}
          />
          동의
        </label>
        <label className="select">
          <input
            type="radio"
            name="consent"
            value="비동의"
            onChange={() => setForm({ ...form, consent: '' })}
          />
          비동의
        </label>

        <div className="btn_area">
          <button type="submit" className="btn_type">
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
