import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

export default class Dashboard extends Component {

    //first commit

    render() {
        return (
            <div className='container'>
                <Card style={{ width: '18rem' }} className="quiz-card">
                <Card.Body>
                <Card.Title>Lean Six Sigma Quiz</Card.Title>
                <Card.Text>
                    Hey your about to enter the Lean Six Sigma Quiz Dashboard
                </Card.Text>
                <Link to='/quiz'><Button variant="primary">Lets Go!</Button></Link>
                </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }} className='time-management-card'>
                <Card.Body>
                <Card.Title>Time Management</Card.Title>
                <Card.Text>
                    Hey your about to enter the Time Management Dashboard
                </Card.Text>
                <Link to='/quiz'><Button variant="primary">Lets Go!</Button></Link>
                </Card.Body>
                </Card>
            </div>
        );
    }
}