import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './LiveQuiz.css';



export default function Items (props) {
    const [quizzes, setQuiz] = useState([]);
    useEffect(() => {
        const quizzes = props.quizObject;
        setQuiz(quizzes);
    }, [props.quizObject]);


    function handleRemove(id) {
        const newList = quizzes.filter((quiz) => quiz._id != id);
        axios.post("http://localhost:5000/admin/quiz/delete", {_id: id}).then(function (response) {
            console.log(response.data);
          
          })
          .catch(function (error) {
    })
        setQuiz(newList);
    }
    const listItems = quizzes.map((quiz) =>    
    <li className="list-group-item d-flex justify-content-between align-items-start" key={quiz._id}><h4 className="live-quiz-item">{quiz.name}</h4>
        <span>
            <i onClick = {() => {handleRemove(quiz._id)}} className="fa-solid fa-trash fa-lg"></i>
            <Link to={{pathname: "/edit" + "/" + quiz._id + "/0"}}><i className="fa-solid fa-pen fa-lg"></i></Link>
        </span>
    </li>);  
    return (
    <div className="container">
        <h1>Live Quizzes</h1>
        <ul className="list-group list-group-flush">{listItems}</ul>
    </div>);
  }

        