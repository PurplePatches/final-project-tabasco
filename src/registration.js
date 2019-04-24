import axios from "axios";
import React from "react";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        console.log(this.firstname, this.password);
        axios
            .post("/register", {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                location.replace("/");
            })
            .catch(err => {
                location.replace("/");
            });
    }
    render() {
        const handleInput = e => {
            this[e.target.name] = e.target.value;
        };
        return (
            <div>
                {this.state.error && <div className="error">Oooups</div>}
                <input onChange={handleInput} name="firstname" required />
                <input onChange={handleInput} name="lastname" required />
                <input onChange={handleInput} name="email" required />
                <input
                    onChange={handleInput}
                    type="password"
                    name="password"
                    required
                />
                <button onClick={e => this.submit()}>Join up</button>
            </div>
        );
    }
}
