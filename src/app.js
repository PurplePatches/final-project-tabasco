import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import OtherProfile from "./otherProfile";
import Chat from "./chat";
import Friends from "./friends";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploaderVisible: false
        };
        this.closeUploader = this.closeUploader.bind(this);
    }
    // logout() {
    //     axios.get("/logout").then(() => location.replace("/"));
    // }

    closeUploader() {
        this.setState({
            isUploaderVisible: false
        });
    }
    setAvatar(url) {
        this.setState({
            useravatar: url,
            isUploaderVisible: false
        });
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                useravatar: data.useravatar
            });
        });
    }
    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar">
                        <img src="/assets/whiteHatsLogo.png" id="logo" />
                        <ul>
                            <li>
                                <ProfilePic
                                    className="profilePic"
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    useravatar={this.state.useravatar}
                                    clickHandler={() =>
                                        this.setState({
                                            isUploaderVisible: true
                                        })
                                    }
                                />
                            </li>
                            <li>
                                <Link to={"/"} className="nav-link">
                                    {" "}
                                    LOGOUT{" "}
                                </Link>
                            </li>
                            <li>
                                <Link to={"/"} className="nav-link">
                                    PROFILE
                                </Link>
                            </li>
                            <li>
                                <Link to={"/friends"} className="nav-link">
                                    FRIENDS
                                </Link>
                            </li>
                            <li>
                                <Link to={"/chat"} className="nav-link">
                                    CHAT
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <hr />
                    {this.state.isUploaderVisible && (
                        <Uploader
                            setAvatar={url =>
                                this.setState({
                                    useravatar: url,
                                    isUploaderVisible: false
                                })
                            }
                            closeUploader={() =>
                                this.setState({ isUploaderVisible: false })
                            }
                        />
                    )}
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                <Profile
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    useravatar={this.state.useravatar}
                                    profilePic={
                                        <ProfilePic
                                            firstname={this.state.firstname}
                                            lastname={this.state.lastname}
                                            useravatar={this.state.useravatar}
                                        />
                                    }
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
                                />
                            );
                        }}
                    />
                    <Route path="/friends" component={Friends} />
                    <Route path="/chat" component={Chat} />
                </div>
            </BrowserRouter>
        );
    }
}
