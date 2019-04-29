import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputting = this.inputting.bind(this);
        this.login = this.login.bind(this);
    }
    inputting(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    login(e) {
        e.preventDefault();
        axios
            .post("/login", this.state)
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
            <div>
                {this.state.error && (
                    <div className="error">
                        Oooops, something broke, YOU BROKE ITTTT!!!
                        <p>{this.state.error}</p>
                    </div>
                )}
                <form>
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
                    <button onClick={this.login}>Login</button>
                </form>
                <Link to="/">Click here to register!</Link>
            </div>
        );
    }
}
