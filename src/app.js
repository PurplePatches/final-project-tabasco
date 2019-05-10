import React from "react";
import axios from "./axios";
import { BrowserRouter } from "react-router-dom";
import { Link, Route } from "react-router-dom";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import OtherProfile from "./otherprofile";
import Friends from "./friends";

import Chat from "./chat";
import Online from "./online";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        //lifecycle method
        console.log(this.state, "state of appjs");
        axios.get("/user").then(({ data }) => {
            //we need the user info...

            this.setState({
                id: data.id,
                image: data.url,
                first: data.first,
                last: data.last,
                email: data.email,
                bio: data.bio,
                inEditMode: false
            });

            // this.setState({
            //     image: data.image || default: "../default.jpg""
            // });
            //or this.setState({
            //    ...data,
            // image: data.image || default
            // // })
        });
    }
    render() {
        console.log(this.state, "state of appjs");
        if (!this.state.id) {
            return (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
        return (
            <BrowserRouter>
                <div>
                    <Link to="/">
                        <img className="logo" src="../logo.png" />
                    </Link>
                    <nav>
                        <ul className="nav justify-content-center white lighten-4 py-4">
                            <li>
                                <Link to="/">HOME</Link>
                            </li>
                            <li>
                                <Link to="/friends">FRIENDS</Link>
                            </li>
                            <li>
                                <Link to="/chat">CHAT</Link>
                            </li>
                            <Link to="/online">ONLINE USERS</Link>
                        </ul>
                    </nav>
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
                    <Route path="/online" component={Online} />
                    <Route
                        path="/chat"
                        render={props => {
                            console.log(props, "props in online");
                            console.log(this.state, "state in online");
                            return (
                                <div className="chat">
                                    <Online />
                                    <Chat />
                                </div>
                            );
                        }}
                    />
                    <Route
                        path="/friends"
                        render={props => <Friends id={this.state.id} />}
                    />
                    <Route
                        path="/"
                        render={props => {
                            return (
                                <Profile
                                    id={this.state.id}
                                    image={this.state.image} //where I pass the image
                                    first={this.state.first}
                                    last={this.state.last}
                                    email={this.state.email}
                                    bio={this.state.bio}
                                    profilePicComponent=<ProfilePic
                                        profilePic={this.state.image} //where I pass the image
                                        first={this.state.first}
                                        last={this.state.last}
                                        email={this.state.email}
                                        clickHandler={() =>
                                            this.setState({
                                                isUploaderVisible: true
                                            })
                                        }
                                    />
                                    bioEditor=<BioEditor
                                        first={this.state.first}
                                        last={this.state.last}
                                        email={this.state.email}
                                        bio={this.state.bio}
                                        getBio={bio => {
                                            this.setState({ bio: bio });
                                        }}
                                    />
                                />
                            );
                        }}
                    />
                    {this.state.isUploaderVisible && (
                        <Uploader
                            setImage={url => this.setState({ image: url })}
                            clickHandler={() =>
                                this.setState({ isUploaderVisible: false })
                            }
                        />
                    )}
                </div>
            </BrowserRouter>

            // {this.state.isUploaderVisible && <Uploader setImage={image => this.setState({image})} />}
            // PUT BEFORE THE DIV ENDING
            // {this is a //
            // conditionnal, a way to do "if"}
            // when a user clicks on the profile picture > isUploaderVisible setState must become TRUE
            //
            // CLICKHANDLER > profile pic can use it now (child)
        );
    }
}
