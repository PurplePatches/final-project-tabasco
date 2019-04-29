import React from "react";
import axios from "./axios";
// import { HashRouter, Route } from "react-router-dom";

import Header from "./header";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
        this.showUploader = this.showUploader.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            const firstName = data.first_name;
            const lastName = data.last_name;
            const picture = data.picture;
            const bio = data.bio;
            this.setState({ firstName, lastName, picture, bio });
            console.log("state: ", this.state);
        });
    }
    showUploader() {
        this.setState({ uploaderVisible: true });
    }
    render() {
        return (
            <div>
                <Header />
                <ProfilePic
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    image={this.state.picture}
                    showUploader={this.showUploader}
                />
                {this.state.uploaderVisible && <Uploader />}
                <div>Welcome to anti-social network</div>
            </div>
        );
    }
}
