import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Logo from "./logo";
import axios from "./axios";
import ProfilePic from "./profilePic";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //this function will mount once and get stuff(axios)
        axios
            .get("/user")
            .then(({ data }) => {
                // res.json everything except email and password
                this.setState(data);
            })
            .catch(err => {
                alert(err);
            });
    }
    render() {
        if (!this.state.id) {
            return (
                <div>
                    <img src="spinner.gif" />
                </div>
            );
        }
        const { firstName, lastName, image } = this.state;
        console.log(this.state);
        return (
            <div>
                <Logo />
                <ProfilePic
                    firstName={firstName}
                    lastName={lastName}
                    image={image}
                    clickHandler={() => {
                        this.setState({ isUploaderVisible: true });
                    }}
                />
            </div>
        );
    }
}
