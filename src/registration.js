import axios from "./axios";
import React from "react";

import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }
    submit() {
        console.log(this.firstname, this.password);
        axios
            .post("/register", {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                location.replace("/");
            })
            .catch(err => {
                location.replace("/");
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
                        Please enter your details below to create an account
                    </p>
                    {this.state.error && <div className="error">Oooups</div>}
                    <p className="input-field">First Name</p>
                    <input
                        className="input"
                        onChange={handleInput}
                        name="firstname"
                        required
                    />
                    <p className="input-field">Last Name</p>
                    <input
                        className="input"
                        onChange={handleInput}
                        name="lastname"
                        required
                    />
                    <p className="input-field">E-mail Adress</p>
                    <input
                        className="input"
                        onChange={handleInput}
                        name="email"
                        required
                    />
                    <p className="input-field">Password</p>
                    <input
                        className="input"
                        onChange={handleInput}
                        type="password"
                        name="password"
                        required
                    />
                    <button
                        className="registration-button"
                        onClick={e => this.submit()}
                    >
                        Join up
                    </button>
                    <Link to="/login">Click here to Log in!</Link>
                </div>
            </div>
        );
    }
}
