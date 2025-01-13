import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Game.css'; // We'll add styles here

// Utility function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

//deals with special characters
const decodeHtmlEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

function Game() {

    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const navigate = useNavigate();

    // Determine difficulty based on question count
    const getDifficulty = () => {
        if (questionCount < 10) return "easy";
        if (questionCount < 20) return "medium";
        return "hard";
    };

    const questionClass = `question-${getDifficulty()}`;

    useEffect(() => {
        fetchQuestion();
    }, []);

    // Function to fetch a new question from the backend
    const fetchQuestion = async () => {
    try {
            const difficulty = getDifficulty();
            const response = await axios.get(`http://localhost:5000/trivia/next?difficulty=${difficulty}&category=9`);
            // Validate response
            if (!response.data || response.data.length === 0) {
              console.error('No question data received from the API.');
              return;
            }
            console.log('API Response:', response.data);
            const questionData = response.data[0];
            questionData.question = decodeHtmlEntities(questionData.question);

            setQuestion(questionData);

            const allAnswers = shuffleArray([
              questionData.correct_answer,
              ...questionData.incorrect_answers,
            ]);

            setAnswers(allAnswers.map(decodeHtmlEntities)); // Decode all answers
            setSelectedAnswer(null);
        } catch (error) {
          // Log the entire error object for debugging
        console.error('Fetch Question Error:', error);
        //console.log(error);

        // Handle specific 429 Too Many Requests Error
        /*if (error.response) {
            const { status, data } = error.response;

            if (status === 429 || (data && data.error && data.error.includes('429 Client Error'))) {
                console.warn('Rate limit exceeded. Retrying in 10 seconds...');
                setTimeout(fetchQuestion, 10000); // Retry after 10 seconds
                return;
            }
        }*/
          setTimeout(fetchQuestion, 10000); // Retry after 10 seconds

          //console.error('Error fetching question:', error);
        }
    };

    // Function to handle when a user selects an answer
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);

    if (answer === decodeHtmlEntities(question.correct_answer)) {
      // If the answer is correct, highlight green and increment question count
      setCorrectAnswers(correctAnswers + 1);
      setTimeout(() => {
        setQuestionCount(questionCount + 1);
        fetchQuestion(); // Fetch the next question after the answer is processed
      }, 1000);
    } else {
      setShowCorrectAnswer(true);
      // If the answer is wrong, navigate to Game Over
      setTimeout(() => {
        navigate('/gameover', { state: { score: correctAnswers } });
      }, 1000);
    }
  };

  // Function to determine button styles
  const getButtonClass = (answer) => {
    if (selectedAnswer === answer) {
      // If it's the selected answer
      return answer === decodeHtmlEntities(question.correct_answer) ? 'correct' : 'incorrect';
    }

    if (showCorrectAnswer && answer === decodeHtmlEntities(question.correct_answer)) {
      // Highlight the correct answer in green if an incorrect answer was chosen
      return 'correct';
    }

    return '';
  };

  return (
    <div className="game">
      {question ? (
        <div>
          <h2 className={questionClass}>{question.question}</h2>
          <div className="answers">
            {answers.map((answer, index) => (
              <button
                key={index}
                className={`answer-button ${getButtonClass(answer)}`}
                onClick={() => handleAnswerClick(answer)}
                disabled={selectedAnswer !== null}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}
export default Game;