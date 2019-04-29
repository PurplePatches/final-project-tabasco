import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import BioEditor from "./bioeditor";

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
            console.log(data, "DATA");
            console.log(data.bio, "DATA 0");
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

        //the then... destructuring > check online
        //what we need to send back json:
    }
    render() {
        console.log(this.state, "state of appjs");
        if (!this.state.id) {
            return (
                <div className="spinner">
                    <img src="../spinner.gif" />
                </div>
            );
        }
        return (
            <div>
                <img className="logo" src="../logo.png" />
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
                            this.setState({ isUploaderVisible: true })
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
                {this.state.isUploaderVisible && (
                    <Uploader
                        setImage={url => this.setState({ image: url })}
                        clickHandler={() =>
                            this.setState({ isUploaderVisible: false })
                        }
                    />
                )}
                )
            </div>
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
