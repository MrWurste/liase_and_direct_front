import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './content/RequireAuth';
import Register from './user/Register';
import Login from './user/Login';
import Home from './content/Home';
import Layout from './content/Layout';
import Messenger from './content/Messenger';
import Announcements from './content/Announcements';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
            <Route path="messenger" element={<Messenger />} />
            <Route path="announcements" element={<Announcements />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
