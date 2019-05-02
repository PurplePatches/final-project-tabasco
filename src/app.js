import axios from "./axios";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import OtherProfile from "./otherprofile";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                firstname: data.firstname,
                lastname: data.lastname,
                image: data.image,
                bio: data.bio,
                id: data.id
            });
        });
    }
    render() {
        if (!this.state.id) {
            return (
                <div>
                    Please wait
                    <img src="/spinner.gif" />
                </div>
            );
        }
        return (
            <BrowserRouter>
                <div>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                image={this.state.image}
                                profilePic={
                                    <ProfilePic
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        image={this.state.image}
                                        clickHandler={() =>
                                            this.setState({
                                                isUploaderVisible: true
                                            })
                                        }
                                    />
                                }
                                bioEditor={
                                    <BioEditor
                                        bio={this.state.bio}
                                        handleBio={bio =>
                                            this.setState({ bio: bio })
                                        }
                                    />
                                }
                            />
                        )}
                    />
                    <Route
                        path="/user/:id"
                        render={props => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    {this.state.isUploaderVisible && (
                        <Uploader
                            handleImage={url => this.setState({ image: url })}
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
