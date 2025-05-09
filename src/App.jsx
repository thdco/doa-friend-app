
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import SignUp from './routes/signUp';
import Home from './routes/home';
import RequestHelpForm from './routes/RequestHelpForm';
import RequestPostList from './routes/RequestPostList'; 
import RequestPost from './routes/RequestPost'; 
import PRO from'./routes/profile';
import Settings from'./routes/settings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/request-help-form" element={<RequestHelpForm />} />
        <Route path="/request-help-list" element={<RequestPostList />} />
        <Route path="/request-post/:id" element={<RequestPost />} />
        <Route path="/profile" element={<PRO />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;