import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Quiz extends Component {

    constructor(props) {

        super(props);
        this.state = {
            quizObjectData: [[], []],
            value: 'a',
            selected: 0,
            size: 0
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this.setSize = this.setSize.bind(this);
    }

    async componentDidMount () {
        let resData;
        await axios.get("http://localhost:5000/quizzes").then(function (response) {
            resData = response.data; 
          })
          .catch(function (error) {
            console.log(error);
          })
            this.setState({
            quizObjectData: resData
        });

        
    }
    _handleChange(event) {
        let label = event.target.value;
        this.setState({
            selected: label,
        });
    }
    setSize(e) {
        this.setState({
            size: e.target.value
        });
    }

    render() {
        const titles = this.state.quizObjectData[1];
        const items = titles.map((object, index) => <option value={index}>{object.name}</option>)
        return (  
                <form>
                <select className="form-select" value={this.state.selected} onChange={this._handleChange}>
                    {items}
                </select>
                <input className="text" onChange={this.setSize}></input>
                <div>
                    <Link to="/questions" state={{quiz: this.state.quizObjectData[1][this.state.selected], size: this.state.size}}><Button variant="primary" type="submit">SUBMIT</Button></Link>
                </div>
                </form>
        );
    }
}