import React from "react";
import Logo from "./logo";
import axios from "./axios";
import ProfilePic from "./profile";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        //this function will mount once and get stuff(axios)
        axios.get("/user").then(({ data }) => {
            // res.json everything except email and password
            this.setState(data);
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
        return (
            <div>
                <Logo />
                <ProfilePic
                    image={this.state.image}
                    first={this.state.first}
                    clickHandler={() =>
                        this.setState({ isUploaderVisible: true })
                    }
                />
            </div>
        );
    }
}
