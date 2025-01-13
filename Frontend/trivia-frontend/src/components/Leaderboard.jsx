import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LeaderBoard.css';

function Leaderboard() {
    const navigate = useNavigate();
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    // Function to fetch leaderboard data
    const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:5000/scores/leaderboard');
      setScores(response.data);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
  };
  return (
    <div className="leaderboard">
        <h2>Leaderboard</h2>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Correct Answers</th>
                </tr>
            </thead>
            <tbody>
                {scores.map((score, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{score.name}</td>
                        <td>{score.correct_answers}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={() => navigate('/')}>Return</button>
    </div>
);
}
export default Leaderboard;