import axios from "./axios";
import React from "react";

import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { wrongEmail: false, wrongPassword: false, error: false };
    }
    submit() {
        axios
            .post("/login", {
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                if (data.wrongEmail) {
                    this.setState({
                        wrongEmail: true,
                        wrongPassword: false,
                        error: false
                    });
                } else if (data.wrongPassword) {
                    this.setState({
                        wrongPassword: true,
                        wrongEmail: false,
                        error: false
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch(err => {
                this.setState({
                    error: true,
                    wrongEmail: false,
                    wrongPassword: false
                });
            });
    }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.value;
        };
        return (
            <div className="registration-form">
                <div className="registration-block">
                    <p className="input-title">
                        Please enter your details below to login to your account
                    </p>
                    <p className="input-field">
                        E-mail Adress{" "}
                        {this.state.wrongEmail && (
                            <span className="error">
                                There is an error in your email adress.
                            </span>
                        )}
                    </p>
                    <input
                        className="input"
                        onChange={handleInput}
                        name="email"
                        required
                    />
                    <p className="input-field">
                        Password{" "}
                        {this.state.wrongPassword && (
                            <span className="error">
                                The password selected is invalid.
                            </span>
                        )}
                    </p>
                    <input
                        className="input"
                        onChange={handleInput}
                        name="password"
                        required
                    />
                    <button
                        className="registration-button"
                        onClick={e => this.submit()}
                    >
                        Log In
                    </button>
                    <Link to="/">Click here to Register!</Link>
                </div>
            </div>
        );
    }
}
