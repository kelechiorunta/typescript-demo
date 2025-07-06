import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import User from './components/User';

const App: React.FC = () => {
  return (
    <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<div className="App">
        <User />
      </div>} />
    </Route>

    <Route path="/login" element={<Login />} />

    </Routes>
  )
}

export default App;
