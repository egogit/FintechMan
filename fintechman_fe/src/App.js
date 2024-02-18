import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
