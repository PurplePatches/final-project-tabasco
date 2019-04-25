import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("THIS.STATE: ", this.state);
        axios
            .post("/register", this.state)
            .then(({ data }) => {
                console.log("POST /register DATA: ", data);
                if (data.success) {
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log("handleSubmit() POST /register ERROR: ", err);
            });
    }

    render() {
        return (
            <div className="register-container">
                <form>
                    <input
                        type="text"
                        name="first"
                        placeholder="First name"
                        max-length="40"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="last"
                        placeholder="Last name"
                        max-length="40"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Mail"
                        max-length="50"
                        required
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        max-length="40"
                        required
                        onChange={this.handleChange}
                    />
                    <button type="submit" onClick={this.handleSubmit}>
                        Register
                    </button>
                </form>
            </div>
        );
    }
}
