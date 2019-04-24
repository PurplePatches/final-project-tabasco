import React from "react";
import axios from "axios";
export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                console.log(data);
                location.replace("/");
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
                    <div>
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
                        <input
                            type="hidden"
                            name="_csrf"
                            value="{{csrfToken}}"
                        />
                        <button onClick={e => this.submit(e)}>
                            Join the Community
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
