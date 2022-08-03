import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Admin from "./admin-page/admin";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        
        super(props);
         this.state = {
            username: "",
            password: ""
         }
         this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
   
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        //prevents submission of default values
        e.preventDefault();
        console.log("submitted!")
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(user);
        //sends a post request to the backend. This is how the frontend and backend are connected.
        axios.post('http://localhost:5000',user).then(res => console.log(res.data)).catch(err => console.log(err));
    }
    //There is a part of the lifecycle of components on react. (Mounting-phase)
    componentDidMount() {
        this.setState({
            username: "",
            password: ""

        });
    }
   
    //This renders the front-end code
    render() {
        return (
<form onSubmit = {this.onSubmit}>
<div className="container mt-4">
  <div className="mb-3">
    <label htmlFor="exampleInputusername" className="form-label">Username</label>
    <input value={this.state.username} onChange={this.onChangeUsername} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp"></input>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value={this.state.password} onChange={this.onChangePassword}  type="password" className="form-control" id="exampleInputPassword1"></input>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>


        );
    }
}
