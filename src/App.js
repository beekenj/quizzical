// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import Question from './components/Question'
import Splash from './components/Splash';

function App() {
  const [quiz, setQuiz] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([0,0,0,0,0]);
  const [isNew, setIsNew] = useState(true);
  const [difficulty, setDifficulty] = useState('');

  // useEffect(() => {
  //   // Get the quiz data from the API
  //   let ignore = false
  //   fetch(`https://opentdb.com/api.php?amount=5&${difficulty}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       if (!ignore) setQuiz(data.results)
  //       console.log(data.results)
  //   });
    
  //   // This ignore is for strict mode, so the state is only set once
  //   return () => { ignore = true }
  // }, [difficulty]);

  useEffect(() => {
    // Data for Question props
    const corrects = quiz.map(elem => elem.correct_answer);
    const incorrects = quiz.map(elem => elem.incorrect_answers);
    setQuestions(quiz.map(elem => elem.question));
    setAnswers(incorrects.map((incorrect, idx) => {
      const correct = corrects[idx]
      return quiz[idx].type === "boolean" ?
        ['True', 'False'] :
        [correct, ...incorrect].sort(() => Math.random() - 0.5)
    }));
  }, [quiz]);

  const questionClick = (id, isCorrect) => {
    setScores(prevScores => (
      prevScores.map((score, idx) => {
        return id === idx ?
          isCorrect ? 1 : 0 :
          score
      })
    ));
  }

  const checkAnswers = () => {
    setShowAnswer(prev => !prev);
  }

  const newGame = () => {
    fetch(`https://opentdb.com/api.php?amount=5&${difficulty}`)
      .then(res => res.json())
      .then(data => {
        setQuiz(data.results)
    });
    setIsNew(true);
    setShowAnswer(false);
    setScores([0,0,0,0,0])
  }

  const newQuiz = () => {
    setIsNew(false);
    // console.log("new")
    fetch(`https://opentdb.com/api.php?amount=5&${difficulty}`)
      .then(res => res.json())
      .then(data => {
        setQuiz(data.results)
        // console.log(data.results)
    });
  }

  const changeDifficulty = (event) => {
    const {value} = event.target
    setDifficulty(value);
    
  }


  // Lay out questions
  const allQuestions = answers.length > 0 ?
      quiz.map((_, idx) => 
      <Question 
        key={idx} 
        id={idx} 
        quiz={quiz} 
        question={questions[idx]}
        answer={answers[idx]}
        correct={quiz[idx].correct_answer}
        showAnswer={showAnswer}
        questionClick={questionClick}
    />) : [];


  return (
    <main className="App">
      {isNew ? 
        <Splash 
          handleClick={newQuiz} 
          changeDifficulty={changeDifficulty} 
          level={difficulty}
        /> :
        <div className="quiz">
          {allQuestions}
          <div className='check--inner'>
            {showAnswer ? 
              <>{`You scored 
              ${scores.reduce((a,b) => a + b, 0)}/5 
              correct answers`}
              <button className='subbutton' onClick={newGame}>
                Play Again
              </button></> :
              <button className='subbutton' onClick={checkAnswers}>
                Check Answers
              </button>}
          </div> 
        </div>}
    </main>
  );
}

export default App;
