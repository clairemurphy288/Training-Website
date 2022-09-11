import React, {Component} from 'react';
import './dashboard.css';
import ReactCard from "./ReactCard";
import Navbar from "./navbar/quiznavbar";

export default class Dashboard extends Component {
    render() {
        return (
            <div className='dash-container'>
                <Navbar />
                <ReactCard title="Lean Six Sigma Quiz" description="Refresh your knowledge with our Lean Six Sigma Quiz!" link="/quiz"/>
                <ReactCard title="Time Study" description="Participate in our manufacturing time study." link="/quiz"/>
            </div>
        );
    }
}