import React, {Component} from 'react';
import axios from 'axios';
//import './quiz.css';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';

export default class Quiz extends Component {

    constructor(props) {

        super(props);
        this.state = {
            quizObjectData: [[], []],
            value: 'a'
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount () {
        let resData;
        await axios.get("http://localhost:5000/quizzes").then(function (response) {
            resData = response.data;
            // console.log(resData);  
          })
          .catch(function (error) {
            console.log(error);
          })
            this.setState({
            quizObjectData: resData
        });

        
    }

     onSubmit(e) {
        e.preventDefault();
        console.log('sent');
        console.log(this.state.value);
    }

    _handleChange(event) {
        let label = event.label;
        //console.log(event.value);
        this.setState({
            value: label,
        }, () => console.log(this.state.value));
    }

    render() {
        //looping through the titles
        const titles = this.state.quizObjectData[1];
        let options = [];
        for(let i =0; i < titles.length; i++) {
            const object = titles[i];
            const json = {value: object._id, 
                    label: object.name}   
            options.push(json)

        }
        //const items = titles.map((object) => <option>value={object._id} label= {object.name}</option>)
        return (  
                <form onSubmit = {this.onSubmit}>
                <Select onChange={this._handleChange} options={ options } />
                <Select />
                <div>
                    <Button variant="primary" type="submit">SUBMIT</Button>
                </div>
                </form>
        );
    }
}