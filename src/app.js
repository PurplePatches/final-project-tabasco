import React from "react";
import axios from "./axios";
import Logo from "./logo";
import Profile from "./profile";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import OtherProfile from "./otherprofile";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploaderVisible: false,
            mode: ""
        };
        this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState(data);
            })
            .catch(err => {
                alert(err);
            });
    }

    updateBio(newBio) {
        // console.log("made it to here");
        this.setState({ bio: newBio });
    }

    render() {
        // console.log("state:", this.state);
        if (!this.state.id) {
            return (
                <div>
                    <img src="spinner.gif" />
                </div>
            );
        }
        const { first_name, last_name, image, bio } = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Logo />
                    <ProfilePic
                        firstName={first_name}
                        lastName={last_name}
                        image={image}
                        clickHandler={() => {
                            this.setState({ isUploaderVisible: true });
                        }}
                    />
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                    <Profile
                                        firstName={first_name}
                                        lastName={last_name}
                                        image={image}
                                        bio={bio}
                                        updateBio={this.updateBio}
                                        clickHandler={() => {
                                            this.setState({
                                                isUploaderVisible: true
                                            });
                                        }}
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/user/:id"
                            render={props => {
                                return (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        firstName={first_name}
                                        lastName={last_name}
                                        image={image}
                                        bio={bio}
                                    />
                                );
                            }}
                        />
                    </div>
                    {this.state.isUploaderVisible && (
                        <Uploader
                            setUrl={image =>
                                this.setState({
                                    image: image,
                                    isUploaderVisible: false
                                })
                            }
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
