import React from "react";
import axios from "./axios";

export default class Registration extends React.Component {
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
    saveData to axios.post + then

    render() {
        console.log(this.state);
        return (
            <form id="form" action="/registration" method="post">
                <input
                    className="first_name"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    autoComplete="off"
                    onChange={this.saveInput}
                />

                <input
                    id="last_name"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    autoComplete="off"
                    onChange={this.saveInput}
                />
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
                <button id="signUp">Sign up</button>
            </form>
        );
    }
}
