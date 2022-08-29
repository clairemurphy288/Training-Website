import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar/quiznavbar";
import './score.css';
import { useLocation } from "react-router-dom";

export default function GetScores() {
    const location = useLocation();
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(location.state)
            getScore()
    }, []);

    async function getScore() {
        const data = await axios
        .get("http://localhost:5000/score", {params: { currentUser: localStorage.getItem('currentUser'), score: location.state.score, quiz: location.state.quiz}})
        .then(function(response) {
            console.log(response.data)
            // setData(response.data[0].quizScores);
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
                    <tr>
                        <td>1</td>
                        <td>User1</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>User2</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>User3</td>
                        <td>50</td>
                    </tr>
                </table>
            </div>            
        </div>
    );
}