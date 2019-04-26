import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
        // this.ifPasswordWrong = this.ifPasswordWrong.bind(this);
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                console.log(data);
                data.scuccess
                    ? location.replace("/")
                    : this.setState({ error: true });
            })
            .catch(err => {
                console.log("ERROR", err);
            });
    }
    // ifPasswordWrong() {
    //     if (this.password.length < 9) {
    //         this.setState({
    //             validatePassword: "failed-pass"
    //         });
    //     }
    // }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.value;
            // this.ifPasswordWrong();
        };
        return (
            <form>
                {this.state.error && (
                    <div className="error">Opps Something went wrong!!!</div>
                )}
                <input
                    onInput={handleInput}
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                />
                <input
                    onInput={handleInput}
                    // className={this.state.validatePassword}
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                />
                <button onClick={this.submit}> LOG IN </button>
                <Link to="/">Click here to Register!</Link>
            </form>
        );
    }
}
