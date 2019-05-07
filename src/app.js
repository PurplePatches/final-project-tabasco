import React from "react";
import axios from "./axios";
import { BrowserRouter, Link, Route } from "react-router-dom";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import OtherProfile from "./otherprofile";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        axios.get("/users").then(({ data }) => {
            this.setState({
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                url: data.url,
                bio: data.bio,
                accepted: data.accepted
            });
            console.log("DATA", data);
        });
    }
    setBio(newBio) {
        this.setState({ bio: newBio });
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
            <div>
                <div id="header">
                    <div className="logo">
                        <p className="logoname">CONECT</p>
                    </div>

                    <ProfilePic
                        url={this.state.url}
                        firstname={this.state.firstname}
                        clickHandler={() =>
                            this.setState({
                                isUploaderVisible: true
                            })
                        }
                    />
                </div>
                <div id="content">
                    <BrowserRouter>
                        <div>
                            <div>
                                <Route
                                    exact
                                    path="/"
                                    render={props => {
                                        return (
                                            <Profile
                                                firstname={this.state.firstname}
                                                lastname={this.state.lastname}
                                                imageurl={this.state.url}
                                                id={this.state.userId}
                                                onClick={this.showU}
                                                bio={this.state.bio}
                                                setBio={this.setBio}
                                            />
                                        );
                                    }}
                                />
                            </div>

                            <Route
                                path="/users/:id"
                                render={props => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        userId={this.state.id}
                                        accepted={this.state.accepted}
                                    />
                                )}
                            />
                        </div>
                    </BrowserRouter>
                    {this.state.isUploaderVisible && (
                        <Uploader
                            setImage={image => this.setState({ url: image })}
                        />
                    )}
                </div>
            </div>
        );
    }
}
