import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit(e) {
        e.preventDefault();
        console.log("About to make the post register", this.state);
        axios
            .post("/login", this.state, {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token" // the csurf middleware automatically checks this header for the token
            })
            .then(({ data }) => {
                console.log("What i got from the server in the login is", data);
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    location.replace("/bio");
                }
            });
    }
    render() {
        const handleInput = e => {
            this.setState({
                [e.target.name]: e.target.value
            });
        };
        return (
            <div>
                {this.state.error && <div className="error">Ooops!</div>}

                <form>
                    <label htmlFor="">
                        Email Address
                        <input
                            type="email"
                            onInput={handleInput}
                            name="email"
                            id="email"
                            required
                        />
                    </label>
                    <label htmlFor="">
                        Password
                        <input
                            type="password"
                            onInput={handleInput}
                            name="password"
                            id="password"
                            required
                        />
                    </label>
                    <button onClick={e => this.submit(e)}>LOGIN</button>
                </form>
                <hr />
                <p>
                    If you are already registered go to the
                    <Link to="/"> Registration! </Link> page
                </p>
            </div>
        );
    }
}
