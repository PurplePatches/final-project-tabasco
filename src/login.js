import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveInput = this.saveInput.bind(this);
    }
    saveInput(e) {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    saveData(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("show me POST/login data: ", data);
                location.replace("/");
            })
            .catch(err => {
                console.log("Oops!", err);
            });
    }

    render() {
        console.log("show me this.state: ", this.state);
        return (
            <div id="form">
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={this.saveInput}
                />

                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    onChange={this.saveInput}
                />
                <input type="hidden" name="_csrf" value="{{csrfToken}}" />
                <button id="logIn" onClick={e => this.saveData(e)}>
                    Login
                </button>
            </div>
        );
    }
}
