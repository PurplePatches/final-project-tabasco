import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }
    submit() {
        axios
            .post("/login", {
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                if (!data.error) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(() => {
                this.setState({
                    error: true
                });
            });
    }
    render() {
        console.log(this.props, "PROPS LABEL");

        const handleInput = e => {
            this[e.target.name] = e.target.value; //key value pair [name of the input field
        };
        return (
            <div className="container">
                {this.state.error && <div className="error">Oops</div>}
                <h1>JOIN US</h1>
                Type your email address :
                <input name="email" onChange={handleInput} />
                Password :
                <input type="password" name="password" onChange={handleInput} />
                <button
                    className="btn btn-dark btn-lg"
                    onClick={e => this.submit()}
                >
                    LOGIN!
                </button>
                <Link to="/">Not a member? Register here</Link>
            </div>
        );
    }
}
