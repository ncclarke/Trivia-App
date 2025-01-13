import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './GameOver.css';

function GameOver() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const { score } = location.state || { score: 0 };

     // Function to handle saving the score
    const saveScore = async () => {
        try {
            await axios.post('http://localhost:5000/scores/save', {
            name,
            correct_answers: score,
        });
        alert('Score saved!');
        navigate('/');
    } catch (error) {
        console.error('Error saving score:', error);
    }
  };

  return (
    <div className="game-over">
        <h2>Game Over!</h2>
        <p>Your Score: {score}</p>
        <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button onClick={saveScore}>Save Score</button>
        <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
);
}
export default GameOver;