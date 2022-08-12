import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Navbar from "./navbar/quiznavbar";

export default class Dashboard extends Component {


    render() {
        return (
            <div className='dash-container'>
                <Navbar />
                <Card style={{ width: '18rem' }} className="quiz-card">
                <Card.Body>
                <Card.Title>Lean Six Sigma Quiz</Card.Title>
                <Card.Text>
                    Description
                </Card.Text>
                <Link to='/quiz'><Button variant="primary">Lets Go!</Button></Link>
                </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }} className='time-management-card'>
                <Card.Body>
                <Card.Title>Time Management</Card.Title>
                <Card.Text>
                    Description
                </Card.Text>
                <Link to='/quiz'><Button variant="primary">Lets Go!</Button></Link>
                </Card.Body>
                </Card>
            </div>
        );
    }
}