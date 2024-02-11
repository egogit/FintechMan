import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";

import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home notFound = {false}/>}/>
          <Route path="/login" element={<Login/>}/> 
          <Route path="*" element={<Home notFound = {true}/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
