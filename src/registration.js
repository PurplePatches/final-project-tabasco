import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/register", {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                // this.setState({
                //     error: true;
                // })
                location.replace("/");
            })
            .catch(err => {
                console.log("error in register", err);
            });
    }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.value;
        };
        return (
            <div id="registration">
                {this.state.error && <div className="error">Ooops</div>}

                <input
                    onChange={handleInput}
                    name="firstname"
                    placeholder="firstname"
                />

                <input
                    onChange={handleInput}
                    name="lastname"
                    placeholder="lastname"
                />

                <input
                    onChange={handleInput}
                    type="email"
                    name="email"
                    placeholder="e-mail"
                />

                <input
                    onChange={handleInput}
                    type="password"
                    name="password"
                    placeholder="password"
                />
                <button onClick={e => this.submit()}>Join up</button>
                <br />
                <Link to="/login" id="linklogin">
                    Click here to Log in!
                </Link>
            </div>
        );
    }
}
