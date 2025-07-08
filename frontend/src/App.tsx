import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import User from './components/User';
import VisitorClient from './components/VisitorClient';

const App: React.FC = () => {
  return (
    <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<div className="App">
          {/* <User /> */}
          <VisitorClient/>
      </div>} />
    </Route>

    <Route path="/login" element={<Login />} />

    </Routes>
  )
}

export default App;
