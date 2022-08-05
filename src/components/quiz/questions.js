import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './question.css';

export default function GetQuestions() {
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionArr, setQuestionArr] = useState([]);
    const [qSize, setQSize] = useState([]);
    const [questions, setQuestions] = useState([{
        name: '',
        questions: [{
            question: '',
            answerChoices: [],
            indexOfAnswer: '',
        }]
    }]);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        answerChoices: [],
        indexOfAnswer: '',
    });

    const getQuestions = async () => {
        try {
            await axios.get("http://localhost:5000/questionss").then(function (response) {
                setQuestions(response.data);
              }).catch(function (error) {
                console.log(error);
              })

        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(()=> {
        if(questions[0].name === "") {
            getQuestions()
            setQSize(random(20));

        }    
        if (questions[0].name !== "") {
            let arr = []
            for(let i=0; i < qSize.length; i++) {
                arr.push(questions[0].questions[qSize[i]])
            }
            setQuestionArr(arr.map((q) => q.question));
        }
        if(qSize.length !== 0 && questions[0].questions.length > 1 ){
            const index = qSize[questionNumber];
            setCurrentQuestion(questions[0].questions[index]);

        }
        
    },[questions]);

    function random(size) {
        const ran = Array.from({length:size}, () => Math.floor(Math.random() * 100));
        return ran;
    }

    function handleAnswerButtonClick(choice) {
        let id = currentQuestion.indexOfAnswer;
        if(questionNumber < qSize.length-1){
            if(choice === currentQuestion.answerChoices[id]){
                setScore(score + 1);
                setQuestionNumber(questionNumber + 1);
                setCurrentQuestion(questions[0].questions[qSize[questionNumber]]);
                alert('correct');
            } else {
                setQuestionNumber(questionNumber + 1);
                setCurrentQuestion(questions[0].questions[qSize[questionNumber]]);
                alert('incorrect');
            } 
        } else {
            if(choice === currentQuestion.answerChoices[id]){
                setScore(score + 1);
                setShowScore(true);
            } else {
                setShowScore(true);
            }
        }
             
    }

    return (
        <div className="app">
            {showScore ? (
                <div className='score-section'>
					You scored {score} out of {questionArr.length}
				</div>
                ) : (
                    <>
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question {questionNumber + 1}</span>/{questionArr.length}
                        </div>
                        <div className='question-text'>{questionArr[questionNumber]}</div>
                    </div>
                    <div className="answer-section">
                    {currentQuestion.answerChoices.map((answerChoices, index) => (
		                <button onClick={() => handleAnswerButtonClick(answerChoices)}>{answerChoices}</button>
	                ))}
                    </div>
                    </>
                )}
            
        </div>
    );
}