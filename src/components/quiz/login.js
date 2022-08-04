import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './sign-up.css';

export default class Login extends Component {
    constructor(props) {
        
        super(props);
         this.state = {
            username: "",
            password: "",
            email: ""
         }
         this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
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

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e) {
        //prevents submission of default values
        console.log("submitted!")
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        console.log(user);
        axios.post('http://localhost:5000',user).then(res => console.log(res.data));
 
    }
  
    componentDidMount() {
        this.setState({
            username: "",
            password: "",
            email: ""
        });
    }
    render() {
        return (
            <form onSubmit = {this.onSubmit}>
                <div className="holder">
                    <div className="container">
                        <h2 className='ls-heading'>SIGN-UP</h2>

                            <div className="field">
                                <label htmlFor="exampleInputusername" className="form-label">USERNAME</label>
                                <input value={this.state.username} onChange={this.onChangeUsername} className="form-control" id="exampleInputUsername" aria-describedby="emailHelp"></input>
                            </div>
                            <div className="field">
                                <label htmlFor="exampleInputPassword1" className="form-label">PASSWORD</label>
                                <input value={this.state.password} onChange={this.onChangePassword}  type="password" className="form-control" id="exampleInputPassword1"></input>
                            </div>
                            <div className='field'>
                                <label htmlFor='exampleInputEmail' className='form-label'>EMAIL</label>
                                <input value={this.state.email} onChange={this.onChangeEmail} className='form-control' id='exampleInputEmail'></input>
                            </div>
                        <button type="submit" className="btn-sub">Sign-Up</button>
                        <p>Already have an account? <Link to ="/signin">SIGN IN</Link></p>
                        <p><Link to="/dashboard">Dashboard</Link></p>
                        <p><Link to="/questions">Questions</Link></p>
                    </div>
                </div>
            </form>


        );
    }
}
