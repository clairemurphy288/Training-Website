import React, {Component} from 'react';
import LiveQuiz from "./LiveQuiz";
import axios from 'axios';
import "./admin.css"
import NavBar from "./utilities/navbar";


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileContent: "",
            titleOfQuiz: "",
            resData: [[], []],
            iconStyle: "text-warning mx-3 fa-solid fa-arrow-right-from-bracket fa-lg"
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
    mouseOver(e) {
        e.currentTarget.classList.add('text-primary', 'fa-shadow');

    }
    mouseOut(e) {
        e.currentTarget.classList.remove('text-primary', 'fa-shadow');
    }
    render () {
        return (
        <div>
            <NavBar/>
            <LiveQuiz createdQuizzes={this.state.resData}/>
            <hr></hr>
            <div className="container creation-dash">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-question-circle-fill readme text-success" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
        </svg>
            <h1>Create a new quiz </h1>


            <form onSubmit = {this.onSubmit}>
            
            
            <div class="mb-3">
                <h5>upload a file to import your quiz</h5>
                <label htmlFor="title" class="form-label">Title</label>
                <input onChange={this.titleChange} type="text" className="form-control" id="title"></input>
            </div>
                <div class="mb-3">
                    <input onChange={this.onChange} class="form-control" type="file" id="formFile"></input>
                </div>

                <button className="btn btn-primary" type="submit">Submit</button>
            
            </form>
            <h5 className="mt-2 quick-start-title">or start with a blank quiz </h5>
            <i onMouseOut={this.mouseOut} onMouseOver={this.mouseOver} className="mx-3 fa-solid fa-arrow-right-from-bracket fa-lg"></i>
            </div>
        </div>
        )
    }
}