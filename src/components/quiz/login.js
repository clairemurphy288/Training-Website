import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './sign-up.css';
import { useHistory } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        
        super(props);
         this.state = {
            username: "",
            password: "",
            email: "",
            passwordVisibility: "password"
         }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeIcon = this.changeIcon.bind(this);

   
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
        console.log("submitted!")
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        console.log(user);
        axios.post('http://localhost:5000',user).then(res => {
        if (res.data) {
            console.log("attempting to redirect to dashboard")
                return <Navigate to ="/dashboard" />
        } else {
            console.log("problem")
        }
    });
    }
  
    componentDidMount() {
        this.setState({
            username: "",
            password: "",
            email: ""
        });
    }
    changeIcon(e) {
        e.currentTarget.classList.toggle("bi-eye-slash");
        e.currentTarget.classList.toggle("bi-eye");
        this.state.passwordVisibility === "password" ? this.setState({passwordVisibility: "text"}) : this.setState({passwordVisibility: "password"})
    }
    render() {
        return (
            <form onSubmit = {this.onSubmit}>
                <div className="sign-in-holder">
                    <div className="sign-in-container">
                        <h2 className='sign-in-heading'>SIGN-UP</h2>

                            <div className="sign-in-field">
                                <label htmlFor="exampleInputusername" className="sign-in-form-label">USERNAME</label>
                                <input value={this.state.username} onChange={this.onChangeUsername} className="sign-in-form-control" id="exampleInputUsername" aria-describedby="emailHelp"></input>
                            </div>
                            <div className="sign-in-field">
                                <p>
                                    <label htmlFor="exampleInputPassword1" className="sign-in-form-label">PASSWORD</label>
                                    <input value={this.state.password} onChange={this.onChangePassword}  type={this.state.passwordVisibility} className="sign-in-form-control" id="exampleInputPassword1"></input>
                                    <i onClick={this.changeIcon} class="bi bi-eye-slash" id="toggle-icon"></i>
                                </p>
                            </div>
                            <div className='sign-in-field'>
                                <label htmlFor='exampleInputEmail' className='sign-in-form-label'>EMAIL</label>
                                <input value={this.state.email} onChange={this.onChangeEmail} className='sign-in-form-control' id='exampleInputEmail'></input>
                            </div>
                        <button type="submit" className="sign-in-btn-sub">Sign-Up</button>
                        <p className='sign-in-p'>Already have an account? <Link to ="/signin">SIGN IN</Link></p>
                        <p className='sign-in-p'><Link to="/dashboard">Dashboard</Link></p>
                        <p className='sign-in-p'><Link to="/questions">Questions</Link></p>
                    </div>
                </div>
            </form>


        );
    }
}
