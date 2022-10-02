import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar/quiznavbar";
import './score.css';
import { useLocation } from "react-router-dom";

export default function GetScores() {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        getScore()
    }, []);

    useEffect(()=> {
        let rank = 0;
        let aList = []
        if(data.length > 0) {
             aList = data.map((object, index, array)=> {
                if (index > 0 && array[index - 1].quizScores.score == object.quizScores.score) {
                    return <tr>
                            <td>{rank}</td>
                            <td>{object.username}</td>
                            <td>{object.quizScores.score}</td>
                        </tr>
                } else {
                rank++;
                return <tr>
                    <td>{rank}</td>
                    <td>{object.username}</td>
                    <td>{object.quizScores.score}</td>
                </tr>
                }
            })
            setScores(aList);
        }

    }, [data])

    async function getScore() {
        const data = await axios
        .get("http://localhost:5000/score", {params: { currentUser: localStorage.getItem('currentUser'), score: location.state.score, quiz: location.state.quiz}})
        .then(function(response) {
            console.log(response.data)
            setData(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    return (
        <div className="scoreboard-body">
            <Navbar />
            <div className="scoreboard-wrapper">
                <table className="scoreboard-table">
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                    {scores.map((o) => {
                        return o;
                    })}
                </table>
            </div>            
        </div>
    );
}