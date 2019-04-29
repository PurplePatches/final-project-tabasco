import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile.js";
import Bio from "./bio";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data[0]);
            console.log("Component has mounted", this.state);
        });
    }
    render() {
        if (!this.state.id) {
            return (
                <section id="modal">
                    <img id="spinner" src="/img/spinner.gif" />
                </section>
            );
        } else {
            return (
                <div id="app">
                    <Profile
                        first={this.state.first_name}
                        last={this.state.last_name}
                        profilePic={
                            <ProfilePic
                                id={this.state.id}
                                first={this.state.first_name}
                                last={this.state.last_name}
                                image_url={this.state.image_url}
                                clickHandler={() =>
                                    this.setState({ showUploader: true })
                                }
                            />
                        }
                        bioEditor={
                            <Bio bio={this.state.bio} setBio={this.setBio} />
                        }
                    />

                    {this.state.showUploader && (
                        <Uploader
                            setImage={url => this.setState({ image_url: url })}
                            clickHandler={() =>
                                this.setState({ showUploader: false })
                            }
                        />
                    )}
                </div>
            );
        }
    }
}
