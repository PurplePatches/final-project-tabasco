import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
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
        console.log("THIS.STATE: ", this.state);
        axios
            .post("/register", this.state)
            .then(({ data }) => {
                console.log("POST /register DATA: ", data);
                if (data.success) {
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log("handleSubmit() POST /register ERROR: ", err);
            });
    }

    render() {
        return (
            <div className="login-container">
                <p>Please log in. If you are not registered yet, click here.</p>
                <form>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Mail"
                        max-length="50"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        max-length="40"
                        required
                        onChange={this.handleChange}
                    />
                    <button type="submit" onClick={this.handleSubmit}>
                        Log In
                    </button>
                </form>
            </div>
        );
    }
}

// To Do:
// create error message for missing e-mail adress
// create error message for missing password
