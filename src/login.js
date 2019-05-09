import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post(
                "/login",
                {
                    email: this.email,
                    newpassword: this.newpassword
                },
                {
                    xsrfCookieName: "mytoken",
                    xsrfHeaderName: "csrf-token"
                }
            )
            .then(({ data }) => {
                // this.setState({
                //     error: true;
                // // })
                location.replace("/");
            })
            .catch(err => {
                console.log("error in LOGIN", err);
            });
    }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.value;
        };
        return (
            <div id="login">
                {this.state.error && <div className="error">Ooops</div>}

                <input
                    onChange={handleInput}
                    type="email"
                    name="email"
                    placeholder="e-mail"
                />

                <input
                    onChange={handleInput}
                    type="password"
                    name="newpassword"
                    placeholder="password"
                />
                <button onClick={e => this.submit()}>Join up</button>
            </div>
        );
    }
}
