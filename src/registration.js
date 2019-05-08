import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
        // this.handleInput = this.handleInput.bind(this);
    }
    submit(e) {
        e.preventDefault();
        console.log("About to make the post register", this.state);
        axios
            .post("/register", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("What i got from the server is", data);
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    location.replace("/");
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
                        First Name
                        <input
                            type="text"
                            onInput={handleInput}
                            name="firstName"
                            id="firstName"
                            required
                        />
                    </label>
                    <label htmlFor="">
                        Last Name
                        <input
                            type="text"
                            onInput={handleInput}
                            name="lastName"
                            id="lastName"
                            required
                        />
                    </label>

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
                    <button onClick={e => this.submit(e)}>
                        Join the Community
                    </button>
                </form>
                <hr />
                <p>
                    If you are already registered go to the
                    <Link to="/login"> Log in! </Link> page
                </p>
            </div>
        );
    }
}
