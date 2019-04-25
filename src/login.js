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
        const handleInput = e => {
            this[e.target.name] = e.target.value; //key value pair [name of the input field
        };
        return (
            <div>
                {this.state.error && <div className="error">Oops</div>}
                <input name="email" onChange={handleInput} />
                <input type="password" name="password" onChange={handleInput} />
                <button onClick={e => this.submit()}>LOGIN!</button>
                <Link to="/">Not a member? Register here</Link>
            </div>
        );
    }
}
