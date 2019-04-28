import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }
    submit() {
        axios
            .post("/register", {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                // this.setState({
                //     error: true
                // })

                if (data.error) {
                    this.setState({
                        error: true
                    });
                }
                location.replace("/");
            })
            .catch(() => {
                this.setState({
                    error: true
                });
            });
    }
    render() {
        console.log(this.props, "PROPS IN Register");

        const handleInput = e => {
            this[e.target.name] = e.target.value; //key value pair [name of the input field
        };
        return (
            <div className="form-container">
                {this.state.error && <div className="error">Oops</div>}
                First name :
                <input onChange={handleInput} name="first" />
                Last name :
                <input name="last" onChange={handleInput} />
                Email :
                <input name="email" onChange={handleInput} />
                Password :
                <input type="password" name="password" onChange={handleInput} />
                <button
                    className="btn btn-dark btn-lg"
                    onClick={e => this.submit()}
                >
                    Join up
                </button>
                <Link to="/login">Already a member? Login here</Link>
            </div>
        );
    }
}
