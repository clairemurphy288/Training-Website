import React, {Component} from 'react';
import LiveQuiz from "./LiveQuiz";
import axios from 'axios';
import "./admin.css"
import { Link } from 'react-router-dom';
import NavBar from "./utilities/navbar";


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileContent: "",
            titleOfQuiz: "",
            resData: [[], []]
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.titleChange = this.titleChange.bind(this);
    }
    async onSubmit(e) {
        let resData;
        e.preventDefault();
        const title = this.state.titleOfQuiz;
        const csv = this.state.fileContent;
           await axios.post('http://localhost:5000/admin', [csv, title]).then(res => {
            console.log(res.data);

           }).catch(err => console.log(err));
           await axios.get("http://localhost:5000/admin/quiz").then(function (response) {
            console.log("fetched quiz array")
            resData = response.data;
        
          })
          .catch(function (error) {
            console.log(error);
          });
          this.setState({
            resData: resData
          })
        
    }
   
    onChange(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            // The file's text will be printed here
            const csv = {
                fileContent: e.target.result
            }
            this.setState({
                fileContent: csv
            })
          }.bind(this);
        reader.readAsText(file)
    }
    titleChange(e) {
        this.setState({
            titleOfQuiz: e.target.value
        });
    }
    render () {
        return (
        <div>
            <NavBar/>
            <LiveQuiz createdQuizzes={this.state.resData}/>
            <hr></hr>
            <div className="container creation-dash">
            <h1>Create a new quiz</h1>
            <form onSubmit = {this.onSubmit}>
            
            
            <div class="mb-3">
                <label htmlFor="title" class="form-label">Title</label>
                <input onChange={this.titleChange} type="text" className="form-control" id="title"></input>
            </div>
                <div class="mb-3">
                    <input onChange={this.onChange} class="form-control" type="file" id="formFile"></input>
                </div>

                <button className="btn btn-primary" type="submit">Submit</button>
            
            </form>
            </div>
        </div>
        )
    }
}