import React from "react";
import axios from "./axios";
import { BrowserRouter, Link, Route } from "react-router-dom";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import OtherProfile from "./otherprofile";
import Profile from "./profile";
import BioEditor from "./bioeditor";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/users").then(({ data }) => {
            this.setState({
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                url: data.url
            });
            console.log("DATA", data);
        });
    }

    render() {
        if (!this.state.id) {
            return (
                <img
                    id="loading"
                    src="https://media.giphy.com/media/DvVTVeqPc5qEM/giphy.gif"
                />
            );
        }
        return (
            <BrowserRouter>
                <div>
                    <img
                        className="logo"
                        src="https://media.giphy.com/media/65Tr7aW4HJYdCHN082/source.gif"
                    />

                    <ProfilePic
                        url={this.state.url}
                        firstname={this.state.firstname}
                        clickHandler={() =>
                            this.setState({
                                isUploaderVisible: true
                            })
                        }
                    />

                    <div>
                        <Route
                            path="/"
                            render={props => {
                                return (
                                    <Profile
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        profilepicurl={
                                            <ProfilePic
                                                id={this.state.userId}
                                                firstname={this.state.firstname}
                                                lastname={this.state.lastname}
                                                url={this.state.url}
                                                onClick={this.showU}
                                            />
                                        }
                                        bioEditor={
                                            <BioEditor
                                                bio={this.state.bio}
                                                setBio={this.setBio}
                                            />
                                        }
                                    />
                                );
                            }}
                        />
                        <Route path="/users/:id" component={OtherProfile} />
                    </div>
                    {this.state.isUploaderVisible && (
                        <Uploader
                            setImage={image => this.setState({ url: image })}
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
