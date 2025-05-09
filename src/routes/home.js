import './home.css';
import puppy from '../PNG/puppy.PNG';
import siren from '../PNG/siren.PNG';
import lightSiren from '../PNG/light_siren.PNG';
import me from '../PNG/Me.PNG';
import community from '../PNG/Community.PNG';
import set from '../PNG/set.PNG';

import { useState } from 'react';

function Home() {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="App">
      <div className="header">
        <h1>Help PUPPY</h1>
        <img src={puppy} alt="앱 로고" className="logo" />
      </div>

      <div className="container">
        <button
          className="big-button"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            src={isHover ? lightSiren : siren}
            alt="사이렌"
            className="icon-toggle"
          />
          <span className="btn-label">도움 요청</span>
        </button>

        <div className="right-side">
          <div className="top-row">
            <button className="button-square">
              <img src={me} alt="내정보" className="icon-toggle" />
              <span className="btn-label">내 정보</span>
            </button>
            <button className="button-square">
              <img src={community} alt="커뮤니티" className="icon-toggle" />
              <span className="btn-label">커뮤니티</span>
            </button>
          </div>
          <button className="button-square">
            <img src={set} alt="설정" className="icon-toggle" />
            <span className="btn-label">설정</span>
          </button>
        </div>
      </div>

      <div className="notice-box">
        <h2>📢 공지사항</h2>
        <p>
          오늘 오후 3시에 시스템 점검이 예정되어 있습니다.
          <br />
          점검 시간 동안 일부 기능이 제한될 수 있습니다.
        </p>
      </div>

      <div className="review-section">
        <h2>💬 도우미 후기</h2>
        <div className="reviews">
          <div className="review-card">
            <h3>김도우미</h3>
            <p>
              정말 친절하고 도움이 많이 되었어요! 다음에도 꼭 다시 이용하고
              싶습니다.
            </p>
          </div>
          <div className="review-card">
            <h3>박도우미</h3>
            <p>시간 약속을 잘 지키고 일도 꼼꼼하게 해주셔서 감사했어요.</p>
          </div>
          <div className="review-card">
            <h3>이도우미</h3>
            <p>처음 이용해봤는데 만족도 최고! 다음에도 꼭 부탁드릴게요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
