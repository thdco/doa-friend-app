import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
import Home from './components/Home';
import RequestHelpForm from './components/RequestHelpForm';
import RequestPostList from './components/RequestPostList'; 

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
