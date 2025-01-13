import { useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className='title-neon'>Trivia Count'em Up Challenge!</div>
      <br></br>
      <br></br>
      <button className="main-button" onClick={() => navigate('/game')}>Start Game</button>
      <button className="main-button" onClick={() => navigate('/leaderboard')}>Leaderboard</button>
    </div>
  );
}

export default App;
