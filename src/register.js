import React from "react";
import axios from "axios";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }
    render() {
        const inputting = e => {
            this[e.target.name] = e.target.value;
            // this[e.target.name] = e.target.value;
        };
        const register = () => {
            axios
                .post("/register", {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                })
                .then(({ data }) => {
                    this.setState({ error: data.error });
                    location.replace("/");
                })
                .catch(err => {
                    console.log(err);
                });
        };
        return (
            <div>
                {this.state.error && (
                    <div className="error">
                        Oooops, something broke, YOU BROKE ITTTT!!!
                    </div>
                )}

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={inputting}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={inputting}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={inputting}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={inputting}
                />
                <button onClick={register}>Submit</button>
            </div>
        );
    }
}
