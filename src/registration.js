import React from "react";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/register", {
                firstName: this.firstname
            })
            .then(({ data }) => {
                this.setState({
                    error: true
                });
                location.replace("/");
            });
    }
    render() {
        // const handleInput = e => {
        //     this.setState(
        //         this[e.target.name]: e.target.value
        //     );
        // };
        return (
            <div>
                {this.state.error && <div className="error">Oops</div>}
                <input onInput={handleInput} name="firstname" />
                <input name="lastname" />
                <input name="email" />
                <input name="password" />
                <button onClick={e => this.submit()}>Register</button>
            </div>
        );
    }
}
