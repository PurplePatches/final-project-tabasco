import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Search from "./search";

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
                <Link to="/">
                    <img className="logo" src="/logo.png" />
                </Link>
                <Search />
                <div className="menu">
                    <Link to="/friends">
                        <button>Friends</button>
                    </Link>
                    <Link to="/chat">
                        <button>Chat</button>
                    </Link>
                </div>
                <button id="logout" onClick={this.logout}>
                    Logout
                </button>
                {this.props.ProfilePic}
            </div>
        );
    }
}
