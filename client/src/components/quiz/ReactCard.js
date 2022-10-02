import { Link } from 'react-router-dom';
import './dashboard.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
export default function ReactCard (props) {
    return (
        <Card style={{ width: '18rem' }} className="quiz-card">
        <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            {props.description}
        </Card.Text>
        <Link to={props.link}><Button variant="primary">Lets Go!</Button></Link>
        </Card.Body>
        </Card>
    )
   

}