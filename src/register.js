import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
        this.inputting = this.inputting.bind(this);
        this.register = this.register.bind(this);
    }
    inputting(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    register(e) {
        e.preventDefault();
        axios
            .post("/register", this.state)
            .then(({ data }) => {
                this.setState({ error: data.error });
                if (data.error == false) {
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div className="register">
                {this.state.error && (
                    <div className="error">
                        Oooops, something broke, YOU BROKE ITTTT!!!
                        <p>{this.state.error}</p>
                    </div>
                )}
                <form>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.inputting}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.inputting}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.inputting}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.inputting}
                    />
                    <button onClick={this.register}>Submit</button>
                </form>
                <p>Already have an account?</p>
                <Link to="/login">Log in!</Link>
            </div>
        );
    }
}
