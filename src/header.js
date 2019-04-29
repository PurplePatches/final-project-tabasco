import React from "react";
import axios from "./axios";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        axios.get("/logout").then(() => {
            location.replace("/welcome");
        });
    }
    render() {
        return (
            <div className="header">
                <img className="logo" src="/logo.png" />
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}
