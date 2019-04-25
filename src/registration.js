import React from "react";
import axios from "axios";

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
                console.log("error in register");
            });
    }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.value;
        };
        return (
            <div id="registration">
                {this.state.error && <div className="error">Ooops</div>}
                <p className="inputtitle">First Name:</p>
                <input
                    onChange={handleInput}
                    name="firstname"
                    placeholder="firstname"
                />
                <p className="inputtitle">Last Name:</p>
                <input
                    onChange={handleInput}
                    name="lastname"
                    placeholder="lastname"
                />
                <p className="inputtitle">E-mail:</p>
                <input
                    onChange={handleInput}
                    type="email"
                    name="email"
                    placeholder="e-mail"
                />
                <p className="inputtitle">Password:</p>
                <input
                    onChange={handleInput}
                    type="password"
                    name="password"
                    placeholder="password"
                />
                <button onClick={e => this.submit()}>Join up</button>
                <br />
                <p id="linklogin">
                    Already a member? Please <a href="#">LOGIN</a>
                </p>
            </div>
        );
    }
}
