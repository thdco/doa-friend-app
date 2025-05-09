import {useState, React} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './routes/Login';
import SignUp from './routes/signUp';
import Home from './routes/home';
import RequestHelpForm from './routes/RequestHelpForm';
import RequestPostList from './routes/RequestPostList'; 
import RequestPost from './routes/RequestPost';
import ChatRoom from './routes/ChatRoom';
import './CSS/index.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/request-help-form" element={<RequestHelpForm />} />
        <Route path="/request-post-list" element={<RequestPostList />} />
        <Route path="/request-post/:id" element={<RequestPost />} />
        <Route path="/chat/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
