import React, { useState, useEffect } from "react";
import Navbar from "./navbar/quiznavbar";
import './score.css';

export default function GetScores() {

    return (
        <div className="scoreboard-body">
            <Navbar />
            <div className="scoreboard-wrapper">
                <table className="scoreboard-table">
                    <tr>
                        <th>Pos</th>
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