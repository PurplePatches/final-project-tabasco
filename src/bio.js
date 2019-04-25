import React from "react";
import axios from "./axios";
export default class Bio extends React.Component {
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
            .post("/bio", this.state, {
                xsrfCookieName: "mytoken",
                xsrfHeaderName: "csrf-token" // the csurf middleware automatically checks this header for the token
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
                        Profile Pic
                        <input
                            type="file"
                            onInput={handleInput}
                            name="firstName"
                            id="firstName"
                            required
                        />
                    </label>
                    <label htmlFor="">
                        Bio
                        <textarea onInput={handleInput} name="bio" />
                    </label>

                    <button onClick={e => this.submit(e)}>
                        Join the Community
                    </button>
                </form>
                <hr />
            </div>
        );
    }
}
