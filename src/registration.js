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
        const handleInput = e => {
            this[e.target.name] = e.target.value; //key value pair [name of the input field
        };
        return (
            <div>
                {this.state.error && <div className="error">Oops</div>}
                <input onChange={handleInput} name="first" />
                <input name="last" onChange={handleInput} />
                <input name="email" onChange={handleInput} />
                <input type="password" name="password" onChange={handleInput} />
                <button onClick={e => this.submit()}>Join up</button>
                <Link to="/login">Already a member? Login here</Link>
            </div>
        );
    }
}
