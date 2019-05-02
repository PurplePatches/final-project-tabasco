import React from "react";
import axios from "./axios";
import Logo from "./logo";
import Profile from "./profile";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import BioEditor from "./bioEditor";
import { BrowserRouter } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploaderVisible: false,
            mode: ""
        };
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

    updateBio(bio) {
        this.setState({ mode: edit });
    }

    render() {
        console.log("state:", this.state);
        if (!this.state.id) {
            return (
                <div>
                    <img src="spinner.gif" />
                </div>
            );
        }
        const { firstName, lastName, image, bio } = this.state;

        return (
            <div>
                <div className="test">
                    <Logo />
                    <ProfilePic
                        firstName={firstName}
                        lastName={lastName}
                        image={image}
                        clickHandler={() => {
                            this.setState({ isUploaderVisible: true });
                        }}
                    />
                </div>
                <Profile
                    firstName={firstName}
                    lastName={lastName}
                    image={image}
                    clickHandler={() => {
                        this.setState({ isUploaderVisible: true, bio: bio });
                    }}
                />

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
        );
    }
}
