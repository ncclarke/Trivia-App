import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Game from './components/Game';
import GameOver from './components/GameOver';
import Leaderboard from './components/Leaderboard';

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gameover"element={<GameOver />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  //</React.StrictMode>
);