import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import BioEditor from "./bioEditor";
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
        this.setBio = this.setBio.bind(this);
    }
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
    setBio(newBio) {
        this.setState({
            bio: newBio
        });
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("DATA CDM", data);
            this.setState({
                id: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                useravatar: data.useravatar,
                bio: data.bio
            });
        });
    }
    render() {
        if (!this.state.id) {
            return null;
        }
        return (
            <BrowserRouter>
                <div className="container">
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
                                    bio={this.state.bio}
                                    setBio={this.setBio}
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

// REDUX reducer, must be a pure function, which means that input is not changable outside the function
// and the function will not change the input, it can only return a new element
// ------------------------------------
// function reducer(state={}, action) {
//     if (action.type = "CHANGE_BIO") {
//         return {
//             ...state,
//             otherUser: {
//                 ...state.otherUser,
//                 bio: action.bio
//             }
//         };
//     }
//     return state;
// }
