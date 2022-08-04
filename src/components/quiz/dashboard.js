import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import './dashboard.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

export default class Dashboard extends Component {

    render() {
        return (
            <div className='container'>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" alt='some image goes here'/>
                <Card.Body>
                <Card.Title>Lean Six Sigma Quiz</Card.Title>
                <Card.Text>
                    Hey your about to enter the Lean Six Sigma Dashboard
                </Card.Text>
                <Link to='/quiz'><Button variant="primary">Lets Go!</Button></Link>
                </Card.Body>
                </Card>
            </div>
        );
    }
}