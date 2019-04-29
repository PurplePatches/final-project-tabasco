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
        this.toggleUploader = this.toggleUploader.bind(this);
        this.profilePicUrl = this.profilePicUrl.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            const firstName = data.first_name;
            const lastName = data.last_name;
            const picture = data.picture;
            const bio = data.bio;
            this.setState({ firstName, lastName, picture, bio });
        });
    }
    toggleUploader() {
        if (this.state.uploaderVisible) {
            this.setState({ uploaderVisible: false });
        } else {
            this.setState({ uploaderVisible: true });
        }
    }
    profilePicUrl(picture) {
        this.setState({ picture });
        this.setState({ uploaderVisible: false });
    }
    render() {
        return (
            <div>
                <Header />
                <ProfilePic
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    image={this.state.picture}
                    toggleUploader={this.toggleUploader}
                />
                {this.state.uploaderVisible && (
                    <Uploader
                        toggleUploader={this.toggleUploader}
                        profilePicUrl={this.profilePicUrl}
                    />
                )}
                <div>Welcome to anti-social network</div>
            </div>
        );
    }
}
