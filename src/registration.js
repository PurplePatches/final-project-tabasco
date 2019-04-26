import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/register", this.state)
            .then(data => {
                if (data.data.success) {
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log("handleSubmit() POST /register ERROR: ", err);
            });
    }

    render() {
        return (
            <React.Fragment>
                <form className="register-container">
                    <input
                        type="text"
                        name="first"
                        placeholder="first name"
                        max-length="40"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="last"
                        placeholder="last name"
                        max-length="40"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="e-mail"
                        max-length="50"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        max-length="40"
                        required
                        onChange={this.handleChange}
                    />
                    <div className="empty" />
                    <button type="submit" onClick={this.handleSubmit}>
                        Register
                    </button>
                </form>
                <p>
                    If you already have an account, please log in{" "}
                    <Link to="/login">here</Link>.
                </p>
            </React.Fragment>
        );
    }
}

// To Do:
// create error message for missing first name
// create error message for missing last name
// create error message for missing e-mail address
// create error message for missing password
