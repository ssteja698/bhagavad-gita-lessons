import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Completed from './pages/Completed';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:day" element={<Lesson />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 