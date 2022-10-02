import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './sign-up.css';

export default class Signin extends Component {

    constructor(props) {
        
        super(props);
         this.state = {
            username: "",
            password: "",
            validSignin: false,
            passwordVisibility: "password"
         }
         this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
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


    async onSubmit(e) {
        e.preventDefault();
        console.log("sent");
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        let signin;
        await axios.get('http://localhost:' + process.env.PORT ,{params: user})
        .then(res => {
            localStorage.setItem('currentUser', res.data[0].username);
            console.log(localStorage.getItem('currentUser'));
            signin = res.data[1];
        }
        );
        this.setState( {
            validSignin: signin
        });   
    }

    changeIcon(e) {
        e.currentTarget.classList.toggle("bi-eye-slash");
        e.currentTarget.classList.toggle("bi-eye");
        this.state.passwordVisibility === "password" ? this.setState({passwordVisibility: "text"}) : this.setState({passwordVisibility: "password"})
    }

    componentDidMount() {
        this.setState({
            username: "",
            password: ""
        });
    }

    render() {
        if(this.state.validSignin){
           return <Navigate to ="/dashboard" />
        }
        return (
            <form onSubmit = {this.onSubmit}>
                <div class="sign-in-holder">
                    <div className="sign-in-container">
                        <h2 className='sign-in-heading'>LOGIN</h2>

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
                        <button type="submit" className="sign-in-btn-sub">login</button>
                        <p className='sign-in-p'>Don't have an account? <Link to ="/">SIGN UP</Link></p>
                    </div>
                </div>
            </form>

        );
    }
}