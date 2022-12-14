import React, { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './question.css';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function GetQuestions() {
    const location = useLocation();
    const  stateQuiz  = location.state;

    const navigate = useNavigate();

    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);


    const [questionNumber, setQuestionNumber] = useState(0);
    const [randomArray, setRandom] = useState(random(stateQuiz.size));

    function random(size) {
        let arr = [];
        //double check this range is correct
        for (let i = 0; i < size; i++) {
            arr.push(stateQuiz.quiz.questions[Math.floor(Math.random() * (stateQuiz.quiz.questions.length))])
        }
        return arr;
    }

    useEffect(() => {
        if (showScore) {
            setTimeout(()=> {
                onLoad()
            }, 2000)
        }
    }, [showScore, score])

    function handleAnswerButtonClick(choice) {
        let id = randomArray[questionNumber].indexOfAnswer;
        if(questionNumber < stateQuiz.size-1) {
            if(choice === randomArray[questionNumber].answerChoices[id]){
                setScore(score + 1);
                setQuestionNumber(questionNumber + 1);
                alert('correct');
            } else {
                setQuestionNumber(questionNumber + 1);
                alert('incorrect');
            } 
        } else {
            if(choice === randomArray[questionNumber].answerChoices[id]){
                setScore(score + 1);
                setShowScore(true);
              
            } else {
                setShowScore(true);
            }
        }
             
    }
    function onLoad() {
        navigate("/scores", {state: {score: score, quiz: stateQuiz.quiz.name}})

    }
    return (
        <div className="question-app">
            {showScore ? (
                <div className='question-score-section'>
					You scored {score} out of {randomArray.length}
				</div>
                //after a few seconds navigate to score board
                ) : (
                    <>
                    <div className="question-question-section">
                        <div className="question-question-count">
                            <span>Question {questionNumber + 1}</span>/{randomArray.length}
                        </div>
                        <div className='question-question-text'>{randomArray[questionNumber].question}</div>
                    </div>
                    <div className="question-answer-section">
                    {randomArray[questionNumber].answerChoices.map((answerChoices, index) => (
                        answerChoices !== "" ? <button className="question-button-section" onClick={() => handleAnswerButtonClick(answerChoices)}  >{answerChoices}</button>
                        : <div style={{visibility: "hidden"}}>Blank Div</div>))}
                    </div>
                    </>
                )}
            
        </div>
    );
}