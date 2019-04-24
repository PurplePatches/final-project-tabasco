import React from "react";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            value: ""
        };

        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="register-container">
                {this.state.error && (
                    <div className="error">
                        Something went wrong, please try again.
                    </div>
                )}
                <input
                    name="first"
                    placeholder="First name"
                    max-length="40"
                    required
                />
                <input
                    name="last"
                    placeholder="Last name"
                    max-length="40"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-Mail"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    max-length="40"
                    required
                />
                <button type="submit">Register</button>
            </div>
        );
    }
}

// export default class Registration extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     // submit() {
//     //     axios
//     //         .post("/register", {
//     //             firstName: this.firstname
//     //         })
//     //         .then(({ data }) => {
//     //             this.setState({
//     //                 error: true
//     //             });
//     //             location.replace("/");
//     //         });
//     // }
//     render() {
//         // const handleInput = e => {
//         //     this.setState(
//         //         this[e.target.name]: e.target.value
//         //     );
//         // };
//         return (
//             <div>
//                 {this.state.error && <div className="error">Oops</div>}
//                 <input onInput={handleInput} name="firstname" />
//                 <input name="lastname" />
//                 <input name="email" />
//                 <input name="password" />
//                 <button onClick={e => this.submit()}>Register</button>
//             </div>
//         );
//     }
// }
